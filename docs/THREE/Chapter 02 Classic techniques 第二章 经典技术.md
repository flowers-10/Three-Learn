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
## 颜色、贴图和 alpha 贴图 
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

# 19. Galaxy Generator 银河（生成器）
## 介绍 
既然我们知道如何使用粒子，我们就可以创造出像银河这样很酷的东西了。但是，我们不要只生成一个星系，而是生成一个星系生成器。
为此，我们将使用Dat.GUI让用户调整参数并在每次更改时生成一个新的星系。
## 设置
启动器仅由场景中间的一个立方体组成。它确保一切正常。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684892958791-6efe1f78-c8f7-40d2-a07f-d98b80ebc79a.png#averageHue=%23040404&clientId=u9b176c82-dd88-4&from=paste&id=u2f86c1ca&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u5817fe64-c6d2-4df9-9a39-b8ef5591520&title=)
## 基础粒子
首先，移除立方体并创建一个`generateGalaxy`函数。每次调用该函数时，我们都会删除以前的星系（如果有的话）并创建一个新星系。
我们可以立即调用该函数：

```javascript
/**
 * Galaxy
 */
const generateGalaxy = () =>
{
    
}

generateGalaxy()
```

我们可以创建一个包含我们银河系所有参数的对象。在函数之前创建此对象`generateGalaxy`。我们将逐步填充它并将每个参数添加到Dat.GUI：

```javascript
const parameters = {}
```

在我们的`generateGalaxy`函数中，我们将创建一些粒子以确保一切正常。我们可以从几何开始并将粒子数添加到参数中：

```javascript
const parameters = {}
parameters.count = 1000

const generateGalaxy = () =>
{
    /**
     * Geometry
     */
    const geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters.count * 3)

    for(let i = 0; i < parameters.count; i++)
    {
        const i3 = i * 3

        positions[i3    ] = (Math.random() - 0.5) * 3
        positions[i3 + 1] = (Math.random() - 0.5) * 3
        positions[i3 + 2] = (Math.random() - 0.5) * 3
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
}
generateGalaxy()
```

