import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
);
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3;
// camera.lookAt(mesh.position)
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
// controls.target.y = 2
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Animate
const clock = new THREE.Clock();

const computedPosition = () => {
  const center = mesh.getWorldPosition(new THREE.Vector3());
  // 将世界坐标转换为屏幕坐标
  const screenPos = center.clone().project(camera);
  // 将屏幕坐标转换为像素坐标
  const halfWidth = sizes.width / 2;
  const halfHeight = sizes.height / 2;
  const pixelPos = new THREE.Vector2(
    (screenPos.x + 1) * halfWidth,
    (-screenPos.y + 1) * halfHeight
  );

  console.log(pixelPos);
};

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // mesh.rotation.y = elapsedTime;
  // camera.position.x = cursor.x * 5
  // camera.position.y = cursor.y * 5
  // camera.lookAt(mesh.position)
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
  // camera.position.y = cursor.y * 3
  // camera.lookAt(mesh.position)
  controls.update();
  computedPosition()
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
