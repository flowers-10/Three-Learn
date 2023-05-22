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
## 烘烤
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

