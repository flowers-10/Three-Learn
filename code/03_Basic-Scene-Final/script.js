// Sizes 定义画布边框宽高/纵横比
const sizes = {
    width: 800,
    height: 600
}

const canvas = document.querySelector('canvas.webgl')

// 一. 创建Scene场景
const scene = new THREE.Scene();

// 二. Object模型对象

// 1.创建一个红色的几何体模型 其前 3 个参数对应于对象xyz边框的大小
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 2.创建材质，定义材质颜色
const material = new THREE.MeshBasicMaterial({ color: "red" });
// 3.创建最终网格
const mesh = new THREE.Mesh(geometry, material);
// 4.将网格添加到场景中
scene.add(mesh)

// 三. Camera新建一个相机
// 1.第一个参数：视野角度 第二参数：纵横比
const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height)
// 2.将相机后移（因为默认模型和相机都在中心位置，这样会导致从内部观察一个实心集合体导致啥也看不见，所以相机要后移）
camera.position.z = 3
camera.position.x = -1
camera.position.y = -1

// 3.将相机添加到场景中
scene.add(camera)

// 四. Renderer渲染器
// 1.给渲染器提供一个Canvas元素
const renderer =  new THREE.WebGLRenderer({
    canvas:canvas
})
// 2.更新渲染器大小
renderer.setSize(sizes.width,sizes.height)
// 3.第一次渲染
// 第一个参数：场景 第二个参数：相机
renderer.render(scene,camera)
