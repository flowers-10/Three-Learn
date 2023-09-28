import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

import raindropsVertexShader from "./shaders/raindrops/vertex.glsl";
import raindropsFragmentShader from "./shaders/raindrops/fragment.glsl";

THREE.ColorManagement.enabled = false;

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 });
const debugObject = {};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const seaTexture = textureLoader.load("sea.png");

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
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(0, 0, 2);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#fff", 1);
/**
 * Raindrops
 */
// Geometry
const raindropsGeometry = new THREE.PlaneGeometry(10, 10, 512, 512);

// Material
const { width, height } = renderer.getSize(new THREE.Vector2());

const iResolution = new THREE.Vector3(width, height, renderer.pixelRatio);

// console.log(iResolution);

const raindropsMaterial = new THREE.ShaderMaterial({
  vertexShader: raindropsVertexShader,
  fragmentShader: raindropsFragmentShader,
  uniforms: {
    iTime: { value: 0.0 },
    iAnimationSpeed: { value: 0.2 },
    iResolution: { value: iResolution },
    iChannel0: { value: seaTexture },
    iStaticDropsSum: { value: 40.0 },
    iStaticDropsFade: { value: 0.25 },
    iDropLayerSum: { value: 2.0 },
    iVignette: { value: 0.5 },
    iLightningFrequency: { value: 0.5 },
  },

  // wireframe:true,
});

gui
  .add(raindropsMaterial.uniforms.iAnimationSpeed, "value")
  .min(0)
  .max(1)
  .step(0.1)
  .name("AnimationSpeed");

gui
  .add(raindropsMaterial.uniforms.iStaticDropsFade, "value")
  .min(0)
  .max(1)
  .step(0.1)
  .name("StaticDropsFade");

gui
  .add(raindropsMaterial.uniforms.iStaticDropsSum, "value")
  .min(0)
  .max(50)
  .step(1)
  .name("StaticDropsSum");

gui
  .add(raindropsMaterial.uniforms.iDropLayerSum, "value")
  .min(1)
  .max(5)
  .step(0.1)
  .name("DropLayerSum");

gui
  .add(raindropsMaterial.uniforms.iVignette, "value")
  .min(-0.3)
  .max(1.2)
  .step(0.1)
  .name("Vignette");

  gui
  .add(raindropsMaterial.uniforms.iLightningFrequency, "value")
  .min(0)
  .max(2)
  .step(0.1)
  .name("LightningFrequency");
  

// Mesh
const raindrops = new THREE.Mesh(raindropsGeometry, raindropsMaterial);
scene.add(raindrops);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // iTime
  raindropsMaterial.uniforms.iTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
