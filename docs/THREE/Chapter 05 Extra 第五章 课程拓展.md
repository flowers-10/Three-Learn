# 
# 33.  Post processing后期处理
## 介绍
后处理是指在最终图像（渲染）上添加效果。人们主要在电影制作中使用这种技术，但我们也可以在 WebGL 中做到这一点。
后期处理可以通过细微的处理来稍微改善图像或创建巨大的效果。
以下是一些可以使用后处理的示例：

- 景深 Depth of field
- 绽放效果 Bloom
- 神光效果 God ray
- 运动模糊 Motion blur
- 毛刺效果 Glitch effect
- 轮廓线 Outlines
- 颜色变化 Color variations
- 抗锯齿 Antialiasing
- 反射和折射 Reflections and refractions
- ETC。
## 设置
我们将使用与真实模型渲染课程相同的设置，但使用[Leonardo Carrion的](https://www.artstation.com/theblueturtle)[损坏头盔](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/DamagedHelmet)模型。这是一个流行的模型，具有许多细节和良好的纹理，应该与我们的后期处理相得益彰。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695090797326-d4ccee08-f40d-41bf-8b22-ec0fdc8fde74.png#averageHue=%23645644&clientId=uf40f9cb8-029f-4&from=paste&id=jyM49&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u14cf9fb0-8835-4125-9136-1fbaeb1b50c&title=)
## 怎么运行的
大多数时候，后处理的工作方式是相同的。
### 渲染目标
在 Three.js 中，我们不是直接在画布上进行渲染，而是使用我们称之为渲染目标（render target）的方式进行渲染。这个渲染目标会给我们一个与通常纹理非常相似的纹理。简单来说，我们是在纹理上进行渲染，而不是在屏幕的画布上渲染的（等于又增加了一层，就是这个后处理！）。
"渲染目标" 这个术语是特定于 Three.js 的，其他上下文中更常用的是 "缓冲区"（buffer）这个词。
然后，将这个纹理应用到一个面对着摄像机并覆盖整个视图的平面上。这个平面使用了一个带有特殊片段着色器的材质，该片段着色器会执行后处理效果。如果后处理效果是让图像变红，那么它只会在片段着色器中将像素的红色值乘以一个系数。
大多数后处理效果不仅仅是调整颜色值，但这就是后处理的基本原理。
在 Three.js 中，这些 "效果" 被称为 "通道"（passes）。从现在开始，我们将使用这个术语。
### Ping-pong乒乓缓冲
我们可以在后处理中进行多个通道：一个用于运动模糊，一个用于颜色变化，一个用于景深等。由于我们可以有多个通道，所以后处理需要两个渲染目标。原因是在绘制时无法同时获取渲染目标的纹理。思路是在**第一个渲染目标上进行绘制**，**同时从第二个渲染目标获取纹理**。在下一次通道时，我们切换这些渲染目标，从第二个获取纹理，并在第一个上进行绘制。再次进行下一次通道时，我们再次切换它们，如此往复。这就是我们所说的ping-pong缓冲。
### 画布上的最后一次传递
最后一次不会出现在渲染目标中，因为我们可以将其直接放在画布上，以便用户可以看到最终结果。
### 最终
所有这些对于初学者来说可能非常复杂，但幸运的是，我们不必自己做。
实际上，我们甚至可以在不解释那些渲染目标、纹理、乒乓缓冲等的情况下开始，但了解幕后真正发生的事情总是好的。
我们所要做的就是使用[EffectComposer](https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer)类，它将为我们处理大部分繁重的工作。
## `EffectComposer`
正如我们所说的，`EffectComposer`将处理创建渲染目标、进行`ping-pong`操作、将前一个通道的纹理传递给当前通道、在画布上绘制最后一个通道等所有过程。
首先，我们需要导入`EffectComposer`，因为它在`THREE`变量中不可用：
```javascript
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
```
我们还需要一个名为`RenderPass`的第一个通道。该通道负责对场景进行第一次渲染，但不是在画布上进行，而是在`EffectComposer`内部创建的渲染目标中进行：
```javascript
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
```
现在，我们可以实例化`EffectComposer`并使用我们的渲染器作为参数。与`WebGLRenderer`一样，我们需要使用`setPixelRatio(...)`提供像素比率，并使用`setSize(...)`调整大小。我们将使用与渲染器相同的参数：
```javascript
/**
 * Post processing
 */
const effectComposer = new EffectComposer(renderer)
effectComposer.setSize(sizes.width, sizes.height)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
```
然后，我们可以实例化第一个通道，并使用`addPass(...)`方法将其添加到`effectComposer`中。`RenderPass`需要场景和相机作为参数：
```javascript
const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)
```
在`tick`函数中，我们将不再像以前那样进行渲染，而是使用`effectComposer`来实现渲染。将`renderer.render(...)`替换为以下代码：
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
`effectComposer`将开始使用`ping-pong`缓冲和其渲染目标进行渲染。但是因为我们只有一个通道——`renderPass`——它会像以前一样直接在画布上进行渲染。
现在是时候添加一些不错的后期处理通道了。
您可以在文档中找到可用通道的列表：[https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer](https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer)
我们将使用其中一些通道来看看如何设置，并创建自己的通道。
## 点阵屏幕通道otScreenPass
`DotScreenPass`将应用某种黑白点阵效果。我们只需要导入`DotScreenPass`即可：
```javascript
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'
```
实例化`BloomPass`并将其添加到`effectComposer`中。请确保在`renderPass`之后添加它：
```javascript
const dotScreenPass = new DotScreenPass()
effectComposer.addPass(dotScreenPass)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695090797262-98263361-f772-4736-9c63-a1dec211ce43.png#averageHue=%231b1b1b&clientId=uf40f9cb8-029f-4&from=paste&id=m1VQE&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud1d45d96-2e04-433a-850b-08e9157356d&title=)
要禁用通行证，只需对其进行注释或将其`enabled`属性更改为`false`：
```javascript
const dotScreenPass = new DotScreenPass()
dotScreenPass.enabled = false
effectComposer.addPass(dotScreenPass)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695090797162-6cb1e12c-af62-42a7-995f-cf13d9015862.png#averageHue=%23645644&clientId=uf40f9cb8-029f-4&from=paste&id=AP9Bo&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=udfc11dcf-4256-4e8b-a850-e4d3b2bd428&title=)
用它来分别测试不同的通道。
## 故障通道GlitchPass
`GlitchPass`会添加屏幕故障效果，就像电影中相机被黑客攻击时的效果一样。
导入它并像导入`DotScreenPass`一样将其添加即可：
```javascript
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'

// ...

const glitchPass = new GlitchPass()
effectComposer.addPass(glitchPass)
```
![003.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1698973965368-65893afb-8e90-4db0-a61d-491cb3a4f3b9.gif#averageHue=%232b2216&clientId=ue0e8b020-d20b-4&from=drop&id=u8baef31d&originHeight=400&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=9075580&status=done&style=none&taskId=u02fb87c6-f7bd-4aad-88a5-574adcbcfbc&title=)
一些通道还具有可编辑的属性。`GlitchPass`具有一个`goWild`属性，如果设置为`true`，将导致不间断的故障效果：
如果您对闪光或快速动作敏感（光敏性癫痫），请小心！
```javascript
glitchPass.goWild = true
```
## RGB移位通道
一些通道需要额外的工作，比如 `RGBShift` 通道。
`RGBShift` 不是一个通道，而是一个着色器。我们需要导入这个着色器，并将其应用到一个 `ShaderPass` 上，然后将这个 `ShaderPass` 添加到 `effectComposer` 中。这其实也是 `DotScreenPass` 和 `GlitchPass` 中所发生的，但这次我们需要自己来做。
首先，导入位于 `three/examples/jsm/shaders/` 目录下的 `ShaderPass` 和 `RGBShiftShader`：
```javascript
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
```
然后，使用 `RGBShiftShader` 作为参数来实例化 `ShaderPass`，并将其添加到 `effectComposer` 中：
```javascript
// ...

const rgbShiftPass = new ShaderPass(RGBShiftShader)
effectComposer.addPass(rgbShiftPass)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695090799114-9344c9fd-0c9d-42cb-9c8c-342a9deda1c6.png#averageHue=%232a2213&clientId=uf40f9cb8-029f-4&from=paste&id=MsT8I&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uc5eded90-174d-474d-86e1-f19ad47ac19&title=)
就这样。
## 修复颜色
您可能已经注意到渲染中的颜色发生了变化，就好像整个画面变暗了一样，您是对的。禁用之前的 `dotScreenPass` 和 `rgbShiftPass`，只使用 `glitchPass`（不包含 `goWild`）来更清楚地看到这一点。
在这里发生的情况是 `renderer.colorSpace = THREE.SRGBColorSpace` 不再起作用。您可以将其注释掉，然后您将看不到任何区别。通道是在渲染目标中进行渲染的，而渲染目标不以相同的方式支持颜色空间。
我们需要添加一个名为 `GammaCorrectionShader` 的额外通道，它将把颜色空间转换为 `sRGB`。
该通道的用法与 `RGBShiftShader` 通道完全相同。首先，我们需要导入它：
```javascript
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
```
接下来，我们可以使用 `GammaCorrectionShader` 作为参数来实例化一个 `ShaderPass`。确保将其作为最后一个通道添加：
```javascript
// ...

const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
effectComposer.addPass(gammaCorrectionPass)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695090797208-6e4fd055-f87d-40f9-b66e-50bca387f6f7.png#averageHue=%235a673d&clientId=uf40f9cb8-029f-4&from=paste&id=c61eJ&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue0d06a49-f2ba-4001-8ee4-b3ca8b5b0d7&title=)
颜色应该是固定的。
如果您想了解有关 `Gamma` 颜色校正的更多信息，请查看这篇《[每个程序员都应该了解 Gamma》](https://blog.johnnovak.net/2016/09/21/what-every-coder-should-know-about-gamma/)一文。
## 调整大小
将窗口缩小到最小分辨率，刷新并将分辨率增加到最大尺寸。一切看起来都应该很糟糕，就像我们拉伸的小图像一样。
![006.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1698973994234-d96ecc00-fea6-46bc-a7cd-5e40a03176be.gif#averageHue=%23182538&clientId=ue0e8b020-d20b-4&from=drop&id=u265ad929&originHeight=400&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10782867&status=done&style=none&taskId=u62981e87-d1e8-4c6c-9c43-607eaf9070b&title=)
这是因为[EffectComposer](https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer)及其`pass`需要调整大小。我们还需要设置适当的像素比，就像我们为渲染器设置了一样。
`window.addEventListener('resize', ...)`回调函数中，调用`setSize(...)`和`setPixelRatio(...)`方法，就像我们在实例化[EffectComposer](https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer)时所做的那样
```javascript
window.addEventListener('resize', () =>
{
    // ...

    // Update effect composer
    effectComposer.setSize(sizes.width, sizes.height)
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
```
![007.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1698974002661-b359235f-0f4e-4495-8fa2-b37a34db2625.gif#averageHue=%23182639&clientId=ue0e8b020-d20b-4&from=drop&id=udce59984&originHeight=400&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8261980&status=done&style=none&taskId=u4d2a63b1-9999-4101-9909-428d306f00e&title=)
您可以根据需要调整窗口大小；分辨率应该没问题。
## 修复抗锯齿
有另一个功能似乎停止工作。如果您观察头盔的边缘，您会发现锯齿效果重新出现了——如果您使用的屏幕像素比大于1，您可能看不到这个问题。
请注意，如果只有 `renderPass` 可用，您将看不到这个问题，因为渲染是在具有抗锯齿支持的画布上进行的。启用至少一个通道以查看问题。
这是因为 `EffectComposer` 使用的渲染目标不支持默认的抗锯齿效果。我们有四个可用的选择：

1. 放弃抗锯齿效果。
2. 在我们自己的渲染目标上添加抗锯齿效果，但这在所有现代浏览器上都不起作用。
3. 使用通道实现抗锯齿效果，但性能较差，并且结果略有不同。
4. 结合前两个选项，测试浏览器是否支持渲染目标上的抗锯齿效果，如果不支持，则使用抗锯齿通道。

事情突然变得复杂起来。
### 将抗锯齿添加到渲染目标
默认情况下，[EffectComposer](https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer)使用不带抗锯齿的[WebGLRenderTarget 。](https://threejs.org/docs/?q=rendertarget#api/en/renderers/WebGLRenderTarget)
幸运的是，我们可以提供自己的渲染目标作为 `EffectComposer` 的第二个参数。我们将首先提供相同的渲染目标并确保一切正常。然后，我们将添加抗锯齿。
如果您查看位于中的[EffectComposer](https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer)的代码，`/node_modules/three/examples/jsm/postprocessing/EffectComposer.js`您将看到`renderTarget`使用特定参数进行实例化。
前两个参数是宽度和高度。我们可以使用随机值，因为当调用 `effectComposer` 的 `setSize(...) `函数时，渲染目标将重新调整大小：
```javascript
const renderTarget = new THREE.WebGLRenderTarget(
    800,
    600
)
```
然后，我们可以将`renderTarget`其发送至`effectComposer`：
```javascript
const effectComposer = new EffectComposer(renderer, renderTarget)
```
我们应该得到完全相同的结果，但现在我们可以控制渲染目标。
`WebGLRenderTarget`类实际上可以接收第三个参数，该参数是一个对象[并且](https://threejs.org/docs/?q=rendertarget#api/en/renderers/WebGLRenderTarget)包含一些选项。
我们需要提供的唯一选项是`samples`启用抗锯齿的属性：
```javascript
const renderTarget = new THREE.WebGLRenderTarget(
    800,
    600,
    {
        samples: 2
    }
)
```
样本越多，抗锯齿效果越好，`0`相当于完全没有样本。请注意，该值的每次增加都会降低性能。
正如我们前面所说，如果用户的像素比率高于`1`，则像素密度已经足够高，无法区分锯齿。在这种情况下，我们实际上并不需要抗锯齿，我们应该让`samples`属性`1`.
我们可以从`renderer`的以下内容中检索像素比`samples: renderer.getPixelRatio()`：
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
在撰写本课程时，`Safari` 和 `iOS Safari` 等主流浏览器最近才支持它。
### 使用抗锯齿通道
让我们注释该`samples`属性，以便正确测试抗锯齿pass：
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

- `FXAA`：性能良好，但结果只是“还可以”并且可能很模糊
- `SMAA`：通常比 FXAA 更好，但性能较差 — 不要与 `MSAA` 混淆
- `SSAA`：质量最好但性能最差
- `TAA`：表现良好但结果有限
- 还有许多其他的。

选择最佳的抗锯齿通道取决于性能和视觉期望。尝试它们，直到您对以合理的帧速率看到的内容感到满意为止。
在本课中，我们将讨论 `SMAA`。
前面我们说过`gammaCorrectionPass`应该在最后添加 ，抗锯齿通道应该添加在它之后以便优化它。
导入`SMAAPass`、实例化它并将其添加到`effectComposer`：
```javascript
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'

// ...

const smaaPass = new SMAAPass()
effectComposer.addPass(smaaPass)
```
别名应该消失了。
### 结合两个解决方案
我们之前添加到[WebGLRenderTarget](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderTarget)的`samples`属性的一个很酷的事情是，如果它不受支持（因为有些浏览器正在使用 WebGL 1），它将被忽略而不会触发任何错误。
这意味着我们可以这样设置，并且`SMAAPass`仅当用户的屏幕像素比等于`1`且其配置不支持 `WebGL 2` 时才添加。
要了解浏览器是否支持 `WebGL 2`，我们可以使用`renderer`的`capabilities`. 此属性包含有关支持内容的许多详细信息。我们需要的属性是`isWebGL2`：
```javascript
if(renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2)
{
    const smaaPass = new SMAAPass()
    effectComposer.addPass(smaaPass)

    console.log('Using SMAA')
}
```
我们在每个浏览器上都能得到一张漂亮的图片，而且缺点也很小。
如果你想用 `WebGL1` 测试你的代码，你可以用[WebGL1Renderer替换你的](https://threejs.org/docs/?q=WebGL1Renderer#api/en/renderers/WebGL1Renderer)[WebGLRenderer](https://threejs.org/docs/?q=WebGLRender#api/en/renderers/WebGLRenderer)：
```javascript
const renderer = new THREE.WebGL1Renderer({
    // ...
})
```
完成测试后，不要忘记将其放回去。
## 虚幻BloomPass
让我们回到我们的Pass通道，可能是最酷的一个，`UnrealBloomPass`。
此通道将为我们的渲染添加光晕，看起来令人惊叹。它对于重建光辉、火焰、激光、光剑或放射性物质等东西很有用。
导入`UnrealBloomPass`并将其添加到`effectComposer`：
```javascript
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

// ...

const unrealBloomPass = new UnrealBloomPass()
effectComposer.addPass(unrealBloomPass)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695090804890-6b8b4e2d-9097-497e-b7a6-b290092a80dd.png#averageHue=%23e8d6c8&clientId=uf40f9cb8-029f-4&from=paste&id=wck2f&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u1df2590a-3fa3-4ba3-a3b0-d8d875138b5&title=)
一切都显得太明亮了。我们需要调整一些参数。主要有3个参数：

- `strength`: 发光有多强。
- `radius`：亮度可以传播多远。
- `threshold`：达到什么光度极限时，物体开始发光。

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
![009.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1698974321938-87f8cbdf-ec4e-456e-870a-a91a0a917cf9.gif#averageHue=%236d614f&clientId=ue0e8b020-d20b-4&from=drop&id=ua37cbed1&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=5820791&status=done&style=none&taskId=u1b5b68f9-f38c-4fc7-8e71-9848c332833&title=)
这可能太亮了，但可以明白这个pass的含义了。
## 创建我们自己的通行证
创建我们自己的通道就像制作自定义着色器一样简单。
### 色调通行证
我们将从一个轻松的通道开始，让我们可以控制色调。
首先，我们创建一个着色器。着色器是一个具有以下属性的简单对象：

- `uniforms`：与我们使用的制服格式相同。
- `vertexShader`：这个几乎总是相同的代码，并将飞机放在视图前面。
- `fragmentShader`：将进行后处理效果的片段着色器。

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
然后我们创建通行证并将`ShaderPass`其添加到我们的`effectComposer`：
```javascript
const tintPass = new ShaderPass(TintShader)
effectComposer.addPass(tintPass)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695090810715-06095cad-06e6-475a-b32c-3bac35007a1d.png#averageHue=%23fa0300&clientId=uf40f9cb8-029f-4&from=paste&id=gzcjZ&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uebcb6fac-4704-430f-85f3-819bcff5869&title=)
屏幕应该变成红色，因为我们的片段着色器将 屏幕设置`gl_FragColor`为红色。
我们需要从上一个通道获取纹理。该纹理会自动存储在`tDiffuse`制服中。我们必须为制服添加一个`null`值[——EffectComposer](https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer)将更新它——并在`fragmentShader` 中检索该值：
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
现在我们有了上一个通道的纹理，我们需要像之前某课程中那样检索像素。要从 `sampler2D` (即纹理) 中获取像素，我们需要使用 `texture2D(...)`。它需要一个纹理作为第一个参数和 `UV` 坐标作为第二个参数。
问题是我们目前没有这些 `UV` 坐标。我们需要像往常一样创建一个 `varying` 变量 `vUv`，其中包含顶点着色器中的 `uv`：
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
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695090811771-d2eadb0c-42a2-4faa-b6bb-d8023c245371.png#averageHue=%23645644&clientId=uf40f9cb8-029f-4&from=paste&id=Nlmjz&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u1e879459-2956-4fd1-b47a-a3b3c9f8114&title=)
渲染回来了。但现在，我们可以使用`fragmentShader`.
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
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1695090811862-25d2589a-87a6-4cba-a164-1ffece22b0e4.png#averageHue=%238b624b&clientId=uf40f9cb8-029f-4&from=paste&id=NdyzP&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u54116d59-137d-4e56-9665-0c2df14cfb0&title=)
为了更进一步，让我们创建一个制服来控制色调。首先，将 `uTint`添加到`uniforms`：
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
正如您所看到的，我们将值设置为`null`。不要直接在着色器对象中设置值。创建通道后，您必须在材质上设置它们，因为着色器旨在多次使用 - 即使您不这样做。它就像通行证的模板：
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
![013.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1698974369862-5c0a0155-2aa5-4c95-99cf-19f7d844f8d2.gif#averageHue=%235b4d3d&clientId=ue0e8b020-d20b-4&from=drop&id=u7dcd8ae1&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=7567829&status=done&style=none&taskId=u7a978e19-8362-4f69-869c-b7a4bf38b1d&title=)
### 位移通行证
让我们尝试另一个自定义通行证。这次，我们不会摆弄颜色，而是使用 UV 来产生我们所说的位移。
创建一个名为 `DisplacementShader` 的新着色器，然后创建一个名为 `displacementPass` 的新通道并将其添加到 `ShaderPasseffectComposer`：
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
现在，让我们创建一个`newUv`基于`vUv`但有一些变形的：
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
![014.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1698974406229-2de421b6-d929-44ea-af68-4b2c67032c21.gif#averageHue=%23695b47&clientId=ue0e8b020-d20b-4&from=drop&id=udfa4f867&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=7625489&status=done&style=none&taskId=u74c418a5-1744-40db-87fc-2ddfd7de95f&title=)
在这里，我们仅基于 `x `轴对 `y` 轴应用了一个 `sin(...)` 函数。您应该能够看到渲染效果波动。
让我们对其进行动画处理。添加一个 `uTime` `uniform` 变量：
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
![015.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1698974425343-f92db5db-9dd2-4aaf-baca-431c4ec554a0.gif#averageHue=%23544839&clientId=ue0e8b020-d20b-4&from=drop&id=ub63a01b8&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=9763941&status=done&style=none&taskId=uf4fc8fc7-15fd-4b66-8156-88dd4cc4e0b&title=)
波浪现在已动画化。
### 未来界面位移
我们可以使用纹理来代替正弦位移。您可以在 `/static/textures/interfaceNormalMap.png` 中找到一个非常朴素的蜂巢未来界面，具有正常的纹理。
添加`uNormalMap`制服：
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
在加载纹理时更新它——`TextureLoader`[已经](https://threejs.org/docs/index.html#api/en/loaders/TextureLoader)在代码中了：
```javascript
displacementPass.material.uniforms.uNormalMap.value = textureLoader.load('/textures/interfaceNormalMap.png')
```
现在更新`DisplacementShader`  的 `fragmentShader` ：
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
![016.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1698974446227-41104c06-6d07-4431-b997-04c99f97ce87.gif#averageHue=%23635645&clientId=ue0e8b020-d20b-4&from=drop&id=u4cb64faf&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=7789945&status=done&style=none&taskId=udea93400-f570-4b6e-bfd3-8b5731105e9&title=)
我们不会细究这里发生的情况，因为这不是实现此效果的正确方法，但您应该看到引人注目的界面位移。遗憾的是，纹理适合屏幕，如果你的分辨率不成比例，它看起来不会很好。不用担心，这只是演示罢了。
## 走得更远
您现在可以做的是尝试其他通行证，如果您有一些想法或者您想尝试一些事情，则可能会添加新的自定义通行证。
请记住，您添加的每个通道都必须在每个帧上渲染。这可能会带来严重的性能缺陷。
您还可以将自定义通道分离到不同的文件中，甚至拆分文件中的着色器`.glsl`。这样，您可以获得更干净且可重用的代码。

# 34. Performance tips 性能提示
## 介绍
正如我们在最早的课程之一中提到的，你应该以至少`60fps`的体验为目标。有些用户甚至可能有配置要求体验以更高的帧率运行。这些通常是游戏玩家，对性能和帧率要求更高。
主要有两个限制：

- CPU 
- GPU 

你需要关注性能，并在不同配置的多个设备上进行测试，如果你的网站要与移动设备兼容，也不要忘记移动设备。
你还需要关注网站的整体负荷。当我们在本地开发时，加载速度非常快，但一旦上线，它将取决于用户的连接和服务器的速度。我们需要尽量减小资源的大小。
有许多提示可以改善性能和负荷，我们已经看过大部分了，但还是要列出一个详尽的列表。
## 设置
以下一些技巧在启动器中包含代码示例，并且每个技巧都有一个编号。如果你想测试的话，取消相应代码部分的注释。
## 监控
首先，我们需要衡量性能，而不仅仅是目测。
### 1 - 监控 FPS
Chrome 曾经有一个不错的 FPS 仪表，但现在没有了。相反，我们可以使用 JavaScript FPS 仪表，例如[stats.js](https://github.com/mrdoob/stats.js/)。
将其添加到依赖项中`npm install --save stats.js`。
导入并实例化它
```javascript
import Stats from 'stats.js'

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)
```
在 tick 函数中调用 `begin()` 和 `end()` 方法。
```javascript
const tick = () =>
{
    stats.begin()

    // ...

    stats.end()
}
```
你应该得到一个漂亮的 FPS 仪表。
### 2 - 禁用 FPS 限制
有一种方法可以解除 Chrome 的帧率限制，无论屏幕能力如何。
这将使帧率监控即使在性能较好的计算机上也可以进行。例如，如果你在一台性能不错的计算机上开发，并且看到60fps，你可能会认为没问题。但实际上，你的网站在那台性能好的计算机上能以70~80fps运行，在其他计算机上帧率将下降到60fps以下，而你却不会知道。
如果解除帧率限制，你将看到性能不足，你应该在这台计算机上以150~200fps的帧率运行才能保证安全。
解锁 Chrome 帧率的步骤如下：

1. 完全关闭 Chrome - 如果你正在使用 Chrome 查看本课程，请将下面的指令复制到其他地方。
2. 打开终端。
3. 打开以下 Github gist，并执行相应的命令（适用于 Mac 或 Windows）：[https://gist.github.com/brunosimon/c15e7451a802fa8e34c0678620022f7d](https://gist.github.com/brunosimon/c15e7451a802fa8e34c0678620022f7d)
4. Chrome 将以没有帧率限制的方式打开。你可以通过再次打开 FPS 计量器来测试它。如果没有成功，请关闭 Chrome 并重试。如果仍然无法成功，你将不得不放弃这个方法。

请注意，这样做会消耗计算机更多的资源，可能导致 Chrome 崩溃。请谨慎操作。
### 3 - 监控绘制调用
绘制调用是 GPU 绘制三角形的操作。当我们有一个包含许多对象、几何图形、材质等的复杂场景时，将会有许多绘制调用。
通常，我们可以说绘制调用越少越好。我们将看到一些减少这些的提示，但首先，我们想监控它们。
有一个名为Spector.js的出色 Chrome 扩展程序可以帮助您实现这一点。

- 安装扩展程序：[https://chrome.google.com/webstore/detail/spectorjs/denbgaamihkadbghdceggmchnflmhpmk](https://chrome.google.com/webstore/detail/spectorjs/denbgaamihkadbghdceggmchnflmhpmk)
- 在 WebGL 页面上，单击扩展图标将其激活。
- 再次单击可打开扩展面板。
- 单击红色圆圈来录制该帧。

稍等一下，将打开一个新页面，其中包含有关录制帧的许多复杂详细信息。
在“命令”选项卡中，您将看到框架是如何逐步绘制的。我们不会在这里解释所有内容，但蓝色步骤是绘制调用，其他步骤通常是发送到 GPU 的数据，例如矩阵、属性、制服等。
你拥有的越少越好。
### 4 - 渲染器信息
绘制调用是由 GPU 绘制三角形的操作。当我们有一个复杂的场景，有许多对象、几何图形、材质等时，就会有许多绘制调用。
通常来说，你的绘制调用数量越少，性能就越好。下面是一些减少绘制调用的技巧，但首先我们需要监视它们。
有一个很棒的 Chrome 扩展程序叫做 Spector.js，可以帮助你完成这个任务。
安装扩展程序：[https://chrome.google.com/webstore/detail/spectorjs/denbgaamihkadbghdceggmchnflmhpmk](https://chrome.google.com/webstore/detail/spectorjs/denbgaamihkadbghdceggmchnflmhpmk) 在 WebGL 页面上，点击扩展程序图标以激活它。 再次点击打开扩展程序面板。 点击红色圆圈记录帧。 稍等片刻，一个新页面将打开，其中包含关于记录帧的许多复杂细节。
在“Commands”选项卡中，你将看到该帧如何逐步进行绘制。我们不会在这里解释所有内容，但蓝色的步骤是绘制调用，其他步骤通常是发送到 GPU 的数据，例如矩阵、属性、统一等。
你的绘制调用数量越少，性能就越好。
## 通用
### 5 - 良好的 JavaScript 代码
这是不言而喻的，但我们必须保留高性能的本机 JavaScript 代码。这在函数中更为重要，因为`tick`这个函数将在每一帧上被调用。
### 6 - 处理东西
一旦您绝对确定不需要几何体或材质等资源，请将其丢弃。如果你创建一个有关卡的游戏，一旦用户进入下一个关卡，就处理掉上一个关卡的东西。
为此，Three.js 文档上有一个专门的页面：[https://thirdjs.org/docs/#manual/en/introduction/How-to-dispose-of-objects](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects)
这是一个立方体的示例：
```javascript
scene.remove(cube)
cube.geometry.dispose()
cube.material.dispose()
```
## 灯 Lights
### 7 - 避开它们
如果可能，尽量避免使用 Three.js 灯。这些很有用且易于使用，但它们会逐渐降低计算机的性能。
如果您别无选择，请尝试使用尽可能少的灯光，并使用最便宜的灯光，例如[环境光](https://threejs.org/docs/#api/en/lights/AmbientLight)[AmbientLight](https://threejs.org/docs/#api/en/lights/AmbientLight)或[定向光](https://threejs.org/docs/#api/en/lights/DirectionalLight)[DirectionalLight](https://threejs.org/docs/#api/en/lights/DirectionalLight)
### 8 - 避免添加或移除灯光
当您在场景中添加或删除灯光时，所有支持灯光的材质都必须重新编译。这就是 Three.js 的工作原理，如果您有一个复杂的场景，这可能会导致屏幕冻结一会儿。
## 阴影 Shadow
### 9 - 避开它们
与灯光一样，阴影很方便，但对渲染不利。避免它们并尝试找到替代方案，例如烘焙阴影 - 例如当阴影直接位于纹理中时。
### 10 - 优化阴影贴图
如果没有其他选择，尝试优化阴影贴图，使其在场景中看起来好，同时又与场景完美适配。
使用[CameraHelper](https://threejs.org/docs/#api/en/helpers/CameraHelper)查看阴影贴图相机将渲染的区域，并将其缩小到可能的最小区域：
```javascript
directionalLight.shadow.camera.top = 3
directionalLight.shadow.camera.right = 6
directionalLight.shadow.camera.left = - 6
directionalLight.shadow.camera.bottom = - 3
directionalLight.shadow.camera.far = 10

const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(cameraHelper)
```
还尝试使用尽可能小的分辨率和下降结果`mapSize`：
```javascript
directionalLight.shadow.mapSize.set(1024, 1024)
```
### 11 - 明智地使用`castShadow`和`receiveShadow`
有些对象可以投射阴影，有些对象可以接收阴影，有些对象可能两者兼而有之。尝试在尽可能少的物体上激活`castShadow`和`receiveShadow`：
```javascript
cube.castShadow = true
cube.receiveShadow = false

torusKnot.castShadow = true
torusKnot.receiveShadow = false

sphere.castShadow = true
sphere.receiveShadow = false

floor.castShadow = false
floor.receiveShadow = true
```
### 12 - 停用影子自动更新
目前，阴影贴图在每次渲染之前都会更新。您可以停用此自动更新，并仅在必要时提醒 Three.js 阴影贴图需要更新：
```javascript
renderer.shadowMap.autoUpdate = false
renderer.shadowMap.needsUpdate = true
```
正如您所看到的，我们不再看到`torusKnot`阴影旋转。
## 纹理 Texture
### 13 - 调整纹理大小
纹理占用 `GPU` 内存中的大量空间。对于 `mipmap`（自动生成的用于缩小过滤和放大过滤的较小版本）来说情况更糟。
纹理文件的重量与此无关，只有分辨率很重要。
尝试将分辨率降低到最低，同时保持不错的结果。
### 14 - 保持 2 分辨率的幂
当调整尺寸时，记得保持2的幂分辨率。这对于 `mipmaps` 很重要。
分辨率不必是正方形；您可以具有不同宽度和高度。
如果您不这样做并且渲染需要使用 `mipmaps`，Three.js 将尝试通过将图像大小调整为最接近的2的幂分辨率来修复它。但是，这个过程会占用资源，并可能导致纹理质量下降。因此，在创建纹理时最好使用正确的2的幂分辨率。
### 15 - 使用正确的格式
我们之前提到了纹理的格式不会改变 GPU 上的内存使用，但使用正确的格式可能会减少加载时间。
您可以根据图像和压缩方式以及 alpha 通道选择使用 .jpg 或 .png 格式。
您可以使用在线工具（如 TinyPNG）进一步减小文件大小。您还可以尝试特殊的格式，例如 `basis`。
`basis` 是一种类似于 .jpg 和 .png 的格式，但具有强大的压缩能力，并且 GPU 更容易读取该格式。我们不会详细介绍它，因为生成 basis 文件相对较困难，但如果您有兴趣可以尝试一下。您可以在此处找到有关创建 .basis 文件的信息和工具：[https://github.com/BinomialLLC/basis_universal](https://github.com/BinomialLLC/basis_universal)
## 几何形状Geometries
### 16 - 使用BufferGeometry
Three.js 的旧版本（125 之前）曾经具有“非缓冲”几何形状。这些对性能不利，你应该避免它们。
如果您使用的是 Three.js 的最新版本，无需担心，所有几何图形都是缓冲区几何图形。
### 17 - 不更新顶点
更新几何体的顶点对于性能来说非常糟糕。您可以在创建几何图形时执行一次，但避免在`tick`函数中执行此操作。
如果您需要对顶点进行动画处理，请使用顶点着色器来完成。
### 18 - 几何图形互用
如果您有多个[网格](https://threejs.org/docs/#api/en/objects/Mesh)使用相同的几何形状，则仅创建一个几何体，并将其用于所有网格：
```javascript
// Tip 17
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

for(let i = 0; i < 50; i++)
{
    const material = new THREE.MeshNormalMaterial()
    
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = (Math.random() - 0.5) * 10
    mesh.position.y = (Math.random() - 0.5) * 10
    mesh.position.z = (Math.random() - 0.5) * 10
    mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2
    mesh.rotation.z = (Math.random() - 0.5) * Math.PI * 2
    
    scene.add(mesh)
}
```
您仍然可以更改[网格](https://threejs.org/docs/#api/en/objects/Mesh)位置、旋转和比例。
### 19 - 合并几何图形
如果几何图形不应该移动，您还可以使用`BufferGeometryUtils`. 这个类默认是不可用的，我们需要导入它：
```javascript
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'
```
我们不需要实例化它，直接使用它的方法就可以了。
使用`mergeBufferGeometries(...)`以一组几何图形作为参数的方法来获取一个合并的几何图形作为回报。然后我们可以将该几何体与单个[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)一起使用：
```javascript
const geometries = []
for(let i = 0; i < 50; i++)
{
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

    geometry.rotateX((Math.random() - 0.5) * Math.PI * 2)
    geometry.rotateY((Math.random() - 0.5) * Math.PI * 2)

    geometry.translate(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
    )

    geometries.push(geometry)
}

const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries)
console.log(mergedGeometry)

const material = new THREE.MeshNormalMaterial()

const mesh = new THREE.Mesh(mergedGeometry, material)
scene.add(mesh)
```
这更困难，因为我们必须扭曲创建事物的方式并将所有网格变换移动到几何图形中，但这值得，因为最终我们只有一次绘制调用。
## 材料 Material
### 20 - 材料互用
与几何体一样，如果您对多个网格使用相同类型的材质，请尝试仅创建一个并多次使用它：
```javascript
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

const material = new THREE.MeshNormalMaterial()
    
for(let i = 0; i < 50; i++)
{
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = (Math.random() - 0.5) * 10
    mesh.position.y = (Math.random() - 0.5) * 10
    mesh.position.z = (Math.random() - 0.5) * 10
    mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
    mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

    scene.add(mesh)
}
```
### 21 - 使用廉价材料
某些材质（例如[MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)或[MeshPhysicalMaterial ）](https://threejs.org/docs/#api/en/materials/MeshPhysicalMaterial)需要比材质（例如[MeshBasicMaterial](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial)、[MeshLambertMaterial](https://threejs.org/docs/#api/en/materials/MeshLambertMaterial)或[MeshPhongMaterial ）](https://threejs.org/docs/#api/en/materials/MeshPhongMaterial)更多的资源。
尽可能使用最便宜的材料。
## 网格 Meshes
### 22 - 使用实例网格
如果由于需要独立控制网格而无法合并几何体，但它们使用相同的几何体和相同的材质，则可以使用[InstancedMesh](https://threejs.org/docs/#api/en/objects/InstancedMesh)。
它就像一个网格，但您只创建一个[InstancedMesh](https://threejs.org/docs/#api/en/objects/InstancedMesh)，然后为该网格的每个“实例”提供一个变换矩阵。
矩阵必须是[Matrix4](https://threejs.org/docs/#api/en/math/Matrix4)，您可以使用各种可用方法应用任何转换：
```javascript
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

const material = new THREE.MeshNormalMaterial()

const mesh = new THREE.InstancedMesh(geometry, material, 50)
scene.add(mesh)
    
for(let i = 0; i < 50; i++)
{
    const position = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
    )

    const quaternion = new THREE.Quaternion()
    quaternion.setFromEuler(new THREE.Euler((Math.random() - 0.5) * Math.PI * 2, (Math.random() - 0.5) * Math.PI * 2, 0))

    const matrix = new THREE.Matrix4()
    matrix.makeRotationFromQuaternion(quaternion)
    matrix.setPosition(position)

    mesh.setMatrixAt(i, matrix)
}
```
我们得到的结果几乎与合并几何体一样好，但我们仍然可以通过更改矩阵来移动网格。
如果您打算在tick函数中更改这些矩阵，请将其添加到[InstancedMesh](https://threejs.org/docs/#api/en/objects/InstancedMesh)中：
```javascript
mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
```
## 模式 Modles
### 23 - 低聚
使用低多边形模型。多边形越少，帧率就越好。如果您需要细节，可以尝试使用法线贴图。在性能方面它们比较廉价，可以以纹理的成本获得很好的细节效果。
### 24 - Draco压缩
如果模型具有非常复杂的几何细节，请使用 `Draco` 压缩。它可以大幅减小文件大小。缺点是解压几何数据时可能会导致卡顿，并且您还需要加载 `Draco` 库。
### 25 - Gzip
是在服务器端进行的压缩。大多数服务器不会对 .glb、.gltf、.obj 等文件进行 gzip 压缩。
根据您使用的服务器，看看是否能找到解决方法。
## 相机 Cameras
### 26 - 视野
当对象不在视野中时，它们不会被渲染。这称为视锥体剔除。
这看起来像是一个庸俗的解决方案，但你可以缩小相机的视野。屏幕上的对象越少，要渲染的三角形就越少。
### 27 - 近与远
就像视野一样，您可以减少相机的`near`和`far`属性。如果你有一个广阔的世界，有山脉、树木、建筑物等，用户可能看不到那些远在山后视线之外的小房子。将其降低到一个合适的`far`值，这些房子甚至不会尝试渲染。
## 渲染器 Renderer
### 29 - 像素比
有些设备具有非常高的像素比。这只是一个营销论点，但渲染的像素越多，帧速率就越差。
尝试将渲染器的像素比限制为`2`：
```javascript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
```
### 30 - 电源偏好
某些设备可能能够在不同 GPU 或不同 GPU 使用率之间切换。我们可以通过指定一个`powerPreference`属性来提示实例化[WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer)时需要什么功率：
```javascript
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    powerPreference: 'high-performance'
})
```
如果您没有性能问题，请将此属性设置为'default'。
### 31 - 抗锯齿
默认的抗锯齿是高性能的，但它的性能仍然低于无抗锯齿。仅当您有明显的锯齿且没有性能问题时才添加它。
## 后期处理 Postprocessing
### 32 - 限制传球
每个后期处理步骤在渲染时都会占用与渲染分辨率相同数量的像素（包括像素比例）。如果您的分辨率为1920x1080，有4个后期处理步骤，并且像素比例为2，那么需要渲染的像素数为1920 * 2 * 1080 * 2 * 4 = 33,177,600个像素。请合理设置，并尽量将自定义的后期处理步骤合并为一个。
## 着色器 Shader
### 31 - 指定精度
您可以通过更改材质的精度属性来强制着色器的精度：
```javascript
const shaderMaterial = new THREE.ShaderMaterial({
    precision: 'lowp',
    // ...
})
```
请检查结果是否存在质量下降或故障。
这种方法在 `RawShaderMaterial` 上不适用，您需要在着色器中自行添加精度，就像我们在第一节着色器课程中所做的那样。

### 32 - 保持代码简单
尽可能保持着色器代码的简单性，这样进行差异监视会很费力。避免使用 if 语句，充分利用矢量化操作和内置函数。
例如，在顶点着色器中，可以将 if 语句改为：
```glsl
modelPosition.y += clamp(elevation, 0.5, 1.0) * uDisplacementStrength;
```
在片元着色器中，可以用以下方法代替对 r、g 和 b 的复杂计算：
```glsl
vec3 depthColor = vec3(1.0, 0.1, 0.1);
vec3 surfaceColor = vec3(0.1, 0.0, 0.5);
vec3 finalColor = mix(depthColor, surfaceColor, elevation);
```
### 33 - 使用纹理
使用柏林噪声函数很酷，但它会极大地影响您的性能。有时，您最好使用代表噪声的纹理。使用texture2D()比柏林噪声函数便宜得多，并且您可以使用 `Photoshop` 等工具非常有效地生成这些纹理。
### 34 - 使用定义
`Uniform` 很有用，因为我们可以调整它们并为 JavaScript 中的值设置动画。但制服有性能成本。如果该值不应该更改，您可以使用定义。有两种方法创建`define`.
直接在着色器代码中：
```glsl
#define uDisplacementStrength 1.5
```
或者在[ShaderMaterial](https://threejs.org/docs/#api/en/materials/ShaderMaterial)defines的属性中：
```glsl
const shaderMaterial = new THREE.ShaderMaterial({

    // ...

    defines:
    {
        uDisplacementStrength: 1.5
    },

    // ...
}
```
[如果您使用ShaderMaterial ，](https://threejs.org/docs/#api/en/materials/ShaderMaterial)这些`defines`将自动添加到 GLSL 代码中。
### 35 - 在顶点着色器中进行计算
如果可能，在顶点着色器中进行计算并将结果发送到片段着色器。
## 走得更远
从一开始就关注**性能**。在其他设备上进行测试，使用我们之前介绍的工具，并在继续之前修复任何奇怪的行为。
每个项目都有不同的限制，应用这些提示并不总是足够的。尝试寻找解决方案。改变做事的方式，变得更加聪明。
您将在项目中找到更好的方法，并且会更快地适应。最终，您甚至会知道多种获得相同结果的方法，然后可以选择最佳的方法。
以下是 Lewy Blue 的另一个大型提示列表，可以提高您使用 Three.js 的技巧：[https://discoverthreejs.com/tips-and-tricks/](https://discoverthreejs.com/tips-and-tricks/)

# 35. Intro and loading progress简介和加载进度
## 介绍
到目前为止，我们所拥有的只是页面上的 WebGL 画布，一旦准备好就会显示出来。
在本课中，我们将学习如何添加一个非常简单的加载器，该加载器由一个在资源加载时填充的栏组成。整个场景将是黑色的，并且只有在所有内容都加载了漂亮的淡入淡出后才会显示。
对于加载器，我们将使用 HTML 和 CSS。这是了解如何将 HTML 与 WebGL 结合起来的绝佳机会。
## 设置
我们的入门内容包含我们在真实渲染课程中使用飞行头盔所做的事情。
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1705407932321-b45b38d7-1f48-4b65-8c92-b8c3f3cf02dd.png#averageHue=%23786855&clientId=u55042831-75bb-4&from=paste&id=u08b17adf&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf91410e5-d099-4a2e-b96b-3447278ff32&title=)
## 淡入淡出过渡
首先，我们需要一种方法来淡化场景。有许多方法可以实现这一目的。我们可以通过动画化 <canvas> 的 CSS 不透明度来实现。也可以在 <canvas> 上方放置一个黑色的 <div>，并动画化其 CSS 不透明度。但是，相反地，我们将把所有操作都保留在 WebGL 内部，并绘制一个覆盖整个渲染区域的黑色矩形，在需要时将其淡出。
问题是：如何在相机前绘制一个矩形。根据我们现在的知识，我们可以创建一个平面，并将其放在相机内部而不是场景中，这应该可以正常工作，因为相机从 Object3D 继承，但看起来有点修补好的感觉。
相反地，我们将绘制一个不遵循位置、透视和投影规则的平面，以便它只是在视图前绘制。不用担心，它比你想象的要简单。
### 基准面
首先，我们将从plane开始。
创建一个[PlaneGeometry](https://threejs.org/docs/index.html#api/en/geometries/PlaneGeometry)、一个[MeshBasicMaterial](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial)和一个[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)。然后将其全部添加到场景中：
```javascript
/**
 * Overlay
 */
const overlayGeometry = new THREE.PlaneGeometry(1, 1, 1, 1)
const overlayMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)
```
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1705407932026-f866e1bc-4740-4049-8d31-daeff33d622a.png#averageHue=%234c3c30&clientId=u55042831-75bb-4&from=paste&id=u8fef9553&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u5c2ead68-4c9e-493a-aece-9a6ed875273&title=)
从头盔的另一侧应该可以看到plane。
### 填充渲染
我们现在希望plane始终位于镜头前。我们希望它能够填充渲染，而不管相机的位置如何。为此，我们将使用[ShaderMaterial](https://threejs.org/docs/#api/en/materials/ShaderMaterial)。
[将MeshBasicMaterial](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial)替换为[ShaderMaterial](https://threejs.org/docs/#api/en/materials/ShaderMaterial)r ，并用`vertexShade`和`fragmentShader`编写我们之前学过的默认着色器。您可以尝试凭记忆来完成此操作，但如果做不到也不要沮丧。这需要时间：
```javascript
const overlayMaterial = new THREE.ShaderMaterial({
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
})
```
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1705407932002-61f981c9-c624-4262-a102-b1369b495364.png#averageHue=%234d3d30&clientId=u55042831-75bb-4&from=paste&id=ub14ac199&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0a53f2fe-0cfc-4aff-ba8e-ac8668ebeb0&title=)
您应该得到相同的结果，但这一次，我们可以控制着色器。
为了使平面填充渲染，我们不需要应用矩阵：
```javascript
const overlayMaterial = new THREE.ShaderMaterial({
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        void main()
        {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `
})
```
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1705407932092-73d1d3ea-0dbb-4c9a-bc65-339130dbd473.png#averageHue=%239e4d3f&clientId=u55042831-75bb-4&from=paste&id=u71dbd250&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf6fba79d-dd5a-4f0f-ba3f-7ebe4afbfea&title=)
现在你得到了一个大矩形位于中央。它的位置、相机位置、视野等都不会对其进行任何变换，因为没有使用任何矩阵。
平面顶点的坐标范围从 -0.5 到 +0.5，因为我们的平面大小为 1。
这样简化的顶点着色器会在指定的坐标上将三角形绘制到屏幕上，而不考虑其他任何因素。我们可以通过将 `wireframe` 属性设置为 `true` 来看到这些三角形：
```javascript
const overlayMaterial = new THREE.ShaderMaterial({
    wireframe: true,
    // ...
})
```
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1705407931972-f5e45d31-db3f-4710-ba8b-53afcba69685.png#averageHue=%23857665&clientId=u55042831-75bb-4&from=paste&id=u42844571&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u424f875b-58c7-45ef-ac37-33b8014ed53&title=)
评论或删除`wireframe`.
为了获得更大的矩形，我们需要从到-1 的坐标变成+1。为此，请将[PlaneGeometry](https://threejs.org/docs/index.html#api/en/geometries/PlaneGeometry)的大小加倍：
```javascript
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
```
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1705407936408-c6708c07-8fe4-4505-ac0a-b20e5e3814e2.png#averageHue=%23fe0300&clientId=u55042831-75bb-4&from=paste&id=ue336f5ae&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u4887e81e-e4fb-4cb7-9a03-370859d019b&title=)
该矩形现在填充了整个渲染。
### 颜色和阿尔法
假设我们想要黑色而不是红色。
更改`gl_FragColor`：
```javascript
const overlayMaterial = new THREE.ShaderMaterial({
    // ...
    fragmentShader: `
        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
    `
})
```
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1705407936088-02ca2b9f-66d2-42c9-a163-f535f95cb6ce.png#averageHue=%23000000&clientId=u55042831-75bb-4&from=paste&id=u8a2b8437&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u09feab0c-1a0a-4fd4-af48-663544a76e6&title=)
一切似乎都是黑色的。
现在，我们希望能够控制 `alpha`。如您所知，`gl_FragColor `的第四个值。
将第四个参数设置为`0.5`以查看其是否正常工作：
```javascript
const overlayMaterial = new THREE.ShaderMaterial({
    // ...
    fragmentShader: `
        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.5);
        }
    `
})
```
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1705407938126-8ede8414-d37a-4eba-b62f-658e2656b605.png#averageHue=%23000000&clientId=u55042831-75bb-4&from=paste&id=uea720013&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8534b0a4-8699-4182-86c6-364999e3eb0&title=)
不幸的是，一切仍然全黑，那是因为我们忘记了一件容易忘记的事情。我们需要将`transparent`属性设置`true`为[ShaderMaterial](https://threejs.org/docs/#api/en/materials/ShaderMaterial)：
```javascript
const overlayMaterial = new THREE.ShaderMaterial({
    transparent: true,
    // ...
})
```
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1705407938026-5a3877bc-f9ca-44f2-a053-54eb150f65c5.png#averageHue=%233d342b&clientId=u55042831-75bb-4&from=paste&id=u1347be2d&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8d96325a-5125-4c4f-9edc-f37168a422b&title=)
整个场景应该看起来更暗。
### 制服
现在我们已经设置了叠加层，我们需要一种方法来控制 `alpha` 值。我们将使用制服。
像之前一样添加`uAlpha`制服：
```javascript
const overlayMaterial = new THREE.ShaderMaterial({
    // ...
    uniforms:
    {
        uAlpha: { value: 0.5 }
    },
    // ...
})
```
然后在 `fragmentShader`中使用它：
```javascript
const overlayMaterial = new THREE.ShaderMaterial({
    // ...
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})
```
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1705407938095-12cd659a-745e-4e07-9b13-d970ee22a39c.png#averageHue=%233d342b&clientId=u55042831-75bb-4&from=paste&id=u20c7d2b5&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uc64a86bb-183c-4622-a5dd-a8ec9d7787a&title=)
您应该得到相同的结果，但这次我们可以使用JavaScript统一的 `uAlpha`  直接控制 `alpha` 。
让我们将该制服的值更改为1从全黑屏幕开始。
```javascript
const overlayMaterial = new THREE.ShaderMaterial({
    // ...
    uniforms:
    {
        uAlpha: { value: 0.5 }
    },
    // ...
})
```
### 加载中
现在我们已经准备好了叠加层动画，我们想知道什么时候加载所有内容。
虽然场景中只有一个模型，但我们确实加载了许多资源。我们正在加载构成环境贴图、模型几何形状以及模型中使用的所有纹理的 6 个图像。
为了加载这些资源，我们使用了[GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)和[CubeTextureLoader](https://threejs.org/docs/#api/en/loaders/CubeTextureLoader)。两者都可以接收[LoadingManager](https://threejs.org/docs/#api/en/loaders/managers/LoadingManager)作为参数。正如我们在课程开始时看到的那样， [LoadingManager](https://threejs.org/docs/#api/en/loaders/managers/LoadingManager)可用于随时了解全局加载进度。
实例化一个[LoadingManager并在](https://threejs.org/docs/#api/en/loaders/managers/LoadingManager)[GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)和[CubeTextureLoader](https://threejs.org/docs/#api/en/loaders/CubeTextureLoader)中使用它：
```javascript
/**
 * Loaders
 */
const loadingManager = new THREE.LoadingManager()
const gltfLoader = new GLTFLoader(loadingManager)
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)
```
应该没有任何改变，但我们现在可以将两个函数发送到[LoadingManager](https://threejs.org/docs/#api/en/loaders/managers/LoadingManager)。
第一个将在所有内容加载时触发，第二个将在加载进度时触发。
使用以下参数添加这两个函数：
```javascript
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
        console.log('loaded')
    },

    // Progress
    () =>
    {
        console.log('progress')
    }
)
```
您应该在日志中得到多个"progress"，并在最后得到一个"loaded"。
进度功能稍后会有所帮助。现在，我们需要的只是加载的函数。
### 动画
要淡出叠加层，我们需要一种方法来对`uAlpha`统一值进行动画处理。虽然这有点牵强，但为此，我们将像课程开始时那样使用 `GSAP` 库。
首先，在终端中，使用来安装库。`npm install --save gsap@3.12`
现在我们已经有了gsap依赖项，我们可以导入它：
```javascript
import { gsap } from 'gsap'
```
最后，我们可以使用它来为uAlpha加载函数中的统一值设置动画：
```javascript
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
        gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0 })
    },

    // ...
)
```
![010.gif](https://cdn.nlark.com/yuque/0/2024/gif/35159616/1706094294593-398867c0-06f1-4b46-a38a-1c4fe9c48eac.gif#averageHue=%23000000&clientId=u0e3d060c-c079-4&from=drop&id=u10544338&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3563815&status=done&style=none&taskId=ubd5c7526-c0e6-4d24-b989-87bef02b50d&title=)
加载完所有内容后，覆盖层应该会很好地淡出。
## 加载栏
如果项目资源相当庞大，整个项目体积在50MB左右。（该模型可以使用一些优化，但这不是本课程的主题）这时候是使用漂亮的加载栏查看资源加载的绝佳机会。
### 模拟正常带宽
问题是我们正在本地进行测试，并且所有内容加载速度都非常快。如果您使用的是 Chrome，则可以模拟较慢的带宽。
以下说明涉及 Chrome，但所有这些功能在 Firefox 中也可用。
在“开发人员工具”面板中，转到“网络”选项卡。
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1705407938064-b58eac9c-0b90-4724-8f48-1ba384bf38f9.png#averageHue=%235f615f&clientId=u55042831-75bb-4&from=paste&id=u7acf3aa4&originHeight=172&originWidth=290&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u74b4c4a8-85d2-4932-ab12-b9678712bd6&title=)
首先，检查禁用缓存。
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1705407940961-47566260-b693-4598-9e4c-1e93f961531c.png#averageHue=%232c2d30&clientId=u55042831-75bb-4&from=paste&id=uae9f7586&originHeight=108&originWidth=360&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u2e175a7f-ec47-40c7-a320-80bd393f7d6&title=)
这将强制加载资源而无需缓存，就像您第一次访问该网站一样。
然后，我们需要一种方法来限制带宽。为此，请单击具有“在线”值的下拉菜单。
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1705407940938-cc2848d2-d0b8-496c-b177-dfec826f3aef.png#averageHue=%23333537&clientId=u55042831-75bb-4&from=paste&id=uf67e1f13&originHeight=176&originWidth=578&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u204866cc-87d9-48a6-b726-9add243f12c&title=)
在这里，我们可以选择各种模式。不幸的是，可用的选项不适合该项目。
要添加自定义值，请单击“添加”：
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1705407941304-e8983e6f-61c1-4f0c-affc-609c4e42ea11.png#averageHue=%2300c754&clientId=u55042831-75bb-4&from=paste&id=ub0c62d70&originHeight=208&originWidth=454&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ufb88e81e-c0d7-4442-a1dc-4fc0019a287&title=)
在应该打开的面板中，单击“添加自定义配置文件...”，选择“Pretty fast”之类的名称，并将“下载”值设置为100000。
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1705407941276-daaf6c74-041c-43de-b3a4-df35b51b0950.png#averageHue=%232a2a2a&clientId=u55042831-75bb-4&from=paste&id=ud51e1390&originHeight=556&originWidth=1310&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ude2b7a0a-0aa8-4a29-b94d-8ce0a73f8fe&title=)
只要我们有时间看到资产加载，这个值的含义并不那么重要。对于典型的项目，您应该创建一个较低的值来模拟 ADSL 连接。
保存它，关闭面板，然后在下拉菜单中选择该值。
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1705407942517-4dc18162-d2ab-4362-97e0-c44fe03b9e40.png#averageHue=%23344b55&clientId=u55042831-75bb-4&from=paste&id=ue80aca54&originHeight=470&originWidth=422&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue0f20bf3-2ee6-4252-ba99-2f543e45e3f&title=)
网络现在模拟相当快的带宽。
如果重新加载，您会发现现在必须等待大约 3 秒，叠加层才会淡出。
### 创建 HTML 加载栏
现在我们可以测试加载进度了，是时候添加加载栏了。这次，为了课程的目的，我们将在 HTML 中添加这个栏，但我们可以创建一个新平面，并使用着色器对其进行动画处理，就像我们对覆盖层所做的那样。
打开`/src/index.html`文件，在`<canvas>`标签之后添加一个带有`loading-bar`类的`<div>`元素：
```html
<!-- ... -->
<body>
    <canvas class="webgl"></canvas>
    <div class="loading-bar"></div>
</body>
</html>
```
然后，在/src/style.css文件中定位该栏，使其适合屏幕中间的整个宽度：
```css
.loading-bar
{
    position: absolute;
    top: 50%;
    width: 100%;
    height: 2px;
    background: #ffffff;
}
```
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1705407943005-ec91fe2a-b770-4d4a-b350-904067319b57.png#averageHue=%2380705b&clientId=u55042831-75bb-4&from=paste&id=uc4314b97&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ub9a38c80-e8c0-4b9f-ac6a-30178e63565&title=)
这是经典的 CSS，我们不会解释它。
我们希望该栏从左侧填充。为此，我们将使用`transformCSS` 属性对其进行缩放。
设置`transform`的`ascaleX`属性值为 `0.3`：
```javascript
.loading-bar
{
    /* ... */
    transform: scaleX(0.3);
}
```
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1705407944040-266e8e1a-664c-409e-8f97-1a677c348f2c.png#averageHue=%23716150&clientId=u55042831-75bb-4&from=paste&id=u295d94e7&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ua4a722e6-b86c-4738-97aa-e61d9add38b&title=)
规模发挥了作用；请使用以下`transform-origin`属性：
```javascript
.loading-bar
{
    /* ... */
    transform: scaleX(0.3);
    transform-origin: top left;
}
```
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1705407943092-9002de7f-8edc-4ed9-b968-95b8285e11ea.png#averageHue=%237a6956&clientId=u55042831-75bb-4&from=paste&id=u38f7ac24&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u2cc6d2c2-5330-48ec-9088-95100f94b49&title=)
bar应该留在左边。
最后，将`scaleX`值设置为0：
```javascript
.loading-bar
{
    /* ... */
    transform: scaleX(0);
    transform-origin: top left;
}
```
### 更新一下吧
现在我们有了栏，让我们回到`/src/script.js`并在加载过程中为其设置动画。
要了解加载进度，我们可以使用发送到 `LoadingManager` 的第二个[函数](https://threejs.org/docs/#api/en/loaders/managers/LoadingManager)：
```javascript
const loadingManager = new THREE.LoadingManager(
    // ...

    // Progress
    () =>
    {
        console.log('progress')
    }
)
```
每次加载资产时都会触发此函数，并且可以有 3 个参数：

- itemUrl: 资产的 URL
- itemsLoaded :加载了多少资源
- itemsTotal: 要加载的资产总数

您可以测试这些值：
```javascript
const loadingManager = new THREE.LoadingManager(
    // ...

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        console.log(itemUrl, itemsLoaded, itemsTotal)
    }
)
```
您应该在日志中看到每个资产负载。
现在，我们需要更新该`scaleX`值。为此，我们只需要更新`loading-bar`元素样式即可。
首先，让我们检索该元素。为此，我们将使用`document.querySelector`：
```javascript
const loadingBarElement = document.querySelector('.loading-bar')
```
这是通过选择器获取元素的经典 JavaScript 技术——就像 CSS 中一样。
在进度函数中，我们首先需要计算进度比。该值应该从`0`加载资源时到`1`加载所有资源完成后为止。
为了计算这个比率，我们可以简单地 `itemsLoaded`除以`itemsTotal`：
```javascript
const loadingManager = new THREE.LoadingManager(
    // ...

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        const progressRatio = itemsLoaded / itemsTotal
        console.log(progressRatio)
    }
)
```
您应该在日志中看到`progressRatio`从`0`到`1`的变化。
我们现在可以`transform`更新`loadingBarElement`：
```javascript
const loadingManager = new THREE.LoadingManager(
    // ...

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        const progressRatio = itemsLoaded / itemsTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
    }
)
```
![020.gif](https://cdn.nlark.com/yuque/0/2024/gif/35159616/1706094262421-1ed5b5c4-c5fb-45f4-8dc3-6f814056b092.gif#averageHue=%23221f1c&clientId=u0e3d060c-c079-4&from=drop&id=u20469acd&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3114683&status=done&style=none&taskId=ua5cb0edf-c62d-43a2-8ef9-c8c987288a0&title=)
该栏应根据加载进度填充。
不要忘记保持开发人员工具打开，并选中“禁用缓存”并将限制设置为“相当快”。
### 平滑动画
让我们通过平滑过渡使动画更加流畅。有很多方法可以做到这一点，但最简单的解决方案是transition在 CSS 中添加 a。
在文件中，在属性上/src/style.css添加过渡：0.5stransform
```css
.loading-bar
{
    /* ... */
    transition: transform 0.5s;
}
```
![021.gif](https://cdn.nlark.com/yuque/0/2024/gif/35159616/1706094244390-84c3dba4-6c0f-467f-ab44-884ff381a485.gif#averageHue=%2321201c&clientId=u0e3d060c-c079-4&from=drop&id=u806a083d&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3110495&status=done&style=none&taskId=u51221ee0-ec43-4c76-bdc4-905b5d9193b&title=)
您应该得到相同的结果，但栏上的动画更流畅。
### 隐藏栏
加载完所有内容后，有很多方法可以隐藏该栏，但为了使其更酷并保持流畅，我们将使该栏在右侧消失。
首先，在`/src/style.css`文件中添加一个具有以下属性的新选择器：
```css
.loading-bar.ended
{
    transform: scaleX(0);
    transform-origin: 100% 0;
    transition: transform 1.5s ease-in-out;
}
```
请确保在 `.loading-bar` 和 `.ended` 之间不要添加空格，这样属性仅在元素上同时存在这两个类时才适用。
这些属性只是将进度条缩放到`0`，并使用 `ease-in-out` 时间函数进行更加流畅的转换，而且变换是右对齐的。
现在我们只需要在所有东西都加载完成后，将 `ended` 类添加到元素上即可。
我们可以在 `loaded` 函数中使用 `classList.add(...) `方法来实现：
```javascript
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
        gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

        loadingBarElement.classList.add('ended')
    },

    // ...
)
```
不幸的是，这不起作用，因为仍然有一个`scaleX`来自进度函数的应用于元素。
我们只需将转换设置为空字符串即可解决该问题：
```javascript
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
        gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

        loadingBarElement.classList.add('ended')
        loadingBarElement.style.transform = ''
    },

    // ...
)
```
![022.gif](https://cdn.nlark.com/yuque/0/2024/gif/35159616/1706094221205-128e2958-387a-4808-9f95-5910c46bdbd3.gif#averageHue=%23211f1c&clientId=u0e3d060c-c079-4&from=drop&id=u0ec3f773&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2538499&status=done&style=none&taskId=ua882772d-38b7-4e90-a14f-c64ce2718c3&title=)
该栏应按计划在右侧消失。动画看起来有点跳跃，这并不理想。
原因有两个。首先，第一次渲染场景上的元素需要时间，并且计算机冻结了一会儿。其次，我们为栏添加了`0.5s`过渡。这意味着当触发加载的函数时，条形图并未完成到末尾的转换。
为了解决这些问题，我们可以使用以下命令让 JavaScript 在开始介绍动画之前等待`setTimeout(...)`：
```javascript
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
        window.setTimeout(() =>
        {
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

            loadingBarElement.classList.add('ended')
            loadingBarElement.style.transform = ''
        }, 500)
    },

    // ...
)
```

现在，该栏消失得更加顺畅。
就是这样。现在，您有了一个带有 HTML 加载栏的方案了。

# 36. Mixing HTML and WebGL 混合 HTML 和 WebGL
## 介绍 
在本课程中，我们将学习如何将 HTML 集成到场景中。通过这种方式，我指的是在场景中有一个交互式的 HTML 元素，它会跟随特定的 3D 位置，看起来就像它们是 WebGL 的一部分。
为了演示这一点，我们将向模型添加兴趣点。这些兴趣点将由 HTML 制作，并始终粘附到它们关联的 3D 位置。由于这些点将由 HTML 制作，我们将能够使用 CSS 进行设计，添加诸如 `:hover` 之类的交互以及添加过渡效果。
## 设置
[启动器由我们在介绍中所做的内容以及Leonardo Carrion](http://www.leonardocarrion.com/)的[损坏头盔](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/DamagedHelmet)后处理课程中的加载进度课程组成。
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1706093760308-1d3bc349-5e44-4ac9-a1f8-b791b70da617.png#averageHue=%2385745f&clientId=u0e3d060c-c079-4&from=paste&id=udff86883&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u6edafd4c-1b8f-46cb-ae54-5424610b25d&title=)
## 超文本标记语言
首先，让我们创建一个 HTML 点。在课程结束时，我们将添加更多要点。
在`/src/index.html`文件中，在`<canvas>`和加载栏后面添加点：
```html
<canvas class="webgl"></canvas>

<div class="loading-bar"></div>

<div class="point point-0">
    <div class="label">1</div>
    <div class="text">Lorem ipsum, dolor sit amet consectetur adipisicing elit</div>
</div>
```
我们放置在该点内的文本不应在页面上可见，因为它隐藏在`<canvas>`下方.
我们使用该类`point`能够定位 `CSS` 中的所有点，也使用该类`point-0`来定位 `JavaScript` 中的此特定元素。接下来的点将有`point-1`、`point-2`等。
我们的兴趣点由一个带有 `label` 类的 `<div>` 和一个带有 `text `类的 `<div> `组成。
`label` 将是一个小圆形数字，看起来就像粘在模型上，而当我们悬停在该标签上时，文本将显示出来。
## CSS
我们将把整个 CSS 添加到一行中。通常，您必须逐步进行，但我们知道我们要去哪里。
转到`/src/style.css`文件并首先将点定位在屏幕中间：
```css
.point
{
    position: absolute;
    top: 50%;
    left: 50%;
}
```
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1706093761257-bc6593b5-18ac-454f-8bd0-33de2e1768ad.png#averageHue=%2380705c&clientId=u0e3d060c-c079-4&from=paste&id=u0ed59c90&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0f368d4a-8743-4b1a-ba9c-42639104b74&title=)
您应该在屏幕中间看到黑色文本。我们从中心开始，因为 Three.js 将提供屏幕中心的坐标0,0。
我们先来设计一下标签：
```css
.point .label
{
    position: absolute;
    top: -20px;
    left: -20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #00000077;
    border: 1px solid #ffffff77;
    color: #ffffff;
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
    line-height: 40px;
    font-weight: 100;
    font-size: 14px;
}
```
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1706093760437-fc6cbe43-dded-4ee7-a1cb-4066d54ea824.png#averageHue=%23726452&clientId=u0e3d060c-c079-4&from=paste&id=u83b606d6&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u1223897c-791b-4c65-9ba0-d34a7729117&title=)
您应该看到标签。
这里没什么太难的。我们简单地将元素圆角化`border-radius: 50%;`，并使用降低不透明度的黑色背景`background: #00000077;`；并对与 的边界做了同样的事情`border: 1px solid #ffffff77;`。然后，我们将白色文本置于元素的中间。
让我们对文本做同样的事情：
```css
.point .text
{
    position: absolute;
    top: 30px;
    left: -120px;
    width: 200px;
    padding: 20px;
    border-radius: 4px;
    background: #00000077;
    border: 1px solid #ffffff77;
    color: #ffffff;
    line-height: 1.3em;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: 100;
    font-size: 14px;
}
```
![](https://cdn.nlark.com/yuque/0/2024/png/35159616/1706093795839-77d015b5-1a0a-4b3f-aaa8-4ef79ff5d238.png#averageHue=%2380705c&clientId=u0e3d060c-c079-4&from=paste&id=ue0980c18&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ub9d8cbd9-dc52-47e5-960f-d56162aee63&title=)
您应该会看到标签下方的文字。
我们在这里实现的与标签非常相似，但有一个固定的`border-radius`、一个特定的`line-height`和一个`padding`。
现在我们有了两个元素，让我们准备交互。首先，我们希望默认隐藏文本。
将其设置`opacity`为`0`：
```css
.point .text
{
   /* ... */
    opacity: 0;
}
```
当.point悬停时，我们希望显示文本：
```css
.point:hover .text
{
    opacity: 1;
}
```
![004.gif](https://cdn.nlark.com/yuque/0/2024/gif/35159616/1708336499014-bf1b512f-7887-46e1-9219-fa684c0c0399.gif#averageHue=%237f6f5a&clientId=uf2d43201-893a-4&from=drop&id=u59e1b5bf&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=543515&status=done&style=none&taskId=ub7479b03-97b1-4dc7-9404-68d62cdb04e&title=)
当标签悬停时，文本应该显示。
我们希望文本淡入淡出，而不是这种粗糙的幻影。为此，我们可以使用`transition`.
将过渡添加到文本中，但不仅仅是在悬停时添加过渡。这样，当光标离开该点时也会发生转换：
```css
.point .text
{
    /* ... */
    transition: opacity 0.3s;
}
```
文本应该淡入和淡出。
我们有一个小问题。当文本不可见时，我们可以直接将其悬停。
![005.gif](https://cdn.nlark.com/yuque/0/2024/gif/35159616/1708336514819-65aa6997-065b-48bf-8e62-bcb7d6677a7b.gif#averageHue=%237e6f59&clientId=uf2d43201-893a-4&from=drop&id=ude6f7bce&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=563392&status=done&style=none&taskId=u303f32f2-60a7-4af5-ad12-56361bb44ee&title=)
为了解决这个问题，我们可以停用文本上的指针事件。这可以通过 CSS 属性来完成`pointer-events`：
```css
.point .text
{
    /* ... */
    pointer-events: none;
}
```
![006.gif](https://cdn.nlark.com/yuque/0/2024/gif/35159616/1708336526282-8d22fb1b-f9e9-4bcb-9a66-801369e7052a.gif#averageHue=%237c6c58&clientId=uf2d43201-893a-4&from=drop&id=u09a236d1&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=571548&status=done&style=none&taskId=ua1af1538-4ecd-4084-801c-7d891edb04f&title=)
文本不应该是“可悬停的”。
目前，当我们将数字悬停在标签中时，光标会变为文本选择。为了解决这个问题，我们可以使用 CSS 属性更改整个标签上的光标cursor。
```css
.point .label
{
    /* ... */
    cursor: help;
}
```
![008.gif](https://cdn.nlark.com/yuque/0/2024/gif/35159616/1708336991393-a893ef3a-7a6f-480d-b0e3-e243cff24da7.gif#clientId=uf2d43201-893a-4&from=drop&id=ucac6f46a&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=582415&status=done&style=none&taskId=u4e541bb0-79d9-4a51-beb4-0dd150b6bb9&title=)
 ”？” 当鼠标悬停在标签上时，应该出现在光标的位置。
我们几乎完成了 CSS 的工作。我们现在需要做的是准备一种显示和隐藏标签的方法。因此，我们将默认隐藏它们，仅当该点上存在类`visible`时才显示它们。
为了隐藏它们，我们将使用 `atransform`和  `scale`，并且我们还将添加一个过渡，以便比例将被动画化：
```css
.point .label
{
    /* ... */
    transform: scale(0, 0);
    transition: transform 0.3s;
}

.point.visible .label
{
    transform: scale(1, 1);
}
```
标签应该消失了。但是，如果我们使用开发人员工具`visible`面板将类直接添加到元素中，我们应该会看到标签出现。
![009.gif](https://cdn.nlark.com/yuque/0/2024/gif/35159616/1708337055832-6c671a10-403c-4bb2-b86c-592117de4884.gif#averageHue=%23887b64&clientId=uf2d43201-893a-4&from=drop&id=ue00ed415&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1676577&status=done&style=none&taskId=u5c95f4d6-47b1-4d1a-b42c-052bc96c4f1&title=)
现在，让我们`visible`直接在 `HTML` 中添加类，以便我们可以定位点。我们稍后将删除该类。
```html
<div class="point point-0 visible">
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/35159616/1708337116816-ee1aacfd-e7e0-471b-a897-02e4c953fb1d.png#clientId=uf2d43201-893a-4&from=paste&height=1120&id=ub0428d99&originHeight=1120&originWidth=1792&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2318699&status=done&style=none&taskId=ufd6597e4-d5ef-4d2a-aeb4-2c1242de0eb&title=&width=1792)
现在该点应该是可见的。
## JavaScript
现在 HTML 和 CSS 中的一切都已准备就绪，我们可以切换到 `JavaScript`。
存储点
首先，我们需要一种方法来存储所有点——即使我们现在只有一个点。我们将使用一组对象，每个对象对应一个点。
每个点对象都有两个属性：3D 位置和对 HTML 元素的引用。
创建`points`内部有一个点的数组：
```javascript
const points = [
    {
        position: new THREE.Vector3(1.55, 0.3, - 0.6),
        element: document.querySelector('.point-0')
    }
]
```
我们使用[Vector3](https://threejs.org/docs/#api/en/math/Vector3)来定位位置并`document.querySelector(...)`从 HTML 中检索元素。
更新点位置
我们将直接在`tick`函数中更新每个帧上的点 HTML 元素。
在`tick`函数中，更新控件后，立即循环遍历`points`数组中的每个元素 - 即使我们只有一个元素。您可以使用任何循环技术，但我们将采用`(for... of ...)`：
```javascript
const tick = () =>
{
    // Update controls
    controls.update()

    // Go through each point
    for(const point of points)
    {
        
    }

    // ...
}
```
我们需要获取该点的 3D 场景位置的 2D 屏幕位置。这部分非常简单。
首先，我们需要克隆点的位置。这很重要，因为以下代码将直接修改[Vector3](https://threejs.org/docs/#api/en/math/Vector3)。要克隆位置，请使用以下`clone()`方法：
```javascript
const tick = () =>
{
    // ...

    for(const point of points)
    {
        const screenPosition = point.position.clone()
    }

    // ...
}
```
要获取 2D 屏幕位置，我们需要调用该`project(...)`方法并使用`camera` 参数：
```javascript
const tick = () =>
{
    // ...

    for(const point of points)
    {
        const screenPosition = point.position.clone()
        screenPosition.project(camera)

        console.log(screenPosition.x)
    }

    // ...
}
```
您应该在日志中看到一个接近的`0`值。如果移动相机使头盔位于最左侧（使用右键单击并拖放），您将获得接近 `-1`的值。如果移动相机使头盔位于最右侧，您将获得接近` +1`的值。
让我们关注`x`轴，稍后我们会看到`y`。
问题是我们不能那样使用这个值。我们希望能够使用像素移动点元素。
为了从投影屏幕位置到屏幕上的像素，我们需要乘以渲染大小的一半，并且我们已经在对象中拥有这个值`sizes`：
```javascript
const tick = () =>
{
    // ...

    for(const point of points)
    {
        const screenPosition = point.position.clone()
        screenPosition.project(camera)

        const translateX = screenPosition.x * sizes.width * 0.5
        console.log(translateX)
    }

    // ...
}
```
再次移动相机将头盔放置在远端，然后查看日志中的值。应该有几百。
现在该值看起来正确了，让我们更新点元素。为此，我们将在 `style`的属性中应用`transform`。不要忘记在`translateX`函数末尾写入`px`：
```javascript
const tick = () =>
{
    // ...

    for(const point of points)
    {
        const screenPosition = point.position.clone()
        screenPosition.project(camera)

        const translateX = screenPosition.x * sizes.width * 0.5
        point.element.style.transform = `translateX(${translateX}px)`
    }

    // ...
}
```

![011.gif](https://cdn.nlark.com/yuque/0/2024/gif/35159616/1708337338181-2ea09cea-cd84-465a-a908-f7c6ed749c1c.gif#averageHue=%237d6e59&clientId=uf2d43201-893a-4&from=drop&id=u0e9724d3&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=12957661&status=done&style=none&taskId=uf9433754-225b-4fc3-8743-320cedc6dae&title=)
该点似乎在` X` 轴上移动良好。让我们添加 `Y` 轴。
`translateY`使用`y`属性和值添加变量`sizes.height`。然后，将其应用于变换：
```javascript
const tick = () =>
{
    // ...

    for(const point of points)
    {
        const screenPosition = point.position.clone()
        screenPosition.project(camera)

        const translateX = screenPosition.x * sizes.width * 0.5
        const translateY = screenPosition.y * sizes.height * 0.5
        point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
    }

    // ...
}
```
![012.gif](https://cdn.nlark.com/yuque/0/2024/gif/35159616/1708337360043-806a1851-aad5-4c62-b72b-0de39e06ee55.gif#averageHue=%2391856c&clientId=uf2d43201-893a-4&from=drop&id=udc833d88&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10331350&status=done&style=none&taskId=u8ad54bd7-1664-46f3-93f3-d4d28b2d79c&title=)
我们快到了，遗憾的是，`Y` 轴似乎是倒置的。事实上，在 CSS 中，正值`translateY`会下降，而在 Three.js 中，正值`y`会上升。
我们需要对`translateY`变量取反：
```javascript
const tick = () =>
{
    // ...

    for(const point of points)
    {
        const screenPosition = point.position.clone()
        screenPosition.project(camera)

        const translateX = screenPosition.x * sizes.width * 0.5
        const translateY = - screenPosition.y * sizes.height * 0.5
        point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
    }

    // ...
}
```
![013.gif](https://cdn.nlark.com/yuque/0/2024/gif/35159616/1708337370780-0f4c0119-f68d-4548-9dab-2e70f9827ab3.gif#averageHue=%23796a56&clientId=uf2d43201-893a-4&from=drop&id=u34d654b3&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=7063217&status=done&style=none&taskId=u92752005-462f-432f-b0fc-dcbb54403f2&title=)

点元素应完美遵循其 3D 位置。
### 显示和隐藏元素
最后，如果该点前面有东西，我们需要隐藏该点。
首先，删除visibleHTML 中的类：
```html
<div class="point point-0">
```
为了测试某物是否在该点的前面，我们将使用[Raycaster](https://threejs.org/docs/#api/en/core/Raycaster)。我们将从相机向该点发射一条光线。如果没有相交的对象，我们将显示该点。如果有的话，我们测试交叉路口的距离。如果交点比该点更远，则说明该物体位于该点的后面，我们可以将其显示出来。如果交点比该点更近，则相交的对象位于该点的前面，我们将其隐藏。
让我们在函数之外的任何地方创建一个[Raycaster](https://threejs.org/docs/#api/en/core/Raycaster)tick：
```javascript
const raycaster = new THREE.Raycaster()
```
在tick函数中，更新[Raycaster](https://threejs.org/docs/#api/en/core/Raycaster)，使其从相机到达点。为此，请使用`setFromCamera(...)`.
如果您还记得`Raycaster`课程中的内容，则第一个参数`setFromCamera(...)`应该是与屏幕上的位置相对应的[Vector2 ，第二个参数应该是相机。](https://threejs.org/docs/#api/en/math/Vector2)
在`Raycaster`课程中，我们必须将光标的屏幕位置（以像素为单位）转换为适合 Three.js 坐标的值。然而，就我们而言，我们已经拥有这些。我们可以改为使用`screenPosition`. 是的，`screenPosition`是一个[Vector3](https://threejs.org/docs/#api/en/math/Vector3)，但只会使用它的`x`和`y`属性：
```javascript
const tick = () =>
{
    // ...

    for(const point of points)
    {
        const screenPosition = point.position.clone()
        screenPosition.project(camera)

        raycaster.setFromCamera(screenPosition, camera)

        // ...
    }

    // ...
}
```
我们将使用该方法`intersectObjects(...)`针对场景中的每个对象测试[Raycaster 。](https://threejs.org/docs/#api/en/core/Raycaster)
为此，请使用`scene.children`作为第一个参数和`true`第二个参数。第二个参数将启用递归测试，这意味着该算法也将遍历子代的子代以及子代的子代的子代，等等：
```javascript
const tick = () =>
{
    // ...

    for(const point of points)
    {
        const screenPosition = point.position.clone()
        screenPosition.project(camera)

        raycaster.setFromCamera(screenPosition, camera)
        const intersects = raycaster.intersectObjects(scene.children, true)

        // ...
    }

    // ...
}
```
首先，我们能做的是测试是否存在相交。如果没有交点，则该点前面没有物体，我们可以将其显示出来。如果存在相交，我们将不得不进行更多测试，但现在我们先隐藏这一点。
为了说明这一点，我们可以通过`classList.add(...)`添加带有 `visible`的类。为了隐藏这一点，我们可以使用以下方法`classList.remove(...)`删除该`visible`类：
```javascript
const tick = () =>
{
    // ...

    for(const point of points)
    {
        const screenPosition = point.position.clone()
        screenPosition.project(camera)

        raycaster.setFromCamera(screenPosition, camera)
        const intersects = raycaster.intersectObjects(scene.children, true)

        if(intersects.length === 0)
        {
            point.element.classList.add('visible')
        }
        else
        {
            point.element.classList.remove('visible')
        }

        // ...
    }

    // ...
}
```

![014.gif](https://cdn.nlark.com/yuque/0/2024/gif/35159616/1708337396832-061ef7b1-7575-4dfd-a661-ada1c7827306.gif#averageHue=%237a6a56&clientId=uf2d43201-893a-4&from=drop&id=u2b3e7b24&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=19537060&status=done&style=none&taskId=u48b15049-b1e4-4c14-8ad2-5a9de57220d&title=)
不完全是我们想要的，但我们正在实现目标。
问题是，如果有任何东西与光线相交，我们就会隐藏该点。但如果交点位于点后面，则该交点不应该隐藏。
我们需要计算到该点的距离，然后计算交点的距离并进行比较。
这些`intersectObjects(...)`方法返回交集数组。这些交叉点按距离排序，最近的排在前面。这意味着如果有多个交叉点，我们不必测试所有交叉点，我们只需测试第一个交叉点即可。
要获取相交距离，这是可以管理的，因为该值已在相交对象中作为`distance`属性提供：
```javascript
const tick = () =>
{
    // ...

    for(const point of points)
    {
        const screenPosition = point.position.clone()
        screenPosition.project(camera)

        raycaster.setFromCamera(screenPosition, camera)
        const intersects = raycaster.intersectObjects(scene.children, true)

        if(intersects.length === 0)
        {
            point.element.classList.add('visible')
        }
        else
        {
            const intersectionDistance = intersects[0].distance
        }

        // ...
    }

    // ...
}
```
获取点距离`position`有点困难。我们需要从 `point` 开始，因为它是一个[Vector3](https://threejs.org/docs/#api/en/math/Vector3)，所以我们可以使用它的`distanceTo()`方法。
该方法需要另一个[Vector3](https://threejs.org/docs/#api/en/math/Vector3)作为参数。它将计算第一个`position`和第二个之间`position`的距离。我们可以使用`camera`：
```javascript
const tick = () =>
{
    // ...

    for(const point of points)
    {
        const screenPosition = point.position.clone()
        screenPosition.project(camera)

        raycaster.setFromCamera(screenPosition, camera)
        const intersects = raycaster.intersectObjects(scene.children, true)

        if(intersects.length === 0)
        {
            point.element.classList.add('visible')
        }
        else
        {
            const intersectionDistance = intersects[0].distance
            const pointDistance = point.position.distanceTo(camera.position)
        }

        // ...
    }

    // ...
}
```
我们现在需要做的就是比较这两个距离。如果`intersectionDistance`低于`pointDistance`，则意味着相交的对象比该点更近，应该隐藏。否则，该点应该出现：
```javascript
const tick = () =>
{
    // ...

    for(const point of points)
    {
        const screenPosition = point.position.clone()
        screenPosition.project(camera)

        raycaster.setFromCamera(screenPosition, camera)
        const intersects = raycaster.intersectObjects(scene.children, true)

        if(intersects.length === 0)
        {
            point.element.classList.add('visible')
        }
        else
        {
            const intersectionDistance = intersects[0].distance
            const pointDistance = point.position.distanceTo(camera.position)

            if(intersectionDistance < pointDistance)
            {
                point.element.classList.remove('visible')
            }
            else
            {
                point.element.classList.add('visible')
            }
        }

        // ...
    }

    // ...
}
```
![015.gif](https://cdn.nlark.com/yuque/0/2024/gif/35159616/1708337422682-82a04fd3-4fca-442c-a17a-c1ed6afdd363.gif#averageHue=%23796a56&clientId=uf2d43201-893a-4&from=drop&id=ua8033d8c&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17415468&status=done&style=none&taskId=ued26ee76-a26d-4d50-91e9-c2dc6e4043e&title=)
现在一切正常。
### 等待场景准备好
我们现在遇到的问题是，场景加载时关键点是可见的。一个简单的解决方法是创建一个变量，并在一切准备就绪后将其设置为`false`。在`tick`函数中，如果该变量为`true` ，我们只会更新点。
创建一个`sceneReady`变量`false`，并在`loadingManagersuccess` 函数中将其设置为`true`：
```javascript
let sceneReady = false
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
        // ...

        window.setTimeout(() =>
        {
            sceneReady = true
        }, 2000)
    },

    // ...
)
```
最后，在`tick`函数中，将整个点循环放入`if`语句中：
```javascript
const tick = () =>
{
    // ...

    if(sceneReady)
    {
        for(const point of points)
        {
            // ...
        }
    }

    // ...
}
```

![016.gif](https://cdn.nlark.com/yuque/0/2024/gif/35159616/1708337430781-30027bcf-2b97-4d76-9d37-166762c43ee0.gif#averageHue=%23000000&clientId=uf2d43201-893a-4&from=drop&id=ucc5cfa48&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2784372&status=done&style=none&taskId=u657774af-e7f7-4049-991a-82f08196c6a&title=)
这些点应该只在场景准备好并且介绍几乎完全消失时显示。
## 添加更多点
就是这样！我们的观点很好地发挥作用。我们现在可以添加更多点并更改文本以获得更有说服力的内容。
在 HTML 中：
```html
<div class="point point-0">
    <div class="label">1</div>
    <div class="text">Front and top screen with HUD aggregating terrain and battle informations.</div>
</div>
<div class="point point-1">
    <div class="label">2</div>
    <div class="text">Ventilation with air purifier and detection of environment toxicity.</div>
</div>
<div class="point point-2">
    <div class="label">3</div>
    <div class="text">Cameras supporting night vision and heat vision with automatic adjustment.</div>
</div>
```
在 JavaScript 中：
```javascript
const points = [
    {
        position: new THREE.Vector3(1.55, 0.3, - 0.6),
        element: document.querySelector('.point-0')
    },
    {
        position: new THREE.Vector3(0.5, 0.8, - 1.6),
        element: document.querySelector('.point-1')
    },
    {
        position: new THREE.Vector3(1.6, - 1.3, - 0.7),
        element: document.querySelector('.point-2')
    }
]
```

![017.gif](https://cdn.nlark.com/yuque/0/2024/gif/35159616/1708337445739-55f3e483-a6cb-43e7-89a0-2d1f47fc2e42.gif#averageHue=%23000000&clientId=uf2d43201-893a-4&from=drop&id=uccf64cdf&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=14334933&status=done&style=none&taskId=u61d77b11-2eb9-454e-bbb5-f655adb8174&title=)
## 更进一步
我们在这里所做的只是其中一种方法。你可能会采取不同的做法，而且可能会更好。这取决于你、项目、动画、表演、代码的灵活性等等。
性能还有改进的空间。目前，我们正在更新每一帧上的所有点。我们可以只更新可见的。
请记住，将 HTML 与 WebGL 结合通常会降低性能。避免这样做，如果您别无选择，请密切关注帧速率并定期在不同设备上进行测试。

