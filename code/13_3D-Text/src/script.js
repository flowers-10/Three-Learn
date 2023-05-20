import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import gsap from "gsap";
import { BoxGeometry } from "three";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/8.png");

/**
 * Fonts
 */
// 创建一个 Group
const orbitGroup = new THREE.Group();
const donutArr = [];
let text = null;
const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  // Material
  //   1.默认材质
  //  const textMaterial = new THREE.MeshBasicMaterial({wireframe:true})
  //   2.更好的贴图材质
  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

  // Text
  const textGeometry = new TextGeometry("Hello Michela", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  //  1.api方式居中
  textGeometry.center();
  //  2.计算方式居中
  //  textGeometry.computeBoundingBox()
  // textGeometry.translate(
  //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5, // Subtract bevel size
  //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5, // Subtract bevel size
  //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5  // Subtract bevel thickness
  // )
  //  console.log(textGeometry.boundingBox)

  text = new THREE.Mesh(textGeometry, material);
  scene.add(text);

  // Donuts
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
  const boxGeometry = new BoxGeometry(0.3, 0.3, 0.3);

  for (let i = 0; i < 100; i++) {
    const donut = new THREE.Mesh(donutGeometry, material);
    const box = new THREE.Mesh(boxGeometry, material);
    donutArr.push(donut);
    donutArr.push(box);

    // 将甜甜圈和立方体添加到 Group 中
    orbitGroup.add(donut);
    orbitGroup.add(box);
    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = (Math.random() - 0.5) * 10;
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    box.position.x = (Math.random() - 0.5) * 10;
    box.position.y = (Math.random() - 0.5) * 10;
    box.position.z = (Math.random() - 0.5) * 10;
    box.rotation.x = Math.random() * Math.PI;
    box.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    donut.scale.set(scale, scale, scale);
    box.scale.set(scale, scale, scale);
    // gsap.to(donut.position, { duration: 1, delay: 1, x: 2 });
  }
});

scene.add(orbitGroup);

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

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
 * Cursor
 */
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
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
// camera.position.x = 1;
// camera.position.y = 1;
camera.position.z = 3;
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

/**
 * Animate
 */
const clock = new THREE.Clock();
let flag = false;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Update Object
  if (orbitGroup.rotation.y >= 4) {
    flag = false;
  } else if (orbitGroup.rotation.y <= -4) {
    flag = true;
  }

  flag
    ? (orbitGroup.rotation.y += 0.01)
    : (orbitGroup.rotation.y -= 0.01);

  for (let item of donutArr) {
    item.rotation.y += 0.001;
  }

  // Update camera
  camera.position.x = cursor.x * 15;
  camera.position.y = cursor.y * 15;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
