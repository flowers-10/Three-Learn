
# 01.介绍
Three.js 非常庞大，你可以用它做无数的事情。

- 在第一章中，我们将学习所有基础知识，例如**创建第一个场景、渲染、添加对象、选择正确的材料、添加纹理、为所有内容制作动画**，甚至将其放到网上。有些人可能会觉得这部分有点无聊，因为课程列举了很多多元化的元素。别担心，我认为它们都是有趣和有创意的部分。
- 在下一章中，我们将介绍许多经典技术：例如，创建我们自己的**几何体、添加灯光和阴影、与 3D 对象交互以及添加粒子**。
- 在第三章中，我们将通过学习如何使用 `Blender` 创建我们自己的 3D 模型来学习更高级的技术，甚至偏离 `WebGL` 和 `Three.js`。这么做是对你有帮助的！您还将在本课程中学习如何使用 `Blender`。您还将学习如何实现我用于案例作品集的作品。课程会教你如何为大型项目组织代码。
- 在第四章中，我们将讨论**着色器**。如果您已经听说过**着色器**，您可能知道这是人们开始学习困难的地方，并且有充分的理由。着色器很难，但**着色器将释放 WebGL 的真正力量**。你将能够创造出看起来不可能用代码实现的东西。如果你不明白我在说什么，别担心，一旦你学完这一章，一切都会明白的。
- 在第五章中，我们将更深入地学习更高级的技术，例如**后处理、性能优化**以及**如何将 WebGL 与 HTML 混合**。
- 在第六章中，我们将学习如何创建一个类似于您在 Three.js Journey 主页上看到的场景。这一章会更长更无聊，因为技术完全相同，但是多多实践，在那之后你将能够创建任何类型的场景。
- 最后，在第七章中，我们将学习如何使用 `React Three Fiber` 在 `React` 应用程序中使用 `Three.js`。我知道你们中的许多人对此感到兴奋，我相信你们会喜欢这一部分的。您将学习和练习的技术数量是巨大的。**您甚至可以创建一款具有物理特性、真实游戏机制、用户界面和炫酷效果的游戏**。哦，如果你不了解 `React`，别担心，我也已经为你准备好了。有一个 4 小时的课程专门用于学习 `React` 基础知识。那是额外的拓展课程。你是来学习 `Three.js` 的，你会在这个过程中学到很多其他的东西。
# 02.什么是WebGL和如何使用Three.js
`Three.js`是一个`3D JavaScript`库，使开发人员能够为`web`创建`3D`体验
它适用于 `WebGL`，但您可以使其适用于 `SVG` 和 `CSS`，但这两者非常有限，我们不会在本课程中介绍。

## 什么是 WebGL？
`WebGL` 是一种 `JavaScript API`，可以以**惊人的速度在画布中绘制三角形**。它与大多数现代浏览器兼容，而且速度很快，因为它使用访问者的图形处理单元 (`GPU`)。
`WebGL` 不仅可以绘制三角形，还可以用于创建 `2D` 体验，但为了课程的缘故，我们将专注于绘制三角形的 `3D` 体验。
``GPU` 可以进行数千次并行计算。想象一下，您想要渲染一个 `3D` 模型，而这个模型由 1000 个三角形组成——仔细想想，这并不多。每个三角形包括 3 个点。当我们想要渲染我们的模型时，`GPU` 将不得不计算这 `3000` 个点的位置。因为 `GPU` 可以进行并行计算，所以它会在一个原始数据中处理所有的三角形点。
模型的点放置好后，`GPU` 需要绘制这些三角形的每个可见像素。再一次，`GPU` 将一次性处理成千上万的像素计算。
放置点和绘制像素的指令是用我们所说的着色器编写的。让我告诉你，**着色器很难掌握**。我们还需要向这些着色器提供数据。例如：如何根据模型变换改变相机的属性放置点。这些被称为矩阵。我们还需要提供数据来帮助像素进行着色。如果有一盏灯并且照耀着三角形，它应该比没有照耀的三角形更亮。
**在画布上绘制一个三角形至少需要 100 行代码**。这就是原生 `WebGL` 学习如此困难的原因。如果您想在这种情况下添加透视图、灯光、模型并为所有内容设置动画，我只能说祝您好运。
不过使用原生的 `WebGL` 不全是坏处，因为原生 `WebGL` 源于底层，非常接近 `GPU`所以我们可以实现出色的优化和更多控制。
## Three.js 来拯救复杂的WebGl
`Three.js` 是 `MIT` 许可下的 `JavaScript` 库，可在 `WebGL` 之上运行。该库的目标是大大简化处理我们刚才所说的所有内容的过程。只需几行代码，您就可以拥有一个动画 `3D` 场景，而且您不必提供着色器和矩阵。
因为 `Three.js` 就在 `WebGL` 之上，我们仍然可以通过某些方式与它交互。在某些时候，我们将开始编写着色器并创建矩阵。

# 03.Basic scene 基本场景
## 介绍
在我们的第一课中，我们将使 `Three.js` 以最直接的方式工作：没有捆绑器、没有依赖、没有模块，只有一个 `HTML` 文件和一些 `JavaScript`。
## 基本文件
首先，创建一个普通`index.html`文件：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>03 - Basic Scene</title>
</head>
<body>
    <script src="./script.js"></script>
</body>
</html>
```
和一个简单的`script.js`文件：
```javascript
console.log('Hello Three.js')
```
现在打开开发者工具。
然后导航到`Developer Tools`顶部的`Console`选项卡。
您应该始终保持控制台打开，以查看潜在的错误和警告。
## 如何加载Three.js
现在我们需要加载 `Three.js` 库。有很多方法可以做到这一点。现在，我们将简单地下载库并使用.
转到[https://threejs.org/](https://threejs.org/)单击下载按钮下载 zip 文件并解压缩。文件很大，不过不用担心，我们只需要其中的一个文件。
你应该得到一个如下所示的文件夹：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684314458513-0ddfe88a-730b-4fa7-8db8-b2df4b0ec852.png#averageHue=%2321252a&clientId=u7631935b-3db6-4&from=paste&id=u4a142807&originHeight=532&originWidth=816&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u8126d498-b163-42d6-add4-026a2caaa0b&title=)
转到`build/`文件夹并将`three.min.js` 文件复制到您的项目。
你应该得到这样的结果：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684314457343-cb6d7094-62c3-4881-ac8f-65af5d631e3d.png#averageHue=%232c2f31&clientId=u7631935b-3db6-4&from=paste&id=ue341c58f&originHeight=134&originWidth=228&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u7510c773-e172-452b-8c9f-49c99c2230e&title=)
我们现在可以在末尾加载 `Three.js` 库：
```javascript
<script src="./three.min.js"></script>
<script src="./script.js"></script>
```
确保`**three.min.js**`在`**script.js**`之前加载；否则，`script.js`中脚本先执行了，将不知道`**three.min.js**`文件中的内容。
## 如何使用 Three.js
在我们的`**script.js**`文件中，我们可以访问到一个名为`**THREE**`的变量。 注意必须使用大写字母书写。
如果你`**console.log()**`这个变量，你会发现里面有许多属性：
```javascript
console.log(THREE)
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684372344468-94aea981-48ff-44b1-8d16-4bcc29352c1e.png#averageHue=%23fefefe&clientId=u3fca3da3-310b-4&from=paste&height=366&id=u2447bbd3&originHeight=732&originWidth=792&originalType=binary&ratio=2&rotation=0&showTitle=false&size=155450&status=done&style=none&taskId=u173daff8-8d0d-4eb1-87c9-9ae7312c7ee&title=&width=396)
该`**THREE**`变量包含开发 `Three.js` 项目中可能需要的大部分类和属性。不幸的是，并不是所有的类都在这个变量中，但我们稍后会教学如何访问使用它们。
要使用其中一个类，您需要实例化它。例如，如果你想创建一个场景，你会写`**const scene = new THREE.Scene()**`. 如果你想创建一个球体几何体，你需要写`**const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32)**`——我们稍后会更深入地研究这些。
## 第一幕
是时候创建我们的场景并在屏幕上制作一些东西了。
我们需要准备 4 个要素才能开始：

1. 包含对象的场景
2. 一些模型对象
3. 相机
4. 渲染器
#### 场景[Scene](https://threejs.org/docs/index.html#api/en/scenes/Scene)
场景就像一个容器。您将对象、模型、粒子、灯光等放入其中，并在某个时候要求 `Three.js` 渲染该场景。
要创建场景，请使用[Scene](https://threejs.org/docs/index.html#api/en/scenes/Scene)类：
```javascript
// Scene
const scene = new THREE.Scene()
```
#### 对象[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)
对象可以是很多东西。包括原始几何体、导入的模型、粒子、灯光等。
我们将从一个简单的红色立方体开始设计。
要创建红色立方体，我们需要创建一种名为[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)的对象。网格是几何体（形状）和材质[（](https://threejs.org/docs/#api/en/objects/Mesh)外观）的组合。
有许多种几何体和材料的类型，但我们现在先简单的创建一个[BoxGeometry](https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry)和一个[MeshBasicMaterial](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial)。
要创建几何图形，我们使用[BoxGeometry](https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry)类，其前 3 个参数对应于框的大小。
```typescript
// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
```
为了创建材质，我们需要使用带有一个参数的[MeshBasicMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial)类：一个`**{}**`包含所有选项的对象。我们可以先指定它的`**color**`属性。
在 `Three.js` 中有多种指定颜色的方法。您可以将其作为 JS hexadecimal 输入`**0xff0000**`，也可以将其作为 string hexadecimal 输入 `**'#ff0000'**`，也可以使用颜色名称，如输入[Color](https://threejs.org/docs/index.html#api/en/math/Color)**'red'**——我们稍后会详细介绍。
```typescript
// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
```
为了创建最终的网格，我们使用[Mesh](https://threejs.org/docs/index.html#api/en/objects/Mesh)类并写入`**geometry**`和`**material**` 参数。
```typescript
// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
```
现在可以使用以下`**add(...)**`方法将网格添加到场景中：
```typescript
scene.add(mesh)
```
**如果不向scene场景添加mesh对象，那么这个对象就无法渲染了。**
#### 相机Camera
相机不可见。这更像是一种理论观点。**当我们对场景进行渲染时，将从该摄像机的视觉角度进行渲染**。
你可以抽象为电影场景中的摄像机，所以`three.js`中一样拥有**多个摄像机**，并且可以根据需要，**在这些摄像机之间切换**。通常，我们只使用一台相机。 
有不同视角类型的相机，我们将在以后的课程中讨论这些。现在，我们只需要一个处理透视的相机（使近距离物体看起来比远距离物体更突出）。
要创建相机，我们使用[PerspectiveCamera](https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera)类。
我们需要为这个类提供两个基本参数。
**参数一：视野**
视野就是你的视角有多大。如果您使用非常大的角度，您将能够同时看到各个方向，但会造成画质失真，因为结果将绘制在一个小矩形上。如果您使用小角度，事物看起来会放大。视野（或**fov**）以度数表示，对应于垂直视角。在本练习中，我们将使用**75**角度。
**参数二：纵横比**
在大多数情况下，**纵横比是画布的宽度除以它的高度**。我们现在还没有指定任何宽度或高度，但稍后我们需要指定。同时，我们将创建一个具有可以重复使用的临时值的对象。
**不要忘记将相机添加到场景中**。如果将相机忘记添加到场景的情况下，它可能会在以后导致错误产生：
```typescript
// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)
```
#### 渲染器[WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)
**渲染器的工作是进行渲染**。
我们将简单地要求**渲染器从相机的角度渲染我们的场景**，**结果将被绘制到画布中**。**您可以自己创建画布**，**也可以让渲染器生成它**，**然后将其添加到您的页面中**。对于本练习，我们会将画布添加到 `html` 并通过`JavaScript`获得元素节点将其绑定给渲染器。
在加载脚本**之前**创建`**<canvas>**`元素并给它一个`class`：
```html
<canvas class="webgl"></canvas>
```

要创建渲染器，我们使用带有一个参数的[WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)类：一个`**{}**`包含所有选项的对象。我们需要指定`**canvas**`变量对应于我们`**<canvas>**`标签。
创建一个变量`**canvas**`，然后获取`**document.querySelector(...)**`在 `HTML` 中使用创建的`**<canvas>**`标签并将其存储在其中。
最好将画布分配给一个变量，因为我们将在下一课中使用这个变量操作`DOM`元素。
`**setSize(...)**`方法：我们还需要使用之前创建的对象的方法更新渲染器`**sizes**`的大小。该`**setSize(...)**`方法将相应地自动调整我们`**<canvas>**`的大小：
```typescript
// Canvas
const canvas = document.querySelector('canvas.webgl')

// ...

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
```
现在，我们还是看不到任何东西，但是画布就在那里，并且已经相应地调整了大小。可以使用开发人员工具来检查`**<canvas>**`的大小。
## 首先渲染 
是时候开始我们的第一次渲染了。`**render(...)**`在渲染器上调用该方法并将其发送`**scene**`和`**camera**` 参数：
```typescript
renderer.render(scene, camera)
```
依然没有？问题是：**我们没有指定对象的位置，也没有指定相机的位置。两者都处于默认位置，即场景的中心，我们无法从实心的对象内部看到对象整体外貌**（默认情况下）。
我们需要移动对象。
为此，我们可以访问每个对象的多个属性，例如`**position**`、`**rotation**`和`**scale**`。现在，使用`**position**`属性向后移动相机。
该`**position**`属性是一个具有三个相关属性的对象：`**x**`,`**y**`和`**z**`。默认情况下，Three.js 认为向前/向后轴是`**z**`.
要向后移动相机，我们需要为该属性提供一个正值。一旦你创建了`**camera**`变量，你就可以在任何地方使用，但它必须在你进行渲染之前使用：
```typescript
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684314459056-6c554e73-cef0-4176-9a5d-82de52c9a5bc.png#averageHue=%23c4c2c2&clientId=u7631935b-3db6-4&from=paste&id=ubb5848d7&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ud8ae2eb8-5e28-4d2b-ad03-2fc9e8f509e&title=)
恭喜，我们看到了的第一个渲染出来的作品。它看起来像一个正方形，那是因为相机与立方体完美对齐，你只能看到它的一侧。
不要担心渲染的大小；稍后我们将学习如何使画布适合视口。
在接下来的课程中，您将了解有关`**position**`、`**rotation**`和`**scale**`属性的更多信息，以及如何更改它们以及为场景制作动画。

