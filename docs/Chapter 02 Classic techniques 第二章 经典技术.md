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

