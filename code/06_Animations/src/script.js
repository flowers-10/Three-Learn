import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

/**
 * Animate
 */
// 1.使用时间戳
// let time = Date.now();
// 2.使用three内置clock
// const clock = new THREE.Clock();
// 3.使用gsap库

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
const tick = () => {
  // Update objects
  // 1.计算时间戳
  //   const currentTime = Date.now();
  //   const deltaTime = currentTime - time;
  //   time = currentTime;
  //   mesh.rotation.y += 0.01 * deltaTime;

  //   2.使用getElapsedTime
  //   const elapsedTime = clock.getElapsedTime();

  // 移动网格模型
  //   mesh.rotation.y = elapsedTime;
  //   mesh.position.x = Math.cos(elapsedTime)
  //   mesh.position.y = Math.sin(elapsedTime)

  //移动相机
  //   camera.position.x = Math.cos(elapsedTime);
  //   camera.position.y = Math.sin(elapsedTime);

  // Render
  renderer.render(scene, camera);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
tick();
