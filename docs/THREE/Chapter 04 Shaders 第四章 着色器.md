# 28. Shaders 着色器
## 介绍
可能这堂课是最值得大家期待的一堂课。我们之前课程已经讨论过着色器，这是呼声要求最高的一个话题。
有趣的是我们从一开始就一直在使用**着色器**。当我们创建 **Three.js** 内置材质时，这些材质其实就是由着色器组成的。因为着色器，**WebGL** 渲染上显示的所有内容都成为可能，现在是我们深入了解并且创建它们的时候了。
首先我们将解释什么是着色器以及何时去使用它们。然后我们将创建一个我们自己的非常基础的着色器。当然，我们将介绍着色器语言的语法。最后，我们将做一些基础的场景进行练习。
## 什么是着色器
事实上，着色器是 **WebGL** 的主要组件之一。如果我们在不使用 **Three.js** 的情况下开始使用 **WebGL**，那么这将是我们必须学习的第一件事，这就是原生 **WebGL** 的学习如此困难的原因。
着色器是用 **GLSL** 编写的发送到 **GPU** 的程序。它们用于定位几何体的每个顶点并为该几何体的每个可见像素着色。“像素”一词并不准确，因为渲染中的每个点不一定与屏幕的每个像素匹配，这就是为什么我们更喜欢使用术语“片段”，所以如果您看到这两个术语，请不要感到惊讶。
然后我们将大量数据发送到着色器，例如顶点坐标、网格变换、有关相机及其视野的信息、颜色、纹理、灯光、雾等参数。然后 **GPU** 进行处理所有这些数据都遵循着色器指令，并且最终让我们的几何体成功出现在渲染中。
有两种类型的着色器。
### 顶点着色器
顶点着色器的目的是定位几何体的顶点。这个想法是发送顶点位置、网格变换（如其位置、旋转和缩放）、相机信息（如其位置、旋转和视场）。然后，**GPU** 将按照顶点着色器中的指令处理所有这些信息，以便将顶点投影到将成为我们渲染的 **2D** 空间上（即我们的画布）。
使用顶点着色器时，其代码将应用于几何体的每个顶点。但是一些数据（例如顶点位置）会在每个顶点之间发生变化。这种类型的数据（在顶点之间变化的数据）称为属性**attribute**。但有些数据不需要像网格的位置一样在每个顶点之间切换。是的，网格的位置会影响所有顶点，但方式相同。这种类型的数据（在顶点之间不会改变的数据）称为统一数据。我们稍后会回到属性**attributes** 和制服**uniform**。
顶点着色器首先发生。一旦放置了顶点，**GPU** 就知道几何体的哪些像素是可见的，并且可以继续进行片段着色器。
### 片段着色器
片段着色器的目的是为几何体的每个可见片段着色。
相同的片段着色器将用于几何体的每个可见片段。我们可以使用**uniforms**将数据像颜色一样发送给它——就像顶点着色器一样，或者我们可以将数据从顶点着色器发送到片段着色器。我们将这种类型的数据（从顶点着色器到片段着色器的数据）称为**varying**的。我们稍后再讨论这个问题。
片段着色器中最直接的指令可以是用相同的颜色为所有片段着色。如果我们只设置了属性**attributes** ，我们就得到了[MeshBasicMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial)的等价物**color**。
或者我们可以向着色器发送更多数据，例如灯光位置。然后，我们可以根据脸部在光源前面的距离来为片段着色。如果场景中只有一盏灯，我们将获得[MeshPhongMaterial等效项。](https://threejs.org/docs/index.html#api/en/materials/MeshPhongMaterial)
### 概括

- 顶点着色器在渲染上定位顶点。
- 片段着色器为该几何体的每个可见片段（或像素）着色。
- 片段着色器在顶点着色器之后执行。
- 每个顶点之间变化的数据（如它们的位置）称为属性**attributes** ，只能在顶点着色器中使用。
- 顶点之间不变的数据（例如网格位置或颜色）称为统一数据，可以在顶点着色器和片段着色器中使用。
- 我们可以使用变量将数据从顶点着色器发送到片段着色器。
## 为什么要编写我们自己的着色器
Three.js 材料试图涵盖尽可能多的情况，但它们有局限性。如果我们想打破这些限制，我们必须编写自己的着色器。
也可能是出于性能原因。[像MeshStandardMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial)这样的材质非常复杂，涉及大量代码和计算。如果我们编写自己的着色器，我们可以将功能和计算保持在最低限度。让我们对性能有更多的控制。
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

你应该得到一个错误。
正如我们之前所说，我们需要提供顶点着色器和片段着色器。您可以使用`vertexShader`和`fragmentShader`属性来做到这一点：

```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: '',
    fragmentShader: ''
})
```

该技术的问题在于简单引号内只能写入包含一行的代码——（双引号也是如此）。我们的着色器——尽管一开始代码很简单，但也会因为代码太长而无法写在一行上。
可靠的解决方案是使用反引号（模板字符串）——也称为反引号、尖引号或左引号。大多数现代浏览器都支持它们。这种技术称为[模板文字](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals)，我们可以在其中使用换行符。
写入该字符的键或快捷键取决于您的键盘。以下是有关该主题的线程可以帮助您：[https://superuser.com/questions/254076/how-do-i-type-the-tick-and-backtick-characters-on-windows/879277](https://superuser.com/questions/254076/how-do-i-type-the-tick-and-backtick-characters-on-windows/879277)
找到关键后，用反引号更改简单引号：

```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: ``,
    fragmentShader: ``
})
```

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

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546766458-53cd13e7-1bb9-495b-ad82-527f2abaa86b.png#averageHue=%233b0000&clientId=u4f0bc23a-2308-4&from=paste&id=u067612ba&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u507b1f6e-beb6-4435-bb7d-4a4826a8b83&title=)
你应该获得了一个红色的平面。恭喜，您可能还不明白这里写的内容，但这是您的第一个着色器，也是一段令人难以置信的旅程的良好开端。
## 将着色器分开在不同的文件中
在我们进入代码本身之前，让我们尝试改进我们的工作方式。反引号对于小代码来说是一个很好的解决方案，我们将在以后的着色器课程中使用它，但我们缺少语法着色。一旦我们有多个着色器，里面有很多代码，我们的脚本就会变得难以忍受。拥有良好且舒适的代码书写至关重要。
### 着色器文件
我们将把代码移动到单独的文件中。首先，将顶点着色器代码和片段着色器代码分别移至`/src/shaders/test/vertex.glsl`和`/src/shaders/test/fragment.glsl`中。
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
要安装[vite-plugin-glsl](https://www.npmjs.com/package/vite-plugin-glsl)，请在终端中关闭服务器并运行`npm install vite-plugin-glsl`。
然后转到该`vite.config.js`文件，并在顶部导入glsl自`vite-plugin-glsl`：

```javascript
import glsl from 'vite-plugin-glsl'

// ...
```

向下面的配置对象添加一个`plugins`属性，并向其发送一个包含函数调用的数组`glsl`：

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

这就是向 **Vite** 添加插件所需的全部工作。保存`vite.config.js`，重新启动服务器，着色器应该正确导入。
如果您记录`testVertexShader`和`testFragmentShader`，您将获得纯字符串形式的着色器代码：

```javascript
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'

console.log(testVertexShader)
console.log(testFragmentShader)
```

删除这些日志并使用[RawShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/RawShaderMaterial)中的两个着色器：

```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader
})
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546766422-44382e6b-5f2b-438b-91d2-ac3320068889.png#averageHue=%233b0000&clientId=u4f0bc23a-2308-4&from=paste&id=u1cb186b7&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8bb34a21-ce84-4e93-b303-cded9321b3d&title=)
### 特性
我们在其他材质中涵盖的大多数常见属性（例如`wireframe`、`side`、`transparent`或 `flatShading` ）仍然可用于[RawShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/RawShaderMaterial)：

```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    wireframe: true
})
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546766690-7c6b499f-fafc-4477-beb5-1a6e80b86d1b.png#averageHue=%230a0000&clientId=u4f0bc23a-2308-4&from=paste&id=ub4f74493&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u46af2dfc-c06b-444d-bb80-c5dd60c2ae1&title=)
但是诸如`map`、`alphaMap`、`opacity`、`color`等属性将不再起作用，因为我们需要自己在着色器中编写这些功能。
注释或删除线框线。
## GLSL 
用于编码着色器的语言称为 **GLSL**，代表 **OpenGL** 着色语言。很接近**C**语言。让我们了解其语法的基础知识。
### 记录
没有控制台，因此无法记录值。这是因为代码针对每个顶点和每个片段执行。记录一个值是没有意义的。
### 缩进
缩进不是必需的。您可以根据需要缩进。
### 分号
**任何指令都需要用分号来结束。即使忘记一个分号也可能会导致编译错误，并且整个材料将无法工作。**
### 变量
它是一种类型语言，这意味着我们必须指定变量的类型，并且不能为该变量分配任何其他类型。
要声明变量，我们必须以类型开始，然后是名称（通常采用驼峰式命名法），然后是符号=，然后是值，最后以 结尾;：

```glsl
float fooBar = 0.123;
```

有多种不同的类型。
#### 浮点数
浮点数是小数。它们可以是正数的，也可以是负数的。即使该值被四舍五入，我们也必须始终提供小数位数：

```glsl
float foo = - 0.123;
float bar = 1.0;
```

我们可以进行数学运算，例如**+**、**-**、*****和**/**：

```glsl
float a = 1.0;
float b = 2.0;
float c = a / b;
```

#### 整数
整数的工作方式与浮点数类似，但没有小数`** .**`：

```glsl
int foo = 123;
int bar = - 1;
```

我们还可以进行数学运算：

```glsl
int a = 1;
int b = 2;
int c = a * b;
```

但我们不能在`int`这些操作中混合使用`floatand` ：

```glsl
float a = 1.0;
int b = 2;
float c = a * b;
```

但我们可以即时转换类型：

```glsl
float a = 1.0;
int b = 2;
float c = a * float(b);
```

#### 布尔值
布尔值只是布尔值：

```glsl
bool foo = true;
bool bar = false;
```

### 矢量
矢量或者说向量，可以通过2~4个分量表示一个向量，比如通过`vec3(1,0,0)`表示三维空间中一个沿着x轴正方向的三维方向向量，如果你有高中数学的基础，应该对向量有一定的了解，对于三维坐标的相关几何运算也有一定的概念。

| 关键字 | 数据类型 |
| --- | --- |
| vec2 | 二维向量，具有xy两个分量，分量是浮点数 |
| vec3 | 三维向量 ，具有xyz三个分量，分量是浮点数 |
| vec4 | 四维向量 ，具有xyzw四个分量，分量是浮点数 |
| ivec2 | 二维向量，分量是整型数 |
| ivec3 | 三维向量 ，分量是整型数 |
| ivec4 | 四维向量 ，分量是整型数 |
| bvec2 | 二维向量，分量是布尔值bool |
| bvec3 | 三维向量 ，分量是布尔值bool |
| bvec4 | 四维向量 ，分量是布尔值bool |

#### 矢量2 **vec4**
这就是事情变得有趣的地方。如果我们想用`x`和`y`属性存储像 `2` 个坐标这样的值，我们可以使用  `vec2`：

```glsl
vec2 foo = vec2(1.0, 2.0);
```

空`vec2`会导致错误：

```glsl
vec2 foo = vec2();
```

我们可以在创建后更改这些属性`vec2`：

```glsl
vec2 foo = vec2(0.0  );
foo.x = 1.0;
foo.y = 2.0;
```

执行诸如将 `avec2`与 `float` 相乘之类的操作将同时操作`x`和`y`属性：

```glsl
vec2 foo = vec2(1.0, 2.0);
foo *= 2.0;
```

#### 矢量3 **vec3**
**vec3**与**vec2** 类似，但具有名为 `z` 的第三个属性。当需要 **3D** 坐标时，这是非常方便的：

```glsl
vec3 foo = vec3(0.0);
vec3 bar = vec3(1.0, 2.0, 3.0);
bar.z = 4.0;
```

虽然我们可以使用`x`, `y`,  `z`，但我们也可以使用`r`, `g`,  `b`。这只是语法糖，结果是完全相同的。当我们使用 **vec3** 来存储颜色时非常有效：

```glsl
vec3 purpleColor = vec3(0.0);
purpleColor.r = 0.5;
purpleColor.b = 1.0;
```

**vec3**也可以部分地从 **vec2** 创建：

```glsl
vec2 foo = vec2(1.0, 2.0);
vec3 bar = vec3(foo, 3.0);
```

我们还可以取一部分**vec3**来生成**vec2**：

```glsl
vec3 foo = vec3(1.0, 2.0, 3.0);
vec2 bar = foo.xy;
```

在这里，`bar`将会是一个带有`1.0`, `2.0`的**vec2**值。
这称为`swizzle`，我们还可以以不同的顺序使用这些属性：

```glsl
vec3 foo = vec3(1.0, 2.0, 3.0);
vec2 bar = foo.yx;
```

#### 矢量4 **vec4**
最后，**vec4**它的工作方式就像它的两个前身，但有第四个值，名为**wor** —因为 字母表中没有`z`后面的字母和“alpha”：

```glsl
vec4 foo = vec4(1.0, 2.0, 3.0, 4.0);
vec4 bar = vec4(foo.zw, vec2(5.0, 6.0));
```

还有其他类型的变量，例如`mat2`、`mat3`、`mat4`或`sampler2D`，但我们稍后会看到。
### 函数 Function
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

如果函数不应该返回任何内容，我们将类型设置为**void**：

```glsl
void justDoingStuff()
{
    float a = 1.0;
    float b = 2.0;
}
```

我们可以指定参数，但我们还必须提供它们的类型：

```glsl
float add(float a, float b)
{
    return a + b;
}
```

正如您可以想象的那样，这个功能毫无价值。
### 常量
#### const


着色器语言和C语言、javascript语言一样可以通过关键字`const`声明一个常量。

着色器语言和其它语言一样，声明一个变量，可以重新赋值，如果通过关键字const声明一个常量，顾名思义是常量，在代码中是不可以更改的。
```glsl
// 着色器语言定义一个整形常量
const int count = 10;
// 定义一个浮点数常量10.0
const float count = 10.0;
// 定义一个三维向量vec3常量,表示方向等量
const vec3 direction = vec(1.0,0.5,0.6);
```
错误写法
```glsl
// 着色器语言定义一个整型数常量
const int count=10;
// count是常量，不知改变该常量的值
count=20;
```


### 原生函数
**GLSL**内置了很多经典的函数如也有非常实用的函数如 `sin`, `cos`, `max`, `min`, `pow`, `exp`, `mod`, `clamp`。
除了在计算机图形编程中常用的数学函数之外，还有许多非常实用的函数，如 `cross`、`dot`、`mix`、`step`、`smoothstep`、`length`、`distance`、`reflect`、`refract` 和 `normalize`。
以下是其中一些函数的简要解释：

- `cross`：计算两个向量的叉积。
- `dot`：计算两个向量的点积。
- `mix`：根据第三个值，在两个值或向量之间执行线性插值。
- `step`：比较两个值，并根据值是否大于某个阈值返回 0.0 或 1.0。
- `smoothstep`：根据第三个值，在两个值之间执行平滑的埃尔米特插值。
- `length`：计算向量的长度（大小）。
- `distance`：计算两个点（向量）之间的欧几里德距离。
- `reflect`：通过给定的法线计算入射向量的反射方向。
- `refract`：通过给定的法线和折射率计算入射向量的折射方向。
- `normalize`：返回一个标准化后的向量，即具有相同方向但单位长度的向量。

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
## 了解顶点着色器
现在我们已经了解了 GLSL 语法，让我们尝试了解着色器中的内容。
请记住，顶点着色器的目的是将几何体的每个顶点定位在渲染 2D 空间上。换句话说，顶点着色器会将 3D 顶点坐标转换为 2D 画布坐标。
### 主功能

```glsl
void main()
{
}
```

该main函数将被自动调用。正如您所看到的，它不返回任何内容 ( **void**)。
### **gl_Position**
该**gl_Position**变量已经存在。我们需要分配它。该变量将包含顶点在屏幕上的位置。函数中指令的目标**main**是正确设置该变量。
在本指令的最后，我们得到一个 **vec4矢量** 这意味着我们可以直接在**gl_Position**变量上使用它的**x**、**y**、**z**和**w**属性：

```glsl
void main()
{
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    gl_Position.x += 0.5;
    gl_Position.y += 0.5;
}
```
平面应该在右上角移动。不过要小心; 我们并没有像在Three.js 中那样真正在 3D 空间中移动平面。我们确实在二维空间上移动了投影平面的**position**。
把它想象成你在纸上画的图画。在这幅图中，您尊重了消失点的透视。然后，将整个图片移动到桌面的右上角。绘图内部的视角没有改变。
你可能想知道为什么在**gl_Position**中需要4个值来定位顶点，而它的最终目标是在2D空间中定位顶点。实际上，这是因为坐标不是在精确的2D空间中，它们是在我们称之为裁剪空间中，需要4个维度。
裁剪空间是一个沿着三个方向（**x**、**y**和**z**）范围为**-1**到**+1**的空间。就像将所有物体放置在一个3D的盒子中。超出这个范围的任何物体都会被"裁剪"并消失。第四个值（**w**）负责透视效果。
幸运的是，所有这些过程都是自动完成的，作为初学者，我们不需要精通所有细节，只需了解基本原理即可。
那么我们到底要发送给**gl_Position**的是什么呢？
### Position attributes
首先，我们使用以下命令检索顶点**position**：

```glsl
attribute vec3 position;
```

请记住，相同的代码适用于几何体的每个顶点。属性是顶点之间唯一会改变的变量。相同的顶点着色器将应用于每个顶点，而位置属性将包含该特定顶点的`x`、`y`和`z`坐标。
然后，我们将这个`vec3`转换为`vec4`：

```glsl
gl_Position = /* ... */ vec4(position, 1.0);
```

这是因为之后的矩阵和gl_Position需要使用vec4，正如我们之前所看到的那样。
### 矩阵统一变量（Uniforms）
每个矩阵都会进行变换，position直到我们得到最终的剪辑空间坐标。
我们的代码中有 3 个矩阵，因为它们的值对于几何体的所有顶点都是相同的，所以我们使用uniforms来检索它们。

```glsl
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
```

每个矩阵都会做一部分变换：

- 将应用与[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)modelMatrix相关的所有变换。如果我们缩放、旋转或移动[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)，这些变换将包含在 中并应用于。modelMatrixposition
- 将viewMatrix应用相对于相机的变换。如果我们将相机向左旋转，顶点应该在右侧。[如果我们沿着Mesh](https://threejs.org/docs/#api/en/objects/Mesh)方向移动相机，顶点应该会变大，等等。
- 最终会将projectionMatrix我们的坐标转换为最终的剪辑空间坐标。

如果您想了解有关这些矩阵和坐标的更多信息，这里有一篇好文章： https: [//learnopengl.com/Getting-started/Cooperative-Systems](https://learnopengl.com/Getting-started/Coordinate-Systems)。
要应用矩阵，我们将其相乘。如果要将 a 应用于mat4变量，则该变量必须是 a vec4。我们还可以将矩阵与其他矩阵相乘：

```glsl
gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
```

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

这些更改具有完全相同的结果，但我们现在只需调整 的值即可移动整个模型modelPosition：

```glsl
void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += 1.0;

    // ...
}
```

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
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546767517-3a5b6cb9-b140-4825-b584-eddbe79df5c6.png#averageHue=%233d0000&clientId=u4f0bc23a-2308-4&from=paste&id=WS74V&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud41684fc-5d14-4c60-a80a-23f93560c15&title=)
我们通过使用 sin(...) 函数来利用 x 坐标改变了 z 值。祝你在 Three.js 的内置材质中获得这样的结果好运。
## 了解片段着色器
片段着色器代码将应用于几何体的每个可见片段。这就是为什么片段着色器出现在顶点着色器之后。
该代码比顶点着色器更易于管理。
### 主功能
我们再次面对这个main函数：

```glsl
void main()
{
}
```

### precision
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
`gl_FragColor`与`gl_Position`类似，但颜色不同。它已经被声明了，我们需要在`main`函数中对其进行赋值。
它的`vec4`前三个值是红色、绿色和蓝色通道` ( r, g, b)`，第四个值是 `alpha`` ( a)`：

```glsl
gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546768503-86cf359b-409a-4400-b30a-bf0491008ff1.png#averageHue=%231e003d&clientId=u4f0bc23a-2308-4&from=paste&id=u69a65d97&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ube6b4c84-02ed-43d0-ae88-ec1b574fc1b&title=)
这段代码将导致整个几何体呈紫色。
`gl_FragColor`的每个属性范围是`0.0`到`1.0`。我们可以超过这些值而不会出错，但是这没有意义。
如果我们想设置一个小于`1.0`的透明度，我们还需要在`RawShaderMaterial`中设置`transparent`属性为`true`。

```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    transparent: true
})
```

