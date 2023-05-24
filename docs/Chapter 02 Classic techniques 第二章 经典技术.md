# 15. Lights 灯
## 介绍
正如我们在上一课中看到的，添加灯光就像添加网格一样简单。您使用适当的类实例化一盏灯，然后将其添加到场景中。
有多种类型的光，我们已经发现了[AmbientLight](https://threejs.org/docs/#api/en/lights/AmbientLight)和[PointLight](https://threejs.org/docs/#api/en/lights/PointLight)。
在本课中，我们将详细了解所有不同的类以及如何使用它们。
## 设置
启动器中已经设置了一个场景（包括一个球体、一个立方体、一个环面和一个作为地板的平面），但如果您想自己写代码渲染联系，请自行创建项目尝试。
因为我们要使用灯光，所以我们必须使用对灯光有反应的材料。我们本可以使用[MeshLambertMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshLambertMaterial)、[MeshPhongMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshPhongMaterial)或[MeshToonMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshToonMaterial)，但我们将使用 **MeshStandardMaterial**，[因为](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial)它是我们在上一课中看到的最真实的材料。材质还减少了`roughness值`到`0.4`，去查看灯光的反射。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684722463973-ff832f7b-74c9-4aa2-8231-72bf6f5fedb7.png#averageHue=%236b6b6b&clientId=u64a40afa-2b33-4&from=paste&id=uaccacf45&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9524f7d5-52bd-403e-9964-4cf2a5114ba&title=)
一旦启动器开始工作，从头开始我们移除[AmbientLight](https://threejs.org/docs/index.html#api/en/lights/AmbientLight)和[PointLight](https://threejs.org/docs/index.html#api/en/lights/PointLight)两个光源。你应该得到一个渲染结果：纯黑色的幕布，里面什么都看不到。
## 环境光 [AmbientLight](https://threejs.org/docs/index.html#api/en/lights/AmbientLight)
AmbientLight在场景的所有几何体上应用全向照明[。](https://threejs.org/docs/index.html#api/en/lights/AmbientLight)第一个参数是`color`，第二个参数是`intensity`。至于材质，可以在实例化时直接设置属性，也可以在实例化后更改：

```javascript
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// Equals
const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 0.5
scene.add(ambientLight)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684722463965-60e57404-ded9-4dca-b538-b6a5ddae6536.png#averageHue=%23404040&clientId=u64a40afa-2b33-4&from=paste&id=u356e8ef6&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u50264a18-85e5-4183-9ac7-bfc17c99ad5&title=)
就像我们课程中对材料所做的操作那样，您可以将属性添加到调试 UI。我们不会在本课的其余部分调试新的属性，但如果您想简化测试，请随时添加调整：

```javascript
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
```
如果您只有一个[AmbientLight，您将获得与](https://threejs.org/docs/index.html#api/en/lights/AmbientLight)[MeshBasicMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial)相同的效果，因为几何体的所有面都将被均匀照亮。
在现实生活中，当你照亮一个物体时，由于光线会在墙壁和其他物体上反射，因此与光相对的物体的侧面不会完全变黑。出于性能原因，Three.js 不支持光反射，但您可以使用昏暗的[AmbientLight](https://threejs.org/docs/index.html#api/en/lights/AmbientLight)来伪造这种光反射。
## 定向光 [DirectionalLight](https://threejs.org/docs/?q=DirectionalLight#api/zh/lights/DirectionalLight)
[DirectionalLight](https://threejs.org/docs/?q=DirectionalLight#api/zh/lights/DirectionalLight)将具有类似太阳的效果[，](https://threejs.org/docs/index.html#api/en/lights/DirectionalLight)就好像太阳光线平行传播一样。第一个参数是`color`，第二个参数是`intensity`：

```javascript
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
scene.add(directionalLight)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684722463862-a27e326f-c714-43fc-b7dd-56e9d64cd5d4.png#averageHue=%23858685&clientId=u64a40afa-2b33-4&from=paste&id=u82f6cf4a&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uba8cc670-af78-4b0c-a577-1765888e0ab&title=)
默认情况下，光线似乎来自上方。`position`要更改它，您必须像使用普通对象一样使用该属性移动整个灯光。

```javascript
directionalLight.position.set(1, 0.25, 0)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684722463910-11fc7e7c-10f8-4bce-9130-757d7d97abd9.png#averageHue=%23424b4b&clientId=u64a40afa-2b33-4&from=paste&id=uf2a51a1b&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ucefc91a7-cc99-4532-9381-53b5bebdc41&title=)
光的距离暂时无关紧要。光线来自无限空间，平行于无限对面传播。
## 半球光 [HemisphereLight](https://threejs.org/docs/?q=HemisphereLight#api/zh/lights/HemisphereLight)
[HemisphereLight](https://threejs.org/docs/?q=HemisphereLight#api/zh/lights/HemisphereLight)与[AmbientLight](https://threejs.org/docs/index.html#api/en/lights/HemisphereLight)相似[，](https://threejs.org/docs/index.html#api/en/lights/AmbientLight)但天空的颜色与地面的颜色不同。面向天空的面将被一种颜色照亮，而另一种颜色的光将照亮面向地面的面。
第一个参数是`color`对应天空的颜色，第二个参数是`groundColor`对应地面的颜色，第三个参数是`intensity`：

```javascript
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
scene.add(hemisphereLight)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684722463949-0b6a4c9d-7915-4f4c-8776-07417ed951cd.png#averageHue=%235b4141&clientId=u64a40afa-2b33-4&from=paste&id=u257748cd&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8309d240-cc5c-44be-ab26-8dcf5811803&title=)
## 点光源 [PointLight](https://threejs.org/docs/?q=PointLight#api/zh/lights/PointLight)
[PointLight](https://threejs.org/docs/?q=PointLight#api/zh/lights/PointLight)几乎就像一个**打火机**[。](https://threejs.org/docs/index.html#api/en/lights/PointLight)光源无限小，光向各个方向均匀传播。第一个参数是`color`，第二个参数是`intensity`：

```javascript
const pointLight = new THREE.PointLight(0xff9000, 0.5)
scene.add(pointLight)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684722466356-c8a4572a-4034-42e3-a1af-28b50a24f1d7.png#averageHue=%23725144&clientId=u64a40afa-2b33-4&from=paste&id=u55c69150&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u232002c6-10a2-4249-92b7-2e964e59c80&title=)
我们可以像移动任何对象一样移动它：

```javascript
pointLight.position.set(1, - 0.5, 1)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684722467647-cbf080a8-cf75-4356-a468-4c1b7093a3c2.png#averageHue=%23684a45&clientId=u64a40afa-2b33-4&from=paste&id=u2b24f75c&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue53fecab-7bc9-4129-97e0-30774311897&title=)
默认情况下，光强度不会衰减。但是您可以使用`distance`和`decay`属性控制淡入淡出距离以及淡入淡出的速度。写入实例化类参数的第三个和第四个参数，或者在实例的属性中：

```javascript
const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684722467555-f79ebb95-eb1b-485f-ab27-3cfbba263ca4.png#averageHue=%23674945&clientId=u64a40afa-2b33-4&from=paste&id=u0fee8a6d&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uc3544d38-67a9-4af2-967d-ca5e7783fcd&title=)
## 矩形区域光 [RectAreaLight](https://threejs.org/docs/index.html#api/en/lights/RectAreaLight)
[RectAreaLight](https://threejs.org/docs/index.html#api/en/lights/RectAreaLight)[的](https://threejs.org/docs/index.html#api/en/lights/RectAreaLight)工作方式类似于您在照片拍摄集中看到的大矩形灯。它是定向光和漫射光之间的混合。第一个参数是`color`，第二个参数是`intensity`，第三个参数是矩形的`width`，第四个参数是它的`height`：

```javascript
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
scene.add(rectAreaLight)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684722468083-1a0ebe33-ad05-4a5f-a967-38acc8ff5e2a.png#averageHue=%23e4a294&clientId=u64a40afa-2b33-4&from=paste&id=u8faa1e89&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf0b82e81-98ad-4a4d-a74f-f07e745b04a&title=)
[RectAreaLight](https://threejs.org/docs/index.html#api/en/lights/RectAreaLight)仅适用[于](https://threejs.org/docs/#api/en/materials/MeshPhysicalMaterial)[MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)[和](https://threejs.org/docs/index.html#api/en/lights/RectAreaLight)MeshPhysicalMaterial 。
然后您可以移动灯光并旋转它。为了简化旋转，您可以使用我们在上一课中看到的方法`lookAt(...)`：

```javascript
rectAreaLight.position.set(- 1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684722469293-8aac0fb0-a925-49d9-8f56-f83f23d69a2a.png#averageHue=%23edf0eb&clientId=u64a40afa-2b33-4&from=paste&id=u74ca0be8&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ubf1c9c86-824d-483e-88fd-a0b6f8c8bfb&title=)
[没有任何参数的 Vector3](https://threejs.org/docs/index.html#api/en/math/Vector3)，将具有它的`x`、`y`和`z`到 `0`（场景的中心）。
## 聚光灯 [SpotLight](https://threejs.org/docs/?q=SpotLight#api/zh/lights/SpotLight)
[SpotLight](https://threejs.org/docs/?q=SpotLight#api/zh/lights/SpotLight)就像手电筒一样工作[。](https://threejs.org/docs/index.html#api/en/lights/SpotLight)它是一个从一点开始并朝向一个方向的光锥。这里是它的参数列表：

- `color`： 颜色
- `intensity`：强度
- `distance`：强度下降到的距离`0`
- `angle`: 光束有多大
- `penumbra`：光束轮廓的扩散程度
- `decay`：光线变暗的速度

```javascript
const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684722471277-1fe9ea80-c99f-4610-a6fa-99ee89d32f22.png#averageHue=%23f1d7a1&clientId=u64a40afa-2b33-4&from=paste&id=uab376cbc&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8fb00b56-70ca-45ee-ac5b-f3801858b27&title=)
旋转我们的[SpotLight](https://threejs.org/docs/index.html#api/en/lights/SpotLight)有点困难。该实例有一个名为 `target` 的属性，它是一个[Object3D](https://threejs.org/docs/index.html#api/en/core/Object3D)。SpotLight始终注视着`target`那个[对象](https://threejs.org/docs/index.html#api/en/lights/SpotLight)。但是如果你试图改变它的位置，[SpotLight](https://threejs.org/docs/index.html#api/en/lights/SpotLight)不会移动：

```javascript
spotLight.target.position.x = - 0.75
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684722471313-67f1257b-756b-4a4c-8de6-e4d02907e8ae.png#averageHue=%23f0cf9f&clientId=u64a40afa-2b33-4&from=paste&id=udb5113ec&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u93ade7cd-1971-4b65-b54f-d212960bcbd&title=)
那是因为我们`target`不在现场。简单地添加`target`到场景中，它应该可以工作：

```javascript
scene.add(spotLight.target)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684722471950-2b482047-eae2-479c-9624-58e6fc28a0ae.png#averageHue=%23f2d7b4&clientId=u64a40afa-2b33-4&from=paste&id=u4c65636a&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9861bde2-242b-4ed2-a251-e6dcca2fa4c&title=)
## 表现 
添加灯光后效果很棒，如果使用得当，可以使项目很逼真。问题是，就性能而言，灯光可能会花费很多性能。GPU 将不得不做很多计算，比如面部到光线的距离、面部面向光线的距离、面部是否在聚光灯锥中等。
尝试添加尽可能少的灯，并尝试使用成本较低的灯。
**最低成本**：

- 环境光
- 半球光

**中等成本**：

- 定向光
- 点光源

成本高：

- 聚光灯
- 矩形区域光
## 烘烤 Baking
一种很好的照明技术称为烘焙。这个想法是将光线烘焙到纹理中。这可以在 3D 软件中完成。不幸的是，您将无法移动灯光，因为没有灯光，而且您可能需要很多纹理。
一个很好的例子是[Three.js Journey](https://threejs-journey.xyz/)主页
![](https://cdn.nlark.com/yuque/0/2023/jpeg/35159616/1684722474004-7a4ce9d3-944b-4142-adf8-8384994c11d5.jpeg#averageHue=%23729185&clientId=u64a40afa-2b33-4&from=paste&id=u4ccf7350&originHeight=4096&originWidth=4096&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u02af41c6-25f9-421d-8f16-f7509ab5891&title=)
## 帮手
定位和定向灯很困难。为了帮助我们，我们可以使用助手。现在只仅支持以下助手：

- [半球光助手](https://threejs.org/docs/index.html#api/en/helpers/HemisphereLightHelper)
- [DirectionalLightHelper](https://threejs.org/docs/index.html#api/en/helpers/DirectionalLightHelper)
- [点光源助手](https://threejs.org/docs/index.html#api/en/helpers/PointLightHelper)
- [RectAreaLightHelper](https://threejs.org/docs/index.html#examples/en/helpers/RectAreaLightHelper)
- [聚光灯助手](https://threejs.org/docs/index.html#api/en/helpers/SpotLightHelper)

要使用它们，只需实例化这些类。使用相应的灯光作为参数，并将它们添加到场景中。第二个参数使您能够更改助手的`size`：

```javascript
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684722475367-230710a3-37e3-46e9-9fc1-1a549ad9a598.png#averageHue=%23e2cca4&clientId=u64a40afa-2b33-4&from=paste&id=udd498c22&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3a01b9dd-5493-44c2-9ff2-e6282b52fa6&title=)
RectAreaLightHelper有点难用[。](https://threejs.org/docs/index.html#examples/en/helpers/RectAreaLightHelper)现在，该类不是`THREE`核心变量的一部分。`examples`您必须像我们对[OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)所做的那样从依赖项中导入它：

```javascript
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
```

然后你可以使用它：

```javascript
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684722476075-3c70e983-e6b6-4495-80c4-73fb322a1676.png#averageHue=%23d2d2a7&clientId=u64a40afa-2b33-4&from=paste&id=uc6cdce15&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uadb20d7b-1cfc-4aa6-9d4d-8ebb0a1e7ff&title=)

# 16. Shadows 阴影
## 介绍 
上节课我们学会了灯光，现在我们需要阴影。物体的背面应该在黑暗中，这就是阴影所谓的核心。我们缺少的是物体对象的投影，也就是根据被投影的对象在其他对象身上创建阴影。
阴影渲染一直是实时 3D 渲染的一大挑战，开发人员必须找到技巧以合理的帧速率显示逼真的阴影。
实现它们的方法有很多种，Three.js 有一个内置的解决方案。请注意，此解决方案很方便，但并非完美。
## 怎么运行的
我们不会详细说明阴影渲染在底层是如何工作的，但我们可以尝试了解基础知识。
当您进行一次渲染时，Three.js 将首先为每个灯光照射下应该投射阴影的地方进行一次渲染。渲染器将模拟光线下阴影所看到的样子，就好像它是一台相机一样。在这些灯光渲染期间，[MeshDepthMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshDepthMaterial)将替换所有网格材质。
最后将结果存储为纹理和包含命名过的阴影贴图。
您看不到那些存储好的阴影贴图，它们用于投射到几何体上然后替换其原本的材质。
这是定向光和聚光灯看到的一个很好的例子： https: [//threejs.org/examples/webgl_shadowmap_viewer.html](https://threejs.org/examples/webgl_shadowmap_viewer.html)
## 设置
我们的启动器由一个平面上的一个简单球体组成，该球体具有一个定向光和一个环境光。
您可以在 Dat.GUI 中控制这些灯光以及材质的金属度和粗糙度。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727115175-ef13384c-2140-4d19-85fc-b4bdccb9c569.png#averageHue=%236b6b6b&clientId=u96a1595c-6b0c-4&from=paste&id=u9185b4b5&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u7dc3c046-4d43-4e6e-b0a4-2e217e0d4d4&title=)
## 如何激活阴影
首先，我们需要激活阴影贴图渲染器`renderer`：

```javascript
renderer.shadowMap.enabled = true
```
然后，我们需要遍历场景中的每个对象，并确定该对象是否可以使用该属性`castShadow`投射阴影，以及该对象是否可以使用该属性`receiveShadow`接收阴影。
尝试在尽可能少的对象上激活它们：

```javascript
sphere.castShadow = true

// ...
plane.receiveShadow = true
```
最后，使用`castShadow`属性激活光的阴影。
只有以下类型的灯光支持阴影：

- [点光源](https://threejs.org/docs/index.html#api/en/lights/PointLight)
- [定向光](https://threejs.org/docs/index.html#api/en/lights/DirectionalLight)
- [聚光灯](https://threejs.org/docs/index.html#api/en/lights/SpotLight)

再次尝试在尽可能少的灯光上激活阴影：

```javascript
directionalLight.castShadow = true
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727114982-0f7bed34-22d3-4569-ae2c-4cf0bcf11d8c.png#averageHue=%23696969&clientId=u96a1595c-6b0c-4&from=paste&id=u3a904ab6&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u4c557141-2595-4fc0-b15e-f7d0cde0ae3&title=)
你应该在平面上得到球体的阴影。
可悲的是，这个渲染的影子看起来很可怕。让我们尝试改进它。
## 阴影贴图优化
### 渲染尺寸
正如我们在课程开始时所说，Three.js 可以为每盏灯进行称为阴影贴图的渲染。您可以使用灯光上的`shadow`属性访问此阴影贴图（以及许多其他内容）：

```javascript
console.log(directionalLight.shadow)
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684734979250-f1d6c1a0-ec23-42e4-808c-4509dcbc72fa.png#averageHue=%23fefefe&clientId=u96a1595c-6b0c-4&from=paste&height=204&id=u2e83cee3&originHeight=407&originWidth=426&originalType=binary&ratio=2&rotation=0&showTitle=false&size=57111&status=done&style=none&taskId=u3a7cd0f8-8eae-4007-a512-b07f6d0df58&title=&width=213)
至于我们的渲染，我们需要给阴影贴图指定一个大小。默认情况下，出于性能原因阴影贴图大小仅512x512像素。我们可以改进它，但请记住， `mipmapping`限制，您需要 2 的幂值：

```javascript
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727114957-a0eda35f-8427-403a-962f-5cf1292fafa4.png#averageHue=%23696969&clientId=u96a1595c-6b0c-4&from=paste&id=u9fec7cae&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u458dbe36-96fb-46a6-8448-d2bfbb791c1&title=)
阴影应该已经看起来比原先的更真实了。
### 近与远
Three.js 使用相机进行阴影贴图渲染。这些相机与我们已经使用的相机具有相同的属性。这意味着我们必须定义 `near`和  `far`。**它不会真正提高阴影的质量，但它可能会修复您看不到阴影或阴影突然被裁剪的错误**。
为了帮助我们调试相机并预览`near`和`far`，我们可以将[CameraHelper](https://threejs.org/docs/#api/en/helpers/CameraHelper)与位于`directionalLight.shadow.camera`属性中的阴影贴图相机一起使用：

```javascript
const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightCameraHelper)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727115229-3389b2e5-b70d-475a-895f-7be50839f595.png#averageHue=%23080707&clientId=u96a1595c-6b0c-4&from=paste&id=uef2de416&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uaac393c6-2633-4e4c-a787-05dccf1c911&title=)
现在您可以直观地看到相机的`near`和`far`尝试找到适合场景的值：

```javascript
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727115036-8c86cf29-28a5-40d7-add8-131229c0fa52.png#averageHue=%23050404&clientId=u96a1595c-6b0c-4&from=paste&id=u5a5eb10e&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ub1ccddd4-712d-4aa5-8794-cc540c9cdd8&title=)
### 振幅
通过我们刚刚添加的相机助手，我们可以看到相机的振幅太大了。
因为我们使用的是[DirectionalLight](https://threejs.org/docs/#api/en/lights/DirectionalLight)，Three.js 使用的是[OrthographicCamera](https://threejs.org/docs/#api/en/cameras/OrthographicCamera)。如果您还记得相机课程，我们可以使用`top`、`right`、`bottom`和`left`属性控制相机在每一侧可以看到的距离。让我们减少这些属性：

```javascript
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = - 2
directionalLight.shadow.camera.left = - 2
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727117358-b606bebb-4782-46f3-881f-04ff28e85d9a.png#averageHue=%230f0e0e&clientId=u96a1595c-6b0c-4&from=paste&id=u55294a9c&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u5a9555b0-41d8-498b-b111-3d6fecd7800&title=)
**值越小，阴影越精确。但如果它太小，阴影就会被裁剪掉。**
完成后，您可以隐藏相机助手：

```javascript
directionalLightCameraHelper.visible = false
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727118423-24bd97f8-4064-474e-99fa-b53ea90ba0a1.png#averageHue=%23696969&clientId=u96a1595c-6b0c-4&from=paste&id=ue50a5d9a&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=udfe4ef3f-e7fb-4fc0-8cb3-f2a8b4bef4c&title=)
### 模糊
您可以使用以下属性控制阴影模糊`radius`：

```javascript
directionalLight.shadow.radius = 10
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727118446-58419b03-61c9-4849-a63d-74f9b3399959.png#averageHue=%23696969&clientId=u96a1595c-6b0c-4&from=paste&id=u1ddb917f&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u9eeaffa3-04da-48c9-a4c2-679f29a68cc&title=)
此技术不使用相机与对象的接近度。这只是一个普通而廉价的模糊。
### 阴影贴图算法
可以将不同类型的算法应用于阴影贴图：

- `THREE.BasicShadowMap`：性能非常好但质量很差
- `THREE.PCFShadowMap`：性能较差但边缘更平滑
- `THREE.PCFSoftShadowMap`：性能较差但边缘更柔和
- `THREE.VSMShadowMap`：性能较差，约束较多，可能会产生意想不到的结果

要更改它，请更新`renderer.shadowMap.type`属性。默认是`THREE.PCFShadowMap`，但您可以使用`THREE.PCFSoftShadowMap`以获得更好的质量。

```javascript
renderer.shadowMap.type = THREE.PCFSoftShadowMap
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727118956-adb12305-e698-443b-8f87-f871baae4f3a.png#averageHue=%23696969&clientId=u96a1595c-6b0c-4&from=paste&id=ua7103547&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=udbefdea7-0803-4571-bc01-09656f3f8e4&title=)
**请注意，radius 属性不适用于**`**THREE.PCFSoftShadowMap**`**. 你必须做出选择。**
## 聚光灯
让我们尝试像在Lights课程中所做的那样添加一个[SpotLight](https://threejs.org/docs/index.html#api/en/lights/SpotLight)，并将`castShadow`属性添加为`true` ，不要忘记将`target`属性添加到`scene`
我们还将添加一个相机助手：

```javascript
// Spot light
const spotLight = new THREE.SpotLight(0xffffff, 0.4, 10, Math.PI * 0.3)

spotLight.castShadow = true

spotLight.position.set(0, 2, 2)
scene.add(spotLight)
scene.add(spotLight.target)

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
scene.add(spotLightCameraHelper)
```
如果场景太亮，您可以降低其他灯光强度：

```javascript
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)

// ...

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727119608-98b7d161-e119-4d48-90f0-d27b732e13e1.png#averageHue=%236e6e6e&clientId=u96a1595c-6b0c-4&from=paste&id=u14faf8f3&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u23208970-a3e7-42b2-98d4-7143afcbf7a&title=)
如您所见，**阴影不能很好地融合。它们是独立处理的**，不幸的是，现在没有什么可做的优化。
但是我们可以使用和定向光源相同技术 ：控制尺寸的来提高阴影质量。
改变`shadow.mapSize`：

```javascript
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727120457-3afd142b-297d-4dd3-a834-fd621d36c946.png#averageHue=%2370706f&clientId=u96a1595c-6b0c-4&from=paste&id=u32c892ea&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uf1b452bc-ed33-43da-9398-705d5a6a539&title=)
因为我们现在使用的是[SpotLight](https://threejs.org/docs/index.html#api/en/lights/SpotLight)点光源，Three.js 在内部使用的是[PerspectiveCamera](https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera)透视相机。这意味着我们必须要更改`fov`属性，而不是`top`、`right`、`bottom`和`left`属性。我们尝试在不裁剪阴影的情况下找到尽可能小的角度（相机距离越小，阴影质量越高）：

```javascript
spotLight.shadow.camera.fov = 30
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727121347-3c4cd566-7ed7-4d1f-8b66-901139a12873.png#averageHue=%23706f6f&clientId=u96a1595c-6b0c-4&from=paste&id=uc2bef0f7&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u28a73867-6bbb-4206-aff4-eb954fb1f36&title=)
更改`near`和`far`值：

```javascript
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 6
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727121373-a44c9d73-5923-440f-b291-fecc7890c4aa.png#averageHue=%23090909&clientId=u96a1595c-6b0c-4&from=paste&id=u8640bd3e&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u7ef2aa20-32ef-4821-8a74-e07f3048cb0&title=)
完成后，您可以隐藏相机助手：

```javascript
spotLightCameraHelper.visible = false
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727122183-a9e95bf4-4b32-4892-b4e5-3f48d8112379.png#averageHue=%236f6f6f&clientId=u96a1595c-6b0c-4&from=paste&id=u980042b4&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u45fe138f-5b20-4e6f-bbed-1d417d5b8bf&title=)
## 点光源
让我们试试最后一个支持阴影的光源，即[PointLight](https://threejs.org/docs/index.html#api/en/lights/PointLight)：

```javascript
// Point light
const pointLight = new THREE.PointLight(0xffffff, 0.3)

pointLight.castShadow = true

pointLight.position.set(- 1, 1, 0)
scene.add(pointLight)

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
scene.add(pointLightCameraHelper)
```
如果场景太亮，您可以降低其他灯光强度：

```javascript
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)

// ...

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3)

// ...

const spotLight = new THREE.SpotLight(0xffffff, 0.3, 10, Math.PI * 0.3)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727123172-1e8d661d-44ac-4a52-9f1a-6009f044d53f.png#averageHue=%23696969&clientId=u96a1595c-6b0c-4&from=paste&id=u0e98e69d&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uaff0f506-d54e-40f2-8a81-0ee1cbfbbe2&title=)
如您所见，相机助手是一个[PerspectiveCamera （就像](https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera)[SpotLight](https://threejs.org/docs/index.html#api/en/lights/SpotLight)一样）但这个相机的面是朝下的。这是根据 Three.js 如何处理[PointLight](https://threejs.org/docs/index.html#api/en/lights/PointLight)的阴影贴图决定的。
因为点光源照亮各个方向，Three.js 必须渲染 6 个方向创建立方体阴影贴图。您看到的相机助手是相机在这 6 个渲染中的最后一个位置（向下）。
**进行所有这些渲染会产生性能问题。尽量避免在启用阴影的情况下使用过多的**[**PointLight**](https://threejs.org/docs/index.html#api/en/lights/PointLight)**。**
您可以在此处调整的唯一属性是`mapSize`,`near`和`far`：

```javascript
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024

pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 5
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727124020-bf6ac25f-f967-4ece-bb7c-259bcb89650d.png#averageHue=%236a6969&clientId=u96a1595c-6b0c-4&from=paste&id=u7c44ee80&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u8d582faf-91b6-4542-9195-d073fae68a9&title=)
完成后，您可以隐藏相机助手：

```javascript
pointLightCameraHelper.visible = false
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727124560-4bfa06fd-40a0-49e1-8d06-bcf94675d80a.png#averageHue=%236b6b6b&clientId=u96a1595c-6b0c-4&from=paste&id=uad28e820&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u7b375460-7633-4944-9205-ceb5f6115db&title=)
## 烘焙阴影 Baking
如果场景简单，three.js 阴影可能非常有用，反之阴影可能会变得凌乱。
烘焙阴影是一个很好的选择方案。我们在上节课讲过烘焙灯，其实是一回事。阴影贴图被集成到我们应用于材料的纹理中。
无需注释所有与渲染阴影相关的代码行，我们可以简单地在渲染器和每盏灯上停用它们即可：

```javascript
directionalLight.castShadow = false
// ...
spotLight.castShadow = false
// ...
pointLight.castShadow = false
// ...
renderer.shadowMap.enabled = false
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727124581-3467ac15-9304-4bc7-b55a-822e0876fd8f.png#averageHue=%23737373&clientId=u96a1595c-6b0c-4&from=paste&id=u409f77da&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uf8da0e68-2871-4c5f-8dbf-57a7dc0a8b2&title=)
现在我们可以使用经典的[TextureLoader](https://threejs.org/docs/index.html#api/en/loaders/TextureLoader)加载位于`/static/textures/bakedShadow.jpg`其中的阴影纹理。
![](https://cdn.nlark.com/yuque/0/2023/jpeg/35159616/1684727126037-6561ba45-0a7b-4507-b653-5c7b494c9bea.jpeg#averageHue=%23d0d0d0&clientId=u96a1595c-6b0c-4&from=paste&id=uecab05b9&originHeight=1024&originWidth=1024&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u25ab3562-f302-4aa2-b47e-4b9ad37bc6e&title=)
在创建对象和灯光之前添加以下代码：

```javascript
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg')
```

最后，我们将使用带有的简单[MeshBasicMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial) map：bakedShadow，而不是在平面上使用[MeshStandardMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial)：

```javascript
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshBasicMaterial({
        map: bakedShadow
    })
)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727126057-724c0f98-7e6e-48c3-911f-18dffd73ccd1.png#averageHue=%23646464&clientId=u96a1595c-6b0c-4&from=paste&id=u98386d48&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ue9bc757e-79c2-4964-9aa1-181a57dd094&title=)
您应该会看到一个漂亮的模糊且逼真的假阴影。主要问题是它不是动态的，如果球体或灯光移动，阴影也不会。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727127228-d220d9b3-4d90-4c38-8e8f-e0e87092d93e.png#averageHue=%236a6a6a&clientId=u96a1595c-6b0c-4&from=paste&id=ua3c61329&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u1f5226bb-5f63-43f6-8776-e6ab4840bb6&title=)
## 烘焙阴影替代品
**一个不太现实但更动态的解决方案是在球体下方和平面上方使用更简单的阴影**。
![](https://cdn.nlark.com/yuque/0/2023/jpeg/35159616/1684727127630-cd8cb24d-0363-4974-bc3f-e5282acaf91a.jpeg#averageHue=%23434343&clientId=u96a1595c-6b0c-4&from=paste&id=u2477c8ca&originHeight=512&originWidth=512&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=udbd86ddb-4385-468d-9890-bf21fe67469&title=)
纹理是一个简单的光晕。白色部分将可见，黑色部分将不可见。
然后，我们用球体移动那个影子。
[首先，让我们通过将MeshStandardMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial)放回平面上来移除之前的烘焙阴影：

```javascript
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
```
然后，我们可以加载位于` /static/textures/simpleShadow.jpg` 中的基本阴影纹理。

```javascript
const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg')
```
我们可以使用一个简单的平面来创建阴影，该平面旋转并放置在地板上方一点。材质必须是黑色，但带有阴影纹理作为`alphaMap`. 不要忘记更改`transparent`为`true`，并将网格添加到`scene`：

```javascript
const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: simpleShadow
    })
)
sphereShadow.rotation.x = - Math.PI * 0.5
sphereShadow.position.y = plane.position.y + 0.01

scene.add(sphere, sphereShadow, plane)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684727127727-32357d19-d694-4878-ac4e-f94878b51d5d.png#averageHue=%23717171&clientId=u96a1595c-6b0c-4&from=paste&id=udab1f26f&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u1aca32e5-7e71-4db9-ab34-2090b73b083&title=)
一个不那么逼真但非常高效的阴影。
如果要为球体设置动画，只需相应地为阴影设置动画并根据球体的高度更改其不透明度：

```javascript
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update the sphere
    sphere.position.x = Math.cos(elapsedTime) * 1.5
    sphere.position.z = Math.sin(elapsedTime) * 1.5
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))

    // Update the shadow
    sphereShadow.position.x = sphere.position.x
    sphereShadow.position.z = sphere.position.z
    sphereShadow.material.opacity = (1 - sphere.position.y) * 0.3

    // ...
}

tick()
```
## ![tutieshi_640x299_4s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1684739072742-3958e71b-35c1-4062-b25b-279d025afe41.gif#averageHue=%231c1c1c&clientId=u94fdf9d4-a361-4&from=drop&id=u1ede630a&originHeight=299&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=564869&status=done&style=none&taskId=u00fdeabd-a4da-4819-8b96-3817ecf944f&title=)
## 使用哪种技术
找到处理阴影的正确解决方案取决于您。这取决于项目、表现和您掌握的技术。您也可以将它们组合起来。

# 17. Haunted Hous 项目实战鬼屋
## 介绍 
让我们用我们所学的来创造一个鬼屋。我们将只使用 Three.js 基元作为几何体、文件夹中的纹理`/static/textures/`以及一两个新功能。
我们将创建一个由墙壁、屋顶、门和一些灌木组成的基本房屋。我们还将在花园里建造坟墓。我们将简单地使用四处漂浮并穿过墙壁和地板的多色灯来模拟幽灵，而不是由床单制成的可见幽灵。
## 测量技巧
在使用基元创建东西时，我们经常犯的一个初学者错误是使用随机度量。Three.js 中的一个单元可以表示任何你想要的。
假设您正在创造一个相当大的景观以在上面使用相机飞行浏览。在这种情况下，您可能会将作品中的单位视为一公里。如果您正在盖房子，您可能会将作品中的单位视为一米，如果您正在制作弹珠游戏，您可能会将作品中的单位视为一厘米。
具有特定的单位比率将帮助您创建几何图形。假设您想制作门。你知道一扇门比你略高，所以它应该达到 2 米左右。
如果用户使用印制单位，您必须进行转换对于那些英制单位。
## 设置 
启动器仅由地板、球体、一些灯光（对于鬼屋来说太强烈了）组成，阴影甚至都不起作用。
我们将不得不自己建造房子，调整当前的灯光以获得更好的氛围，添加阴影，等等。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684804337617-461cdcda-0592-4eec-920c-b6c17c85e87b.png#averageHue=%2394ab78&clientId=u776a7404-82c7-4&from=paste&id=ua24b0b6c&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u63dabc18-d69b-4722-9157-765886161fd&title=)
## 房子 
首先，让我们移除球体并创建一个小房子。我们可以离开了。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684804337633-81436b27-1c99-42fd-88d4-88e4e2438e45.png#averageHue=%2394ab77&clientId=u776a7404-82c7-4&from=paste&id=u3ac149d9&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u42b010b6-af72-4b25-b31b-e56c21e7427&title=)
我们将首先创建一个容器，而不是将构成该房屋的每个对象都放在场景中，以防万一我们想要移动或缩放整个事物：

```javascript
// House container
const house = new THREE.Group()
scene.add(house)
```
然后我们可以用一个简单的立方体创建墙并将其添加到`house`. 不要忘记在`y`轴上向上移动墙壁；否则它将有一半在地板内：

```javascript
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({ color: '#ac8e82' })
)
walls.position.y = 1.25
house.add(walls)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684804337592-9a2b3a73-2da6-4704-822a-63672d1ede37.png#averageHue=%238c9b71&clientId=u776a7404-82c7-4&from=paste&id=u0a898ccd&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ub575911a-45be-4e7f-9ae8-322d93a729a&title=)
我们的立方体选择的高度是`2.5`，因为它看起来像是天花板应该有的正常高度。我们也选择土黄色的颜色`'#ac8e82'`，但这是暂时的，我们稍后会用纹理替换这些原本的材质颜色。
对于屋顶，我们想做一个金字塔的形状。问题是 Three.js 没有这种几何形状。但是，我们可以从一个圆锥体开始渲染，并将其边数减少到`4`，您将得到一个金字塔。有时你只需要基本功能熟悉，了解其渲染的网格特质就能实现：

```javascript
// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
)
roof.rotation.y = Math.PI * 0.25
roof.position.y = 2.5 + 0.5
house.add(roof)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684804337813-39f84192-4852-42b3-a140-03226a2cb3af.png#averageHue=%238c996f&clientId=u776a7404-82c7-4&from=paste&id=ua3a44e99&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u9ae922c9-72ef-4601-9255-98dd3294189&title=)
找到正确的位置和正确的旋转可能有点困难。慢慢来，试着找出价值背后的逻辑，不要忘记那`Math.PI`是你调试的工具。
如您所见，我们的屋顶离开了地面`2.5 + 0.5`的距离。我们本可以编写成离地`3`，但有时最好将值背后的逻辑可视化。`2.5`，因为屋顶墙是`2.5`单位高的，`0.5`因为锥体是`1`单位高的（我们需要将它移动到其高度的一半）。
我们将使用一个简单的平面作为门，因为我们将使用我们在之前课程中使用过的漂亮的门纹理。

```javascript
// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshStandardMaterial({ color: '#aa7b7b' })
)
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684804337926-4c26cb9c-2c08-4296-bb9f-e0de54ea5c6d.png#averageHue=%238e9f71&clientId=u776a7404-82c7-4&from=paste&id=ua0b28fc3&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u7767ecfe-77d1-4d38-aed4-0ceba66c80e&title=)
我们还不知道新渲染的门模型的大小尺寸是否合适，但我们可以稍后在纹理正常工作时修复它。
如您所见，我们在`z`轴上移动门以将其粘在墙上，但我们还在原先的基础上添加了`0.01`单元。如果您不添加这个值，您将遇到我们在上一课中看到的称为 z-fighting 的错误。当您有两张脸在同一位置（或非常接近）时，就会发生 Z-fighting。**GPU 不知道哪一个比另一个更近，你会看到一些奇怪的视觉像素点缠绕和花条**。
让我们添加一些灌木。我们不会为每个灌木创建一个几何体，而是只创建一个，所有网格都将共享它。结果在视觉上是一样的，但是我们会得到性能上的提升。我们可以对材料做同样的事情。

```javascript
// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684804340779-e4725c49-db54-4bed-9ebe-149991120dd1.png#averageHue=%238e9f70&clientId=u776a7404-82c7-4&from=paste&id=u0e615e3b&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u47c7a32b-3879-4566-b0ca-f659f3db1a6&title=)
直接在代码中放置和缩放所有这些对象确实需要很长时间。在后面的课程中，我们将学习如何使用 3D 软件来创建所有这些。
我们不会向房子添加太多细节，因为我们必须继续前进，但您可以随时暂停并添加您想要的任何东西，例如矮墙、小巷、窗户、烟囱、岩石等。
## 坟墓
我们不是手动放置每个坟墓，而是按程序创建和放置它们。
这个想法是将坟墓随机放置在房子周围的一个圆圈上。
首先，让我们创建一个容器以防万一：

```javascript
// Graves
const graves = new THREE.Group()
scene.add(graves)
```
就像在3D 文本课中我们用一种几何体和一种材质创建多个甜甜圈一样，我们将创建一个[BoxGeometry](https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry)和一个[MeshStandardMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial)，它们将在每个坟墓之间共享：

```javascript
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })
```
最后，让我们循环并做一些数学运算，在房子周围放置一堆坟墓。
**我们将在圆上求出一个随机弧度**`**angle**`**。请记住，一整圈的弧度是 2 倍 π（换算成角度=360度）。然后我们将在 **`**Math.sin(...)**`**和**`**Math.cos(...) **`**上使用该随机的弧度求出正弦（sin）和余弦（cos)的值，然后这个正弦和余弦的值再乘以一个随机半径就可以得到我们墓碑的随机**`**x**`**,**`**z**`**坐标，因为我们不希望坟墓围绕于一个完美的圆上，他们应该在不同大小的圆上环绕分布。**
![b4910f331377ad65c238f69e0fdb2b37.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684829307084-50922d41-f296-48ed-95e6-d8af7b51b968.png#averageHue=%23fdf9f0&clientId=ue2b3b210-6998-4&from=paste&height=172&id=u46385282&originHeight=343&originWidth=286&originalType=binary&ratio=2&rotation=0&showTitle=false&size=41133&status=done&style=none&taskId=u154568eb-7633-49c2-9500-4d4e425130a&title=&width=143)

```javascript
for(let i = 0; i < 50; i++)
{
    const angle = Math.random() * Math.PI * 2 // Random angle
    const radius = 3 + Math.random() * 6      // Random radius
    const x = Math.cos(angle) * radius        // Get the x position using cosinus
    const z = Math.sin(angle) * radius        // Get the z position using sinus

    // Create the mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    // Position
    grave.position.set(x, 0.3, z)                              

    // Rotation
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4

    // Add to the graves container
    graves.add(grave)
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684804341165-93418df5-7ecb-43f7-88ac-ed1f5cdd9d9b.png#averageHue=%2389996e&clientId=u776a7404-82c7-4&from=paste&id=u585dffc7&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u6f6b9f91-553c-485f-a5e2-f53a94c8900&title=)
## 灯 
我们有一个非常酷的场景，但还没有那么可怕。
首先，让我们调暗环境光和月光并赋予它们更偏蓝的颜色：

```javascript
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)

// ...

const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684804341711-b9e09a84-5d9c-4430-90ab-b2180126f913.png#averageHue=%2319211c&clientId=u776a7404-82c7-4&from=paste&id=u62f4dc3a&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u43aec07d-9c37-4de3-888c-22ef11b09d7&title=)
我们现在看不到太多。我们还可以在门上方添加一个暖色的[PointLight 。](https://threejs.org/docs/index.html#api/en/lights/PointLight)我们可以将它添加到房子中，而不是将此灯添加到场景中：

```javascript
// Door light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684804341146-f95647d7-10f5-4f68-a6e4-d3a67368a7f8.png#averageHue=%234b3925&clientId=u776a7404-82c7-4&from=paste&id=u30d28ea9&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u148e9237-5858-4085-9dd3-41d6ec7e300&title=)
## 多雾
在恐怖电影中，他们总是使用雾。好消息是 Three.js 已经支持[Fog](https://threejs.org/docs/#api/en/scenes/Fog)类。
第一个参数是`color`，第二个参数是`near`（雾开始离相机多远），第三个参数是`far`（雾从相机多远开始完全不透明）。
要激活雾，请将 `fog`属性添加到`scene`：

```javascript
/**
 * Fog
 */
const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684804344520-d3273b27-eaea-41bf-918b-3a88722ba6bd.png#averageHue=%234a3d28&clientId=u776a7404-82c7-4&from=paste&id=uc8bd54a1&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u6d3bc741-7c51-4825-b9ed-5ab2966faa1&title=)
不错，但我们可以看到坟墓和黑色背景之间有一条清晰的切口。
要解决这个问题，我们必须更改 `renderer` 的清晰颜色并使用与雾相同的颜色。在实例化之后执行此操作`renderer`：

```javascript
renderer.setClearColor('#262837')
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684804343971-63e8d0a3-9b60-4a8f-82ba-2c0c8e197357.png#averageHue=%231e241f&clientId=u776a7404-82c7-4&from=paste&id=u7e7b4e23&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ue336453b-2cf3-41a7-ac15-43c716066ab&title=)
这是一个稍微可怕的场景。
## 纹理
为了更加真实，我们可以添加纹理。`textureLoader`已经在代码中了。
### 大门
让我们从我们已经知道的东西开始并加载所有门纹理：

```javascript
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
```

然后我们可以将所有这些纹理应用到门材质上。不要忘记向 PlaneGeometry 添加更多细分[，](https://threejs.org/docs/index.html#api/en/geometries/PlaneGeometry)以便`displacementMap`移动一些顶点。此外，像我们在材料uv2课程中所做的那样，将属性`aoMap`添加到几何体中。
您可以使用以下方法访问门的几何图形`mesh.geometry`：

```javascript
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684804345563-3b51fab9-f32e-4c4f-a2a8-15d9e598d3c4.png#averageHue=%231e2420&clientId=u776a7404-82c7-4&from=paste&id=u821f80fc&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u677875c6-1bd7-403c-a2bb-28d3c96d4ab&title=)
给你！那是一扇更现实的门。
现在我们有了纹理，您会意识到门有点太小了。您可以简单地增加[PlaneGeometry 的](https://threejs.org/docs/index.html#api/en/geometries/PlaneGeometry)大小：

```javascript
// ...
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
// ...
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684804348041-547f9add-d5d5-4ccf-9c89-a1af735752ff.png#averageHue=%231f2520&clientId=u776a7404-82c7-4&from=paste&id=uef558c67&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u7737ca07-09f2-4df4-b09c-c69be38a876&title=)
### 墙壁
让我们使用`/static/textures/bricks/`文件夹上的纹理对墙壁做同样的事情。我们没有像门那样多的纹理，但这不是问题。我们不需要 `alpha` 纹理，而且墙里面没有金属，所以我们也不需要金属纹理。
加载纹理：

```javascript
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')
```

然后我们可以更新墙的[MeshStandardMaterial 。](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial)不要忘记删除`color`并`添加`uv2环境遮挡的属性。

```javascript
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684804348777-0beeef34-a866-4fce-a0c2-7ca52b6255b7.png#averageHue=%231b221e&clientId=u776a7404-82c7-4&from=paste&id=ue9384aab&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u3735fc24-71a9-41b7-9ab0-73ec98cb5fb&title=)
### 地上
与墙壁相同。草纹理位于`/static/textures/grass/`文件夹中。
加载纹理：

```javascript
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')
```

更新地板的[MeshStandardMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial)并且不要忘记删除`color`并添加`uv2`环境遮挡的属性：

```javascript
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684804351016-927dc3a9-9d0b-47dd-86e7-308016a6c9d9.png#averageHue=%23191e18&clientId=u776a7404-82c7-4&from=paste&id=ue2f094fd&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uc886e453-16b7-42d3-bbac-1eef9d43dea&title=)
纹理太大。为了解决这个问题，我们可以简单地用属性重复每个草纹理`repeat`：

```javascript
grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684804351892-72b469b6-0816-44b1-bf17-7b345630f214.png#averageHue=%23131d13&clientId=u776a7404-82c7-4&from=paste&id=u610e24c5&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u4a820e6e-c67a-40c4-aba6-f53167b108c&title=)
并且不要忘记更改`wrapS`和`wrapT`属性以激活重复：

```javascript
grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684804356001-b3ca162b-d534-449f-8f1d-cbccbdbee8b2.png#averageHue=%23121611&clientId=u776a7404-82c7-4&from=paste&id=u52754ffc&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u1bdbb90f-0ac3-4b74-9405-591b5d34a69&title=)
## 幽灵 
对于幽灵，让我们保持简单方法实现，用我们所知道的去做。
我们将使用漂浮在房子周围并穿过地面和坟墓的简单灯光。

```javascript
/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ffff00', 2, 3)
scene.add(ghost3)
```
现在我们可以使用一些带有大量三角函数的数学来为它们制作动画：

```javascript
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    const ghost2Angle = - elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghost3Angle = - elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    // ...
}
```
## 阴影 
最后，为了增加真实感，让我们添加阴影。
在渲染器上激活阴影贴图：

```javascript
renderer.shadowMap.enabled = true
```

激活您认为应该投射阴影的灯上的阴影：

```javascript
moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true
```

遍历场景中的每个对象并确定该对象是否可以投射和/或接收阴影：

```javascript
walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

for(let i = 0; i < 50; i++)
{
    // ...
    grave.castShadow = true
    // ...
}

floor.receiveShadow = true
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684804366930-6a384291-6770-4a68-90c8-6088f776faef.png#averageHue=%23242633&clientId=u776a7404-82c7-4&from=paste&id=ub15c8547&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uffffa3ed-4e47-436e-adc0-414cae997a2&title=)
有了这些阴影，场景看起来好多了，但无论如何我们都应该优化它们。
一件好事是通过每盏灯，在 上创建相机助手`light.shadowMap.camera`，并确保`near`、`far`、`amplitude`或`fov`适合。但是，让我们使用以下应该恰到好处的值。
我们还可以减少阴影贴图渲染大小以提高性能：

```javascript
moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.shadow.camera.far = 15

// ...

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

// ...

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

// ...

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

// ...

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7

// ...

renderer.shadowMap.type = THREE.PCFSoftShadowMap
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684804377700-d45a49c9-1cbe-4125-8995-890e9b5c92ea.png#averageHue=%231b1e23&clientId=u776a7404-82c7-4&from=paste&id=u14e5bcad&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u7bca29ab-d896-4065-a7f8-236062d132e&title=)
这个过程很长，但必不可少。我们已经在最好的优化性能限制，鬼屋甚至可能无法在移动设备上以 60fps 运行。我们将在以后的课程中看到更多优化技巧。
## 走得更远
这就是本课的内容，但您可以尝试改进我们所做的。您可以在场景中添加新元素，使用 Three.js 基元将鬼魂替换为真实的 3D 鬼魂，在坟墓上添加名字等。

# 18. Particles 粒子
## 介绍
粒子。它们非常受欢迎，可用于实现各种效果，如星星、烟、雨、灰尘、火和许多其他东西。
粒子的好处是您可以在屏幕上以合理的帧速率显示数十万个粒子。缺点是每个粒子都由一个始终面向相机的平面（两个三角形）组成。
创建粒子就像制作[网格](https://threejs.org/docs/#api/en/objects/Mesh)一样简单。我们需要一个[BufferGeometry](https://threejs.org/docs/#api/en/core/BufferGeometry)，一种可以处理粒子的材质 ( [PointsMaterial](https://threejs.org/docs/#api/en/materials/PointsMaterial) )，而不是生成一个[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)，我们需要创建一个[Points](https://threejs.org/docs/#api/en/objects/Points)。
## 设置
启动器仅由场景中间的一个立方体组成。该多维数据集确保一切正常。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684835014330-b9315736-f4ad-433a-bd1d-f79ae5b438a2.png#averageHue=%23040404&clientId=uff7fc281-131f-4&from=paste&id=ua30bfb98&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u3bdc648d-3b7e-4d0a-a19d-495bc400982&title=)
## 第一粒子
让我们摆脱我们的立方体并开始创建一个由粒子组成的球体。
### 几何学
您可以使用任何基本的 Three.js 几何图形。出于与网格相同的原因，最好使用[BufferGeometries](https://threejs.org/docs/#api/en/core/BufferGeometry)。几何体的每个顶点都将成为一个粒子：

```javascript
/**
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.SphereGeometry(1, 32, 32)
```
### 点材质
我们需要一种特殊类型的材质，称为[PointsMaterial](https://threejs.org/docs/#api/en/materials/PointsMaterial)。这种材料已经可以做很多事情，但我们将在以后的课程中探索如何创建我们自己的粒子材料以更进一步深入。
PointsMaterial具有多个特定于粒子的属性，例如用于控制所有粒子大小的`size` 和用于指定远距离粒子是否应小于近距离粒子的`sizeAttenuation`[：](https://threejs.org/docs/#api/en/materials/PointsMaterial)

```javascript
// Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    sizeAttenuation: true
})
```
与往常一样，我们还可以在创建材质后更改这些属性：

```javascript
const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.size = 0.02
particlesMaterial.sizeAttenuation = true
```
### 积分
最后，我们可以像创建[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)一样创建最终粒子，但这次是使用[Points](https://threejs.org/docs/#api/en/objects/Points)类（不是[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)类了）。不要忘记将它添加到场景中：

```javascript
// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684835035806-9ae84f9d-3959-4486-9473-7e7444c41834.png#averageHue=%23020202&clientId=uff7fc281-131f-4&from=paste&id=u55c79bfa&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uc446fee1-026e-4c5b-a961-9b4d3970eb0&title=)
那很简单。让我们自定义这些粒子。
## 自定义几何 
要创建自定义几何图形，我们可以从[BufferGeometry](https://threejs.org/docs/#api/en/core/BufferGeometry)开始，并像我们在几何课程中所做的那样添加一个`position`属性。[将SphereGeometry](https://threejs.org/docs/#api/en/geometries/SphereGeometry)替换为自定义几何体并像之前一样添加属性`'position'`：

```javascript
// Geometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 500

const positions = new Float32Array(count * 3) // Multiply by 3 because each position is composed of 3 values (x, y, z)

for(let i = 0; i < count * 3; i++) // Multiply by 3 for same reason
{
    positions[i] = (Math.random() - 0.5) * 10 // Math.random() - 0.5 to have a random value between -0.5 and +0.5
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // Create the Three.js BufferAttribute and specify that each information is composed of 3 values
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684835036094-3f32d81d-61ce-49b5-9cb9-6b3e521bddad.png#averageHue=%23000000&clientId=uff7fc281-131f-4&from=paste&id=u82539855&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u959d0b3f-7503-46b2-9d54-1d730b0deaa&title=)
如果您不能自己提取此代码，请不要感到沮丧。它有点复杂，变量使用奇怪的格式。
你应该在场景周围得到一堆粒子。现在是享受乐趣和测试计算机极限的绝佳时机。尝试`5000`，`50000`也许`500000`。您可以拥有数百万个粒子，但仍具有合理的帧速率。
你可以想象性能上的限制。在劣质计算机或智能手机上，您将无法拥有数百万粒子还能保持 60fps 的体验。我们继续添加粒子会大大降低帧速率的效果。但是，这仍然令人印象深刻。
现在，让我们保持计数`5000`并将大小更改为`0.1`：

```javascript
const count = 5000

// ...

particlesMaterial.size = 0.1

// ...
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684835036709-932d9bbe-8975-4d06-a322-865bd50a6efe.png#averageHue=%232d2d2d&clientId=uff7fc281-131f-4&from=paste&id=udf8c5888&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u8b64acd6-e461-4a87-a076-2a593a78442&title=)
## 颜色、贴图和 alpha 贴图 [16:10](https://threejs-journey.com/lessons/particles#)
[我们可以使用PointsMaterial](https://threejs.org/docs/#api/en/materials/PointsMaterial)`.color`上的属性更改所有粒子的颜色。如果在实例化材质后更改此属性，请不要忘记需要使用[Color类：](https://threejs.org/docs/#api/en/math/Color)

```javascript
particlesMaterial.color = new THREE.Color('#ff88cc')
```
我们还可以使用该`map`属性在这些粒子上放置纹理。使用代码中已有的[TextureLoader](https://threejs.org/docs/#api/en/loaders/TextureLoader)加载位于`/static/textures/particles/`以下位置的纹理之一：

```javascript
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/2.png')

// ...

particlesMaterial.map = particleTexture
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684835036496-029ad582-965d-49a5-974d-78ee2c382316.png#averageHue=%23000000&clientId=uff7fc281-131f-4&from=paste&id=uc04095c3&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ucb139762-8b3d-4bc4-992d-60da5e56907&title=)
[这些纹理是Kenney](https://twitter.com/KenneyNL)提供的包的调整大小版本，您可以在此处找到完整包：[//www.kenney.nl/assets/particle-pack](https://www.kenney.nl/assets/particle-pack)。但您也可以创建自己的包。
如您所见，`color`属性正在改变贴图，就像其他材质一样。
如果仔细观察，您会发现前面的粒子隐藏了后面的粒子。
我们需要激活`transparent`透明度并使用属性上的纹理`alphaMap`而不是`map`：

```javascript
// particlesMaterial.map = particleTexture
particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684835036949-6c1eb03e-5b34-4ea0-80fe-3b3b94a3f68f.png#averageHue=%23000000&clientId=uff7fc281-131f-4&from=paste&id=ue18fc916&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ud83205f0-1467-46ca-a0d5-198effd7dd9&title=)
现在好多了，但我们仍然可以随机看到粒子的一些边缘。
这是因为粒子的绘制顺序与它们创建时的顺序相同，WebGL 并不知道哪个在另一个前面。
有多种方法可以解决这个问题。
### 使用 alphaTest
`alphaTest`是一个介于`0`和`100`之间的值，它使 WebGL 知道何时不根据像素的透明度渲染像素。默认情况下，该值表示无论如何都会渲染像素。如果我们使用较小的值，例如，如果 `alpha` 为 `0.001` ，则不会渲染像素：

```javascript
particlesMaterial.alphaTest = 0.001
```

这个解决方案并不完美，如果你仔细观察，你仍然可以看到小故障，但它已经更令人满意了。
### 使用深度测试
绘制时，WebGL 会测试正在绘制的内容是否比已经绘制的内容更接近。这称为深度测试，可以停用（您可以对比`alphaTest`）：

```javascript
// particlesMaterial.alphaTest = 0.001
particlesMaterial.depthTest = false
```

虽然此解决方案似乎完全解决了我们的问题，**但如果您的场景中有其他对象或具有不同颜色的粒子，则停用深度测试可能会产生错误**。粒子可能被绘制为好像它们在场景的其余部分之上。
在场景中添加一个立方体以查看效果：

```javascript
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial()
)
scene.add(cube)
```
### 使用深度写入
正如我们所说，WebGL 正在测试绘制的内容是否比已经绘制的内容更接近。所绘制内容的深度存储在我们所说的深度缓冲区中。我们可以告诉 WebGL 不要在该深度缓冲区中写入粒子（您可以注释），而不是不测试粒子是否比深度缓冲区中的粒子更近：

```javascript
// particlesMaterial.alphaTest = 0.001
// particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false
```

在我们的例子中，这个解决方案几乎可以毫无缺点地解决问题。有时，其他对象可能会绘制在粒子的后面或前面，这取决于许多因素，例如透明度、您将对象添加到场景的顺序等。
我们看到了多种技术，并没有完美的解决方案。您必须根据项目进行调整并找到最佳组合。
## 混合
当前，WebGL 绘制一个像素在另一个之上。
通过更改`blending`属性，我们可以告诉 WebGL 不仅要绘制像素，还要将该像素的颜色添加到已绘制像素的颜色中。这将具有看起来惊人的饱和效果。
这样做粒子就不会再出现在立方体上了
要对此进行测试，只需将`blending`属性更改为`THREE.AdditiveBlending`（保留`depthWrite`属性）：

```javascript
// particlesMaterial.alphaTest = 0.001
// particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false
particlesMaterial.blending = THREE.AdditiveBlending
```


![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684835058654-7166486a-2c3a-4816-8476-5916997117ad.png#averageHue=%230b0b0b&clientId=uff7fc281-131f-4&from=paste&id=u7d8d9ae0&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u3ae771c7-3eed-40d0-885b-5ec8ad327f1&title=)
添加更多粒子（比方说`20000`）以更好地享受这种效果。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684835059688-711582ba-442a-4872-9e59-f12a544ba0f0.png#averageHue=%2323171e&clientId=uff7fc281-131f-4&from=paste&id=u905227a2&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u2dd64b73-455f-4f48-a6e3-c953946091d&title=)
但要小心，这种效果会影响性能，并且在 60fps 时您将无法拥有像以前那样多的粒子。
现在，我们可以删除`cube`.
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684835059728-d3507bec-c2e8-4e34-b8e2-6677e7cc690f.png#averageHue=%23000f04&clientId=uff7fc281-131f-4&from=paste&id=u3122c642&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=udaca49e1-b016-4140-9012-6a916a52081&title=)
## 不同的颜色
我们可以为每个粒子设置不同的颜色。我们首先需要添加一个新属性，其名称`color`与我们为该职位所做的一样。一个颜色由红、绿、蓝（3个值）组成，所以代码会和`position`属性很相似。我们实际上可以对这两个属性使用相同的循环：

```javascript
const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for(let i = 0; i < count * 3; i++)
{
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
```
小心单数和复数。
要激活这些顶点颜色，只需将`vertexColors`属性更改为`true`：

```javascript
particlesMaterial.vertexColors = true
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684835059916-173ad95f-8190-45f6-a4d0-7b91f17020fc.png#averageHue=%234c3518&clientId=uff7fc281-131f-4&from=paste&id=u7018b7b5&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u4ec8ed13-9ec7-4be2-8c1f-c3f06b1a725&title=)
材质的主要颜色仍然影响这些顶点颜色。随意更改该颜色甚至对其进行对比。

```javascript
// particlesMaterial.color = new THREE.Color('#ff88cc')
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684835039007-b9053fe9-317f-48bc-acbb-ec73ca4b8119.png#averageHue=%23050402&clientId=uff7fc281-131f-4&from=paste&id=u5b542c44&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u186f46b8-2508-441c-a51d-3c003a1e9cf&title=)
## 动画
有多种动画粒子的方法。
### 通过使用点作为对象
因为[Points](https://threejs.org/docs/#api/en/objects/Points)类继承自[Object3D](https://threejs.org/docs/#api/en/core/Object3D)类，所以您可以根据需要移动、旋转和缩放点。
在函数中旋转粒子`tick`：

```javascript
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update particles
    particles.rotation.y = elapsedTime * 0.2

    // ...
}
```
虽然这已经很酷了，但我们希望更好地控制每个粒子。
### 通过改变属性
另一种解决方案是分别更新每个顶点位置。这样，顶点可以有不同的轨迹。我们将为粒子设置动画，就好像它们漂浮在波浪上一样，但首先，让我们看看如何更新顶点。
首先对比我们之前所做的`particles`整体轮换：

```javascript
const tick = () =>
{
    // ...

    // particles.rotation.y = elapsedTime * 0.2

    // ...
}
```

要更新每个顶点，我们必须更新属性中的右侧部分，因为所有顶点都存储在这个一维数组中，其中`position`前 3 个值对应于第一个顶点的`x``y``z`坐标，然后接下来的 3 个值对应于第二个顶点的`x``y``z`，等等。
我们只希望顶点上下移动，这意味着我们将y只更新轴。因为`position`属性是一维数组，所以我们必须 3 乘 3 地遍历它，并且只更新第二个值，即坐标`y`。
让我们从遍历每个顶点开始：

```javascript
const tick = () =>
{
		// ...

    for(let i = 0; i < count; i++)
    {
        const i3 = i * 3
    }

    // ...
}
```

在这里，我们选择了一个`for`从`0`到`count` 的简单循环，我们在内部创建了一个变量`i3`，只需`i`乘以 3 就可以获得`0，3，6，9......`的数组下标  。
模拟波浪运动的最简单方法是使用简单的正弦曲线。首先，我们将更新所有顶点以相同的频率上下移动。
可以在`i3 + 1`索引处的数组中访问坐标`y`：

```javascript
const tick = () =>
{
    // ...

    for(let i = 0; i < count; i++)
    {
        const i3 = i * 3

        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime)
    }

    // ...
}
```

不幸的是，没有任何东西在移动。问题是必须通知 Three.js 几何形状发生了变化。为此，我们必须在`position`完成更新顶点后将属性`needsUpdate`设置为`true`：

```javascript
const tick = () =>
{
    // ...

    for(let i = 0; i < count; i++)
    {
        const i3 = i * 3

        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime)
    }
    particlesGeometry.attributes.position.needsUpdate = true 

    // ...
}
```

所有的粒子都应该像飞机一样上下移动。
这是一个好的开始，我们快做到了。我们现在需要做的就是对粒子之间的正弦曲线应用偏移量，以便我们获得该波形。
为此，我们可以使用`x`坐标。为了获得这个值，我们可以使用我们用于`y`坐标的相同技术，但不是`i3 + 1`，`x`坐标它只是`i3`：

```javascript
const tick = () =>
{
    // ...

    for(let i = 0; i < count; i++)
    {
        let i3 = i * 3

        const x = particlesGeometry.attributes.position.array[i3]
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
    }
    particlesGeometry.attributes.position.needsUpdate = true

    // ...
}
```
你应该得到美丽的粒子波。不幸的是，您应该避免这种技术。如果我们有`20000`个粒子，我们将遍历每个粒子，计算一个新位置，并更新每一帧的整个属性。这可以处理少量粒子，但我们需要数百万个粒子。
### 通过使用自定义着色器
要以良好的帧率更新每一帧上的数百万个粒子，我们需要使用自己的着色器创建自己的材质。但是着色器是为以后的课程准备的。