这与之前的代码相同，但我们处理循环的方式略有不同。
[我们现在可以使用PointsMaterial](https://threejs.org/docs/#api/en/materials/PointsMaterial)类创建材质。这一次，我们可以对`parameters`对象进行调整：

```javascript
parameters.size = 0.02

const generateGalaxy = () =>
{
    // ...

    /**
     * Material
     */
    const material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    })
}
```

[最后，我们可以使用Points](https://threejs.org/docs/#api/en/objects/Points)类创建点并将其添加到场景中：

```javascript
const generateGalaxy = () =>
{
    // ...

    /**
     * Points
     */
    const points = new THREE.Points(geometry, material)
    scene.add(points)
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684892958826-96a65fbc-d993-40eb-907a-936e2ac7c10a.png#averageHue=%23010101&clientId=u9b176c82-dd88-4&from=paste&id=u93763361&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u731be9d1-1c07-4a52-9fc6-35ef8fb6837&title=)
你应该看到一些漂浮的点。
## 微调
我们已经有两个参数，`count`和`size`。让我们将它们添加到我们已经在代码开头创建的**Dat.GUI实例中**。可以想象，我们必须在创建参数后添加这些调整：

```javascript
parameters.count = 1000
parameters.size = 0.02

gui.add(parameters, 'count').min(100).max(1000000).step(100)
gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684892958756-9b639d7f-d432-4c4d-ac39-5a7559c9bf3f.png#averageHue=%23010101&clientId=u9b176c82-dd88-4&from=paste&id=uf97362f2&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uc9593dc6-d118-4f68-980f-34e54301715&title=)
你应该在调整中有两个新的范围，但改变它们不会产生一个新的星系。要生成一个新的星系，您必须监听 change 事件。更准确地说，是`finishChange`为了防止在拖放范围值时生成星系：

```javascript
gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy)
gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy)
```
此代码将不起作用，因为generateGalaxy尚不存在。您必须在函数之后移动这些调整`generateGalaxy`。
小心，我们还有一个问题，如果你对这些调整玩得太多，你的电脑就会开始发热。这是因为我们没有摧毁先前创建的星系。我们正在创造一个位于另一个之上的星系。
为了使事情正确，我们必须首先将`geometry`,`material`和`points`变量移到`generateGalaxy`函数之外.

```javascript
let geometry = null
let material = null
let points = null

const generateGalaxy = () =>
{
    // ...

    geometry = new THREE.BufferGeometry()
    
    // ...

    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    })

    // ...

    points = new THREE.Points(geometry, material)
    
    // ...
}
```

然后，在分配这些变量之前，我们可以测试它们是否已经存在。如果是这样，我们可以调用dispose()几何体和材质上的方法。然后使用以下方法`remove()`从场景中删除点：

```javascript
const generateGalaxy = () =>
{
    // Destroy old galaxy
    if(points !== null)
    {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    // ...
}
```

我们不会像在上一课看到的那样使用会产生深度和 `alpha` 问题的纹理，而是使用默认的方形渲染。不用担心; 会有很多棱角，因为太小了，我们不会注意到它们是正方形的。
现在我们可以估计我们可以拥有多少粒子及其大小，让我们更新参数：

```javascript
parameters.count = 100000
parameters.size = 0.01
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684892958743-c1e0894d-239a-4400-8785-97ea3d819e5a.png#averageHue=%23111111&clientId=u9b176c82-dd88-4&from=paste&id=u66dc5f44&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u5cabd07f-03de-4f7d-ba2b-89a77459403&title=)
## 形状 
渲染出星系可以有几种不同的形状。我们将把目标专注于螺旋线形状的星系。有许多方法可以定位粒子以创建星系。在测试课程方式之前，请随意尝试您的方式。
### 半径
首先，让我们创建一个`radius`参数：

```javascript
parameters.radius = 5

// ...

gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
```

每颗星都将根据该半径定位。如果半径为`5`，星星将位于从`0`到`5` 的距离处。现在，让我们将所有粒子放在一条直线上：

```javascript
for(let i = 0; i < parameters.count; i++)
{
    const i3 = i * 3

    const radius = Math.random() * parameters.radius

    positions[i3    ] = radius
    positions[i3 + 1] = 0
    positions[i3 + 2] = 0
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684892958773-8b7ab304-8307-4cbd-aafb-1d2147fb1404.png#averageHue=%23000000&clientId=u9b176c82-dd88-4&from=paste&id=ubb95c6d4&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u3d30d77f-9d31-446f-8b31-ccf7d7b9630&title=)
### 分支机构
自旋星系似乎总是至少有两个分支，但它可以有更多。
创建一个`branches`参数：

```javascript
parameters.branches = 3

// ...

gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
```

我们可以使用`Math.cos(...)`和`Math.sin(...)`将粒子定位在这些分支上。我们首先用模数 ( `%`) 计算一个角度，将结果除以分支计数参数得到 `0`和`1` 之间的角度，然后将该值乘以`Math.PI * 2`得到0 到360度之间的角度的一个完整的圆弧。然后我们将该角度与`Math.cos(...)`和和轴`Math.sin(...)`一起使用，最后乘以半径：

```javascript
for(let i = 0; i < parameters.count; i++)
{
    const i3 = i * 3

    const radius = Math.random() * parameters.radius
    const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

    positions[i3    ] = Math.cos(branchAngle) * radius
    positions[i3 + 1] = 0
    positions[i3 + 2] = Math.sin(branchAngle) * radius
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684892959382-97f53650-b8ea-44af-bed9-b28025b283ef.png#averageHue=%23010101&clientId=u9b176c82-dd88-4&from=paste&id=u769bd492&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u53e589c9-c7ce-47e7-9262-904518fbee5&title=)
### 旋转
让我们添加旋转效果。
创建一个`spin`参数：

```javascript
parameters.spin = 1

// ...

gui.add(parameters, 'spin').min(- 5).max(5).step(0.001).onFinishChange(generateGalaxy)
```

然后我们可以用半径乘以`spin`得到`spinAngle`参数。换句话说，粒子离中心越远，它承受的自旋就越大：

```javascript
for(let i = 0; i < parameters.count; i++)
{
    const i3 = i * 3

    const radius = Math.random() * parameters.radius
    const spinAngle = radius * parameters.spin
    const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

    positions[i3    ] = Math.cos(branchAngle + spinAngle) * radius
    positions[i3 + 1] = 0
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684892959732-85c1384a-1ff2-499f-99ab-86a3da8ed1a7.png#averageHue=%23010101&clientId=u9b176c82-dd88-4&from=paste&id=u43a6d4b4&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u3ed79e19-890a-47f5-ba00-ad319dc4a34&title=)
## 随机性
这些粒子完全对齐。我们需要随机性。但我们真正需要的是外散星，内凝星。
创建一个`randomness`参数：

```javascript
parameters.randomness = 0.2

// ...

gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
```

现在使用`Math.random()` 为每个轴创建一个随机值，将其乘以`radius`，然后将这些值添加到`positions`：

```javascript
for(let i = 0; i < parameters.count; i++)
{
    const i3 = i * 3

    const radius = Math.random() * parameters.radius

    const spinAngle = radius * parameters.spin
    const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2
    
    const randomX = (Math.random() - 0.5) * parameters.randomness * radius
    const randomY = (Math.random() - 0.5) * parameters.randomness * radius
    const randomZ = (Math.random() - 0.5) * parameters.randomness * radius

    positions[i3    ] = Math.cos(branchAngle + spinAngle) * radius + randomX
    positions[i3 + 1] = randomY
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684892959753-f526605e-819a-4cc6-92be-d3ba82df20f4.png#averageHue=%23151515&clientId=u9b176c82-dd88-4&from=paste&id=u3354a5ac&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ue217a837-a36a-4a0b-b291-0778fe76ef6&title=)
它有效，但不是很有说服力，对吧？我们仍然可以看到这种模式。为了解决这个问题，我们可以使用`Math.pow()`crush 值。您施加的功率越大，就会获得最接近`0`的功率。问题是您不能将负值与`Math.pow()`. 我们要做的是计算功率，然后-1随机乘以它。
首先创建电源参数：

```javascript
parameters.randomnessPower = 3

// ...

gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
```

然后应用`Math.pow()`功率并随机乘以它-1：

```javascript
const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684892960051-e52d6ff3-290c-4938-8a19-eeb55c667e03.png#averageHue=%23161616&clientId=u9b176c82-dd88-4&from=paste&id=uf6ce68c1&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u1d06b80d-c810-4422-8310-2e5900eed64&title=)
## 颜色 
为了获得更好的效果，我们需要为我们的创作添加一些颜色。一个很酷的事情是在星系内部和边缘有不同的颜色。
首先，添加颜色参数：

```javascript
parameters.insideColor = '#ff6030'
parameters.outsideColor = '#1b3984'

// ...

gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)
```

我们将为每个顶点提供一种颜色。我们必须激活`vertexColors`材料上的：

```javascript
material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
})
```

然后在我们的几何体上添加一个`color`属性，就像我们添加`position`属性一样。现在，我们不使用`insideColorandoutsideColor`参数：

```javascript
geometry = new THREE.BufferGeometry()

const positions = new Float32Array(parameters.count * 3)
const colors = new Float32Array(parameters.count * 3)

for(let i = 0; i < parameters.count; i++)
{
    // ...

    colors[i3    ] = 1
    colors[i3 + 1] = 0
    colors[i3 + 2] = 0
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
```


![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684892960189-66f3426c-f420-492e-adaf-3dd2412f1053.png#averageHue=%23160100&clientId=u9b176c82-dd88-4&from=paste&id=uf648203d&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ufc8924a3-5071-4c9e-b03a-0277a0caf83&title=)
你应该得到一个红色的星系。
要使用参数中的颜色，我们首先需要为每个参数创建一个[Color实例。](https://threejs.org/docs/index.html#api/en/math/Color)我们必须在`generateGalaxy`函数内部执行此操作，原因您稍后就会明白：

```javascript
const generateGalaxy = () =>
{
    // ...

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    // ...
}
```

在循环函数内部，我们希望将这些颜色混合成第三种颜色。这种混合取决于距星系中心的距离。如果粒子位于星系的中心，它将具有 ，`insideColor`并且它离中心越远，它与 `outsideColor`的混合就越多。
我们不会创建第三种[Color](https://threejs.org/docs/index.html#api/en/math/Color)，而是要克隆`colorInside`，然后使用该`lerp(...)`方法将颜色从该基色插入到另一个基色。`lerp(...)`的第一个参数是另一种颜色，第二个参数是`0`和`1`之间的一个值。如果是0，颜色将保持其基值，如果是，1结果颜色将是提供的颜色。我们可以使用`radius`除以半径参数：

```javascript
const mixedColor = colorInside.clone()
mixedColor.lerp(colorOutside, radius / parameters.radius)
```

然后我们可以在数组中的`colors`使用`r,``g`和`b`属性：

```javascript
colors[i3    ] = mixedColor.r
colors[i3 + 1] = mixedColor.g
colors[i3 + 2] = mixedColor.b
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684892960358-8c07fccd-60c6-4019-a02f-2167d4e88410.png#averageHue=%23050303&clientId=u9b176c82-dd88-4&from=paste&id=u7f6554cc&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u5d55c25e-662b-4de7-bee6-6905872c5e0&title=)
在这里你有一个美丽的星系发生器。您可以尝试调整并继续添加参数并改进星系的样式。
尽量不要烧毁你的电脑。
## 走得更远
为了更进一步，您可以尝试添加更多调整或测试其他星系形状。在以后的课程中，我们将学习如何在很酷的旋转动画中为所有粒子设置动画。
# 20. Scroll based animation 基于滚动的动画
## 介绍 
拥有仅由 WebGL技术制作的网站体验很棒，但有时，您会希望体验经典网站的创作。
体验可以在后台为页面增添一些美感，但是随后，您会希望该体验与 HTML 内容正确集成。
在本课中，我们将学习如何使用 Three.js 作为经典 HTML 页面的背景。我们将使相机平移以跟随滚动。我们会发现一些使用技巧，让这个页面滚动像卷轴一样更加身临其境。我们将根据光标位置添加一个很酷的视差动画。最后，我们将在到达相应部分时触发一些动画。
## 设置 
本课是练习我们已经学过的许多技巧的好机会。我们将自己完成大部分工作，而不是已经配置好的代码。
`OrbitControls`已被删除，因为我们希望相机根据滚动条移动，而不是像之前的课程那样让相机旋转。
Dat.GUI 已经可用，并且创建了一种颜色选择器供以后使用：

```javascript
/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui.addColor(parameters, 'materialColor')
```

已经设置了一些非常简单的 HTML 内容。目前，您只能看到一个标题，但下方有两个部分。我们看不到它们，因为被屏幕挡住了。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684900599647-efec8645-c6be-4094-a6bb-6785db6c9862.png#averageHue=%230e0404&clientId=uc037550a-e633-4&from=paste&id=uafcb2aea&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ue566478b-8862-46a3-ba7e-33daccb6c4e&title=)
## HTML 滚动
### 启动卷轴
在课程的早些时候，我们使用这个 CSS 停用了滚动条：

```css
html,
body
{
    overflow: hidden;
}
```

要重新激活它，请删除`/src/style.css`中的行`overflow`。
您应该能够滚动并查看下面的其他两个部分。
### 固定弹性卷轴
在某些环境中，您可能会注意到，如果滚动得太远，当页面超出限制时，您会看到一种弹性动画。
虽然这是一个很酷的功能，但默认情况下，页面背面是白色的，与我们的体验不符。
要解决这个问题，我们可以将页面的背景颜色`background-color` 设置为与`clearColor`的颜色相同。相反，我们将`clearColor`透明化，并仅在页面`background-color`上设置颜色。
为此，在 `/src/script.js`中，您需要将`WebGLRenderer`属性`alpha`设置为`true`：

```javascript
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
```
默认情况下，清晰的 `alpha` 值是`0`我们不必自己设置的原因。告诉渲染器处理 `alpha` 就足够了。但是如果你想改变那个值，你可以这样做`setClearAlpha`：

```javascript
renderer.setClearAlpha(0)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684900599871-55530b4e-81e8-4848-bc26-a2b2910a48d1.png#averageHue=%23fdf4f4&clientId=uc037550a-e633-4&from=paste&id=u19ed89c9&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u3f2f3662-069c-4d22-b871-8c5dbf83ca6&title=)
我们现在可以看到页面的背面是白色的。
在`CSS中/src/style.css`添加一个：html`background-color`

```css
html
{
    background: #1e1a20;
}
```
我们得到了一个很好的统一背景颜色，弹性滚动不再是问题。
## 对象
我们将为每个标题部分创建一个对象。
为了简单起见，我们将使用 Three.js 原语，但您可以创建任何您想要的东西。在课程的后面，您将学习如何将自定义模型导入场景。
在 `/src/script.js` 中，删除多维数据集的代码。取而代之，使用[TorusGeometry](https://threejs.org/docs/index.html?q=torus#api/en/geometries/TorusGeometry)、[ConeGeometry](https://threejs.org/docs/index.html?q=ConeGeometry#api/en/geometries/ConeGeometry)和[TorusKnotGeometry创建三个](https://threejs.org/docs/index.html?q=torusk#api/en/geometries/TorusKnotGeometry)[网格](https://threejs.org/docs/index.html?q=mesh#api/en/objects/Mesh)：

```javascript
/**
 * Objects
 */
// Meshes
const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

scene.add(mesh1, mesh2, mesh3)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684900600151-c7d2de11-9360-49d4-b9b8-2b89b5281904.png#averageHue=%2302161e&clientId=uc037550a-e633-4&from=paste&id=u432eeec7&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u00f87ff1-add0-43dc-a6b3-8ed96b1c3e7&title=)
当然，所有对象都在彼此之上。我们稍后会解决这个问题。
同样，为了简单起见，我们的代码会有些冗余。但是，如果您有更多部分，请毫不犹豫地使用数组或其他代码结构解决方案。
### 材料
#### 基材
我们将在所有三个[Meshes上使用](https://threejs.org/docs/index.html?q=mesh#api/en/objects/Mesh)[MeshToonMaterial](https://threejs.org/docs/index.html?q=toon#api/en/materials/MeshToonMaterial)。
正如在材料课程中一样，我们将创建一个材料实例并将其用于所有三个[网格](https://threejs.org/docs/index.html?q=mesh#api/en/objects/Mesh)。
创建[MeshToonMaterial](https://threejs.org/docs/index.html?q=toon#api/en/materials/MeshToonMaterial)时，使用`parameters.materialColor`属性`color`并将其应用于所有 3 个[网格](https://threejs.org/docs/index.html?q=mesh#api/en/objects/Mesh)：

```javascript
// Material
const material = new THREE.MeshToonMaterial({ color: parameters.materialColor })

// Meshes
const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
)
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material
)
const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
)

scene.add(mesh1, mesh2, mesh3)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684900600444-21487863-1ed4-4395-adc5-4f3242f9ae6d.png#averageHue=%23020105&clientId=uc037550a-e633-4&from=paste&id=ue4ee623f&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ub0909887-1d8e-4c4e-ba64-8948183890f&title=)
不幸的是，这些对象现在似乎是黑色的。
原因是 MeshToonMaterial[是](https://threejs.org/docs/index.html?q=toon#api/en/materials/MeshToonMaterial)Three.js 材质之一，只有在有光时才会出现。
#### 光
向场景中添加一个[DirectionalLight ：](https://threejs.org/docs/index.html?q=Direc#api/en/lights/DirectionalLight)

```javascript
/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)
```


![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684900600465-83278167-fae6-4b8a-90f4-2756db580689.png#averageHue=%230c0a14&clientId=uc037550a-e633-4&from=paste&id=uc59f72f1&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u1aa31312-ea7f-4ef2-8d9d-a6036e30eec&title=)
您现在应该可以看到您的对象。
我们使用存储在`parameters`对象中的颜色，但使用 Tweaker 更改此值不会更改材质本身。
为了解决这个问题，我们可以监听已经存在的调整的变化事件并相应地更新材料：

```javascript
gui
    .addColor(parameters, 'materialColor')
    .onChange(() =>
    {
        material.color.set(parameters.materialColor)
    })
```
#### 渐变纹理
正如我们在材料课程中看到的，默认情况下，[MeshToonMaterial](https://threejs.org/docs/index.html?q=toon#api/en/materials/MeshToonMaterial)将为浅色部分提供一种颜色，为阴影部分提供一种较深的颜色。
我们可以通过提供渐变纹理来改进它。
文件夹中提供了两个渐变图像`/static/textures/gradients/`。
在[实例](https://threejs.org/docs/#api/en/loaders/TextureLoader)化material. 然后加载`textures/gradients/3.jpg`纹理：

```javascript
// Texture
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
```

`gradientMap`在材料的属性中使用它：

```javascript
// Material
const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
})
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684900601579-5a7aba41-5571-4de3-a138-5e307364d113.png#averageHue=%230e0c15&clientId=uc037550a-e633-4&from=paste&id=uc61424cb&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u274e72d4-e36f-4d7c-b4c7-cb47c97e6e7&title=)
不是我们期待的卡通效果。
原因是纹理是一个非常小的图像，由 3 个像素组成，从暗到亮。默认情况下，WebGL 不会选择纹理上最近的像素，而是尝试对像素进行插值。对于我们的体验外观而言，这通常是个好主意，但在这种情况下，它会创建渐变而不是卡通效果。
为了解决这个问题，我们需要将`magFilter`纹理的 设置为`THREE.NearestFilter`以便使用最近的像素而不用相邻像素对它进行插值：

```javascript
const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684900601628-ccc56ab0-d71b-4319-97cc-4fd6a64f3bdb.png#averageHue=%231d1920&clientId=uc037550a-e633-4&from=paste&id=u9b804dae&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u8f3f398f-a6ce-4926-8679-677ec64a06d&title=)
好多了，但我们仍然需要正确定位网格。
### 位置
默认情况下，在 Three.js 中，视野是垂直的。这意味着如果您将一个对象放在渲染的顶部，将一个对象放在渲染的底部，然后调整窗口大小，您会注意到对象保持在顶部和底部。
为了说明这一点，暂时添加这段代码：

```javascript
mesh1.position.y = 2
mesh1.scale.set(0.5, 0.5, 0.5)

mesh2.visible = false

mesh3.position.y = - 2
mesh3.scale.set(0.5, 0.5, 0.5)
```

圆环保持在顶部，圆环结保持在底部。完成后，删除上面的代码。
这很好，因为这意味着我们只需要确保每个对象在`y`轴上离另一个对象足够远，这样我们就不会看到它们在一起。
创建一个`objectsDistance`变量并选择一个随机值，例如`2`：

```javascript
const objectsDistance = 2
```
使用该变量将网格定位在`y`轴上。这些值必须为负，以便对象下降：

```javascript
mesh1.position.y = - objectsDistance * 0
mesh2.position.y = - objectsDistance * 1
mesh3.position.y = - objectsDistance * 2
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684900601889-8a6d8cec-0221-4365-bfa9-a962ada91d26.png#averageHue=%23000006&clientId=uc037550a-e633-4&from=paste&id=ub4c8c130&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u447923b5-0e18-4bd5-86db-9160df10e94&title=)
增加objectsDistance直到对象之间的距离足够远。一个很好的数量应该是`4`，但您可以稍后返回更改该值。

```javascript
const objectsDistance = 4
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684900602047-a1bf471d-17a5-4b90-b356-f7dd2423914f.png#averageHue=%230b0913&clientId=uc037550a-e633-4&from=paste&id=u75aa7b2e&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ub3a1867c-0a37-4c24-b07e-ff640566b74&title=)
现在，我们只能看到第一个对象。其他两个将在下面。一旦我们用滚轮移动相机，它们会在滚动到下面时再次出现，我们将水平放置它们。
`objectsDistance`稍后会派上用场，这就是我们将值保存在变量中的原因。
### 永久轮换
为了给体验带来更多活力，我们将为对象添加永久旋转。
首先，将对象添加到`sectionMeshes`数组中：

```javascript
const sectionMeshes = [ mesh1, mesh2, mesh3 ]
```

然后，在`tick`函数中，循环遍历`sectionMeshes`数组并使用`elapsedTime`让已经在数组内可用的元素进行慢速旋转：

```javascript
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate meshes
    for(const mesh of sectionMeshes)
    {
        mesh.rotation.x = elapsedTime * 0.1
        mesh.rotation.y = elapsedTime * 0.12
    }

    // ...
}
```
所有的网格（虽然我们在这里只能看到其中一个）应该缓慢旋转。
## 相机
### 滚动
是时候让相机随着卷轴移动了。
首先，我们需要检索滚动值。这可以通过`window.scrollY`属性来完成。
创建一个`scrollY`变量并分配它`window.scrollY`：

```javascript
/**
 * Scroll
 */
let scrollY = window.scrollY
```

但是，我们需要在用户滚动时更新该值。为此，请收听`window`的以下事件`'scroll'`：

```javascript
window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY

    console.log(scrollY)
})
```

您应该在日志中看到滚动值。删除`console.log`
在`tick`函数中，`scrollY`用于使相机移动（在进行渲染之前）：

```javascript
const tick = () =>
{
    // ...

    // Animate camera
    camera.position.y = scrollY

    // ...
}
```
还不太对。相机太敏感了，而且方向错误。我们需要在该值上做一些工作。
`scrollY`向下滚动时数值为正，但相机应在`y`轴上向下滚动才对。让我们反转该值：

```javascript
camera.position.y = - scrollY
```

好多了，但还是太敏感了。
`scrollY`中包含已滚动的像素数量。如果我们滚动到 `1000` 个像素（实际不是那么多），相机将在场景中向下叠加1000次单位（1，2，3，4，5,...,1000 很多）。
每个部分的大小与视口完全相同。这意味着当我们滚动一个视口高度的距离时，相机应该到达下一个对象。
为此，我们需要`scrollY`除以视口的高度，即`sizes.height`：

```javascript
camera.position.y = - scrollY / sizes.height
```
对于滚动的每个部分，相机现在正在下降`1`。但是对象目前由`objectsDistance`变量单位为`4`分隔：
我们需要将该值乘以`objectsDistance`（这样就能滚动一个页面的距离时，相机也跟着滚动直到照射到下个网格）：

```javascript
camera.position.y = - scrollY / sizes.height * objectsDistance
```

简而言之，如果用户向下滚动一个部分，那么相机将向下移动到下一个对象。
### 水平放置对象
现在是左右放置对象以匹配标题的好时机：

```javascript
mesh1.position.x = 2
mesh2.position.x = - 2
mesh3.position.x = 2
```

### 视差
我们称视差为通过不同观察点看到一个物体的动作。这是我们的眼睛自然完成的，也是我们感受事物深度的方式。
为了让我们的体验更加身临其境，我们将通过使相机根据鼠标移动水平和垂直移动来应用这种视差效果。它将创建一种自然的交互，并帮助用户感受深度。
#### 光标
首先，我们需要检索光标位置。
为此，创建一个具有`x`和`y`属性的对象`cursor`：

```javascript
/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0
```

然后，在`window`上监听`mousemove`事件并更新这些值：

```javascript
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX
    cursor.y = event.clientY

    console.log(cursor)
})
```

您应该在控制台中获得光标的像素位置。
虽然我们可以直接使用这些值，但最好让它们适应上下文。
**首先，振幅取决于视口的大小，不同屏幕分辨率的用户会有不同的结果。我们可以通过将它们除以视口的大小来规范化值（从**`**0**`**到**`**1**`**）：**

```javascript
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width
    cursor.y = event.clientY / sizes.height

    console.log(cursor)
})
```

虽然这已经更好了，但我们可以做得更多。
我们知道相机将能够在左侧和右侧移动一样多的距离。与其让一个值从 `0`到 `1`不如让一个值从`-0.5` 到`0.5`更好。
为此，减去`0.5`：

```javascript
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5

    console.log(cursor)
})
```

这是一个适合上下文的干净值。
删除`console.log`
我们现在可以在`tick`函数中使用游标值。创建一个`parallaxX`、`andparallaxY`变量并`cursor.x`、`cursor.y`将放入其中：

```javascript
const tick = () =>
{
    // ...

    // Animate camera
    camera.position.y = - scrollY / sizes.height * objectsDistance

    const parallaxX = cursor.x
    const parallaxY = cursor.y
    camera.position.x = parallaxX
    camera.position.y = parallaxY

    // ...
}
```

不幸的是，我们有两个问题。x轴和y轴在方向上似乎不同步。而且，相机卷轴不再工作了。
让我们解决第一个问题。当我们将光标向左移动时，相机似乎向左移动。右边也一样。但是当我们向上移动光标时，相机似乎向下移动，而当向下移动光标时则相反。
要解决这种奇怪的感觉，请反转`cursor.y`：

```javascript
const parallaxX = cursor.x
    const parallaxY = - cursor.y
    camera.position.x = parallaxX
    camera.position.y = parallaxY
```
![tutieshi_640x364_5s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685079581415-979a287d-ce10-45c5-95a5-02a37139177f.gif#averageHue=%231a171c&clientId=u44cb3fbe-72e7-4&from=drop&id=ubed6f270&originHeight=364&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=626124&status=done&style=none&taskId=u4e3c1325-5191-452a-a65a-f9dacedca8a&title=)

对于第二个问题，问题是我们更新了`camera.position.y`两次，第二个将取代第一个。
![tutieshi_640x278_4s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685079622351-657c51a8-17f5-49c6-a76e-a97d1eb9eaad.gif#averageHue=%231a171d&clientId=u44cb3fbe-72e7-4&from=drop&id=e0fVk&originHeight=278&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=385807&status=done&style=none&taskId=u6d02d5de-9339-49a8-8902-70d7714d7b4&title=)
为了解决这个问题，我们将把相机放在一个[组](https://threejs.org/docs/index.html?q=group#api/en/objects/Group)中，并将视差应用于组而不是相机本身。
在`camera`实例化之前，创建[组](https://threejs.org/docs/index.html?q=group#api/en/objects/Group)，将组添加到场景,并将`camera`添加到[组](https://threejs.org/docs/index.html?q=group#api/en/objects/Group)：

```javascript
/**
 * Camera
 */
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)
```

这不应该改变结果，但现在，相机在一个组内。
在`tick`函数中，不是在相机上应用视差，而是在`cameraGroup`:

```javascript
const tick = () =>
{
    // ...

    // Animate camera
    camera.position.y = - scrollY / sizes.height * objectsDistance

    const parallaxX = cursor.x
    const parallaxY = - cursor.y
    
    cameraGroup.position.x = parallaxX
    cameraGroup.position.y = parallaxY

    // ...
}
```


滚动动画和视差动画现在很好地混合在一起。但我们可以做得更好。
#### 宽松
![tutieshi_640x283_9s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685079828102-a7d57ae3-eedd-4528-aeb9-6fc63f99fda9.gif#averageHue=%231a171d&clientId=u44cb3fbe-72e7-4&from=drop&id=u0bf03a60&originHeight=283&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=388448&status=done&style=none&taskId=uf0ed9839-ccb9-4ad4-8ace-741bf8ba050&title=)
视差动画是一个好的开始，但感觉有点太机械了。由于多种原因，在现实生活中不可能有这样僵硬的线性动画：相机有重量，与空气和表面有摩擦，肌肉不能做这样的线性运动，等等。这就是为什么感觉运动有点不自然。我们将添加一些“缓动”（也称为“平滑”或“倾斜”），并且我们将使用众所周知的公式去实现它。
公式背后的想法是，在每一帧上，我们不是将相机直接移动到目标，而是将它移动（比方说）距离目标更近 10 分之一。然后，在下一帧中，又接近了十分之一。然后，在下一帧中，又接近了十分之一。
在每一帧上，相机都会离目的地更近一点。但是，它离得越近，移动的速度就越慢，因为它总是向目标位置移动实际位置的十分之一。
首先，我们需要把 `=` 更改 `+=`，因为我们要把相机添加到实际位置：

```javascript
cameraGroup.position.x += parallaxX
    cameraGroup.position.y += parallaxY
```

然后，我们需要计算实际位置到目的地的距离：

```javascript
cameraGroup.position.x += (parallaxX - cameraGroup.position.x)
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y)
```

最后，我们只想要该距离的十分之一：

```javascript
cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 0.1
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 0.1
```

动画感觉顺畅多了，但有些人可能已经注意到了一个问题。
如果您在高频屏幕上测试体验，该tick函数将被更频繁地调用，并且相机将更快地移向目标。虽然这不是什么大问题，但它并不准确，最好在不同设备上尽可能获得相同的结果。
为了解决这个问题，我们需要使用每帧之间花费的时间。
[在实例化Clock](https://threejs.org/docs/index.html?q=clock#api/en/core/Clock)之后，立即创建一个previousTime变量：

```javascript
const clock = new THREE.Clock()
let previousTime = 0
```

在`tick`函数的开头，在设置 `elapsedTime`之后，通过从 `elapsedTime`中减去`previousTime`来计算`deltaTime`： 

```javascript
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime

    // ...
}
```

然后，更新要在下一帧中使用的`previousTime`：

```javascript
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    console.log(deltaTime)

    // ...
}
```

您现在有当前帧和前一帧之间花费的时间（以秒为单位）。对于高频屏幕，该值会更小，因为需要的时间更少。
我们现在可以在视差上使用它，但是，因为`deltaTime`它以秒为单位，所以该值将非常小（`0.016`对于大多数以 60fps 运行的常见屏幕而言）。因此，效果将非常缓慢。
要解决这个问题，我们可以更改`0.1`为`5`：

```javascript
cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime
```

我们现在有一个很好的缓动，在不同的屏幕频率下感觉都一样。
最后，我们现在已经设置了正确的动画，我们可以降低效果的幅度：

```javascript
const parallaxX = cursor.x * 0.5
    const parallaxY = - cursor.y * 0.5
```

![tutieshi_640x285_5s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685079885030-2a7ba70f-6a9b-4d9f-9078-ece16196db7b.gif#averageHue=%231a171c&clientId=u44cb3fbe-72e7-4&from=drop&id=u695a18ed&originHeight=285&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=553411&status=done&style=none&taskId=u7cf45068-1d84-447a-9bd9-eae433d347e&title=)
## 粒子
使体验更加身临其境，并帮助用户深度感受的一个好方法是在页面添加粒子。
我们将创建非常简单的方形粒子并将它们散布在场景中。
因为我们需要自己定位粒子，所以我们将创建一个自定义[BufferGeometry](https://threejs.org/docs/index.html?q=bufferG#api/en/core/BufferGeometry)，就像我们在粒子和星系生成器课程中所做的那样。
使用`Float32Array`创建一个`particlesCount`变量和一个`positions`变量：

```javascript
/**
 * Particles
 */
// Geometry
const particlesCount = 200
const positions = new Float32Array(particlesCount * 3)
```

创建一个循环并将随机坐标添加到`positions`数组：

```javascript
for(let i = 0; i < particlesCount; i++)
{
    positions[i * 3 + 0] = Math.random()
    positions[i * 3 + 1] = Math.random()
    positions[i * 3 + 2] = Math.random()
}
```
我们稍后会更改更酷的位置，但现在，让我们使用简单的代码，确保我们的几何结构正常工作。
实例化[BufferGeometry](https://threejs.org/docs/index.html?q=bufferG#api/en/core/BufferGeometry)并设置`position`属性：

```javascript
const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
```

[使用PointsMaterial](https://threejs.org/docs/index.html?q=PointsMaterial#api/en/materials/PointsMaterial)创建材质：

```javascript
// Material
const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: true,
    size: 0.03
})
```

[使用Points](https://threejs.org/docs/index.html?q=points#api/en/objects/Points)创建粒子：

```javascript
// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684900602077-b9d6bb11-eef1-44c5-b041-d6450ac56a31.png#averageHue=%231d1920&clientId=uc037550a-e633-4&from=paste&id=u4019ac51&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u7f0d0cc3-00bf-4c22-936d-ca5d8f548e9&title=)
你应该得到一堆散布在立方体中的粒子。
我们快速完成了这部分，因为我们已经在前面的课程中学习了如何制作粒子。如果你觉得不好实现，那是正常的。因为实现还是有点难，而且容易出错。
我们现在可以将粒子定位在三个轴上。
对于`x`（水平）和`z`（深度），我们可以使用随机值，它们可以是正数，也可以是负数：

```javascript
for(let i = 0; i < particlesCount; i++)
{
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = Math.random()
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}
```

对于`y`（垂直）它有点棘手。我们需要让粒子从足够高的地方开始，然后在下面扩散得足够远，这样我们才能到达卷轴的尽头。
为此，我们可以使用`sectionMeshes.length`变量并乘以`objectsDistance`：

```javascript
for(let i = 0; i < particlesCount; i++)
{
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * sectionMeshes.length
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}
```
与对象材质一样，我们可以在事件中更新粒子的颜色：

```javascript
gui
    .addColor(parameters, 'materialColor')
    .onChange(() =>
    {
        material.color.set(parameters.materialColor)
        particlesMaterial.color.set(parameters.materialColor)
    })
```

这就是粒子的全部内容，但是您显然可以像我们在之前的课程中使用随机大小和随机 `alpha` 那样改进它们。而且，我们甚至可以为它们制作动画。
## 触发旋转 
作为最后一个特征，为了让练习更难一点，我们将在到达相应部分时让对象在永久旋转之外做一点额外的旋转。
### 知道何时触发动画
首先，我们需要一种方法来知道何时到达某个部分。有很多方法可以做到这一点，我们甚至可以使用一个库，但在我们的例子中，我们可以使用该`scrollY`值并做一些数学运算来找到当前部分。
创建`scrollY`变量后，创建一个`currentSection`变量并将其设置为`0`：

```javascript
let scrollY = window.scrollY
let currentSection = 0
```

在`'scroll'`事件回调函数中，通过`scrollY`除以`sizes.height`计算当前部分：

```javascript
window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY

    const newSection = scrollY / sizes.height
    
    console.log(newSection)
})
```

这是可行的，因为每个部分恰好是视口的一个高度。
要获取确切的部分而不是浮点值，我们可以使用`Math.round()`取到整数：

```javascript
window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY

    const newSection = Math.round(scrollY / sizes.height)
    
    console.log(newSection)
})
```

我们现在可以测试`newSection`是否不同于`currentSection`。如果是这样，那意味着我们更改了该部分，我们可以更新`currentSection`以制作我们的动画：

```javascript
window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY
    const newSection = Math.round(scrollY / sizes.height)

    if(newSection != currentSection)
    {
        currentSection = newSection

        console.log('changed', currentSection)
    }
})
```

### 动画网格
我们将使用[GSAP](https://greensock.com/gsap/)为网格设置动画。
通过在终端中运行`npm install gsap@3.5.1`将 `GSAP` 添加到依赖项中。我们正在使用一个非常具体的 `GSAP` 版本，来确保案例和您编写时代码是相同的。如果您想使用最新版本，请运行`npm install gsap`，但您可能因为使用新版本而导致案例和使用语法的不同。
如果您收到编译器发出的漏洞警告，请不要在意。这并不影响编程。
添加依赖项后，在代码开头导入 `GSAP`：
```javascript
import gsap from 'gsap'
```

然后，在我们`if`之前所做的声明中，我们可以使用`gsap.to()`方式制作动画：

```javascript
window.addEventListener('scroll', () =>
{
    // ...
    
    if(newSection != currentSection)
    {
        // ...

        gsap.to(
            sectionMeshes[currentSection].rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: '+=6',
                y: '+=3'
            }
        )
    }
})
```
虽然此代码有效，但不幸的是它不起作用。原因是重复修改了旋转角度，在每一帧上，我们已经用`elapsedTime` 更新了每个网格的`rotation.x`和`rotation.y`。
为了解决这个问题，在 `tick` 函数中，我们不要根据`elapsedTime` 设置非常具体的旋转，而是将 `deltaTime`添加到当前旋转：

```javascript
const tick = () =>
{
    // ...

    for(const mesh of sectionMeshes)
    {
        mesh.rotation.x += deltaTime * 0.1
        mesh.rotation.y += deltaTime * 0.12
    }

    // ...
}
```

为了给动画添加更多的随机性，尤其是对于圆锥体，我们还可以为z轴也设置动画：

```javascript
gsap.to(
            sectionMeshes[currentSection].rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: '+=6',
                y: '+=3',
                z: '+=1.5'
            }
        )
```
## 进一步深入拓展
我们让事情变得非常简单，但您可以走得更远。

- 向 HTML 添加更多内容
- 为材质等其他属性设置动画
- 动画化 HTML 文本
- 改善颗粒
- 向调试 UI 添加更多调整
- 测试其他颜色
- ETC。