# 04.Local Server本地服务器
## 介绍
上节课我们实现的加载Three.js的方式是最简单的。不幸的是，它有两个缺点及主要限制。
首先，**我们只能访问“核心”类**。这个核心中有几十个类，我们可以用它们做很多事情，但我们并没有掌握所有的的类和属性。例如，在以后的课程中，我们将需要访问`OrbitControls`该类，这在核心类中是不可用的。
其次，当打开这样的 `HTML` 文件时，您的浏览器不会让 `JavaScript` 执行任何指令。例如，**您将无法加载纹理或模型等本地文件**。出于安全原因，这实际上是一件好事。我们不希望脚本仅仅因为打开了一个被我们认为安全的 `HTML` 文件就可以从我们的计算机里读取并加载文件。
但是，我们仍然需要能够像运行在线网站一样运行 `JavaScript` 代码，为此，我们需要一个能运行在本地服务器的项目。
有很多方法可以处理这些问题，但最简单的解决方案是使用“构建工具”或“捆绑器”。
## 构建工具的状态
现在有很多可用的构建工具，您可能听说过其中一些，例如 `Webpack`、`Vite`、`Gulp`、`Parcel` 等。
它们都有各自的优点和缺点，但我们将在接下来的课程中使用其中一个进行构筑。
现在最流行的构建工具是`Webpack`。它被广泛使用，它有一个很棒的社区，你可以用它做很多事情。但是，尽管 `Webpack` 最受欢迎，但它并不是最受赞赏的。
事实上，如今最受欢迎的构建工具是[Vite](https://vitejs.dev/)（法语中“快速”的意思，发音/vit/类似于“veet”）。它安装速度更快，运行速度更快，而且更不容易出现错误。开发人员的体验更好。
最初，所有 `Three.js Journey` 练习都在 `Webpack` 上运行，并且大多数课程都是这样记录的。但是现在，练习是在 `Vite` 上运行的。别担心即使你还没接触过`Vite`，学习没有额外的学习成本，因为 `Vite`的配置与 `Webpack` 配置非常相似。
## Vite 
> 如果你已经会使用Vite了
> 请直接下载启动包：启动包文件在我的[github](https://github.com/flowers-10/Three-Learn/tree/de9b6fcc0504929701cb9de876402c4c5a7bfdaf)的一次提交中。（[https://github.com/flowers-10/Three-Learn/tree/de9b6fcc0504929701cb9de876402c4c5a7bfdaf](https://github.com/flowers-10/Three-Learn/tree/de9b6fcc0504929701cb9de876402c4c5a7bfdaf)）

这不是关于 `Vite` 的课程，我将简单的解释一些关于它的事情。
如前所述，[Vite](https://vitejs.dev/)是一个构建工具。我们的想法是，我们将编写 `HTML/CSS/JS` 等 `Web` 代码，而 `Vite` 将构建最终网站。它还会做很多事情，比如**优化、缓存中断、源映射、运行本地服务器**等。
 `Vite` 可以处理一些基本的需求，我们还可以添加插件以处理更多功能，例如外来语言或特殊文件。实际上，我们将在课程的后面添加一个插件，它将能够处理 `GLSL` 文件以**创建自定义着色器**。
`Vite` 由 `Vue.js`的创建者 Evan You (鱿鱼须)创建，并由数百名开发人员高度维护。
### 节点.js
首先，您需要在计算机上安装[Node.js。](https://nodejs.org/)
`Node.js` 允许在浏览器之外的计算机上运行 `JavaScript`。能运行各种工具，像`Vite`，它已经存在很多年了，非常流行。
如果您不知道 `Node.js` 是否已安装或安装了哪个版本，请打开您的终端 (MacOS) 或命令提示符 (Windows) 并运行`node -v`.
如果终端告诉您`node`无法识别该命令，则表示未安装。
如果已安装，答案将包含当前版本。确保它已更新到最新版本。`Vite` 目前适用于**14.18**及以上版本，但我建议您始终安装 `Node.js` 的 `LTS`（长期支持）版本。
要安装或更新 `Node.js`，请转到[https://nodejs.org/en/](https://nodejs.org/en/)，下载“LTS”并使用默认设置安装它。
关闭您的终端 (MacOS) 或命令提示符 (Windows)，重新打开它，然后node -v再次运行以检查版本。
### 压缩文件
现在我们已经在我们的计算机上安装了 `Node.js`，我们可以运行 `starter`。
文件在我的[github](https://github.com/flowers-10/Three-Learn/tree/de9b6fcc0504929701cb9de876402c4c5a7bfdaf)的入门包提交中。
![288aa54acec49a8cc06f90fd38e00008.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684376727017-6ee91acb-4092-4954-8e91-b872405d5145.png#averageHue=%23fefefe&clientId=ube14fb02-61aa-4&from=paste&height=212&id=uf93a4418&originHeight=424&originWidth=1570&originalType=binary&ratio=2&rotation=0&showTitle=false&size=68535&status=done&style=none&taskId=u91854a96-20a4-4f14-856f-c35439903e7&title=&width=785)
### 依赖关系
现在我们在项目文件夹中，我们需要安装依赖项。“什么依存关系？” 你可能会问？好吧，这个项目有两个依赖项：`Vite` 和 `Three.js`。
要安装它们，请`npm install`从您的终端运行。
稍等片刻，您应该会看到`node_modules`在项目文件夹中创建了一个文件夹。
当我们安装 `Node.js` 时，我们会自动安装 `NPM`。[NPM](http://npmjs.com/)是一个依赖项管理器，它将获取`package.json`文件中列出的依赖项并将它们安装到`node_modules`文件夹中。
### 运行服务器
 现在我们可以让 `Vite` 运行服务器了。
为此，仍然在终端和项目文件夹中，运行`npm run dev`.
等待一两秒钟，该网站将在您的默认浏览器中打开，页面上写着“Soon to be a Three.js experience”。
如果页面没有打开，终端应该显示两个类似于`http://localhost:5173/`和 的URL `http://0.0.0.0:5173/`。在您的浏览器中输入它们也可以访问。
## 更多关于 Vite 模板 
在我们继续之前，您需要了解有关 Vite 模板的一些事项：

- 文件中设置了 `Vite` 配置`vite.config.js`。如果你对如何配置 `Vite` 项目感到好奇，请查看[Vite 网站](https://vitejs.dev/)。
- `npm install`下载项目后只需运行一次。
- 每次要`npm run dev`运行服务器并开始编码时都需要运行。您的终端可能看起来卡住了，但这是完全正常的，这意味着服务器正在运行。
- 按`CTRL + C`停止服务器。您可能需要在 `Windows` 系统上多次按快捷方式或使用字母 确认o。
- 您需要探索的唯一文件夹是`src/`和`static/`文件夹。
- 在该`src/`文件夹中，您可以找到传统的`index.html`、`script.js`和`tyle.css`文件。
- 您可以将“静态文件”放在该`static/`文件夹中。这些文件将被使用，就好像它们在根文件夹中可用一样（无需编写static/）。`/door.jpg`您可以通过在 URL 末尾添加( http://localhost:5173/door.jpg) 来进行访问。稍后我们将**使用它来加载纹理和模型**。
- 当您保存任何这些文件时，该页面将自动热更新重新加载。
- 您可以通过键入看起来像这样的相同 URL 从同一网络上的任何其他设备访问您的本地服务器http://192.168.1.25:5173。在手机等其他设备上进行调试非常有用。如果它不起作用，通常是因为您的防火墙拦截导致。
## 找回 Three.js 场景
这是简单的部分。我们先在这个 `Vite` 模板中恢复我们的 `Three.js` 场景。
首先，我们需要把`<canvas>`添加到文件`src/index.html`中：
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>04 - Local Server</title>
    <link rel="stylesheet" href="./style.css">
  </head>
  <body>
    <canvas class="webgl"></canvas>
    <script type="module" src="./script.js"></script>
  </body>
</html>
```
现在我们需要在文件中添加与上一课相同的 `JavaScript` 代码`/src/script.js`。唯一的区别是我们需要先导入 `Three.js`。
要导入 `Three.js`，我们需要在文件的最开头写下以下行`/src/script.js`：
这样就可以在项目引入THREE依赖
```javascript
import * as THREE from 'three'
```
这将在变量`THREE`中导入 `Three.js` 的所有核心类。该`three`模块在`/node_modules/`文件夹中，但我们不需要关心它的位置。
然后我们可以写入与之前相同的代码：
```javascript
import * as THREE from 'three'

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
```
如果服务器已经在运行，请打开页面（无需重新加载）。
如果没有，`npm run dev`从终端运行，页面应该打开。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684374471284-f6bbe476-b3b8-49e8-aa48-7282cd51dae6.png#averageHue=%23c4c2c2&clientId=udacd111f-f86f-4&from=paste&id=u49def181&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u631ee010-2ebe-4b13-9c3a-27df7d8994c&title=)
就是这样。我们有与上一课相同的代码运行，但这次使用构建工具来处理本地服务器并为我们做一些其他优化。
接下来大部分课程都是使用 `Webpack` 录制的，您可能会看到细微差别。但是，应该不会太影响你学习three.js。

# 05.Transform objects变换对象
## 介绍
现在一切就绪，我们可以探索 `Three.js` 的功能。
在为我们的场景设置动画之前，我们需要知道如何变换场景中的对象。我们已经通过使用`camera.position.z = 3`.
有 4 个属性可以在我们的场景中转换对象

- **position（移动物体）**
- **scale（调整对象大小）**
- **rotation（旋转物体）**
- **quaternion（同时旋转对象；稍后会详细介绍）**

从[Object3D](https://threejs.org/docs/#api/en/core/Object3D)类继承的所有类都拥有那些属性，如[PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)或[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)以及我们尚未涵盖的类。
你可以在 `Three.js` 文档的顶部看到继承每个类。
这些属性将被编译成我们所说的**矩阵**。`Three.js`、`WebGL` 和 `GPU` 在内部使用矩阵来转换事物。幸运的是，您不必自己处理矩阵，只需修改前面提到的属性即可。
## 设置
我们现在所拥有的只是我们在上一课中如何将立方体放在视图中心的项目。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684377960958-cb9e8e14-ba92-48ea-a3fe-fd05c440d5f2.png#averageHue=%23c5c2c2&clientId=u021ba30b-3007-4&from=paste&id=u67fc49b2&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u4ddc12a7-75fa-45e2-a84d-d6b91659a4f&title=)
## 移动对象 mesh.position
`position`具有3 个基本属性，分别是`x`、`y`和`z`。这些是在 3D 空间中定位某物的 **3 个必要轴**。
每个轴的方向都是任意的，可以根据环境而变化。在`Three.js`中，我们通常认为`**y**`**轴是向上的，**`**z**`**轴是向后的，**`**x**`**轴是向右的**。
至于`1unit`是什么意思，就看你的了。1可以是 1 厘米、1 米，甚至 1 公里。我建议您根据要构建的内容调整`unit`。如果你打算建造一座房子，你可能应该将1单位视为 1 米。
您可以多多尝试`mesh.position`属性，并尝试猜测立方体将到达哪里（尝试将其保留在屏幕中）。
确保在调用该render(...)方法之前执行此操作，否则您将在mesh移动它之前渲染它。

```javascript
mesh.position.x = 0.7
mesh.position.y = - 0.6
mesh.position.z = 1
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684377961224-41a94372-bce9-4f90-8336-720965ede32a.png#averageHue=%23cbc2c2&clientId=u021ba30b-3007-4&from=paste&id=ueedcfee7&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u0897521e-6af4-4f1b-a71f-e5271a8e894&title=)
该`position`属性不是任何对象。它是[Vector3](https://threejs.org/docs/#api/en/math/Vector3)类的一个实例。虽然此类具有`x`、 `y`和`z`属性，它还有许多有用的方法。
您可以获得向量的长度：
```javascript
console.log(mesh.position.length())
```
[您可以获得与另一个Vector3](https://threejs.org/docs/#api/en/math/Vector3)的距离（确保在创建相机后使用此代码）：
```javascript
console.log(mesh.position.distanceTo(camera.position))
```
您可以对其值进行归一化（这意味着您会将向量的长度减少到1单位但保留其原始方向）：
```javascript
console.log(mesh.position.normalize())
```
要更改所有值，而不是单独更改`x`,`y`和`z`，您还可以使用以下`set(...)`方法：
```javascript
mesh.position.set(0.7, - 0.6, 1)
```
## 坐标轴助手 [AxesHelper](https://threejs.org/docs/#api/en/helpers/AxesHelper)
**在空间中定位物体可能是一个真正的挑战**。我们知道每个轴的方向很复杂，尤其是当我们开始移动相机时。
有一个好的解决方案是使用 Three.js [AxesHelper](https://threejs.org/docs/#api/en/helpers/AxesHelper)。
AxesHelper将显示与轴对应[的](https://threejs.org/docs/#api/en/helpers/AxesHelper)3 条线，每条线都从场景的中心开始并朝相应的方向移动。`x``y``z`
要创建[AxesHelper](https://threejs.org/docs/#api/en/helpers/AxesHelper)，请将其实例化并在实例化后将其添加到右侧scene。您可以将行的长度指定为唯一的参数：
```javascript
/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684377961258-eee715eb-d14f-4f27-a32c-8e07625de5fa.png#averageHue=%23cbc2c2&clientId=u021ba30b-3007-4&from=paste&id=ucafeefb6&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u78396854-78c3-43d5-8cbc-2168dd05e22&title=)
我们看到一条绿线和一条红线。
绿线对应于y轴。红线对应于x轴，还有一条蓝线对应于z轴，但我们看不到它，因为它与相机完美对齐。xz
我们在接下来的课程中不会使用此[AxesHelper ，但如果您需要可视化参考，请随时添加它。](https://threejs.org/docs/#api/en/helpers/AxesHelper)
## 缩放对象 mesh.scale
`scale`也是一个[Vector3](https://threejs.org/docs/#api/en/math/Vector3)属性。**默认情况下**`**x**`**，**`**y**`**和**`**z**`**都等于1**，这意味着对象没有应用缩放。如果你把它的数值赋予为`0.5`，对象将会缩放到它在这个轴上的一半大小，如果你把它的数值赋予为`2`，对象将会缩放到它在这个轴上的原始大小的两倍。
如果更改这些值，对象将开始相应地缩放。注释position并添加这些比例：
```javascript
mesh.scale.x = 2
mesh.scale.y = 0.25
mesh.scale.z = 0.5
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684377961207-463466d3-622e-46df-a471-5a5a86459eac.png#averageHue=%23c3c2c2&clientId=u021ba30b-3007-4&from=paste&id=ua93d2693&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u833620e2-5bea-4fef-8d55-41d3c03aeaf&title=)
显然，我们看不到比例尺z，因为我们的[网格](https://threejs.org/docs/#api/en/objects/Mesh)正对着相机。
虽然您可以使用负值来看到Z轴，但稍后可能会产生错误，因为轴不会以逻辑反方向去定位。我们应该尽量避免这样做。
因为它是一个[Vector3](https://threejs.org/docs/#api/en/math/Vector3)属性，所以我们可以使用前面提到的所有方法。
## 旋转对象 mesh.rotation
`position`旋转比较`scale`麻烦一点。一般有两种处理旋转的方法。
您可以使用不言自明的`rotation`属性，但也可以使用不太明显的`quaternion`属性。`Three.js` 两者都支持，更新一个会自动更新另一个。这只是你喜欢哪一个的问题。
#### `rotation`
该`rotation`属性还具有`x`、`y`和`z`属性，但不是[Vector3](https://threejs.org/docs/#api/en/math/Vector3)类的属性，而是[Euler](https://threejs.org/docs/index.html#api/en/math/Euler)类。当您更改[Euler](https://threejs.org/docs/index.html#api/en/math/Euler)的`x`、`y`和`z`属性时，您可以想象将一根棍子沿轴的方向穿过对象的中心，然后在该棍子上旋转该对象。

- 如果你绕y轴旋转，你可以把它想象成一个旋转木马。
- 如果您绕x轴旋转，您可以想象您正在旋转您将要乘坐的汽车的车轮。
- 如果你绕z轴旋转，你可以想象你正在旋转你所在飞机前面的螺旋桨。

这些轴的值以弧度表示。如果你想实现半圈旋转，你必须写出类似圆周率 `3.14159`的东西......你可能认为这个数字是 π。在原生 JavaScript 中，您可以使用 得到 π 的近似值`Math.PI`。
`scale`的x和y轴上添加八分之一圈旋转：
```javascript
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684377961167-3a4e3b46-105e-42f3-86a4-c5e73589779d.png#averageHue=%23c5c2c2&clientId=u021ba30b-3007-4&from=paste&id=ucf8a80c8&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uf0af77f3-73f4-4347-afda-517e78d7d27&title=)
这简单吗？是的，但是当你组合这些旋转时，你可能会得到奇怪的结果。
为什么？因为，在旋转x轴的同时，您还更改了其他轴的方向。旋转按以下顺序执行：`x`、`y`，然后`z`。当一个轴不再起作用时，这可能会导致奇怪的行为，例如一个名为 gimbal lock 的行为，这都是因为之前的轴旋转造成的。
我们可以使用以下`reorder(...)`方法 更改此顺序`object.rotation.reorder('YXZ')`
虽然[Euler](https://threejs.org/docs/index.html#api/en/math/Euler)更容易理解，但此顺序问题可能会导致问题。这就是为什么大多数引擎和 3D 软件使用另一种名为[Quaternion](https://threejs.org/docs/#api/en/math/Quaternion)的解决方案。
#### `quaternion`
该`quaternion`属性还表示旋转，但以更数学的方式解决了顺序问题。
我们不会在本课中介绍四元数的工作原理，但请记住，`quaternion`当您更改`rotation`. 这意味着您可以随意使用两者中的任何一个。
#### lookAt(...)
[Object3D](https://threejs.org/docs/#api/en/core/Object3D)实例有一个名为`lookAt(...)`的出色方法，可让您要求查看某对象。该对象将自动将其-z轴旋转到您提供的目标位置。不需要复杂的数学。
您可以使用它来将相机旋转到一个物体上，类似将大炮对准敌人，或者将角色的眼睛移到一个物体上。
参数是目标并且必须是[Vector3](https://threejs.org/docs/#api/en/math/Vector3)。您可以创建一个来尝试一下：

```javascript
camera.lookAt(new THREE.Vector3(0, - 1, 0))
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684377965463-36c1dfac-d0ea-484d-887b-11613ba379ca.png#averageHue=%23c6c2c2&clientId=u021ba30b-3007-4&from=paste&id=ue6d9f8ad&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ua207a768-0381-4c68-a3e8-2faf4e1cc35&title=)
立方体看似更高，但实际上是因为摄像机是在立方体下方看的。
我们也可以使用任何现有的[Vector3，](https://threejs.org/docs/#api/en/math/Vector3)例如 `mesh`，`position`但这将导致mesh位置改变，因为我们mesh位于scene的中心。

```javascript
camera.lookAt(mesh.position)
```
## 组合变换
您可以按任意顺序组合`position`、`rotation`（或`quaternion`）和`scale`结果是一样的。它相当于对象的状态。
让我们结合之前尝试过的所有转换：

```javascript
mesh.position.x = 0.7
mesh.position.y = - 0.6
mesh.position.z = 1
mesh.scale.x = 2
mesh.scale.y = 0.25
mesh.scale.z = 0.5
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684377965509-a9e839c2-0b25-4621-a551-d7b38762cba0.png#averageHue=%23c6c2c2&clientId=u021ba30b-3007-4&from=paste&id=ua5199ae5&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ub33a7003-1178-49ad-8d20-a5716d0cce1&title=)
## 场景图 [Group](https://threejs.org/docs/#api/en/objects/Group)
在某些时候，您可能想要对事物进行分组。假设您正在建造一座有墙壁、门、窗户、屋顶、灌木等的房子。
当您认为已经完成时，您会意识到房子太小了，您必须重新缩放每个对象并更新它们的位置。
**一个好的替代方法是将所有这些对象分组到一个容器中并缩放该容器**。
您可以使用[Group](https://threejs.org/docs/#api/en/objects/Group)类来做到这一点。
实例化一个[组](https://threejs.org/docs/#api/en/objects/Group)并将其添加到场景中。现在，当你想创建一个新对象时，你可以使用方法将它添加到刚刚创建的[组](https://threejs.org/docs/#api/en/objects/Group)add(...)中，而不是直接添加到场景中
因为[Group](https://threejs.org/docs/#api/en/objects/Group)类继承自[Object3D](https://threejs.org/docs/#api/en/core/Object3D)类，所以它可以访问前面提到的属性和方法，如`position`、`scale`、`rotation`、`quaternion`和`lookAt`。
创建 3 个多维数据集并将它们添加到一个[组](https://threejs.org/docs/#api/en/objects/Group)中。然后在`group`上应用转换：
```javascript
/**
 * Objects
 */
const group = new THREE.Group()
group.scale.y = 2
group.rotation.y = 0.2
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube1.position.x = - 1.5
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube2.position.x = 0
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube3.position.x = 1.5
group.add(cube3)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684377965246-a85aaa00-9fc6-45f5-8177-57cc36858c95.png#averageHue=%23d7c2c2&clientId=u021ba30b-3007-4&from=paste&id=uc99e135f&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u093fc1b6-25bd-4d31-b71f-9cae739f0ee&title=)
顺序并不重要，只要它是有效的 JavaScript。
现在我们知道如何变换对象，是时候创建一些动画了。

# 06.Animations动画
## 介绍
我们创建了一个场景，我们在代码末尾渲染了一次。这已经是不错的进步了，但大多数时候，您会想要为您的作品制作一些动态效果动画。
使用 Three.js 时，动画效果类似于定格动画。您移动对象，然后进行渲染。然后再移动对象一点，再做一次渲染。等等。在渲染之间移动对象越多，它们看起来移动得越快。
您正在查看的屏幕以特定频率运行。我们称之为帧率。帧率主要取决于屏幕，但计算机本身有局限性。大多数屏幕以每秒 60 帧的速度运行。如果你算一下，这意味着大约每 16 毫秒一帧。但是有些屏幕可以运行得更快，当计算机处理事情有困难时，它会运行得更慢。
我们想要执行一个函数，该函数将移动对象并在每帧上进行渲染，而不管帧速率如何。
这样做的本机 JavaScript 方法是使用`window.requestAnimationFrame(...)`方法。
## 设置
和以前一样，我们在启动器中拥有的只是场景中心的立方体。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684390315765-8c33f1ee-6651-4912-be1f-f66fae187339.png#averageHue=%23c5c2c2&clientId=ue2f5f078-9d3d-4&from=paste&id=uffcc68aa&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u9bd70f84-9526-4125-99ef-07f2eb1ab4e&title=)
## 使用 [requestAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame)
[requestAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame)没有办法在每一帧上运行代码。
`requestAnimationFrame`是将在下一帧执行我们提供的命令。但是，如果我们使用**递归死循环调用自身，**此函数`requestAnimationFrame`也用于在下一帧再次执行自己，那么最终将永远在每一帧执行这个函数。
创建一个名为的函数`tick`并调用该函数一次。在此函数中，用于`window.requestAnimationFrame(...)`在下一帧调用相同的函数：

```javascript
/**
 * Animate
 */
const tick = () =>
{
    console.log('tick')

    window.requestAnimationFrame(tick)
}

tick()
```
就是这样。开始了无限循环。
我们可以在控制台上看到的，'tick'在每一帧上都调用了。如果您在高帧率的计算机上测试此代码，'tick'会以更高的频率出现。
您现在可以`renderer.render(...)`在该函数内移动调用并增加立方体`rotation`：

```javascript
/**
 * Animate
 */
const tick = () =>
{
    // Update objects
    mesh.rotation.y += 0.01

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
```

恭喜，你现在有了一个 Three.js 动画。
问题是，如果你在高帧率的计算机上测试这段代码，立方体会旋转得更快，而如果你在较低的帧率下测试，立方体会旋转得更慢。
#### 适配帧率 Date.now()
为了使动画适应帧率，我们需要知道自上次更新以来已经过了多少时间。
首先，我们需要一种测量时间的方法。在本机 JavaScript 中，您可以使用`Date.now()`获取当前时间戳：

```javascript
const time = Date.now()
```
时间戳对应于自 1970 年 1 月 1 日（Unix 时间的开始）以来经过的时间。在 JavaScript 中，它的单位是毫秒。
现在需要的是将当前时间戳减去前一帧的时间戳，以获得我们可以调用的值，`deltaTime`并在为对象设置动画时使用该值：

```javascript
/**
 * Animate
 */
let time = Date.now()

const tick = () =>
{
		// Time
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime

    // Update objects
    mesh.rotation.y += 0.01 * deltaTime

    // ...
}

tick()
```
我们的旋转基于自上一帧以来所花费的时间，那么无论帧速率如何，每个屏幕和每台计算机的旋转速度都是相同的。
## 使用时钟 [Clock](https://threejs.org/docs/#api/en/core/Clock)
[虽然这段代码并没有那么复杂，但 Three.js 中有一个名为Clock](https://threejs.org/docs/#api/en/core/Clock)的内置解决方案来处理时间计算。
您只需[Clock](https://threejs.org/docs/#api/en/core/Clock)实例化一个`clock`变量并使用内置方法，如`getElapsedTime().` [此方法将返回自时钟](https://threejs.org/docs/#api/en/core/Clock)创建以来经过了多少秒。
您可以使用此值来旋转对象：
```javascript
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    mesh.rotation.y = elapsedTime

    // ...
}

tick()
```
您还可以使用tick来移动带有`position`属性的东西。如果你想把这两个属性结合起来，使用`Math.sin(...)`你会得到一个环形运动的几何体：

```javascript
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    mesh.position.x = Math.cos(elapsedTime)
    mesh.position.y = Math.sin(elapsedTime)

    // ...
}

tick()
```
显然，您可以使用这些技术为任何[Object3D](https://threejs.org/docs/#api/en/core/Object3D)制作动画，例如相机：
```javascript
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    camera.position.x = Math.cos(elapsedTime)
    camera.position.y = Math.sin(elapsedTime)
    camera.lookAt(mesh.position)

    // ...
}

tick()
```

另一个可用的方法是`getDelta(...)`，但除非您确切知道[Clock](https://threejs.org/docs/#api/en/core/Clock)类代码中发生了什么，否则不应使用它。使用它可能会弄乱您的动画，并且您会得到不需要的结果。
## 使用动画库 [GSAP](https://greensock.com/gsap/)
有时您会想要以一种非常特殊的方式为您的场景制作动画，这将需要使用另一个库。动画库有很多，但最著名的是[GSAP](https://greensock.com/gsap/)。
要将 GSAP 添加到我们的项目中，我们可以使用 Node.js 提供的依赖管理器，称为`npm`.
在您的终端中（当服务器未运行或在同一文件夹上使用另一个终端窗口时），运行`npm install --save gsap@3.5.1`
该`--save`参数将依赖项保存在 中，`package.json`因此如果我们执行`npm install`.
强制@3.5.1版本。我们使用这个版本是因为它是编写课程时使用的版本，但如果您愿意，可以通过删除@3.5.1来安装最新版本.
GSAP 现在在文件夹中可用`node_modules/`，我们可以将其导入我们的`script.js`：

```javascript
import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// ...
```

使用 GSAP 的方法有很多种，我们可以用一门完整的课程来介绍它，但这不是本课程的目标。我们将简单地创建一个demo来测试。如果您已经知道如何使用 GSAP，那么它与 Three.js 的工作方式相同。
注释与先前动画相关的代码，但保留`tick`功能与渲染。然后你可以使用以下方法创建我们所说的补间（从 A 到 B 的动画）`gsap.to(...)`：

```javascript
/**
 * Animate
 */
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

const tick = () =>
{
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
```
GSAP 有一个内置的`requestAnimationFrame`，所以你不需要自己更新动画，但是，如果你想看到立方体移动，你需要在每一帧上继续渲染你的场景。
## 选择正确的解决方案 
至于原生JS和动画库的选择，看你想达到什么效果。如果您要创建一个永远旋转的旋转木马，则不需要任何库。但是如果你想制作动画，例如剑的挥动，我更推荐你用别的动画库实现。

# 07.Cameras相机
## 介绍
我们已经创建过了一个`PerspectiveCamera`，但还有其他类型的相机，如您在文档中所见。
#### 相机 [Camera](https://threejs.org/docs/#api/en/cameras/Camera)
`Camera`类就是我们所说[的](https://threejs.org/docs/#api/en/cameras/Camera)抽象类。你不应该直接使用它，但你可以继承它来访问公共属性和方法。以下一些类继承自[Camera](https://threejs.org/docs/#api/en/cameras/Camera)类。
#### 阵列相机 ArrayCamera
ArrayCamera 用于通过使用多个相机来多次渲染您的场景。每个相机将渲染画布的特定区域。你可以想象这看起来像老式的多人游戏控制台，我们必须共享一个分屏。
#### 立体相机 StereoCamera
StereoCamera用于通过两个模仿眼睛的相机渲染场景，以创建我们所说的视差效果，从而诱使您的大脑认为存在深度[。](https://threejs.org/docs/#api/en/cameras/StereoCamera)您必须拥有足够的设备，例如 VR 耳机或红色和蓝色眼镜才能看到结果。
#### 立方相机 CubeCamera
CubeCamera用于获取面向每个方向（向前、向后、向左、向右、向上和向下）的渲染，以创建周围环境的渲染[。](https://threejs.org/docs/#api/en/cameras/CubeCamera)您可以使用它来创建用于反射的环境贴图或阴影贴图。我们稍后会谈到这些。
#### 正交相机 OrthographicCamera
OrthographicCamera用于在没有透视的情况下创建场景的正交渲染[。](https://threejs.org/docs/#api/en/cameras/OrthographicCamera)如果您制作像帝国时代这样的 RTS 游戏，它会很有用。无论元素与相机的距离如何，它们在屏幕上的大小都是相同的。
#### 透视相机 PerspectiveCamera
PerspectiveCamera是我们已经使用过的[，](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)它模拟了具有透视功能的真实相机。
我们将重点关注[OrthographicCamera](https://threejs.org/docs/#api/en/cameras/OrthographicCamera)和[PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)。
## 透视相机 [PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)
正如我们之前看到的，[PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)类需要一些参数来实例化，但我们并没有使用所有可能的参数。添加第三个和第四个参数：

```javascript
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684395670204-4c375b1d-2ab8-4514-9516-a191200200d0.png#averageHue=%23c4c2c2&clientId=u83458110-111d-4&from=paste&id=ue386b335&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u2f04765b-a2e9-424e-a437-98516ede5f4&title=)
您应该得到相同的结果，但让我们详细讨论这些参数。
#### 视野
第一个参数称为**视野**，对应于您的相机视图的垂直振幅角度（以度为单位）。如果你使用小角度，你最终会得到一个长范围的效果，如果你使用广角，你最终会得到一个鱼眼效果，因为最终，相机看到的东西会被拉伸或挤压以适合画布。
至于选择正确的视野，您必须尝试一下。我通常使用45～75之间的视野。
#### 纵横比
第二个参数称为宽高比，对应于宽度除以高度。虽然您可能认为这显然是画布宽度乘以画布高度并且 Three.js 应该自己计算它，但如果您以非常谨慎的方式开始使用 Three.js，那么情况可能并不总是这样。在我们的例子中，我们可以简单地使用画布宽度和画布高度。
我建议将这些值保存在一个对象中，因为我们将多次需要它们：

```javascript
const sizes = {
    width: 800,
    height: 600
}
```
#### 近与远 **near/far**
第三个和第四个参数称为**near**和**far**，对应于相机可以看到多近和多远。任何对象或对象的一部分比该`near`值更靠近相机或比`far`该值更远离相机,那么这个物体将不会显示在可视的范围上。	
你可以想象，就像在那些古老的赛车游戏中一样，你可以看到远处的树木突然冒出来，又从背后消失不见。
虽然您可能很想使用非常小和非常大的值，例如，0.0001您9999999，但是可能会遇到一个称为 z-fighting 的错误，其中两个面似乎在叠合在一起了，因为其中一个将渲染在另一个之上。
[https://twitter.com/FreyaHolmer/status/799602767081848832](https://twitter.com/FreyaHolmer/status/799602767081848832)
[https://twitter.com/Snapman_I_Am/status/800567120765616128](https://twitter.com/Snapman_I_Am/status/800567120765616128)
尝试使用合理的值并仅在需要时增加这些值。在我们的例子中，我们可以使用0.1和100。
## 正交相机 [OrthographicCamera](https://threejs.org/docs/#api/en/cameras/OrthographicCamera)
虽然我们不会在课程的其余部分使用这种类型的相机，但它对特定项目很有用。
OrthographicCamera与[PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)的不同之处在于它没有透视，这意味着无论对象与相机的距离如何，它们都将具有相同的大小[。](https://threejs.org/docs/#api/en/cameras/OrthographicCamera)
您必须提供的参数与[PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)有很大不同。
您必须提供相机在每个方向（ `left`、`right`和`top`）可以看到的距离，而不是视野`bottom`。然后您可以像我们为[PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)所做的那样提供`near`和`far`值。
在项目中我们注释[PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)并添加[OrthographicCamera](https://threejs.org/docs/#api/en/cameras/OrthographicCamera)。保持`position`更新并`lookAt(...)`：

```javascript
const camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0.1, 100)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684395670221-cad8e26b-a90a-4d96-ac39-69073a9113de.png#averageHue=%23dcc2c2&clientId=u83458110-111d-4&from=paste&id=ua0428c2a&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uce00698b-0f56-4bd8-8909-7f1683ca91f&title=)
如您所见，没有透视图，立方体的边看起来是平行的。问题是我们的立方体看起来不是立方体。
这是由于我们为`left`、`right`、`top`和`bottom`提供的值是1或- 1，这意味着我们渲染一个正方形区域，但该正方形区域将被拉伸以适合我们的矩形画布，而我们的画布不是正方形。
我们需要使用画布比例（宽度乘以高度）。让我们创建一个名为`aspectRatio`（就像 PerspectiveCamera）的变量并将该比率存储在其中：

```javascript
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684395670186-78e90a32-6ae3-479f-b52f-f2916877143a.png#averageHue=%23d5c2c2&clientId=u83458110-111d-4&from=paste&id=u1b2b7fda&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u280b252e-78fa-44a4-bf2f-cab3437c69f&title=)
这导致渲染区域宽度大于渲染区域高度，因为我们的画布宽度大于其高度。
现在我们有一个看起来像立方体的立方体。
## 自定义控件
让我们回到我们的[PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)。注释[OrthographicCamera](https://threejs.org/docs/#api/en/cameras/OrthographicCamera)，取消注释[PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)，移动`camera`使其面向立方体，并删除函数中的网格旋转tick：

```javascript
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)

// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)
```
我们现在要做的是用鼠标控制相机。首先，我们要知道鼠标坐标。我们可以通过使用原生 `JavaScript` `addEventListener`监听`mousemove`事件来做到这一点。
坐标将位于回调函数的参数中，如`event.clientX`和`event.clientY`：

```javascript
// Cursor
window.addEventListener('mousemove', (event) =>
{
    console.log(event.clientX, event.clientY)
})
```
我们可以使用这些值，但我建议再调整一下它们。通过调整，我的意思是有一个振幅1的浮动，这个值可以是正的也可以是负的。
如果我们只关注`x`，那就意味着：

- 如果你的光标在画布的最左边，你应该得到- 0.5
- 如果你的光标在画布的中心，你应该得到0
- 如果你的光标在画布的最右边，你应该得到0.5

虽然这不是强制性的，但做好规范这样的习惯，它有助于提高你的代码水平。
就像我们规定的`size`变量一样，我们将创建一个具有默认值`x`和`y`属性的变量`cursor`，然后在`mousemove`回调中更新这些属性：

```javascript
// Cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5

    console.log(cursor.x, cursor.y)
})
```
event.clientX除以sizes.width会给我们一个介于`0`和`1`之间的值 （如果我们将光标保持在画布上方），而减法`- 0.5`会给我们一个介于`- 0.5`和`0.5`之间的值。
您现在已将鼠标位置存储在`cursor`对象变量中，您可以在函数中更新相机的位置`tick`：

```javascript
const tick = () =>
{
    // ...

    // Update camera
    camera.position.x = cursor.x
    camera.position.y = cursor.y

    // ...
}
```
轴的运动似乎有点不对劲。这是因为`position.y`在 `Three.js` 中向上时轴为正，而`clientY`在网页中向下时轴为正。
您可以通过在整个公式前面`cursor.y`添加一个来简单地反转更新它（不要忘记括号）：-

```javascript
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
})
```
最后，您可以通过乘以`cursor.x`和来增加振幅`cursor.y`，并使用以下方法让相机观察网格`lookAt(...)`：

```javascript
const tick = () =>
{
    // ...

    // Update camera
    camera.position.x = cursor.x * 5
    camera.position.y = cursor.y * 5
    camera.lookAt(mesh.position)

    // ...
}
```
我们可以更进一步，使用`Math.sin(...)`和`Math.cos(...)`使相机围绕网格进行完整旋转。
`sin`和`cos`，当以相同的角度组合使用时，我们可以将东西放在一个圆圈上。要进行完整旋转，该角度的振幅必须是 π 的 2 倍（称为“pi”）。就像你知道的那样，一个完整的旋转被称为“tau”，但我们无法在 JavaScript 中访问这个值，我们必须使用 π 代替。
您可以使用本机 JavaScript 访问 π 的近似值`Math.PI`。
要增加该圆的半径，您可以简单地将`Math.sin(...)`和的结果相乘`Math.cos(...)`：

```javascript
const tick = () =>
{
    // ...

    // Update camera
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    camera.position.y = cursor.y * 3
    camera.lookAt(mesh.position)

    // ...
}

tick()
```

虽然这是控制相机的良好开端，但 Three.js 集成了多个称为控件的类来帮助您做同样的事情以及更多。
## 内置控件
如果您在[Three.js 文档](https://threejs.org/docs/index.html#api/en/math/Euler)中键入“控件” ，您会看到有很多预制控件。我们课程案例将只使用其中一个，但了解它们的作用可能会很有趣。
#### 设备方向控件 [DeviceOrientationControls](https://threejs.org/docs/#examples/en/controls/DeviceOrientationControls)
[如果您的设备、操作系统和浏览器允许， DeviceOrientationControls](https://threejs.org/docs/#examples/en/controls/DeviceOrientationControls)将自动检索设备方向并相应地旋转相机。如果您拥有合适的设备，您可以使用它来创建身临其境的宇宙或 VR 体验。
#### 飞控 [FlyControls](https://threejs.org/docs/#examples/en/controls/FlyControls)
[FlyControls](https://threejs.org/docs/#examples/en/controls/FlyControls)可以像在宇宙飞船上一样移动相机。您可以在所有 3 个轴上旋转，前进和后退。
#### 第一人称控制 [FirstPersonControls](https://threejs.org/docs/#examples/en/controls/FirstPersonControls)
[FirstPersonControls](https://threejs.org/docs/#examples/en/controls/FirstPersonControls)就像[FlyControls](https://threejs.org/docs/#examples/en/controls/FlyControls)一样，但有一个固定的向上轴。你可以看到的视图就像飞翔的鸟，鸟不能滚动。虽然 FirstPersonControls 包含“FirstPerson”，但它不像在 FPS 游戏中那样工作。
#### 指针锁定控件 [PointerLockControls](https://threejs.org/docs/#examples/en/controls/PointerLockControls)
[PointerLockControls](https://threejs.org/docs/#examples/en/controls/PointerLockControls)使用[指针锁定 JavaScript API](https://developer.mozilla.org/docs/Web/API/Pointer_Lock_API)。此 API 隐藏光标，使其居中，并在mousemove事件回调中不断发送坐标位置移动。使用此 API，您可以直接在浏览器内创建 FPS 游戏。虽然如果您想创建那种交互，这个类很合适，但它只会在指针锁定时处理相机旋转。您必须自己处理摄像机位置和游戏物理。
#### 轨道控制 [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)
[OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)与我们在上一课中制作的控件非常相似。您可以使用鼠标左键围绕一个点旋转，使用鼠标右键横向平移，并使用滚轮放大或缩小。
#### 轨迹球控件 [TrackballControls](https://threejs.org/docs/#examples/en/controls/TrackballControls)
[TrackballControls](https://threejs.org/docs/#examples/en/controls/TrackballControls)就像[OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)，但在垂直角度方面没有限制。即使场景颠倒，您也可以继续旋转并旋转相机。
#### 变换控件 [TransformControls](https://threejs.org/docs/#examples/en/controls/TransformControls)
[TransformControls](https://threejs.org/docs/#examples/en/controls/TransformControls)与相机无关。您可以使用它向对象添加小控件以移动该对象。
#### 拖动控件 [DragControls](https://threejs.org/docs/#examples/en/controls/DragControls)
就像[TransformControls](https://threejs.org/docs/#examples/en/controls/TransformControls)一样，[DragControls](https://threejs.org/docs/#examples/en/controls/DragControls)与相机无关。您可以使用它通过拖放来移动面向相机的平面上的对象。
我们将只使用[OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)，但可以随意测试其他类。
## 轨道控制 [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)
我们在`tick`函数中更新`camera`的部分。
### 实例化
首先，我们需要使用[OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)类实例化一个变量。虽然您可能认为`THREE.OrbitControls`可以使用，但不幸的是您错了,``在`THREE`变量中没有包含`OrbitControls`该类；
OrbitControls 类属于是THREE变量中包含的默认不可用的类的。该决定有助于减轻库的重量。这就是我们的 Vite 模板的用武之地。
它仍然位于依赖项文件夹中。要导入它，您必须提供文件夹内部的路径`/node_modules/`，即`/three/examples/jsm/controls/OrbitControls.js`：

```javascript
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
```
您现在可以使用类`OrbitControls`（不带`THREE.`）实例化一个变量，**并确保在创建相机后执行此操作**。
要使其工作，您必须在页面中提供相机和将要添加鼠标事件的元素作为参数：

```javascript
// Controls
const controls = new OrbitControls(camera, canvas)
```

您现在可以使用鼠标左键或右键拖放来移动相机，并且可以向上或向下滚动以放大或缩小。
它比我们的自定义代码要容易得多，而且它带有更多的控件。但让我们更进一步。
### 目标 target
默认情况下，相机正在注视场景的中心。我们可以用`target`属性改变它。
这个属性是一个[Vector3](https://threejs.org/docs/#api/en/math/Vector3)，意味着我们可以改变它的x,y和z属性。
如果我们希望 OrbitControls[默认](https://threejs.org/docs/#examples/en/controls/OrbitControls)在立方体上方查看，我们只需增加属性y：

```javascript
controls.target.y = 2
```

但这不会像那样工作，因为我们需要告诉它`OrbitControl`自己更新。我们可以通过`update`在之后立即调用方法来做到这一点：

```javascript
controls.target.y = 2
controls.update()
```
### 减震 `enableDamping`
[如果您阅读OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)的文档，会提到`damping`. 阻尼将通过添加某种加速度和摩擦力公式来平滑动画。
要启用阻尼感，请将`controls`的属性`enableDamping`切换为`true`。
为了正常工作，还需要通过调用在每一帧上更新控件`controls.update()`。您可以在`tick`函数上执行此操作：

```javascript
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// ...

const tick = () =>
{
    // ...

    // Update controls
    controls.update()

    // ...
}
```

您会发现控件现在更加流畅。
您可以使用许多其他方法和属性来自定义您的控件，例如旋转速度、缩放速度、缩放限制、角度限制、阻尼强度和键绑定（您也可以使用键盘控制）。
## 何时使用内置控件
虽然这些控件很方便，但它们也有局限性。如果您过于依赖它们，您可能最终不得不以意想不到的方式改变代码实现逻辑。
首先，确保列出您需要的这些控件的所有功能，然后检查您将要使用的类是否可以处理所有这些功能。
如果没有，你将不得不自己封装一个。

# 08.Fullscreen and resizing 全屏和调整大小
## 介绍 
我们的画布目前有一个固定的分辨率`800x600`。项目中不一定需要 WebGL 填满整个屏幕，但如果您想要身临其境的体验，填满整屏的体验可能会更好。
首先，我们想让画布占据所有屏幕可用空间。然后，我们需要确保在用户调整窗口大小时它仍然自适应变化视口。最后，我们需要为用户提供一种全屏体验的方法。
## 设置
入门包含我们在上一课中完成的内容。我们的立方体位于中心，我们可以拖放以移动相机。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684461049903-c5c46628-b641-450c-915b-f2880970b7f4.png#averageHue=%23c5c2c2&clientId=ubbff3603-642e-4&from=paste&id=udc189f85&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u6d396bf9-6d8f-49f7-acf3-586431a6fbf&title=)
## 适合视口
要使画布完全根据视口变化，那就不能在`sizes`变量中使用固定数字了，请使用`window.innerWidth`and `window.innerHeight`：

```javascript
// ...

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// ...
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684461049737-4c494897-7300-4068-994a-82b0701fc9b4.png#averageHue=%23120707&clientId=ubbff3603-642e-4&from=paste&id=ub319ccd7&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ud3300213-f1c9-4dbb-8f83-d4ca163635b&title=)
您可以看到画布现在具有视口的宽度和高度。不幸的是，有一个白色边距和一个滚动条（如果看不到任何滚动条，请尝试滚动）。
原因是**浏览器都有默认样式**，例如重要的标题`<h1>`、带下划线的链接`<a/>`、段落之间的空格以及页面上的填充。有很多方法可以解决这个问题，这可能取决于您网站的其余页面。如果您有其他页面的内容，请尽量不要在执行此操作时污染全局样式。
我们将保持样式并使用 CSS 固定画布的位置。
我们的 HTML 加载`src/style.css`文件：
```javascript
<link rel="stylesheet" href="./style.css">
```
您可以像往常一样编写标准 CSS，页面将自动重新加载。
首先要做的一件好事是使用`*`通配符删除所有元素上的`margin`和`padding`的样式：

```css
*
{
    margin: 0;
    padding: 0;
}
```
然后，我们可以将画布固定在左上角，使用它的class `webgl` 来选择它：

```css
.webgl
{
    position: fixed;
    top: 0;
    left: 0;
}
```
您不需要在画布上指定`width` 或者`height`因为 Three.js 在您调用`renderer.setSize(...)`该方法时已经处理好了。
拖放时，您可能已经注意到上面有一个蓝色轮廓。这主要发生在最新版本的 Chrome 上。要解决这个问题，我们可以简单地在`.webgl`添加`outline: none`：

```javascript
.webgl
{
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
}
```
如果你想删除任何类型的滚动，即使是在触摸屏上，你可以在`html`,`body`上添加`overflow: hidden`：
```css
html,
body
{
    overflow: hidden;
}
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684461049922-2726aa6c-99da-45fc-be5e-74110abd3e76.png#averageHue=%230c0000&clientId=ubbff3603-642e-4&from=paste&id=u742337a0&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ua5f062d8-ffc0-4706-a94d-3afee0e587d&title=)
不幸的是，如果调整窗口大小，画布将不会随之改变。
**我们需要处理渲染器，让他自适应窗口调整大小**。
## 处理调整大小
要调整画布大小，我们首先需要知道何时调整窗口大小。为此，可以在窗口上监听`resize`事件。
添加侦听器`resize`，在浏览器的`sizes`变量改变之后会自动触发：

```javascript
window.addEventListener('resize', () =>
{
    console.log('window has been resized')
})
```
现在我们在调整窗口大小时触发了一个函数，我们需要更新代码中的一些东西。
首先，我们必须更新`sizes`变量：
```javascript
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
})
```
其次，我们必须`camera`通过更改其`aspect`属性来更新纵横比：
```javascript
window.addEventListener('resize', () =>
{
    // ...

    // Update camera
    camera.aspect = sizes.width / sizes.height
})
```
当您更改相机属性时，`aspect`还需要使用`camera.updateProjectionMatrix()`更新投影矩阵。稍后我们将讨论矩阵：
```javascript
window.addEventListener('resize', () =>
{
    // ...

    camera.updateProjectionMatrix()
})
```
最后，我们必须更新`renderer.` **更新渲染器会自动更新画布的宽度和高度**：

```javascript
window.addEventListener('resize', () =>
{
    // ...

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})
```
全部代码：
```javascript
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
})
```
您可以根据需要调整窗口大小，画布应覆盖视口而没有任何滚动条或溢出。
## 处理像素比
我们开发中，有些人可能会看到**一种模糊的渲染和边缘形状像楼梯的伪影**（称为锯齿），但不是所有人都会看到。如果遇到了这样的问题，那是因为**您的屏幕像素比大于1**。
像素比对应于软件部分的一个像素单元在屏幕上有多少个物理像素。
#### 一些历史
几年前，所有屏幕的像素比都`1`，一切都很好。但是当你仔细观察你的屏幕时，你可以看到那些像素，这限制了图像的精确度和字体的细度。
在这方面做得最多的公司是苹果公司。Apple 看到了机会，开始制造像素比为`2`Retina 的屏幕。现在，很多建设者都在这样做，你可以看到像素比更高的屏幕。
虽然这对图像质量来说是件好事，但像素比`2`意味着要渲染的像素也要多 4 倍。像素比`3`意味着要渲染的像素多 9 倍。
你猜怎么着？最高像素比通常出现在屏幕最小的设备上——移动设备。
包括帧速率。
#### 处理像素比
`window.devicePixelRatio`获得您可以使用的屏幕像素比，获得像素比后只需调用`renderer.setPixelRatio(...)`更新渲染器的像素比。
您可能只想简单地将设备像素比发送到该方法，但最终会在高像素比设备上遇到性能问题。
像素比大于`2`主要是出于营销。你的眼睛几乎看不到`2`和`3`之间的区别，但它会产生性能问题并更快地耗尽电池。可以做的优化是将像素比限制为`2`. 为此，您可以使用`Math.min()`：

```javascript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684461049811-f6531ae7-e981-403e-b507-d115d5b6c390.png#averageHue=%230b0000&clientId=ubbff3603-642e-4&from=paste&id=u55b2c6bb&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u2f9d8e5b-2314-4399-a796-a5da0d64634&title=)
当像素比率发生变化时，有一些技术可以通知我们开发者，但它只涉及拥有多个像素比率不同的屏幕的用户，并且他们通常会在从一个屏幕切换到另一个屏幕时调整窗口大小。这就是为什么我们也只需将此方法添加到`resize`回调中：

```javascript
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
```
## 处理全屏
现在我们的画布以正确的像素比例占据了所有可用空间，是时候添加对全屏的支持了。
首先，我们需要决定什么动作会触发全屏模式。它可以是一个 HTML 按钮，但我们案例将使用双击触发全屏。
当双击发生时，我们将切换全屏——这意味着如果窗口不是全屏，双击将启用全屏模式，如果窗口已经全屏，双击将退出全屏模式。
首先，我们需要监听双击事件，我们可以通过`dblclick`事件来实现：

```javascript
window.addEventListener('dblclick', () =>
{
    console.log('double click')
})
```
此事件适用于除 Chrome Android 之外的大多数现代浏览器： https: [//developer.mozilla.org/docs/Web/API/Element/dblclick_event](https://developer.mozilla.org/docs/Web/API/Element/dblclick_event)
现在我们有了我们的双击事件，我们需要三样东西：

- 一种知道它是否已经全屏的方法
- 进入全屏模式的方法
- 一种退出全屏模式的方法

要知道我们是否已经处于全屏模式，我们可以使用`document.fullscreenElement`：

```javascript
window.addEventListener('dblclick', () =>
{
    if(!document.fullscreenElement)
    {
        console.log('go fullscreen')
    }
    else
    {
        console.log('leave fullscreen')
    }
})
```
请求全屏的方法与元素相关联。这是因为您可以选择全屏显示的内容。它可以是整个页面、任何 DOM 元素或`<canvas>`.
我们将使用`<canvas>`并调用r`equestFullscreen()`它的方法：

```javascript
window.addEventListener('dblclick', () =>
{
    if(!document.fullscreenElement)
    {
        canvas.requestFullscreen()
    }
    else
    {
        console.log('leave fullscreen')
    }
})
```
退出全屏模式的方法可直接在`document`:

```javascript
window.addEventListener('dblclick', () =>
{
    if(!document.fullscreenElement)
    {
        canvas.requestFullscreen()
    }
    else
    {
        document.exitFullscreen()
    }
})
```
您可以通过双击任意位置来切换全屏模式来测试结果。不幸的是，这不适用于 `Safari`
`Safari`浏览器正在花时间支持全屏等正式的简单功能，我们需要使用前缀版本使其适用于`document.fullscreenElement`、`canvas.requestFullscreen`和`document.exitFullscreen`：

```javascript
window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})
```
一切功能都应该在所有现代浏览器上正常工作，兼容所有浏览器。

# 09.Geometries 几何图形
## 介绍
到目前为止，我们只使用[BoxGeometry](https://threejs.org/docs/#api/en/geometries/BoxGeometry)类来创建我们的立方体。在本课中，我们将发现各种其他几何图形，但首先，我们需要了解几何图形的真正含义。
## 什么是几何？
在 Three.js 中，几何图形由顶点（3D 空间中的点坐标）和面（连接这些顶点以创建表面的三角形）组成。
我们使用几何体来创建网格，为了以后的课程做铺垫，您也可以使用几何体来形成粒子。每个顶点（单个顶点）将对应一个粒子。
我们可以存储比顶点位置更多的数据。一个很好的例子是谈论 UV 坐标或法线。我们稍后会详细了解这些内容。
## 不同的内置几何形状
Three.js 有很多内置的几何图形。虽然您不需要确切地知道如何实例化每一个，但最好知道它们的存在。
我们将看到的所有内置几何图形都继承自[BufferGeometry](https://threejs.org/docs/#api/en/core/BufferGeometry)类。此类有许多内置方法，例如`translate(...)`、`rotateX(...)`、`normalize()` 等，但我们不会在本课中使用它们。
大多数几何文档页面都有示例。

- [BoxGeometry](https://threejs.org/docs/#api/en/geometries/BoxGeometry) 创建一个盒子。
- [PlaneGeometry](https://threejs.org/docs/#api/en/geometries/PlaneGeometry) 创建一个矩形平面。
- [CircleGeometry](https://threejs.org/docs/#api/en/geometries/CircleGeometry) 创建圆盘或圆盘的一部分（如饼图）。
- [ConeGeometry](https://threejs.org/docs/#api/en/geometries/ConeGeometry) 创建圆锥体或圆锥体的一部分。您可以打开或关闭圆锥体的底部。
- [CylinderGeometry](https://threejs.org/docs/#api/en/geometries/CylinderGeometry) 创建一个圆柱体。您可以打开或关闭圆柱体的两端，并且可以更改每一端的半径。
- [RingGeometry](https://threejs.org/docs/#api/en/geometries/RingGeometry) 创建扁平环或扁平圆的一部分。
- [TorusGeometry](https://threejs.org/docs/#api/en/geometries/TorusGeometry) 创建一个具有厚度（如甜甜圈）或环的一部分的环。
- [TorusKnotGeometry](https://threejs.org/docs/#api/en/geometries/TorusKnotGeometry) 创建某种几何结。
- [DodecahedronGeometry](https://threejs.org/docs/#api/en/geometries/DodecahedronGeometry) 创建一个有 12 个面的球体。您可以为更圆的球体添加细节。
- [OctahedronGeometry](https://threejs.org/docs/#api/en/geometries/OctahedronGeometry) 创建一个有 8 个面的球体。您可以为更圆的球体添加细节。
- [TetrahedronGeometry](https://threejs.org/docs/#api/en/geometries/TetrahedronGeometry) 创建一个 4 面球体（如果不增加细节，它不会是一个很大的球体）。您可以为更圆的球体添加细节。
- [IcosahedronGeometry](https://threejs.org/docs/#api/en/geometries/IcosahedronGeometry) 创建一个由大小大致相同的三角形组成的球体。
- [SphereGeometry](https://threejs.org/docs/#api/en/geometries/SphereGeometry) 创建最流行的球体类型，其中的面看起来像四边形（四边形只是两个三角形的组合）。
- [ShapeGeometry](https://threejs.org/docs/#api/en/geometries/ShapeGeometry) 根据路径创建形状。
- [TubeGeometry](https://threejs.org/docs/#api/en/geometries/TubeGeometry) 按照路径创建管。
- [ExtrudeGeometry](https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry) 根据路径创建挤压。您可以添加和控制斜角。
- [LatheGeometry](https://threejs.org/docs/#api/en/geometries/LatheGeometry) 创建花瓶或花瓶的一部分（更像是一场革命）。
- [TextGeometry](https://threejs.org/docs/?q=textge#examples/en/geometries/TextGeometry) 创建 3D 文本。您必须提供字体 json 格式的字体。

如果您需要 Three.js 不支持的特定特殊几何体，您可以在 JavaScript 中创建自己的几何体，或者您可以在 3D 软件中制作它，将其导出并导入到您的项目中。我们稍后的课程会介绍更多。
## 框示例
我们已经制作了一个立方体，但我们并没有过多讨论参数。大多数几何图形都有参数，在使用它之前，您应该始终查看文档。
BoxGeometry有 6 个参数[：](https://threejs.org/docs/#api/en/geometries/BoxGeometry)

- `widthx`：轴上的尺寸
- `heighty`：轴上的尺寸
- `depthz`：轴上的尺寸
- `widthSegmentsx`：轴有多少细分
- `heightSegmentsy`：轴有多少细分
- `depthSegmentsz`：轴有多少细分

细分对应于构成面部的三角形数量。默认情况下它是`1`，这意味着每个面只有 `2` 个三角形。如果将细分设置为`2`，每个面最终会得到 8 个三角形：

```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
```
问题是我们看不到这些三角形。
一个好的解决方案是添加`wireframe: true`到我们的材料中。线框将显示分隔每个三角形的线：

```javascript
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684463600780-6be5b027-768e-4a49-b8e9-6aebad2e0c5e.png#averageHue=%23020000&clientId=u98f0ea70-c8ef-4&from=paste&id=u13e7067d&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u5f93883a-9e1c-4176-ae8d-972e53196d6&title=)
如您所见，面有 8 个三角形。
虽然这与平面立方体无关，但在使用 `SphereGeometry` 时会变得更[有趣](https://threejs.org/docs/#api/en/geometries/SphereGeometry)：

```javascript
const geometry = new THREE.SphereGeometry(1, 32, 32)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684463600542-cc0473c0-2c1e-4fcd-924c-2439d019cd9b.png#averageHue=%230a0000&clientId=u98f0ea70-c8ef-4&from=paste&id=u4d0b13fd&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ub9c5d1e8-a1ae-4214-9e3a-9502d38538c&title=)
我们添加的细分越多，图形就越接近完美。但请记住，过多的顶点和面会影响性能。
## 创建自己的缓冲区几何
有时，我们需要创建自己的几何图形。如果几何体非常复杂或具有精确的形状，最好在 3D 软件中创建它（我们将在以后的课程中介绍），但如果几何体不太复杂，我们可以通过使用[缓冲区几何](https://threejs.org/docs/#api/en/core/BufferGeometry)[BufferGeometry](https://threejs.org/docs/#api/en/core/BufferGeometry)自己构建它。
要创建您自己的缓冲区几何图形，首先要实例化一个空的[BufferGeometry](https://threejs.org/docs/#api/en/core/BufferGeometry)。我们将示例创建一个简单的三角形：

```javascript
// Create an empty BufferGeometry
const geometry = new THREE.BufferGeometry()
```
要将顶点添加到[BufferGeometry，您必须从](https://threejs.org/docs/#api/en/core/BufferGeometry)[Float32Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)开始。
[Float32Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)是原生 JavaScript 数组类型。您只能在内部存储浮点数，并且该数组的长度是固定的。
要创建[Float32Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)，您可以指定它的长度，然后再填充它：

```javascript
const positionsArray = new Float32Array(9)

// First vertice
positionsArray[0] = 0
positionsArray[1] = 0
positionsArray[2] = 0

// Second vertice
positionsArray[3] = 0
positionsArray[4] = 1
positionsArray[5] = 0

// Third vertice
positionsArray[6] = 1
positionsArray[7] = 0
positionsArray[8] = 0
```
或者你可以传递一个数组：

```javascript
const positionsArray = new Float32Array([
    0, 0, 0, // First vertex
    0, 1, 0, // Second vertex
    1, 0, 0  // Third vertex
])
```

如您所见，顶点的坐标是线性指定的。该数组是一个一维数组，您可以在其中指定第一个顶点的`x`、`y`和`z`，然后是第二个顶点的`x`、`y`和`z`，依此类推。
在将该数组发送到 BufferGeometry 之前[，](https://threejs.org/docs/#api/en/core/BufferGeometry)您必须将其转换为[BufferAttribute](https://threejs.org/docs/#api/en/core/BufferAttribute)。
第一个参数对应于您的类型数组，第二个参数对应于一个顶点属性的值。正如我们之前看到的，要读取这个数组，我们必须 3 乘 3，因为顶点位置由 3 个值（`x`,`y`和`z`）组成：

```javascript
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
```
然后我们可以使用该方法将此属性添加到我们的[BufferGeometry](https://threejs.org/docs/#api/en/core/BufferGeometry).setAttribute(...)。第一个参数是这个属性的名称，第二个参数是值：

```javascript
geometry.setAttribute('position', positionsAttribute)
```
我们选择`'position'`这个名称是因为 Three.js 内部着色器将查找该值来定位顶点。我们将在着色器课程中看到更多相关信息。
面将按照顶点的顺序自动创建。
全部一起：
```javascript
// Create an empty BufferGeometry
const geometry = new THREE.BufferGeometry()

// Create a Float32Array containing the vertices position (3 by 3)
const positionsArray = new Float32Array([
    0, 0, 0, // First vertex
    0, 1, 0, // Second vertex
    1, 0, 0  // Third vertex
])

// Create the attribute and name it 'position'
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684463601268-900de4e5-5b88-407b-a7c4-995210272d49.png#averageHue=%23000000&clientId=u98f0ea70-c8ef-4&from=paste&id=ubea421b7&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u6dd1114e-24e3-41c9-baaa-87aa54d379c&title=)
我们还可以创建一堆随机三角形：

```javascript
// Create an empty BufferGeometry
const geometry = new THREE.BufferGeometry()

// Create 50 triangles (450 values)
const count = 50
const positionsArray = new Float32Array(count * 3 * 3)
for(let i = 0; i < count * 3 * 3; i++)
{
    positionsArray[i] = (Math.random() - 0.5) * 4
}

// Create the attribute and name it 'position'
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684463601239-38d0cb17-9bfe-457c-b538-1ea608cdc3a9.png#averageHue=%230a0000&clientId=u98f0ea70-c8ef-4&from=paste&id=u817a0aea&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uae03f777-a55c-4fbf-a073-d2dbfbd5632&title=)
唯一理解困难的可能是`count * 3 * 3`零件，但解释起来很简单：我们需要`50`三角形。每个三角形由顶点组成，每个顶点由值3（`x`、`y`和`z`）组成。
#### 指数Index
[BufferGeometry](https://threejs.org/docs/#api/en/core/BufferGeometry)的一件有趣的事情是您可以使用该`index`属性使顶点相互化，形成成一个立方体。多个面可以使用一些预计的顶点，例如立方体八个角落中的顶点。如果你仔细观察，每个顶点都可以被不同的相邻三角形使用。这将优化出更小的属性数组和性能上的改进。但我们不会在那节课中介绍这部分内容。

# 10.Debug UI 调试界面
## 介绍 
每个创意项目的一个重要方面是使调试变得容易并调整您的代码。开发人员（您）和从事该项目的其他参与者（如设计师甚至客户）必须能够更改尽可能多的参数。
你必须考虑到这一点，以便他们找到完美的**颜色、速度、数量**等，以获得**最佳体验**。您甚至可能会得到看起来很棒的意想不到的结果。
首先，我们需要一个调试 UI。
虽然您可以使用 HTML / CSS / JS 创建自己的调试 UI，但已经有多个现成的库：

- [数据.GUI](https://github.com/dataarts/dat.gui)
- [控制面板](https://github.com/freeman-lab/control-panel)
- [控制套件](https://github.com/automat/controlkit.js)
- [乌尔](https://github.com/lo-th/uil)
- [调整面板](https://cocopon.github.io/tweakpane/)
- [归化](https://github.com/colejd/guify)
- [欧伊](https://github.com/wearekuva/oui)

所有这些都可以实现我们想要的UI界面，但我们将使用最流行的一个，即[dat.GUI](https://github.com/dataarts/dat.gui)。你也可以尝试其他的。
### Dat.GUI漏洞
Dat.GUI 已经很长时间没有更新了，如果我们将库添加到我们的项目中，可能会出现一些漏洞警告。
幸运的是，有一个名为[lil-gui 的](https://lil-gui.georgealways.com/)替代库可以用作“dat.gui 的直接替代品”。这意味着我们可以像使用 dat.gui 一样使用它。
本课程大部分是使用 dat.gui 编写和录制的，文本、屏幕截图和视频将参考 dat.gui，但您应该安装和使用 lil-gui（这就是我们将在下面做的）。
下一课的入门文件将使用 lil-gui。
## 例子
你可以在我的作品集中找到一个很好的调试 UI 示例。`#debug`此 UI 仅在您添加到 URL时显示。
[https://bruno-simon.com/#debug](https://bruno-simon.com/#debug)
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684465818917-bef9f23d-a661-43d9-9042-494544bd0b24.png#averageHue=%232b2521&clientId=u33db8ecb-4072-4&from=paste&id=u44af3b4a&originHeight=640&originWidth=1700&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ub744d1e1-f76e-40f9-a3a3-b4b1c4ad924&title=)
您可以调整重力、颜色、速度、元素位置等。
虽然我花了很多时间来创建所有这些调整，但如果没有它，游戏就会显得不那么平衡。
## 设置
在启动器中，我们有我们的多维数据集，但依赖项不包括 Dat.GUI。我们将添加它并进行一些调整。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684465818945-a5f6ce70-5f5c-4da0-832e-b33e1ac8563e.png#averageHue=%230c0000&clientId=u33db8ecb-4072-4&from=paste&id=u7db6ab48&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u80f067b6-3330-429d-ae32-2e49d689387&title=)
## 如何实现Dat.GUI
要将 Dat.GUI 添加到我们的项目中，我们可以使用 Node.js 提供的依赖管理器，称为 NPM（就像我们在上一课中为 GSAP 所做的一样）。
在您的终端中（当服务器未运行或在同一文件夹上使用另一个终端窗口时）运行`npm install --save lil-gui`
如前所述，我们正在安装 lil-gui 而不是 dat.gui，但在本课程的其余部分我们将把它称为 dat.gui。
Dat.GUI 现在在文件夹中可用`/node_modules/`，我们可以将其导入我们的`script.js`. 不要忘记重新启动服务器：

```javascript
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'lil-gui'

// ...
```

您现在可以实例化 Dat.GUI：

```javascript
/**
 * Debug
 */
const gui = new dat.GUI()
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684465819037-66eb50fd-4159-4ea7-a856-627b549fcdfc.png#averageHue=%230c0000&clientId=u33db8ecb-4072-4&from=paste&id=ub0fb658d&originHeight=2240&originWidth=3584&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u9f44c447-7e9f-4518-8949-906787e5ce0&title=)
这将导致屏幕右上角出现一个空白面板。
您可以向该面板添加不同类型的元素：

- **Range** — 对于具有最小值和最大值的数字
- **颜色**— 用于各种格式的颜色
- **文本**——用于简单文本
- **复选框**——用于布尔值（true或false）
- **选择**— 从值列表中进行选择
- **按钮**——触发功能
- **文件夹**——如果你有太多元素，用来组织你的面板

让我们看看其中的一些。
### 添加元素
要将元素添加到面板，您必须使用`gui.add(...)`. 第一个参数是一个对象，第二个参数是您要调整的对象的属性。您需要在创建相关对象后对其进行设置：

```javascript
gui.add(mesh.position, 'y')
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684465818981-f75e299e-8981-4cba-9b7b-8a0ddf71a3e1.png#averageHue=%230a0000&clientId=u33db8ecb-4072-4&from=paste&id=ub0d1dcb7&originHeight=2240&originWidth=3584&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u469b7b5f-a384-440c-b9ed-f7ab0ee21ed&title=)
面板中应出现一个范围。尝试改变它并观察立方体相应地移动。
**要指定最小值、最大值和精度**，您可以在参数中设置它们：

```javascript
gui.add(mesh.position, 'y', - 3, 3, 0.01)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684465819020-b5cbdf9e-15d6-4ec9-9ef5-d76cbb737192.png#averageHue=%230a0000&clientId=u33db8ecb-4072-4&from=paste&id=ua558833d&originHeight=2240&originWidth=3584&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u1326e00f-18fe-4074-a5a5-13d5c6b855d&title=)
或者您可以使用方法`min(...)`，`max(...)`并在方法`step(...)`之后直接链接`add(...)`：

```javascript
gui.add(mesh.position, 'y').min(- 3).max(3).step(0.01)
```
如果你不喜欢在一行中链接太多方法，你可以简单地添加换行符：
```javascript
gui
    .add(mesh.position, 'y')
    .min(- 3)
    .max(3)
    .step(0.01)
```
要更改标签，请使用以下方法`name(...)`：
```javascript
gui
    .add(mesh.position, 'y')
    .min(- 3)
    .max(3)
    .step(0.01)
    .name('elevation')
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684465820514-6d9c1be9-5358-42ca-9cfc-b017967b8995.png#averageHue=%230a0000&clientId=u33db8ecb-4072-4&from=paste&id=u79cedbaa&originHeight=2240&originWidth=3584&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uf673eb15-f5eb-4871-85da-dc387582882&title=)
Dat.GUI 将自动检测您想要调整的属性类型并使用相应的元素。一个很好的例子是[Object3D](https://threejs.org/docs/#api/en/core/Object3D.visible) 的`visible`属性。这是一个布尔值，将隐藏对象：`false`

```javascript
gui.add(mesh, 'visible')
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684465820576-66196a0a-fc81-4d01-a8cf-8a06f06cc6fb.png#averageHue=%230b0000&clientId=u33db8ecb-4072-4&from=paste&id=u13ed0640&originHeight=2240&originWidth=3584&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u3f163452-c8d5-4b1d-83bf-977eded2ca8&title=)
如您所见，因为该`visible`属性是一个布尔值,所以Dat.GUI 推导选择了一个复选框。
我们可以对材料的属性`wireframe`做同样的事情：
```javascript
gui.add(material, 'wireframe')
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684465820536-8b77fd64-0b26-497b-b6ae-869a4c550201.png#averageHue=%230b0000&clientId=u33db8ecb-4072-4&from=paste&id=uf03029e7&originHeight=2240&originWidth=3584&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ub994d78e-04c3-47c1-9115-e14d058eb85&title=)
### 颜色
处理颜色有点困难。
首先，我们需要使用`addColor(...)`instead of `add(...)`。这是因为 Dat.GUI 无法仅根据属性的类型来判断您是想调整文本、数字还是颜色。
其次，您必须创建一个在其属性中包含颜色的中间对象，并在您的材质中使用该属性。这是因为 Three.js 材料没有像#ff0000.
实际上，因为我们使用的是lil-gui而不是Dat.GUI，所以我们可以直接在素材上使用`addColor(...)`。但由于我们将要看到的技术可以用于其他情况，所以我们也实现一遍。
在该部分之后的代码开头创建一个变量`parameter`：

```javascript
const parameters = {
    color: 0xff0000
}
```
然后，在实例化您的`gui`变量后，添加以下调整：

```javascript
gui.addColor(parameters, 'color')
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684465821579-3777a8fc-447e-467c-8984-328f8e124326.png#averageHue=%230b0000&clientId=u33db8ecb-4072-4&from=paste&id=ud4179c60&originHeight=2240&originWidth=3584&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u4e4bfbdb-b1ab-46c1-a6aa-1b1f6bdaa61&title=)
您应该在面板中看到一个颜色选择器。问题是改变这种颜色不会影响材质。它确实改变了变量`parameter`的属性`color`，但我们还没有在我们的材料中使用该变量。
为了解决这个问题，我们需要 Dat.GUI 在值发生变化时提醒我们。我们可以通过链式调用`material.color.set(...).onChange(...)`该方法使用更新材质颜色来做到这一点。这种方法非常有用，因为您可以使用多种格式，例如`'#ff0000'`, `'#f00'`,`0xff0000`甚至`'red'`:

```javascript
const parameters = {
    color: 0xff0000
}

// ...

gui
    .addColor(parameters, 'color')
    .onChange(() =>
    {
        material.color.set(parameters.color)
    })
```

目前，`0xff0000`颜色在两个地方指定：在`parameters`对象中和在`material`.
虽然这没什么大不了的，但如果我们想改变颜色，我们必须在这两个地方进行。
让我们简单地通过使用 `parameters.color`材质中的属性来解决这个问题：

```javascript
const material = new THREE.MeshBasicMaterial({ color: parameters.color })
```
### 功能
要触发一个函数，比如颜色值，我们必须将该函数添加到一个对象中。我们可以使用`parameters`之前创建的对象添加一个 `spin`属性，该属性包含使立方体动画化的函数：

```javascript
const parameters = {
    color: 0xff0000,
    spin: () =>
    {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
    }
}
```
再一次，我们可以`gui`在实例化后将调整添加到我们的：
```javascript
gui.add(parameters, 'spin')
```
您应该会看到一个spin按钮，单击它会导致您的立方体进行 360 度旋转。
## 如何以及何时使用它
我们将在下一个练习的特定时刻使用我们的调试面板。但您可以随意添加任意数量的调整。这是练习和开始构建一些有创意的东西的绝佳方式。
我建议您在开发过程时就进行微调。如果您考虑在项目结束时添加DebugUI去微调，可能你就不会去调整这个项目了（作者应该想说开发微调这种态度更好，开发完了耦合太高了你就懒得调了）。

# 11.Textures 纹理
## 介绍
对你的红色立方体感到厌烦了吗？是时候添加一些纹理了。
但首先，什么是纹理，我们可以用它们做什么？
## 什么是纹理？ 
您可能知道，纹理是覆盖几何体表面的图像。许多类型的纹理会对几何体的外观产生不同的影响。这不仅仅是关于颜色。
以下是最常见的纹理类型，使用了João Paulo著名的[门纹理。](https://3dtextures.me/2019/04/16/door-wood-001/)如果您喜欢他的作品，请给他买一个[Ko-fi](https://ko-fi.com/katsukagi)或成为[Patreon](https://www.patreon.com/gendo)。
### 颜色（或反照率）
反照率纹理是最简单的一种。它只会获取纹理的像素并将它们应用于几何体。
![](https://cdn.nlark.com/yuque/0/2023/jpeg/35159616/1684468403802-ea562e09-563b-40be-a4b8-ccd7518ec5d1.jpeg#averageHue=%23be521d&clientId=u4ee07317-0b23-4&from=paste&id=u979b486e&originHeight=1024&originWidth=1024&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uc5079dfa-1365-46aa-a6c9-63fef75de9f&title=)
### Alpha
alpha 纹理是灰度图像，其中白色可见，黑色则不可见。
![](https://cdn.nlark.com/yuque/0/2023/jpeg/35159616/1684468403900-f7c08670-7b51-4cbc-8217-485bd24b9a22.jpeg#averageHue=%23828282&clientId=u4ee07317-0b23-4&from=paste&id=ue8e6c170&originHeight=1024&originWidth=1024&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u17e590c1-fb6d-49fc-bb85-ae94a40ae42&title=)
### 高度
高度纹理是一个灰度图像，它将移动顶点以创建一些浮雕。如果你想看到它，你需要添加细分。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684468403879-ef56ea0d-228b-41a4-a52d-5e0c8bda6df4.png#averageHue=%23484848&clientId=u4ee07317-0b23-4&from=paste&id=u73fc9e1b&originHeight=1024&originWidth=1024&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u89ec797f-e70d-43a1-be05-597ed4c63ec&title=)
### 普通的
普通纹理会添加小细节。它不会移动顶点，但会引诱光线认为面部的方向不同。法线纹理对于添加具有良好性能的细节非常有用，因为您不需要细分几何体。
![](https://cdn.nlark.com/yuque/0/2023/jpeg/35159616/1684468404029-e786f42e-898a-4458-9645-f95fca9c5d5d.jpeg#averageHue=%237f7ffe&clientId=u4ee07317-0b23-4&from=paste&id=u90d3f461&originHeight=1024&originWidth=1024&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u1db2d401-1726-49bb-92d7-e537beec7ba&title=)
### 环境光遮蔽
环境遮挡纹理是一个灰度图像，可以在表面的缝隙中伪造阴影。虽然它在物理上不准确，但它肯定有助于形成对比。
![](https://cdn.nlark.com/yuque/0/2023/jpeg/35159616/1684468403818-2e443c59-6538-4eda-a960-c0a12b4c1305.jpeg#averageHue=%23f3f3f3&clientId=u4ee07317-0b23-4&from=paste&id=uc16c321d&originHeight=1024&originWidth=1024&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u987aebc8-91d9-4605-9684-a1661509a56&title=)
### 金属度
金属度纹理是一个灰度图像，它将指定哪个部分是金属（白色）和非金属（黑色）。这些信息将有助于产生反思。
![](https://cdn.nlark.com/yuque/0/2023/jpeg/35159616/1684468405941-430c7cc2-bcb1-4939-9ef4-381f3a27724c.jpeg#averageHue=%23020202&clientId=u4ee07317-0b23-4&from=paste&id=uf8b9f9b2&originHeight=1024&originWidth=1024&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ua18e85a1-1eeb-4ffe-90b2-f6f1a4bae81&title=)
### 粗糙度
粗糙度是带有金属感的灰度图像，它将指定哪些部分是粗糙的（白色），哪些部分是光滑的（黑色）。此信息将有助于驱散光。地毯很凹凸不平，看不到反光，而水面很光滑，可以看到反光。在这里，木材是均匀的，因为上面有一层透明涂层。
![](https://cdn.nlark.com/yuque/0/2023/jpeg/35159616/1684468408041-675fc7b8-288d-4829-86fe-e94af7a4e60d.jpeg#averageHue=%23363636&clientId=u4ee07317-0b23-4&from=paste&id=u7c1a3b77&originHeight=1024&originWidth=1024&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u7a4fbe29-afe3-49d1-a3ce-7961b277833&title=)
### 光子反应器
这些纹理（尤其是金属感和粗糙度）遵循我们所说的 PBR 原则。PBR 代表基于物理的渲染。它重新组合了许多倾向于遵循现实生活方向以获得真实结果的技术。
虽然还有许多其他技术，但 PBR 正在成为真实渲染的标准，许多软件、引擎和库都在使用它。
现在，我们将只关注如何加载纹理、如何使用它们、我们可以应用哪些转换以及如何优化它们。我们将在后面的课程中看到更多关于 PBR 的信息，但如果您好奇，可以在这里了解更多信息：

- [https://marmoset.co/posts/basic-theory-of-physically-based-rendering/](https://marmoset.co/posts/basic-theory-of-physically-based-rendering/)
- [https://marmoset.co/posts/physically-based-rendering-and-you-can-too/](https://marmoset.co/posts/physically-based-rendering-and-you-can-too/)
## 如何加载纹理
### 获取图片的URL
要加载纹理，我们需要图像文件的 URL。
因为我们使用的是构建工具，所以有两种获取方式。
您可以将图像纹理放在`/src/`文件夹中并像导入 JavaScript 依赖项一样导入它：

```javascript
import imageSource from './image.png'

console.log(imageSource)
```
或者您可以将该图像放在`/static/`文件夹中，只需将图像的路径（不带`/static`）添加到 URL 即可访问它：

```javascript
const imageSource = '/image.png'

console.log(imageSource)
```
注意，这个`/static/`文件夹只是因为 Vite 模板的配置才有效。如果您使用其他类型的脚手架，您可能需要调整您的项目。
我们将在课程的其余部分使用`/static/`文件夹操作。
### 加载图像
您可以在文件夹中找到我们刚刚看到的门纹理`/static/`，并且有多种加载方式。
#### 使用原生 JavaScript
使用原生 JavaScript，首先，您必须创建一个`Image`实例，监听`load`事件，然后更改其`src`属性以开始加载图像：

```javascript
const image = new Image()
image.onload = () =>
{
    console.log('image loaded')
}
image.src = '/textures/door/color.jpg'
```
您应该会看到`'image loaded'`出现在控制台中。如您所见，我们将图片的src设置为路径`'/textures/door/color.jpg'`，但是文件夹`/static`中没有。
我们不能直接使用该图像。我们需要先从该图像创建一个[纹理。](https://threejs.org/docs/index.html#api/en/textures/Texture)
这是因为 WebGL 需要一种非常特殊的格式，可以由 GPU 访问，还因为一些更改将应用于纹理，如 mipmapping，我们稍后会看到更多相关信息。
[使用Texture](https://threejs.org/docs/#api/en/textures/Texture)类创建纹理：
```javascript
const image = new Image()
image.addEventListener('load', () =>
{
    const texture = new THREE.Texture(image)
})
image.src = '/textures/door/color.jpg'
```
我们现在需要做的是`texture`常量在`material`中使用. 不幸的是，该`texture`变量已在函数中声明，我们**无法在该函数之外访问它**。这是一个 JavaScript 的 作用域 限制。
我们可以在函数内部创建网格，但有一个更好的解决方案`needsUpdate`，`needsUpdate`可以在函数外部创建纹理，然后通过将纹理属性设置为`true`那么就会在加载图像后更新纹理：

```javascript
const image = new Image()
const texture = new THREE.Texture(image)
image.addEventListener('load', () =>
{
    texture.needsUpdate = true
})
image.src = '/textures/door/color.jpg'
```
执行此操作时，您可以立即立即使用该`texture`变量，图像在加载之前将是透明的。
要查看立方体上的纹理，请将color属性替换为map并使用textureas 值：
```javascript
const material = new THREE.MeshBasicMaterial({ map: texture })
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684468408114-13a853cb-6c49-48ff-bdab-07e3e191b2ce.png#averageHue=%231d0d04&clientId=u4ee07317-0b23-4&from=paste&id=u05dc7b2c&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u1b5a1a27-12a3-4161-bf19-60ff693d6ae&title=)
您应该在立方体的每一侧都看到门纹理。
#### 使用 TextureLoader
[原生 JavaScript 技术并没有那么复杂，但是有一种更直接的方法使用TextureLoader](https://threejs.org/docs/index.html#api/en/loaders/TextureLoader)。
[使用TextureLoader](https://threejs.org/docs/index.html#api/en/loaders/TextureLoader)类实例化变量并使用其`.load(...)`方法创建纹理：

```javascript
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/textures/door/color.jpg')
```

在内部，Three.js 将执行操作之前来加载图像并在准备就绪后更新纹理。
[您可以只使用一个TextureLoader](https://threejs.org/docs/index.html#api/en/loaders/TextureLoader)实例加载任意数量的纹理。
您可以在路径后发送 3 个函数。他们将被要求参加以下周期：

- load图片加载成功时
- progress当加载正在进行时
- error如果出了什么问题

```javascript
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(
    '/textures/door/color.jpg',
    () =>
    {
        console.log('loading finished')
    },
    () =>
    {
        console.log('loading progressing')
    },
    () =>
    {
        console.log('loading error')
    }
)
```
如果纹理不起作用，添加这些回调函数以查看正在发生的情况并发现错误可能会很有用。
#### 使用加载管理器[LoadingManager](https://threejs.org/docs/index.html#api/en/loaders/managers/LoadingManager)
最后，如果您有多个图像要加载，并且想要共享事件，例如在加载所有图像时收到通知，您可以使用[LoadingManager](https://threejs.org/docs/index.html#api/en/loaders/managers/LoadingManager)。
[创建LoadingManager](https://threejs.org/docs/index.html#api/en/loaders/managers/LoadingManager)类的实例并将其传递给[TextureLoader](https://threejs.org/docs/index.html#api/en/loaders/TextureLoader)：

```javascript
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)
```
您可以通过将以下属性替换为您自己的函数onStart、onLoad、onProgress和来监听各种事件onError：

```javascript
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () =>
{
    console.log('loading started')
}
loadingManager.onLoad = () =>
{
    console.log('loading finished')
}
loadingManager.onProgress = () =>
{
    console.log('loading progressing')
}
loadingManager.onError = () =>
{
    console.log('loading error')
}

const textureLoader = new THREE.TextureLoader(loadingManager)
```
您现在可以开始加载您需要的所有图像：

```javascript
// ...

const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
```
正如您在此处看到的，我们重命名了`texture`变量`colorTexture`，所以不要忘记更改它`material`：

```javascript
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
```
**如果您想要显示一个加载程序并仅在加载所有资产时将其隐藏，则**[**LoadingManager**](https://threejs.org/docs/index.html#api/en/loaders/managers/LoadingManager)**非常有用。正如我们将在以后的课程中看到的，您还可以将它与其他类型的加载器一起使用。**
## UV unwrapping 紫外线展开 
虽然如何在立方体上放置纹理是合乎逻辑的，但对于其他几何体来说，事情可能有点棘手。
尝试用其他几何图形替换您的 BoxGeometry：

```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1)

// Or
const geometry = new THREE.SphereGeometry(1, 32, 32)

// Or
const geometry = new THREE.ConeGeometry(1, 1, 32)

// Or
const geometry = new THREE.TorusGeometry(1, 0.35, 32, 100)
```
如您所见，纹理以不同的方式被拉伸或挤压以覆盖几何体。
这就是所谓的UV 展开。您可以想象这就像打开折纸或糖果包装纸使其变平一样。每个顶点在平面（通常是正方形）上都有一个二维坐标。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684468408686-37255087-2c51-4dab-944d-b2d7107f8ceb.png#averageHue=%23d8c1ac&clientId=u4ee07317-0b23-4&from=paste&id=ua01c2dcb&originHeight=1080&originWidth=1920&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ub7349251-a42e-49f5-8aaa-9a777f54caf&title=)
您实际上可以在属性中看到那些 UV 2D 坐标`geometry.attributes.uv`：

```javascript
console.log(geometry.attributes.uv)
```
当您使用图元时，这些 UV 坐标由 Three.js 生成。如果您创建自己的几何体并想对其应用纹理，则必须指定 UV 坐标。
如果您使用 3D 软件制作几何体，您还必须进行 UV 展开。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684468409500-e55438c0-1a2e-44b1-a268-edc2c500b114.png#averageHue=%23b4bcc3&clientId=u4ee07317-0b23-4&from=paste&id=u2cf1cd3d&originHeight=1080&originWidth=1920&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u9d9640b1-6ad7-48da-8666-359fddab6bd&title=)
不用担心; 大多数 3D 软件也有自动展开功能，应该可以解决问题。
## [Transforming the texture](https://threejs-journey.com/lessons/textures#) 变换纹理
让我们回到具有一个纹理的立方体，看看我们可以对该纹理应用什么样的变换。
### 重复
[您可以使用Vector2](https://threejs.org/docs/index.html#api/en/math/Vector2)`repeat`属性重复纹理，这意味着它具有`x`和`y`属性。
尝试更改这些属性：
```javascript
const colorTexture = textureLoader.load('/textures/door/color.jpg')
colorTexture.repeat.x = 2
colorTexture.repeat.y = 3
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684468411002-e674ba2f-c8f3-4efa-992b-3c7e90dd9386.png#averageHue=%231e0c04&clientId=u4ee07317-0b23-4&from=paste&id=ud90e1a7e&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u3bc0acab-3c7a-4d36-b6ea-cdf415c1f5c&title=)
如您所见，纹理没有重复，但更小，最后一个像素似乎被拉伸了。
这是由于默认情况下未将纹理设置为**重复自身**。要更改它，您必须使用`THREE.RepeatWrapping`常量更新`wrapS`和`wrapT`属性。

- `wrapS`是为`x`轴
- `wrapT`是为`y`轴

```javascript
colorTexture.wrapS = THREE.RepeatWrapping
colorTexture.wrapT = THREE.RepeatWrapping
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684468412617-ed054c33-dd31-4561-9014-45f1c9c8293a.png#averageHue=%231d0d04&clientId=u4ee07317-0b23-4&from=paste&id=u7f188379&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u9ad5152d-34bf-4b68-9d73-a3923a2b22f&title=)
你也可以改变方向`THREE.MirroredRepeatWrapping`：

```javascript
colorTexture.wrapS = THREE.MirroredRepeatWrapping
colorTexture.wrapT = THREE.MirroredRepeatWrapping
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684468412598-77437fac-a6bd-48ee-b08d-a766dbdd9e5a.png#averageHue=%231d0d04&clientId=u4ee07317-0b23-4&from=paste&id=u77366d64&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u164a5ab5-b7e3-4539-b1fb-ac846ba9955&title=)
### Offset 抵消
您可以使用属性来偏移纹理，offset该属性也是具有和属性的[Vector2](https://threejs.org/docs/index.html#api/en/math/Vector2)。更改这些将简单地偏移 UV 坐标：`x``y`
```javascript
colorTexture.offset.x = 0.5
colorTexture.offset.y = 0.5
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684468413258-8943b934-2763-4065-bac2-cc66b912c88d.png#averageHue=%231d0d04&clientId=u4ee07317-0b23-4&from=paste&id=u72b30e5d&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u18264004-89d5-4fc9-b2d5-b2504057a27&title=)
### rotation 回转
您可以使用`rotation`属性旋转纹理，这是一个简单的数字，对应于以弧度表示的角度：

```javascript
colorTexture.rotation = Math.PI * 0.25
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684468414814-e7c418a6-338f-4391-8c04-4e030d2abba8.png#averageHue=%231e0d04&clientId=u4ee07317-0b23-4&from=paste&id=u156881ba&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u6c9a7125-5de7-40aa-b55e-c90fceb524c&title=)
如果删除`offset`和`repeat`属性，您会看到旋转发生在立方体面的左下角：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684468415143-4922b1dd-1b69-4e73-8ba9-4388af653751.png#averageHue=%231d0c04&clientId=u4ee07317-0b23-4&from=paste&id=u0cf22731&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ub610e4d8-6cbb-4f14-b396-377f1a19af6&title=)
也就是说，实际上UV 坐标是`0, 0`。如果要更改该旋转的轴心，可以使用也是[Vector2](https://threejs.org/docs/index.html#api/en/math/Vector2)的属性`center`来实现：

```javascript
colorTexture.rotation = Math.PI * 0.25
colorTexture.center.x = 0.5
colorTexture.center.y = 0.5
```
纹理现在将在其中心旋转。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684468416573-9c4a3e24-cfa0-462f-b101-cedc7d5cc574.png#averageHue=%231d0c04&clientId=u4ee07317-0b23-4&from=paste&id=udb345645&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u262c8520-0684-47fb-a8ce-210d619770e&title=)
### 过滤和映射 
如果您查看立方体的顶面，而该面几乎被隐藏，您会看到非常模糊的纹理。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684468416513-d5a9c334-c499-4a72-a24d-8de85cf62406.png#averageHue=%235d280e&clientId=u4ee07317-0b23-4&from=paste&id=uf5d44255&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u86b1d15b-3a06-439e-9b16-a1d402f7d74&title=)
这是由于过滤和 mipmapping。
Mipmapping（或带空格的“mip mapping”）是一种技术，包括反复创建纹理的一半较小版本，直到获得 1x1 纹理。所有这些纹理变化都被发送到 GPU，GPU 将选择最合适的纹理版本。
Three.js 和 GPU 已经处理了所有这些，您只需设置要使用的过滤算法即可。有两种类型的过滤器算法：缩小过滤器和放大过滤器。
### 缩小过滤器
当纹理像素小于渲染像素时，会发生缩小过滤器。换句话说，纹理对于表面来说太大了，它覆盖了。
您可以使用`minFilter`该属性更改纹理的缩小过滤器。
有 6 个可能的值：

- `THREE.NearestFilter`
- `THREE.LinearFilter`
- `THREE.NearestMipmapNearestFilter`
- `THREE.NearestMipmapLinearFilter`
- `THREE.LinearMipmapNearestFilter`
- `THREE.LinearMipmapLinearFilter`

默认值为`THREE.LinearMipmapLinearFilter`。如果您对纹理的外观不满意，您应该尝试其他滤镜。
我们不会看到每一个，但我们将测试`THREE.NearestFilter`，它有一个非常不同的结果：

```javascript
colorTexture.minFilter = THREE.NearestFilter
```
如果您使用的设备像素比高于 1，则不会有太大差异。如果没有，将相机放在这张脸几乎被隐藏的地方，你应该会得到更多的细节和奇怪的伪像。
`checkerboard-1024x1024.png`如果您使用文件夹中的纹理进行测试`/static/textures/`，您会更清楚地看到这些人工制品：

```javascript
const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
```
您看到的人工制品称为[波纹图案](https://en.wikipedia.org/wiki/Moir%C3%A9_pattern)，通常希望你避免使用它们。
### 放大滤镜 !可以让图像清晰非常重要
放大滤镜的工作方式与缩小滤镜类似，但纹理像素大于渲染像素。换句话说，纹理对于它覆盖的表面来说太小了。
`checkerboard-8x8.png`您可以使用同样位于文件夹中的纹理查看结果`static/textures/`：

```javascript
const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png')
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684468418171-03ec685b-b105-4fee-90a5-28d38c205cd9.png#averageHue=%23131313&clientId=u4ee07317-0b23-4&from=paste&id=u49b1d745&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uc754b645-632b-4995-881e-852c34aaca3&title=)
纹理变得模糊，因为它是一个非常大的表面上的非常小的纹理。
虽然您可能认为这看起来很糟糕，但它可能是最好的。如果效果不是太夸张，用户可能甚至不会注意到它。
您可以使用属性更改纹理的放大过滤器`magFilter`。
只有两个可能的值：

- `THREE.NearestFilter`
- `THREE.LinearFilter`

默认值为`THREE.LinearFilter`。
如果你测试`THREE.NearestFilter`，你会看到基本图像被保留，你会得到一个像素化的纹理：

```javascript
colorTexture.magFilter = THREE.NearestFilter
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684468418307-12a03ab2-605a-4e3c-a8cd-d9bf65b9de46.png#averageHue=%23131313&clientId=u4ee07317-0b23-4&from=paste&id=ua8f71d7d&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u54f2a133-03f9-415b-86e7-52957ef3b17&title=)
如果您想要具有像素化纹理的 Minecraft 风格，这可能是有利的。
您可以使用位于`static/textures/`文件夹中的`minecraft.png`纹理查看结果：

```javascript
const colorTexture = textureLoader.load('/textures/minecraft.png')
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684468420076-7afd8369-bffe-47b4-8b84-ca0034f2a176.png#averageHue=%23000000&clientId=u4ee07317-0b23-4&from=paste&id=u61646b2e&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uce7776ea-30c3-46e6-ab44-41b8ca72514&title=)
关于所有这些过滤器的最后一句话是，`THREE.NearestFilter`它比其他过滤器方便，而且您在使用它时应该会获得更好的性能。
仅对mipmap属性使用 `minFilter`。如果您正在使用`THREE.NearestFilter`，则不需要 mipmap，您可以使用以下命令停用它们`colorTexture.generateMipmaps = false`：

```javascript
colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
```
这将稍微卸载 GPU 的负担。
## 纹理格式和优化
准备纹理时，必须牢记 3 个关键要素：

- **weight 重量**
- **size 尺寸（或resolution分辨率）**
- **data 数据**
### **weight **重量
**不要忘记访问您网站的用户必须下载这些纹理**。您可以使用我们在网络上使用的大多数图像类型，例如.jpg（有损压缩但通常较轻）或.png（无损压缩但通常较重）。
**尝试应用优化的方法来获得用户可接受的图像大小，但尽可能让图片存储体积缩小。您可以使用压缩图片的网站，如**[**TinyPNG**](https://tinypng.com/)**（也适用于 jpg）或任何软件。**
### size 尺寸
无论图像的权重如何，您使用的纹理的每个像素都必须存储在 GPU 上。和您的硬盘一样，GPU 也有存储限制。更糟糕的是，自动生成的 mipmapping 增加了必须存储的像素数量。
**尽量减小图像的大小。**
如果您还记得我们所说的关于 mipmapping 的内容，Three.js 将重复生成纹理的一半小版本，直到它获得 1x1 纹理。**因此，您的纹理宽度和高度必须是 2 的幂。这是强制性的，以便 Three.js 可以将纹理的大小除以 2。**
一些例子：512x512,1024x1024或512x2048
**512,1024并且2048可以除以 2 直到达到 1。**
**如果您使用的纹理的宽度或高度不同于 2 的幂值，Three.js 将尝试将其拉伸到最接近的 2 的幂数，这可能会导致视觉效果不佳，并且您还会收到警告在控制台中。**
### data 数据
**我们还没有测试它，因为我们有其他东西要先看，但是纹理支持透明。您可能知道，jpg 文件没有 alpha 通道，因此您可能更喜欢使用 png（透明）。**
或者您可以使用 alpha 贴图，我们将在以后的课程中看到。
**如果您使用的是普通纹理（紫色纹理），您可能希望每个像素的红色、绿色和蓝色通道具有准确的值，否则最终可能会出现视觉故障。为此，您需要使用 png，因为它的无损压缩将保留好像素值。**
## 在哪里可以找到纹理
不幸的是，总是很难找到完美的纹理。有很多纹理素材的网站，但纹理并不都是很好用的，您可能还需要付费。
从网络搜索开始可能是个好主意。以下是我经常访问的一些网站。

- [poliigon.com](http://poliigon.com/)
- [3dtextures.me](http://3dtextures.me/)
- [arroway-textures.ch](http://arroway-textures.ch/)

如果不是供个人使用，请始终确保您有权使用该纹理。
[您还可以使用照片和 2D 软件（如 Photoshop）或什至使用Substance Designer](https://www.adobe.com/products/substance3d-designer.html)等软件创建自己的程序纹理。
# 
12.Materials 材质
## 介绍
材质用于为几何体的每个可见像素着色。
决定每个像素颜色的算法属于着色器中编写的。编写着色器是 WebGL 和 Three.js 最具挑战性的部分之一，但不要担心；Three.js 有许多带有预制着色器的内置材质。
我们将在以后的课程中探索如何创建我们自己的着色器。现在，让我们使用 Three.js 自带材料。
## Setup 设置
启动器不包含任何对象。[这是一个很好的机会来修改创建网格](https://threejs.org/docs/#api/en/objects/Mesh)的基础知识。
## 准备我们的场景 
为了测试材质，我们应该准备一个可爱的场景并加载一些纹理。
创建由 3 种不同[几何体](https://threejs.org/docs/#api/en/objects/Mesh)（一个球体、一个平面和一个环面）组成的 3 个网格体，并在所有 3 个几何体上使用相同的 MeshBasicMaterial。[是的，您可以在多个网格体上使用一种材质。](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial)移动左侧的球体和右侧的环面以将它们分开。
该`add(...)`方法支持一次添加多个对象：

```javascript
/**
 * Objects
 */
const material = new THREE.MeshBasicMaterial()

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)
sphere.position.x = - 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479671610-dca5f0f2-f69e-44f2-8d58-0988cf5076b3.png#averageHue=%23222222&clientId=u8048d26c-0295-4&from=paste&id=u8a07c07e&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u0c847303-ab9f-4c97-a177-8648ef01575&title=)
tick我们现在可以像在动画课上那样在函数上旋转对象：
```javascript
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // ...
}

tick()
```
你应该看到你的 3 个物体在缓慢旋转。
我们将要发现的材料以许多不同的方式使用纹理。让我们像在纹理课程中所做的那样使用[TextureLoader加载一些纹理。](https://threejs.org/docs/#api/en/loaders/TextureLoader)
所有纹理图像都位于该`/static/textures/`文件夹中。现在，我们将加载`/static/textures/door/`文件夹中的所有门纹理、`/static/textures/matcaps/`文件夹中的第一个 matcap 纹理和`/static/textures/gradients/`文件夹中的第一个渐变纹理。
确保在`material`实例化之前这样做：

```javascript
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')
```
为确保所有纹理都加载良好，您可以使用属性在材质上使用它们`map`，正如我们在纹理课程中看到的那样。

```javascript
const material = new THREE.MeshBasicMaterial({ map: doorColorTexture })
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479671661-5d76a6d9-1f7b-438a-9443-ce772fb4c1ed.png#averageHue=%23170c06&clientId=u8048d26c-0295-4&from=paste&id=u9ce7a529&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ue6121096-35a8-4bc5-8376-fd1a0183a1c&title=)
到目前为止，我们只使用了 MeshBasicMaterial [，](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial)它在我们的几何体上应用了统一的颜色或纹理。
[如果您在Three.js 文档](https://threejs.org/docs/)中搜索“material” ，您会发现有很多我们可以使用的类。让我们都试试看。
## 网格基础材质
[MeshBasicMaterial](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial)可能是最“基本”的材质……但是还有很多我们还没有涉及的属性。
您可以在[MeshBasicMaterial](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial)实例化前，材质参数传入的对象中设置其中的大部分属性，但您也可以直接在实例上更改这些属性：

```javascript
const material = new THREE.MeshBasicMaterial({
    map: doorColorTexture
})

// Equals
const material = new THREE.MeshBasicMaterial()
material.map = doorColorTexture
```
我们将使用第二种方法，但您可以随意使用。
### map 地图
该`map`属性将在几何体表面应用纹理：

```javascript
material.map = doorColorTexture
```
### color 颜色
该`color`属性将在几何体表面应用统一的颜色。当您直接更改`color`属性时，您必须实例化一个[Color](https://threejs.org/docs/index.html#api/en/math/Color)类。您可以使用许多不同的格式：

```javascript
material.color = new THREE.Color('#ff0000')
material.color = new THREE.Color('#f00')
material.color = new THREE.Color('red')
material.color = new THREE.Color('rgb(255, 0, 0)')
material.color = new THREE.Color(0xff0000)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479671687-07a7f174-e6ad-4226-890c-933afe8b77f3.png#averageHue=%231f0705&clientId=u8048d26c-0295-4&from=paste&id=ud0767cb7&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u6fca1ae9-f60b-4613-8c10-3a296a3793a&title=)
结合`color`和`map`用颜色为纹理着色：

```javascript
material.map = doorColorTexture
material.color = new THREE.Color('#ff0000')
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479671911-8c0166ef-6209-4249-b744-96ccad49517d.png#averageHue=%23170503&clientId=u8048d26c-0295-4&from=paste&id=u63e1d80b&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ub9612fc9-a88d-450f-a1d6-8b3080ba94c&title=)
### wireframe 线框
无论相机的距离如何，该`wireframe`属性都会用 1px 的细线显示构成几何体的三角形：
```javascript
material.wireframe = true
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479671757-f742f6c1-c2fb-42bd-82ab-2fe8cb714f27.png#averageHue=%23060606&clientId=u8048d26c-0295-4&from=paste&id=u93de257f&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ucffcfa1f-1a22-4bc7-8014-5f95ec39d21&title=)
### opacity 不透明度
该`opacity`属性控制透明度，但要正常工作，您应该将`transparent`属性设置为`true`以通知 Three.js 此材质现在支持透明度：

```javascript
material.transparent = true
material.opacity = 0.5
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479675220-3be16cd4-ee35-4ab0-b321-730f8d42d4e6.png#averageHue=%23212121&clientId=u8048d26c-0295-4&from=paste&id=u0e05362c&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ub395b128-abf7-4f3d-967e-805d55ec6ea&title=)
### alphaMap 阿尔法地图
现在透明度开始工作了，我们可以使用该`alphaMap`属性来控制纹理的透明度：

```javascript
material.transparent = true
material.alphaMap = doorAlphaTexture
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479675925-559ac677-6b03-4985-92c4-8f435d6e95a8.png#averageHue=%23131313&clientId=u8048d26c-0295-4&from=paste&id=u7950ff2f&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u6346d6ef-5e3a-419e-80c0-96b3d7d3d9d&title=)
### side 边
该`side`属性可让您决定面部的哪一侧可见。默认情况下，正面是可见的 ( `THREE.FrontSide`)，但您可以改为显示背面 ( `THREE.BackSide`) 或同时显示背面 ( `THREE.DoubleSide`)：

```javascript
material.side = THREE.DoubleSide
```
您应该看到曲面的的正面和背面。
**尽量避免使用**`**THREE.DoubleSide**`**因为渲染两侧意味着要渲染两倍以上的三角形。**
其中一些属性类似于`wireframe`或`opacity`可以与其他类型的材料一起使用。我们不会每次都重复这些。
## MeshNormalMaterial 网格法线材质
MeshNormalMaterial显示漂亮的紫色、蓝色、绿色，看起来像我们在纹理课程中看到的法线纹理[。](https://threejs.org/docs/#api/en/materials/MeshNormalMaterial)这并非巧合，因为两者都与我们所说的法线有关：

```javascript
const material = new THREE.MeshNormalMaterial()
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479676921-bda25d30-a325-40ad-acbf-22420d85f814.png#averageHue=%23000000&clientId=u8048d26c-0295-4&from=paste&id=ucb3de2db&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ud0a59da9-a883-4a67-9f62-1aa9999b9b3&title=)
**法线是在每个顶点中编码的信息，包含面部外侧的方向。如果将这些法线显示为箭头，您会得到从组成几何体的每个顶点出来的直线。**
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479676612-29575aa5-b991-4387-9de9-ef5cec003fd6.png#averageHue=%23e0d5cb&clientId=u8048d26c-0295-4&from=paste&id=u9abca595&originHeight=1080&originWidth=1920&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u98e6784a-9e54-419a-bf41-e5be7796493&title=)
您可以将法线用于许多事情，例如计算如何照亮面部或环境应如何在几何体表面反射或折射。
使用[MeshNormalMaterial](https://threejs.org/docs/#api/en/materials/MeshNormalMaterial)时，颜色将仅显示法线相对于相机的方向。如果围绕球体旋转，您会发现颜色始终相同，无论您正在查看球体的哪个部分。
[虽然您可以使用我们在MeshBasicMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial)中发现的一些属性，例如wireframe、transparent、opacity和side，但您还可以使用一个新属性，称为：`flatShading`

```javascript
material.flatShading = true
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479678810-53a25346-8656-4247-a12b-8e51c32e14aa.png#averageHue=%23000000&clientId=u8048d26c-0295-4&from=paste&id=u0bedbd17&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u3a6e6495-82c3-4109-aed2-236291e5b85&title=)
`flatShading`将使面变平，这意味着法线不会在顶点之间进行插值。
[MeshNormalMaterial](https://threejs.org/docs/#api/en/materials/MeshNormalMaterial)可用于调试法线，但它看起来也很棒，您可以像 ilithya 在她的作品集[https://www.ilithya.rocks](https://www.ilithya.rocks/)上所做的那样使用它。
## MeshMatcap材质
[MeshMatcapMaterial](https://threejs.org/docs/#api/en/materials/MeshMatcapMaterial)是一种很棒的材料，因为它看起来很棒，同时又非常高效。
为了使其工作，MeshMatcapMaterial[需要](https://threejs.org/docs/#api/en/materials/MeshMatcapMaterial)一个看起来像球体的参考纹理。
![](https://cdn.nlark.com/yuque/0/2023/jpeg/35159616/1684479678764-8ba826b9-0a81-4799-9b8b-8dc78d4f4ecb.jpeg#averageHue=%23845a41&clientId=u8048d26c-0295-4&from=paste&id=u4100f885&originHeight=256&originWidth=256&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u13b67279-6ee1-44fd-8602-2667eccfe7e&title=)
然后材质将根据相对于相机的法线方向在纹理上拾取颜色。
要设置该参考 matcap 纹理，请使用以下`matcap`属性：

```javascript
const material = new THREE.MeshMatcapMaterial()
material.matcap = matcapTexture
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479678815-3711455d-63db-492e-8c77-c70d89883338.png#averageHue=%23120c08&clientId=u8048d26c-0295-4&from=paste&id=uaf61491b&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u6802ce0f-05dc-435a-9c1f-7e642de6fd0&title=)
网格看起来会被照亮,并且反射光泽，但它只是一个看起来像金属的纹理。
唯一的问题是无论相机方向如何，错觉都是一样的。此外，您无法更新灯光，因为没有灯光。
尝试文件夹上可用的不同纹理/static/textures/matcaps/（只是下面一行之一）：

```javascript
const matcapTexture = textureLoader.load('/textures/matcaps/2.png')
const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture = textureLoader.load('/textures/matcaps/4.png')
const matcapTexture = textureLoader.load('/textures/matcaps/5.png')
const matcapTexture = textureLoader.load('/textures/matcaps/6.png')
const matcapTexture = textureLoader.load('/textures/matcaps/7.png')
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479680079-976e4a4e-8990-4dc2-80d2-03999939cd0f.png#averageHue=%23060403&clientId=u8048d26c-0295-4&from=paste&id=uc24dcbb9&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u1a2160b7-98be-4f4e-a0e5-5cfd1046af6&title=)
关于在哪里可以找到 matcaps 纹理，您可以像任何类型的纹理一样在网络上进行简单的搜索。如果不是供个人使用，请确保您有权使用该纹理。还有这个庞大的 matcaps 列表：[https ://github.com/nidorx/matcaps](https://github.com/nidorx/matcaps)
您还可以使用 3D 软件创建自己的 matcaps，方法是在相机前以方形图像渲染一个球体。最后，您可以尝试在 Photoshop 等 2D 软件中制作 matcap。
## [MeshDepthMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshDepthMaterial)near 网格深度材质
如果MeshDepthMaterial接近相机的值， [MeshDepthMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshDepthMaterial)near将简单地将几何体着色为白色，如果它接近far相机的值，则为黑色：

```javascript
const material = new THREE.MeshDepthMaterial()
```

您可以将此材质用于特殊效果，您需要知道像素与相机的距离。我们将在以后的课程中使用它。
## [AmbientLight](https://threejs.org/docs/index.html#api/en/lights/AmbientLight) 添加灯光-- 后续的材质反射灯光 
后面几个材料需要灯光才能看到。因为材料会反射灯光了，让我们在场景中添加两个简单的灯光。
创建一个[AmbientLight](https://threejs.org/docs/index.html#api/en/lights/AmbientLight)并将其添加到场景中：

```javascript
/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
```
创建一个[PointLight](https://threejs.org/docs/#api/en/lights/PointLight)并将其添加到场景中：

```javascript
// ...

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
```
在以后的课程中，我们将更多地了解灯光、它们的工作原理以及如何调整它们。
## MeshLambert光材质 
MeshLambertMaterial是我们将要使用的第一种对光有反应的材料[：](https://threejs.org/docs/#api/en/materials/MeshLambertMaterial)

```javascript
const material = new THREE.MeshLambertMaterial()
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479681362-1ad14fdb-8684-4592-8533-dbe87680cbc7.png#averageHue=%23191919&clientId=u8048d26c-0295-4&from=paste&id=u7bd8f644&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ub41a6e06-22af-4901-9526-c018aeb43a9&title=)
如您所见，事情变得越来越现实。虽然照明不是很令人信服，但这是一个好的开始。
[MeshLambertMaterial支持与](https://threejs.org/docs/#api/en/materials/MeshLambertMaterial)[MeshBasicMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial)相同的属性，但也支持一些与灯光相关的属性。我们将在本课稍后使用更充分的材料看到这些属性。
MeshLambertMaterial是使用灯光[的](https://threejs.org/docs/#api/en/materials/MeshLambertMaterial)最高性能材料。不幸的是，这些参数并不方便，如果您仔细观察像球体这样的圆形几何体，您会在几何体上看到奇怪的图案。
## MeshPhong高光材质
MeshPhongMaterial与[MeshLambertMaterial](https://threejs.org/docs/#api/en/materials/MeshPhongMaterial)非常相似，但奇怪的图案不太明显，您还可以看到几何体表面的光反射[：](https://threejs.org/docs/#api/en/materials/MeshLambertMaterial)

```javascript
const material = new THREE.MeshPhongMaterial()
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479681850-886f8b81-bef1-4753-8f1b-7b81b9dd521c.png#averageHue=%231b1b1b&clientId=u8048d26c-0295-4&from=paste&id=ue756eca7&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u3cca4be2-992e-4f82-b64b-06047b48dff&title=)
[MeshPhongMaterial](https://threejs.org/docs/#api/en/materials/MeshPhongMaterial)的性能不如[MeshLambertMaterial](https://threejs.org/docs/#api/en/materials/MeshLambertMaterial)。但是，在这个级别上并不重要。
**您可以使用该属性控制光反射**`**shininess**`**。值越高，表面越光亮。您还可以使用以下属性更改反射的颜色**`**specular**`：

```javascript
material.shininess = 100
material.specular = new THREE.Color(0x1188ff)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479681821-68e3049f-3201-4a72-8196-619664d5e872.png#averageHue=%233a3a3a&clientId=u8048d26c-0295-4&from=paste&id=u5627ca35&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u4f53e5af-486f-43ee-9490-8524bf3cc89&title=)
光反射将呈蓝色。
## MeshToon材质
MeshToonMaterial在属性方面类似于[MeshLambertMaterial](https://threejs.org/docs/#api/en/materials/MeshLambertMaterial)[，但具有卡通风格：](https://threejs.org/docs/#api/en/materials/MeshToonMaterial)

```javascript
const material = new THREE.MeshToonMaterial()
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479683698-3ad9eea3-0138-437b-b7cf-0e0d4c68ce02.png#averageHue=%23202020&clientId=u8048d26c-0295-4&from=paste&id=ueea21dcf&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uee67801e-cfc7-49d0-b1a8-60b9c4348c8&title=)
默认情况下，您只能获得两部分着色（一个用于阴影，一个用于光）。要为着色添加更多步骤，您可以使用该`gradientMap`属性并使用`gradientTexture`我们在课程开始时加载的：

```javascript
material.gradientMap = gradientTexture
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479684325-5c20c286-54af-42ca-9097-6703f8626139.png#averageHue=%23202020&clientId=u8048d26c-0295-4&from=paste&id=u6a6eaee0&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uabbec5b2-1635-42a5-8eea-7a2184403e8&title=)
如果您对此进行测试，您会发现卡通效果不再起作用。那是因为我们使用的渐变纹理很小，并且该纹理的像素是混合的。是的，就像我们在纹理课程中看到的那样`mipmapping`，这是`minFilter`,`magFilter`和的问题。
要解决这个问题，我们可以简单地将`minFilterand`更改`magFilter`为`THREE.NearestFilter`.
使用`THREE.NearestFilter`意味着我们没有使用 mip 映射，我们可以通过以下方式停用它`gradientTexture.generateMipmaps = false`：

```javascript
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479684771-d9604789-a876-4fda-9267-bec9beb2cecf.png#averageHue=%231e1e1e&clientId=u8048d26c-0295-4&from=paste&id=u864532b3&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u70abe302-53d6-429d-9e29-7a602204ac6&title=)
您现在应该可以通过中间步骤看到卡通效果。
您可以使用位于以下位置的图像尝试更多步骤`/static/textures/gradients.5.jpg`：

```javascript
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479685835-02fdf597-004a-4d21-93d9-6173a075281f.png#averageHue=%23171717&clientId=u8048d26c-0295-4&from=paste&id=u1364b412&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u8a4f2f2d-80d7-4195-92c6-d439d864183&title=)
## 网格标准材料
MeshStandardMaterial使用基于物理引擎的渲染原理[。](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)是的，我们正在谈论在纹理课程中看到的 PBR。[与MeshLambertMaterial](https://threejs.org/docs/#api/en/materials/MeshLambertMaterial)和[MeshPhongMaterial](https://threejs.org/docs/#api/en/materials/MeshPhongMaterial)一样，它支持灯光，但具有更逼真的算法和更好的参数，如粗糙度和金属度。
之所以称为“标准”，是因为 PBR 正在成为许多软件、引擎和库中的标准。这个想法是用真实的参数获得真实的结果，无论您使用何种技术，您都应该得到非常相似的结果：

```javascript
const material = new THREE.MeshStandardMaterial()
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479686205-a34f18d7-1f5d-4685-83d8-27d8dbb9df07.png#averageHue=%231c1c1c&clientId=u8048d26c-0295-4&from=paste&id=u44d0088d&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u41a7bacc-f263-4e2e-bf17-acc51f8cb1b&title=)
您可以直接更改`roughness`和`metalness`属性：

```javascript
material.metalness = 0.45
material.roughness = 0.65
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479687087-fb74e0af-cd8a-4e2d-b96b-b172302e40c9.png#averageHue=%23111111&clientId=u8048d26c-0295-4&from=paste&id=uf525cc9d&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u32d3cb87-6cc5-4a6d-88c8-9cc2877d684&title=)
### 添加调试界面
虽然这不是必需的，但现在是添加调试 UI 的绝佳时机。这对于测试不同的属性非常有用。
首先，我们必须将[Dat.GUI](https://www.npmjs.com/package/dat.gui)依赖项添加到我们的项目中。在终端的项目文件夹（服务器当前运行的位置）上，使用以下命令：

```shell
npm install --save lil-gui
```
正如调试课程中提到的，我们正在安装`lil-gui`而不是 dat.gui。这个库的工作原理与 dat.gui 完全相同，我们将在课程的其余部分将其称为“dat.gui”。
然后，在你的代码之上，导入（如果你停止了它，`lil-gui`不要忘记重新启动服务器）：`npm run dev`

```javascript
import * as dat from 'lil-gui'
```
您现在可以创建它的一个实例：

```javascript
/**
 * Debug
 */
const gui = new dat.GUI()
```
并添加调整（在创建材料之后）：

```javascript
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
```
就是这样。您现在可以根据需要更改`metalness`和`roughness`。
[让我们继续MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)的其他属性。
该`map`属性允许您应用简单的纹理。您可以使用`doorColorTexture`：

```javascript
material.map = doorColorTexture
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479687064-14c89659-5659-4ecc-b3c1-e09c07b0907b.png#averageHue=%230d0602&clientId=u8048d26c-0295-4&from=paste&id=u30ff0917&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u49023945-7373-4619-9f17-3e55303faf7&title=)
该`aoMap`属性（字面意思是“环境遮挡贴图”）将在纹理较暗的地方添加阴影。为了让它起作用，您必须添加我们所说的第二组 UV（有助于在几何体上定位纹理的坐标）。
我们可以像在几何课上那样简单地添加新属性并使用默认`uv`属性。更简单地说，我们复制了`uv`属性。
调用这个新属性`uv2`：

```javascript
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))
```
您现在可以添加`aoMap`使用`doorAmbientOcclusionTexture`纹理并使用`aoMapIntensity`属性控制强度：

```javascript
material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 1
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479687780-f37ddff3-4105-43c8-adf6-420b03a8eeb2.png#averageHue=%230d0502&clientId=u8048d26c-0295-4&from=paste&id=u52a199c5&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u9a12d5fb-fa70-4865-9d4b-1653bd79b90&title=)
裂缝应该看起来更暗，这会产生对比并增加尺寸。
该`displacementMap`属性将移动顶点以创建真正的浮雕：

```javascript
material.displacementMap = doorHeightTexture
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479688944-ee37f625-78c4-4879-84f9-eacbfc4b8f3e.png#averageHue=%23261006&clientId=u8048d26c-0295-4&from=paste&id=ub51c954b&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u3c767f7f-9706-4314-9a9f-3a84bb7efd7&title=)
它应该看起来很糟糕。这是由于我们的几何图形缺少顶点（我们需要更多细分）并且位移太强：

```javascript
material.displacementScale = 0.05

// ...

new THREE.SphereGeometry(0.5, 64, 64),

// ...

new THREE.PlaneGeometry(1, 1, 100, 100),

// ...

new THREE.TorusGeometry(0.3, 0.2, 64, 128),
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479691488-21bf9e15-9879-4a84-92b3-d2e5e1813f05.png#averageHue=%23190b04&clientId=u8048d26c-0295-4&from=paste&id=u923a299b&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uafa93016-1ec7-4781-8ac3-bf87907ecfb&title=)
我们可以使用`metalnessMap`and `roughnessMap`，而不是为整个几何体指定  `metalness` and `roughness` 

```javascript
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479691130-c3b5fa0e-cd0d-4a9e-8a63-5bc19edcfbac.png#averageHue=%23160903&clientId=u8048d26c-0295-4&from=paste&id=u97a49a57&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u66b7d796-a5b0-4fac-8620-057786c156e&title=)
反射看起来很奇怪，因为`metalness`和`roughness`属性仍然分别影响每个贴图。我们应该评论它们或使用它们的原始值：

```javascript
material.metalness = 0
material.roughness = 1
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479693812-5ea9087b-a665-42e2-a5cd-b79cc8427383.png#averageHue=%23130803&clientId=u8048d26c-0295-4&from=paste&id=ua81da1a5&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uf988da27-94c9-4cf5-8634-0f16801169d&title=)
无论细分如何，`normalMap`都会伪造法线方向并在表面上添加细节：

```javascript
material.normalMap = doorNormalTexture
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479696421-71e68e3c-47e4-498f-954c-d41058247393.png#averageHue=%23180b04&clientId=u8048d26c-0295-4&from=paste&id=u69b07693&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u647c7455-e172-49ec-98db-e5d3881fed9&title=)
您可以使用该属性更改法线强度`normalScale`。小心，它是一个[Vector2](https://threejs.org/docs/index.html#api/en/math/Vector2)：

```javascript
material.normalScale.set(0.5, 0.5)
```
最后，您可以使用该`alphaMap`属性控制 `alpha`。不要忘记将`transparent`属性设置为`true`：

```javascript
material.transparent = true
material.alphaMap = doorAlphaTexture
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479697396-cf860a61-ea47-4507-a0b7-f88bff7acd25.png#averageHue=%230d0602&clientId=u8048d26c-0295-4&from=paste&id=u5dd67f8d&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u9f327d67-fef5-43f5-a11d-cecc8086df8&title=)
这是一扇漂亮的门。随意调整属性并尝试一些东西。
## MeshPhysicalMaterial 网格物理材质
MeshPhysicalMaterial与[MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)相同[，](https://threejs.org/docs/index.html#api/en/materials/MeshPhysicalMaterial)但支持透明涂层效果。[您可以控制透明涂层的属性，甚至可以像Three.js 示例](https://threejs.org/examples/#webgl_materials_physical_clearcoat)中那样使用纹理，但我们不会在这里尝试这个。
## [PointsMaterial](https://threejs.org/docs/index.html#api/en/materials/PointsMaterial) 点材质
您可以将[PointsMaterial](https://threejs.org/docs/index.html#api/en/materials/PointsMaterial)与粒子一起使用。我们将在专门的课程中看到更多相关信息。
## ShaderMaterial 和 RawShaderMaterial
[ShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial)和[RawShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/RawShaderMaterial)都可以用来创建您自己的材质，但我们将在专门的课程中看到更多相关信息。
## [MeshStandardMaterial ](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial)材质镜面反射出环境图
环境贴图就像场景周围的图像。您可以使用它为对象添加反射或折射。它还可以用作照明信息。
我们还没有介绍它，但您可以将它与我们看到的许多材料一起使用。
首先，让我们像之前一样使用调试 UI设置一个非常简单的[MeshStandardMaterial ：](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial)

```javascript
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479698335-4ac9e5ff-e1c6-44b8-a753-b7d11a6bf9c3.png#averageHue=%230a0a0a&clientId=u8048d26c-0295-4&from=paste&id=u478fc9e1&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ud091fb18-0f34-432e-9ad9-104aab4afb9&title=)
要将环境贴图添加到我们的材质中，我们必须使用该`envMap`属性。Three.js 只支持立方体环境贴图。立方体环境贴图是 6 张图像，每张图像对应环境的一侧。
您可以在文件夹中找到多个环境贴图`/static/textures/environmentMap/`。
要加载立方体纹理，您必须使用 CubeTextureLoader[而](https://threejs.org/docs/index.html#api/en/loaders/CubeTextureLoader)不是[TextureLoader](https://threejs.org/docs/index.html#api/en/loaders/TextureLoader)。
在实例化和调用其方法之前实例化[CubeTextureLoader](https://threejs.org/docs/index.html#api/en/loaders/CubeTextureLoader)，但使用一组路径而不是一个路径：`load(...)`

```javascript
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])
```
您现在可以在材料的`envMap`属性中使用`environmentMapTexture`：

```javascript
material.envMap = environmentMapTexture
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684479699978-44b261d4-aa0b-4cb4-85ae-35a5682526af.png#averageHue=%230f0e0d&clientId=u8048d26c-0295-4&from=paste&id=uc910d2ce&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ubefebbbc-237f-48e5-978b-7b08368336f&title=)
您应该看到周围环境出现在几何体的表面上。尝试调整`metalness`和`roughness`以获得不同的结果。
您还可以测试文件夹中的其他环境贴图`/static/textures/environmentMap/`。
### 在哪里可以找到环境贴图
要找到很酷的环境地图，您可以随时在网络上进行简单的搜索，并确保您有权使用环境地图（如果不是供个人使用）。
最好的来源之一是[HDRIHaven](https://hdrihaven.com/)。这个网站有数百个很棒的 HDRI。HDRI 代表**高动态范围成像**。它们由一个图像（不是立方体贴图）组成，包含比简单图像更多的数据，从而改善光照信息以获得更真实的结果。[HDRIHaven](https://hdrihaven.com/)图像是免费的，并在[CC0 许可](https://hdrihaven.com/p/license.php)下，这意味着您可以对它们做任何您想做的事，而无需注明作者姓名。但如果您欣赏他们的工作，您可以通过订阅[他们的 Patreon](https://www.patreon.com/hdrihaven/overview)来感谢他们。
但是我们有一个问题。正如我们所说，Three.js 仅支持立方体贴图。要将 HDRI 转换为立方体贴图，您可以使用此在线工具：[https://matheowis.github.io/HDRI-to-CubeMap/](https://matheowis.github.io/HDRI-to-CubeMap/)
上传 HDRI，随意旋转，然后下载由 6 张图像组成的立方体贴图版本。默认格式为`.jpg`，如果需要，您必须将它们转换为`.png`。

