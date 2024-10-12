import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EXRLoader } from "three/addons/loaders/EXRLoader.js";
import { GroundedSkybox } from "three/addons/objects/GroundedSkybox.js";

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
const rgbeLoader = new RGBELoader();
const exrLoader = new EXRLoader();
const textureLoader = new THREE.TextureLoader();

/**
 * Environment map
 */
// LDR cube texture
// const environmentMap = cubeTextureLoader.load([
//     '/environmentMaps/2/px.png',
//     '/environmentMaps/2/nx.png',
//     '/environmentMaps/2/py.png',
//     '/environmentMaps/2/ny.png',
//     '/environmentMaps/2/pz.png',
//     '/environmentMaps/2/nz.png'
// ])

// const environmentMap = textureLoader.load(
//   "/environmentMaps/blockadesLabsSkybox/anime_art_style_japan_streets_with_cherry_blossom_.jpg"
// );
// environmentMap.mapping = THREE.EquirectangularReflectionMapping;
// environmentMap.colorSpace = THREE.SRGBColorSpace;
/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
// scene.background = environmentMap
// scene.environment = environmentMap
// scene.environmentIntensity = 1;
// scene.backgroundBlurriness = 0;
// scene.backgroundIntensity = 1;
// scene.backgroundRotation.x = 1
// scene.environmentRotation.x = 2

gui.add(scene, "environmentIntensity").min(0).max(10).step(0.001);
gui.add(scene, "backgroundBlurriness").min(0).max(1).step(0.001);
gui.add(scene, "backgroundIntensity").min(0).max(10).step(0.001);
gui.add(scene, "environmentIntensity").min(0).max(10).step(0.001);
gui
  .add(scene.backgroundRotation, "y")
  .min(0)
  .max(Math.PI * 2)
  .step(0.001)
  .name("backgroundRotationY");
gui
  .add(scene.environmentRotation, "y")
  .min(0)
  .max(Math.PI * 2)
  .step(0.001)
  .name("environmentRotationY");
/**
 * Models
 */
gltfLoader.load("/models/FlightHelmet/glTF/FlightHelmet.gltf", (gltf) => {
  gltf.scene.scale.set(10, 10, 10);
  scene.add(gltf.scene);
});

// rgbeLoader.load("/environmentMaps/2/2k.hdr", (environmentMap) => {
//      environmentMap.mapping = THREE.EquirectangularReflectionMapping
//     scene.environment = environmentMap
    
//     const skybox = new GroundProjectedSkybox(environmentMap)
//     skybox.radius = 120
//     skybox.height = 11
//     skybox.scale.setScalar(50)
//     scene.add(skybox)

//     gui.add(skybox, 'radius', 1, 200, 0.1).name('skyboxRadius')
//     gui.add(skybox, 'height', 1, 100, 0.1).name('skyboxHeight')
// });



// exrLoader.load('/environmentMaps/nvidiaCanvas-4k.exr', (environmentMap) =>
//     {
//         environmentMap.mapping = THREE.EquirectangularReflectionMapping

//         scene.background = environmentMap
//         scene.environment = environmentMap
//     })

// Base environment map
const environmentMap = textureLoader.load('/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg')
environmentMap.mapping = THREE.EquirectangularReflectionMapping
environmentMap.colorSpace = THREE.SRGBColorSpace

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(
    256,
    {
        type: THREE.FloatType
    }
)
scene.environment = cubeRenderTarget.texture
scene.background = environmentMap

const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget)
cubeCamera.layers.set(1)
// Holy donut
const holyDonut = new THREE.Mesh(
    new THREE.TorusGeometry(8, 0.5),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(10, 4, 2) })
)
holyDonut.position.y = 3.5
holyDonut.layers.enable(1)
scene.add(holyDonut)

/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
  new THREE.MeshStandardMaterial({ roughness: 0, metalness: 1, color: 0xaaaaaa })

);
torusKnot.position.x = -4;
torusKnot.position.y = 4;
scene.add(torusKnot);

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
  100
);
camera.position.set(4, 5, 4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3.5;
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
const tick = () => {
  // Time
  const elapsedTime = clock.getElapsedTime();
  if(holyDonut)
    {
        holyDonut.rotation.x = Math.sin(elapsedTime) * 2
        cubeCamera.update(renderer, scene)
    }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
