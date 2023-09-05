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
我们没有尝试的一件有用的事情是将这些形状放入函数中。我们可以使用正确的参数创建一个getCircle函数、一个`getSquare`函数等，以便轻松地重用它们。
继续练习，不要害怕创造新的形状，进行实验，并在需要时寻求帮助。
另外，尝试添加一些制服来为值设置动画或向调试面板添加一些调整。

