import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

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
const textureLoader = new THREE.TextureLoader()
const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg')
const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg')

/**
 * Lights
 */
// Ambient light
// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Spot light
// 聚光灯光源
const spotLight = new THREE.SpotLight(0xffffff, 0.3, 10, Math.PI * 0.3)
// 开启光源的阴影投射
// spotLight.castShadow = true
// 设置位置
spotLight.position.set(0, 2, 2)
// 添加光源
scene.add(spotLight)
scene.add(spotLight.target)
// 设置阴影的像素
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
// 相机的振幅
spotLight.shadow.camera.fov = 30
// 阴影相机的远近
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 6

// Point light
// 点光源
const pointLight = new THREE.PointLight(0xffffff, 0.3)
// 开启光源的阴影投射
// pointLight.castShadow = true
// 设置位置
pointLight.position.set(- 1, 1, 0)
// 阴影材质像素
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
// 设置相机观察的远近
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 5
// 添加光源
scene.add(pointLight)


// Directional light
// 定向光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);

// 开启光源的阴影投射
// directionalLight.castShadow = true;
console.log(directionalLight.shadow);
// 设置阴影的像素
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
// 阴影相机的远近
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6
// 相机的振幅
// 控制相机可以看到距离
// 振幅越小阴影越准确
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = - 2
directionalLight.shadow.camera.left = - 2
// 模糊
directionalLight.shadow.radius = 10
// 位置
directionalLight.position.set(2, 2, -1);
gui.add(directionalLight, "intensity").min(0).max(1).step(0.001);
gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001);
scene.add(directionalLight);

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);

/**
 * Objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
// 开启投射阴影渲染
sphere.castShadow = true;


const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
// const plane = new THREE.Mesh(
//     new THREE.PlaneGeometry(5, 5),
//     new THREE.MeshBasicMaterial({
//         map: bakedShadow
//     })
// )
// 开启接收阴影贴图渲染
plane.receiveShadow = true;
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

// 
const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: simpleShadow
    })
)

sphereShadow.rotation.x = - Math.PI * 0.5
sphereShadow.position.y = plane.position.y + 0.01

scene.add(sphere, sphereShadow, plane)


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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);
// 阴影相机助手
const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
// 关闭助手
directionalLightCameraHelper.visible = false
scene.add(directionalLightCameraHelper);

// 聚光灯光源相机助手
const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
// 关闭助手
spotLightCameraHelper.visible = false
scene.add(spotLightCameraHelper)

// 点光源相机助手
const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
// 关闭助手
pointLightCameraHelper.visible = false
scene.add(pointLightCameraHelper)


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
// 开启阴影渲染器
// renderer.shadowMap.enabled = true;
// 切换阴影贴图算法
// radius 属性不适用于THREE.PCFSoftShadowMap
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();
  // Update the sphere
  sphere.position.x = Math.cos(elapsedTime) * 1.5
  sphere.position.z = Math.sin(elapsedTime) * 1.5
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))

  // Update the shadow
  sphereShadow.position.x = sphere.position.x
  sphereShadow.position.z = sphere.position.z
  sphereShadow.material.opacity = (1 - sphere.position.y) * 0.3

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
