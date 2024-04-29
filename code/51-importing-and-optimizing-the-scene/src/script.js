import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

/**
 * Base
 */
// Debug
const gui = new GUI({
  width: 400,
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader();

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

// GLTF loader
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Textures
 */
const bakedTexture = textureLoader.load("baked.jpg");

/**
 * Materials
 */
// Baked material
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });
// 重要：翻转纹理，因为纹理Y坐标是反转的
bakedTexture.flipY = false;
// 我们烘焙的纹理已编码，sRGB但 Three.js 不知道这一点。
bakedTexture.colorSpace = THREE.SRGBColorSpace;

// Pole light material
const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 });
// Portal light material
const portalLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })

/**
 * Model
 */

gltfLoader.load("portal.glb", (gltf) => {
  // console.log(gltf.scene)
  //   console.log(gltf.scene.children)
  gltf.scene.traverse((child) => {
    child.material = bakedMaterial;
  });
  scene.add(gltf.scene);
  // Get each object
  const bakedMesh = gltf.scene.children.find((child) => child.name === 'baked')
  const portalLightMesh = gltf.scene.children.find((child) => child.name === 'portalLight')
  const poleLightAMesh = gltf.scene.children.find((child) => child.name === 'poleLightA')
  const poleLightBMesh = gltf.scene.children.find((child) => child.name === 'poleLightB')

  // Apply materials
  bakedMesh.material = bakedMaterial
  portalLightMesh.material = portalLightMaterial
  poleLightAMesh.material = poleLightMaterial
  poleLightBMesh.material = poleLightMaterial
  //   console.log(portalLightMesh);
  //   console.log(poleLightAMesh);
  //   console.log(poleLightBMesh);
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 4;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
