# 21. Physics物理
## 介绍
物理是WebGL可以添加到项目体验中最酷的功能之一。人们喜欢真实物理感的物体，看到它们碰撞、倒塌、坠落和弹跳，就像我的作品集一样： https: [//bruno-simon.com/](https://bruno-simon.com/)
有很多方法可以将物理功能添加到您的项目中，这取决于您想要实现的目标。[您可以使用一些数学和解决方案（例如Raycaster）](https://threejs.org/docs/index.html#api/en/core/Raycaster)来创建自己的物理学
## 理论
这个想法很简单。我们将创建一个物理世界。这个物理世界是纯理论的。在这个物理世界上，东西会产生掉落、碰撞、摩擦、滑动等等交互。
当我们创建一个 Three.js 网格时，我们还将在物理世界中创建该网格的一个物理版本。如果我们在 Three.js 中创建一个 Box，我们也会在物理世界中创建一个Box框。
然后，在每一帧上，在渲染任何东西之前，我们告诉物理世界进行自我更新；我们获取物理对象的坐标（位置和旋转）并将它们应用于相应的 Three.js 网格。
就是这么简单的原理。这里最困难的是将我们的代码组织成一个合理的结构。这是一个完全和原本文件路径分开的路径部分。每个开发人员都会有自己的习惯，这也取决于你想做什么以及你想把这个物理世界变得多复杂。
首先，我们将简单地创建球体和盒子。
## 物理功能依赖库
物理功能有多个可用的库。首先，您必须决定是需要 3D 库还是 2D 库。虽然您可能认为它必须是一个 3D 库，因为 Three.js 完全是关于 3D 的，但您可能错了。2D 库通常性能更高，如果您可以总结 2D 碰撞的物理经验，则最好使用 2D 库。
举一个例子是如果你想创建一个类似⚾️弹球游戏。球可以在墙上碰撞和弹跳，您就可以使用 2D 库将所有东西投影到二维平面上。您可以将球设计成物理世界中的圆圈，而墙壁是简单的矩形。事实上，这么做您将无法通过击球底部来使球跳过其他球。
像这样完成的项目的一个很好的例子是[Merci Michel](https://www.merci-michel.com/)的[Ouigo Let's play](http://letsplay.ouigo.com/)。他们使用了 2D 物理库，因为每个碰撞和动画都可以在 2D 空间中表示。
### 3D物理
对于 3D 物理，主要有三个库：
#### ammo.js

- 网站： http: [//schteppe.github.io/ammo.js-demos/](http://schteppe.github.io/ammo.js-demos/)
- Git 存储库：[https://github.com/kripken/ammo.js/](https://github.com/kripken/ammo.js/)
- 文档：无文档
- Bullet 的直接 JavaScript 端口（用 C++ 编写的物理引擎）
- 体积大有点重
- 社区仍然在更新
#### cannon.js

- 网站： https: [//schteppe.github.io/cannon.js/](https://schteppe.github.io/cannon.js/)
- Git 存储库： https: [//github.com/schteppe/cannon.js](https://github.com/schteppe/cannon.js)
- 文档： http: [//schteppe.github.io/cannon.js/docs/](http://schteppe.github.io/cannon.js/docs/)
- 比 Ammo.js 更轻
- 比 Ammo.js 更容易实现
- 主要由一名开发人员维护
- 多年未更新
- 有一个维护的叉子
#### Oimo.js

- 网站： https: [//lo-th.github.io/Oimo.js/](https://lo-th.github.io/Oimo.js/)
- Git 存储库：[https://github.com/lo-th/Oimo.js](https://github.com/lo-th/Oimo.js)
- 文档：[http://lo-th.github.io/Oimo.js/docs.html](http://lo-th.github.io/Oimo.js/docs.html#world)
- 比 Ammo.js 更轻
- 比 Ammo.js 更容易实现
- 主要由一名开发人员维护
- 2年没更新了
### 2D物理
对于 2D 物理，有很多库，但这里是最流行的：
#### matter.js

- 网站： https: [//brm.io/matter-js/](https://brm.io/matter-js/)
- Git 存储库： https: [//github.com/liabru/matter-js](https://github.com/liabru/matter-js)
- 文档： https: [//brm.io/matter-js/docs/](https://brm.io/matter-js/docs/)
- 主要由一名开发人员维护
- 还是有点更新
#### P2.js

- 网站： https: [//schteppe.github.io/p2.js/](https://schteppe.github.io/p2.js/)
- Git 存储库： https: [//github.com/schteppe/p2.js](https://github.com/schteppe/p2.js)
- 文档： http: [//schteppe.github.io/p2.js/docs/](http://schteppe.github.io/p2.js/docs/)
- 主要由一名开发人员维护（与 Cannon.js 相同）
- 2年没更新了
#### planck.js

- 网站： https: [//piqnt.com/planck.js/](https://piqnt.com/planck.js/)
- Git 存储库： https: [//github.com/shakiba/planck.js](https://github.com/shakiba/planck.js)
- 文档： https: [//github.com/shakiba/planck.js/tree/master/docs](https://github.com/shakiba/planck.js/tree/master/docs)
- 主要由一名开发人员维护
- 现在还在更新
#### Box2D.js

- 网站：[http://kripken.github.io/box2d.js/demo/webgl/box2d.html](http://kripken.github.io/box2d.js/demo/webgl/box2d.html)
- Git 存储库： https: [//github.com/kripken/box2d.js/](https://github.com/kripken/box2d.js/)
- 文档：无文档
- 主要由一名开发人员维护（与 Ammo.js 相同）
- 现在还在更新

我们不会在本课中使用 2D 库，但 2D 库代码与 3D 库代码非常相似。主要区别在于您必须更新的轴。
已经有尝试将 Three.js 与[Physijs](https://chandlerprall.github.io/Physijs/)等库结合起来的解决方案。尽管如此，我们不会使用这些已经做好封装的现成解决方案，我们要手动结合物理库来获得更好的学习体验并更好地理解内部运行的逻辑。
[虽然 Ammo.js 是最常用的库，尤其是在 Three.js中，正如您在示例](https://threejs.org/examples/?q=ammo#physics_ammo_break)中看到的那样，我们将选择 Cannon.js。这个库在我们的项目中实现起来更舒服，也更容易使用。
## 导入 Cannon.js
要将 `Cannon.js` 添加到我们的项目中，我们首先需要添加依赖项。
在您的终端的项目文件夹中，运行此命令`npm install --save cannon`。
我们现在可以使用经典的 JavaScript 在我们的 JavaScript 中`import`导入 Cannon.js ：

```javascript
import CANNON from 'cannon'
```
我们需要的一切都在`CANNON`变量中可用。
## 设置
我们的启动器由平面上的一个球体组成，并且出于美学原因已经启用了阴影。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685266069626-46e8e183-849f-4266-9ab5-c557a2b47cad.png#averageHue=%23343433&clientId=udbbd0b10-5f9f-4&from=paste&id=u5490155f&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9f12a504-7c04-48ae-83ae-3185137ad65&title=)
## 基础
### 世界
首先，我们需要创建一个 Cannon.js[世界](http://schteppe.github.io/cannon.js/docs/classes/World.html)：

```javascript
/**
 * Physics
 */
const world = new CANNON.World()
```

现在我们获得了一个，感觉在没有重力漂浮在太空中的 WebGL 体验感，让我们增加重力脚踏实地。您可以使用Cannon.js [Vec3](http://schteppe.github.io/cannon.js/docs/classes/Vec3.html) 的 `gravity`属性更改重力。
**Cannon.js **[**Vec3**](http://schteppe.github.io/cannon.js/docs/classes/Vec3.html)**就像 Three.js **[**Vector3**](https://threejs.org/docs/#api/en/math/Vector3)**一样。它也有**`**x**`**、**`**y**`**和**`**z**`**属性，还有一个**`**set(...)**`**方法：**

```javascript
world.gravity.set(0, - 9.82, 0)
```
我们把第二个参数值 改为 `- 9.82` 是因为，`- 9.82`它是地球上的重力常数，但如果您想让物体下落得更慢或者如果您的场景发生在火星上，您可以使用其他重力值。
### 目的
因为我们的场景中已经有了一个球体，所以让我们在 Cannon.js [World](http://schteppe.github.io/cannon.js/docs/classes/World.html)中也创建一个球体。
为此，我们必须创建一个[Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)。Body是会掉落的并与其他物体碰撞的。
在我们创建一个[Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)之前，我们必须决定一个形状。有许多可用的基本形状，如[Box](http://schteppe.github.io/cannon.js/docs/classes/Box.html)、[Cylinder](http://schteppe.github.io/cannon.js/docs/classes/Cylinder.html)、[Plane](http://schteppe.github.io/cannon.js/docs/classes/Plane.html)等。我们将选择一个与 Three.js 球体具有相同半径的[Sphere ：](http://schteppe.github.io/cannon.js/docs/classes/Sphere.html)

```javascript
const sphereShape = new CANNON.Sphere(0.5)
```

然后我们可以创建我们的[body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)并指定质量和位置：

```javascript
const sphereBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape: sphereShape
})
```

最后，我们可以将[Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html) 通过`addBody(...)`添加到世界中：

```javascript
world.addBody(sphereBody)
```

现在页面里什么都没有发生，因为我们仍然需要更新我们的 Cannon.js 世界并相应地更新我们的 Three.js 球体。
### 更新 Cannon.js 世界和 Three.js 场景
要更新我们的world[世界](http://schteppe.github.io/cannon.js/docs/classes/World.html)，我们必须使用`step(...)`. 该方法底层的代码很难理解，我们不会在本课中对其进行解释，但您可以在[本文](https://gafferongames.com/post/fix_your_timestep/)中找到更多相关信息。
要让它工作，您必须提供一个固定的时间步长、自上一步以来经过了多少时间，以及世界world可以应用多少次迭代来赶上潜在的延迟。
我们不会解释什么是时间步长，但我们希望体验以 60fps 的速度运行，所以我们将使用1 / 60来表示. 别担心，在帧率更高和更低的设备上，体验将以相同的速度运行。
迭代次数由你决定，但体验是否流畅就没那么重要了。
对于三角洲时间，它有点复杂。我们需要计算自上一帧以来经过了多少时间。不要使用[Clock](https://threejs.org/docs/#api/en/core/Clock)类中的`getDelta()`方法。你不会得到预期的结果，而且你会搞乱类的内部逻辑。
为了获得正确的增量时间，我们需要从前一帧`elapsedTime`减去当前帧`elapsedTime`获得：

```javascript
const clock = new THREE.Clock()
let oldElapsedTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime

    // ...
}
```
我们终于可以更新我们的世界了：

```javascript
const tick = () =>
{
    // ...

    // Update physics
    world.step(1 / 60, deltaTime, 3)
}
```
似乎没有任何东西在移动。其实现实是我们的`sphereBody`正在无限的堕入深渊，只是因为相机一直跟着物体坠落所以你难以发现，你可以通过在更新world世界后记录它的位置来看到：

```javascript
world.step(1 / 60, deltaTime, 3)
    console.log(sphereBody.position.y)
```

我们现在需要做的是使用`sphereBody`坐标更新我们的`sphere`。 Three.js 有两种方法可以做到这一点。您可以单独更新每个`position`属性：

```javascript
sphere.position.x = sphereBody.position.x
    sphere.position.y = sphereBody.position.y
    sphere.position.z = sphereBody.position.z
```

或者您可以使用以下方法将所有属性作为一个复制`copy(...)`：

```javascript
sphere.position.copy(sphereBody.position)
```
`copy(...)`在许多类中可用，例如[Vector2](https://threejs.org/docs/#api/en/math/Vector2)、[Vector3](https://threejs.org/docs/#api/en/math/Vector3)、[Euler](https://threejs.org/docs/#api/en/math/Euler)、[Quaternion](https://threejs.org/docs/#api/en/math/Quaternion)，甚至类如[Material](https://threejs.org/docs/#api/en/materials/Material)、[Object3D](https://threejs.org/docs/#api/en/core/Object3D)、[Geometry](https://threejs.org/docs/#api/en/core/Geometry)等。
![tutieshi_640x301_2s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685500051190-98e5da12-6172-4a2b-bc73-ad703e8f4ca1.gif#averageHue=%2331302f&clientId=u05a8914d-8ced-4&from=drop&id=uab7a1443&originHeight=301&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=312357&status=done&style=none&taskId=u05df5c2e-fda2-45b6-8b56-010fdd8b464&title=)
你最终应该看到你的项目中球体正在自由落体。问题是我们的球体似乎从地板上掉了下来。这是因为该地板存在于 Three.js 场景中，但不存在于 Cannon.js 世界中。
我们可以使用[Plane](http://schteppe.github.io/cannon.js/docs/classes/Plane.html)形状简单地添加一个新的[Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)，但我们不希望我们的地板受到重力影响而掉落。换句话说，我们希望我们的地板是静态的。要使[Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)静态，请将其设置为：`mass = 0`

```javascript
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body()
floorBody.mass = 0
floorBody.addShape(floorShape)
world.addBody(floorBody)
```
![tutieshi_640x303_2s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685500279550-e7e6e4bf-67e9-4ddb-b677-11958c692d5b.gif#averageHue=%23363533&clientId=u05a8914d-8ced-4&from=drop&id=ue3615555&originHeight=303&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=325267&status=done&style=none&taskId=u8f1e7105-e088-4a55-81ae-c42cf32c25c&title=)
如您所见，这次我们的做法大不相同。我们创建了一个没有参数的[Body ，然后我们设置了这些参数。](http://schteppe.github.io/cannon.js/docs/classes/Body.html)结果是一样的，我们这样做的唯一原因是为了上课讲解。一件有趣的事情是您可以创建一个由多个[Shapes](http://schteppe.github.io/cannon.js/docs/classes/Shape.html)组成的[Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)。它对于复杂但坚固的物体很有用。
您应该看到球体朝一个方向（可能朝向相机）跳跃。这不是预期的结果。原因是我们的地板plane默认正对着相机。我们需要像在 Three.js 中旋转地板一样旋转它让他转到离开相机的区域。
使用 Cannon.js 进行旋转比使用 Three.js 稍微困难一些，因为您必须使用[Quaternion](http://schteppe.github.io/cannon.js/docs/classes/Quaternion.html)来实现。有多种旋转[Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)的方法，但必须使用其`quaternion`属性。我们将使用`setFromAxisAngle(...)`方法旋转body.
第一个参数是一个轴。您可以将其想象成穿过[身体的](http://schteppe.github.io/cannon.js/docs/classes/Body.html)一根线。第二个参数是角度。这是你围绕这条线旋转[身体](http://schteppe.github.io/cannon.js/docs/classes/Body.html)的角度。

```javascript
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(- 1, 0, 0), Math.PI * 0.5)
```
![tutieshi_640x400_1s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685459265037-585e7454-ce89-407b-b551-106c458bfec8.gif#averageHue=%232a2a29&clientId=u95e5d96f-7d5b-4&from=drop&id=ub2278555&originHeight=400&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=227079&status=done&style=none&taskId=u07596cac-89e3-499e-a1e4-0f1362a5e5e&title=)

我们将轴设置为负轴（相对于相机的左侧）穿过[身体的](http://schteppe.github.io/cannon.js/docs/classes/Body.html)线，并将`x`角度设置为（四分之一圆）。`Math.PI * 0.5`
您现在应该看到球体下落然后停在地板上。
我们不需要用 Cannon.js 地板更新 Three.js 地板，因为这个对象不会再移动了。
## [ContactMaterial](http://schteppe.github.io/cannon.js/docs/classes/ContactMaterial.html) 关联材料 
如您所见，球落地后基本不会弹跳。这是默认行为，我们可以使用[Material](http://schteppe.github.io/cannon.js/docs/classes/Material.html)（不是 Three.js 中的 Material）和[ContactMaterial](http://schteppe.github.io/cannon.js/docs/classes/ContactMaterial.html)来让它变的富有弹性。
材料只是一个参考[。](http://schteppe.github.io/cannon.js/docs/classes/Material.html)您可以给它起一个名字并将它与一个[Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)相关联。然后为场景中的每种材质创建一个[材质。](http://schteppe.github.io/cannon.js/docs/classes/Material.html)
如果场景中有多种材质，假设一种木料材质用于地板，一种金属材质用于球。然后，您应该创建各种[材质](http://schteppe.github.io/cannon.js/docs/classes/Material.html)并为它们命名，例如`'concrete'`和`'plastic'`。
(假设你世界里的一切都是塑料材质制成的。在这种情况下，您只需创建一种材料并将其命名为`'default`'即可。)
你可以给他们互相关联到`'ground'`和`'ball'`中。尽管如此，如果您想对墙壁和立方体等其他对象使用相同的材质，都名为`'ground'`即可.
在创建球体和地板之前，创建这两个[材质](http://schteppe.github.io/cannon.js/docs/classes/Material.html)：

```javascript
const concreteMaterial = new CANNON.Material('concrete')
const plasticMaterial = new CANNON.Material('plastic')
```

现在我们有了[Material](http://schteppe.github.io/cannon.js/docs/classes/Material.html)，我们必须创建一个[ContactMaterial](http://schteppe.github.io/cannon.js/docs/classes/ContactMaterial.html)。[它是两种材质](http://schteppe.github.io/cannon.js/docs/classes/Material.html)的组合，用来关联两种材料并模拟💥碰撞发生，包含对象发生碰撞时的属性。
前两个参数是[Materials](http://schteppe.github.io/cannon.js/docs/classes/Material.html)。**第三个参数是一个**`**{}**`**包含两个重要属性的对象：**`**friction**`**系数（摩擦系数）和**`**restitution**`**系数（弹跳系数）——两者的默认值为0.3.**
创建后，使用以下方法`addContactMaterial(...)`将[ContactMaterial](http://schteppe.github.io/cannon.js/docs/classes/ContactMaterial.html)添加到世界：

```javascript
const concretePlasticContactMaterial = new CANNON.ContactMaterial(
    concreteMaterial,
    plasticMaterial,
    {
        friction: 0.1,
        restitution: 0.7
    }
)
world.addContactMaterial(concretePlasticContactMaterial)
```

混凝土和塑料材质之间没有太大的摩擦力，但是如果你让一个橡胶球落在混凝土地板上，你会看到它会反弹的很高。
[我们现在可以在身体](http://schteppe.github.io/cannon.js/docs/classes/Body.html)上使用我们的[材质](http://schteppe.github.io/cannon.js/docs/classes/Material.html)。[您可以在实例化Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)时或在`material`属性之后直接传递[材质](http://schteppe.github.io/cannon.js/docs/classes/Material.html)。我们做这两件事：

```javascript
const sphereBody = new CANNON.Body({
    // ...
    material: plasticMaterial
})

// ...

const floorBody = new CANNON.Body()
floorBody.material = concreteMaterial
```
![tutieshi_640x400_4s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685501018198-02a6ad57-e82e-4874-807e-32ba09e7615f.gif#averageHue=%232f2f2e&clientId=u05a8914d-8ced-4&from=drop&id=u596224d9&originHeight=400&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=881661&status=done&style=none&taskId=u3b135843-83f8-481a-bf6d-a738355dbee&title=)
在停止之前，您应该看到球反弹了很多次。我们看不到`friction`动作，因为我们的球完全笔直地落在我们的地板上，而且球大部分时间都在空中。
拥有不同的[材料](http://schteppe.github.io/cannon.js/docs/classes/Material.html)并为每种组合创建一个[接触材料](http://schteppe.github.io/cannon.js/docs/classes/ContactMaterial.html)可能会令人费解。为了简化一切，让我们将两种[材质](http://schteppe.github.io/cannon.js/docs/classes/Material.html)替换为默认材质，并将其用于每个[Bodies](http://schteppe.github.io/cannon.js/docs/classes/Body.html)：

```javascript
const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 0.1,
        restitution: 0.7
    }
)
world.addContactMaterial(defaultContactMaterial)

// ...

const sphereBody = new CANNON.Body({
    // ...
    material: defaultMaterial
})

// ...

floorBody.material = defaultMaterial
```
![tutieshi_640x400_4s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685501018198-02a6ad57-e82e-4874-807e-32ba09e7615f.gif#averageHue=%232f2f2e&clientId=u05a8914d-8ced-4&from=drop&id=NgteC&originHeight=400&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=881661&status=done&style=none&taskId=u3b135843-83f8-481a-bf6d-a738355dbee&title=)
我们应该得到相同的结果。
我们可以更进一步，将我们的材质设置为[World](http://schteppe.github.io/cannon.js/docs/classes/World.html)的默认材质。为此，只需将`defaultContactMaterial` 分配给`world.defaultContactMaterial`属性：

```javascript
world.defaultContactMaterial = defaultContactMaterial
```

我们现在可以删除或注释`floorBody`的`sphereBody`材料分配。
## 施力
有很多方法可以对[Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)施加力：

- [applyForce](http://schteppe.github.io/cannon.js/docs/classes/Body.html#method_applyForce)从空间中的指定点（不一定在[Body的表面）向](http://schteppe.github.io/cannon.js/docs/classes/Body.html)[Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)施加一个力，就像风一直将所有东西推一点点，可以是多米诺骨牌穿导的推力，可以是更大爆发力让愤怒的小鸟飞向敌人的城堡。
- [applyImpulse与](http://schteppe.github.io/cannon.js/docs/classes/Body.html#method_applyImpulse)[applyForce](http://schteppe.github.io/cannon.js/docs/classes/Body.html#method_applyForce)类似，但它不是自增导致速度变化的力，而是直接应用于速度。
- [applyLocalForce与](http://schteppe.github.io/cannon.js/docs/classes/Body.html#method_applyLocalForce)[applyForce](http://schteppe.github.io/cannon.js/docs/classes/Body.html#method_applyForce)相同，但坐标是[Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)的内部中心坐标（意味着它将是[Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)0, 0, 0的中心）。
- [applyLocalImpulse与](http://schteppe.github.io/cannon.js/docs/classes/Body.html#method_applyLocalImpulse)[applyImpulse](http://schteppe.github.io/cannon.js/docs/classes/Body.html#method_applyImpulse)相同，但坐标是[Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)的内部中心坐标。

因为用“力”的方式会造成速度的变化，我们还是不要用“冲量”的方式
让我们在开始时`applyLocalForce(...)`对我们的`sphereBody`施加一个小的力推动它：

```javascript
sphereBody.applyLocalForce(new CANNON.Vec3(150, 0, 0), new CANNON.Vec3(0, 0, 0))
```

![tutieshi_640x400_4s (2).gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685501593788-7d54d191-6064-49d8-ac06-78f118056f20.gif#averageHue=%232f2f2e&clientId=u05a8914d-8ced-4&from=drop&id=ue1e70126&originHeight=400&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=846776&status=done&style=none&taskId=ude5062cc-aa05-40cd-a6db-715d9b14ead&title=)
您可以看到球向右弹跳并滚动。
现在让我们使用`applyForce(...)`施加一些风的感觉。因为风是永久性的，所以我们应该在更新[World](http://schteppe.github.io/cannon.js/docs/classes/World.html)之前将此力应用于每一帧。要正确施加此力，**重点应该是**`**sphereBody.position**`：

```javascript
const tick = () =>
{
    // ...

    // Update physics
    sphereBody.applyForce(new CANNON.Vec3(- 0.5, 0, 0), sphereBody.position)

    world.step(1 / 60, deltaTime, 3)

    // ...
}
```
![tutieshi_640x400_13s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685501763032-660ba711-ec2a-42a2-9b2b-57d85cdad5d9.gif#averageHue=%232f2f2e&clientId=u05a8914d-8ced-4&from=drop&id=u1de41102&originHeight=400&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2798219&status=done&style=none&taskId=ud686ec59-0e07-4ff9-9a93-f7198e39902&title=)
## 处理多个对象
处理一两个对象很容易，但管理几十个对象可能会很麻烦。我们需要稍微优化一下让多个对象也能同时管理。
首先，删除或注释`sphere`、 `sphereShape`和 `sphereBody`的相关代码。
### 自动化功能
首先，让我们改进我们创建球体的方式，该函数将同时包括 Three.js 和 Cannon.js 创建球体的方法。
作为此函数的参数，我们向函数传递`radius`和`position`两个值，但你也可以再随意添加其他参数，例如`mass`、`material`、`subdivisions`等。

```javascript
/**
 * Utils
 */
const createSphere = (radius, position) =>
{
}
```

现在我们可以创建：

Three.js[网格](https://threejs.org/docs/#api/en/objects/Mesh)：

```javascript
const createSphere = (radius, position) =>
{
    // Three.js mesh
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 20, 20),
        new THREE.MeshStandardMaterial({
            metalness: 0.3,
            roughness: 0.4,
            envMap: environmentMapTexture,
            envMapIntensity: 0.5
        })
    )
    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)
}
```

和 Cannon.js[主体](http://schteppe.github.io/cannon.js/docs/classes/Body.html)：

```javascript
const createSphere = (radius, position) =>
{
    // ...

    // Cannon.js body
    const shape = new CANNON.Sphere(radius)

    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape: shape,
        material: defaultMaterial
    })
    body.position.copy(position)
    world.addBody(body)
}
```

我们可以删除之前创建的球体并调用`createSphere(...)`（在创建 Cannon.js 世界和 Three.js 场景之后）。不要忘记删除`tick()`函数中的球体更新代码：

```javascript
createSphere(0.5, { x: 0, y: 3, z: 0 })
```
![tutieshi_640x400_4s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685502455468-6203ef9a-ff8b-4863-ad98-0834dd2a5fe3.gif#averageHue=%232f2f2d&clientId=u05a8914d-8ced-4&from=drop&id=ud3526a45&originHeight=400&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1124545&status=done&style=none&taskId=uac47ff23-08d1-4c69-b250-a116a03f554&title=)
如您所见，位置不必是 Three.js [Vector3](https://threejs.org/docs/#api/en/math/Vector3)或 Cannon.js [Vec3](http://schteppe.github.io/cannon.js/docs/classes/Vec3.html) 两个标准中心点 ，我们可以简单地使用具有`x``,y`和`z`属性的对象（对我们来说很幸运）。
您应该看到球体漂浮在地板上方，但不幸的是，它不再移动了。[这是完全正常的，因为我们刚才注释或者删除了将 Cannon.js Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html) 的`position`属性应用于 Three.js [Mesh 的](https://threejs.org/docs/#api/en/objects/Mesh) `position` 属性的代码。
### 使用对象数组
为了处理这个问题，我们将创建一个包含所有需要更新的对象的数组。然后我们将对象内新创建的[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)和[Body添加到该数组：](http://schteppe.github.io/cannon.js/docs/classes/Body.html)

```javascript
const objectsToUpdate = []

const createSphere = (radius, position) =>
{
    // ...

    // Save in objects to update
    objectsToUpdate.push({
        mesh: mesh,
        body: body
    })
}
```
您可以这样优化，重写最后一部分（JavaScript 中变量名相同时无需指定属性）：

```javascript
objectsToUpdate.push({ mesh, body })
```

我们现在可以在`tick()`函数内循环遍历该数组（在我们更新世界之后）并将每个数组`body.position`数值复制到`mesh.position`属性里：

```javascript
const tick = () =>
{
    // ...

    world.step(1 / 60, deltaTime, 3)

    for(const object of objectsToUpdate)
    {
        object.mesh.position.copy(object.body.position)
    }
}
```
![tutieshi_640x400_3s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685504357982-8459a6ab-6583-4895-b888-f6d971a31e3e.gif#averageHue=%23302f2e&clientId=u05a8914d-8ced-4&from=drop&id=udfe04f17&originHeight=400&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=269927&status=done&style=none&taskId=u043ffa89-354b-4c13-b588-93aace5b79f&title=)
球体应该再次开始下降。
### 添加到 Dat.GUI
现在我们可以向我们的 Dat.GUI 添加一个按钮`createSphere`。问题是使用该`gui.add(...)`方法时第一个参数应该是一个对象，第二个参数应该是一个属性名。不幸的是，我们的`createSphere`是个函数，不是一个对象，而且还需要向它传递参数。这种情况经常会发生。一个不错的解决方案是我们再创建一个对象，其唯一目的是将那些丢失的功能作为属性：

```javascript
const gui = new dat.GUI()
const debugObject = {}
```

然后在需要时向其添加函数（在`createSphere`创建函数之后）：

```javascript
debugObject.createSphere = () =>
{
    createSphere(0.5, { x: 0, y: 3, z: 0 })
}
```

最后，我们可以将这个新`createSphere`属性添加到` Dat.GUI`：

```javascript
gui.add(debugObject, 'createSphere')
```
![tutieshi_640x400_6s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685504791828-93c2118b-8f98-471a-9d29-65729ccb688c.gif#averageHue=%232f2f2f&clientId=u05a8914d-8ced-4&from=drop&id=u5b0d6040&originHeight=400&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=477029&status=done&style=none&taskId=ubb174735-2671-46c1-9e0b-f872a3e94ea&title=)
如果您单击新创建的`createSphere`按钮，您应该会看到球体相互重叠。这是由于球体在完全相同的位置弹出。让我们添加一些随机性即可防止球体重叠了：

```javascript
debugObject.createSphere = () =>
{
    createSphere(
        Math.random() * 0.5,
        {
            x: (Math.random() - 0.5) * 3,
            y: 3,
            z: (Math.random() - 0.5) * 3
        }
    )
}
```
![tutieshi_640x400_10s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685504947999-d7d9d5ae-366f-4050-88dd-dff215a149c5.gif#averageHue=%23302f2e&clientId=u05a8914d-8ced-4&from=drop&id=u936e79ce&originHeight=400&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=856187&status=done&style=none&taskId=ue435148b-0b68-4ab8-92ac-4c848177013&title=)
像下雨了一样！
为了尽量不要烧毁你的电脑；此代码需要优化。
### 优化
因为Three.js [Mesh](https://threejs.org/docs/#api/en/objects/Mesh)的几何体和材质是一样的，我们应该把它们从`createSphere`函数中提取出来。问题是我们正在根据半径`radius`来创建我们的几何体。一个简单的解决方案是将[SphereGeometry](https://threejs.org/docs/#api/en/geometries/SphereGeometry)的半径`radius`固定为`1`然后缩放[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)：

```javascript
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const sphereMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
    envMapIntensity: 0.5
})
const createSphere = (radius, position) =>
{
    // Three.js mesh
    const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    mesh.castShadow = true
    mesh.scale.set(radius, radius, radius)
    mesh.position.copy(position)
    scene.add(mesh)

    // ...
}
```

这样材质都是相同的，你应该得到和之前相同的结果并且大大优化了性能。
## 添加立方体
现在我们的球体运行良好，让我们用立方体也进行一次相同的实现过程。
要创建一个立方体，我们必须使用一个[BoxGeometry](https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry)和一个[Box](http://schteppe.github.io/cannon.js/docs/classes/Box.html)形状。当心; 参数不一样。BoxGeometry需要一个`width`、一个`height`[和](https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry)一个`depth`。与此同时，一个[Box](http://schteppe.github.io/cannon.js/docs/classes/Box.html)形状需要一个`halfExtents`. 它由[Vec3 表示，该 Vec3](http://schteppe.github.io/cannon.js/docs/classes/Vec3.html)对应于从框的中心开始并连接该框角之一的段：

```javascript
// Create box
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
    envMapIntensity: 0.5
})
const createBox = (width, height, depth, position) =>
{
    // Three.js mesh
    const mesh = new THREE.Mesh(boxGeometry, boxMaterial)
    mesh.scale.set(width, height, depth)
    mesh.castShadow = true
    mesh.position.copy(position)https://www.yuque.com/channel1/wvnr6v/dtdmh6s06vgyxn6p/edit#kKBqS
    scene.add(mesh)

    // Cannon.js body
    const shape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5))

    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape: shape,
        material: defaultMaterial
    })
    body.position.copy(position)
    world.addBody(body)

    // Save in objects
    objectsToUpdate.push({ mesh, body })
}

createBox(1, 1.5, 2, { x: 0, y: 3, z: 0 })

debugObject.createBox = () =>
{
    createBox(
        Math.random(),
        Math.random(),
        Math.random(),
        {
            x: (Math.random() - 0.5) * 3,
            y: 3,
            z: (Math.random() - 0.5) * 3
        }
    )
}
gui.add(debugObject, 'createBox')
```
![tutieshi_640x400_2s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685511849834-b53e65aa-e633-4eba-b5e8-5360a50fa949.gif#averageHue=%23333232&clientId=u05a8914d-8ced-4&from=drop&id=ub6162dc4&originHeight=400&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=489142&status=done&style=none&taskId=u261c1819-29d5-4232-ad7f-a32aaef71a6&title=)
不要忘记删除第一个`createSphere(...)`调用，否则您将同时在同一位置创建球体和长方体，这可能会变得混乱。

![tutieshi_640x400_2s (1).gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685511919595-f9ccb48b-23c5-48f2-af8c-8ae24d74c0f0.gif#averageHue=%23363533&clientId=u05a8914d-8ced-4&from=drop&id=u364cd0d1&originHeight=400&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=524893&status=done&style=none&taskId=ua3f28111-4fdd-413e-aecb-6e23f9a202c&title=)
如果你点击Dat.GUI 的`createBox`按钮, 您应该会看到一个盒子掉落并突然弹跳平移向地板。它看起来不太正常。
我们忘记了一件重要的事情：我们的网格没有旋转。这里发生的事情应该是盒子在地板上弹跳起来并倒向一边。但我们所能看到的只是盒子跳起来并一直立着移动了起来（很怪异），因为 Three.js[网格不像 Cannon.js](https://threejs.org/docs/#api/en/objects/Mesh)[主体](http://schteppe.github.io/cannon.js/docs/classes/Body.html)那样可以进行旋转，所以立方体就一直立着运动了。
我们之前没有看到这个问题，因为我们使用的是球体，无论我们是否旋转它们，它们落地后的物理表现看起来都一样（其实他们都不会旋转，这不正确）。
我们可以通过将[Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html) `quaternion`复制到[Mesh](https://threejs.org/docs/#api/en/objects/Mesh) `quaternion`来解决这个问题，就像我们复制`position`时一样:

```javascript
const tick = () =>
{
    // ...

    for(const object of objectsToUpdate)
    {
        object.mesh.position.copy(object.body.position)
        object.mesh.quaternion.copy(object.body.quaternion)
    }

    // ...
}
```
![tutieshi_640x400_2s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685512448583-d5b1d4f2-922c-404b-8dc6-481dd9603841.gif#averageHue=%23343332&clientId=u05a8914d-8ced-4&from=drop&id=u84d3a2a3&originHeight=400&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=536978&status=done&style=none&taskId=ua0ee3045-6a8a-4f95-852d-a777724899a&title=)
箱子现在应该会在落地后倒下了！您可以根据需要创建球体和盒子。一如既往，尽量不要烧毁你的电脑显卡。
![tutieshi_640x400_9s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685512483552-b283a355-4e45-4355-b17b-53c90cd95180.gif#averageHue=%23363534&clientId=u05a8914d-8ced-4&from=drop&id=uf8b13532&originHeight=400&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1121721&status=done&style=none&taskId=u9a7d5f0d-5081-4f47-a5bb-a36029eb591&title=)
## 性能 [Performance](https://threejs-journey.com/lessons/physics#)
### 广相 broadphase
在测试对象之间的碰撞时，一种天真的方法是测试每个[Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)与其他每个[Body 的](http://schteppe.github.io/cannon.js/docs/classes/Body.html)对比。虽然这很容易做到，但在性能方面代价高昂。
这就是 broadphase 出现的地方。broadphase在测试之前对[身体进行粗略的分类。](http://schteppe.github.io/cannon.js/docs/classes/Body.html)想象一下，两堆箱子彼此远离。你为什么要用一堆的盒子和另一堆的盒子进行测试？它们相距太远，不会发生碰撞。
Cannon.js 中有 3 种 broadphase 算法可用：

- [NaiveBroadphase](http://schteppe.github.io/cannon.js/docs/classes/NaiveBroadphase.html) : 测试每一个[身体](http://schteppe.github.io/cannon.js/docs/classes/Body.html)对抗每一个其他[身体](http://schteppe.github.io/cannon.js/docs/classes/Body.html)
- [GridBroadphase](http://schteppe.github.io/cannon.js/docs/classes/GridBroadphase.html) : Quadrilles the world 并且仅在同一个网格框或邻居的网格框中针对其他[主体测试](http://schteppe.github.io/cannon.js/docs/classes/Body.html)[主体。](http://schteppe.github.io/cannon.js/docs/classes/Body.html)
- [SAPBroadphase](http://schteppe.github.io/cannon.js/docs/classes/SAPBroadphase.html)（broadphase 扫描和修剪 ）：在多个步骤中测试任意轴上的[主体。](http://schteppe.github.io/cannon.js/docs/classes/Body.html)

broadphase 默认的算法 是[NaiveBroadphase](http://schteppe.github.io/cannon.js/docs/classes/NaiveBroadphase.html)，我建议你切换到[SAPBroadphase](http://schteppe.github.io/cannon.js/docs/classes/SAPBroadphase.html)。使用这个 broadphase 可能会产生物体不发生碰撞的错误行为，但这种情况很少见，并且它涉及到做一些事情，比如非常快速地移动[物体](http://schteppe.github.io/cannon.js/docs/classes/Body.html)时导致不发生碰撞。
要切换到[SAPBroadphase](http://schteppe.github.io/cannon.js/docs/classes/SAPBroadphase.html)，只需在属性中对其进行实例化`world.broadphase`，并使用相同的世界作为参数：

```javascript
world.broadphase = new CANNON.SAPBroadphase(world)
```
### 休眠 Sleep
就算我们使用改进的 broadphase 算法，我们所有的[身体](http://schteppe.github.io/cannon.js/docs/classes/Body.html)还是都会被物理测试浪费了性能。那些不再移动的身体，我们可以使用`sleep`称为睡眠的功能。
当[Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)速度变得非常慢时（在您看不到它移动的点），Body[可能](http://schteppe.github.io/cannon.js/docs/classes/Body.html)会休眠并且不会被测试，除非通过代码对其施加足够的力或者如果另一个[Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)击中它。
要激活此功能，只需将`[World](http://schteppe.github.io/cannon.js/docs/classes/World.html).allowSleep`属性设置为true ：

```javascript
world.allowSleep = true
```

您还可以使用`sleepSpeedLimit`和`sleepTimeLimit`属性控制[Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)入睡的范围，但我们这节课不会更改这些。
## 事件
[您可以在Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)上收听事件。如果你想做一些事情，比如在物体碰撞时播放声音，或者如果你想知道子弹发射是否碰到了敌人，这会很有用。
您可以收听[Body](http://schteppe.github.io/cannon.js/docs/classes/Body.html)上的事件，例如`'colide'`,`'sleep'`或`'wakeup'`。
当我们的球体和盒子与任何物体发生碰撞时，让我们播放撞击声。首先，在原生 JavaScript 中创建声音并创建一个播放声音的函数。
某些浏览器（如 Chrome）会阻止播放声音，除非用户与页面进行了交互（例如单击任何地方），因此如果您没有听到第一个声音，请不要担心。

```javascript
/**
 * Sounds
 */
const hitSound = new Audio('/sounds/hit.mp3')

const playHitSound = () =>
{
    hitSound.play()
}
```

只是播放声音有点牵强，但我们稍后会为该功能添加更多内容。
现在，让我们来听听`'collide'`关于[Bodies](http://schteppe.github.io/cannon.js/docs/classes/Body.html)的事件。我们将只关注`createBox`函数，并在完成后将其添加到`createSphere`函数中。
现在，监听碰撞事件并使用该`playHitSound`函数作为回调：

```javascript
const createBox = (width, height, depth, position) =>
{
    // ...

    body.addEventListener('collide', playHitSound)

    // ...
}
```

当立方体接触地面或立方体碰撞时，您应该会听到撞击声。如果您使用的是 Chrome，请不要忘记在框落地之前点击页面，因为如果尚未发生用户交互，Chrome 会拒绝播放声音。
声音似乎还不错。不幸的是，当我们添加多个框时，事情变得非常奇怪，那个声音像是犯病了一样一直哒哒哒哒。
第一个问题是，当我们在调用`hitSound.play()`播放声音时，没有任何反应，因为它已经在播放了。我们可以通过将声音`currentTime`重置为属性来解决这个0问题：

```javascript
const playHitSound = () =>
{
    hitSound.currentTime = 0
    hitSound.play()
}
```

虽然这在物体掉落开始时比较好，但即使一个立方体轻微接触另一个立方体，我们也会听到太多的撞击声。我们需要知道影响力有多强，如果不够强，我们就什么都不播放才行。
要获得冲击强度，我们首先需要获得有关碰撞的信息。我们可以通过向`'collide'`回调（这是我们的playHitSound函数）添加一个参数来做到这一点：

```javascript
const playHitSound = (collision) =>
{
    console.log(collision)

    // ...
}
```

该`collision`变量现在包含大量碰撞信息。可以通过调用属性`getImpactVelocityAlongNormal()`上的方法来找到冲击强度`contact`：

```javascript
const playHitSound = (collision) =>
{
    console.log(collision.contact.getImpactVelocityAlongNormal())
    
    // ...
}
```

如果您查看日志，您应该会看到一个数字。冲击力越强，数值越高。
我们测试`impactStrength`该值并仅在足够强的情况下播放声音：

```javascript
const playHitSound = (collision) =>
{
    const impactStrength = collision.contact.getImpactVelocityAlongNormal()

    if(impactStrength > 1.5)
    {
        hitSound.currentTime = 0
        hitSound.play()
    }
}
```

为了更加真实，我们可以为音量添加一些随机性：

```javascript
const playHitSound = (collision) =>
{
    const impactStrength = collision.contact.getImpactVelocityAlongNormal()

    if(impactStrength > 1.5)
    {
        hitSound.volume = Math.random()
        hitSound.currentTime = 0
        hitSound.play()
    }
}
```

如果我们想更加完善这个功能，我们可以有多个略有不同的击打声音。为了防止同时播放太多声音，我们可以添加一个非常短的延迟，使声音在播放一次后无法再次播放。
我们不会在本课中做这些，但请随意尝试。
让我们将`createBox`函数中使用的代码复制到`createSphere`函数中：

```javascript
const createSphere = (radius, position) =>
{
    // ...

    body.addEventListener('collide', playHitSound)

    // ...
}
```
## 移除物体 [Remove things](https://threejs-journey.com/lessons/physics#)

让我们添加一个`reset`按钮。
创建一个`reset`函数并将其添加到您的 Dat.GUI 中，就像我们对`createBox`和 `createSphere` 所做的那样：

```javascript
// Reset
debugObject.reset = () =>
{
    console.log('reset')
}
gui.add(debugObject, 'reset')
```

现在，让我们循环遍历`objectsToUpdate`数组中的每个对象。然后从`object.body` 中删除`world`和从 `object.mesh` 中删除 `scene`。另外，不要忘记像在本机 JavaScript 中那样删除 `eventListener`：

```javascript
debugObject.reset = () =>
{
    for(const object of objectsToUpdate)
    {
        // Remove body
        object.body.removeEventListener('collide', playHitSound)
        world.removeBody(object.body)

        // Remove mesh
        scene.remove(object.mesh)
    }
}
```
![tutieshi_640x400_8s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685516634542-0e7cfa25-087b-4944-839e-bc029e9890c3.gif#averageHue=%23353533&clientId=u05a8914d-8ced-4&from=drop&id=u7a926195&originHeight=400&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2067671&status=done&style=none&taskId=u10774655-fc7c-424e-b738-417d1f771be&title=)
我们还需要清空`objectsToUpdate`数组。在 JS 中有许多清空数组的神奇方法，其中之一是用`splice`方法将其内容替换为空：

```javascript
debugObject.reset = () =>
{
    // ...

    objectsToUpdate.splice(0, objectsToUpdate.length)
}
```

就是这样。您可以单击`reset`按钮删除所有内容。
## 使用 Cannon.js 走得更远
虽然我们介绍了基础知识并且您已经可以做很多事情，但这里有一些需要改进的地方。
### 约束条件
顾名思义，约束可以在两个主体之间启用约束。我们不会在本课中介绍这些内容，但这是约束列表：

- [HingeConstraint](http://schteppe.github.io/cannon.js/docs/classes/HingeConstraint.html)：就像门铰链一样。
- [DistanceConstraint](http://schteppe.github.io/cannon.js/docs/classes/DistanceConstraint.html)：强制物体彼此保持一定距离。
- [LockConstraint](http://schteppe.github.io/cannon.js/docs/classes/LockConstraint.html)：合并实体，就像它们是一件一样。
- [PointToPointConstraint](http://schteppe.github.io/cannon.js/docs/classes/PointToPointConstraint.html)：将主体粘附到特定点。
### 类、方法、属性和事件
**有许多类，每个类都有不同的方法、属性和事件。尝试至少浏览一次所有这些以了解它们的存在。它可能会为您在未来的项目中节省一些时间。**
### 例子
文档并不完美。[如果您花一些时间在演示](https://schteppe.github.io/cannon.js/)和研究中以了解如何开发，将会有所帮助。许多人可能遇到了您可能遇到的问题。不要犹豫，依靠社区。
### 多线程workers
运行物理模拟需要时间。执行这项工作的计算机组件是 CPU。当你运行 Three.js、Cannon.js、你的代码逻辑等时，一切都由你 CPU 中的同一个线程完成。如果有太多事情要做（例如物理模拟中的对象太多），该线程会很快过载，从而导致帧速率下降。
正确的解决方案是使用多线程。Workers 允许您将一部分代码放在不同的线程中以分散负载。然后您可以从该代码发送和接收数据。它可以显著提高性能。
问题是代码必须明显分开防止竞争资源。您可以在页面源代码中[找到](https://schteppe.github.io/cannon.js/examples/worker.html)一个很好的简单示例。
### Cannon-es
正如我们之前所说，Cannon.js 多年未更新。幸运的是，有些人 fork 了存储库并开始进行更新。多亏了他们，我们才能访问更好且维护得更好的 Cannon.js 版本：

- Git 存储库： https: [//github.com/pmndrs/cannon-es](https://github.com/pmndrs/cannon-es)
- NPM 页面：[https://www.npmjs.com/package/cannon-es](https://www.npmjs.com/package/cannon-es)

要使用此版本而不是原始版本，请在项目文件夹中打开终端（或关闭服务器），删除之前的 cannon.js 依赖项`npm uninstall --save cannon`。
至于`cannon-es`，您可以安装最新版本并`npm install --save cannon-es`更改您在代码中导入 Cannon.js 的方式：

```javascript
import * as CANNON from 'cannon-es'
```
一切都应该像以前一样工作。[您可以在Git 存储库页面](https://github.com/react-spring/cannon-es)上查看版本改动。
最新版本应该可以作为直接替代品，但如果出现错误，您可以使用更具体的版本，如（0.20测试过的）通过运行`npm install --save cannon-es@0.20`.
## Ammo.js
我们使用 Cannon.js 是因为该库易于实施和理解。它最大的竞争对手之一是 Ammo.js。虽然在您的项目中更难使用和实施，但您可能会对以下功能感兴趣：

- 它是 Bullet 的一个移植版，Bullet 是一个众所周知且运行良好的物理引擎，用 C++ 编写。
- 它具有 WebAssembly (wasm) 支持。WebAssembly 是大多数最新浏览器都支持的低级语言。因为它是低级别的，所以它具有更好的性能。
- 它更受欢迎，您可以找到更多 Three.js 的示例。
- 它支持更多功能。

如果您需要最佳性能或在您的项目中具有特定功能，您可能应该选择 Ammo.js 而不是 Cannon.js。
## Physijs
Physijs 简化了 Three.js 项目中物理的实现。它使用 Ammo.js 并原生支持 workers。

- 网站： https: [//chandlerprall.github.io/Physijs/](https://chandlerprall.github.io/Physijs/)
- Git 存储库：[https://github.com/chandlerprall/Physijs](https://github.com/chandlerprall/Physijs)
- 文档： https: [//github.com/chandlerprall/Physijs/wiki](https://github.com/chandlerprall/Physijs/wiki)

您无需创建 Three.js 对象和物理对象，而是同时创建两者即可：

```javascript
box = new Physijs.BoxMesh(
    new THREE.CubeGeometry(5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0x888888 })
)
scene.add(box)
```

Physijs 会处理剩下的事情。
虽然它很吸引人，尤其是对于初学者来说，但当您尝试做该库不支持的事情时，事情就会变得复杂。查找错误的来源也可能很麻烦，因为封装过头了。
就像 Ammo.js 一样，花点时间想想用哪个物理库是您项目的最佳解决方案。

# 22. Imported Models导入模型
## 介绍
Three.js 可以让你创建很多原始几何体，但是当涉及到更复杂的形状时，我们最好使用专用的 3D 软件建模。
在本课中，我们将使用已经制作好的模型，但我们将在以后的课程中学习如何完全在 3D 软件中创建模型。
## 格式
随着时间的推移，已经出现了许多 3D 模型格式。每个3D格式都在给予大家解决方案，比如模型中嵌入了什么数据、权重、压缩、兼容性、版权等。
这就是为什么今天我们可以访问数百种模型格式：[https://en.wikipedia.org/wiki/List_of_file_formats#3D_graphics](https://en.wikipedia.org/wiki/List_of_file_formats#3D_graphics)。
有些3D格式专用于一种软件。一些已知非常轻，但有时缺乏具体数据。众所周知，有些存储库几乎包含您可能需要的所有数据，但它们很重。有些格式是开源的，有些格式不是，有些是二进制的，有些是 ASCII，等等。
如果您需要精确的数据并且找不到您的软件支持的适当格式，您甚至可以很容易地创建自己的格式。
以下是您可能会遇到的流行格式列表：

- OBJ
- FBX
- STL
- PLY
- COLLADA
- 3DS
- GLTF

我们不会涵盖所有这些格式。这会很无聊，我们不需要这样做，因为已经有一种格式正在成为一种标准，应该可以满足您的大部分需求。
## GLTF
GLTF 代表 GL 传输格式。它由 Khronos Group（OpenGL、WebGL、Vulkan、Collada 背后的人以及许多成员，如 AMD / ATI、Nvidia、Apple、id Software、Google、Nintendo 等）制作。
GLTF 在过去几年变得非常流行。
它支持不同的数据集。它可以包括几何体和材质等数据，也可以包括相机、灯光、场景图、动画、骨架、变形甚至多场景等数据。
它还支持各种文件格式，如 json、binary、embed textures。
GLTF 已成为实时标准。由于它正在成为一种标准，大多数 3D 软件、游戏引擎和库都要支持它。这意味着您可以在不同的环境中轻松获得相似的结果。
这并不意味着您必须在所有情况下都使用 GLTF。如果您只需要一个几何图形，您最好使用其他格式，如 OBJ、FBX、STL 或 PLY。你应该在每个项目上测试不同的格式，看看你是否拥有你需要的所有数据，文件是否太大，如果信息被压缩需要多长时间才能解压等等。
## 查找模型
首先，我们需要一个模型。正如我们之前所说，稍后我们将学习如何在 3D 软件中创建我们自己的模型，但现在，让我们使用预制模型。
GLTF 团队还提供各种模型，从简单的三角形到逼真的模型以及动画、变形、透明涂层材料等。
您可以在此存储库中找到它们：[https://github.com/KhronosGroup/glTF-Sample-Models](https://github.com/KhronosGroup/glTF-Sample-Models)
如果你想测试这些模型，你必须下载或克隆整个存储库并获取你需要的文件。[但我们将从一只简单的鸭子](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/Duck)开始，您可以在`/static/models/`启动器的文件夹中找到它。
## GLTF格式
虽然 GLTF 本身是一种格式，但它也可以有不同的文件格式。这有点复杂，但有充分的理由。
如果您打开该`/static/models/Duck/`文件夹，您将看到 4 个不同的文件夹。每个都包含鸭子，但 GLTF 格式不同：

- glTF
- glTF-Binary
- glTF-Draco
- glTF-Embedded

你甚至可以找到其他格式，但这 4 种是最重要的，涵盖了我们需要学习的内容。
当心; 您的操作系统可能会隐藏其中一些文件的扩展名。请参考代码编辑器中应显示扩展名的文件名。
### glTF
这种格式是一种默认格式。该`Duck.gltf`文件是一个 JSON格式，您可以在编辑器中打开它。它包含各种信息，如相机、灯光、场景、材质、对象转换，但既不包含几何体也不包含纹理。该`Duck0.bin`文件是二进制文件，您无法打开阅读。它通常包含几何数据和与顶点相关的所有信息，如 UV 坐标、法线、顶点颜色等。`DuckCM.png`文件只是鸭子的纹理。
当我们加载这种格式时，我们只要加载`Duck.gltf`包含对其他文件的引用的文件，这些文件将被自动加载。
### glTF-Binary
这种格式仅由一个文件组成。它包含我们在 glTF 默认格式中讨论的所有数据。那是一个二进制文件，您不能只在代码编辑器中打开它来查看里面的内容。
由于只有一个文件，因此这种格式可以更轻便且加载起来更舒适，但您将无法轻松更改其数据。例如，如果你想调整纹理大小或压缩纹理，你不能因为它在那个二进制文件中而与其他文件合并。
### glTF-Draco
这种格式类似于**glTF 默认**格式，但缓冲区数据（通常是几何图形）是使用[Draco 算法](https://github.com/google/draco)压缩的。如果比较`.bin`文件大小，您会发现它要轻得多。
虽然此格式有一个单独的文件夹，但您可以将 Draco 压缩应用于其他格式。
这个先放一边，以后再说。
### glTF-Embedded
这种格式类似于**glTF-Binary**格式，因为它只有一个文件，但这个文件实际上是一个 JSON，您可以在编辑器中打开它。
这种格式的唯一好处是只有一个易于编辑的文件。
### 选择
选择正确的格式取决于您希望如何处理资源。
如果你想在导出后能够改变纹理或灯光的坐标，你最好选择`glTF-default`。它还具有分别加载不同文件的优势，从而提高了加载速度。
如果每个模型只需要一个文件并且不关心要不要修改资源，则最好选择`glTF-Binary`。
在这两种情况下，您都必须决定是否要使用`Draco`压缩，但我们稍后会介绍这一部分。
## 设置
启动器由一个空平面组成。
因为 GLTF 是一个标准，它显然支持灯光。通常，当您将 GLTF 导入 Three.js 项目时，您最终会得到具有[MeshStandardMaterial的](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)[网格](https://threejs.org/docs/#api/en/objects/Mesh)，您可能还记得，如果您的场景中没有灯光，您将看不到太多这些材料。
启动器中已经有一个[AmbientLight](https://threejs.org/docs/#api/en/lights/AmbientLight)和一个[DirectionalLight 。](https://threejs.org/docs/#api/en/lights/DirectionalLight)
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685518859987-74e7db8c-a4d6-450f-ac30-638089ccf6f4.png#averageHue=%23353535&clientId=u27185b89-d41c-4&from=paste&id=uad311af9&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ubed126cf-1b70-4e9f-badf-5f29b901d66&title=)
## 在 Three.js 中加载模型
要在 Three.js 中加载 GLTF 文件，我们必须使用[GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)。此类在`THREE`变量中默认不可用。我们需要从`three`位于`examples/`依赖项中的文件夹中导入它：

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
```

然后我们可以像为 TextureLoader 一样实例化[它](https://threejs.org/docs/index.html#api/en/loaders/TextureLoader)：

```javascript
/**
 * Models
 */
const gltfLoader = new GLTFLoader()
```

如果需要，我们也可以像在纹理课程中那样使用[LoadingManager](https://threejs.org/docs/#api/en/loaders/managers/LoadingManager)。
要加载模型，好消息，它几乎和加载纹理一样简单。我们调用该`load(...)`方法并使用正确的参数：

- 文件的路径
- 成功回调函数
- 进度回调函数
- 错误回调函数

```javascript
gltfLoader.load(
    '/models/Duck/glTF/Duck.gltf',
    (gltf) =>
    {
        console.log('success')
        console.log(gltf)
    },
    (progress) =>
    {
        console.log('progress')
        console.log(progress)
    },
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
)
```

您应该看到进度和正在调用的成功函数。如果无法加载文件，可能会调用错误函数。检查路径，不要忘记我们不能添加路径是`/static`的部分。

```javascript
gltfLoader.load(
    '/models/Duck/glTF/Duck.gltf',
    (gltf) =>
    {
        console.log(gltf)
    }
)
```

## 将加载的模型添加到我们的场景中
如果查看控制台中记录的对象，您会发现很多元素。最重要的部分是`scene`属性，因为我们在导出的模型中只有一个场景。
这`scene`包含了我们需要的一切。但它还包括更多。始终从研究其中可用的内容开始，并观察不同[Groups](https://threejs.org/docs/#api/en/objects/Group)、[Object3D](https://threejs.org/docs/#api/en/core/Object3D)和[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)的`scale`缩放属性。
我们得到这样的东西：

```javascript
THREE.Group: scene
└───Array: children
    └───THREE.Object3D
        └───Array: children
            ├───THREE.PerspectiveCamera
            └───THREE.Mesh
```

`mesh`网格应该是我们的鸭子。我们并不真正关心[PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)。相机和鸭子似乎都在场景的子数组中的第一个也是唯一一个[Object3D中。](https://threejs.org/docs/#api/en/core/Object3D)更糟糕的是，[Object3D](https://threejs.org/docs/#api/en/core/Object3D)已将`scale`设置为最小值。
正如您所看到的，即使是获取我们的鸭子也有点复杂，这是大多数初学者迷路的地方。
我们想要的只是让我们的鸭子出现在场景中。我们有多种方法可以做到这一点：

- 将整体添加到我们的`scene`场景中。我们可以这样做，因为即使它的名字是`scene`，它实际上是一个[Group](https://threejs.org/docs/#api/en/objects/Group)。
- 将 `scene`的子项添加到我们的场景中并忽略未使用的[PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)。
- 在添加到场景之前过滤子项以删除不需要的对象，如[PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)。
- 仅添加[网格](https://threejs.org/docs/#api/en/objects/Mesh)，但最终得到的鸭子可能会被错误地缩放、定位或旋转。
- 在 3D 软件中打开文件并删除[PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)，然后再次导出GITF文件。

因为我们的模型结构简单，我们将Object3D添加[到](https://threejs.org/docs/#api/en/core/Object3D)我们的场景中，而忽略里面未使用的[PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)。在以后的课程中，我们会将整个场景添加为一个对象：

```javascript
gltfLoader.load(
    '/models/Duck/glTF/Duck.gltf',
    (gltf) =>
    {
        scene.add(gltf.scene.children[0])
    }
)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685518860071-158e7d6a-2c6a-4db0-9088-362a903ae1d6.png#averageHue=%233c3831&clientId=u27185b89-d41c-4&from=paste&id=ub1c72004&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u059b1931-68a6-442d-aa41-6c808bb07df&title=)
你应该看到渲染了一只鸭子。
您可以尝试其他格式，但不能尝试尚不能使用的 `Draco`：

```javascript
gltfLoader.load(
    '/models/Duck/glTF/Duck.gltf', // Default glTF

// Or
gltfLoader.load(
    '/models/Duck/glTF-Binary/Duck.glb', // glTF-Binary

// Or
gltfLoader.load(
    '/models/Duck/glTF-Embedded/Duck.gltf', // glTF-Embedded
```

文件夹中提供了另一个名为`FlightHelmet`（也取自[glTF 模型示例](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0)/static/models/）的模型。该模型只有一种格式，即默认的 glTF。
尝试加载此模型：

```javascript
gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) =>
    {
        scene.add(gltf.scene.children[0])
    }
)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685518860046-f8e0badd-5406-44de-b13e-671b05ac0cc4.png#averageHue=%23353535&clientId=u27185b89-d41c-4&from=paste&id=udcaa17c6&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ubdd2280e-aa2d-4a67-b658-2d963dd57a3&title=)
我们没有得到漂亮的头盔，只渲染了几个零件。
问题是我们只将 loaded 的第一个child添加到我们的`scene`场景中。
我们可以尝试的是循环孩子并将他们添加到场景中：

```javascript
for(const child of gltf.scene.children)
{
    scene.add(child)
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685518860031-5d777adb-1632-4dca-a5c7-8987c81f2a04.png#averageHue=%23353535&clientId=u27185b89-d41c-4&from=paste&id=ud9e0ee49&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u9f02fcee-e256-4e6e-a18e-30e92dca9a4&title=)
这将产生更多元素，但不是全部。更糟糕的是，刷新时，您可能会得到不同的部分。
问题是当我们将一个child从一个场景添加到另一个场景时，它会自动从第一个场景中删除。这意味着现在第一个场景中的child更少了。
当我们添加第一个对象时，它会从第一个场景中移除，而第二个元素只是移动到第一个位置。但是您的循环现在采用数组的第二个元素。您将始终在`children`数组中保留元素。
这个问题有多种解决方案。第一个解决方案是获取已加载场景的第一个子节点并将其添加到我们的场景中，直到没有剩余为止：

```javascript
while(gltf.scene.children.length)
{
    scene.add(gltf.scene.children[0])
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685518860008-1cca9a7c-13ca-4789-a09d-d7bcb5d7bacc.png#averageHue=%23353535&clientId=u27185b89-d41c-4&from=paste&id=u364e1b65&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u9d22fa20-96de-47c3-a088-085cb581dd4&title=)
我们现在得到了整个头盔。
另一种解决方案是复制`children`数组以获得一个未更改的独立数组。为此，我们可以使用扩展运算符`...`并将结果放入一个全新的数组中[]：

```javascript
const children = [...gltf.scene.children]
for(const child of children)
{
    scene.add(child)
}
```

这是一种原生 JavaScript 技术，可以在不触及原始数组的情况下复制数组。
最后，我们之前提到的一个简单好用的解决方案是添加属性`scene`：

```javascript
scene.add(gltf.scene)
```

我们的头盔太小了，我们只能增加比例，但我们会回到我们的 Duck 并尝试使用 Draco 压缩版本。
## Draco compression 压缩
让我们回到我们的鸭子，但这一次，我们将使用 Draco 版本：

```javascript
gltfLoader.load(
    '/models/Duck/glTF-Draco/Duck.gltf',
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685518861844-0aae90fb-413a-4e58-8cf6-8df85db9ec51.png#averageHue=%23353535&clientId=u27185b89-d41c-4&from=paste&id=uc9b23851&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u519b03de-1de7-4250-ac04-6b7c11c63e2&title=)
可悲的是，我们没有得到任何鸭子。如果您查看日志，您应该会看到如下所示的警告`No DRACOLoader instance provided`。我们需要为我们的[GLTFLoader提供一个](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)[DRACOLoader](https://threejs.org/docs/#examples/en/loaders/DRACOLoader)实例，以便它可以加载压缩文件。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685523180963-68f20f52-e792-43a8-a118-dca3aee308d5.png#averageHue=%23e7ba2a&clientId=u4621e0b7-5761-4&from=paste&height=137&id=u146c760d&originHeight=273&originWidth=841&originalType=binary&ratio=2&rotation=0&showTitle=false&size=51531&status=done&style=none&taskId=u51ab8d67-ac71-456e-8200-219fca9c999&title=&width=420.5)
正如我们在浏览文件时看到的，Draco 版本比默认版本要轻得多。压缩应用于缓冲区数据（通常是几何图形）。使用默认的 glTF、二进制 glTF或嵌入式 glTF并不重要。
它甚至不是 glTF 独有的，您可以将它与其他格式一起使用。但是 glTF 和 Draco 同时流行起来，所以 glTF 导出器的实现速度更快。
谷歌在开源 Apache 许可下开发算法：

- 网站： https: [//google.github.io/draco/](https://google.github.io/draco/)
- Git 存储库： https: [//github.com/google/draco](https://github.com/google/draco)
### 添加 DRACOLoader
Three.js 已经支持 Draco。我们必须从[DRACOLoader](https://threejs.org/docs/#examples/en/loaders/DRACOLoader)导入开始：

```javascript
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
```

然后我们可以实例化加载器（在 `gltfLoader` 之前）：

```javascript
const dracoLoader = new DRACOLoader()
```

解码器在原生 JavaScript 和 Web Assembly (wasm) 中可用，并且它可以在 worker 中运行（我们在物理课结束时看到的另一个线程）。这两个功能显著提高了性能，但它们意味着具有完全独立的代码。
Three.js 已经提供了这个分离的代码。要找到它，我们必须浏览到 Three.js 依赖项并将 Draco 解码器文件夹复制到我们的`/static/`文件夹中。
这个 Draco 文件夹位于`/node_modules/three/examples/js/libs/`. 获取整个`/draco/`文件夹并将其复制到您的`/static/`文件夹中。我们现在可以将此文件夹的路径提供给我们的`dracoLoader`：

```javascript
dracoLoader.setDecoderPath('/draco/')
```

最后，我们可以使用`setDRACOLoader(...)`方法将[DRACOLoader](https://threejs.org/docs/#examples/en/loaders/DRACOLoader)实例提供给[GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)实例：

```javascript
gltfLoader.setDRACOLoader(dracoLoader)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685518862986-ac3db3a9-2a00-49de-9e1c-3dc6128e21db.png#averageHue=%233c3831&clientId=u27185b89-d41c-4&from=paste&id=uebf2dded&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u4d53cdca-ea9c-4634-83b3-4da3aaa31a8&title=)
你的鸭子应该回来了，但这次是 Draco 压缩版本。
[您仍然可以使用GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)加载未压缩的 glTF 文件，并且仅在需要时加载 Draco 解码器。
### 何时使用 Draco 压缩
虽然您可能认为 Draco 压缩是一个双赢的局面，但事实并非如此。是的，几何体更轻，但首先，您必须加载[DRACOLoader](https://threejs.org/docs/#examples/en/loaders/DRACOLoader)类和解码器。其次，您的计算机需要花费时间和资源来解码压缩文件，这可能会导致体验开始时出现短暂的卡顿，即使我们使用的是 worker 和 Web Assembly 代码也是如此。
你必须适应并决定什么是最好的解决方案。如果你只有一个 100kB 几何模型，你可能不需要 Draco。但是，如果您有很大 MB 的模型要加载并且不关心用户体验开始时要进行一些等待，您可能需要 Draco 压缩。
## 动画 
正如我们之前所说，glTF 也支持动画。Three.js 可以处理这些动画。
### 加载动画模型
首先，我们需要一个动画模型。我们可以使用位于文件夹中的狐狸`/static/models/Fox/`（也取自[glTF 模型示例](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/Fox)）。
更改加载该狐狸的路径：

```javascript
gltfLoader.load(
    '/models/Fox/glTF/Fox.gltf',
```
![tutieshi_640x400_5s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685524738225-a1cf473e-2ff3-4c86-be90-a7cbbb8e480b.gif#averageHue=%23303030&clientId=u4621e0b7-5761-4&from=drop&id=ue49ba74f&originHeight=400&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=633989&status=done&style=none&taskId=ud1383e32-14ff-4b1f-a09f-af3d519034d&title=)
我们渲染出现了问题; 狐狸太大了。如果您看不到它，请查看上方或缩小。
在处理动画之前，让我们修复比例。如果您查看导入场景的组成，狐狸由一个[Object3D](https://threejs.org/docs/#api/en/core/Object3D)组成，它本身由一个[Bone](https://threejs.org/docs/#api/en/objects/Bone)和一个[SkinnedMesh](https://threejs.org/docs/#api/en/objects/SkinnedMesh)组成。我不会解释它们是什么，但是我们不应该简单地缩放[Object3D](https://threejs.org/docs/#api/en/core/Object3D)就解决问题了。即使现在可以用缩放解决，但是它可能不适用于更复杂的模型。
我们在这里可以做的是缩放加载的场景并将其直接添加到我们的场景中：

```javascript
gltfLoader.load(
    '/models/Fox/glTF/Fox.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(0.025, 0.025, 0.025)
        scene.add(gltf.scene)
    }
)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685518863363-af4d5008-d223-4087-be02-8cd2e3b37616.png#averageHue=%233d3633&clientId=u27185b89-d41c-4&from=paste&id=u22d9835a&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u7ae4c352-0bcf-498b-8abb-babf7dd369f&title=)
### 处理动画
如果查看加载的对象，您会看到一个名为`gltf`包含多个[AnimationClip 的](https://threejs.org/docs/#api/en/animation/AnimationClip)`animations`属性。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685524963526-88e52cef-c796-4560-a915-8e53da16de06.png#averageHue=%23eee8ec&clientId=u4621e0b7-5761-4&from=paste&height=124&id=ue5e32f39&originHeight=248&originWidth=541&originalType=binary&ratio=2&rotation=0&showTitle=false&size=69118&status=done&style=none&taskId=u67447764-3c2e-4d03-9058-6e05d35459e&title=&width=270.5)
这些[AnimationClip](https://threejs.org/docs/#api/en/animation/AnimationClip)不能轻易使用。我们首先需要创建一个[AnimationMixer](https://threejs.org/docs/#api/en/animation/AnimationMixer)。[AnimationMixer](https://threejs.org/docs/#api/en/animation/AnimationMixer)就像一个可以包含一个或多个[AnimationClips 的](https://threejs.org/docs/#api/en/animation/AnimationClip)对象相关联的播放器。这个想法是为每个需要动画的对象创建一个。
在 success 函数中，创建一个`AnimationMixer`混音器并发送`gltf.sceneas` 参数：

```javascript
const mixer = new THREE.AnimationMixer(gltf.scene)
```

我们现在可以使用`clipAction(...)`该方法将[AnimationClip](https://threejs.org/docs/#api/en/animation/AnimationClip)添加到混合器中。让我们从第一个动画开始：

```javascript
const action = mixer.clipAction(gltf.animations[0])
```

这个方法返回一个[AnimationAction](https://threejs.org/docs/#api/en/animation/AnimationAction)，我们终于可以调用`play()`它的方法了：

```javascript
action.play()
```

遗憾的是，还是没有动画。
要播放动画，我们必须告诉混音器在每一帧更新自己。问题是我们的`mixer`变量已经在加载回调函数中声明了，我们在函数中无权访问它tick。为了解决这个问题，我们可以在加载回调函数之外声明一个`mixer = null`值的变量，并在加载模型时更新它：

```javascript
let mixer = null

gltfLoader.load(
    '/models/Fox/glTF/Fox.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(0.03, 0.03, 0.03)
        scene.add(gltf.scene)

        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[0])
        action.play()
    }
)
```

最后，我们可以用已经计算好的`deltaTime` 更新`tick`函数中的混音器。
但在更新它之前，我们必须测试`mixer`变量是否与`null`不同。这样，如果模型已加载，我们不会更新混音器，这意味着动画尚未准备好：

```javascript
const tick = () =>
{
    // ...

    if(mixer)
    {
        mixer.update(deltaTime)
    }

    // ...
}
```
![tutieshi_640x400_6s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685525325793-d6cb70cb-b784-4e39-9c1a-467d37c3ec2c.gif#averageHue=%23352f2d&clientId=u4621e0b7-5761-4&from=drop&id=u5e4eb76d&originHeight=400&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=535172&status=done&style=none&taskId=ua799bc89-5c5e-4239-8e24-27f0bbe67fb&title=)
动画应该正在运行。您可以通过更改`clipAction(...)`方法中的值来测试其他动画。

```javascript
const action = mixer.clipAction(gltf.animations[2])
```
![tutieshi_640x400_4s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1685525412716-f7b40707-3bc9-486d-8982-a13e9fd894f0.gif#averageHue=%2335302d&clientId=u4621e0b7-5761-4&from=drop&id=ua8c48b8f&originHeight=400&originWidth=640&originalType=binary&ratio=2&rotation=0&showTitle=false&size=828175&status=done&style=none&taskId=u9293f4da-702a-47b0-95e4-4840fe11788&title=)
## 三.Three.js在线编辑器
Three.js 拥有自己的在线编辑器。你可以在这里找到它： https: [//threejs.org/editor/](https://threejs.org/editor/)
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685518863419-6c3c9d3e-8861-44b5-b5fc-ac10ee421a9e.png#averageHue=%232e2e2e&clientId=u27185b89-d41c-4&from=paste&id=u61e7528b&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ub5275726-045b-421c-a5c8-bb8c49246c4&title=)
它就像一个 3D 软件，但在线且功能较少。您可以创建图元、灯光、材质等。
因为您可以导入模型，所以这是测试您的模型是否正常工作的好方法。虽然要小心; 您只能测试由一个文件组成的模型。您可以尝试使用 glTF-Binary 或 glTF-Embedded 的文件格式。
将模型拖放到编辑器中。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685518863486-8808de26-a9af-4376-bde2-c398e64ef14c.png#averageHue=%232c2c2c&clientId=u27185b89-d41c-4&from=paste&id=u8933e5ba&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ue9baa420-c9b6-4087-8404-cdbcc586a91&title=)
你应该看到一只黑鸭子，因为没有光。从菜单中添加一个`AmbientLight`和一个`DirectionalLight`以更清楚地查看它。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685518864925-151cac31-a45a-4533-b320-d889b0f8f98a.png#averageHue=%2335332d&clientId=u27185b89-d41c-4&from=paste&id=u68d07e9b&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u04c83a32-839c-40aa-89be-9553b9a6044&title=)
最后，您可以以各种格式导出您的场景，您可以在您的代码中重复使用这些格式，但不在我们讨论范围内。
目前就是这样，但我们将在接下来的课程中多次使用加载的模型进行开发。
