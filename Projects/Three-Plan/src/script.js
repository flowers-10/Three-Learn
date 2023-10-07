import * as THREE from 'three'

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
// Scene 场景就像一个容器。我们将对象、模型、粒子、灯光等放入其中，并在某个时候要求 Three.js 渲染该场景。
const scene =  new THREE.Scene()


/**
 * Object
 */
// 形状 参数：长宽高
// Geometry
const geometry = new THREE.BoxGeometry(1,1,1)

// Material
// 材质 参数： 颜色
const material = new THREE.MeshBasicMaterial({color: 'red'})

// Mesh
// 网格是几何体（形状）和材质的组合。
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
/**
 * Sizes
 */
const sizes =  {
    width: 800,
    height: 600,
}

/**
 * Camera
 */
// Base camera
// Camera 相机不可见。这更像是一种理论观点。当我们对场景进行渲染时，将从该摄像机的视觉角度进行渲染。(mvp会讲怎么做到的)
// 参数一：视野
// 参数二：纵横比

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
// Renderer 渲染器的工作是进行渲染
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene,camera)



