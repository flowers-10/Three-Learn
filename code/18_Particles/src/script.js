import * as THRRE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THRRE.Scene();
/**
 * Textures
 */
const textureLoader = new THRRE.TextureLoader();
const particleTexture = textureLoader.load("/textures/particles/2.png");
/**
 * Test cube
 */
const cube = new THRRE.Mesh(
  new THRRE.BoxGeometry(1, 1, 1),
  new THRRE.MeshBasicMaterial()
);
scene.add(cube);

/**
 * Particles
 */
// Geometry
const particlesGeometry = new THRRE.BufferGeometry();
const count = 1;
const positions = new Float32Array(1);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
  colors[i] = Math.random();
}

particlesGeometry.setAttribute(
  "position",
  [1,1,1]
);
particlesGeometry.setAttribute("color", new THRRE.BufferAttribute(colors, 3));
// Material
const particlesMaterial = new THRRE.PointsMaterial({
  size: 0.02,
  sizeattenuation: true,
});
particlesMaterial.size = 0.1;
particlesMaterial.sizeAttenuation = true;
// particlesMaterial.color = new THRRE.Color('#ff88cc')
// particlesMaterial.map = particleTexture
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture;
// particlesMaterial.alphaTest = 0.001
// particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false;
particlesMaterial.blending = THRRE.AdditiveBlending;
particlesMaterial.vertexColors = true;

// Points
const particles = new THRRE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

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
  camera.aspect = sizes.width / sizes.Height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
/**
 * Camera
 */
// Base camera
const camera = new THRRE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
/**
 * Renderer
 */
const renderer = new THRRE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
/**
 * Animate
 */
const clock = new THRRE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //   Update particles
  //   particles.rotation.y = elapsedTime * 0.2;
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const x = particlesGeometry.attributes.position.array[i3]
    particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
  }
  particlesGeometry.attributes.position.needsUpdate = true
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
