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
让我们主食该`samples`属性，以便正确测试抗锯齿pass：
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
# 
# 34. Performance tips 性能提示
## 介绍 [00:00](https://threejs-journey.com/lessons/performance-tips#)
正如我们在第一课中所说，您应该至少以 60fps 的体验为目标。有些用户甚至可能拥有应以更高帧速率运行体验的配置。这些人通常是游戏玩家，对性能和帧速率的要求更高。
可能存在两个主要限制：

- 中央处理器
- 图形处理器

您需要密切关注性能并在具有不同设置的多个设备上进行测试，如果您的网站应该与移动设备兼容，请不要忘记移动设备。
如果您还关注网站的整体权重，将会有所帮助。当我们在本地开发时，加载速度非常快，但是一旦在线，它取决于用户连接和服务器速度。我们需要尽可能保持资产的轻量。
有很多提高表现和体重的技巧，我们已经看到了其中的大部分，但这里有一个详尽的列表。
## 设置 [01:35](https://threejs-journey.com/lessons/performance-tips#)
以下一些技巧在启动器中包含代码示例，并且每个技巧都有一个编号。如果你想测试的话，取消相应代码部分的注释。
## 监控 [02:02](https://threejs-journey.com/lessons/performance-tips#)
首先，我们需要衡量性能，而不仅仅是目测。
### 1 - 监控 FPS
Chrome 曾经有一个不错的 FPS 仪表，但现在没有了。相反，我们可以使用 JavaScript FPS 仪表，例如[stats.js](https://github.com/mrdoob/stats.js/)。
将其添加到依赖项中npm install --save stats.js。
导入并实例化它
```javascript
import Stats from 'stats.js'

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)
```
在函数中调用它的begin()方法end()tick
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
无论屏幕功能如何，都有一种方法可以解锁 Chrome 帧速率。
即使在性能良好的计算机上，这也能实现帧速率监控。例如，如果您正在一台好的计算机上进行开发，并且您看到60fps，您可能会认为这没问题。但也许你的网站只能70~80fps在那台好电脑上运行，但在其他电脑上帧率会下降60fps，而你却浑然不觉。
如果解锁帧速率限制，您会发现性能不够好，为了150~200fps安全起见，您应该在这台计算机上以类似的速度运行。
要解锁 Chrome 帧速率：

- 完全关闭它 - 如果您在 Chrome 上查看本课程，请将以下说明写在其他地方。
- 打开终端。
- 打开以下 Github gist 并启动正确的命令 - Mac 或 Windows： https: [//gist.github.com/brunosimon/c15e7451a802fa8e34c0678620022f7d](https://gist.github.com/brunosimon/c15e7451a802fa8e34c0678620022f7d)

Chrome 应该可以在没有帧速率限制的情况下打开。您可以通过再次打开FPS 仪表来进行练习测试。如果不起作用，请将其关闭并重试。如果它仍然不起作用，你就不得不放弃它。
当心; 这样做会从您的计算机中消耗更多电量，并可能导致 Chrome 崩溃。
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
可以renderer提供一些有关场景中的内容和正在绘制的内容的信息。
只需登录renderer.info即可获取此信息：
```javascript
console.log(renderer.info)
```
## 一般的 [16:26](https://threejs-journey.com/lessons/performance-tips#)
### 5 - 良好的 JavaScript 代码
这是不言而喻的，但我们必须保留高性能的本机 JavaScript 代码。这在函数中更为重要，tick因为这个函数将在每一帧上被调用。
### 6 - 处理东西
一旦您绝对确定不需要几何体或材质等资源，请将其丢弃。如果你创建一个有关卡的游戏，一旦用户进入下一个关卡，就处理掉上一个关卡的东西。
为此，Three.js 文档上有一个专门的页面：[https://thirdjs.org/docs/#manual/en/introduction/How-to-dispose-of-objects](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects)
这是一个立方体的示例：
```javascript
scene.remove(cube)
cube.geometry.dispose()
cube.material.dispose()
```
## 灯 [18:47](https://threejs-journey.com/lessons/performance-tips#)
### 7 - 避开它们
如果可能，尽量避免使用 Three.js 灯。这些很有用且易于使用，但它们会逐渐降低计算机的性能。
如果您别无选择，请尝试使用尽可能少的灯光，并使用最便宜的灯光，例如[环境光](https://threejs.org/docs/#api/en/lights/AmbientLight)或[定向光](https://threejs.org/docs/#api/en/lights/DirectionalLight)
### 8 - 避免添加或移除灯光
当您在场景中添加或删除灯光时，所有支持灯光的材质都必须重新编译。这就是 Three.js 的工作原理，如果您有一个复杂的场景，这可能会导致屏幕冻结一会儿。
## 阴影 [19:56](https://threejs-journey.com/lessons/performance-tips#)
### 9 - 避开它们
与灯光一样，阴影很方便，但对表演不利。避免它们并尝试找到替代方案，例如烘焙阴影 - 例如当阴影直接位于纹理中时。
### 10 - 优化阴影贴图
如果您没有任何其他选择，请尝试优化阴影贴图，使它们看起来不错但与场景完美契合。
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
还尝试使用尽可能小的分辨率和下降结果mapSize：
```javascript
directionalLight.shadow.mapSize.set(1024, 1024)
```
### 11 - 明智地使用castShadow和receiveShadow
有些对象可以投射阴影，有些对象可以接收阴影，有些对象可能两者兼而有之。尝试在尽可能少的物体上激活castShadow和：receiveShadow
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
正如您所看到的，我们不再看到torusKnot阴影旋转。
## 纹理 [25:33](https://threejs-journey.com/lessons/performance-tips#)
### 13 - 调整纹理大小
纹理占用 GPU 内存中的大量空间。对于 mipmap（自动生成的用于缩小过滤和放大过滤的较小版本）来说情况更糟。
纹理文件的重量与此无关，只有分辨率很重要。
尝试将分辨率降低到最低，同时保持不错的结果。
### 14 - 保持 2 分辨率的幂
调整大小时，请记住保持 2 的幂分辨率。这对于 mipmap 很重要。
分辨率不必是正方形；也可以是正方形。您可以设置与高度不同的宽度。
如果您不这样做并且渲染需要 mipmap，Three.js 将尝试通过将图像大小调整为最接近的 2 分辨率的幂来修复它，但此过程将占用资源并可能导致纹理质量较差。
### 15 - 使用正确的格式
我们说过该格式不会改变 GPU 上的内存使用情况，但使用正确的格式可能会减少加载时间。
您可以根据图像使用.jpg或并进行压缩，还可以使用 alpha 通道。.png
您可以使用[TinyPNG](https://tinypng.com/)等在线工具来进一步减轻重量。您还可以尝试特殊格式，例如基础。
Basis是一种类似于.jpgand的格式.png，但压缩能力很强，并且该格式更容易被GPU读取。我们不会介绍它，因为它很难生成，但如果您愿意，请尝试一下。您可以在此处找到用于创建.basis文件的信息和工具： https: [//github.com/BinomialLLC/basis_universal](https://github.com/BinomialLLC/basis_universal)
## 几何形状 [30:04](https://threejs-journey.com/lessons/performance-tips#)
### 16 - 使用BufferGeometry
Three.js 的旧版本（125 之前）曾经具有“非缓冲”几何形状。这些对性能不利，你应该避免它们。
如果您使用的是 Three.js 的最新版本，无需担心，所有几何图形都是缓冲区几何图形。
### 17 - 不更新顶点
更新几何体的顶点对于性能来说非常糟糕。您可以在创建几何图形时执行一次，但避免在tick函数中执行此操作。
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
如果几何图形不应该移动，您还可以使用BufferGeometryUtils. 这个类默认是不可用的，我们需要导入它：
```javascript
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'
```
我们不需要实例化它，直接使用它的方法就可以了。
使用mergeBufferGeometries(...)以一组几何图形作为参数的方法来获取一个合并的几何图形作为回报。然后我们可以将该几何体与单个[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)一起使用：
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
## 材料 [37:55](https://threejs-journey.com/lessons/performance-tips#)
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
## 网格 [39:58](https://threejs-journey.com/lessons/performance-tips#)
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
## 楷模 [48:30](https://threejs-journey.com/lessons/performance-tips#)
### 23 - 低聚
使用低多边形模型。多边形越少，帧速率越好。如果您需要细节，请尝试使用法线贴图。它们在性能方面很便宜，并且可以以纹理成本为您提供丰富的细节。
### 24 - 德拉科压缩
如果模型具有大量具有非常复杂几何形状的细节，请使用 Draco 压缩。它可以大幅度减轻体重。缺点是解压缩几何体时可能会冻结，而且您还必须加载 Draco 库。
### 25 - Gzip
Gzip 是发生在服务器端的压缩。大多数服务器不 gzip 文件，例如.glb、.gltf、.obj等。
看看您是否能找出解决方法，具体取决于您使用的服务器。
## 相机 [51:33](https://threejs-journey.com/lessons/performance-tips#)
### 26 - 视野
当对象不在视野中时，它们不会被渲染。这称为视锥体剔除。
这看起来像是一个庸俗的解决方案，但你可以缩小相机的视野。屏幕上的对象越少，要渲染的三角形就越少。
### 27 - 近与远
就像视野一样，您可以减少相机的near和属性。far如果你有一个广阔的世界，有山脉、树木、建筑物等，用户可能看不到那些远在山后视线之外的小房子。将其降低far到一个合适的值，这些房子甚至不会尝试渲染。
## 渲染器 [52:49](https://threejs-journey.com/lessons/performance-tips#)
### 29 - 像素比
有些设备具有非常高的像素比。这只是一个营销论点，但渲染的像素越多，帧速率就越差。
尝试将渲染器的像素比限制为2：
```javascript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
```
### 30 - 电源偏好
某些设备可能能够在不同 GPU 或不同 GPU 使用率之间切换。我们可以通过指定一个属性来提示实例化[WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer)时需要什么功率：powerPreference
```javascript
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    powerPreference: 'high-performance'
})
```
如果您没有性能问题，请将此属性设置为'default'。
### 31 - 抗锯齿
默认的抗锯齿是高性能的，但它的性能仍然低于无抗锯齿。仅当您有明显的锯齿且没有性能问题时才添加它。
## 后期处理 [55:21](https://threejs-journey.com/lessons/performance-tips#)
### 32 - 限制传球
每个后处理通道将采用与渲染分辨率（包括像素比率）一样多的像素进行渲染。如果您的1920x1080分辨率为 4 遍且像素比为2，则需要1920 * 2 * 1080 * 2 * 4 = 33 177 600渲染像素。保持理性，并尝试将您的自定义通行证重新组合为一个通行证。
## 着色器 [56:34](https://threejs-journey.com/lessons/performance-tips#)
### 31 - 指定精度
您可以通过更改材质中着色器的属性来强制其精度 precision：
```javascript
const shaderMaterial = new THREE.ShaderMaterial({
    precision: 'lowp',
    // ...
})
```
检查结果是否有任何质量降级或故障。
这不适用于 RawShaderMaterial [，](https://threejs.org/docs/#api/en/materials/RawShaderMaterial)您必须precision自己在着色器上添加，就像我们在第一节着色器课程中所做的那样。
### 32 - 保持代码简单
监视差异很费力，但请尽量使着色器代码尽可能简单。避免if陈述。充分利用 swizzles 和内置函数。
与顶点着色器中一样，而不是if声明：
```glsl
modelPosition.y += clamp(elevation, 0.5, 1.0) * uDisplacementStrength;
```
或者像在片段着色器中一样，代替 、r和g的这些复杂公式b：
```glsl
vec3 depthColor = vec3(1.0, 0.1, 0.1);
vec3 surfaceColor = vec3(0.1, 0.0, 0.5);
vec3 finalColor = mix(depthColor, surfaceColor, elevation);
```
### 33 - 使用纹理
使用柏林噪声函数很酷，但它会极大地影响您的性能。有时，您最好使用代表噪声的纹理。使用texture2D()比柏林噪声函数便宜得多，并且您可以使用 Photoshop 等工具非常有效地生成这些纹理。
### 34 - 使用定义
Uniform 很有用，因为我们可以调整它们并为 JavaScript 中的值设置动画。但制服有性能成本。如果该值不应该更改，您可以使用定义。有两种创建define.
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
[如果您使用ShaderMaterial ，](https://threejs.org/docs/#api/en/materials/ShaderMaterial)这些defines将自动添加到 GLSL 代码中。
### 35 - 在顶点着色器中进行计算
如果可能，在顶点着色器中进行计算并将结果发送到片段着色器。
## 走得更远 [01:10:42](https://threejs-journey.com/lessons/performance-tips#)
从一开始就密切关注表演。在其他设备上进行测试，使用我们最初看到的工具并修复任何奇怪的行为，然后再进一步。
每个项目都会有不同的限制，应用这些技巧并不总是足够的。尝试寻找解决方案。改变你做事的方式。放聪明点。
您将在整个项目中找到更好的做事方式，并且您将更快地适应。在某一时刻，您甚至会知道获得相同结果的多种方法，并且您将有机会选择最好的一种。
[以下是Lewy Blue](https://twitter.com/lewy_blue)提供的另一个关于改进 Three.js 使用方式的重要提示：[https://discoverthirdjs.com/tips-and-tricks/](https://discoverthreejs.com/tips-and-tricks/)
