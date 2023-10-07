Hello! Three.js

进阶篇shaders介绍

案例：《汹涌的大海 》 《水滴滑落效果（讲解）》





# 开篇暖场

开课前我想问一下大家：你们对图形学、线性代数、webgl、three.js有了解过吗？没有啊！那就好办了 / 有的话，后面有问题会请您上来讲一讲。

可能了解过three.js等大型的3D 图形库同学都知道啊，学习3D技术都需要有图形学、线性代数、webgl等基础知识，我们的课程呢保证零基础的同学也可以学习，所以就算忘记了线性代数也没关系。

俗话说你在读书学的线性代数啊是练死劲儿不好用。哈哈开玩笑的，以前读书学的线性代数足够扎实的话听这节课也会更容易理解，

![image-20230922113832142](/Users/channel1/Library/Application Support/typora-user-images/image-20230922113832142.png)

忘记了也没关系我们也会重新教学回忆一下需要用到的知识，保证大家零基础学图形学月薪。。哦不说错了，零基础也能学会我们这节课，所以不要担心！



# 邂逅Three.js

编程最重要的就是需要：“想象力”

## 学习Three.js有啥用？

- 工作上的

  可视化智慧小区、园区的建筑模型，包括外观、内部布局和房间分配等。
  ![使用three.js(webgl)搭建智慧楼宇、设备检测、数字孪生——第十三课_bim管理系统](https://s2.51cto.com/images/blog/202208/20013024_62ffc8b06cb9b27029.gif)

  元宇宙交互式导览  用户可以在元宇宙内自由探索，虚拟世界！
  VR和AR等技术应用。

  

- 个人上的

  学习 Three.js 可以让你在 Web 上轻松地创建出令人惊叹的 3D 图形和交互体验，为你的项目添加更多视觉上的吸引力和创造力。

  https://lusion.co/

  现在的前端呢大家都知道非常的内卷，学习了three.js可以大大提升我们的每个人的核心竞争力啊

  我们后续也可以向游戏开发方向进阶啊

  ![图形学：MVP变换概述](https://pic1.zhimg.com/70/v2-73d64b3a9c9ed7df1cf67ff8ccc5f113_1440w.image?source=172ae18b&biz_tag=Post)

- 数学上的

  让我们探秘数学的魅力，了解优雅的图形学，让枯燥无味的数字渲染出绚丽多彩的3D世界，了解底层的着色器原理是如此美轮美奂如此的精彩绝伦，今天的课程让我们从底层探秘如此优雅的three.js吧！

## three.js的介绍和特点

Three.js 非常庞大，你可以用它做无数的事情。
我们将学习所有基础知识，例如**创建第一个场景、渲染、添加对象、选择正确的材料、添加纹理、为所有内容制作动画、添加光和阴影**，甚至有些人可能会觉得这部分有点无聊，因为都是一些API的讲解。
本来时间允许我还希望给大家讲一讲刚体（物理physic）

![tutieshi_640x400_4s.gif](https://img-blog.csdnimg.cn/img_convert/68f24d07d7385fe32af429666e53cb65.gif)

还有blender帮助我们导入导出模型和自己建模（有些偏离课题，但是真的很酷）



元神启动！！！！

![image-20230922115423945](/Users/channel1/Library/Application Support/typora-user-images/image-20230922115423945.png)

但是时间太短了，所以后半段我选择给大家着重讲一讲底层的原理，大名鼎鼎的着色器，这是大家开始觉得学习困难的地方，并且有充分的理由。着色器很难，但**着色器将释放 WebGL 的真正力量**。



## hello！three.js

我们使用vite创建了一个启动包，至于怎么安装环境、还有vscode插件就不讲了，文末尾会给出教程，我们直接进入正题吧～！

### three四要素

这是最简单最基础的渲染three的方式，所以我们花时间讲一下，本文还会出现动画，自适应尺寸，debug UI调试界面等我会简单讲一下就不给大家写代码了。

#### 场景

```js
// Scene 场景就像一个容器。我们将对象、模型、粒子、灯光等放入其中，并在某个时候要求 Three.js 渲染该场景。
const scene = new THREE.Scene()
```

#### 网格

three内置有许多种几何体和材料的类型，但我们今天先简单的创建一个[BoxGeometry](https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry)和一个[MeshBasicMaterial](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial)。

```js
// Object 
// 形状 参数：长宽高
const geometry = new THREE.BoxGeometry(1, 1, 1)
// 材质 参数： 颜色
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// 网格是几何体（形状）和材质的组合。
const mesh = new THREE.Mesh(geometry, material)

// 如果不向scene场景添加mesh对象，那么这个对象就无法渲染了。
scene.add(mesh)
```

#### 相机

```js
// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera 相机不可见。这更像是一种理论观点。当我们对场景进行渲染时，将从该摄像机的视觉角度进行渲染。(mvp会讲怎么做到的)
// 参数一：视野
// 参数二：纵横比
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)
```

#### 渲染器

```js
// Canvas
const canvas = document.querySelector('canvas.webgl')

// ...

// Renderer 渲染器的工作是进行渲染
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

```



### 一个完整的项目代码

我再讲一下动画，自适应尺寸，debug UI调试界面

代码比较简单简单介绍一下
```js
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
// Geometry
const geometry = new THREE.PlaneGeometry(2, 2, 128, 128)

// Material
const material = new THREE.MeshBasicMaterial()

// Mesh
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
```



# 进阶篇

## 着色器 Shaders

这是最值得期待的一部分。我们上半节课已经讨论过着色器，所以大家可能会好奇它究竟是用来干什么的？

着色器是 **WebGL** 的主要组件之一。如果我们在不使用 **Three.js** 的情况下开始使用 **WebGL**，那么这将是我们必须学习的第一件事，这就是原生 **WebGL** 的学习如此困难的原因。

着色器是用 **GLSL** 编写的发送到 **GPU** 的程序。它们用于定位几何体的每个顶点并为该几何体的每个可见像素着色。“像素”一词并不准确，因为渲染中的每个点不一定与屏幕的每个像素匹配，这就是为什么我们更喜欢使用术语“片段”，所以如果您看到这两个术语，请不要感到惊讶。

然后我们将大量数据发送到着色器，例如顶点坐标、网格变换、有关相机及其视野的信息、颜色、纹理、灯光、雾等参数。然后 **GPU** 进行处理所有这些数据都遵循着色器指令，并且最终让我们的几何体成功出现在渲染中。

## Shader 的魅力

https://zero.tech/

https://homunculus.jp/

`Shader`本身固然十分强大，但学起来也是相当有难度的。

一方面，它代码的核心就是计算，这涉及到了大量的数学和线性代数的知识，非常抽象；另一方面，它没有跟传统编程语言类似的调试工具，想要了解变量值的变化，只能通过观察画面的输出，对于初学者来说并不是很友好。



## 什么是 WebGL？

`WebGL` 是一种 `JavaScript API`，可以以**惊人的速度在画布中绘制三角形**。它与大多数现代浏览器兼容，而且速度很快，因为它是直接操作使用我们的图形处理单元 (`GPU`)。
`GPU` 可以进行数千次并行计算。想象一下，您想要渲染一个 `3D` 模型，而这个模型由 1000 个三角形组成——仔细想想，这并不多。每个三角形包括 3 个点。当我们想要渲染我们的模型时，`GPU` 将不得不计算这 `3000` 个点的位置。因为 `GPU` 可以进行并行计算，所以它会在一个原始数据中处理所有的三角形点。

![image-20230926100646794](/Users/channel1/Library/Application Support/typora-user-images/image-20230926100646794.png)



## 让我们开始创建第一个shader吧

替换material

```js
const material = new THREE.RawShaderMaterial()
```

创建着色器glsl文件并且导入

```
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'
```



## 顶点着色器

顶点着色器的目的是定位几何体的顶点。这个想法是发送顶点位置、网格变换（如其位置、旋转和缩放）、相机信息（如其位置、旋转和视场）。然后，**GPU** 将按照顶点着色器中的指令处理所有这些信息，以便将顶点投影到将成为我们渲染的 **2D** 空间上（即我们的画布）。

```glsl
uniform mat4 projectionMatrix; //透视矩阵
uniform mat4 viewMatrix; // 视图矩阵
uniform mat4 modelMatrix; // 模型矩阵

attribute vec3 position; // 传入的顶点坐标

void main()
{		
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
```



我们要知道这三个变量具体的含义`projectionMatrix * viewMatrix * modelMatrix` （mvp变换）

## 片段着色器

片段着色器的目的是为几何体的每个可见片段着色。

```glsl
gl_FragColor = vec4(0.5, 0.8, 1.0, 1.0);
```

好了说了这么多，我们直接上案例比较好理解一点着色器







# GLSL

用于编码着色器的语言称为 **GLSL**，代表 **OpenGL** 着色语言。很接近**C**语言。让我们了解其语法的基础知识。(学过c语言的有福了)

```glsl
float fooBar = 0.123; // 浮点
int foo = 123; // 整数
bool foo = true; // 布尔

// 函数
float loremIpsum()
{
    float a = 1.0;
    float b = 2.0;

    return a + b;
}
```

**GLSL**内置了很多经典的函数如也有非常实用的函数如 `sin`, `cos`, `max`, `min`, `pow`, `exp`, `mod`, `clamp`。

除了在计算机图形编程中常用的数学函数之外，还有许多非常实用的函数，如 `cross`、`dot`、`mix`、`step`、`smoothstep`、`length`、`distance`、`reflect`、`refract` 和 `normalize`。用到的时候我会给你们讲什么用法。

### 向量

**向量(也叫矢量)(vector)**，具有大小和方向的量。向量可以理解为是空间中的箭头。

![image-20230926145304086](/Users/channel1/Library/Application Support/typora-user-images/image-20230926145304086.png)

**基向量(basis vectors)**

我们可以认为任何向量都是由2个基向量通过伸缩得到的，比如 向量v[-5,2] 可以由 基向量i[1,0] 向左伸缩5倍，基向量j[0,1]向上伸缩2倍得到

即 v = ai + bj = -5i + 2j

我们可以选择不同的基向量来获取一个合理的不同的坐标系

要注意一点，每当我们用数字描述一个向量时，都是基于基向量的

**齐次坐标**

vec4可以是一个齐次坐标(x, y, z,w)即为(x/w, y/w, z/w），由此齐次坐标有规模不变性，还**可以表示无穷远处的点。** 

在计算机图形学中，齐次坐标是一种扩展了传统的笛卡尔坐标系的表示方法，它包含了额外的一个分量'w'。

我们思考这样一个问题：两条平行线可以相交吗？

但是齐次坐标坐标中结果是不一样的，试想一条铁轨：

![image-20230925164620193](/Users/channel1/Library/Application Support/typora-user-images/image-20230925164620193.png)

可以发现，在无穷远处，两条铁轨相交汇合为一点！

![image-20230926145452231](/Users/channel1/Library/Application Support/typora-user-images/image-20230926145452231.png)

齐次坐标就是将一个原本是n维的向量用一个n+1维向量来表示。



向量加法：

![img](http://www.daileinote.com/math/linear_algebra/img/4.jpg)

向量乘法：

![img](http://www.daileinote.com/math/linear_algebra/img/5.jpg)



我希望大家用线性的思维去抽象的思考这些变化，提高我们的空间想象能力～



### 矩阵

![image-20230925112836221](/Users/channel1/Library/Application Support/typora-user-images/image-20230925112836221.png)

**线性变换(linear transformation)**，其实也可以理解成函数处理，该函数接收一个向量，经过处理后输出另一个向量。

在空间里，一个向量可以通过移动得到另一个向量

线性变换可以理解为原始的时候在xy坐标系中，是一个个正方形表格，通过线性变换后，这些表格线还是保持平行的且等距分布。

**矩阵(matrix)**代表一个特定的线性变换，矩阵跟向量的乘积就是将线性变换作用于这个向量

![img](http://www.daileinote.com/math/linear_algebra/img/6.jpg)

看视频更直观的了解一下：

https://www.bilibili.com/video/BV1ib411t7YR/?p=5&vd_source=ae1012c48d1ebdad8a46df1d056238b9

![image-20230926102315625](/Users/channel1/Library/Application Support/typora-user-images/image-20230926102315625.png)

三维矩阵乘法

![img](http://www.daileinote.com/math/linear_algebra/img/16.jpg)









## 了解MVP变换

![image-20230922114326401](/Users/channel1/Library/Application Support/typora-user-images/image-20230922114326401.png)

MVP变换，就是**M**odel模型、**V**iew观察、**P**rojection投影变换三个单词的缩写。

我们先拆分一下这三个矩阵来认识了解这三个矩阵

```glsl
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0); 
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
}
```

### 仿射变换

https://www.bilibili.com/video/BV1254y1h7R7/?spm_id_from=333.1007.top_right_bar_window_custom_collection.content.click&vd_source=ae1012c48d1ebdad8a46df1d056238b9

### MVP变换

我们已经了解到了仿射变换，接下来了解模型矩阵就比较好理解了看下面

#### 模型矩阵

根据线代的知识，对于三维空间中的一个点进行平移，可以将坐标乘上一个平移矩阵，那么想让一个小盒子进行平移，则对其所有顶点都乘上一个平移矩阵，使其所有顶点都进行平移。

![image-20230925115228445](/Users/channel1/Library/Application Support/typora-user-images/image-20230925115228445.png)

同理，想让一个小盒子进行大小的放缩，让其顶点都成上一个放缩矩阵即可。

![image-20230925115235848](/Users/channel1/Library/Application Support/typora-user-images/image-20230925115235848.png)

除了平移和放缩，变换还包括旋转，在三维空间中，绕哪个轴进行旋转，都有不同的公式。具体的公式由**极坐标**即可较容易推导出。具体推导过程以及绕Y轴旋转的特殊性可以看：



![image-20230925115245185](/Users/channel1/Library/Application Support/typora-user-images/image-20230925115245185.png)

将上述三中类型的矩阵作用在一起，即可得到模型变换矩阵，要注意**矩阵的顺序是从右到左作用到局部空间中的顶点上的。**即先进行缩放、旋转后，再进行平移。

![image-20230926110658379](/Users/channel1/Library/Application Support/typora-user-images/image-20230926110658379.png)





>  后面的视图矩阵、投影矩阵不是我们本节课的重点，所以不会过多讲解了，感兴趣可以自行去了解，这两个矩阵也更复杂。可以参考课程GAMES101-现代计算机图形学入门-闫令琪https://www.bilibili.com/video/BV1X7411F744/?spm_id_from=333.999.0.0&vd_source=ae1012c48d1ebdad8a46df1d056238b9】





## 汹涌的海浪效果（了解顶点着色器）



## 雨滴滑落效果（了解片段着色器）

 https://www.shadertoy.com/view/ltffzl

时间够久讲，不够就看一下

# 结束



安装three.js环境等教程：

http://www.webgl3d.cn/pages/cd35b2/

安装glsl环境：



本文章代码和文章：



本文相关文献资料：

three.js https://threejs.org/

Become a Three.js developer https://threejs-journey.com/

WebGL Shader 魔法指南：创意图形编程入门 https://juejin.cn/book/7267462574734573604?utm_source=course_list

下雨特效 https://www.shadertoy.com/view/ltffzl

GAMES101-现代计算机图形学入门-闫令琪 https://www.bilibili.com/video/BV1X7411F744/?spm_id_from=333.999.0.0&vd_source=ae1012c48d1ebdad8a46df1d056238b9

-UP主汉语配音-【线性代数的本质】合集-转载于3Blue1Brown官方双语】https://www.bilibili.com/video/BV1ib411t7YR/?spm_id_from=333.999.0.0&vd_source=ae1012c48d1ebdad8a46df1d056238b9

【双语字幕】什么是仿射变换？https://www.bilibili.com/video/BV1254y1h7R7/?spm_id_from=333.1007.top_right_bar_window_custom_collection.content.click&vd_source=ae1012c48d1ebdad8a46df1d056238b9

图形学：MVP变换概述 https://zhuanlan.zhihu.com/p/551648397