## 属性Attributes
属性是在每个顶点之间变化的值。我们已经有一个名为`position`的属性，其中包含`vec3`每个顶点的坐标。
我们可以像在几何课程中那样将自定义属性直接添加到 `BufferGeometry` 中[。](https://threejs.org/docs/#api/en/core/BufferGeometry)
在这节课中，我们将为每个顶点添加一个随机值，并根据该值在`z`轴上移动该顶点。
让我们回到`JavaScript`代码，并在创建几何体后立即创建一个正确大小的`Float32Array`。要知道几何体中有多少个顶点，我们可以使用已经存在的`position`属性：

 

```javascript
const count = geometry.attributes.position.count
const randoms = new Float32Array(count)
```

然后我们用随机值填充这个数组：

```javascript
for(let i = 0; i < count; i++)
{
    randoms[i] = Math.random()
}
```

[最后，我们在BufferAttribute](https://threejs.org/docs/#api/en/core/BufferAttribute)中使用该数组并将其添加到我们的几何属性中：

```javascript
geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
```

`setAttribute(...)`的第一个参数是属性的名称。这就是我们在着色器中使用的名称。我们可以选择任何名称，但最好以"**a**"前缀表示"**attribute**"。
`BufferAttribute`的第一个参数是**数据数组**，第二个参数是**一个属性由多少个值组成**。如果我们要发送一个`position`属性，我们将使用`3`，因为`position`由3个值（`x`、`y`和`z`）组成。但在这里，每个顶点只有一个随机值，所以我们使用`1`。
现在我们可以在顶点着色器中检索这个属性，并使用它来移动顶点：

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

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546768333-6d063c7c-f1e4-42ca-897f-a914fa93e16c.png#averageHue=%23200041&clientId=u4f0bc23a-2308-4&from=paste&id=u5ecb6baf&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u22627235-cdf8-436d-8117-a375a635bc0&title=)
现在你得到了一个由随机尖峰组成的平面。
## varyings
现在我们还想使用aRandom属性对片段进行着色。
不幸的是，我们不能直接在片段着色器中使用属性。
幸运的是，有一种从顶点着色器向片段着色器发送数据的方法，被称为`varying`变量。
我们需要在顶点和片段着色器中都进行操作。
在顶点着色器中，我们需要在主函数之前创建`varying`变量。我们将命名我们的`varying`变量为`vRandom`：

```glsl
// ...

varying float vRandom;

void main()
{
    // ...
```

您可以根据需要调用您的变量，但我建议添加前缀 `v`以轻松区分它们。
然后，我们更新函数中的变化值`main`：

```glsl
varying float vRandom;

void main()
{
    // ...

    vRandom = aRandom;
}
```

最后，我们使用相同的声明在片段着色器中获得变化的值，并在`main`函数中按照我们想要的方式使用它：

```glsl
precision mediump float;

varying float vRandom;

void main()
{
    gl_FragColor = vec4(0.5, vRandom, 1.0, 1.0);
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546768541-0f4464fc-2eee-4ec6-b9fc-38fea30d530c.png#averageHue=%23202141&clientId=u4f0bc23a-2308-4&from=paste&id=uc5820fc7&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u094098cd-7574-4580-8019-08181f2c1fe&title=)
现在你获得了一个具有彩色尖峰的引人注目的形状。
`varying`变量的一个有趣之处是，顶点之间的值会进行插值。如果GPU绘制的片段恰好位于两个顶点之间——一个`varying`值为`1.0`，另一个`varying`值为`0.0`——片段的值将会是`0.5`。
让我们移除或注释掉高度部分和`varying`变量，这样我们就可以回到原来的紫色平面上。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546770067-f45df7d0-930a-49c9-a6f7-5f9a52f2ac6e.png#averageHue=%231d003b&clientId=u4f0bc23a-2308-4&from=paste&id=ua22dbe99&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u26e2800d-fcaa-4d08-bea2-1f31a8c97f3&title=)
稍后我们将使用属性。
## 制服 Uniform
`Uniform` 是一种将数据从 `JavaScript` 发送到着色器的方法。
如果我们想要使用相同的着色器但具有不同的参数，那么这可能很有价值，而且这也是参数在体验过程中可以更改的场合。
我们可以将制服与顶点着色器和片段着色器一起使用，并且每个顶点和每个片段的数据都相同。我们的代码中已经有了带有`projectionMatrix`, `viewMatrix`, 和`modelMatrix`的`Uniform`，但我们没有创建这些。Three.js 做到了。
让我们来制作我们自己的制服。
要向我们的 `material` 中添加制服`uniforms`，请使用该`uniforms`属性。我们将制作平面波并且我们想要控制波的频率：

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

在这里，我们选择的制服`**uniforms**`的名称是`frequency`。虽然这不是强制性的，但使用字母`u`作为前缀以将“制服”与其他数据区分开来被认为是一种很好的做法。
将制服名称更改为`uFrequency`：

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

如果您正在查看其他教程或示例，您可能会看到制服是这样声明的`uFrequency: { value: 10, type: 'float' }`。曾经有一段时间我们必须指定类型，但现在它已被弃用。
我们现在可以检索着色器代码中的值并在我们的`main`函数中使用它：

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

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546769722-25998b4c-26f3-4c49-a1f2-42cb3326ac9a.png#averageHue=%231e003d&clientId=u4f0bc23a-2308-4&from=paste&id=ube1982fb&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9867b49b-a4ae-4537-8e98-b91c03fbcfb&title=)
结果是相同的，但我们现在可以通过 `JavaScript` 控制频率。
让我们将频率更改为 `avec2`矢量2 以控制水平和垂直的波。我们简单地使用 Three.js [Vector2](https://threejs.org/docs/#api/en/math/Vector2)：

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

在我们的着色器中，我们将`float`更改为`vec2`，并通过使用`y`轴对`z`轴进行位移：

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

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546770126-9b162bd6-fa7e-4d02-8608-10be6bfdf9a2.png#averageHue=%231f003e&clientId=u4f0bc23a-2308-4&from=paste&id=u578077e6&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u91f38caa-e716-4d1c-942d-46a6fb6b489&title=)
花点时间做这件事。很容易犯错误。
因为这些值现在是在 `JavaScript` 中控制的，所以我们可以将它们添加到我们的` Dat.GUI `中：

```javascript
gui.add(material.uniforms.uFrequency.value, 'x').min(0).max(20).step(0.01).name('frequencyX')
gui.add(material.uniforms.uFrequency.value, 'y').min(0).max(20).step(0.01).name('frequencyY')
```
![011.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1692339155395-f23cf1da-0631-4f5b-9bd4-2593fa812aa6.gif#averageHue=%23363532&clientId=u36ffa0b9-672b-4&from=drop&id=ub906d046&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=476695&status=done&style=none&taskId=u0298e348-f430-4ff4-9c84-d4f53630e4a&title=)

让我们添加一个新的`uniform`变量来模拟平面在风中摇动的效果。我们通过使用`uniform`变量将一个时间值传递给着色器，并在`sin(...)`函数中使用这个值。首先，更新材质以添加`uTime`、`uniform`变量：

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

然后，在函数tick中更新这个`uTime`制服`uniform`。为此，请使用[Clock](https://threejs.org/docs/#api/en/core/Clock)中的`getElapsedTime`函数来了解过去了多少时间：

```javascript
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update material
    material.uniforms.uTime.value = elapsedTime

    // ...
}
```

最后，我们在顶点着色器中获得统一值，并在两个`sin(...)`函数中使用它：

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
![012.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1692339191193-e306fa16-4426-4bbd-a1db-583c3c8455f0.gif#averageHue=%23201e1c&clientId=u36ffa0b9-672b-4&from=drop&id=uf16af149&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=525896&status=done&style=none&taskId=u6c60e727-378c-4fd8-b37b-35ae11d4bb4&title=)
你应该看到飘扬在风中的旗帜。
通过在`uTime`前面使用`-`号而不是`+`号，让我们改变方向：

```glsl
modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
```
![013.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1692339343808-21c7065e-51c3-4a1f-80b4-b21d770b887f.gif#averageHue=%232b2927&clientId=u36ffa0b9-672b-4&from=drop&id=u9804359f&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=441436&status=done&style=none&taskId=u5eddb922-2d13-45b1-bccc-28a17e1e39f&title=)

对于`uTime`，请小心处理：如果我们使用像`Date.now()`这样的原生`JavaScript`解决方案，它将不起作用。这是因为`Date.now()`返回自1970年1月1日以来过去的毫秒数，而这个值对于着色器来说太大了。简而言之，我们要记住不能发送过大或过小的`uniform`值。
不要忘记这仍然是一个平面，我们可以像以前一样对`Mesh`进行变换。让我们给我们的平面一个旗帜的形状。
我们可以通过在着色器中将`modelPosition.y`的值进行乘法运算来实现，但不要忘记你仍然可以直接在网格上更改位置、缩放和旋转：

```javascript
const mesh = new THREE.Mesh(geometry, material)
mesh.scale.y = 2 / 3
scene.add(mesh)
```
![014.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1692339470881-c9254bac-bd0e-4721-a65b-ec8be01553fb.gif#averageHue=%23000000&clientId=u36ffa0b9-672b-4&from=drop&id=u420faced&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=444699&status=done&style=none&taskId=u6abb5576-5eb8-47ff-a518-7d5c77ed0d0&title=)
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

然后，在我们的片段着色器中，我们获取这个值，并在gl_FragColor vec4中使用它：

```glsl
precision mediump float;

uniform vec3 uColor;

void main()
{
    gl_FragColor = vec4(uColor, 1.0);
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546771109-4a1583dc-61c9-4d79-903b-e9cba262b22d.png#averageHue=%23261900&clientId=u4f0bc23a-2308-4&from=paste&id=u79e1d805&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u2b4957fd-ca27-4343-951c-c96841ac434&title=)
旗帜现在应该是橙色的。
## 纹理
纹理有点难，但我们几乎拥有了我们需要的一切。
首先，我们必须像之前的课程中那样加载纹理。我们在`/static/textures/`文件夹中已经有了一个标志纹理，我们可以使用`textureLoaderJavaScript starter` 中已经可用的纹理：

```javascript
const flagTexture = textureLoader.load('/textures/flag-french.jpg')
```

然后我们可以将纹理作为制服发送。我们可以称之为`uTexture`：

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

虽然把`uTime`值立即发送到片段着色器中很诱人，但我们会遇到问题。为了从纹理中获取片段颜色并在片段着色器中应用它们，我们必须使用`texture2D(...)`函数。`texture2D(...)`的第一个参数是纹理（很简单，就是我们的`uTexture`），但第二个参数是在纹理上选择颜色的坐标，而我们还没有这些坐标。
这个信息应该听起来很熟悉。我们正在寻找坐标，这些坐标应该帮助我们在几何体上投射纹理。我们谈论的是`UV`坐标。
`PlaneGeometry`会自动生成这些坐标，我们可以通过记录`geometry.attributes.uv`来查看这一点。

```javascript
console.log(geometry.attributes.uv)
```

因为它是一个内置的属性，所以我们直接可以在顶点着色器中检索它：

```glsl
attribute vec2 uv;
```

尽管如此，我们仍然需要片段着色器中的这些坐标。要将数据从顶点着色器发送到片段着色器，我们需要创建一个`varying`. 我们将在函数`vUv`中调用该变量并更新其值`main`：

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

现在我们可以在片段着色器中获取变量`vUv`，获取统一变量`uTexture`，并最终使用`texture2D(...)`获取片段颜色：

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

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546771266-84255cfc-9dc5-44de-ab3b-c467bfa92188.png#averageHue=%230f0f0f&clientId=u4f0bc23a-2308-4&from=paste&id=u7448c86c&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ufe06ac32-1bcd-4284-b778-9d3f9e9fba6&title=)
对于`texture2D(...)`函数的输出是一个`vec4`，因为它包含了`r`、`g`、`b`和`a`通道，即使我们的纹理没有`alpha`通道的变化。
![tutieshi_640x400_6s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1692339497688-057b9597-6914-45b5-b762-5879eb7a3b63.gif#averageHue=%23020202&clientId=u36ffa0b9-672b-4&from=drop&id=ucd837ebc&originHeight=400&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=761278&status=done&style=none&taskId=u242d5a4f-5688-4560-b2be-bca91962826&title=)
你应该能够得到一个漂亮的旗帜效果。
再次强调，请耐心处理。在这里犯错误是很容易的。
## 颜色变化Color variations 
我们的旗帜颜色变化不大。如果有阴影，让亮度有所变化会很好。
我们要使用的技术不是物理上准确的，但应该能解决问题。
首先，在顶点着色器中，我们将把风的高度存储在一个变量中：

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

然后，我们通过使用一个`varying`将高度值传递到片段着色器中：

```glsl
// ...
varying float vElevation;

void main()
{
    // ...

    vElevation = elevation;
}
```

最后，我们检索片段着色器中的`vElevation`变量，并使用它来更改`textureColor`的`r`、`g`和`b`属性：

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

您应该看到旗帜上的亮度变化，就像我们有光和阴影一样。这是一种廉价的技术，但很有效。
## 着色器材质 
到目前为止，我们已经使用了[RawShaderMaterial](https://threejs.org/docs/#api/en/materials/RawShaderMaterial)。`ShaderMaterial`[的](https://threejs.org/docs/#api/en/materials/ShaderMaterial)工作原理与此相同，但在着色器代码中预先构建了制服和属性。精度也将自动设置。
要使用它，只需将[RawShaderMaterial](https://threejs.org/docs/#api/en/materials/RawShaderMaterial)替换为[ShaderMaterial](https://threejs.org/docs/#api/en/materials/ShaderMaterial)：

```javascript
const material = new THREE.ShaderMaterial({
    // ...
```

然后，在两个着色器中删除以下的`uniform`和`attribute`以及`precision`：

- uniform mat4 projectionMatrix;
- uniform mat4 viewMatrix;
- uniform mat4 modelMatrix;
- attribute vec3 position;
- attribute vec2 uv;
- precision mediump float;

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

着色器应该像以前一样工作，因为[ShaderMaterial](https://threejs.org/docs/#api/en/materials/ShaderMaterial)会自动添加这些。
## 调试Debugging 
调试着色器的确有一定困难。由于GPU执行着色器代码并对每个顶点和片段进行处理，所以我们无法像在JavaScript中那样记录数据。
幸运的是，Three.js在编译过程中会很好地传递错误信息给我们，这对我们来说是个好消息。如果出现编译错误，你可以查看控制台输出以获取更多信息。

## 查找错误Finding the error


如果我们忘记了一个分号，Three.js会记录完整的着色器代码，并告诉我们发生错误的行数，并提供一个简短的描述，例如`0:71: 'vec4' : syntax error。`
这个消息意味着错误发生在第71行，但问题可能出现在前一行。请耐心阅读错误消息，你将找到出错的地方。遵循错误消息指示的位置和描述，逐步检查代码，你就能找到问题所在。

## 读取着色器
记录整个着色器代码也是查看在使用 `ShaderMaterial` 时 Three.js 在着色器前面添加的内容的绝佳[方法](https://threejs.org/docs/#api/en/materials/ShaderMaterial)。
## 测试值
另一种调试数值的方法是在`gl_FragColor`中使用它们。虽然这样做不能提供精确的结果，因为我们只能看到颜色的变化，但有时候这已经足够了。
如果这些数值在顶点着色器中，我们可以使用一个`varying`来将其传递到片段着色器中。
假设我们想查看`uv`的值，我们可以使用一个`varying`（例如`vUv`）将其传递到片段着色器，并在`gl_FragColor`中使用它：

```glsl
gl_FragColor = vec4(vUv, 1.0, 1.0);
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688546771293-9fdfa880-a1c1-4d09-a0d4-5a97ac066c72.png#averageHue=%23000000&clientId=u4f0bc23a-2308-4&from=paste&id=u70da527b&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u53962d32-5a9c-41a2-9f2b-bff96185b2f&title=)
## 更进一步 
一旦我们了解了着色器的基础知识，接下来就是练习了。您的第一个着色器将花费无数个小时，但您将学到经常使用的技术。
在接下来的课程中，我们将练习这些技术，甚至学习如何在着色器中绘制形状，但如果您想进一步了解，这里有一些链接：

- 着色器之书： https: [//thebookofshaders.com/](https://thebookofshaders.com/)
- ShaderToy： https: [//www.shadertoy.com/](https://www.shadertoy.com/)
- 代码艺术 YouTube 频道：[https://www.youtube.com/channel/UCcAlTqd9zID6aNX3TzwxJXg](https://www.youtube.com/channel/UCcAlTqd9zID6aNX3TzwxJXg)
- 刘易斯·莱普顿 YouTube 频道：[https://www.youtube.com/channel/UC8Wzk_R1GoPkPqLo-obU_kQ](https://www.youtube.com/channel/UC8Wzk_R1GoPkPqLo-obU_kQ)
## 
# 29. Shader patterns 着色器图案 

## 介绍
通常，在创建着色器时，我们需要绘制特定的图案，如星星、圆形、光透镜、波浪等。
它可以帮助有效地查看几何体上的这些图案，也可以移动顶点，就像我们在上一课中对标志所做的那样。
我们可以使用纹理，但绘制形状可以给我们更多的控制权；我们可以对形状参数进行动画处理，并且无需加载纹理。
它比使用 canvas 等其他 API 进行绘图要复杂得多，因为每个片段的代码都是相同的，而我们所拥有的只是坐标和数学技能。
是的，这节课会有一些数学。对于某些人来说，这是最令人沮丧的部分之一，但不要害怕；即使你数学成绩不好，你也会找到解决办法。
在本课中，我们将尝试在平面上绘制各种图案。我们会非常彻底地开始，随着时间的推移，事情会变得更具挑战性。这是发现经典技术和使用内置函数的绝佳机会。
对于每种模式，我们首先研究结果；然后，我们尝试重现它。如果您想做得更好，请暂停每个模式的课程并尝试自己做。即使你失败了，如果你自己尝试的话，解决方案也会更有意义。
## 设置
目前，场景中只有一架飞机，其[ShaderMaterial](https://threejs.org/docs/#api/en/materials/ShaderMaterial)作为[PlaneGeometry](https://threejs.org/docs/index.html#api/en/geometries/PlaneGeometry)。提醒一下，[ShaderMaterial与](https://threejs.org/docs/#api/en/materials/ShaderMaterial)[RawShaderMaterial](https://threejs.org/docs/#api/en/materials/RawShaderMaterial)类似，在着色器前面添加了一些代码，例如导入矩阵、导入某些属性或设置精度。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341115384-c82d3ef7-5fd9-4f31-b9ce-64db6847cf90.png#averageHue=%231d003b&clientId=uac41ddf3-6b83-4&from=paste&id=u2ff43ea5&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u1dcf34fd-51c0-4778-b416-9072618039e&title=)
## 将 UV 坐标发送到片段
因为我们将绘制平面图案，所以我们的大部分代码将在片段着色器中。但首先，我们需要将 UV 坐标从顶点着色器发送到片段着色器。
要检索uv顶点着色器中的属性，我们应该编写如下内容：
`attribute vec2 uv;`
**但由于我们使用的是**[**ShaderMaterial**](https://threejs.org/docs/#api/en/materials/ShaderMaterial)**，因此该代码已预先添加到顶点着色器中。**
为了将这个值从顶点着色器传递到片段着色器，我们需要一个`varying`变量。我们将把它命名为`vUv`，并用`uv`赋值给它：

```glsl
varying vec2 vUv;

void main()
{
    // ...

    vUv = uv;
}
```
在片段着色器中，我们可以`vUv`使用相同的声明检索此变化：
```glsl
varying vec2 vUv;

void main()
{
    // ...
}
```
现在我们在片段着色器中可以通过`vUv`变量访问到`UV`坐标。**这些值的范围是从左下角（0, 0）到右上角（1, 1）。**
## 图案1
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341115400-85043dff-edce-4197-98a2-fa3fed2316f5.png#averageHue=%23272d2c&clientId=uac41ddf3-6b83-4&from=paste&id=u1499f3de&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u1358c86a-a912-4255-b511-c7e7d361125&title=)
这个可爱的颜色图案是最容易实现的。我们只需要在`gl_FragColor`中使用`vUv`，并将蓝色分量设为`1.0`：

```glsl
varying vec2 vUv;

void main()
{
    gl_FragColor = vec4(vUv, 1.0, 1.0);
}
```
## 图案2
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341115353-61258d4e-4c72-4e55-8772-c0c56cd236ee.png#averageHue=%234a2d10&clientId=uac41ddf3-6b83-4&from=paste&id=u10f6c899&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3488e9c4-00f4-4172-a759-d4cd374b912&title=)
这是完全相同的模式，但蓝色值为`0.0`：
```glsl
varying vec2 vUv;

void main()
{
    gl_FragColor = vec4(vUv, 0.0, 1.0);
}
```
## 图案3
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341115618-c19a6598-3e10-446a-b9e3-349f6d907d1b.png#averageHue=%234d4d4d&clientId=uac41ddf3-6b83-4&from=paste&id=u19a00f1e&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uba2ce75a-6fb1-4f3d-a60c-ee74dead3a8&title=)
这里的情况变得更有趣了。为了实现这个渐变效果，我们只需要使用`vUv`的`x`属性，并将其分别应用到`gl_FragColor`中的前三个分量上：

```glsl
varying vec2 vUv;

void main()
{
    gl_FragColor = vec4(vUv.x, vUv.x, vUv.x, 1.0);
}
```
从现在开始，我们将绘制像这样的黑白图案。我们可以创建一个名为`strength`的浮点变量，而不是分别将值发送到r、g和b通道中：
P
```glsl
varying vec2 vUv;

void main()
{
    float strength = vUv.x;

    gl_FragColor = vec4(vec3(strength), 1.0);
}
```
我们现在将重点关注`strength`变量并尝试绘制以下模式。
您可以发表评论，以便稍后返回，而不是替换以前的模式。
## 图案4
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341115470-5ffd8bb4-4a9b-4b0f-a89e-36842c5896bd.png#averageHue=%233e3e3e&clientId=uac41ddf3-6b83-4&from=paste&id=u775c7375&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3c87cc10-0fd1-40ee-9675-78f7e092f23&title=)
该图案完全相同，但在`y`轴上：
```glsl
float strength = vUv.y;
```
## 图案5
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341119994-f54a7cfb-7794-4233-823a-0782caa6495c.png#averageHue=%234d4d4d&clientId=uac41ddf3-6b83-4&from=paste&id=u32c54a25&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u229dda71-4255-4d90-98c0-f8b9c4a50a1&title=)
此模式完全相同，但我们使用以下方法`1.0 - ...`反转值：
```glsl
float strength = 1.0 - vUv.y;
```
## 图案6
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341119981-ce869b00-d3ee-41a6-8c8a-3d4daab56f2d.png#averageHue=%237c7c7c&clientId=uac41ddf3-6b83-4&from=paste&id=u56ba4972&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u48f9d5aa-ea92-4aab-a4b5-edc7011a615&title=)
要像这样压缩黑白色的梯度，我们只需乘以该值即可。`strength`会快速跳转到1，但我们无法显示比白色更亮的颜色，因此渐变的其余部分保持白色：
```glsl
float strength = vUv.y * 10.0;
```
## 图案7
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341119567-65422ef4-bdd9-49b3-854c-54c88e4d4111.png#averageHue=%23454545&clientId=uac41ddf3-6b83-4&from=paste&id=u5d43260d&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ub0a8e33b-3bcc-42fb-8122-5e3754f2f50&title=)
现在我们正在说话。为了重复梯度，我们取一下模数就行。模运算求第一个数除以第二个数后的余数。

- 0.5模1.0将是0.5
- 0.8模1.0将是0.8
- 1.2模1.0将是0.2
- 1.7模1.0将是0.7
- 2.0模1.0将是0.0
- 2.4模1.0将是0.4

就像第一个数字在达到第二个数字时返回到`0`一样。
在许多编程语言中，我们可以使用%运算符来进行模运算，但在GLSL中我们必须使用`mod(...)`函数。
```glsl
float strength = mod(vUv.y * 10.0, 1.0);
```
## 图案8
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341120190-d7cca8a9-f6c7-4c4e-ac1e-e6167817a705.png#averageHue=%23414141&clientId=uac41ddf3-6b83-4&from=paste&id=u92a968e5&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=udfcfd14c-d367-4d37-a103-a2e58a9e921&title=)
这个模式似乎是基于之前的模式，但不同的是这里只有`0.0`或`1.0`。
我们可以使用`if`语句来实现这个效果，因为在**GLSL**中条件语句是可以工作的，但出于性能原因，我建议避免使用条件语句。
我们可以使用`step(...)`函数来实现。我们将一个边界值作为第一个参数，将一个数字作为第二个参数。如果数字小于边界值，我们得到`0.0`。如果数字大于边界值，我们得到`1.0`：
```glsl
float strength = mod(vUv.y * 10.0, 1.0);
strength = step(0.5, strength);
```
正如你所看到的，在重新赋值 `strength` 的同时，我们在另一行中使用了 `step(...)` 函数。这不会对性能造成任何不利影响。你会看到许多着色器开发者使用尽可能少的变量和几乎没有注释来编写庞大的代码行，但这仅仅是因为他们知道自己在做什么。
你可以按照自己的意愿去做，特别是如果你是一个初学者。
## 图案9
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341119952-a41b5eef-0cfb-4ce4-bf4e-9ce7ba67339d.png#averageHue=%231a1a1a&clientId=uac41ddf3-6b83-4&from=paste&id=uef7eb4a3&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u303163d5-ea4a-45ce-8ff1-9dce8791b8f&title=)
此模式与前一种模式相同，但 `step(...)`的边缘值更高：
```glsl
float strength = mod(vUv.y * 10.0, 1.0);
strength = step(0.8, strength);
```
## 图案10 
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341121938-356c54cd-a8ef-440e-937c-e58de0b418d3.png#averageHue=%231b1b1b&clientId=uac41ddf3-6b83-4&from=paste&id=u91e7fefb&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ueadd0984-e950-48f7-8462-1b451dd7a55&title=)
这种模式与前一种模式相同，但我们`vUv`使用的是`xaxis` 而不是`yaxis`：
```glsl
float strength = mod(vUv.x * 10.0, 1.0);
strength = step(0.8, strength);
```
## 图案11
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341122092-42c47400-a294-4d73-9eaa-553061c660d8.png#averageHue=%23303030&clientId=uac41ddf3-6b83-4&from=paste&id=uea83cb81&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9e7d0d75-7e56-40c8-be77-2c74b939e89&title=)
![E{C7_[6[[4WSAB8D5@E_83P.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692803988585-06214ee4-2961-47cc-a7d4-f9b88c393061.png#averageHue=%231d1b1b&clientId=ued8f0a53-c50f-4&from=paste&height=862&id=PZve8&originHeight=862&originWidth=1336&originalType=binary&ratio=1&rotation=0&showTitle=false&size=47465&status=done&style=none&taskId=u98093b0a-6f46-4c1a-92e8-978376a4d99&title=&width=1336)
我们也可以将它们结合起来。在这里，我们必须将`x`轴的结果与轴上的结果相加`y`：
```glsl
float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
strength += step(0.8, mod(vUv.y * 10.0, 1.0));
```
## 图案12
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341122312-82323ec3-6099-4c9c-a272-84346d70ab12.png#averageHue=%23050505&clientId=uac41ddf3-6b83-4&from=paste&id=u5bd57781&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u443b7eb9-ef9f-45f6-a831-86ebb8e6090&title=)
该模式使用相同的原理，但使用乘法。我们只能看到它们的交集：
```glsl
float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
```

## 图案13
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341122327-bf79809b-e5dd-43b4-8e4a-ca18c38a844a.png#averageHue=%230f0f0f&clientId=uac41ddf3-6b83-4&from=paste&id=uc2d79e57&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u20f38a99-43fa-4c05-ad4d-3f73926aaa0&title=)
此图案与之前相同，但我们调整了轴上的台阶边缘x：
```glsl
float strength = step(0.4, mod(vUv.x * 10.0, 1.0));
strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
```
## 图案14
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341122280-b6d8f525-802e-4426-9ecc-14583af3ff49.png#averageHue=%231a1a1a&clientId=uac41ddf3-6b83-4&from=paste&id=u70e9bfcd&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u781788aa-ecfa-44ee-ba34-a82949a5ec7&title=)
该模式是之前模式的组合。我们在轴上创建条形`x`并添加轴的条形`y`：
```glsl
float strength = step(0.4, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
strength += step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0, 1.0));
```
与任何语言一样，当代码变得难以忍受时，最好进行一些重构：
```glsl
float barX = step(0.4, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0, 1.0));
float strength = barX + barY;
```
## 图案15
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341124818-bee24e2e-a4e9-498f-932c-304a47a8b7fd.png#averageHue=%231a1a1a&clientId=uac41ddf3-6b83-4&from=paste&id=uac19e77d&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u7a6d57db-7426-410c-949e-6592a16f48d&title=)
此模式与之前相同，但我们在条形x和y轴上应用了一个小的偏移：
```glsl
float barX = step(0.4, mod(vUv.x * 10.0 - 0.2, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0 - 0.2, 1.0));
float strength = barX + barY;
```
在这种情况下，像我们这样的初学者会坚持调整这些值，直到它起作用为止。这没有问题，一旦找到解决方案，它可能就会有意义。
## 图案16
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341124978-a967d9e4-acd8-48dd-ad7e-ef8be7376d15.png#averageHue=%23252525&clientId=uac41ddf3-6b83-4&from=paste&id=u25c8b15a&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ufd7ac104-d140-4bce-a334-7772e3cb9a0&title=)
让我们用另一种方法来处理这个问题。为了得到这个结果，我们首先需要将 `vUv.x` 偏移，使其范围从 `-0.5` 到 `0.5`。然后我们需要将这个值始终保持为正数，这样它就会从 `0.5` 变为 `0.0`，然后再变为 `0.5`。为此，我们可以使用 `abs(...) `函数：
```glsl
float strength = abs(vUv.x - 0.5);
```
## 图案17
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341124853-2cc2b003-59a6-4a5c-b83c-b75cfa4ae1ff.png#averageHue=%23181818&clientId=uac41ddf3-6b83-4&from=paste&id=u621ffe11&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u86726242-c5af-4b07-bf15-7561125ecd9&title=)
这种模式看起来像是前一种模式与轴上的变化的组合y。这不是普通的组合。x这里你可以看到的是轴上的图案和轴上的图案之间的最小值y。为此，我们使用以下`min(...)`函数：
```glsl
float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
```
## 图案18
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341124933-d39e34ae-b280-4d3b-b829-98baed04a5ab.png#averageHue=%23313131&clientId=uac41ddf3-6b83-4&from=paste&id=u18931e98&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u5d8789c1-184a-4def-86a5-282027cbef4&title=)
与上面相同，但具有以下`max(...)`功能：
```glsl
float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
```
## 图案19 
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341124995-76143ab8-01e5-4ade-8758-b8940f2f2bf4.png#averageHue=%23717171&clientId=uac41ddf3-6b83-4&from=paste&id=uf72552a2&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ua74167dc-d326-4044-a393-36a1935987e&title=)
对于此模式，我们只需step(...)对先前的值应用 a：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692974758566-ed1bd2c0-b8ad-472f-9f27-5cb5a42faca9.png#averageHue=%233e3e3e&clientId=u0cdbfc35-d1f6-4&from=paste&height=889&id=u328de8f5&originHeight=1778&originWidth=2326&originalType=binary&ratio=2&rotation=0&showTitle=false&size=121116&status=done&style=none&taskId=ude545481-448f-4162-97a9-114fad64cb5&title=&width=1163)
```glsl
float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
```
## 图案20
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341127555-66295736-ccb8-4842-bf97-19ba748eca8d.png#averageHue=%230b0b0b&clientId=uac41ddf3-6b83-4&from=paste&height=746&id=uc39d6b40&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ub38d3a89-958f-40e4-9d4c-b9026f90085&title=&width=746)
该图案是一个正方形与另一个较小且倒置的正方形的乘积。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1693062823422-53a27c55-be56-4fb4-8625-fd93422a4108.png#averageHue=%23070707&clientId=u0cdbfc35-d1f6-4&from=paste&height=867&id=u389397ab&originHeight=1734&originWidth=2294&originalType=binary&ratio=2&rotation=0&showTitle=false&size=165961&status=done&style=none&taskId=u336a0ce8-42be-4295-863c-35af94f913a&title=&width=1147)
```glsl
float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
strength *= 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
```
## 图案21
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341127589-b74123ed-b0ed-4084-8511-fcc4a21f985b.png#averageHue=%23474747&clientId=uac41ddf3-6b83-4&from=paste&id=ua2e28af2&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8794aee8-2d1f-4b40-8f20-2773baf8644&title=)
对于这个图案，我们将 `vUv.x `乘以` 10.0`，然后使用 `floor(...)` 函数将其取下界整数，并除以 `10.0`，以得到一个介于` 0.0` 和 `1.0 `之间的值。

```glsl
float strength = floor(vUv.x * 10.0) / 10.0;
```
| 输入 | 结果 |
| --- | --- |
| 0.1 | 0.1 |
| 0.2 | 0.2 |
| 0.3 | 0.3 |
| 0.4 | 0.4 |
| 0.5 | 0.5 |
| 0.6 | 0.6 |
| 0.7 | 0.7 |
| 0.8 | 0.8 |
| 0.9 | 0.9 |
| 1.0 | 1.0 |

## 图案22 
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341127341-c1bf39e4-ffad-409b-8eae-569cb61655da.png#averageHue=%231c1c1c&clientId=uac41ddf3-6b83-4&from=paste&id=uabf63b69&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u919e5811-ab67-4681-8810-f2c432354f9&title=)
和以前一样，我们可以通过将不同的轴相乘来组合它们：
```glsl
float strength = floor(vUv.x * 10.0) / 10.0 * floor(vUv.y * 10.0) / 10.0;
```
## 图案23
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341127523-29a1223b-f0fe-484b-937f-bf3dd6a03dce.png#averageHue=%23474747&clientId=uac41ddf3-6b83-4&from=paste&id=ud93d8e23&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0125461f-5518-4add-b846-f0e546fee0e&title=)
获取这种模式是很复杂的，因为在GLSL中没有原生的随机函数。其中的技巧是获取一个非常不可预测的值，使其看起来像是随机的。
一种常用的获取这种值的方法是使用以下函数：
```glsl
float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}
```
我们将一个`vec2`参数传递给这个函数，然后我们会得到一个伪随机的值。
如果你想要了解更多关于这个函数的内容，你可以查看《The Book of Shaders》的链接：[https://thebookofshaders.com/10/](https://thebookofshaders.com/10/)
我们可以将这个函数放在`main`函数外部，并且在其中使用`vUv`参数。
```glsl
varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
    // ...

    float strength = random(vUv);

    // ...
}
```
小心这个随机函数。使用错误的值可能会导致随机性中出现明显的形状。
## 图案24
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341127745-9c0ed32a-7faf-4c07-b073-600d721f6909.png#averageHue=%23494949&clientId=uac41ddf3-6b83-4&from=paste&id=ue6d80dda&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0d84caa4-48fc-41e2-9c54-525d0720e57&title=)
该模式是前两个模式的组合。首先，我们创建一个以舍入值命名的新`vec2`坐标`gridUv`：
```glsl
vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0) / 10.0);
```
然后，我们将这些坐标与`random`函数一起使用：
```glsl
float strength = random(gridUv);
```
## 图案25
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341129807-8e7be232-6e7c-4347-bbdb-6a2f28332ede.png#averageHue=%23484848&clientId=uac41ddf3-6b83-4&from=paste&id=u782e1471&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u487fb29f-94e6-49dc-aff1-62ea9ed5c78&title=)
这个模式源自前面的模式。为了获得这种倾斜效果，我们在创建`gridUv`时必须将`vUv.x`和`vUv.y`相加：

```glsl
vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor((vUv.y + vUv.x * 0.5) * 10.0) / 10.0);
float strength = random(gridUv);
```
## 图案26
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341129695-07247c4c-7fca-4c2e-aeec-60ea43bdd05a.png#averageHue=%23656565&clientId=uac41ddf3-6b83-4&from=paste&id=u41e9d04d&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u346b8e6f-1c1f-405e-9538-e68313ba803&title=)
在这个模式中，离左下角越远，强度就越亮。
事实上，这取决于vUv的长度。vUv的值等于`0.0`、`0.0`，因此在左下角处长度为`0.0`，而我们离开该角落越远，长度就越大。
我们可以使用`length(...)`函数来获取一个向量（`vec2`、`vec3`或`vec4`）的长度：
如果还有其他问题，请随时提问。
```glsl
float strength = length(vUv);
```
## 图案27
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341129443-3f4c5e87-2e87-4040-8987-8627f718eadc.png#averageHue=%23383838&clientId=uac41ddf3-6b83-4&from=paste&id=uf275eeb6&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8fe2988b-608f-4ca5-bc2f-c0eb7ba67a5&title=)
相反，我们将获得`vUv`与平面中心之间的距离。因为平面的UV范围是从`0.0`、`0.0`到`1.0`、`1.0`，所以中心点是`0.5`、`0.5`。我们将创建一个对应于中心点的`vec2`，并使用`distance(...)`函数获取与`vUv`之间的距离：
```
float strength = distance(vUv, vec2(0.5));
```
当创建只有一个值的向量时，在我们的情况下这个值将被传递给每个属性——`x`和`y`。
请注意，我们也可以偏移`vUv`并使用`length(...)`函数。
如果还有其他问题，请随时提问。
## 图案28
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341130003-a85e9ae2-115f-4a54-888e-426ee05047c5.png#averageHue=%23565656&clientId=uac41ddf3-6b83-4&from=paste&id=u03ce1bdd&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0b956bad-c184-46b6-a4bb-79b52eb9922&title=)
对于此模式，我们将之前的值减去`1.0`：
```glsl
float strength = 1.0 - distance(vUv, vec2(0.5));
```
## 图案29
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341132595-5c537300-5b61-4730-bc05-b795a4e34d86.png#averageHue=%23070707&clientId=uac41ddf3-6b83-4&from=paste&id=u733ac297&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u2affe940-df5e-43b8-b5fa-f2d04da4ed8&title=)
创建光透镜效果时，此图案非常方便。为了得到这个结果，我们从一个小值开始，并将其除以之前计算的距离：
```glsl
float strength = 0.015 / (distance(vUv, vec2(0.5)));
```
## 图案30
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341133890-1290eb48-fe01-4263-8792-529f72f460a1.png#averageHue=%23191919&clientId=uac41ddf3-6b83-4&from=paste&id=u911c3133&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ucc7d84ec-9957-42a8-8a0d-0c046dd042a&title=)
这是相同的图案，但 `UVy`仅在轴上被挤压和移动：
```glsl
float strength = 0.15 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
```
## 图案31
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341133795-d8834e33-557a-41ae-8f32-ae6d317a68c4.png#averageHue=%23040404&clientId=uac41ddf3-6b83-4&from=paste&id=ubee8e11e&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u06f691e1-f66a-4e0e-83de-9b9ee60199c&title=)
这是相同的模式乘以相同的公式，但第二个是基于`x`轴的：
```glsl
float strength = 0.15 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
strength *= 0.15 / (distance(vec2(vUv.y, (vUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));
```
## 图案32
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341136061-76767c15-21e2-412d-8220-af43df604bb6.png#averageHue=%23040404&clientId=uac41ddf3-6b83-4&from=paste&id=u158df074&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u16ea5ce5-94f0-48fb-a142-e3683b0dbb6&title=)
获得这个模式相对繁琐。我们需要在中心旋转`vUv`坐标。进行2D旋转是`cos(...)`和`sin(...)`的组合，我们在此不涵盖。这也是使用函数的好机会。在主函数之前添加以下函数：
```glsl
vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}
```
然后，我们可以使用它来创建一个名为`rotatedUV`的新的`UV`集。问题是我们希望旋转八分之一的圆圈角度。遗憾的是，在`GLSL`中我们无法直接访问`π`（`pi`）。
相反，我们可以创建一个变量，其中包含对`π`的近似值：
```glsl
float pi = 3.1415926535897932384626433832795;
```
因为这个变量永远不会改变，所以我们可以在代码开头将其保存为`define` ：
```glsl
#define PI 3.1415926535897932384626433832795
```
使用#define定义的常量比变量更方便，但不能被修改。为了将其与其他变量区分开来，将其以大写形式定义是一种良好的做法。
然后，我们可以使用该`π`值作为`rotate(...)`函数的第二个参数（即角度）：
```glsl
vec2 rotatedUv = rotate(vUv, PI * 0.25, vec2(0.5));
```
最后，我们用这个新的`rotatedUV`替换我们的`vUv`：
```glsl
float strength = 0.15 / (distance(vec2(rotatedUv.x, (rotatedUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
strength *= 0.15 / (distance(vec2(rotatedUv.y, (rotatedUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));
```
## 图案33
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341134892-ffb3811b-8c62-4301-83f8-083ebf86bffb.png#averageHue=%236c6c6c&clientId=uac41ddf3-6b83-4&from=paste&id=u0d0f20c3&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u51ad30ad-fa44-47ea-a573-b9cb09ffc37&title=)
为了绘制该圆盘，我们使用该`distance(...)`函数与该`step(...)`函数并应用偏移量来控制圆盘半径：
```glsl
float strength = step(0.5, distance(vUv, vec2(0.5)) + 0.25);
```
我们还可以更改`step(...)`的第一个参数“命名边缘”来控制半径。
## 图案34
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341136401-f4579854-c61d-4b3f-8356-fa422b60c6dc.png#averageHue=%23181818&clientId=uac41ddf3-6b83-4&from=paste&id=u7e6dc1d2&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u872b9e1c-7e48-452b-a3e4-0b97123011c&title=)
这种模式与前一种模式非常接近，但我们使用该`abs(...)`函数来保持正值：
```glsl
float strength = abs(distance(vUv, vec2(0.5)) - 0.25);
```
## 图案35
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341136328-599c9663-1b97-4449-9fbb-480403e7c801.png#averageHue=%23818181&clientId=uac41ddf3-6b83-4&from=paste&id=u8830ddb6&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3c7c99a5-1cdf-4f46-9556-d4155d548fa&title=)
我们可以将前两个结合起来得到一个圆：
```glsl
float strength = step(0.02, abs(distance(vUv, vec2(0.5)) - 0.25));
```
## 图案36 
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341137777-368fb53b-0044-4fd0-adc9-dc4e44ce636f.png#averageHue=%23040404&clientId=uac41ddf3-6b83-4&from=paste&id=ud024dbb6&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud20067b8-472f-402a-ae09-37d1b3ae014&title=)
我们可以用以下方法反转它`1.0 - ...`：
```glsl
float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));
```
## 图案37
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341138408-19824c2d-5771-4388-84f7-b5c7f6468c34.png#averageHue=%23040404&clientId=uac41ddf3-6b83-4&from=paste&id=ufd8b97d8&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9e46a1bd-66a5-49a0-9c54-c9116fe466c&title=)
这个模式是基于之前的模式，但加入了波浪状的扭曲效果。为了得到这个结果，我们创建一个新的`UV`变量，可以称之为`wavedUv`，并在`y`值上添加了一个基于`x`轴的`sin(...)`函数：
```glsl
vec2 wavedUv = vec2(
    vUv.x,
    vUv.y + sin(vUv.x * 30.0) * 0.1
);
```
然后，我们用它`wavedUv`代替`vUv`：
```glsl
float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));
```
## 图案38
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341138678-4d30170b-b7b6-4aff-a197-ee83c4c6184b.png#averageHue=%23030303&clientId=uac41ddf3-6b83-4&from=paste&id=uc69b7b1d&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ub5818f20-602f-4dd2-96d8-8278a0a7ad0&title=)
对于此图案，我们还将波形畸变应用于`x`轴：
```glsl
vec2 wavedUv = vec2(
    vUv.x + sin(vUv.y * 30.0) * 0.1,
    vUv.y + sin(vUv.x * 30.0) * 0.1
);
float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));
```
## 图案39 
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341138958-0faa93ef-7935-4c69-96d5-7910af945f23.png#averageHue=%23040404&clientId=uac41ddf3-6b83-4&from=paste&id=u5b1733ef&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue8fc247c-144c-4a75-9446-ca1bb445863&title=)
我们只需增加`sin(...)`频率即可产生迷幻效果：
```glsl
vec2 wavedUv = vec2(
    vUv.x + sin(vUv.y * 100.0) * 0.1,
    vUv.y + sin(vUv.x * 100.0) * 0.1
);
float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));
```
想象一下将其动画化。
## 图案40 
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341140196-e3f42089-e57d-4b74-8219-27fd8b0e5df2.png#averageHue=%23686868&clientId=uac41ddf3-6b83-4&from=paste&id=u9b48c2c1&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u678e1f33-a1d1-4d8e-8a0d-861c236441e&title=)
这个图案实际上是 `vUv`的角度。要从 2D 坐标获取角度，我们可以使用`atan(...)`：
```glsl
float angle = atan(vUv.x, vUv.y);
float strength = angle;
```
## 图案41
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341141514-87a45c62-2a31-436f-b26f-27778c2a879d.png#averageHue=%23464646&clientId=uac41ddf3-6b83-4&from=paste&id=u849438ae&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud5ffb85b-502a-42f2-af3a-59fb5b234ce&title=)
此图案是相同的，但在 `vUv`上有一个`0.5`偏移，以在中心周围创建一个角度：
```glsl
float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
float strength = angle;
```
## 图案42
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341141610-682b7b19-5875-45af-be1a-c0ab70b376aa.png#averageHue=%234c4c4c&clientId=uac41ddf3-6b83-4&from=paste&id=u707b9e2f&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uebf844b3-1d5f-4253-a4af-c202bdddd5f&title=)
再一次，这个模式是相同的，但角度范围从`0.0`到`1.0`。目前，`atan(...)`函数返回一个在`-π`到`+π`之间的值。我们可以首先将其除以`PI * 2`：
```glsl
float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
angle /= PI * 2.0;
float strength = angle;
```
我们得到一个从`-0.5`到`0.5`的值。我们只需要加上`0.5`：
```glsl
float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
angle /= PI * 2.0;
angle += 0.5;
float strength = angle;
```
拥有合适的角度是玩转圆形形状的积极方式。我们将这些`angle`操作重新组合成一行以便更容易阅读：
```glsl
float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
```
## 图案43
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341141775-ec457d3f-c868-4255-8229-225bd06b91b3.png#averageHue=%23464646&clientId=uac41ddf3-6b83-4&from=paste&id=u4a5c5f23&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u096e5ac6-ec21-4bd1-82af-409f4d348ce&title=)
该模式基于我们一开始使用模数时使用的相同技术，但这次使用的是`angle`：
```glsl
float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
float strength = mod(angle * 20.0, 1.0);
```
## 图案44
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341141854-869b86cf-4d45-4a62-9d9b-f9f085cf3ea8.png#averageHue=%232b2b2b&clientId=uac41ddf3-6b83-4&from=paste&id=ue5301005&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u27e2cb97-89a4-46d5-90d4-9136a324bd3&title=)
这个正在使用`sin(...)`：
```glsl
float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
float strength = sin(angle * 100.0);
```
## 图案45
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341142502-7eed9bf1-61bb-4194-9808-e45864fa479e.png#averageHue=%23040404&clientId=uac41ddf3-6b83-4&from=paste&id=ube91cf8d&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u22dea803-293f-4000-9211-89b9bb7bcef&title=)
我们可以使用之前的值来定义之前绘制的圆的半径：
```glsl
float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
float radius = 0.25 + sin(angle * 100.0) * 0.02;
float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius));
```
## 图案46
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341144138-b9dcc787-c699-47fa-aae9-318e09ddfc5e.png#averageHue=%23131313&clientId=uac41ddf3-6b83-4&from=paste&id=ua8dc6a3d&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue40114b7-3991-4842-b78e-81dad81a458&title=)
这种模式称为柏林噪声。您可能已经听说过它，如果没有，您可能在不知情的情况下看到过它。柏林噪声有助于重建自然形状，如云、水、火、地形海拔，但它也可以用来制作随风移动的草或雪的动画。
有许多 `Perlin` 噪声算法，它们具有不同的结果、不同的维度（2D、3D，甚至 4D），有些会重复，有些则性能更高，等等。
以下是一个 Github 要点，列出了我们可以为 GLSL 找到的一些最流行的柏林噪音：[https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83](https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83)
但请注意，有些代码可能无法立即正常工作，我们将在后面看到。现在我们将测试Stefan Gustavson的第一个经典Perlin噪声，这是一个二维噪声- 我们提供一个`vec2`向量，并返回一个浮点数。只需将代码复制到您的着色器中，但暂时不要使用它：
```glsl
//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}
```
不幸的是，这段代码似乎破坏了我们的着色器，这是因为缺少一个名为`permute`的函数。在这里，您可以将其添加到`fade`函数之前：
```glsl
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}
```
现在我们可以访问一个`cnoise`函数，并且可以使用它`vUv`：
```glsl
float strength = cnoise(vUv);
```
这是一个粗略的结果，但我们仍然有一些东西。要查看预览中的更多图案，请将`vUv`乘以`10.0`：
```glsl
float strength = cnoise(vUv * 10.0);
```
## 图案47 
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341144438-e132f077-3f08-4ee7-88c6-16ad4c354ce5.png#averageHue=%23414141&clientId=uac41ddf3-6b83-4&from=paste&id=u6678d7e9&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u83b48e72-5089-46a6-a359-6d3f6687259&title=)
该模式使用相同的噪声，但在其上增加了一步：
```glsl
float strength = step(0.0, cnoise(vUv * 10.0));
```
如果在某个时候你想创造一头牛，这非常有用。
## 图案48
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341144486-69fd9e4c-f5ca-4a8e-aa83-43be6ab50d27.png#averageHue=%23636363&clientId=uac41ddf3-6b83-4&from=paste&id=u51e37484&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uec79a9e5-a6ae-4690-81a0-b1df2c079ba&title=)
对于此模式，我们使用了`abs(...)`值，并将结果减去`1.0`：
```glsl
float strength = 1.0 - abs(cnoise(vUv * 10.0));
```
你可以用它来创造闪电、水下反射或等离子能量的东西。
## 图案49
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341145201-295abdb0-20ea-4b42-ad80-c51d68db305b.png#averageHue=%232c2c2c&clientId=uac41ddf3-6b83-4&from=paste&id=u4da074ee&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud4def188-9824-4b74-bce1-422139f6a3d&title=)
对于此模式，我们对噪声应用了`sin(...)`：
```glsl
float strength = sin(cnoise(vUv * 10.0) * 20.0);
```
## 图案50
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341145322-7e80b304-04d1-4e2b-8c2a-ff2e53fc63e5.png#averageHue=%23141414&clientId=uac41ddf3-6b83-4&from=paste&id=u6f9cfafc&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ufa277af5-70a0-46c7-9edb-ee1191f33c7&title=)
对于最后一个，我们将`sin(...)`和`step(...)`结合起来：
```glsl
float strength = step(0.9, sin(cnoise(vUv * 10.0) * 20.0));
```
简单的豌豆，黑白柠檬汁。
## 用颜色测试一下 
这很有趣，但是这些黑白颜色变得乏味了。我们一开始就有的一种很酷的颜色是当我们`vUv`直接在中使用时`gl_FragColor`：
```glsl
gl_FragColor = vec4(vUv, 1.0, 1.0);
```
我们现在可以做的是使用渐变颜色而不是白色。
### 混合颜色
为此，我们将使用该`mix(...)`函数。该函数需要 3 个参数：

- 第一个输入可以是  `float`、  `vec2`、 `vec3`或  `vec4`。
- 第二个输入，其类型应相同。
- 第三个值必须是`float`。它将决定获取更多第一个输入或更多第二个输入。如果我们使用`0.0`，返回值将是第一个输入。如果我们使用`1.0`，返回值将是第二个。如果我们使用`0.5`，该值将是两个输入之间的混合。您也可以低于`0.0`或高于`1.0`，并且将推断出值。

让我们创建第一种颜色：
```glsl
vec3 blackColor = vec3(0.0);
```
让我们形成第二种颜色：
```glsl
vec3 uvColor = vec3(vUv, 1.0);
```
我们根据以下公式获得两种颜色之间的混合`strength`：
```glsl
vec3 mixedColor = mix(blackColor, uvColor, strength);
```
我们在`gl_FragColor`不改变 `alpha` 的情况下使用该混合：
```glsl
gl_FragColor = vec4(mixedColor, 1.0);
```
使用之前的所有模式进行有趣的测试。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341147295-6eb8846d-e819-4034-b9db-aa94487bc5d9.png#averageHue=%23000000&clientId=uac41ddf3-6b83-4&from=paste&id=uf6181cdc&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u329df21a-a597-4438-9e44-9e9c8695e55&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341147908-847e289d-3dc1-4218-bebd-f0fc4e3b0924.png#averageHue=%23000000&clientId=uac41ddf3-6b83-4&from=paste&id=u73e94f3b&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ua4de3bc1-74d0-4933-a97a-490d1354222&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341149297-cf421611-0ffd-48da-974a-b23a79c5e2d7.png#averageHue=%23000000&clientId=uac41ddf3-6b83-4&from=paste&id=u6cac1228&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u230d1aa6-1337-455f-9938-3b47ed766be&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341149906-220e8acb-0964-4647-a8e6-8c08e3802ed1.png#averageHue=%23000000&clientId=uac41ddf3-6b83-4&from=paste&id=u2958ce7b&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u02ad1660-4fad-4f4a-941f-429eb365dd5&title=)
### 固定强度
如果您使用此 `UV` 梯度测试 #11、#14 和 #15 等图案，您会在交叉点看到一些奇怪的行为。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341150317-6f7aa97b-8601-4629-aa5e-9da62e9043ab.png#averageHue=%231e1b2f&clientId=uac41ddf3-6b83-4&from=paste&id=ua31bfb3b&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9f9a04c0-ce2b-40ec-bab8-8604c5dab5a&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341150420-2942aab0-40a9-455d-a564-8b0564787b4c.png#averageHue=%23010101&clientId=uac41ddf3-6b83-4&from=paste&id=u35da9133&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8a3cd678-729b-44e2-b5fc-c94714db6be&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341151311-104c68d2-6576-41de-86cb-1e3e3d966766.png#averageHue=%23010101&clientId=uac41ddf3-6b83-4&from=paste&id=u814305c7&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=udfe9610d-dfd0-4d85-ab75-ec27f6b146f&title=)
看起来交叉点太亮了，事实也正是如此。这是因为`strength`我们在 中使用的值`mix(...)`高于`1.0`并且输出被推断 - 这意味着它超出了第二个值。
为了限制这个值，我们可以使用`clamp(...)`上的函数`strength`。此函数将简单地设置一个值的下限和上限：
```glsl
// Pattern 11
float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
strength += step(0.8, mod(vUv.y * 10.0, 1.0));
strength = clamp(strength, 0.0, 1.0);

