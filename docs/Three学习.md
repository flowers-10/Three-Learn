
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
#### 场景
场景就像一个容器。您将对象、模型、粒子、灯光等放入其中，并在某个时候要求 `Three.js` 渲染该场景。
要创建场景，请使用[Scene](https://threejs.org/docs/index.html#api/en/scenes/Scene)类：
```javascript
// Scene
const scene = new THREE.Scene()
```
#### 对象
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
#### 相机
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
#### 渲染器
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
## 移动对象
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
## 坐标轴助手 
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
## 缩放对象
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
## 旋转对象
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
## 场景图
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

