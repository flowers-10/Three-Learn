import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/**
 * Debug
 */
const gui = new dat.GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
// const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/2.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/4.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/5.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/6.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/7.png')
const matcapTexture = textureLoader.load("/textures/matcaps/8.png");
// const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')
const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");

/**
 * Objects
 */
// Equals
// 网格基础材质
// const material = new THREE.MeshBasicMaterial()

// 网格法线材质
// const material = new THREE.MeshNormalMaterial()

// MeshMatcapMaterial是一种很棒的材料，因为它看起来很棒，同时又非常高效。
// const material = new THREE.MeshMatcapMaterial()

// 如果MeshDepthMaterial接近相机的值， MeshDepthMaterialnear将简单地将几何体着色为白色，如果它接近far相机的值，则为黑色：
// const material = new THREE.MeshDepthMaterial()

// MeshLambertMaterial是我们将要使用的第一种对光有反应的材料：
// const material = new THREE.MeshLambertMaterial()

// MeshPhongMaterial与MeshLambertMaterial非常相似，但奇怪的图案不太明显，您还可以看到几何体表面的光反射
// const material = new THREE.MeshPhongMaterial()

// MeshToonMaterial在属性方面类似于MeshLambertMaterial ，但具有卡通风格：
// const material = new THREE.MeshToonMaterial();

// MeshStandardMaterial使用基于物理的渲染原理。
// const material = new THREE.MeshStandardMaterial();

// 环境贴图就像场景周围的图像。您可以使用它为对象添加反射或折射。它还可以用作照明信息
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

// Three.js 只支持立方体环境贴图。立方体环境贴图是 6 张图像，每张图像对应环境的一侧。
// 要加载立方体纹理，您必须使用 CubeTextureLoader而不是TextureLoader。
// 在实例化和调用其方法之前实例化CubeTextureLoader，但使用一组路径而不是一个路径：load(...)
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])

// 要将环境贴图添加到我们的材质中，我们必须使用该envMap属性。
material.envMap = environmentMapTexture

// 您可以使用该属性控制光反射shininess。值越高，表面越光亮。
// material.shininess = 100;
// 您还可以使用以下属性更改反射的颜色specular：
// material.specular = new THREE.Color(0x1188ff);

// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;

// 您只能获得两部分着色（一个用于阴影，一个用于光）。要为着色添加更多步骤，您可以使用该gradientMap属性并使用gradientTexture
// material.gradientMap = gradientTexture;

// 粗糙度和金属度
// material.metalness = 0
// material.roughness = 1
// 粗糙度图片和金属度图片
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture

// 无论细分如何，都会normalMap伪造法线方向并在表面上添加细节：
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)

// 该aoMap属性（字面意思是“环境遮挡贴图”）将在纹理较暗的地方添加阴影。为了让它起作用，您必须添加我们所说的第二组 UV（有助于在几何体上定位纹理的坐标）。
// material.aoMap = doorAmbientOcclusionTexture;
// 属性控制强度aoMapIntensity： 裂缝应该看起来更暗，这会产生对比并增加尺寸
// material.aoMapIntensity = 1;

// 该displacementMap属性将移动顶点以创建真正的浮雕：
// material.displacementMap = doorHeightTexture;

// material.matcap = matcapTexture
// 地图
// 该map属性将在几何体表面应用纹理
// material.map = doorColorTexture;

// material.displacementScale = 0.05;

// flatShading将使面变平，这意味着法线不会在顶点之间进行插值。
// material.flatShading = true

// 颜色
// 该color属性将在几何体表面应用统一的颜色。当您直接更改color属性时，您必须实例化一个Color类。您可以使用许多不同的格式：
// material.color = new THREE.Color('red')

// 线框
// 无论相机的距离如何，该wireframe属性都会用 1px 的细线显示构成几何体的三角形：
// material.wireframe = true

// 不透明度
// 该opacity属性控制透明度，但要正常工作，您应该将transparent属性设置为true以通知 Three.js 此材质现在支持透明度：
// material.transparent = true
// material.opacity = 0.6
// 阿尔法地图
// 现在透明度开始工作了，我们可以使用该alphaMap属性来控制纹理的透明度：
// material.alphaMap = doorAlphaTexture
// 边
// 该side属性可让您决定面部的哪一侧可见。默认情况下，正面是可见的 ( THREE.FrontSide)，但您可以改为显示背面 ( THREE.BackSide) 或同时显示背面 ( THREE.DoubleSide)：
// material.side = THREE.DoubleSide

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
);
torus.position.x = 1.5;

sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

scene.add(sphere, plane, torus);

/**
 * Lights
 */
// 以下材料需要灯光才能看到。让我们在场景中添加两个简单的灯光。

// 创建一个AmbientLight并将其添加到场景中：
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

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

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