// ...

// Pattern 14
float barX = step(0.4, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0, 1.0));
float strength = barX + barY;
strength = clamp(strength, 0.0, 1.0);

// Pattern 15
float barX = step(0.4, mod(vUv.x * 10.0 - 0.2, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0 - 0.2, 1.0));
float strength = barX + barY;
strength = clamp(strength, 0.0, 1.0);
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341152455-3c5afa43-9398-4164-8498-b26ccab495ab.png#averageHue=%231d192f&clientId=uac41ddf3-6b83-4&from=paste&id=u16922ecd&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9f4bf61e-00f5-4850-92d3-7c870e6aee2&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341153839-8c3affed-2889-40b5-9b48-4a10067d922b.png#averageHue=%23000000&clientId=uac41ddf3-6b83-4&from=paste&id=u8f93014a&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u668ecbad-9825-4682-ab29-af07da314f9&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1692341153121-9bb31b43-ef3f-4419-ac33-a0b44a6f7fcf.png#averageHue=%23000000&clientId=uac41ddf3-6b83-4&from=paste&id=u6c188cca&originHeight=1024&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ua14f0223-4fcb-4045-8ffd-d06b6e39633&title=)
## 更进一步 
还有许多其他潜在的模式和许多附加功能。本课程的目的是为您未来的项目提供基础，并在琐碎的环境中练习 GLSL。
我们没有尝试的一件有用的事情是将这些形状放入函数中。我们可以使用正确的参数创建一个`getCircle`函数、一个`getSquare`函数等，以便轻松地重用它们。
继续练习，不要害怕创造新的形状，进行实验，并在需要时寻求帮助。
另外，尝试添加一些制服来为值设置动画或向调试面板添加一些调整。
# 
30. Raging sea 波涛汹涌的大海
## 介绍
现在我们知道如何使用着色器并绘制一些图案，让我们合理利用它并创建一片汹涌的海洋。
我们将设置波浪动画并使用调试面板控制参数。
## 设置 
目前，我们拥有的只是一个使用[MeshBasicMaterial 的](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial)旋转平面。几何图形有128x128细分。我们将对顶点进行动画处理以获得波浪，并且我们需要相当多的顶点。128x128可能还不够，但如果需要，我们会增加该值。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1693961561497-851c0291-8879-4b2d-87b6-87acc2fc470a.png#averageHue=%234d4d4d&clientId=ua22598ed-f682-4&from=paste&id=u90bc29a2&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u26f8eb7b-9dcc-498c-9c1c-14e8bfb2221&title=)
## 根据 
[让我们用ShaderMaterial](https://threejs.org/docs/#api/en/materials/ShaderMaterial)替换材质：
```javascript
const waterMaterial = new THREE.ShaderMaterial()
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1693961561509-0f27de02-d8e3-4010-bf4c-d433e3a22046.png#averageHue=%234d0000&clientId=ua22598ed-f682-4&from=paste&id=ud73d2f20&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3c9e9148-a483-4e8a-b892-7a321aa9803&title=)
我们的项目配置已经支持 GLSL 文件，但我们需要创建这些文件。
在中创建顶点着色器`/src/shaders/water/vertex.glsl`：
```glsl
void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
}
```
现在在中创建片段着色器`/src/shaders/water/fragment.glsl`：
```glsl
void main()
{
    gl_FragColor = vec4(0.5, 0.8, 1.0, 1.0);
}
```
最后，在脚本中导入这些着色器并在 `ShaderMaterial` 中使用[它们](https://threejs.org/docs/#api/en/materials/ShaderMaterial)：
```javascript
// ...

