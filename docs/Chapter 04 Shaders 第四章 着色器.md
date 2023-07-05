# 28. Shaders 着色器
## 介绍
这堂课可能是最值得期待的一堂课。我们已经讨论过着色器，这是要求最高的话题。
有趣的是我们从一开始就一直在使用它们。当我们创建 Three.js 内置材质时，这些材质由着色器组成。由于着色器，WebGL 渲染上显示的所有内容都成为可能，但现在是我们自己创建它们的时候了。
我们将首先解释什么是着色器以及何时使用它们。然后我们将创建我们自己的非常简单的着色器。当然，我们将介绍着色器语言的语法。最后，我们将做一些练习来练习经典情况。
## 什么是着色器
事实上，着色器是 WebGL 的主要组件之一。如果我们在没有 Three.js 的情况下开始使用 WebGL，那么这将是我们必须学习的第一件事，这就是原生 WebGL 如此困难的原因。
着色器是用 GLSL 编写的发送到 GPU 的程序。它们用于定位几何体的每个顶点并为该几何体的每个可见像素着色。“像素”一词并不准确，因为渲染中的每个点不一定与屏幕的每个像素匹配，这就是为什么我们更喜欢使用术语“片段”，所以如果您看到这两个术语，请不要感到惊讶。
然后我们将大量数据发送到着色器，例如顶点坐标、网格变换、有关相机及其视野的信息、颜色、纹理、灯光、雾等参数。然后 GPU 进行处理所有这些数据都遵循着色器指令，并且我们的几何体出现在渲染中。
有两种类型的着色器，我们都需要它们。
### 顶点着色器
顶点着色器的目的是定位几何体的顶点。这个想法是发送顶点位置、网格变换（如其位置、旋转和缩放）、相机信息（如其位置、旋转和视场）。然后，GPU 将按照顶点着色器中的指令处理所有这些信息，以便将顶点投影到将成为我们的渲染（即我们的画布）的 2D 空间上。
使用顶点着色器时，其代码将应用于几何体的每个顶点。但是一些数据（例如顶点位置）会在每个顶点之间发生变化。这种类型的数据（在顶点之间变化的数据）称为属性。但有些数据不需要像网格的位置一样在每个顶点之间切换。是的，网格的位置会影响所有顶点，但方式相同。这种类型的数据（在顶点之间不会改变的数据）称为统一数据。我们稍后会回到属性和制服。
顶点着色器首先发生。一旦放置了顶点，GPU 就知道几何体的哪些像素是可见的，并且可以继续进行片段着色器。
### 片段着色器
片段着色器的目的是为几何体的每个可见片段着色。
相同的片段着色器将用于几何体的每个可见片段。我们可以使用uniforms将数据像颜色一样发送给它——就像顶点着色器一样，或者我们可以将数据从顶点着色器发送到片段着色器。我们将这种类型的数据（从顶点着色器到片段着色器的数据）称为变化的。我们稍后再讨论这个问题。
片段着色器中最直接的指令可以是用相同的颜色为所有片段着色。如果我们只设置了属性，我们就得到了[MeshBasicMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial)的等价物color。
或者我们可以向着色器发送更多数据，例如灯光位置。然后，我们可以根据脸部在光源前面的距离来为片段着色。如果场景中只有一盏灯，我们将获得[MeshPhongMaterial等效项。](https://threejs.org/docs/index.html#api/en/materials/MeshPhongMaterial)
### 概括
顶点着色器在渲染上定位顶点。
片段着色器为该几何体的每个可见片段（或像素）着色。
片段着色器在顶点着色器之后执行。
每个顶点之间变化的数据（如它们的位置）称为属性，只能在顶点着色器中使用。
顶点之间不变的数据（例如网格位置或颜色）称为统一数据，可以在顶点着色器和片段着色器中使用。
我们可以使用变量将数据从顶点着色器发送到片段着色器。
## 为什么要编写我们自己的着色器
Three.js 材料试图涵盖尽可能多的情况，但它们有局限性。如果我们想打破这些限制，我们必须编写自己的着色器。
也可能是出于性能原因。[像MeshStandardMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial)这样的材质非常复杂，涉及大量代码和计算。如果我们编写自己的着色器，我们可以将功能和计算保持在最低限度。我们对性能有更多的控制。
编写我们自己的着色器也是向渲染添加后期处理的绝佳方法，但我们将在专门的课程中看到这一点。
一旦您掌握了着色器，它们将成为您所有项目中的必需品。
## 使用 RawShaderMaterial 创建我们的第一个着色器
为了创建我们的第一个着色器，我们需要创建一种特定的材质。该材质可以是[ShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial)或[RawShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/RawShaderMaterial)。两者之间的区别在于[ShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial)会自动将一些代码添加到着色器代码中，而 RawShaderMaterial[顾名思义](https://threejs.org/docs/index.html#api/en/materials/RawShaderMaterial)，什么也没有。
[我们将从RawShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/RawShaderMaterial)开始，以更好地了解正在发生的情况。
启动器包含一个简单的平面，上面有一个[MeshBasicMaterial 。](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial)
将[MeshBasicMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial)替换为[RawShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/RawShaderMaterial)：

```javascript
const material = new THREE.RawShaderMaterial()
```
JavaScript
复制
你应该得到一个错误。
正如我们之前所说，我们需要提供顶点着色器和片段着色器。您可以使用vertexShader和fragmentShader属性来做到这一点：

```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: '',
    fragmentShader: ''
})
```
JavaScript
复制
该技术的问题在于简单引号内只能包含一行——双引号也是如此。我们的着色器——尽管一开始很简单，但会太长而无法写在一行上。
可靠的解决方案是使用反引号——也称为反引号、尖引号或左引号。大多数现代浏览器都支持它们。这种技术称为[模板文字](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals)，我们可以在其中使用换行符。
写入该字符的键或快捷键取决于您的键盘。以下是有关该主题的线程可以帮助您：[https://superuser.com/questions/254076/how-do-i-type-the-tick-and-backtick-characters-on-windows/879277](https://superuser.com/questions/254076/how-do-i-type-the-tick-and-backtick-characters-on-windows/879277)
找到关键后，用反引号更改简单引号：

```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: ``,
    fragmentShader: ``
})
```
JavaScript
复制
我们终于可以编写着色器了。只需复制代码，我们稍后会解释一切：

```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: `
        uniform mat4 projectionMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 modelMatrix;

        attribute vec3 position;

        void main()
        {
            gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        precision mediump float;

        void main()
        {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `
})
```
JavaScript
复制
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546766458-53cd13e7-1bb9-495b-ad82-527f2abaa86b.png#averageHue=%233b0000&clientId=u4f0bc23a-2308-4&from=paste&id=u067612ba&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u507b1f6e-beb6-4435-bb7d-4a4826a8b83&title=)
你应该买一架红色飞机。恭喜，您可能还不明白这里写的内容，但这是您的第一个着色器，也是一段令人难以置信的旅程的良好开端。
## 将着色器分开在不同的文件中 [29:33](https://threejs-journey.com/lessons/shaders#)
在我们进入代码本身之前，让我们尝试改进我们的工作方式。反引号对于小代码来说是一个很好的解决方案，我们将在以后的着色器课程中使用它，但我们缺少语法着色。一旦我们有多个着色器，里面有很多代码，我们的脚本就会变得难以忍受。拥有良好且舒适的设置至关重要。
### 着色器文件
我们将把代码移动到单独的文件中。首先，将顶点着色器代码和片段着色器代码分别移至/src/shaders/test/vertex.glsl和中/src/shaders/test/fragment.glsl。
即使我们的项目中只有一个着色器，尽可能地分离和组织代码也是一种健康的习惯。相应的项目可以有数十个自定义着色器。
除非您的代码编辑器已经支持 glsl，否则语法着色可能不适用于这两个新文件。要添加语法着色，如果您使用的是 VSCode，请转到您的插件，搜索shader并安装该Shader languages support for VS Code插件。如果您使用其他代码编辑器，请寻找兼容的插件并关注流行度和评论。
安装后，文件上应该有漂亮的语法颜色.glsl。如果没有，请尝试重新启动代码编辑器。
语法着色很酷，但拥有 linter 就更好了。linter 将验证您的代码并在您编写代码时发现潜在的错误。无需在浏览器上测试结果，避免基本错误非常有用。
我们不会在以下课程中使用它，因为安装它可能很困难，但如果您想尝试一下，我建议您在 Lewis [Lepton Youtube 频道](https://www.youtube.com/channel/UC8Wzk_R1GoPkPqLo-obU_kQ)中观看此视频：[https ://www.youtube.com/watch?v=NQ-g6v7GtoI](https://www.youtube.com/watch?v=NQ-g6v7GtoI)
linter 还会在不完整的着色器上产生错误，这是一个问题，因为我们将在本课稍后编写部分着色器。这取决于你，但你可以尝试一下。
### 进口
让我们尝试将文件导入到我们的脚本中：

```javascript
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'
```
JavaScript
复制
不幸的是，我们收到错误，因为我们的项目不知道如何处理.glsl文件。
好消息是，Vite 中已经有添加对着色器支持的解决方案：

- [vite-插件-glsl](https://www.npmjs.com/package/vite-plugin-glsl)
- [vite-插件-glslify](https://www.npmjs.com/package/vite-plugin-glslify)

但既然我们有选择，我们应该选择哪一个呢？
现在，我们只希望能够导入.glsl文件，两者都可以完美地做到这一点。区别在于更具体的功能，其中之一能够将着色器文件包含到其他着色器文件中。
这在 3 种情况下很方便：

- 当我们有巨大的着色器并希望将其拆分为较小的文件时
- 当我们在多个着色器中有相同的代码块并且希望能够从一个文件更改它时
- 当我们想要使用其他开发人员制作的外部着色器块时

[vite-plugin-glsl](https://www.npmjs.com/package/vite-plugin-glsl)和[vite-plugin-glslify](https://www.npmjs.com/package/vite-plugin-glslify)都可以做到这一点，但语法不同。GLSLIFY 是当今的标准方式，但我发现[vite-plugin-glsl](https://www.npmjs.com/package/vite-plugin-glsl)更容易使用，这就是为什么我们要选择它而不是[vite-plugin-glslify](https://www.npmjs.com/package/vite-plugin-glslify)。另请注意，该插件维护良好。
不过，如果在某些时候您需要实现[vite-plugin-glslify](https://www.npmjs.com/package/vite-plugin-glslify)，则过程完全相同，您应该能够自己完成。
要安装[vite-plugin-glsl](https://www.npmjs.com/package/vite-plugin-glsl)，请在终端中关闭服务器并运行npm install vite-plugin-glsl。
然后转到该vite.config.js文件，并在顶部导入glsl自vite-plugin-glsl：

```javascript
import glsl from 'vite-plugin-glsl'

// ...
```
JavaScript
复制
向下面的配置对象添加一个plugins属性，并向其发送一个包含函数调用的数组glsl：

```javascript
import glsl from 'vite-plugin-glsl'

// ...

export default {
    // ...
    plugins:
    [
        glsl()
    ]
}
```
JavaScript
复制
这就是向 Vite 添加插件所需的全部工作。保存vite.config.js，重新启动服务器，着色器应该正确导入。
如果您记录testVertexShader和testFragmentShader，您将获得纯字符串形式的着色器代码：

```javascript
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'

console.log(testVertexShader)
console.log(testFragmentShader)
```
JavaScript
复制
删除这些日志并使用[RawShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/RawShaderMaterial)中的两个着色器：

```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader
})
```
JavaScript
复制
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546766422-44382e6b-5f2b-438b-91d2-ac3320068889.png#averageHue=%233b0000&clientId=u4f0bc23a-2308-4&from=paste&id=u1cb186b7&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8bb34a21-ce84-4e93-b303-cded9321b3d&title=)
### 特性
我们在其他材质中涵盖的大多数常见属性（例如wireframe、side、transparent或 ）flatShading仍然可用于[RawShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/RawShaderMaterial)：

```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    wireframe: true
})
```
JavaScript
复制
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546766690-7c6b499f-fafc-4477-beb5-1a6e80b86d1b.png#averageHue=%230a0000&clientId=u4f0bc23a-2308-4&from=paste&id=ub4f74493&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u46af2dfc-c06b-444d-bb80-c5dd60c2ae1&title=)
map但是诸如、alphaMap、opacity、等属性color将不再起作用，因为我们需要自己在着色器中编写这些功能。
注释或删除线框线。
## GLSL [45:53](https://threejs-journey.com/lessons/shaders#)
用于编码着色器的语言称为 GLSL，代表 OpenGL 着色语言。很接近C语言。让我们了解其语法的基础知识。
### 记录
没有控制台，因此无法记录值。这是因为代码针对每个顶点和每个片段执行。记录一个值是没有意义的。
### 缩进
缩进不是必需的。您可以根据需要缩进。
### 分号
任何指令都需要用分号来结束。即使忘记一个分号也可能会导致编译错误，并且整个材料将无法工作。
### 变量
它是一种类型语言，这意味着我们必须指定变量的类型，并且不能为该变量分配任何其他类型。
要声明变量，我们必须以类型开始，然后是名称（通常采用驼峰式命名法），然后是符号=，然后是值，最后以 结尾;：

```glsl
float fooBar = 0.123;
```
GLSL
复制
有多种不同的类型。
#### 漂浮
浮点数是小数。它们可以是消极的，也可以是积极的。.即使该值被四舍五入，我们也必须始终提供小数位数：

```glsl
float foo = - 0.123;
float bar = 1.0;
```
GLSL
复制
我们可以进行数学运算，例如+、-、*和/：

```glsl
float a = 1.0;
float b = 2.0;
float c = a / b;
```
GLSL
复制
#### 整数
整数的工作方式与浮点数类似，但没有小数' .：

```glsl
int foo = 123;
int bar = - 1;
```
GLSL
复制
我们还可以进行数学运算：

```glsl
int a = 1;
int b = 2;
int c = a * b;
```
GLSL
复制
但我们不能在这些操作中混合使用floatand ：int

```glsl
float a = 1.0;
int b = 2;
float c = a * b;
```
GLSL
复制
但我们可以即时转换类型：

```glsl
float a = 1.0;
int b = 2;
float c = a * float(b);
```
GLSL
复制
#### 布尔值
布尔值只是布尔值：

```glsl
bool foo = true;
bool bar = false;
```
GLSL
复制
#### 矢量2
这就是事情变得有趣的地方。如果我们想用x和y属性存储像 2 个坐标这样的值，我们可以使用 a vec2：

```glsl
vec2 foo = vec2(1.0, 2.0);
```
GLSL
复制
空vec2会导致错误：

```glsl
vec2 foo = vec2();
```
GLSL
复制
我们可以在创建后更改这些属性vec2：

```glsl
vec2 foo = vec2(0.0  );
foo.x = 1.0;
foo.y = 2.0;
```
GLSL
复制
执行诸如将 avec2与 a相乘之类的操作float将同时操作x和y属性：

```glsl
vec2 foo = vec2(1.0, 2.0);
foo *= 2.0;
```
GLSL
复制
#### 矢量3
vec3与 类似vec2，但具有名为 的第三个属性z。当需要 3D 坐标时，这是非常方便的：

```glsl
vec3 foo = vec3(0.0);
vec3 bar = vec3(1.0, 2.0, 3.0);
bar.z = 4.0;
```
GLSL
复制
虽然我们可以使用x, y, and z，但我们也可以使用r, g, and b。这只是语法糖，结果是完全相同的。vec3当我们使用 a来存储颜色时非常有效：

```glsl
vec3 purpleColor = vec3(0.0);
purpleColor.r = 0.5;
purpleColor.b = 1.0;
```
GLSL
复制
Avec3也可以部分地从 a 创建vec2：

```glsl
vec2 foo = vec2(1.0, 2.0);
vec3 bar = vec3(foo, 3.0);
```
GLSL
复制
我们还可以取一部分vec3来生成vec2：

```glsl
vec3 foo = vec3(1.0, 2.0, 3.0);
vec2 bar = foo.xy;
```
GLSL
复制
在这里，bar将会是一个vec2带有1.0, 和2.0作为值的。
这称为swizzle，我们还可以以不同的顺序使用这些属性：

```glsl
vec3 foo = vec3(1.0, 2.0, 3.0);
vec2 bar = foo.yx;
```
GLSL
复制
#### 矢量4
最后，vec4它的工作方式就像它的两个前身，但有第四个值，名为wor a—因为 字母表中w没有后面的字母和“alpha”：za

```glsl
vec4 foo = vec4(1.0, 2.0, 3.0, 4.0);
vec4 bar = vec4(foo.zw, vec2(5.0, 6.0));
```
GLSL
复制
还有其他类型的变量，例如mat2、mat3、mat4或sampler2D，但我们稍后会看到。
### 功能
就像大多数编程语言一样，我们可以创建和使用函数。
函数必须以返回值的类型开头：

```glsl
float loremIpsum()
{
    float a = 1.0;
    float b = 2.0;

    return a + b;
}
```
**GLSL**
**复制**
如果函数不应该返回任何内容，我们将类型设置为**void**：

```glsl
void justDoingStuff()
{
    float a = 1.0;
    float b = 2.0;
}
```
GLSL
复制
我们可以指定参数，但我们还必须提供它们的类型：

```glsl
float add(float a, float b)
{
    return a + b;
}
```
GLSL
复制
正如您可以想象的那样，这个功能毫无价值。
### 原生函数
GLSL内置了很多经典的函数如,,,,,,,,,,,,也有非常实用sin的函数如,,,,,,,,,,,,,, 。_cosmaxminpowexpmodclampcrossdotmixstepsmoothsteplengthdistancereflectrefractnormalize
不幸的是，没有适合初学者的文档，而且大多数时候，我们在网络上进行简单的搜索，通常最终会到达以下三个网站：
#### Shaderific 文档
[https://shaderific.com/glsl.html](https://shaderific.com/glsl.html)
Shaderific 是一款 iOS 应用程序，可让您使用 GLSL。应用程序并不是什么值得关心的事情，但文档还不错。
#### Kronos Group OpenGL 参考页面
[https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/indexflat.php](https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/indexflat.php)
本文档涉及 OpenGL，但您将看到的大多数标准函数都与 WebGL 兼容。我们不要忘记，WebGL 只是一个访问 OpenGL 的 JavaScript API。
#### 着色器文档书
[https://thebookofshaders.com/](https://thebookofshaders.com/)
着色器书主要关注片段着色器，与 Three.js 无关，但它是一个很好的学习资源，并且有自己的[术语表](https://thebookofshaders.com/glossary/)。
## 了解顶点着色器 [01:07:15](https://threejs-journey.com/lessons/shaders#)
现在我们已经了解了 GLSL 语法，让我们尝试了解着色器中的内容。
请记住，顶点着色器的目的是将几何体的每个顶点定位在渲染 2D 空间上。换句话说，顶点着色器会将 3D 顶点坐标转换为 2D 画布坐标。
### 主功能

```glsl
void main()
{
}
```
GLSL
复制
该main函数将被自动调用。正如您所看到的，它不返回任何内容 ( void)。
### gl_位置
该gl_Position变量已经存在。我们需要分配它。该变量将包含顶点在屏幕上的位置。函数中指令的目标main是正确设置该变量。
在本指令的最后，我们得到一个vec4. 这意味着我们可以直接在变量上使用它的x、y、z和属性：wgl_Position

```glsl
void main()
{
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    gl_Position.x += 0.5;
    gl_Position.y += 0.5;
}
```
GLSL
复制
飞机应该在右上角移动。不过要小心; 我们并没有像在positionThree.js 中那样真正在 3D 空间中移动飞机。我们确实在二维空间上移动了投影平面。
把它想象成你在纸上画的图画。在这幅图中，您尊重了消失点的透视。然后，将整个图片移动到桌面的右上角。绘图内部的视角没有改变。
您可能想知道为什么我们需要 4 个值，如果gl_Position它的最终目标是在 2D 空间上定位顶点。这实际上是因为坐标或者不精确地在2D空间中；它们位于我们所说的需要 4 个维度的剪辑空间中。
剪辑空间是在到范围内沿所有 3 个方向（ x、y和）延伸的空间。这就像将所有内容放置在 3D 盒子中。任何超出这个范围的东西都会被“剪裁”并消失。第四个值 ( ) 负责视角。z-1+1w
幸运的是，所有这些都是自动的，作为初学者，我们不需要掌握一切。这只是为了了解而已。
但我们到底要发送什么gl_Position？
### 职位属性
首先，我们使用以下命令检索顶点position：

```glsl
attribute vec3 position;
```
GLSL
复制
请记住，相同的代码适用于几何体的每个顶点。属性是唯一会在顶点之间发生变化的变量。相同的顶点着色器将应用于每个顶点，并且position属性将包含该特定顶点的x、y和坐标。z
然后，我们将其转换vec3为vec4：

```glsl
gl_Position = /* ... */ vec4(position, 1.0);
```
GLSL
复制
这是因为下面的矩阵需要像我们之前看到的那样gl_Position使用vec4。
### 矩阵制服
每个矩阵都会进行变换，position直到我们得到最终的剪辑空间坐标。
我们的代码中有 3 个矩阵，因为它们的值对于几何体的所有顶点都是相同的，所以我们使用uniforms来检索它们。

```glsl
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
```
GLSL
复制
每个矩阵都会做一部分变换：

- 将应用与[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)modelMatrix相关的所有变换。如果我们缩放、旋转或移动[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)，这些变换将包含在 中并应用于。modelMatrixposition
- 将viewMatrix应用相对于相机的变换。如果我们将相机向左旋转，顶点应该在右侧。[如果我们沿着Mesh](https://threejs.org/docs/#api/en/objects/Mesh)方向移动相机，顶点应该会变大，等等。
- 最终会将projectionMatrix我们的坐标转换为最终的剪辑空间坐标。

如果您想了解有关这些矩阵和坐标的更多信息，这里有一篇好文章： https: [//learnopengl.com/Getting-started/Cooperative-Systems](https://learnopengl.com/Getting-started/Coordinate-Systems)。
要应用矩阵，我们将其相乘。如果要将 a 应用于mat4变量，则该变量必须是 a vec4。我们还可以将矩阵与其他矩阵相乘：

```glsl
gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
```
GLSL
复制
实际上有一个更短的版本，其中viewMatrix和modelMatrix组合成modelViewMatrix：

```glsl
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

attribute vec3 position;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```
GLSL
复制
这更短，但我们对每个步骤的控制较少。
实际上，我们将使代码变得更长，以便更好地理解和更好地控制位置：

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
GLSL
复制
这些更改具有完全相同的结果，但我们现在只需调整 的值即可移动整个模型modelPosition：

```glsl
void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += 1.0;

    // ...
}
```
GLSL
复制
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546767185-9c15795c-98de-47d2-a8e7-9e7f3cb8bba6.png#averageHue=%23120000&clientId=u4f0bc23a-2308-4&from=paste&id=uf12795b1&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u50a688b7-a7dc-4c18-9336-b84604f78b1&title=)
整个平面应该显得更高。
或者我们可以做更酷的事情，例如改变平面波：

```glsl
void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;

    // ...
}
```
GLSL
复制
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546767517-3a5b6cb9-b140-4825-b584-eddbe79df5c6.png#averageHue=%233d0000&clientId=u4f0bc23a-2308-4&from=paste&id=u927c1802&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud41684fc-5d14-4c60-a80a-23f93560c15&title=)
我们通过函数z使用坐标来更改。祝您好运，使用 Three.js 内置材料获得此结果。xsin(...)
## 了解片段着色器 [01:23:13](https://threejs-journey.com/lessons/shaders#)
片段着色器代码将应用于几何体的每个可见片段。这就是为什么片段着色器出现在顶点着色器之后。
该代码比顶点着色器更易于管理。
### 主功能
我们再次面对这个main函数：

```glsl
void main()
{
}
```
GLSL
复制
### 精确
我们在代码顶部还有一条指令：

```glsl
precision mediump float;
```
GLSL
复制
这个指令让我们决定可以有多精确float。有不同的可能值：

- highp
- mediump
- lowp

highp可能会影响性能，甚至可能无法在某些设备上运行。lowp可能会因缺乏精度而产生错误。我们通常使用mediump. 我们还可以设置顶点着色器的精度，但这不是必需的。
[当我们使用ShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial)而不是[RawShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/RawShaderMaterial)时，这部分会自动处理。
### gl_FragColor
与gl_FragColor类似，gl_Position但颜色不同。它已经被声明了，我们需要在main函数中对其进行赋值。
它的vec4前三个值是红色、绿色和蓝色通道 ( r, g, b)，第四个值是 alpha ( a)：

```glsl
gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);
```
GLSL
复制
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546768503-86cf359b-409a-4400-b30a-bf0491008ff1.png#averageHue=%231e003d&clientId=u4f0bc23a-2308-4&from=paste&id=u69a65d97&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ube6b4c84-02ed-43d0-ae88-ec1b574fc1b&title=)
此代码将为整个几何图形生成紫色。
的每个属性都gl_FragColor从0.0到1.0。我们可以毫无错误地超越这些值，但这对我们没有帮助。
如果我们想设置下面的 alpha 1.0，我们还需要在[RawShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/RawShaderMaterial)transparent中设置属性：true

```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    transparent: true
})
```
JavaScript
复制
## 属性 [01:27:09](https://threejs-journey.com/lessons/shaders#)
属性是在每个顶点之间变化的值。我们已经有一个名为的属性position，其中包含vec3每个顶点的坐标。
我们可以像在几何课程中那样将自己的属性直接添加到 BufferGeometry 中[。](https://threejs.org/docs/#api/en/core/BufferGeometry)
z在本课中，我们将为每个顶点添加一个随机值，并根据该值在轴上移动该顶点。
让我们回到 JavaScript 并在[创建](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)geometry. 要知道几何体中有多少顶点，我们可以使用已经存在的position属性：

```javascript
const count = geometry.attributes.position.count
const randoms = new Float32Array(count)
```
JavaScript
复制
然后我们用随机值填充这个数组：

```javascript
for(let i = 0; i < count; i++)
{
    randoms[i] = Math.random()
}
```
JavaScript
复制
[最后，我们在BufferAttribute](https://threejs.org/docs/#api/en/core/BufferAttribute)中使用该数组并将其添加到我们的几何属性中：

```javascript
geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
```
JavaScript
复制
第一个参数setAttribute(...)是属性的名称。这是我们将在着色器中使用的名称。我们可以选择任何名称，但最好在a“属性”前面加上前缀。
第一个参数BufferAttribute是数据数组，第二个参数是多少个值组成一个属性。如果我们要发送一个位置，我们会使用3，因为位置由 3 个值（x、y和z）组成。但在这里，每个顶点只有 1 个随机值，所以我们使用1.
我们现在可以在顶点着色器中检索此属性并使用它来移动顶点：

```glsl
// ...
attribute float aRandom;

void main()
{
    // ...
    modelPosition.z += aRandom * 0.1;

    // ...
}
```
GLSL
复制
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546768333-6d063c7c-f1e4-42ca-897f-a914fa93e16c.png#averageHue=%23200041&clientId=u4f0bc23a-2308-4&from=paste&id=u5ecb6baf&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u22627235-cdf8-436d-8117-a375a635bc0&title=)
现在你得到了一个由随机尖峰组成的平面。
## 瓦林斯 [01:32:57](https://threejs-journey.com/lessons/shaders#)
我们现在还想使用该aRandom属性为片段着色。
不幸的是，我们不能直接在片段着色器中使用属性。
幸运的是，有一种将数据从顶点着色器发送到片段着色器的方法，称为varyings.
我们必须在顶点着色器和片段着色器上执行此操作。
在顶点着色器中，我们需要在函数之前创建变量main。我们将调用我们的变化vRandom：

```glsl
// ...

varying float vRandom;

void main()
{
    // ...
```
GLSL
复制
您可以根据需要调用您的变量，但我建议添加前缀 av以轻松区分它们。
然后，我们更新函数中的变化值main：

```glsl
varying float vRandom;

void main()
{
    // ...

    vRandom = aRandom;
}
```
GLSL
复制
最后，我们使用相同的声明在片段着色器中获得变化的值，并在函数中按照我们想要的方式使用它main：

```glsl
precision mediump float;

varying float vRandom;

void main()
{
    gl_FragColor = vec4(0.5, vRandom, 1.0, 1.0);
}
```
GLSL
复制
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546768541-0f4464fc-2eee-4ec6-b9fc-38fea30d530c.png#averageHue=%23202141&clientId=u4f0bc23a-2308-4&from=paste&id=uc5820fc7&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u094098cd-7574-4580-8019-08181f2c1fe&title=)
现在，您将获得一个外观引人注目的形状，上面带有彩色尖刺。
变化的一件有趣的事情是顶点之间的值是插值的。如果 GPU 在两个顶点之间绘制片段（一个顶点具有变化1.0，另一个顶点具有变化）0.0，则片段值将为0.5。
让我们删除或注释高程部分和变化，这样我们就回到了紫色平面。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546770067-f45df7d0-930a-49c9-a6f7-5f9a52f2ac6e.png#averageHue=%231d003b&clientId=u4f0bc23a-2308-4&from=paste&id=ua22dbe99&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u26e2800d-fcaa-4d08-bea2-1f31a8c97f3&title=)
稍后我们将使用属性。
## 制服 [01:37:40](https://threejs-journey.com/lessons/shaders#)
Uniform 是一种将数据从 JavaScript 发送到着色器的方法。
如果我们想要使用相同的着色器但具有不同的参数，那么这可能很有价值，而且这也是参数在体验过程中可以更改的场合。
我们可以将制服与顶点着色器和片段着色器一起使用，并且每个顶点和每个片段的数据都相同。我们的代码中已经有了带有projectionMatrix, viewMatrix, and的制服modelMatrix，但我们没有创建这些。Three.js 做到了。
让我们来制作我们自己的制服。
要向我们的 中添加制服material，请使用该uniforms属性。我们将制作平面波并且我们想要控制波的频率：

```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms:
    {
        frequency: { value: 10 }
    }
})
```
JavaScript
复制
在这里，我们选择的制服的名称是frequency。虽然这不是强制性的，但使用字母作为前缀u以将“制服”与其他数据区分开来被认为是一种很好的做法。
将制服名称更改为uFrequency：

```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms:
    {
        uFrequency: { value: 10 }
    }
})
```
JavaScript
复制
如果您正在查看其他教程或示例，您可能会看到制服是这样声明的uFrequency: { value: 10, type: 'float' }。曾经有一段时间我们必须指定类型，但现在它已被弃用。
我们现在可以检索着色器代码中的值并在我们的main函数中使用它：

```glsl
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uFrequency;

attribute vec3 position;

void main()
{
    // ...
    modelPosition.z += sin(modelPosition.x * uFrequency) * 0.1;

    // ...
}
```
GLSL
复制
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546769722-25998b4c-26f3-4c49-a1f2-42cb3326ac9a.png#averageHue=%231e003d&clientId=u4f0bc23a-2308-4&from=paste&id=ube1982fb&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9867b49b-a4ae-4537-8e98-b91c03fbcfb&title=)
结果是相同的，但我们现在可以通过 JavaScript 控制频率。
让我们将频率更改为 avec2以控制水平和垂直的波。我们简单地使用 Three.js [Vector2](https://threejs.org/docs/#api/en/math/Vector2)：

```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms:
    {
        uFrequency: { value: new THREE.Vector2(10, 5) }
    }
})
```
JavaScript
复制
在我们的着色器中，我们将 更改float为，并且我们也使用axisvec2在轴上应用位移：zy

```glsl
// ...
uniform vec2 uFrequency;

// ...

void main()
{
    // ...
    modelPosition.z += sin(modelPosition.x * uFrequency.x) * 0.1;
    modelPosition.z += sin(modelPosition.y * uFrequency.y) * 0.1;

    // ...
}
```
GLSL
复制
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546770126-9b162bd6-fa7e-4d02-8608-10be6bfdf9a2.png#averageHue=%231f003e&clientId=u4f0bc23a-2308-4&from=paste&id=u578077e6&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u91f38caa-e716-4d1c-942d-46a6fb6b489&title=)
花点时间做这件事。很容易犯错误。
因为这些值现在是在 JavaScript 中控制的，所以我们可以将它们添加到我们的 Dat.GUI 中：

```javascript
gui.add(material.uniforms.uFrequency.value, 'x').min(0).max(20).step(0.01).name('frequencyX')
gui.add(material.uniforms.uFrequency.value, 'y').min(0).max(20).step(0.01).name('frequencyY')
```
JavaScript
复制
让我们添加一套新制服，让我们的飞机像风中的旗帜一样充满活力。我们使用统一向着色器发送时间值，并在函数内使用该值sin(...)。首先，更新材质以添加uTime制服：

```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms:
    {
        uFrequency: { value: new THREE.Vector2(10, 5) },
        uTime: { value: 0 }
    }
})
```
JavaScript
复制
然后，在函数uTime中更新这个制服tick。为此，请使用[Clock](https://threejs.org/docs/#api/en/core/Clock)getElapsedTime中的函数来了解过去了多少时间：

```javascript
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update material
    material.uniforms.uTime.value = elapsedTime

    // ...
}
```
JavaScript
复制
最后，我们在顶点着色器中获得统一值，并在两个函数中使用它sin(...)：

```glsl
// ...
uniform float uTime;

// ...

void main()
{
    // ...
    modelPosition.z += sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
    modelPosition.z += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;

    // ...
}
```
GLSL
复制
你应该看到旗帜随风飘扬。
-让我们通过在之前使用 auTime代替 a 来反转方向+：

```glsl
modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
```
GLSL
复制
请小心uTime：如果我们使用像 一样的原生 JavaScript 解决方案Date.now()，它将无法工作。这是因为Date.now()返回了自 1970 年 1 月 1 日以来所花费的毫秒数，并且这个值对于着色器来说太大了。要将其放入 shell 中，请记住我们不能发送太大或太小的统一值。
不要忘记这仍然是一个平面，我们可以像以前一样变换[网格。](https://threejs.org/docs/#api/en/objects/Mesh)让我们给我们的飞机一个旗帜形状。
我们可以在着色器中通过乘以该值来完成此操作，但不要忘记您仍然可以直接在 上modelPosition.y更改position,scale和：rotationmesh

```javascript
const mesh = new THREE.Mesh(geometry, material)
mesh.scale.y = 2 / 3
scene.add(mesh)
```
JavaScript
复制
片段着色器中也提供了制服。让我们添加一个新的制服来控制颜色。对于颜色值，我们可以使用 Three.js a [Color](https://threejs.org/docs/#api/en/math/Color)：

```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms:
    {
        uFrequency: { value: new THREE.Vector2(10, 5) },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('orange') }
    }
})
```
JavaScript
复制
然后，在我们的片段着色器中，我们检索该值，并在我们的gl_FragColor vec4：

```glsl
precision mediump float;

uniform vec3 uColor;

void main()
{
    gl_FragColor = vec4(uColor, 1.0);
}
```
GLSL
复制
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546771109-4a1583dc-61c9-4d79-903b-e9cba262b22d.png#averageHue=%23261900&clientId=u4f0bc23a-2308-4&from=paste&id=u79e1d805&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u2b4957fd-ca27-4343-951c-c96841ac434&title=)
旗帜现在应该是橙色的。
## 纹理 [01:54:39](https://threejs-journey.com/lessons/shaders#)
纹理有点难，但我们几乎拥有了我们需要的一切。
首先，我们必须像之前的课程中那样加载纹理。我们在/static/textures/文件夹中已经有了一个标志纹理，我们可以使用textureLoaderJavaScript starter 中已经可用的纹理：

```javascript
const flagTexture = textureLoader.load('/textures/flag-french.jpg')
```
JavaScript
复制
然后我们可以将纹理作为制服发送。我们可以称之为uTexture：

```javascript
const material = new THREE.RawShaderMaterial({
    // ...
    uniforms:
    {
        // ...
        uTexture: { value: flagTexture }
    }
})
```
JavaScript
复制
虽然很想立即将其发送到片段着色器，但我们遇到了问题。要从纹理中获取片段颜色并将其应用到片段着色器中，我们必须使用该texture2D(...)函数。第一个参数texture2D(...)是纹理（简单，这是我们的uTexture），但第二个参数包含在该纹理上拾取颜色的位置的坐标，而我们还没有这些坐标。
这些信息听起来应该很熟悉。我们正在寻找可以帮助我们在几何体上投影纹理的坐标。我们正在讨论 UV 坐标。
PlaneGeometry自动生成这些[坐标](https://threejs.org/docs/index.html#api/en/geometries/PlaneGeometry)，如果我们记录geometry.attributes.uv.

```javascript
console.log(geometry.attributes.uv)
```
JavaScript
复制
因为它是一个属性，所以我们可以在顶点着色器中检索它：

```glsl
attribute vec2 uv;
```
GLSL
复制
尽管如此，我们仍然需要片段着色器中的这些坐标。要将数据从顶点着色器发送到片段着色器，我们需要创建一个varying. 我们将在函数vUv中调用该变量并更新其值main：

```glsl
// ...
attribute vec2 uv;

varying vec2 vUv;

void main()
{
    // ...

    vUv = uv;
}
```
GLSL
复制
我们现在可以检索片段着色器中的变化vUv，检索统一uTexture并最终获得片段颜色texture2D(...)：

```glsl
precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;

void main()
{
    vec4 textureColor = texture2D(uTexture, vUv);
    gl_FragColor = textureColor;
}
```
GLSL
复制
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546771266-84255cfc-9dc5-44de-ab3b-c467bfa92188.png#averageHue=%230f0f0f&clientId=u4f0bc23a-2308-4&from=paste&id=u7448c86c&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ufe06ac32-1bcd-4284-b778-9d3f9e9fba6&title=)
的输出texture2D(...)是 a，vec4因为它包含r、g、b、 和a— 即使我们的纹理没有 alpha 变化。
你应该得到一面漂亮的旗帜。
再说一遍，慢慢来。在这里犯错误很容易。
## 颜色变化 [02:03:20](https://threejs-journey.com/lessons/shaders#)
我们的旗帜颜色变化不大。如果有像阴影一样的亮度变化那就太好了。
我们将要使用的技术在物理上并不准确，但它应该可以解决问题。
首先，在顶点着色器中，我们将把风高度存储在一个变量中：

```glsl
void main()
{
    // ...

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
    
    modelPosition.z += elevation;

    // ...
}
```
GLSL
复制
然后，我们使用变量将海拔发送到片段：

```glsl
// ...
varying float vElevation;

void main()
{
    // ...

    vElevation = elevation;
}
```
GLSL
复制
最后，我们检索vElevation片段着色器中的变量，并使用它来更改r、g和b的属性textureColor：

```glsl
// ...
varying float vElevation;

void main()
{
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= vElevation * 2.0 + 0.5;
    gl_FragColor = textureColor;
}
```
GLSL
复制
您应该看到旗帜上的亮度变化，就像我们有光和阴影一样。这是一种廉价的技术，但很有效。
着色器材质 [02:08:30](https://threejs-journey.com/lessons/shaders#)
到目前为止，我们已经使用了[RawShaderMaterial](https://threejs.org/docs/#api/en/materials/RawShaderMaterial)。ShaderMaterial[的](https://threejs.org/docs/#api/en/materials/ShaderMaterial)工作原理与此相同，但在着色器代码中预先构建了制服和属性。精度也将自动设置。
要使用它，只需将[RawShaderMaterial](https://threejs.org/docs/#api/en/materials/RawShaderMaterial)替换为[ShaderMaterial](https://threejs.org/docs/#api/en/materials/ShaderMaterial)：

```javascript
const material = new THREE.ShaderMaterial({
    // ...
```
JavaScript
复制
然后删除两个着色器中的以下uniform和：attributeprecision
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
attribute vec3 position;
attribute vec2 uv;
precision mediump float;

```javascript
uniform vec2 uFrequency;
uniform float uTime;

attribute float aRandom;

varying float vElevation;
varying vec2 vUv;

void main()
{
    // ...
}
```
JavaScript
复制
着色器应该像以前一样工作，因为[ShaderMaterial](https://threejs.org/docs/#api/en/materials/ShaderMaterial)会自动添加这些。
调试 [02:10:28](https://threejs-journey.com/lessons/shaders#)
调试着色器很困难。我们无法像在 JavaScript 中那样记录数据，因为 GPU 执行着色器代码，并且它对每个顶点和每个片段执行此操作。
对我们来说有利的是，Three.js 在编译时传递错误方面做得很好。
查找错误
如果我们忘记了分号，Three.js 将记录完整的着色器，并通过简短的描述（如 ）告诉我们发生错误的行ERROR: 0:71: 'vec4' : syntax error。
此消息意味着错误发生在第 行71，但问题可能来自之前的行。花点时间阅读错误，您就会发现问题所在。
读取着色器
记录整个着色器代码也是查看在使用 ShaderMaterial 时 Three.js 在着色器前面添加的内容的绝佳[方法](https://threejs.org/docs/#api/en/materials/ShaderMaterial)。
测试值
调试值的另一个解决方案是在gl_FragColor. 这并不精确，因为我们只能看到颜色变化，但有时这就足够了。
如果值位于顶点着色器中，我们可以使用变量将其传递到片段着色器。
假设我们想看看它是什么uv样子。我们可以将它发送到带有变化的片段（已经完成vUv）并在gl_FragColor：

```glsl
gl_FragColor = vec4(vUv, 1.0, 1.0);
```
GLSL
复制
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546771293-9fdfa880-a1c1-4d09-a0d4-5a97ac066c72.png#averageHue=%23000000&clientId=u4f0bc23a-2308-4&from=paste&id=u70da527b&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u53962d32-5a9c-41a2-9f2b-bff96185b2f&title=)
走得更远 [02:14:47](https://threejs-journey.com/lessons/shaders#)
一旦我们了解了着色器的基础知识，接下来就是练习了。您的第一个着色器将花费无数个小时，但您将学到经常使用的技术。
在接下来的课程中，我们将练习这些技术，甚至学习如何在着色器中绘制形状，但如果您想进一步了解，这里有一些链接：

- 着色器之书： https: [//thebookofshaders.com/](https://thebookofshaders.com/)
- ShaderToy： https: [//www.shadertoy.com/](https://www.shadertoy.com/)
- 代码艺术 YouTube 频道：[https://www.youtube.com/channel/UCcAlTqd9zID6aNX3TzwxJXg](https://www.youtube.com/channel/UCcAlTqd9zID6aNX3TzwxJXg)
- 刘易斯·莱普顿 YouTube 频道：[https://www.youtube.com/channel/UC8Wzk_R1GoPkPqLo-obU_kQ](https://www.youtube.com/channel/UC8Wzk_R1GoPkPqLo-obU_kQ)