import waterVertexShader from './shaders/water/vertex.glsl'
import waterFragmentShader from './shaders/water/fragment.glsl'

// ...

const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader
})
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1693961561542-b6214d16-cf77-4909-b5c7-0293fb4cfa53.png#averageHue=%23263e4d&clientId=ua22598ed-f682-4&from=paste&id=u385eecab&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u7c1e0134-3b4b-42d7-8f43-2b65e389b90&title=)
你应该买一架蓝色飞机。如果没有，请检查日志。
如果你凭记忆做这一切，那么恭喜你，你是个天才。如果没有，那是完全正常的，你只需要时间。
## 大浪 Waves
我们从大浪开始，以便快速取得显着成果。还有什么比用窦产生波浪更好的方法呢？
在顶点着色器中，让我们根据 `x` 使用 `sin(...) `移动 `modelPosition` 的 `y` 值：
```glsl
vec4 modelPosition = modelMatrix * vec4(position, 1.0);
modelPosition.y += sin(modelPosition.x);
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1693961561465-a98145d5-5ffd-46af-9bdc-021f7aa67d36.png#averageHue=%23233947&clientId=ua22598ed-f682-4&from=paste&id=uf6a194af&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9443dd65-34a9-491f-b102-73e5f8967b1&title=)
位移和频率应该太高了。我们将使用制服来更好地控制它们，而不是用着色器不知从何而来的值进行简单的相乘。
我们先从海拔开始。
### 海拔Elevation
将`uBigWavesElevation`制服添加到[ShaderMaterial](https://threejs.org/docs/#api/en/materials/ShaderMaterial)：
```javascript
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms:
    {
        uBigWavesElevation: { value: 0.2 }
    }
})
```
我们现在可以在顶点着色器中检索并使用`uBigWavesElevation`制服：
```glsl
uniform float uBigWavesElevation;

void main()
{
    // ...
    modelPosition.y += sin(modelPosition.x) * uBigWavesElevation;

    // ...
}
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1693961562917-a99cfa57-7e9d-4a70-a7ba-7ce0dc6177cd.png#averageHue=%23253b4a&clientId=ua22598ed-f682-4&from=paste&id=u2a5c249b&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue5c7e7a2-6138-44e2-b350-86a53a3cd42&title=)
我们应该使用一个名为`elevation`的变量来代替直接更新`y`属性。这将在以后对这些波形进行着色时非常方便：
```glsl
uniform float uBigWavesElevation;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Elevation
    float elevation = sin(modelPosition.x) * uBigWavesElevation;
    modelPosition.y += elevation;

    // ...
}
```
因为海拔现在是在 JavaScript 中处理的，所以我们可以将其添加到我们的 Dat.GUI 中：
```javascript
gui.add(waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation')
```
![005.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1694652775004-da3069c9-140c-44a8-9f57-2c6667b13b97.gif#averageHue=%2313120e&clientId=uc8fce7ab-530b-4&from=drop&id=uc49ec43e&originHeight=410&originWidth=656&originalType=binary&ratio=2&rotation=0&showTitle=false&size=412472&status=done&style=none&taskId=u2b491ea3-6272-4a4c-988e-527f10b6f18&title=)
### 频率Frequency
现在我们可以处理频率了。目前，波浪的高度仅在`x`轴上变化，但控制`x`和`z`轴都会更好。
`uBigWavesFrequency`使用[Vector2](https://threejs.org/docs/#api/en/math/Vector2)创建制服：
```javascript
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms:
    {
        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) } 
    } 
})
```
在顶点着色器中，检索`uniform`变量（注意，它是一个`vec2`），并将其应用于`sin(...)`函数，初始时仅使用`x`属性。
```glsl
// ...
uniform vec2 uBigWavesFrequency;

void main()
{
    // ...

    float elevation = sin(modelPosition.x * uBigWavesFrequency.x) * uBigWavesElevation;

    // ...
}
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1693961564403-273eaca3-0529-43ed-8b71-7a0628bda6c7.png#averageHue=%231a1a18&clientId=ua22598ed-f682-4&from=paste&id=u4d53b5e3&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u48b43bba-c18b-4ebf-b6ac-fa86b3e9185&title=)
这应该会产生更多的波，因为频率更高了。
让我们使用`uBigWavesFrequency`的第二个值（`y`）来控制`z`轴上的波浪。我们可以通过将第一个`sin(...)`乘以另一个`sin(...)`来实现：
```glsl
float elevation = sin(modelPosition.x * uBigWavesFrequency.x) * sin(modelPosition.z * uBigWavesFrequency.y) * uBigWavesElevation;
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1693961565669-73fe387e-a638-483e-a908-1042d02ac77d.png#averageHue=%23231a0c&clientId=ua22598ed-f682-4&from=paste&id=u751da8d1&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u64c20780-8bd8-44fb-8802-1a58afd546d&title=)
你也应该在轴上得到波浪`z`。
我们现在可以将这些 `x`和`y`属性添加到我们的 Dat.GUI 中：
```javascript
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY')
```
### 
### 动画Animate
让我们给这些大波浪添加动画效果。我们将使用之前课程中的经过的时间来偏移`sin(...)`中的值，从而创建动画效果。
[首先，在ShaderMaterial](https://threejs.org/docs/#api/en/materials/ShaderMaterial)中创建一个`uTime` 的`uniform`变量：
```javascript
const waterMaterial = new THREE.ShaderMaterial({
    // ...
    uniforms:
    {
        uTime: { value: 0 },
        // ...
    } 
})
```
然后，在`tick`函数中更新该变量的值：
```javascript
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Water
    waterMaterial.uniforms.uTime.value = elapsedTime

    // ...
}
```
在顶点着色器中，检索并在两个`sin(...)`函数中使用`uTime`：
```glsl
uniform float uTime;
// ...

void main()
{
    // ...

    float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime) * sin(modelPosition.z * uBigWavesFrequency.y + uTime) * uBigWavesElevation;

    // ...
}
```
![009.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1694652921340-9d8fe71d-51f7-47e5-9227-01f6001918b2.gif#averageHue=%231b1816&clientId=uc8fce7ab-530b-4&from=drop&id=ufa0880bf&originHeight=410&originWidth=656&originalType=binary&ratio=2&rotation=0&showTitle=false&size=485674&status=done&style=none&taskId=u68ec74a2-af23-4cfc-a0e1-13f84928cec&title=)
现在你已经得到了有动画效果的波浪。尽管对于汹涌的海洋来说速度还不错，但如果我们能够进行控制就更好了。
让我们创建一个`uBigWavesSpeed` `uniform`，并将其乘以`uTime`。为了简化操作，我们可以使用一个`float`类型，但如果你想单独控制两个轴的速度，可以使用`vec2`类型。
在`ShaderMaterial`中创建`uBigWavesSpeed` `uniform`，并添加相应的调整：
```javascript
const waterMaterial = new THREE.ShaderMaterial({
    // ...
    uniforms:
    {
        // ...
        uBigWavesSpeed: { value: 0.75 } 
    } 
})

// ...
gui.add(waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed')
```
在顶点着色器中，检索`uBigWavesSpeed` `uniform`，并在两个`sin(...)`函数中将`uTime`乘以它：

```glsl
// ...
uniform float uBigWavesSpeed;

void main()
{
    // ...

    float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) * sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) * uBigWavesElevation;
    
    // ...
}
```
![010.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1694652946477-bbad534a-ef9f-4fbd-b0c2-ef1195e7f6fd.gif#averageHue=%232a2a27&clientId=uc8fce7ab-530b-4&from=drop&id=u7118c9e0&originHeight=410&originWidth=656&originalType=binary&ratio=2&rotation=0&showTitle=false&size=378749&status=done&style=none&taskId=u5f6e4078-e190-4212-b6eb-1fe172072a1&title=)
我们的高度计算公式太长了，可以通过使用变量或简单的换行来进行一些重构：

```glsl
float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
                  sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
                  uBigWavesElevation;
```
## 颜色 Color
我们的波浪开始变得很棒，但是统一的蓝色并没有帮助。
让我们为深度和表面分别创建两种颜色。如果你还记得，在Dat.GUI中添加Three.js颜色有点复杂。
首先，在创建GUI实例之后，我们需要创建一个`debugObject`：
```javascript
const gui = new dat.GUI({ width: 340 })
const debugObject = {}
```
然后，在实例化`waterMaterial`之前，我们可以将这两种颜色创建为`debugObject` 的属性，并将它们用于两个新的制服，我们将其称为`uDepthColor`和`uSurfaceColor`。这些颜色将使用[Color](https://threejs.org/docs/#api/en/math/Color)类：
```javascript
// Colors
debugObject.depthColor = '#0000ff'
debugObject.surfaceColor = '#8888ff'

// Material
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms:
    {
        // ...
        uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
        uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) }
    } 
})
```
然后我们可以使用该`addColor`方法将它们添加到我们的 Dat.GUI 中。当`waterMaterial`颜色发生变化时，我们还需要更新制服`onChange(...)`：
```javascript
debugObject.depthColor = '#0000ff'
debugObject.surfaceColor = '#8888ff'

gui.addColor(debugObject, 'depthColor').onChange(() => { waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor) })
gui.addColor(debugObject, 'surfaceColor').onChange(() => { waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor) })
```
![011.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1694652959995-4b889f3a-b46f-4549-9d60-2d41ba4721de.gif#averageHue=%231b1c18&clientId=uc8fce7ab-530b-4&from=drop&id=u5635c2ef&originHeight=410&originWidth=656&originalType=binary&ratio=2&rotation=0&showTitle=false&size=421399&status=done&style=none&taskId=uc26633e9-ba17-40cb-838b-6076445b3fd&title=)
您应该看到颜色调整，但更改它们不会影响材质。这是因为我们还没有在着色器中使用`uDepthColor`和`uSurfaceColor`制服。
在片段着色器中，首先检索这些颜色：
A
```glsl
uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
```
并仅使用一种颜色来验证一切正常：
```glsl
// ...

void main()
{
    gl_FragColor = vec4(uDepthColor, 1.0);
}
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1693961565750-d64187f0-18cb-4d8d-9972-a6436f64dafc.png#averageHue=%231c1806&clientId=ua22598ed-f682-4&from=paste&id=uc4d717c1&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf13c27c9-e5e9-49b3-a6b0-935f5ab9cdc&title=)
现在我们需要根据波浪的高低程度更多地使用`uDepthColor`或`uSurfaceColor`。
请记住之前的课程，我们将使用`mix(...)`函数。这个函数需要3个参数，第一个输入值、第二个输入值和一个范围值，该值将决定如何混合这两个输入。
如果第三个值为`0.0`，结果将是第一个输入。 如果第三个值为`1.0`，结果将是第二个输入。 如果第三个值为`0.5`，结果将是两个输入的完美混合。 如果第三个值小于`0.0`或大于`1.0`，则值将被外推。 前两个参数分别是`uDepthColor`和`uSurfaceColor`。但是控制混合的第三个值是什么呢？
我们可以使用`elevation`，不幸的是，这个变量在顶点着色器中。
为了将这个变量传递到片段着色器中 - 就像我们在之前的课程中做的那样 - 我们将使用一个`varying`。在顶点着色器中，创建一个`varying vElevation` ，并在`main`函数中更新它：
```glsl
// ...

varying float vElevation;

void main()
{
    // ...

    // Varyings
    vElevation = elevation;
}
```
在片段着色器中，获取`varying`的值。然后创建一个颜色变量，根据`vElevation`混合`uDepthColor`和`uSurfaceColor`：
```glsl
uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;

varying float vElevation;

void main()
{
    vec3 color = mix(uDepthColor, uSurfaceColor, vElevation);
    gl_FragColor = vec4(color, 1.0);
}
```

你应该能够看到颜色的微小变化。问题是，根据我们的代码，`vElevation`目前只在`-0.2`到`+0.2`之间变化。我们需要找到一种方式来控制这个`vElevation`，但只在片段着色器中进行操作。
让我们添加一些`uniform`变量！我们将创建`uColorOffset`和`uColorMultiplier`，并将它们都添加到我们的Dat.GUI中：
```javascript
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms:
    {
        // ...
        uColorOffset: { value: 0.25 },
        uColorMultiplier: { value: 2 },
    } 
})

// ...
gui.add(waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset')
gui.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')
```
现在在片段着色器中获取`uColorOffset`和`uColorMultiplier`的`uniform`变量，创建一个`mixStrength`变量（为了方便阅读），基于这两个`uniform`变量，然后在`mix(...)`函数中使用该变量：

```glsl
uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;

void main()
{
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
    
    gl_FragColor = vec4(color, 1.0);
}
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1693961565829-5d7ed3ac-c749-41a5-a887-7051905cb000.png#averageHue=%231c1705&clientId=ua22598ed-f682-4&from=paste&id=u977c1a91&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ua3411c45-ba7d-49a9-be85-e1f066655a6&title=)
您可以获得更好的梯度。调整值以确保您喜欢的颜色：
```glsl
debugObject.depthColor = '#186691'
debugObject.surfaceColor = '#9bd8ff'

// ...

const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms:
    {
        // ...

        uColorOffset: { value: 0.08 },
        uColorMultiplier: { value: 5 }
    }
})
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1693961567115-cdaec96d-5574-4bc8-aa59-7cbc59b9dba5.png#averageHue=%231f170c&clientId=ua22598ed-f682-4&from=paste&id=u9030e029&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ua90a082a-f0b2-4c4c-9582-22e6bd77221&title=)
## 小波浪 Small Waves
对于小波浪，我们将使用柏林噪声。我们在上一课中使用了 2D perlin 噪声，其中我们发送 2D 坐标并获得浮点值作为返回。这次，我们将使用 3D 柏林墙。这将使噪声随时间变化，以获得更真实的结果。
转到与上一课相同的要点并复制Stefan Gustavson的经典 Perlin 3D 噪声：[https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83](https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83)
或者将下面的代码复制到顶点着色器：
```glsl
// Classic Perlin 3D Noise 
// by Stefan Gustavson
//
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}
vec4 taylorInvSqrt(vec4 r)
{
    return 1.79284291400159 - 0.85373472095314 * r;
}
vec3 fade(vec3 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P)
{
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
}
```
这次不需要修复。
现在我们可以使用带有vec3参数的cnoise函数。
以下是`vec3` 的三个值

- x将是`modelPosition`的x
- y将是`modelPosition`的z
- z将是`uTime`。第三个值将使噪声以自然且真实的方式演变。
```glsl
elevation += cnoise(vec3(modelPosition.xz, uTime));
```
![016.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1694653003084-c546603d-d4c9-457f-81ca-5d493b301d0e.gif#averageHue=%231e1c19&clientId=uc8fce7ab-530b-4&from=drop&id=ua874297a&originHeight=410&originWidth=656&originalType=binary&ratio=2&rotation=0&showTitle=false&size=824475&status=done&style=none&taskId=uba70e056-06c1-47d2-b1b9-96c4f98f92e&title=)
这不是预期的结果。首先，波浪速度太快。所以你必须`uTime`乘以`0.2`：
```glsl
elevation += cnoise(vec3(modelPosition.xz, uTime * 0.2));
```
![017.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1694653078915-72a50332-e044-4811-91b1-5ecc77c27b5b.gif#averageHue=%23191919&clientId=uc8fce7ab-530b-4&from=drop&id=u36a5a23e&originHeight=410&originWidth=656&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1482655&status=done&style=none&taskId=u043daf0d-7953-40fe-8402-3a7c272668a&title=)
其次，频率太小了。这导致波浪的大小与我们之前创建的大波浪一样。为了增加频率，将`modelPosition.xz`乘以`3.0`：
```glsl
elevation += cnoise(vec3(modelPosition.xz * 3.0, uTime * 0.2));
```
![018.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1694653347223-12759529-a830-4d4c-a6e6-c1363dc7f001.gif#averageHue=%234f4e4b&clientId=uc8fce7ab-530b-4&from=drop&id=u202ee73d&originHeight=410&originWidth=656&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2260014&status=done&style=none&taskId=uf00dd9bf-493d-4468-b5bd-2b382725aaf&title=)
第三，海浪太高了。让我们通过将噪声乘以`0.15`来减少浪高：
```glsl
elevation += cnoise(vec3(modelPosition.xz * 3.0, uTime * 0.2)) * 0.15;
```
![019.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1694653359973-7d8d0e70-c844-4f51-bdc3-38cbfb75854a.gif#averageHue=%231f1d1a&clientId=uc8fce7ab-530b-4&from=drop&id=u903d7c29&originHeight=410&originWidth=656&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2173908&status=done&style=none&taskId=u9cbf8d1f-7e81-46e7-b5fe-031789ac39e&title=)
最后，现实生活中的波浪并不那么光滑。现实的波浪有圆形的波谷和高高的波峰。为了达到这个结果，我们可以使用以下`abs(...)`函数：
```glsl
elevation += abs(cnoise(vec3(modelPosition.xz * 3.0, uTime * 0.2)) * 0.15);
```
![020.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1694653380440-e7632152-9524-48b5-bc82-61862e7abf6c.gif#averageHue=%231f1e1b&clientId=uc8fce7ab-530b-4&from=drop&id=u83376f86&originHeight=410&originWidth=656&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2328332&status=done&style=none&taskId=uae07406d-d785-4f4c-a4c8-b1255a920dc&title=)
我们得到了与我们想要的完全相反的圆形波峰和高波谷。要反转波浪，请替换+为-：
```glsl
elevation -= abs(cnoise(vec3(modelPosition.xz * 3.0, uTime * 0.2)) * 0.15);
```
![021.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1694653398326-241836f9-a5bc-411e-b518-025c8a7b1de0.gif#averageHue=%231d1c19&clientId=uc8fce7ab-530b-4&from=drop&id=ub7006acf&originHeight=410&originWidth=656&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2472024&status=done&style=none&taskId=u4a497f83-c821-4ad6-b516-32bc58f70ac&title=)
这更好，但是当你观察汹涌大海中的波浪时，它们看起来更加混乱，频率不同且不可预测。
我们需要在更高的频率下应用更多的噪声。我们可以使用不同的值重复前一行，但这是使用`for(...)`循环的最佳时机。
`for(...)`循环在 GLSL 中工作。只需确保使用`float`类型变量即可。我们将从 1.0 开始使用 3 次迭代：
```glsl
for(float i = 1.0; i <= 3.0; i++)
{
}
```
然后在循环中移动我们之前的公式：
```glsl
for(float i = 1.0; i <= 3.0; i++)
{
    elevation -= abs(cnoise(vec3(modelPosition.xz * 3.0, uTime * 0.2)) * 0.15);
}
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1693961567207-9b6ddc06-9d81-43d2-b437-dabc59076f1a.png#averageHue=%23201a11&clientId=ua22598ed-f682-4&from=paste&id=ue0ead267&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0d155350-9688-4a80-8a89-9970a009477&title=)
现在，我们应用 3 次相同的公式，这应该会产生相同的波，但它们的幅度更加突出。
让我们根据`i`变量增加频率并减少幅度：
```glsl
for(float i = 1.0; i <= 3.0; i++)
{
    elevation -= abs(cnoise(vec3(modelPosition.xz * 3.0 * i, uTime * 0.2)) * 0.15 / i);
}
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1693961568751-cd696a1f-83c5-4e93-bdc5-9733964a7a73.png#averageHue=%231e170d&clientId=ua22598ed-f682-4&from=paste&id=u073d74a1&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue6fdd461-ba58-4d8d-be04-f614e18e771&title=)
这样好多了。也许你没有注意到，但我们几乎看不到较小的波浪。那是因为我们的几何体缺少顶点。将细分增加到512x512：
```glsl
const waterGeometry = new THREE.PlaneGeometry(2, 2, 512, 512)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1693961569621-2a85fdfa-237c-4c40-9403-551eaeccc668.png#averageHue=%231f170c&clientId=ua22598ed-f682-4&from=paste&id=u47525d1e&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud165cfa2-faa5-4bb7-915c-52bda4e9375&title=)
这代表了更加多的三角形，但平面是场景中唯一的几何体，并且我们在着色器中对几乎所有内容进行动画处理，这意味着 GPU 正在承担繁重的工作。
让我们添加一些制服和调整来控制这些小波浪：
```javascript
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms:
    {
        // ...

        uSmallWavesElevation: { value: 0.15 },
        uSmallWavesFrequency: { value: 3 },
        uSmallWavesSpeed: { value: 0.2 },
        uSmallIterations: { value: 4 },

        // ...
    }
})

// ...

gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
gui.add(waterMaterial.uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations')
```
在顶点着色器中：
```glsl
uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallIterations;

// ...

void main()
{
    // ...

    for(float i = 1.0; i <= uSmallIterations; i++)
    {
        elevation -= abs(cnoise(vec3(modelPosition.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesElevation / i);
    }

    // ...
}
```
![025.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1694653454656-bed2e71c-5e36-482d-834b-128a7241cd44.gif#averageHue=%23242423&clientId=uc8fce7ab-530b-4&from=drop&id=uf437a387&originHeight=410&originWidth=656&originalType=binary&ratio=2&rotation=0&showTitle=false&size=7812363&status=done&style=none&taskId=u285bacb8-7e6d-4350-aef5-4711e5bf016&title=)
就是这样。
## 走得更远
如果你想更进一步，你可以尝试添加雾气。
您也可以尝试放大平面。
添加雾气是获得更身临其境的体验的好方法，可以增强迷失在大海中的感觉。但要小心，添加雾会比我们看到的更具挑战性，因为您需要自己为雾编写代码。

## 拓展-雾气Fog
首先我们在场景上引入雾气，构造器`Fog(hex, near, far)`
```javascript
// Colors
// ...

// Fog
const fog = new THREE.Fog(debugObject.fogColor, 1, 4);
scene.fog = fog;

// Material
// ...
```
并将它们都添加到我们的Dat.GUI中
这么做为了同步雾气效果和背景色的同时变更，可以让视觉效果更好
```javascript
// Colors
// ...
debugObject.fogColor = "#000000";

// ...
gui.addColor(debugObject, "fogColor").onChange(() => {
  scene.fog.color.set(debugObject.fogColor);
  renderer.setClearColor(debugObject.fogColor, 1);
});
```
最后我们在`Material`里开启雾气并在着色器中使用，添加属性`fog`为`true`即可,该值默认为`false`。
记住还要设置`shander`中雾的参数，传递给片段着色器
```javascript
// Material
const waterMaterial = new THREE.ShaderMaterial({
  // ...
  uniforms: {
    // ...
    fogColor: { value: fog.color },
    fogNear: { value: fog.near },
    fogFar: { value: fog.far },
  },
  fog: true,
  side: THREE.DoubleSide,
});
```
当我们已经拿到`fog`的属性时，就可以在`shader`中运用了，运用如下：
```glsl
#ifdef USE_FOG                                            =
float depth = gl_FragCoord.z / gl_FragCoord.w;
float fogFactor = smoothstep( fogNear, fogFar, depth );
gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );    //z越小,颜色越暗
#endif
```

> `gl_FragCoord.w` 是裁剪空间 `clip.w` 的倒数即 `1/clip.w` , 由上面的透视投影矩阵的推导过程可以看出，为了凑透视除法， `clip.w` 值就是 眼坐标系 `z` 值的负数，也就是距离相机的距离。
> - 1.由上,我们可以知道`gl_FragCoord.z / gl_FragCoord.w`就表示当前片元和`camera`之间的距离即深度;
> - 2.再由`smoothstep( fogNear, fogFar, depth )`来得到一个平滑的因子`fogFactor`,深度越大，该因子值越大。
> - 3.再通过`mix`来混合得到最终的`rgb`值
> 
> `GLSL`内置`mix`函数介绍
> `mix(x,y,a)`  `a`控制混合结果 `return x(1-a) +y*a ` 返回 线性混合的值
> 即`fogFactor`值越大，`fogColor`占比越大。假设`fogColor`为黑色，那么综合上面所讲，这三句代码的意思就是越远越暗，符合我们对雾效的定义和预期。


![QQ20230914-091122-HD (1).gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1694655716200-eaf0e3b1-485e-4302-b8db-9d77badd5bfd.gif#averageHue=%23a3c0bf&clientId=u6b349f1b-0df3-4&from=drop&id=ue16f288d&originHeight=370&originWidth=724&originalType=binary&ratio=1&rotation=0&showTitle=false&size=9329580&status=done&style=none&taskId=u3a412016-c299-4a37-b421-a68386a3fe3&title=)

# 31. Animated galaxy 你好！银河
## 介绍
您还可以在粒子中使用着色器。正如我们在“粒子”课程中所看到的，为了性能原因，对几何体的每个顶点进行动画处理不是一种有效的解决方案。这就是 GPU 的作用，通过在顶点着色器中直接对这些顶点进行动画处理。
在本课程中，我们将从我们的粒子星系开始。我们将在顶点着色器中对粒子进行动画处理，使星星以不同的速度旋转，具体取决于中心距离，并且我们将在粒子上画出一个图案，而不是那些丑陋的正方形。
## 设置
启动器与Galaxy Generator课程启动器几乎相同。唯一的区别是缺少旋转公式，因为我们将在着色器中执行旋转动画。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1694657897513-f2cb8f6c-c0be-4165-8441-87b08f11176b.png#averageHue=%23e09f81&clientId=uf56e130c-7148-4&from=paste&height=1120&id=u5df870af&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1855345&status=done&style=none&taskId=ue92127a1-9f3a-4768-be5c-284599a3b65&title=&width=1792)
## 用 ShaderMaterial 替换 PointsMaterial
粒子当前使用 `PointsMaterial` [，](https://threejs.org/docs/index.html#api/en/materials/PointsMaterial)但如果我们想编写自己的着色器，则需要使用 `ShaderMaterial` [。](https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial)
替换`PointsMaterial`为`ShaderMaterial`：
```javascript
material = new THREE.ShaderMaterial({
    // ...
})
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1694657905427-aa0dcfda-58e6-4471-b26f-031aa399c55a.png#averageHue=%231c0100&clientId=uf56e130c-7148-4&from=paste&height=1120&id=ue12385b1&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=972888&status=done&style=none&taskId=ud5f7b5df-a4ff-4cd0-8249-0c4517c4f57&title=&width=1792)
如果您查看日志，您应该会看到两个警告，告诉我们 `ShaderMaterial`[既不](https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial)支持`size`也不支持`sizeAttenuation`。我们必须自己添加这些功能。现在，删除这些属性：
```javascript
material = new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
})
```
此时此刻，有些人可能会看到像小红点一样的颗粒，而有些人可能会看到黑屏。这取决于您的 GPU 在未提供尺寸时如何处理粒子。我们不会在这上面浪费时间，因为无论如何我们都会给出一个尺寸，每个人都应该看到颗粒。
显然，我们需要提供自己的着色器。添加以下内容`vertexShader`：
```javascript
material = new THREE.ShaderMaterial({

    // ...

    vertexShader: `
        void main()
        {
            /**
             * Position
             */
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;
            gl_Position = projectedPosition;

            /**
             * Size
             */
            gl_PointSize = 2.0;
        }
    `
})
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1694657913238-3360acb3-bd72-47a2-8e9e-b54e9561c938.png#averageHue=%23330100&clientId=uf56e130c-7148-4&from=paste&height=1120&id=u01f3dfd4&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1064043&status=done&style=none&taskId=ud6bc203c-f3f9-4152-b9d7-b819f720848&title=&width=1792)
着色器的开头与我们之前已经看到的相同。我们通过依次使用`modelMatrix`、`viewMatrix`和`projectionMatrix`来更新位置。但是，我们还为`gl_PointSize`分配了一个名为`2.0`的新变量。
`gl_PointSize`就像你可能想的那样。粒子将具有`2x2`的大小，无论相机的距离如何，您都应该看到`2x2`的粒子。
这里的单位是片段（`fragments`），如果您使用像素比例为1的普通屏幕，您将得到2像素乘以2像素，因为1个片段=1个像素。但是，如果您使用像素比率更高的屏幕，比如`Retina`屏幕，1个片段将小于1个像素，您将得到较小的粒子。我们稍后会解决这个问题，以确保在任何像素比例下获得一致的结果。
在我们改进粒子大小之前，让我们先改变颜色。
目前粒子是红色的，因为我们没有提供任何`fragmentShader`，而Three.js使用了一个默认的`fragmentShader`，其输出为红色。
添加以下带有白色颜色的`fragment shader`：
```javascript
material = new THREE.sh({

        // ...

        fragmentShader: `
            void main()
            {
                gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
            }
        `
    })
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1694657919395-ad3bbd83-692d-47e8-a00c-090c88175f87.png#averageHue=%23333333&clientId=uf56e130c-7148-4&from=paste&height=1120&id=uf5ef929c&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1020021&status=done&style=none&taskId=u2761312e-2aed-47f3-8164-c9cf2e8af0d&title=&width=1792)
所有颗粒都应该是白色的。
## 将着色器移至单独的文件
现在是将着色器移至单独文件的绝佳时机，以免它们变得太长且难以管理。
在 `/src/` 中，创建一个`shaders/`，然后在`galaxy/`其中创建一个文件夹。
在该文件夹中，创建一个`vertex.glsl`包含`vertexShader`属性内容的文件：
```glsl
void main()
{
    /**
     * Position
     */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    /**
     * Size
     */
    gl_PointSize = 2.0;
}
```
还有一个`fragment.glsl`：
```glsl
void main()
{
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
```
项目配置已经支持`.glsl`文件。我们只需要在 `JavaScript` 中导入它们，并在材质中使用它们：
```javascript
import galaxyVertexShader from './shaders/galaxy/vertex.glsl'
import galaxyFragmentShader from './shaders/galaxy/fragment.glsl'

// ...

material = new THREE.ShaderMaterial({
    // ...

    vertexShader: galaxyVertexShader,
    fragmentShader: galaxyFragmentShader
})
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1694657928467-3da20bb8-e9eb-4992-8331-fd2ad06f1de1.png#averageHue=%23323131&clientId=uf56e130c-7148-4&from=paste&height=1120&id=uc79fe707&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1017158&status=done&style=none&taskId=u2d775a92-d0d3-4bae-bf6b-512e1004bae&title=&width=1792)
结果应该是一样的。
您不需要将着色器放在单独的文件中，但这是一个很好的做法，并且语法着色可能会防止您犯错误。
另外，如果您按照上一课中的建议安装了 `linter`，则在刷新之前您会看到潜在的错误。
## 处理尺寸
### 底座尺寸
首先，我们将为每个粒子添加一个基本尺寸，并且我们希望能够通过 JavaScript 更改该值。为此，让我们使用制服将常用`uniforms uSize`属性添加到我们的材质中：
```javascript
material = new THREE.ShaderMaterial({

    // ...

    uniforms:
    {
        uSize: { value: 8 }
    },

    // ...
})
```
我们现在可以检索 `gl_PointSize`  中的值并在 `vertexShader` 中使用它：
```glsl
uniform float uSize;
        
void main()
{
    // ...

    gl_PointSize = uSize;
}
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1694657934719-f4781992-2377-4329-8a27-916f0e4a88b4.png#averageHue=%23828181&clientId=uf56e130c-7148-4&from=paste&height=1120&id=u6a32d49b&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=552842&status=done&style=none&taskId=ue1ac750e-6a85-49ee-a9dd-b5dfa511397&title=&width=1792)
它们在这里看起来很大，但很快就会看起来更小。
### 随机大小
在现实生活中，星星有不同的大小。让我们添加一些随机性。我们希望为每个顶点关联一个不同的值。我们将使用一个属性。
向几何图形添加`aScale`属性。我们已经有了`position`和一个`color`属性，我们可以按照相同的说明轻松添加新属性：
```javascript
geometry = new THREE.BufferGeometry()

const positions = new Float32Array(parameters.count * 3)
const colors = new Float32Array(parameters.count * 3)
const scales = new Float32Array(parameters.count * 1)

// ...

for(let i = 0; i < parameters.count; i++)
{
    // ...

    // Scale
    scales[i] = Math.random()
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
```
在创建`Float32Array`和`BufferAttribute`时，请确保使用`1`而不是`3`，因为该值是一个浮点数，而不是像其他属性一样是`vec3`——我们每个顶点只需要一个值。我们还将属性命名为`aScale`，并在前面添加了`a`。
您可能会想要将`position`和`color`属性更改为`aPosition`和`aColor`，但这样会导致错误，因为我们正在使用`ShaderMaterial`，它会在我们的顶点着色器中添加一些代码，类似于`attribute vec3 position;` 和 `attribute vec3 color;`。
现在，我们可以在顶点着色器中检索属性，并将`uSize`与之相乘：
```glsl
uniform float uSize;

attribute float aScale;

void main()
{
    // ...

    gl_PointSize = uSize * aScale;
}
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1694657942920-6db3bf9a-2253-4b30-968d-52c100732502.png#averageHue=%235b5b5b&clientId=uf56e130c-7148-4&from=paste&height=1120&id=uf49f1d8e&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=985323&status=done&style=none&taskId=ue5c1b15e-9403-459b-8f38-60bb12810ea&title=&width=1792)
您应该看到具有随机大小的粒子。
### 固定像素比例
然而，我们的粒子有一个问题。它们的大小取决于屏幕的像素比。请记住，我们使用以下行更新了渲染器的像素比：
```javascript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
```
如果您的屏幕像素比例为1，粒子看起来会比像素比例为2的屏幕大两倍。
我们需要找到一种解决方案，以使粒子的大小与像素比例无关。
有多种方法可以实现这一点。最简单的方法是将`uSize`值乘以渲染器的像素比例。我们可以使用`getPixelRatio()`方法获取此像素比例：
```javascript
material = new THREE.ShaderMaterial({

    // ...

    uniforms:
    {
        uSize: { value: 8 * renderer.getPixelRatio() }
    }

    // ...
})
```
很不幸，这段代码可能无法正常工作，因为我们在创建材质`material`之前已经创建了渲染器`renderer`。要修复这个问题，只需将第一次调用 `generateGalaxy` 移动到实例化渲染器`renderer`之后即可：
```javascript
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

// ...

/**
 * Generate the first galaxy
 */
generateGalaxy()
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1694657951150-162012c7-bc7c-4f3f-8aa3-f8d37172daad.png#averageHue=%235f5f5f&clientId=uf56e130c-7148-4&from=paste&height=1120&id=u1773a088&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=985516&status=done&style=none&taskId=u56c78ae6-a69a-4689-8a3c-cd8a828305f&title=&width=1792)
现在，无论像素比如何，我们的粒子看起来都一样。
### 尺寸衰减

我们删除了 `sizeAttenuation` 属性，因为 [ShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial) 不支持它。我们需要自己应用这个大小衰减效果。
作为提醒，大小衰减会使距离相机较远的粒子变小，而接近相机的粒子变大，从而模拟透视效果。
我们不会尝试猜测正确大小的公式，而是直接进入 Three.js 依赖文件夹，并获取处理 [PointsMaterial](https://threejs.org/docs/index.html#api/en/materials/PointsMaterial) 代码中此部分的代码。
虽然 Three.js 库文件夹中有很多代码，但它们都经过良好的组织和易于导航。请不要犹豫花费一些时间去了解它并熟悉它。
您可以在 `/node_modules/three/src/renderers/shaders/ShaderLib/point_vert.glsl.js` 中找到处理此部分的着色器代码，它应该如下所示：

```glsl
#ifdef USE_SIZEATTENUATION

    bool isPerspective = isPerspectiveMatrix( projectionMatrix );

    if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );

#endif
```
我们唯一需要的部分是这个：
```glsl
gl_PointSize *= ( scale / - mvPosition.z );
```
为了获得大小衰减效果，我们需要将` gl_PointSize` 乘以以下公式：`scale / -mvPosition.z`。
根据 Three.js 的说明，`scale` 是与渲染高度相关的值。为了简化问题，我们可以将其替换为 `1.0`。
`mvPosition` 对应于在应用了模型矩阵和视图矩阵之后的顶点位置。在我们的情况下，它是我们的 `viewPosition` 变量。
这可能听起来有点复杂，但我们可以这样书写：
```glsl
gl_PointSize = uSize * aScale;
gl_PointSize *= (1.0 / - viewPosition.z);
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1694657960011-29208010-a325-49b7-860e-c8c563ce8811.png#averageHue=%231f1f1f&clientId=uf56e130c-7148-4&from=paste&height=1120&id=ua39b95e8&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=966966&status=done&style=none&taskId=u77effe22-273e-4227-a74d-1b9b4b04c73&title=&width=1792)
将相机靠近颗粒以观察它们变大的情况。我们有我们的尺寸衰减。
## 绘制我们的粒子图案
是时候画一个更好看的粒子了。就像在“着色器模式”课程中一样，我们首先需要 UV 坐标。遗憾的是，我们无法将顶点着色器中的 UV 传递到片元着色器中。请记住，顶点着色器控制每个粒子的位置，并且生成一个面向相机的正方形平面出现在顶点的位置。
好消息是，在片元着色器中，我们已经可以通过 `gl_PointCoord` 得到 `UV` 坐标。这个变量是特定于粒子的。
在片元着色器中添加它以查看结果：
```glsl
void main()
{
    gl_FragColor = vec4(gl_PointCoord, 1.0, 1.0);
}
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1694657970676-430343f7-9d6a-4d77-9260-c3c9b283a4bd.png#averageHue=%232c2d06&clientId=uf56e130c-7148-4&from=paste&height=1120&id=u2f42cf60&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1835988&status=done&style=none&taskId=ufe53c4b9-5652-4bd7-9509-58ce7da1856&title=&width=1792)
您应该在每个粒子上看到常见的 UV 图案。
现在是您尝试绘制一些星形的好时机。您可以从光盘开始，然后是点光源，为什么不是卡通中的星形或任何您想要的东西。请记住，这需要练习才能做到这一点，您的第一次尝试可能无法完成工作，但您仍然会获得经验。
### 圆盘图案
为了得到一个圆盘：

1. 获取 `gl_PointCoord` 与中心位置 `(vec2(0.5))` 的距离。
2. 应用一个阶梯函数，如果距离小于 `0.5` 则返回 `0.0`，如果距离大于`0.5` 则返回 `1.0`。
3. 反转得到的值。

接下来，我们可以使用这个值`strength`来表示颜色的 r、g 和 b 值的强度：
```glsl
void main()
{
    // Disc
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = step(0.5, strength);
    strength = 1.0 - strength;

    gl_FragColor = vec4(vec3(strength), 1.0);
}
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1694657977895-fc8d61c7-eb9d-4303-b90f-05fceb38bda7.png#averageHue=%231e1e1e&clientId=uf56e130c-7148-4&from=paste&height=1120&id=u873486d3&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1009000&status=done&style=none&taskId=u8e88fe8a-d01e-4a96-842e-bd8f25661f2&title=&width=1792)
### 漫射点图案
为了得到一个漫反射点：

1. 获取 `gl_PointCoord` 与中心位置 `(vec2(0.5))` 的距离。
2. 将距离乘以`2.0`，使其在接触边缘之前达到 `1.0`。
3. 反转得到的值。
```glsl
void main()
{
    // Diffuse point
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength *= 2.0;
    strength = 1.0 - strength;

    gl_FragColor = vec4(vec3(strength), 1.0);
}
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1694657984910-e9e99ac8-2e8f-4df9-8583-b06eb2957d4a.png#averageHue=%230e0e0e&clientId=uf56e130c-7148-4&from=paste&height=1120&id=uca70d14a&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1068670&status=done&style=none&taskId=u68602d2e-ed9c-4378-92a7-f4f88410876&title=&width=1792)
这样好多了，但仍然缺乏现实感。我们在这里缺少的是一个非常强烈且快速变暗的中心。
### 光点图案
要获得光点：

- 求`gl_PointCoord`与中心 `(vec2(0.5))`之间的距离。
- 反转值。
- 对其进行高次幂运算，可以选择一个较大的数值。



```glsl
void main()
{
    // Light point
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 10.0);

    gl_FragColor = vec4(vec3(strength), 1.0);
}
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1694657993698-a6bb0598-57fd-4dbf-81e1-0b3b5ac6b780.png#averageHue=%23040404&clientId=uf56e130c-7148-4&from=paste&height=1120&id=u94254b99&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=745930&status=done&style=none&taskId=ueb01e42c-b191-4c44-93df-a8e99f915f2&title=&width=1792)
该解决方案的好处是我们可以通过`pow()`值控制发光的凝聚程度。
我们将坚持这种模式。因为灯光看起来更小，所以我们增加一点`uSize`：
```javascript
material = new THREE.ShaderMaterial({
    
    // ...

    uniforms:
    {
        uSize: { value: 30 * renderer.getPixelRatio() }
    },

    // ...
})
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1694658004750-2f564282-c75e-42c0-af13-c340383511e5.png#averageHue=%23100f0f&clientId=uf56e130c-7148-4&from=paste&height=1120&id=uaed9b8f8&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1288219&status=done&style=none&taskId=u49603a2c-524a-4fb9-b808-c83f7f89787&title=&width=1792)
不幸的是，我们已经达到了某些计算机的性能限制，您可能会遇到帧速率下降的情况。如果是这样，请减少颗粒数量或其尺寸。
## 处理颜色
我们在处理过程中丢失了颜色。好消息是，我们的着色器部分支持这些颜色，我们只需要使用它们的值。
要获取`color`颜色属性，我们应该在顶点着色器中编写类似以下的代码：
```glsl
attribute vec3 color;
```
但由于我们使用的是 `ShaderMaterial` 而不是 `RawShaderMaterial`，所以没有必要这样做。这段代码会在着色器编译时自动添加。我们只需要将它发送到片元着色器即可。为此，我们将使用一个名为 `vColor` 的 `varying`，并使用颜色属性更新该 `varying`：
```glsl
// ...

varying vec3 vColor;

void main()
{
    // ...

    /**
     * Color
     */
    vColor = color;
}
```
然后，在片元着色器中，我们可以使用相同的 `varying` 声明来获取这个颜色，并将其用于在黑色和 `vColor` 之间进行 `mix(...)`，根据强度进行混合：
```glsl
varying vec3 vColor;

void main()
{
    // Light point
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 10.0);

    // Final color
    vec3 color = mix(vec3(0.0), vColor, strength);
    gl_FragColor = vec4(color, 1.0);
}
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1694658012773-e8e392ee-a6d0-4bf4-838e-534b89ba5923.png#averageHue=%23050302&clientId=uf56e130c-7148-4&from=paste&height=1120&id=ud40d4aa8&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1474995&status=done&style=none&taskId=ucf20d050-485a-42aa-9d08-c97fe561924&title=&width=1792)
现在你看到了原来的颜色。
## 动画
是时候制作动画了。首先，我们将使用通常的`uTime`制服。将其添加到制服并在`tick`函数中更新其值：
```javascript
material = new THREE.ShaderMaterial({

    // ...

    uniforms:
    {
        uTime: { value: 0 },
        uSize: { value: 30 * renderer.getPixelRatio() }
    },
    
    // ...
})

// ...

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update material
    material.uniforms.uTime.value = elapsedTime

    // ...
}
```
然后我们可以添加`uTime`到我们的着色器中：
```glsl
uniform float uTime;
```
动画效果会很一般。我们将使星星旋转，但越靠近中心，旋转速度越快。
以下代码将在顶点着色器的 `modelPosition` 声明之后发生。提醒一下，`modelPosition` 是应用了网格的位置、旋转和缩放后的顶点位置。现在我们需要更新这个变量。
下面是具体流程：

1. 计算粒子相对于银河中心的角度和距离。
2. 使用相对于中心的距离和 `uTime` 来增加角度。离中心越远，旋转速度越慢。
3. 根据新的角度更新位置。

我们将使用一些三角函数。
旋转仅在 `x` 和 `z` 轴上发生，而 `y` 轴的值可以保持不变，这样大大简化了整个过程。
首先，使用 `atan(...)` 函数来获取角度值：
```glsl
vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                
// Rotate
float angle = atan(modelPosition.x, modelPosition.z);
```
`atan`代表反正切，您可以在这里找到更多相关信息：[https://thebookofshaders.com/glossary/ ?search=atan](https://thebookofshaders.com/glossary/?search=atan)
然后，使用向量的长度`length()`来获取`xz`点距中心的距离：
```glsl
vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                
// Rotate
float angle = atan(modelPosition.x, modelPosition.z);
float distanceToCenter = length(modelPosition.xz);
```
然后，我们计算偏移角度。正如我们之前所说，越靠近中心，角度就越大。我们还将该值自身乘以`uTime*0.2`，以减慢效果：
```glsl
vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                
// Rotate
float angle = atan(modelPosition.x, modelPosition.z);
float distanceToCenter = length(modelPosition.xz);
float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
```
如果你已经有了一个角度偏移量 `angleOffset`，那么将其应用于基础角度值，可以通过将两者相加来实现。
```glsl
vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                
// Rotate
float angle = atan(modelPosition.x, modelPosition.z);
float distanceToCenter = length(modelPosition.xz);
float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
angle += angleOffset;
```
最后，我们使用余弦函数和正弦函数更新`modelPosition`模型在 x 和 z 轴上的位置。
```glsl
vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                
// Rotate
float angle = atan(modelPosition.x, modelPosition.z);
float distanceToCenter = length(modelPosition.xz);
float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
angle += angleOffset;
modelPosition.x = cos(angle);
modelPosition.z = sin(angle);
```
![tutieshi_640x400_3s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1694658393254-4fc01320-8967-4a5e-818d-237d1dad8d5c.gif#averageHue=%23010000&clientId=uf56e130c-7148-4&from=drop&id=ue99b184d&originHeight=400&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=257180&status=done&style=none&taskId=u7c623acd-a2d2-42e5-903b-466e920a462&title=)

虽然这看起来很不错，但它并不是预期的结果。`cos(...) `和 `sin(...)` 返回的是半径为`1`的圆上的位置。这就是为什么所有粒子看起来都围绕一个圆柱体旋转。
要解决这个问题，我们可以简单地将 `cos(...)` 和 `sin(...)` 乘以顶点的初始半径，而我们已经通过 `distanceToCenter` 得到了它：
```glsl
vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                
// Rotate
float angle = atan(modelPosition.x, modelPosition.z);
float distanceToCenter = length(modelPosition.xz);
float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
angle += angleOffset;
modelPosition.x = cos(angle) * distanceToCenter;
modelPosition.z = sin(angle) * distanceToCenter;
```
![tutieshi_640x400_6s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1694658423074-ff220638-c866-4131-99a8-cb74dd38d9ad.gif#averageHue=%23575242&clientId=uf56e130c-7148-4&from=drop&id=u987c5ac5&originHeight=400&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=4147040&status=done&style=none&taskId=u3097cd9d-d70b-4078-bc16-6808801ec39&title=)

所有顶点都应该漂亮地旋转。
## 修复随机性
如果稍等一下，您会看到星星似乎形成了一条丝带形状。就像随机性在`x`和`z`轴上不再起作用一样。这是由于旋转公式将恒星拉伸成旋转模式。
为了解决这个问题，我们可以删除属性`position`的随机性，将其保存在名为`aRandomness` 的新属性中。然后在顶点着色器中旋转星星后应用此随机性。
创建属性并将随机性存储在其中。不要忘记消除随机性`positions`：
```javascript
geometry = new THREE.BufferGeometry()

const positions = new Float32Array(parameters.count * 3)
const randomness = new Float32Array(parameters.count * 3)

// ...

for(let i = 0; i < parameters.count; i++)
{
    // ...

    positions[i3    ] = Math.cos(branchAngle) * radius
    positions[i3 + 1] = 0
    positions[i3 + 2] = Math.sin(branchAngle) * radius

    randomness[i3    ] = randomX
    randomness[i3 + 1] = randomY
    randomness[i3 + 2] = randomZ

    // ...
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))

// ...
```
在顶点着色器中，检索属性并将其应用到`modelPosition`应用旋转后的`xyz`顶点着色器中：
```glsl
// ...

attribute vec3 aRandomness;
attribute float aScale;

 // ...

void main()
{
    /**
     * Position
     */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Rotate
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
    angle += angleOffset;
    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    // Randomness
    modelPosition.xyz += aRandomness;

    // ...
}
```

![tutieshi_640x400_5s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1694658468338-5358c81d-ba78-44e8-aa2a-a3f480e1a6ae.gif#averageHue=%233e382c&clientId=uf56e130c-7148-4&from=drop&id=u006ffa39&originHeight=400&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=6490712&status=done&style=none&taskId=ub26c43eb-8342-46c6-82f8-ed0ae89cb75&title=)
结果应该看起来好多了，丝带形状应该消失了。
减少随机性参数以获得更好的结果：
```javascript
parameters.randomness = 0.2
```
## ![tutieshi_640x400_5s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1694658273841-496fcbfe-14cf-4acc-a869-48024a152644.gif#averageHue=%23030202&clientId=uf56e130c-7148-4&from=drop&id=ue7599641&originHeight=400&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3748317&status=done&style=none&taskId=u9a0acdca-733b-420b-9b8a-95a54d66742&title=)
## 走得更远
您还可以将`uSize`制服添加到调试面板。
几分钟后，我们就无法完全区分星系分支。您可以添加重置按钮或减慢速度。
星系的中心通常有一个巨大的黑洞。为什么不尝试创建一个呢？

# 32. Modified materials改性材料


## 介绍
到目前为止，我们一直在创建全新的着色器材质。但是如果我们只想修改 Three.js 内置材质之一怎么办？[也许我们对MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)的结果感到满意，但我们想为其添加顶点动画。如果我们要重写整个[MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)，则需要花费太多时间来处理灯光、环境贴图、基于物理的渲染、所有类型的纹理等。
[相反，我们将从MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)开始，尝试将我们的代码集成到其着色器中。
有两种方法可以做到这一点：

- 通过使用在编译着色器之前触发的 Three.js 钩子，让我们可以使用着色器并注入我们的代码。
- 通过将材质重新创建为全新材质，但遵循 Three.js 代码中所做的操作，然后使用相同的参数以及我们想要添加的参数。

虽然第二个选项是完全可以接受的，但我们需要在 Three.js 源代码中花费大量时间来了解如何正确设置所有内容。
相反，我们将使用第一种技术。我们仍然会花一些时间在 Three.js 代码上，但它会容易得多。
在本课中，我们将使模型顶点以一种有趣的方式扭曲，但材质的所有基本特征仍然有效，如阴影、纹理、法线贴图等。
## 设置

我们将使用与真实模型渲染课程相同的设置，但使用著名的Lee Perry-Smith头部模型。它只是一种流行的模型，只有一个网格和逼真的纹理，应该与我们的扭曲动画配合得很好。

加载和基础材料设置都已完成。在加载模型之前创建了一个带有贴图和法线贴图的[MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)。然后将此材质用于模型的唯一Mesh[网格。](https://threejs.org/docs/#api/en/objects/Mesh)这个[网格](https://threejs.org/docs/#api/en/objects/Mesh)最终被添加到场景中。
以下大部分代码将涉及材料。
## 材料钩子函数 Hooking the material
我们有[MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)，但我们想修改它的着色器。
要修改材质，我们首先需要访问其原始着色器。为此，我们可以使用 `material` 的 `onBeforeCompile` 属性。
如果我们给它赋予一个函数，那么在编译之前，这个函数将被调用，并以着色器选项作为第一个参数：
```javascript
material.onBeforeCompile = (shader) =>
{
    console.log(shader)
}
```
现在我们可以访问 `vertexShader`、`fragmentShader` 和 `uniforms`，并且可以修改它们并查看结果。
## 将内容添加到顶点着色器
如果你通过`console.log(shader)`查看属性`vertexShader`顶点着色器，你会发现代码并不多。Three.js 使用自己的系统来包含着色器部分，以防止在不同的材质之间重复相同的代码。每个 `#include ...` 语句都会插入 Three.js 依赖库特定文件夹中的代码。
这在某种程度上对我们来说是合适的，因为我们可以用简单的本地 JavaScript 的 `replace(...)` 方法替换这些部分。
问题是，我们不知道哪部分代码是做什么的，应该替换哪部分。要理解代码，我们需要深入了解 Three.js 依赖项。
转到 `/node_modules/three/src/renderers/shaders/` 文件夹。那里有大部分 Three.js 的着色器代码。
所有包含的部分被称为 `chunks`，并且你可以在 `ShaderChunk/` 文件夹中找到它们。
如果我们查看不同的 `chunks`，似乎 `begin_vertex` 部分首先处理位置，通过创建一个名为 `transformed` 的变量。
让我们建立我们的代码在此基础上。首先，我们需要替换这部分代码。因为 `chunk` 的名称是 `begin_vertex`，我们需要替换掉`#inlcude <begin_vertex>`：
```javascript
material.onBeforeCompile = (shader) =>
{
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '')
}
```
这应该会破坏`Material`材质，因为我们用空字符串替换了之前的代码。我们的代码将只有几行，所以我们将使用反引号。
先把` include ...` 放回去，不要破坏任何东西：
```javascript
material.onBeforeCompile = (shader) =>
{
    shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
            #include <begin_vertex>
        `
    )
}
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1694867598485-d7f86e3d-e4d1-4b4b-ba0d-01c21eab037e.png#averageHue=%236c5849&clientId=u3b9a3dca-fdc1-4&from=paste&height=1120&id=u0a2c3cbe&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1882614&status=done&style=none&taskId=ufb47db3e-4729-47a6-8463-da679c8ba57&title=&width=1792)
这段代码是没有用的，因为我们用相同的东西替换了原来的内容，但是现在我们可以在 include 之后添加自己的代码。
举个例子，让我们将头部沿着 `y` 轴移动。我们在 `/node_modules/three/src/renderers/shaders/ShaderChunks/begin_vertex.glsl.js` 文件中看到，创建了一个名为 `transformed` 的变量，应该包含顶点的位置。通过修改它的 `y` 属性来移动所有的顶点：
```javascript
shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    `
        #include <begin_vertex>

        transformed.y += 3.0;
    `
)
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1694867814570-94e95e5d-f91e-40f3-81c5-bc3ab37c6b12.png#averageHue=%23695643&clientId=u3b9a3dca-fdc1-4&from=paste&height=1120&id=u6a0cc5c6&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1918546&status=done&style=none&taskId=ufcbfa661-01ad-4bba-8980-afdc6bf22d1&title=&width=1792)
正如您所看到的，它正在工作，但阴影似乎出现了问题。我们稍后会解决这个问题。
删除`transformed.y += 3.0;`.
## 扭转 Twisting
让我们在顶点上进行扭曲。有多种数学方法可以实现扭曲效果，这一次，我们将创建一个矩阵。
以下代码中仅出现 GLSL 部分。
首先，我们将尝试以相同的角度旋转所有顶点。然后我们将根据顶点的高程偏移该角度并为其设置动画。
创建一个`angle`具有任意值的变量：
```glsl
#include <begin_vertex>

float angle = 0.3;
```
即使我们还没有移动顶点，你仍然可以刷新查看是否出现错误。
如果记得的话，矩阵就像一个管道，你通过它发送数据 - 就像一个向量。管道会对该向量应用变换，并输出结果。我们可以创建一个缩放向量的矩阵，一个旋转矩阵，一个移动矩阵，甚至可以将它们组合在一起。这些矩阵可以处理二维变换、三维变换，甚至更多。
在我们的例子中，我们想要进行二维变换。事实上，我们的顶点具有三维坐标，但为了进行扭曲动画，我们只是围绕 x 轴和 z 轴旋转顶点，不涉及 y 轴的上下旋转。
要创建二维旋转矩阵，我们不会深入数学细节。相反，我们将使用这个函数来返回一个二维矩阵（mat2）：
```glsl
mat2 get2dRotateMatrix(float _angle)
{
    return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
}
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695084389367-a21e1bd0-0f22-40a9-8f60-d54de47e6b73.png#averageHue=%23f3f3f3&clientId=uf40f9cb8-029f-4&from=paste&height=110&id=ua9124cdc&originHeight=110&originWidth=586&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17029&status=done&style=none&taskId=u260c4bec-5714-4061-ace3-62eb9e5baca&title=&width=586)
如果你想了解更多，可以在 The Book of Shaders 上找到详细信息： https: [//thebookofshaders.com/08/](https://thebookofshaders.com/08/)
但是我们到底应该在哪里添加这个功能呢？如果它是我们自己的着色器，我们会将其放在`main`函数之前，而这正是我们要做的。函数之外的一大块`main`是`common`. 该块的优点是存在于所有着色器上。让我们像替换块一样替换这部分`begin_vertex`：
```javascript
material.onBeforeCompile = (shader) =>
{
    shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
            #include <common>
        `
    )

    // ...
}
```
我们现在可以在我们的`'#include <common>'`里添加`get2dRotateMatrix`：
```javascript
material.onBeforeCompile = (shader) =>
{
    shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
            #include <common>

            mat2 get2dRotateMatrix(float _angle)
            {
                return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
            }
        `
    )

    // ...
}
```
虽然没有什么变化，但我们现在可以在着色器的任意位置使用 `get2dRotateMatrix` 函数了，就像在 `begin_vertex` 代码块中一样。这是因为所有的代码块都被合并成一个代码块。
使用 `get2dRotateMatrix` 函数创建 `rotateMatrix` 变量：
```glsl
#include <begin_vertex>

float angle = 0.3;
mat2 rotateMatrix = get2dRotateMatrix(angle);
```
我们现在可以使用一个名为 `rotateMatrix` 的矩阵来旋转一个 `vec2` 向量。让我们将这个矩阵应用到 `x` 和 `z` 属性上：
```glsl
#include <begin_vertex>

float angle = 0.3;
mat2 rotateMatrix = get2dRotateMatrix(angle);

transformed.xz = rotateMatrix * transformed.xz;
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695085850886-cd2ccd26-b097-4747-995a-db785adebb20.png#averageHue=%236d5a4a&clientId=uf40f9cb8-029f-4&from=paste&height=1120&id=uc6957d88&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1904347&status=done&style=none&taskId=ua2957e93-9327-4a51-a9fe-ea0be180daa&title=&width=1792)
头部应该进行旋转。同样，不要担心阴影；我们稍后会处理这个问题。
我们几乎完成了扭曲旋转的部分。我们只需要根据仰角`angle`变化角度即可：
```glsl
float angle = position.y * 0.9;
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695085892227-57aadbd8-162b-4cd0-8641-4127867f9ba4.png#averageHue=%23534336&clientId=uf40f9cb8-029f-4&from=paste&height=1120&id=u9420d4ff&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1782138&status=done&style=none&taskId=u0addea3a-4e27-4e7b-b376-e177fa70fe1&title=&width=1792)
可怜的头。是时候为角度设置动画了。
## 动画化
我们将使用与之前相同的技术，向着色器传递一个名为 `uTime` 的 `uniform`。我们已经可以通过 `shader.uniforms` 访问到 `uniforms`。让我们以与更新 [ShaderMaterial](https://threejs.org/docs/#api/en/materials/ShaderMaterial) 相同的方式更新它：
```javascript
material.onBeforeCompile = function(shader)
{
    shader.uniforms.uTime = { value: 0 }

    // ...
}
```
我们现在可以在`common`块中检索我们的`uTime`制服：
```glsl
#include <common>

uniform float uTime;

mat2 get2dRotateMatrix(float _angle)
{
    return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
}
```
并在`begin_vertex`块中使用它：
```glsl
#include <begin_vertex>

float angle = (position.y + uTime) * 0.9;
mat2 rotateMatrix = get2dRotateMatrix(angle);

transformed.xz = rotateMatrix * transformed.xz;
```
您应该得到相同的结果，因为我们没有为该`uTime`值设置动画。不幸的是，我们遇到了 JavaScript 问题。我们没有明显的方法来访问函数中的统一`tick`。[与ShaderMaterial](https://threejs.org/docs/#api/en/materials/ShaderMaterial)不同，我们不能只访问`uniformsof material`，这是由于 Three.js 结构的原因。
有很多方法可以解决这个问题。我们所需要的只是获得这些制服。让我们`customUniforms`在材质之前创建一个对象并添加我们的uTime内部：
```glsl
const customUniforms = {
    uTime: { value: 0 }
}
```
然后，我们在onBeforeCompile函数中使用该对象：
```javascript
material.onBeforeCompile = (shader) =>
{
    shader.uniforms.uTime = customUniforms.uTime

    // ...
}
```
因为 `ourcustomUniforms`已在`onBeforeCompile`范围之外声明，所以我们可以简单地使用`elapsedTime`变量在`tick`函数中更新它：
```javascript
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update material
    customUniforms.uTime.value = elapsedTime

    // ...
}
```
![tutieshi_640x400_6s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1695086379469-aa4a7629-d7ef-45b8-a7cb-5c0a7c754302.gif#averageHue=%23524233&clientId=uf40f9cb8-029f-4&from=drop&id=ub51874ed&originHeight=400&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=9640839&status=done&style=none&taskId=u033a49e0-0769-4144-8164-79527d56577&title=)
现在，头部正在旋转。
下面让我们修复阴影。
## 修复阴影
正如我们在之前的课程中所看到的，当使用阴影时，Three.js 会从光源的视角对场景进行渲染。这些渲染会生成阴影或光照下的场景的图片。当进行这些渲染时，所有的材质都会被专门用于该光影渲染的另一组材质替换。问题是，这种类型的材质不会发生扭曲，因为它与我们修改后的 [MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial) 没有关系。
我们可以尝试在头部后面添加一个平面来验证这一点：
```javascript
/**
 * Plane
 */
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 15, 15),
    new THREE.MeshStandardMaterial()
)
plane.rotation.y = Math.PI
plane.position.y = - 5
plane.position.z = 5
scene.add(plane)
```
![tutieshi_640x400_6s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1695087326335-a9b26f3e-d254-49f3-9d6b-3a090fff86a8.gif#averageHue=%23645951&clientId=uf40f9cb8-029f-4&from=drop&id=u3ab4772c&originHeight=400&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=4947489&status=done&style=none&taskId=u0356c9b7-b785-4662-95a0-f61b98790ad&title=)
我们需要找到一种方法来扭曲这个材质。
用于阴影的材质是 [MeshDepthMaterial](https://threejs.org/docs/#api/en/materials/MeshDepthMaterial)，我们无法轻易地访问到该材质，但是我们可以通过在网格上使用 `customDepthMaterial` 属性来覆盖它，以告诉 Three.js 使用自定义材质。
首先，让我们创建一个自定义材质。我们将使用 [MeshDepthMaterial](https://threejs.org/docs/#api/en/materials/MeshDepthMaterial)，因为这正是 Three.js 在这些渲染中使用的材质。我们将称之为 `depthMaterial`，并将 `depthPacking` 属性设置为 `THREE.RGBADepthPacking`：
```javascript
const depthMaterial = new THREE.MeshDepthMaterial({
    depthPacking: THREE.RGBADepthPacking
})
```
在这里我们不会详细解释 `depthPacking` 是什么，但它只是一种更好的方法，通过单独使用 r、g、b 和 a 来存储深度，以获得更好的精度。Three.js 需要这个配置。
为了应用我们的自定义深度材质，在模型加载完成后，我们将 `customDepthMaterial` 属性更改为我们自己的 `depthMaterial`：
```javascript
gltfLoader.load(
    '/models/LeePerrySmith/LeePerrySmith.glb',
    (gltf) =>
    {
        // ...

        mesh.material = material // Update the material
        mesh.customDepthMaterial = depthMaterial // Update the depth material

        // ...
    }
)
```
在这里，我们只对模型中的一个网格进行了操作，但如果我们有一个更复杂的模型，包含多个网格，我们将需要遍历并更新所有的材质。
现在，我们可以将之前对着色器所做的所有更改应用到 `depthMaterial` 上。
请将 `onBeforeCompile` 的部分复制粘贴过来：
```javascript
depthMaterial.onBeforeCompile = (shader) =>
{
    shader.uniforms.uTime = customUniforms.uTime
    shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
            #include <common>

            uniform float uTime;

            mat2 get2dRotateMatrix(float _angle)
            {
                return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
            }
        `
    )
    shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
            #include <begin_vertex>

            float angle = (position.y + uTime) * 0.9;
            mat2 rotateMatrix = get2dRotateMatrix(angle);

            transformed.xz = rotateMatrix * transformed.xz;
        `
    )
}
```
如果你观察平面上的阴影，你也应该看到阴影有扭曲。但我们仍然有一个问题。阴影的旋转动画很好，但模型上的核心阴影似乎不对，看起来阴影随着顶点旋转。
![tutieshi_640x400_8s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1695087975507-7f67df03-fb4f-415f-92dd-3ca3648d0124.gif#averageHue=%23615750&clientId=uf40f9cb8-029f-4&from=drop&id=u6d27793a&originHeight=400&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3882143&status=done&style=none&taskId=udce48f68-58f1-4344-81cc-d0d1d39abe5&title=)
这是一个与**法线**相关的问题。
## 修复法线
在前面的课程中，我们看到法线是与每个顶点关联的坐标，它告诉我们面朝什么方向。如果我们看到这些法线，它们将是整个模型上指向外部的箭头。这些法线用于照明、反射和阴影等。
当我们旋转顶点时，我们只是旋转了位置，但没有旋转法线。我们需要修改处理法线的块。
等一下，这部分有点棘手。
负责处理法线的代码块首先被称为 `beginnormal_vertex`。让我们将其替换为材质中的代码块，而不是 `depthMaterial`，因为后者不需要法线：

```javascript
material.onBeforeCompile = (shader) =>
{
    // ...

    shader.vertexShader = shader.vertexShader.replace(
        '#include <beginnormal_vertex>',
        `
            #include <beginnormal_vertex>
        `
    )

    // ...
}
```
如果您查看位于` /node_modules/three/src/renderers/shaders/ShaderChunks/beginnormal_vertex.glsl.js` 的代码块，您会发现法线变量的名称是 `objectNormal`。我们可能会尝试做与转换变量相同的事情：
```glsl
#include <beginnormal_vertex>

float angle = (position.y + 4.0) * sin(uTime) * 0.9;
mat2 rotateMatrix = get2dRotateMatrix(angle);

objectNormal.xz = rotateMatrix * objectNormal.xz;
```
很不幸，这将导致着色器错误，并显示以下消息：
> 'angle' : 重定义和 'rotateMatrix' : 重定义。

这是因为我们忘记了所有这些着色器代码块最终都会合并成一个唯一的着色器。我们在 `beginnormal_vertex` 代码块中添加的代码将与添加到 `begin_vertex` 的代码并排放置，而我们不能有两个具有相同名称的变量声明。
我们需要删除重复的声明。如果您查看初始的 `vertexShader`，您会发现 `beginnormal_vertex` 在 `begin_vertex` 之前。这意味着我们应该从 `begin_vertex` 中移除 `angle` 和 `rotateMatrix` 代码块：
```javascript
material.onBeforeCompile = function(shader)
{
    // ...

    shader.vertexShader = shader.vertexShader.replace(
        '#include <beginnormal_vertex>',
        `
            #include <beginnormal_vertex>

            float angle = (position.y + uTime) * 0.9;
            mat2 rotateMatrix = get2dRotateMatrix(angle);

            objectNormal.xz = rotateMatrix * objectNormal.xz;
        `
    )
    shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
            #include <begin_vertex>

            transformed.xz = rotateMatrix * transformed.xz;
        `
    )
}
```
![tutieshi_640x400_12s (1).gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1695088777254-d8b1f5c4-3ec8-47f0-8a55-62ef4e7ad347.gif#averageHue=%23776960&clientId=uf40f9cb8-029f-4&from=drop&id=u228fa1a2&originHeight=400&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2625013&status=done&style=none&taskId=u0c36cf9c-925b-48f8-9ac9-6790c9c4eba&title=)
现在应该一切正常了，我们的 `begin_vertex` 正在使用来自 `beginnormal_vertex` 代码块的 `angle` 和 `rotateMatrix`。
## 更进一步
我们的课程到此结束，但如果您愿意，您可以进一步了解。
您可以使用调试面板甚至鼠标来控制扭曲。
您可以测试其他动画。例如，这个公式看起来更令人不安 - 确保同时更改`material`和`depthMaterial`：
```glsl
float angle = (sin(position.y + uTime)) * 0.4;
```
![tutieshi_640x400_8s (1).gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1695089647130-3545dd93-5ed2-4c99-bf80-6cf9aa148de8.gif#averageHue=%23796a63&clientId=uf40f9cb8-029f-4&from=drop&id=uaf8c3731&originHeight=400&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3547065&status=done&style=none&taskId=u13714450-e3e4-4bd2-a085-6588163dcb1&title=)
您还可以改进我们处理 GLSL 代码的方式。拥有专用文件可能会很方便。

# 33.  Post-processing后期处理


## 介绍 [00:00](https://threejs-journey.com/lessons/post-processing#)
后处理是指在最终图像（渲染）上添加效果。人们主要在电影制作中使用这种技术，但我们也可以在 WebGL 中做到这一点。
后期处理可以通过细微的处理来稍微改善图像或创建巨大的效果。
以下是一些可以使用后处理的示例：

- 景深
- 盛开
- 神雷
- 运动模糊
- 毛刺效应
- 概要
- 颜色变化
- 抗锯齿
- 反射和折射
- ETC。
## 设置 [01:24](https://threejs-journey.com/lessons/post-processing#)
我们将使用与真实模型渲染课程相同的设置，但使用[Leonardo Carrion的](https://www.artstation.com/theblueturtle)[损坏头盔](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/DamagedHelmet)模型。这是一个流行的模型，具有许多细节和良好的纹理，应该与我们的后期处理相得益彰。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695090797326-d4ccee08-f40d-41bf-8b22-ec0fdc8fde74.png#averageHue=%23645644&clientId=uf40f9cb8-029f-4&from=paste&id=ua3d7ce4b&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u14cf9fb0-8835-4125-9136-1fbaeb1b50c&title=)
## 怎么运行的 [01:57](https://threejs-journey.com/lessons/post-processing#)
大多数时候，后处理的工作方式是相同的。
### 渲染目标
我们不是在画布中渲染，而是在所谓的渲染目标中进行渲染。该渲染目标将为我们提供与通常纹理非常相似的纹理。以更简单的方式，我们在纹理而不是屏幕上的画布中进行渲染。
术语“渲染目标”特定于 Three.js。其他上下文主要使用“缓冲区”一词。
然后将该纹理应用于面向相机并覆盖整个视图的平面。该平面使用带有特殊片段着色器的材质来执行后处理效果。如果后处理效果包括使图像变红，则它只会乘以该片段着色器中像素的红色值。
大多数后期处理效果不仅仅只是调整颜色值，但您已经明白了。
在 Three.js 中，这些“效果”称为“通道”。从现在开始我们将引用该术语。
### 乒乓缓冲
我们可以在后期处理中进行多次处理：一次进行运动模糊，一次进行颜色变化，一次进行景深等。因为我们可以进行多次处理，所以后期处理需要两个渲染目标。原因是我们无法在绘制渲染目标的同时获取其纹理。这个想法是在第一个渲染目标中绘制，同时从第二个渲染目标中获取纹理。在下一个通道中，我们切换这些渲染目标，从第二个渲染目标中获取纹理，然后在第一个渲染目标上进行绘制。在下一次传递时，我们再次切换它们，一次又一次。这就是我们所说的乒乓缓冲。
### 画布上的最后一次传递
最后一次不会出现在渲染目标中，因为我们可以将其直接放在画布上，以便用户可以看到最终结果。
### 到底
所有这些对于初学者来说可能非常复杂，但幸运的是，我们不必自己做。
实际上，我们甚至可以在不解释那些渲染目标、纹理、乒乓缓冲等的情况下开始，但了解幕后真正发生的事情总是好的。
我们所要做的就是使用[EffectComposer](https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer)类，它将为我们处理大部分繁重的工作。
## 效果作曲家 [13:11](https://threejs-journey.com/lessons/post-processing#)
正如我们所说，[EffectComposer](https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer)将处理创建渲染目标、执行乒乓操作、将前一通道的纹理发送到当前通道、在画布上绘制最后一个等的所有过程。
首先，我们需要导入它，因为它在THREE变量中不可用：
```javascript
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
```
我们还需要一个名为 的第一遍RenderPass。此通道负责场景的第一次渲染，但不是在画布中进行，而是在 EffectComposer 内创建的渲染目标中[进行](https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer)：
```javascript
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
```
我们现在可以实例化[EffectComposer](https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer)并使用我们的rendereras 参数。与[WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)一样，我们需要使用 提供像素比setPixelRatio(...)并使用 调整其大小setSize(...)。我们将使用与以下相同的参数renderer：
```javascript
/**
 * Post processing
 */
const effectComposer = new EffectComposer(renderer)
effectComposer.setSize(sizes.width, sizes.height)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
```
然后我们可以实例化我们的第一遍并将其添加到我们的方法effectComposer中addPass(...)。RenderPass 需要scene和camera作为参数：
```javascript
const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)
```
在该tick函数中，我们将使用 来实现渲染，而不是像以前那样进行渲染effectComposer。将其替换renderer.render(...)为以下代码：
```javascript
const tick = () =>
{
    // ...

    // Render
    // renderer.render(scene, camera)
    effectComposer.render()

    // ...
}
```
将effectComposer开始使用乒乓球及其渲染目标进行渲染。但因为我们只有一个通道——the——renderPass它会像以前一样直接在画布中渲染它。
是时候添加一些简洁的后处理通道了。
您可以在文档中找到可用通道的列表：[https://thirdjs.org/docs/index.html#examples/en/postprocessing/EffectComposer](https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer)
我们将使用其中的一些来看看如何进行设置，然后我们将创建自己的通行证。
## 点屏通行证 [22:06](https://threejs-journey.com/lessons/post-processing#)
将DotScreenPass应用某种黑白光栅效果。我们只需要导入DotScreenPass：
```javascript
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'
```
实例化它并将其添加到effectComposer. 确保将其添加到以下内容之后renderPass：
```javascript
const dotScreenPass = new DotScreenPass()
effectComposer.addPass(dotScreenPass)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695090797262-98263361-f772-4736-9c63-a1dec211ce43.png#averageHue=%231b1b1b&clientId=uf40f9cb8-029f-4&from=paste&id=u85eaaf27&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud1d45d96-2e04-433a-850b-08e9157356d&title=)
要禁用通行证，只需对其进行注释或将其enabled属性更改为false：
```javascript
const dotScreenPass = new DotScreenPass()
dotScreenPass.enabled = false
effectComposer.addPass(dotScreenPass)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695090797162-6cb1e12c-af62-42a7-995f-cf13d9015862.png#averageHue=%23645644&clientId=uf40f9cb8-029f-4&from=paste&id=u85f9dbcb&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=udfc11dcf-4256-4e8b-a850-e4d3b2bd428&title=)
用它来分别测试不同的通道。
## 故障通道 [23:44](https://threejs-journey.com/lessons/post-processing#)
这GlitchPass会增加屏幕故障，就像电影中摄像机被黑一样。
导入它并添加它，就像DotScreenPass：
```javascript
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'

// ...

const glitchPass = new GlitchPass()
effectComposer.addPass(glitchPass)
```
有些通道还具有可编辑属性。它们GlitchPass有一个goWild属性，如果true，将导致不间断的故障：
如果您对闪光或快速移动敏感，请务必小心！
```javascript
glitchPass.goWild = true
```
## RGB移位通道 [25:41](https://threejs-journey.com/lessons/post-processing#)
有些通道需要额外的工作，例如 RGBShift 通道。
RGBShift 不能作为通道使用，而是作为着色器使用。我们需要导入这个着色器并将其应用到 a ShaderPass，然后将此 ShaderPass 添加到effectComposer. 这正是在DotScreenPass和 中发生的事情GlitchPass，但这次我们必须自己做。
首先，导入ShaderPass和RGBShiftShader位于three/examples/jsm/shaders/：
```javascript
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
```
然后ShaderPass使用RGBShiftShaderas 参数实例化并将其添加到effectComposer：
```javascript
// ...

const rgbShiftPass = new ShaderPass(RGBShiftShader)
effectComposer.addPass(rgbShiftPass)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695090799114-9344c9fd-0c9d-42cb-9c8c-342a9deda1c6.png#averageHue=%232a2213&clientId=uf40f9cb8-029f-4&from=paste&id=u7ab090df&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uc5eded90-174d-474d-86e1-f19ad47ac19&title=)
就这样。
## 修复颜色 [28:34](https://threejs-journey.com/lessons/post-processing#)
您可能已经注意到渲染中的颜色变化，就好像一切都变暗了，您是对的。禁用以前的着色器dotScreenPass和 以便使用- 不使用rgbShiftPass可以更清楚地看到它。glitchPassgoWild
这里发生的事情是renderer.colorSpace = THREE.SRGBColorSpace不再起作用了。你可以评论它，你会发现没有什么区别。通道在渲染目标中进行渲染，并且这些通道不以相同的方式支持色彩空间。
我们需要再添加一个名为 的通道GammaCorrectionShader，用于将颜色空间转换为 SRGB。
此通行证的工作方式与通行证完全相同RGBShiftShader。首先，我们需要导入它：
```javascript
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
```
然后，我们可以ShaderPass用 theGammaCorrectionShader作为参数来实例化 a。确保将其作为最后一遍进行：
```javascript
// ...

const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
effectComposer.addPass(gammaCorrectionPass)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695090797208-6e4fd055-f87d-40f9-b66e-50bca387f6f7.png#averageHue=%235a673d&clientId=uf40f9cb8-029f-4&from=paste&id=ue4f0c377&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue0d06a49-f2ba-4001-8ee4-b3ca8b5b0d7&title=)
颜色应该是固定的。
如果您想了解有关 Gamma 颜色校正的更多信息，请查看这篇《[每个程序员都应该了解 Gamma》](https://blog.johnnovak.net/2016/09/21/what-every-coder-should-know-about-gamma/)一文。
## 调整大小 [33:02](https://threejs-journey.com/lessons/post-processing#)
将窗口缩小到最小分辨率，刷新并将分辨率增加到最大尺寸。一切看起来都应该很糟糕，就像我们拉伸的小图像一样。
这是因为[EffectComposer](https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer)及其通道需要调整大小。我们还需要设置适当的像素比，就像我们为renderer.
在回调函数中，像实例化[EffectComposer](https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer)时一样window.addEventListener('resize', ...)调用setSize(...)和方法：setPixelRatio(...)
```javascript
window.addEventListener('resize', () =>
{
    // ...

    // Update effect composer
    effectComposer.setSize(sizes.width, sizes.height)
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
```
您可以根据需要调整窗口大小；分辨率应该没问题。
## 修复抗锯齿 [36:05](https://threejs-journey.com/lessons/post-processing#)
还有另一个功能似乎停止工作。如果您查看头盔上的边缘，您会发现锯齿又回来了 - 如果您使用的屏幕的像素比高于1，您可能看不到问题。
当心; 如果您只有可用的renderPass，则不会看到问题，因为渲染是在具有抗锯齿支持的画布中完成的。至少启用一次才能看到问题。
[这是因为EffectComposer](https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer)使用的渲染目标不支持默认的抗锯齿。我们有四个可用选项：

- 告别抗锯齿。
- 提供我们自己的渲染目标，我们在其上添加抗锯齿，但这不适用于所有现代浏览器。
- 使用通道进行抗锯齿，但性能较差且结果略有不同。
- 前面两个选项的组合，我们测试浏览器是否支持渲染目标上的抗锯齿，如果不支持，我们使用抗锯齿通道。

事情突然变得复杂起来。
### 将抗锯齿添加到渲染目标
默认情况下，[EffectComposer](https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer)使用不带抗锯齿的[WebGLRenderTarget 。](https://threejs.org/docs/?q=rendertarget#api/en/renderers/WebGLRenderTarget)
幸运的是，我们可以提供自己的渲染目标作为 的第二个参数EffectComposer。我们将首先提供相同的渲染目标并确保一切正常。然后，我们将添加抗锯齿。
如果您查看位于中的[EffectComposer](https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer)的代码，/node_modules/three/examples/jsm/postprocessing/EffectComposer.js您将看到renderTarget使用特定参数进行实例化。
前两个参数是width和height。setSize(...)我们可以使用随机值，因为当函数被调用时渲染目标将被调整大小effectComposer：
```javascript
const renderTarget = new THREE.WebGLRenderTarget(
    800,
    600
)
```
然后，我们可以将其发送renderTarget至effectComposer：
```javascript
const effectComposer = new EffectComposer(renderer, renderTarget)
```
我们应该得到完全相同的结果，但现在我们可以控制渲染目标。
WebGLRenderTarget类实际上可以接收第三个参数，该参数是一个对象[并且](https://threejs.org/docs/?q=rendertarget#api/en/renderers/WebGLRenderTarget)包含一些选项。
我们需要提供的唯一选项是samples启用抗锯齿的属性：
```javascript
const renderTarget = new THREE.WebGLRenderTarget(
    800,
    600,
    {
        samples: 2
    }
)
```
样本越多，抗锯齿效果越好，0相当于完全没有样本。请注意，该值的每次增加都会降低性能。
正如我们前面所说，如果用户的像素比率高于1，则像素密度已经足够高，无法区分锯齿。在这种情况下，我们实际上并不需要抗锯齿，我们应该让samples属性1.
renderer我们可以从以下内容中检索像素比samples: renderer.getPixelRatio()：
```javascript
const renderTarget = new THREE.WebGLRenderTarget(
    800,
    600,
    {
        samples: renderer.getPixelRatio() === 1 ? 2 : 0
    }
)
```
就是这样！
遗憾的是，这并不适用于所有浏览器。这是 WebGL 2 支持的问题。人们几年前更新了 WebGL，浏览器也慢慢添加了对不同功能的支持。您可以在此处查看支持情况：[https://caniuse.com/#feat=webgl2](https://caniuse.com/#feat=webgl2)
在撰写本课程时，Safari 和 iOS Safari 等主流浏览器最近才支持它。
### 使用抗锯齿通道
让我们评论该samples属性，以便正确测试抗锯齿通过：
```javascript
const renderTarget = new THREE.WebGLRenderTarget(
    800,
    600,
    {
        // samples: renderer.getPixelRatio() === 1 ? 2 : 0
    }
)
```
我们对于抗锯齿通道有不同的选择：

- FXAA：性能良好，但结果只是“还可以”并且可能很模糊
- SMAA：通常比 FXAA 更好，但性能较差 — 不要与 MSAA 混淆
- SSAA：质量最好但性能最差
- TAA：表现良好但结果有限
- 还有许多其他人。

选择最佳的抗锯齿通道取决于性能和视觉期望。尝试它们，直到您对以合理的帧速率看到的内容感到满意为止。
在本课中，我们将讨论 SMAA。
前面我们说过应该gammaCorrectionPass在最后添加 ，但是抗锯齿通道应该添加在它之后以便优化它。
导入SMAAPass、实例化它并将其添加到effectComposer：
```javascript
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'

// ...

const smaaPass = new SMAAPass()
effectComposer.addPass(smaaPass)
```
别名应该消失了。
### 结合两个解决方案
samples我们之前添加到[WebGLRenderTarget](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderTarget)的属性的一个很酷的事情是，如果它不受支持（因为浏览器正在使用 WebGL 1），它将被忽略而不会触发任何错误。
这意味着我们可以这样设置，并且SMAAPass仅当用户的屏幕像素比等于1且其配置不支持 WebGL 2 时才添加。
要了解浏览器是否支持 WebGL 2，我们可以capabilities使用renderer. 此属性包含有关支持内容的许多详细信息。我们需要的属性是isWebGL2：
```javascript
if(renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2)
{
    const smaaPass = new SMAAPass()
    effectComposer.addPass(smaaPass)

    console.log('Using SMAA')
}
```
我们在每个浏览器上都能得到一张漂亮的图片，而且缺点也很小。
如果你想用 WebGL1 测试你的代码，你可以用[WebGL1Renderer替换你的](https://threejs.org/docs/?q=WebGL1Renderer#api/en/renderers/WebGL1Renderer)[WebGLRenderer](https://threejs.org/docs/?q=WebGLRender#api/en/renderers/WebGLRenderer)：
```javascript
const renderer = new THREE.WebGL1Renderer({
    // ...
})
```
完成测试后，不要忘记将其放回去。
## 虚幻BloomPass [01:04:16](https://threejs-journey.com/lessons/post-processing#)
让我们回到我们的通行证，可能是最酷的一个，UnrealBloomPass。
此通道将为我们的渲染添加光晕，看起来令人惊叹。它对于重建光辉、火焰、激光、光剑或放射性物质等东西很有用。
导入UnrealBloomPass并将其添加到effectComposer：
```javascript
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

// ...

const unrealBloomPass = new UnrealBloomPass()
effectComposer.addPass(unrealBloomPass)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695090804890-6b8b4e2d-9097-497e-b7a6-b290092a80dd.png#averageHue=%23e8d6c8&clientId=uf40f9cb8-029f-4&from=paste&id=u158425a2&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u1df2590a-3fa3-4ba3-a3b0-d8d875138b5&title=)
一切都显得太明亮了。我们需要调整一些参数。主要有3个参数：

- strength: 发光有多强。
- radius：亮度可以传播多远。
- threshold：达到什么光度极限时，物体开始发光。

使用以下参数并将调整添加到您的 Dat.GUI：
```javascript
unrealBloomPass.strength = 0.3
unrealBloomPass.radius = 1
unrealBloomPass.threshold = 0.6

gui.add(unrealBloomPass, 'enabled')
gui.add(unrealBloomPass, 'strength').min(0).max(2).step(0.001)
gui.add(unrealBloomPass, 'radius').min(0).max(2).step(0.001)
gui.add(unrealBloomPass, 'threshold').min(0).max(1).step(0.001)
```
这可能太亮了，但你明白了。
## 创建我们自己的通行证 [01:07:18](https://threejs-journey.com/lessons/post-processing#)
创建我们自己的通道就像制作自定义着色器一样简单。
### 色调通行证
我们将从一个轻松的通道开始，让我们可以控制色调。
首先，我们创建一个着色器。着色器是一个具有以下属性的简单对象：

- uniforms：与我们使用的制服格式相同。
- vertexShader：这个几乎总是相同的代码，并将飞机放在视图前面。
- fragmentShader：将进行后处理效果的片段着色器。

让我们用最少的代码创建该着色器：
```javascript
const TintShader = {
    uniforms:
    {
    },
    vertexShader: `
        void main()
        {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        void main()
        {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `
}
```
然后我们创建通行证并将ShaderPass其添加到我们的effectComposer：
```javascript
const tintPass = new ShaderPass(TintShader)
effectComposer.addPass(tintPass)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695090810715-06095cad-06e6-475a-b32c-3bac35007a1d.png#averageHue=%23fa0300&clientId=uf40f9cb8-029f-4&from=paste&id=u5ccf723b&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uebcb6fac-4704-430f-85f3-819bcff5869&title=)
屏幕应该变成红色，因为我们的片段着色器将 屏幕设置gl_FragColor为红色。
我们需要从上一个通道获取纹理。该纹理会自动存储在tDiffuse制服中。我们必须为制服添加一个null值[——EffectComposer](https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer)将更新它——并在 中检索该值fragmentShader：
```javascript
const TintShader = {
    uniforms:
    {
        tDiffuse: { value: null }
    },

    // ...

    fragmentShader: `
        uniform sampler2D tDiffuse;
        
        void main()
        {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `
}
```
现在我们已经有了上一遍的纹理，我们需要检索像素，就像我们在上一课中所做的那样。要从（纹理）获取像素sampler2D，我们需要使用texture2D(...). 它需要纹理作为第一个参数，UV 坐标作为第二个参数。
问题是我们现在没有这些 UV 坐标。我们需要像往常一样创建一个包含来自顶点着色器的varying命名：vUvuv
```javascript
const TintShader = {

    // ...

    vertexShader: `
        varying vec2 vUv;

        void main()
        {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            vUv = uv;
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;

        varying vec2 vUv;

        void main()
        {
            vec4 color = texture2D(tDiffuse, vUv);
            gl_FragColor = color;
        }
    `
}
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695090811771-d2eadb0c-42a2-4faa-b6bb-d8023c245371.png#averageHue=%23645644&clientId=uf40f9cb8-029f-4&from=paste&id=ue0b934c9&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u1e879459-2956-4fd1-b47a-a3b3c9f8114&title=)
渲染回来了。但现在，我们可以使用fragmentShader.
要更改色调，请使用r、g和b属性color：
```javascript
const TintShader = {

    // ...

    fragmentShader: `
        uniform sampler2D tDiffuse;

        varying vec2 vUv;

        void main()
        {
            vec4 color = texture2D(tDiffuse, vUv);
            color.r += 0.1;

            gl_FragColor = color;
        }
    `
}
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695090811862-25d2589a-87a6-4cba-a164-1ffece22b0e4.png#averageHue=%238b624b&clientId=uf40f9cb8-029f-4&from=paste&id=u15cb52f7&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u54116d59-137d-4e56-9665-0c2df14cfb0&title=)
为了更进一步，让我们创建一个制服来控制色调。首先，将 添加uTint到uniforms：
```javascript
const TintShader = {
    uniforms:
    {
        tDiffuse: { value: null },
        uTint: { value: null }
    },

    // ...

    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec3 uTint;

        varying vec2 vUv;

        void main()
        {
            vec4 color = texture2D(tDiffuse, vUv);
            color.rgb += uTint;

            gl_FragColor = color;
        }
    `
}
```
正如您所看到的，我们将值设置为null。不要直接在着色器对象中设置值。创建通道后，您必须在材质上设置它们，因为着色器旨在多次使用 - 即使您不这样做。它就像通行证的模板：
```javascript
const tintPass = new ShaderPass(TintShader)
tintPass.material.uniforms.uTint.value = new THREE.Vector3()
```
然后我们可以将调整添加到 Dat.GUI 中：
```javascript
gui.add(tintPass.material.uniforms.uTint.value, 'x').min(- 1).max(1).step(0.001).name('red')
gui.add(tintPass.material.uniforms.uTint.value, 'y').min(- 1).max(1).step(0.001).name('green')
gui.add(tintPass.material.uniforms.uTint.value, 'z').min(- 1).max(1).step(0.001).name('blue')
```
### 位移通行证
让我们尝试另一个自定义通行证。这次，我们不会摆弄颜色，而是使用 UV 来产生我们所说的位移。
创建一个名为 的新着色器DisplacementShader，然后创建一个名为 的新通道并将其添加displacementPass到：ShaderPasseffectComposer
```javascript
const DisplacementShader = {
    uniforms:
    {
        tDiffuse: { value: null }
    },
    vertexShader: `
        varying vec2 vUv;

        void main()
        {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            vUv = uv;
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;

        varying vec2 vUv;

        void main()
        {
            vec4 color = texture2D(tDiffuse, vUv);

            gl_FragColor = color;
        }
    `
}

const displacementPass = new ShaderPass(DisplacementShader)
effectComposer.addPass(displacementPass)
```
现在，让我们创建一个newUv基于vUv但有一些变形的：
```javascript
const DisplacementShader = {

    // ...

    fragmentShader: `
        uniform sampler2D tDiffuse;

        varying vec2 vUv;

        void main()
        {
            vec2 newUv = vec2(
                vUv.x,
                vUv.y + sin(vUv.x * 10.0) * 0.1
            );
            vec4 color = texture2D(tDiffuse, newUv);

            gl_FragColor = color;
        }
    `
}
```
在这里，我们仅sin(...)在y基于x轴的轴上应用 a。您应该看到渲染效果在波动。
让我们为其制作动画。添加uTime制服：
```javascript
const DisplacementShader = {
    uniforms:
    {
        tDiffuse: { value: null },
        uTime: { value: null }
    },
    
    // ...

    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;

        varying vec2 vUv;

        void main()
        {
            vec2 newUv = vec2(
                vUv.x,
                vUv.y + sin(vUv.x * 10.0 + uTime) * 0.1
            );
            vec4 color = texture2D(tDiffuse, newUv);

            gl_FragColor = color;
        }
    `
}
```
0创建通道后将其值设置为：
```javascript
const displacementPass = new ShaderPass(DisplacementShader)
displacementPass.material.uniforms.uTime.value = 0
effectComposer.addPass(displacementPass)
```
和往常一样，在tick函数中更新它：
```javascript
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update passes
    displacementPass.material.uniforms.uTime.value = elapsedTime

    // ...
}
```
波浪现在已动画化。
### 未来界面位移
我们可以使用纹理来代替正弦位移。您可以在 中找到一个非常朴素的蜂巢未来界面，具有正常的纹理/static/textures/interfaceNormalMap.png。
添加uNormalMap制服：
```javascript
const DisplacementShader = {
    uniforms:
    {
        // ...
        uNormalMap: { value: null }
    },

    // ...
}
```
在加载纹理时更新它——TextureLoader[已经](https://threejs.org/docs/index.html#api/en/loaders/TextureLoader)在代码中了：
```javascript
displacementPass.material.uniforms.uNormalMap.value = textureLoader.load('/textures/interfaceNormalMap.png')
```
现在更新fragmentShader DisplacementShader：
```javascript
const DisplacementShader = {
    // ...

    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;
        uniform sampler2D uNormalMap;

        varying vec2 vUv;

        void main()
        {
            vec3 normalColor = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
            vec2 newUv = vUv + normalColor.xy * 0.1;
            vec4 color = texture2D(tDiffuse, newUv);

            vec3 lightDirection = normalize(vec3(- 1.0, 1.0, 0.0));
            float lightness = clamp(dot(normalColor, lightDirection), 0.0, 1.0);
            color.rgb += lightness * 2.0;

            gl_FragColor = color;
        }
    `
}
```
我们不会透露这里发生的情况，因为这不是实现此效果的正确方法，但您应该看到引人注目的界面位移。遗憾的是，纹理适合屏幕，如果你的分辨率不成比例，它看起来不会很好。不用担心，反正只是为了节目。
## 走得更远 [01:35:36](https://threejs-journey.com/lessons/post-processing#)
您现在可以做的是尝试其他通行证，如果您有一些想法或者您想尝试一些事情，则可能会添加新的自定义通行证。
请记住，您添加的每个通道都必须在每个帧上渲染。这可能会带来严重的性能缺陷。
您还可以将自定义通道分离到不同的文件中，甚至拆分文件中的着色器.glsl。这样，您可以获得更干净且可重用的代码。
