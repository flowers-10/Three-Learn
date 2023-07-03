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
## Three.js在线编辑器
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


# 23. Raycaster and Mouse Events 投射射线（碰撞检测）和鼠标事件
## 介绍
顾名思义，Raycaster 可以向特定方向投射（或发射）一条射线，并测试与它相交的对象。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685525987810-f13077c7-1006-4a89-bc42-da0a2e60eb64.png#averageHue=%23dad4cd&clientId=ud410ab0d-566e-4&from=paste&id=ucc73ca41&originHeight=1080&originWidth=1920&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u84b4479c-fef4-451b-becb-74e22c4570f&title=)
您可以使用该技术来检测玩家前面是否有墙，测试激光枪是否击中了什么东西，测试当前鼠标下方是否有东西来模拟鼠标事件，以及许多其他事情。
## 设置 
在我们的启动器中，我们有 3 个红色球体，我们将射出一条光线，看看这些球体是否相交。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685525988490-028356a3-7aa1-4ea2-a648-0d6a40309f2f.png#averageHue=%23140000&clientId=ud410ab0d-566e-4&from=paste&id=u58ab27dd&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u3b554f5b-6ebf-49e5-9d83-42b0153b5e9&title=)
## 创建光线投射器
实例化一个[Raycaster](https://threejs.org/docs/index.html#api/en/core/Raycaster)：

```javascript
/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()
```

要改变光线投射的位置和方向，我们可以使用` set(...)`方法。第一个参数是`position`，第二个参数是`direction`。它需要两个向量作为参数：一个是起点位置，另一个是方向。
两者都是[Vector3](https://threejs.org/docs/index.html#api/en/math/Vector3)，但`direction`必须进行归一化。归一化向量的长度为`1`. 别担心，你不必自己做数学运算，你可以调用`normalize()`向量上的方法：

```javascript
const rayOrigin = new THREE.Vector3(- 3, 0, 0)
const rayDirection = new THREE.Vector3(10, 0, 0)
rayDirection.normalize()

raycaster.set(rayOrigin, rayDirection)
```
在这个例子中，起点位置是(-3, 0, 0)，方向是(10, 0, 0)，我们通过normalize()方法将方向向量归一化处理，使其长度为1，表示这是一个单位向量。
然后将起点位置和方向向量设置为射线的起点和方向，最后使用raycaster.set()方法将它们传递给Raycaster对象。这个射线可以用于碰撞检测或者其他的渲染相关工作。
在这里，光线位置应该从我们场景的左侧开始，方向似乎向右。我们的光线应该穿过所有球体。

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685525987842-a053e94e-46a4-4ed4-92bf-a27d2ee27d69.png#averageHue=%23150100&clientId=ud410ab0d-566e-4&from=paste&id=uc48a5d3f&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u476191b5-8374-4fc8-a0f7-80fa755d7e1&title=)
## 投射光线
要投射光线并获得相交的对象，我们可以使用两种方法，`intersectObject(...)`（单数）和`intersectObjects(...)`（复数）。
`intersectObject(...)`将测试一个对象并将`intersectObjects(...)`测试一组对象：

```javascript
const intersect = raycaster.intersectObject(object2)
console.log(intersect)

const intersects = raycaster.intersectObjects([object1, object2, object3])
console.log(intersects)
```

如果您查看日志，您会看到`intersectObject(...)`返回了一个包含一个对象的数组（可能是第二个球体）并且 `intersectObjects(...)`返回了一个包含三个对象的数组（可能是 3 个球体的集合）。
## 交集的结果 
`raycaster.intersectObject`交集的结果始终是一个数组，即使您只测试了一个对象。那是因为一条光线可以多次穿过同一个物体。想象一个甜甜圈。光线将穿过环的第一部分，然后穿过中间的孔，然后再次穿过环的第二部分，这样交集的结果就是2个对象了。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685525988468-65a53dc8-be03-4b5a-a0f2-5b736c3a0b90.png#averageHue=%23dcd6d0&clientId=ud410ab0d-566e-4&from=paste&id=u3e06619f&originHeight=1080&originWidth=1920&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u2b8b8466-10e7-47ed-9e83-0c3195b908a&title=)
返回数组的每一项都包含很多有用的信息：

- `distance`：射线原点和碰撞点之间的距离。
- `face`：几何体的哪个面被光线击中。
- `faceIndex`: 那张脸的索引。
- `object`: 碰撞涉及什么对象。
- `point`：碰撞在 3D 空间中的确切位置的[Vector3 。](https://threejs.org/docs/index.html#api/en/math/Vector3)
- `uv`：该几何体中的 UV 坐标。

使用哪个数据取决于您。如果你想测试玩家面前是否有墙，你可以测试`distance`的值. 如果要更改对象的颜色，可以更新 object的材质。如果你想在冲击点上显示爆炸特效，你可以在该`point`位置创建这个爆炸动画。
## 测试每一帧
目前，我们一开始只投射一条光线。如果我们想在物体移动时对其进行测试，我们必须在每一帧上进行测试。让我们为球体设置动画，并在光线与它们相交时将它们变成蓝色。
删除我们之前所做的代码，只保留 `raycaster` 实例化：

```javascript
const raycaster = new THREE.Raycaster()
```

通过使用`tick`函数中的经过时间和经典`Math.sin(...)`来为球体制作动画：

```javascript
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate objects
    object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5

    // ...
}
```

![004.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1686018281817-1c1e8d7e-db80-4e97-b374-e346e51da513.gif#averageHue=%23140000&clientId=ub32c77f7-aae5-4&from=drop&id=u4cdf4760&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=461453&status=done&style=none&taskId=u6c3142ce-5925-4b5a-96ef-422ff909c1f&title=)
您应该看到球体以不同的频率上下波动。
现在让我们在`tick`函数中 像以前一样更新我们的 `raycaster`：

```javascript
const clock = new THREE.Clock()

const tick = () =>
{
    // ...

    // Cast a ray
    const rayOrigin = new THREE.Vector3(- 3, 0, 0)
    const rayDirection = new THREE.Vector3(1, 0, 0)
    rayDirection.normalize()
    
    raycaster.set(rayOrigin, rayDirection)
    
    const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest)
    console.log(intersects)

    // ...
}
```

我们不需要规范化，因为`rayDirection`它的长度已经是`1`。但最好保留 `normalize()`归一化向量以防我们改变方向导致向量没有归一化。
我们还将要测试的对象数组放在一个`objectsToTest`变量中。因为接下来会派上用场的。
如果您查看控制台，您应该会得到一个包含交点的数组，并且这些交点会根据球体的位置不断变化。
我们现在可以`object`为数组的每一项更新属性的材质`intersects`：

```javascript
for(const intersect of intersects)
    {
        intersect.object.material.color.set('#0000ff')
    }
```
![005.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1686018630043-57059bf5-201c-436a-966b-49d5cd1a49a4.gif#averageHue=%23000000&clientId=ub32c77f7-aae5-4&from=drop&id=uddbe00ac&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=343278&status=done&style=none&taskId=uda5e56db-222c-471e-b499-3363bd05834&title=)
不幸的是，它们都变蓝了，但再也不会变红了。有很多方法可以将不相交的对象变回红色。我们可以做的是将所有球体变成红色，然后将相交的球体变成蓝色：

```javascript
for(const object of objectsToTest)
    {
        object.material.color.set('#ff0000')
    }

    for(const intersect of intersects)
    {
        intersect.object.material.color.set('#0000ff')
    }
```
![006.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1686018651733-ebb0034a-0526-4761-bab5-f61536cc3fa8.gif#averageHue=%230d0000&clientId=ub32c77f7-aae5-4&from=drop&id=u9d7002ff&originHeight=410&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=609468&status=done&style=none&taskId=u0191fd5d-a652-42f3-b7de-93a5fe1da10&title=)
## 用鼠标使用 raycaster 
正如我们之前所说，我们还可以使用光线投射器来测试鼠标后面是否有物体。换句话说，如果你悬停在一个物体上就测试它。
从数学上讲，它有点复杂，因为我们需要从相机向鼠标方向投射光线，但幸运的是，Three.js 完成了所有繁重的工作。
现在，让我们在`tick`函数中注释与 `raycaster` 相关的代码。
### 徘徊悬停
首先，让我们处理悬停。
首先，我们需要鼠标的坐标。我们不能使用以像素为单位的基本原生 JavaScript 坐标。我们需要一个在水平轴和垂直轴上都从`-1`到`+1`的范围，当鼠标向上移动时，垂直坐标为正。
这就是 WebGL 的工作原理，它与裁剪空间之类的东西有关，但我们不需要理解那些复杂的概念。
例子：

- 鼠标在页面左上角：`-1 / 1`
- 鼠标在页面左下方：`-1 / - 1`
- 鼠标垂直居中，水平居右：`1 / 0`
- 鼠标在页面中央：`0 / 0`

首先，让我们创建一个带有[Vector2 的](https://threejs.org/docs/index.html#api/en/math/Vector2)`mouse`变量，并在鼠标移动时更新该变量：

```javascript
/**
 * Mouse
 */
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1

    console.log(mouse)
})
```

查看日志并确保值与前面的示例匹配。
我们可以在`mousemove`事件回调中投射射线，但不建议这样做，因为`mousemove`对于某些浏览器，事件的触发速度可能超过帧率。我们将像以前一样在`tick`函数中投射射线进行碰撞检测。
为了将光线定向到正确的方向，我们可以使用[Raycaster](https://threejs.org/docs/index.html#api/en/core/Raycaster)上`setFromCamera()`的方法。其余代码与之前相同。如果对象相交或不相交，我们只需将对象材料更新为红色或蓝色：

```javascript
const tick = () =>
{
    // ...

    raycaster.setFromCamera(mouse, camera)
    
    const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest)
    
    for(const intersect of intersects)
    {
        intersect.object.material.color.set('#0000ff')
    }

    for(const object of objectsToTest)
    {
        if(!intersects.find(intersect => intersect.object === object))
        {
            object.material.color.set('#ff0000')
        }
    }

    // ...
}
```

如果光标在球体上方，球体应该变成蓝色。![tutieshi_640x400_4s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1686216937022-3decfecd-98bd-4e5b-8d05-20414fe7e0cc.gif#averageHue=%230e0000&clientId=uc0e73c23-434e-4&from=drop&id=ubbd2cd92&originHeight=400&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=245472&status=done&style=none&taskId=uf54cbb61-d8c5-4ad7-8702-cc9c89eb6f2&title=)
### 鼠标进入和鼠标离开事件
在three项目中`'mouseenter'`、`'mouseleave'`等鼠标事件也不支持。如果您想在鼠标“进入”一个对象或“离开”该对象时得到通知，您必须自己完成。
我们可以做的是重现`mouseenter`和`mouseleave`事件，即拥有一个包含当前悬停对象的变量。
如果有一个对象相交，但之前没有，则表示该`a`对象发生了`mouseenter` 。
如果没有对象相交，但之前有一个，则表示`mouseleave`发生了。
我们只需要保存当前相交的对象：

```javascript
let currentIntersect = null
```
然后，测试并更新`currentIntersect`变量：

```javascript
const tick = () =>
{
    // ...
    raycaster.setFromCamera(mouse, camera)
    const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest)
    
    if(intersects.length)
    {
        if(!currentIntersect)
        {
            console.log('mouse enter')
        }

        currentIntersect = intersects[0]
    }
    else
    {
        if(currentIntersect)
        {
            console.log('mouse leave')
        }
        
        currentIntersect = null
    }

    // ...
}
```

### 鼠标点击事件
现在我们有了一个包含当前悬停对象的变量，我们可以轻松地实现一个`click`事件。
首先，我们需要监听`click`事件，不管它发生在哪里：

```javascript
window.addEventListener('click', () =>
{
    
})
```

然后，我们可以测试`currentIntersect`变量中是否有东西：

```javascript
window.addEventListener('click', () =>
{
    if(currentIntersect)
    {
        console.log('click')
    }
})
```

我们还可以测试点击关注的是什么对象：

```javascript
window.addEventListener('click', () =>
{
    if(currentIntersect)
    {
        switch(currentIntersect.object)
        {
            case object1:
                console.log('click on object 1')
                break

            case object2:
                console.log('click on object 2')
                break

            case object3:
                console.log('click on object 3')
                break
        }
    }
})
```

重现本机事件需要时间，但一旦您理解了它，它就会非常简单。
## 使用模型进行光线投射 
这一切都很好，但是我们可以将光线投射应用于导入的模型吗？
答案是肯定的，而且其实很容易。但我们将一起做，因为我们可以在此过程中学到一些有趣的东西。
首先，我们需要一个模型。
### 加载模型
我们在上一课中使用的 `Duck` 模型位于该`static/models/Duck/`文件夹中。
现在是尝试自行加载该模型并将其添加到场景中的好时机。
首先，我们将使用[GLTFLoader](https://threejs.org/docs/?q=GLTFLoader#examples/en/loaders/GLTFLoader)。
引入`GLTFLoader`自`three/examples/jsm/loaders/GLTFLoader.js`：

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
```

接下来，我们需要实例化它。
您可以将该代码放在函数实例化之后`scene`和`tick`函数之前的任何位置：

```javascript
/**
 * Model
 */
const gltfLoader = new GLTFLoader()
```

我们现在可以调用该`load`方法。这两个参数是文件的路径和加载模型时应调用的函数。
我们将使用glTF-Binary，但请随意使用其他版本`GLTFLoader`。另外，不要忘记如果要使用`Draco`压缩版需要`DracoLoader`在实例中添加实例。
调用该方法并作为路径（没有路径）和一个带有控制台日志的函数`load`发送：`'./models/Duck/glTF-Binary/Duck.glb'static/`

```javascript
gltfLoader.load(
    './models/Duck/glTF-Binary/Duck.glb',
    () =>
    {
        console.log('loaded')
    }
)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685526011476-620e1df0-cc38-4267-a66d-d2302f19dd30.png#averageHue=%23282205&clientId=ud410ab0d-566e-4&from=paste&id=u9f0c05e7&originHeight=864&originWidth=1536&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uca4dc8a2-0026-4297-aef4-25376bd5232&title=)
`'loaded'`您应该在控制台中看到。
我们现在可以将模型添加到场景中。首先，`gltf`向函数添加一个参数：

```javascript
gltfLoader.load(
    './models/Duck/glTF-Binary/Duck.glb',
    (gltf) =>
    {
        console.log('loaded')
    }
)
```

现在，包含在您自己的`scene`属性中`add` `gltf.scene`整个加载场景：

```javascript
gltfLoader.load(
    './models/Duck/glTF-Binary/Duck.glb',
    (gltf) =>
    {
        scene.add(gltf.scene)
    }
)
```

如您所见，有些地方不对劲。
### 灯灯
如果您尝试过自己做，您可能在执行这一步时遇到了一些困难。
好像场景里加了点什么，却是一片漆黑。原因是我们的 `Duck` 材质是 `MeshStandardMaterial` [，](https://threejs.org/docs/?q=MeshStandardMaterial#api/en/materials/MeshStandardMaterial)这种材质只有在灯光下才能看到。
让我们添加一个[AmbientLight](https://threejs.org/docs/?q=AmbientLi#api/en/lights/AmbientLight)和一个[DirectionalLight](https://threejs.org/docs/?q=Direction#api/en/lights/DirectionalLight)：

```javascript
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.3)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 0.7)
directionalLight.position.set(1, 2, 3)
scene.add(directionalLight)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685526011517-b8fa35dd-9f73-40a1-84b7-db3a278292fd.png#averageHue=%231b0500&clientId=ud410ab0d-566e-4&from=paste&id=u406014f7&originHeight=864&originWidth=1536&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u486010c2-3dbd-48b2-8854-d38a27c581c&title=)
现在我们可以看到 `Duck`，将它向下移动一点：

```javascript
gltfLoader.load(
    './models/Duck/glTF-Binary/Duck.glb',
    (gltf) =>
    {
        gltf.scene.position.y = - 1.2
        scene.add(gltf.scene)
    }
)
```

### 与模型相交
让我们在模型上试试 `raycaster`。
这个练习会很简单。我们希望 `Duck` 在光标进入时变大，在光标离开时恢复到正常大小。
我们将在每一帧上测试光标是否在 `Duck` 中，这意味着我们需要配置该`tick`功能。光线投射器已经通过鼠标设置，我们可以在与我们对球体进行的测试相关的代码之后立即进行相交测试。
以前，我们曾经针对 `raycaster`内的一组网格`raycaster.intersectObjects`进行测试。但是现在，我们测试的是一个`gltf.scene`， 是的，这个对象可能有多个孩子，更糟糕的是，孩子中也会有孩子，但你会发现这不是问题，我们仍在测试一整个对象。
我们不使用`intersectObjects`（复数），而是使用`intersectObject`（单数）。它的工作原理是一样的，也会返回一个交集数组，但我们必须向它发送一个对象而不是对象数组。
那么，你必须做什么？首先，创建一个`modelIntersects`变量（这样它就不会与`intersects`变量冲突），然后调用`raycaster.intersectObject`（单数）方法，最后将其发送`gltf.scene`（此代码无效）：

```javascript
const tick = () =>
{
    // ...

    // Test intersect with a model
    const modelIntersects = raycaster.intersectObject(gltf.scene)
    console.log(modelIntersects)

    // Update controls
    // ...
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685526011380-870d98af-3990-4e50-8fad-d00ecf9d787f.png#averageHue=%23888788&clientId=ud410ab0d-566e-4&from=paste&id=ua21087d8&originHeight=864&originWidth=1536&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ud886dff7-f5d8-4f3e-b65c-7dcc75dc2a9&title=)
我们在这里犯了一个错误。如果你熟悉 JS，你就会知道我们无法从加载的回调函数访问外部`gltf`变量。我们称之为变量的“范围”。
此外，加载模型需要时间。是的，我们正在使用一个非常简单的模型在本地进行测试，但情况可能会有所不同，在线加载复杂的对象需要时间。
当您尝试与加载的模型进行交互或为加载的模型设置动画时，这些都是您将遇到的经典问题。
为了解决这两个问题，我们将在加载模型之前使用 `let` 创建一个`model`变量并将其设置为`null`（相当于 JavaScript 中的“无”）：

```javascript
let model = null
gltfLoader.load(
    // ...
)
```

由于我们`model`在函数之外创建了该变量，因此我们将能够在`tick`函数中使用它。
接下来，当加载模型时，我们将 分配`gltf.scene`给`model`：

```javascript
let model = null
gltfLoader.load(
    './models/Duck/glTF-Binary/Duck.glb',
    (gltf) =>
    {
        model = gltf.scene
        gltf.scene.position.y = - 1.2
        scene.add(gltf.scene)
    }
)
```

你也可以在加载的函数中把`gltf.scene`替换成`model`因为它更佳语意化方便阅读，尽管它是可选的：

```javascript
let model = null
gltfLoader.load(
    './models/Duck/glTF-Binary/Duck.glb',
    (gltf) =>
    {
        model = gltf.scene
        model.position.y = - 1.2
        scene.add(model)
    }
)
```

回到`tick`函数和我们的`intersectObject`：我们现在可以使用`model`变量而不是`gltf.scene`（这段代码现在还不能工作）：

```javascript
const tick = () =>
{
    // ...

    // Test intersect with a model
    const modelIntersects = raycaster.intersectObject(model)
    console.log(modelIntersects)

    // ...
}
```


![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685526011456-e80f9780-3a9f-4409-9a68-faace4cbc860.png#averageHue=%23898688&clientId=ud410ab0d-566e-4&from=paste&id=uacb2f0a3&originHeight=864&originWidth=1536&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uce333b4e-aede-4dd3-b660-02733f8ead9&title=)
再一次，我们得到一个错误。我们忘记了js的同步执行，因为加载模型需要时间，这意味着`model`变量将暂时已`null`存在。
`model`我们在这里可以做的只是测试语句中是否有内容`if`：

```javascript
const tick = () =>
{
    // ...

    if(model)
    {
        const modelIntersects = raycaster.intersectObject(model)
        console.log(modelIntersects)
    }

    // ...
}
```

现在我们得到了相交数组。
### 笔记
在我们解决 `Duck size` 这个功能之前，有几件事需要注意。
#### 递归
首先，我们调用`intersectObject`，`model`它是一个[Group](https://threejs.org/docs/#api/en/objects/Group)，而不是[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)。
您可以在加载的回调函数中分配`model`之前通过记录来测试它：

```javascript
let model = null
gltfLoader.load(
    './models/Duck/glTF-Binary/Duck.glb',
    (gltf) =>
    {
        model = gltf.scene
        console.log(model)
        model.position.y = - 1.2
        scene.add(model)
    }
)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685526011435-0c01f27d-76de-497b-a5c0-bbf75f11404e.png#averageHue=%23121901&clientId=ud410ab0d-566e-4&from=paste&id=u44f558cb&originHeight=864&originWidth=1536&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u6b216dab-d421-4a9c-8dfd-2ad6d4bd9fa&title=)
这不应该工作，因为 `Raycaster` 应该针对网格进行测试。它起作用的原因是，默认情况下，Raycaster 将检查对象的子对象。更好的是，它会递归地测试所有的内部孩子。
实际上，我们可以通过将`intersectObject`和`intersectObjects`方法的第二个参数设置为 `false` 来选择停用该选项，但我们可以接受默认行为。
#### 相交数组
第二点要注意的是，当我们只测试一个对象时，我们收到了一组相交。
第一个原因是，由于 Raycaster 正在递归地测试子项，因此可能有多个与射线相交的网格。此处情况并非如此，因为 Duck 仅由一个网格构成，但我们本可以测试更复杂的模型。
第二个原因是，正如我们之前看到的，即使是一个网格也可以与一条射线相交多次，我们的鸭子就是这种情况。从一个非常特定的角度进行测试，您可以有多个相交点：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685526012993-f5495581-2597-4ec8-bc36-4bf5b478ebb3.png#averageHue=%23250a00&clientId=ud410ab0d-566e-4&from=paste&id=u90aacea5&originHeight=864&originWidth=1536&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uf81b3bbe-71cc-472c-b020-18a0971a461&title=)
### 更新规模
我们快完成了。我们现在需要做的就是根据相交数组更新模型的`scale` 。
在调用 `intersectObject`之后，我们可以测试数组的`length` 。
`0`被认为是`false`，所以我们可以只使用`modelIntersects.lengthas` 条件。
如果在上方`0`，则为`true，`这意味着鼠标悬停在模型上，我们应该增加比例。否则，它将是`false`，这意味着鼠标没有悬停在模型上，我们应该将比例设置为`1`：

```javascript
const tick = () =>
{
    // ...

    if(model)
    {
        const modelIntersects = raycaster.intersectObject(model)
        
        if(modelIntersects.length)
        {
            model.scale.set(1.2, 1.2, 1.2)
        }
        else
        {
            model.scale.set(1, 1, 1)
        }
    }

    // ...
}
```
![tutieshi_640x360_5s.gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1686218608306-6d8ec2be-fcec-4cf4-9d2d-0f246756a90c.gif#averageHue=%231b0500&clientId=uc0e73c23-434e-4&from=drop&id=uba6a9598&originHeight=360&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=809290&status=done&style=none&taskId=uec3dbbf9-84fd-4600-aa4d-2a9b4b0dfab&title=)
# 
24. Blender 自定义建模
## 介绍
现在我们知道如何将模型导入场景了；但是我们还不会怎么创建复杂的模型，让我们学习如何使用 3D 软件帮助我们创建自己的模型。
## 选择软件
有很多软件可以3D建模，如 Cinema 4D、Maya、3DS Max、Blender、ZBrush、Marmoset Toolbag、Substance Painter 等。这些都很棒，但它们在 UX、性能、功能、兼容性、价格等不同标准上有所不同。
在本课中，我们将使用 Blender，因为它是免费的，性能卓越，适用于所有主要操作系统，具有许多功能，拥有庞大的社区，并且自 2.8 版本以来操作也变得更加容易。
请注意，在课程结束时您不会成为 Blender 专家。学习它的所有方面需要一个完整的课程，而且市面上已经有很多很好的学习资源。这个课程是为了让我们了解基础知识并揭开 Blender 软件的神秘面纱，以便有足够的基础来创建简单的模型。
一开始，我们将了解所有基础知识。需要接受的东西很多，但别担心；我们将多次重复大多数快捷方式、机制和功能。
如果你在某个时候按下了错误的快捷方式，你失去了你的场景，或者界面完全混乱，只需关闭并重新打开 Blender。
## 下载Blender
进入blender官网下载页面，下载最新版本：[https://www.blender.org/download/](https://www.blender.org/download/)
该软件非常轻便，不会超过几分钟。
下载后，只需安装即可。
该课程是使用 Blender 编写和录制的2.83.5。虽然不应存在重大差异，但请留意版本内部潜在的变化。
## 界面
### 闪屏
初始屏幕使您可以访问一些有用的链接、模板和最近打开的文件。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697418847-42c3b993-d58a-4ea5-8c37-fe16ad7e1d0e.png#averageHue=%233b3a3a&clientId=u088972ae-4aa2-4&from=paste&id=u66abd4d1&originHeight=1920&originWidth=3072&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ucdd8ee04-853b-41ea-b36a-c5674bb5e7e&title=)
起始面板中的图片随 Blender 版本而变化，所以如果您有不同的版本，请不要感到惊讶。
您还可以在它的右上角看到确切的版本。
单击启动画面外的任意位置以将其关闭。
### 领域
界面的不同部分称为区域。区域非常灵活，您可以创建所需的布局。
#### 默认区域
默认情况下，您的主区域名为`3D Viewport`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697418805-91f596b6-e266-4d65-8cc3-08b36d707bfd.png#averageHue=%233d3d3d&clientId=u088972ae-4aa2-4&from=paste&id=u6ed259b8&originHeight=1400&originWidth=2538&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u607cc715-aaf5-49cc-a972-c7e723bf1a9&title=)
`Timeline`创建动画：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697418765-c1e62ee0-f601-4061-9a23-c9aa511347ed.png#averageHue=%233e3e3e&clientId=u088972ae-4aa2-4&from=paste&id=ufc0dbb58&originHeight=380&originWidth=2540&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u27a5f2ed-577b-47d0-8a9a-7dd9b612c83&title=)
查看`Outliner`和管理场景图（或场景树）：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697418824-b78d30c3-d42d-443a-8e27-e26cf899f47c.png#averageHue=%232e2e2e&clientId=u088972ae-4aa2-4&from=paste&id=u344f69dc&originHeight=564&originWidth=534&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u06f62c65-3d65-49bb-9265-5b5fa50c181&title=)
管理`Properties`活动对象（选择）和环境的属性：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697418783-b1d392f4-4ae7-49aa-a440-bd29dc68a4a2.png#averageHue=%23404040&clientId=u088972ae-4aa2-4&from=paste&id=ue4ea0026&originHeight=1182&originWidth=534&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u653551e7-9d15-42f1-a1e7-f9e28b3df5c&title=)
#### 换一个区域
要更改某个区域的显示内容，请单击该区域的左上角按钮。在这里，我们将更改时间轴区域。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697421240-0dac4fea-c552-462b-8426-af51c99e8505.png#averageHue=%233d3d3d&clientId=u088972ae-4aa2-4&from=paste&id=u6ed492b6&originHeight=78&originWidth=122&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u98ce47ef-52f3-401a-a6ac-8f7284b7c32&title=)
我们要在`Timeline`中换一个区域`3D Viewport`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697422992-d0102e62-b1f5-4ed6-9038-216490de1a0f.png#averageHue=%23353535&clientId=u088972ae-4aa2-4&from=paste&id=uf1e2dd0b&originHeight=568&originWidth=424&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u68b660bc-f873-4df1-883a-43950ae89da&title=)
#### 调整区域大小
要调整区域大小，请将光标放在两个区域之间并拖放：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697423047-b47dad90-ed0d-4528-8b1e-cc09c1f53045.png#averageHue=%23434343&clientId=u088972ae-4aa2-4&from=paste&id=ub97f6c7a&originHeight=246&originWidth=844&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3b4fe424-973c-4e22-83fe-79656fdb666&title=)
#### 创建新区域
要创建一个新区域，首先，我们必须决定要拆分的区域。然后，我们必须将光标定位在我们左上角，让光标变成十字形然后向右拖放（区域内的几个像素）：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697423843-bddb5e18-e6da-4215-9ec3-b16c6e76b3a4.png#averageHue=%234b4b4b&clientId=u088972ae-4aa2-4&from=paste&id=u9553de28&originHeight=216&originWidth=138&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u6e730e58-22e1-4390-957d-ec2e4f902c4&title=)
最后，我们就托放出两个分割的区域：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697424197-306889fd-4377-47b2-998b-46ce191ab57a.png#averageHue=%233c3c3c&clientId=u088972ae-4aa2-4&from=paste&id=ud521d305&originHeight=636&originWidth=2580&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u734f9b61-0c6c-477e-a5da-1dc49c7fc5a&title=)
#### 删除一个区域
删除一个区域有点棘手，您最终可能会得到几十个不需要的区域。
在某种程度上，我们不会删除一个区域；我们要做的是取消拆分两个区域。首先，您必须决定两个区域中的哪一个将接管另一个。如果要删除右侧区域，请从左侧区域开始。然后将光标放在与我们要删除的区域相邻的两个角之一（该区域中的几个像素应该接管另一个）：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697428966-df79bee1-29b9-4651-8557-848a7732ebd1.png#averageHue=%23454444&clientId=u088972ae-4aa2-4&from=paste&id=uabd04426&originHeight=412&originWidth=204&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9abfc058-2987-45a1-9dd3-452d9edd845&title=)
然后拖放（就像我们创建一个区域一样）但这次是在相反的方向（朝向我们要删除的区域）：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697429800-56f46955-baa0-40dd-9bd2-765a0ce8096b.png#averageHue=%233d3d3d&clientId=u088972ae-4aa2-4&from=paste&id=u745c6147&originHeight=634&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u6a8df486-0df8-4327-94a2-ec8198f2c89&title=)
可能需要多尝试几次，但你会明白的。
## 快捷方式
Blender 的优势之一是它的快捷方式。它们有很多，一旦你掌握了这些快捷方式，你的建模效率就会大大滴提高。不用担心; 您可以通过界面或我们稍后将看到的搜索面板使用所有快捷操作。在本课中，我们将使用一些常用的重要的快捷方式。
这是一个非详尽的快捷方式列表：[https://docs.google.com/document/d/1wZzJrEgNye2ZQqwe8oBh54AXwF5cYIe56EGFe2bb0QU/edit ?usp=sharing](https://docs.google.com/document/d/1wZzJrEgNye2ZQqwe8oBh54AXwF5cYIe56EGFe2bb0QU/edit?usp=sharing)
需要了解的一件重要事情是快捷方式对鼠标悬停区域敏感。这意味着相同的快捷方式可以根据我们光标悬浮的内容而有不同的操作。我们将在本课中看到的大多数快捷方式都与`3D Viewport`交互. 按快捷键时，您应始终确保将光标保持在这些区域上方。
快捷方式也是模式敏感的，但我们稍后会讨论模式。
在 Mac 和 Windows 之间只有一两个快捷方式有所不同。如果有差异，我们课程将引用两个版本。如果快捷方式包含`CTRL`键并且您使用的是 `Mac`系统，请不要假定它是`CMD`键. 请还是使用`CTRL`键。
## View
如您所见，您可以向各个可能的方向移动视图。虽然您可以使用触控板，但我建议您使用带滚轮的鼠标，出于建模方便的原因，您可以按下滚轮（或第三个按钮）。从现在开始，我们将把滚轮按钮（我们可以按下的按钮）称为`MIDDLE MOUSE`。
如果您使用的是触控板，则可以使用两根手指模拟滚轮。
如果您使用的是 `Magic Mouse`，则可以复制`MIDDLE MOUSE`. 通过 转到首选项`Edit` > `Preferences`。使用左侧的导航菜单，选择该`Input`部分。选中`Emulate 3 Button Mouse`复选框。
最好你有一个键盘辅助。
### 轨道旋转
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697430793-c59701c4-a2d8-4104-97c5-07ca1038c858.png#averageHue=%23dbd5cf&clientId=u088972ae-4aa2-4&from=paste&id=u7a14cc6e&originHeight=1080&originWidth=1920&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uee169fe2-6286-4696-8cbe-a5d363a9fac&title=)
我们可以通过按下`MIDDLE MOUSE`并拖放来旋转视图`3D Viewport`。
或者我们可以使用每个右上角的小工具`3D Viewport`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697431530-3494a9a5-fe4f-485d-b3e1-e20e98d36982.png#averageHue=%233e3e3e&clientId=u088972ae-4aa2-4&from=paste&id=u941872aa&originHeight=180&originWidth=210&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud9cf2601-f89a-4364-9bbb-3394791ef9c&title=)
我们称此旋转轨道（如 Three.js [OrbitControl](https://threejs.org/docs/#examples/en/controls/OrbitControls)），因为视图围绕一个称为视点的不可见中心旋转。我们稍后会谈到这一点。
### Truck 和Pedstal 
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697432527-b6a7bf24-dcde-4cdf-950f-d29a6403244a.png#averageHue=%23d9d9d9&clientId=u088972ae-4aa2-4&from=paste&id=uc83f84ca&originHeight=1080&originWidth=1920&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ubcb5894d-5243-4d82-b479-4c77627a2bc&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697438172-bc10dd1e-2aeb-42f9-aad1-f78a6bd4f840.png#averageHue=%23d9d9d9&clientId=u088972ae-4aa2-4&from=paste&id=uc3474132&originHeight=1080&originWidth=1920&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf8e625d9-2e21-4c38-b7a7-c91ce1555cc&title=)
`Truck`是视图左右移动的进行过程，而`Pedsta`是视图上下移动的进行过程。我们可以通过再次按下`MIDDLE MOUSE`来同时完成这两项操作，但这次还要按下`SHIFT` 键。
或者我们可以使用右上角的手形图标：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697438240-444101ab-ac84-472b-b33a-74ce18e67665.png#averageHue=%23474747&clientId=u088972ae-4aa2-4&from=paste&id=u576c9be8&originHeight=70&originWidth=92&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8c8f7f3e-2a1f-4fc9-babc-810c2ea68d5&title=)
Truck也称为轨道。
有些人可能还错误地将这些动作称为“平移”。（摄像的专有名词，国外沿用了这个考究的说法，所以你也可以理解为平移）
### Dolly
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697438137-3536f870-abee-4924-9cfc-9a2d143223b6.png#averageHue=%23dbd1d0&clientId=u088972ae-4aa2-4&from=paste&id=uc8e0e15f&originHeight=1080&originWidth=1920&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ueb62eb16-682e-4336-9f60-dcdb2d94ca3&title=)
Dollu是当视图向前和向后移动时。我们可以使用`WHEEL`来实现这一点（滚轮滚动）。
或者我们可以使用右上角的放大镜图标：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697440046-d7342e92-752b-4a38-b188-a137f6482531.png#averageHue=%23484848&clientId=u088972ae-4aa2-4&from=paste&id=udbdf7c9b&originHeight=62&originWidth=94&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u7d9d1b62-582a-4331-b80a-fe8b941ac3e&title=)
不过要小心；缩放并不完全像前进和后退。**我们离我们在Orbit**部分讨论的视点越来越近或越来越远，但我们不能缩放超过那个点，缩放太多会导致视图卡住。
要解决此缩放限制问题，我们可以通过按下`SHIFT + CTRL + MIDDLE MOUSE`并拖放来向前和向后移动`3D Viewport`（不适用于触控板的双指技术）。这样，我们就不会卡在视点上。
界面中没有图标可以执行此操作。
### 倾斜和平移
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697440205-06f363e3-698a-4bbb-9f3d-0f47824669e0.png#averageHue=%23d5dde1&clientId=u088972ae-4aa2-4&from=paste&id=u8432afae&originHeight=1080&originWidth=1920&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u796a640e-6ee9-4b84-ac4c-a46eed60fda&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697441073-f2e91f21-bb12-4a65-8018-39262dfffd9e.png#averageHue=%23ced8dd&clientId=u088972ae-4aa2-4&from=paste&id=uc2bca1c3&originHeight=1080&originWidth=1920&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ueb9bcc37-a9a1-416c-a630-5512ae5ddac&title=)
倾斜和平移是相机点上的简单旋转。
我们必须进入**步行模式**（也称为飞行模式）才能使用这些动作。
为此，如果您使用的是`QWERTY`键盘，请按`SHIFT + BACK QUOTE`。``` 反引号——也称为反引号、锐音符或左引号——是一种倾斜的简单引号，可用于添加重音。
找到该字符可能有点困难，因为它的位置会根据您的键盘发生很大变化。您可以在右上角、左下角或非常靠近`ENTER`键的地方找到它。
如果您使用的是**AZERTY**键盘，则快捷方式将不起作用。我们需要更改键盘映射。通过 转到首选项`Edit > Preferences`。使用左侧的导航菜单，选择该`Keymap`部分。在搜索输入中，编写并更改`view navigation`的快捷方式。`View Navigation (Walk/Fly)SHIFT + F`
就是这样，您可以使用步行模式`SHIFT + F`。
您还可以在行走模式下前进、后退和侧面，使用`ARROWS`或`WASD`如果使用`QWERTY`。
### 透视/正交
默认视图使用透视图。我们可以使用`NUMPAD 5`或右上角的网格图标切换正交版本：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697443036-bedf54c9-3416-49ce-9f0a-44cd99db8baf.png#averageHue=%23434343&clientId=u088972ae-4aa2-4&from=paste&id=udc6e5179&originHeight=64&originWidth=86&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9399f26f-a73f-4a27-b497-d3e041931e0&title=)
### 轴
我们可以通过按`NUMPAD 1`、 `NUMPAD 3` 和`NUMPAD 7`将相机对准`X`、`Y`和`Z`轴。我们谈论的是数字键盘数字，而不是键盘顶部的数字。 
要将相机定位在对面，请按相同的键，但同时使用`CTRL`键。
或者我们可以使用 `gizmo` 并单击轴：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697443017-acfad42c-c7ad-4f5a-b6cb-704c00df0baa.png#averageHue=%233e3e3e&clientId=u088972ae-4aa2-4&from=paste&id=ua219ae5c&originHeight=180&originWidth=210&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9d6fdc21-5c7c-4f76-af2f-7cf40fdfd4b&title=)
在 Blender 中，我们将顶轴视为`Z`，这与 Three.js 不同，它是`Y`。
### 相机
您可能已经在`3D Viewport`. 要获取相机视点，请按`NUMPAD 0`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697445021-e0d572be-d9d7-409b-bc9f-3797635f2abe.png#averageHue=%23494949&clientId=u088972ae-4aa2-4&from=paste&id=u49a9acab&originHeight=66&originWidth=100&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u67373d8b-094b-4624-bb44-9cf045080dc&title=)
进行渲染时将使用相机。没有相机就无法渲染场景。
### 重置
有时候，我们会迷路，甚至不知道自己的场景在哪里。我们可以通过按`SHIFT + C `重新关注我们的场景。
### 重点
要将相机聚焦在一个物体上，请使用` LEFT MOUSE`选择物体，然后按`NUMPAD ,`（我们说的是数字键盘上的逗号，它可能是一个点，具体取决于您使用的键盘）。
我们还可以专注于一个对象并使用隐藏其他所有内容`NUMPAD /`。使用相同的快捷方式离开焦点模式。
## 选择
正如我们刚刚看到的，我们可以使用`LEFT MOUSE`选择物体. 我们还可以使用`SHIFT + LEFT MOUSE `来选择多个对象。
您可能已经注意到其中一个对象的轮廓总是更亮。该对象不仅被选中；它也是活跃的。我们稍后会看到更多相关信息。
要撤消选择，请按`CMD + Z`(`CTRL + Z`在 Windows 上)。是的，选择对象被认为是我们可以撤消的操作。虽然这看起来很奇怪，但它在您误按时非常有用。
要取消选择一个对象，请`SHIFT + LEFT MOUSE`再次使用。如果它不是活动的，它将变为活动的，如果它是活动的，它将被取消选择。
要选择所有内容，请按`A`。
要取消选择所有内容，请双击`A`。
要选择矩形区域，请按`B`。
要像绘画一样选择，请按`C`。在此模式下，使用`WHEEL`更改半径。
## 创建对象
要创建对象，请将光标放在 `3D Viewport` 上方，然后按`SHIFT + A`。一个菜单应该在你的光标后面打开。浏览此菜单以创建各种对象。我们将在课程中看到的大部分内容都在`Mesh`子菜单中：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697445333-cf0732e9-c441-43e2-b7f7-fe4628a36df1.png#averageHue=%23383837&clientId=u088972ae-4aa2-4&from=paste&id=u615c4b14&originHeight=970&originWidth=864&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0306bc8e-a09f-4226-9813-7739cb9a6e9&title=)
当你创建一个对象时，一个小按钮应该出现在左下角：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697445310-ae186534-c0bb-458f-890d-5e65c2ea8b01.png#averageHue=%23404040&clientId=u088972ae-4aa2-4&from=paste&id=u10696f08&originHeight=124&originWidth=390&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uc9894811-bbe9-4ea8-aff6-fefd1cc1a81&title=)
单击它可以更改各种属性，例如大小、细分以及与您尝试创建的对象相关的许多其他属性：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697446646-d7a57c1d-1ad9-4f09-9e7b-304776857ed6.png#averageHue=%23373737&clientId=u088972ae-4aa2-4&from=paste&id=u3f45d67f&originHeight=668&originWidth=606&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u02b24d4f-4801-4e17-b90c-3d3dbeee34c&title=)
如果您单击其他任何地方，您将丢失该菜单。您可以按`F9`重新打开它，但是如果您开始对几何体进行修改，您将无法重新打开此菜单。
## 删除对象
要删除一个对象，请选择它，然后将光标放在 `3D Viewport` 上方，然后按`X`。光标后面应该会打开一个确认菜单。点击它删除对象：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697446695-1c40fffe-a485-417d-956d-1200e704dea1.png#averageHue=%2364863c&clientId=u088972ae-4aa2-4&from=paste&id=ub45044b0&originHeight=236&originWidth=498&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ued340604-4398-402b-ae8f-f602a39d464&title=)
## 隐藏对象 
要隐藏所选对象，请按`H`。
要显示隐藏的对象，请按`ALT + H`。
要隐藏未选定的对象，请按`SHIFT + H`。
您也可以使用`Outliner`眼睛图标管理它。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697447748-417e83db-b084-49ef-b3e8-1142122fca44.png#averageHue=%23393939&clientId=u088972ae-4aa2-4&from=paste&id=ueb6f3c8e&originHeight=280&originWidth=92&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u50dc06a4-6b43-4e5a-b9b9-40f2e8ba05b&title=)
## 转换对象
有 3 种类型的转换——就像在 Three.js 中一样。我们可以改变位置、旋转和比例。
我们可以使用左侧的菜单分别激活每个或使用第四个按钮一起激活它们：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697447678-37ff83d7-b49a-4709-aab4-009420d1df57.png#averageHue=%23484848&clientId=u088972ae-4aa2-4&from=paste&id=ue83adacb&originHeight=308&originWidth=108&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf89d74f3-5303-4994-86cc-d3dcf2807ec&title=)
或者我们可以使用快捷方式：

- `G`职位
- `R`为了轮换
- `S`对于规模

激活这些快捷方式之一后，您可以通过按相应的键（ `X`、`Y`和`Z`）强制转换在特定轴上运行。
## 模式 
我们目前处于`Object Mode`，我们可以在其中创建、删除和转换对象。还有很多其他模式。
### 改变模式
我们可以使用任何区域左上角选择按钮上的菜单更改模式`3D Viewport`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697448741-f8218586-b409-4ee7-9c13-28db6236c405.png#averageHue=%234c4c4b&clientId=u088972ae-4aa2-4&from=paste&id=u6fee5c62&originHeight=108&originWidth=282&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u33e7b750-2d87-410e-806e-65bebe8fc7f&title=)
或者我们可以按下`CTRL + TAB`打开一个滚轮菜单（又名，最酷的菜单）：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697449461-36b097e1-8d24-4a0f-bafb-1a3f3c1d9ed8.png#averageHue=%233c3b3b&clientId=u088972ae-4aa2-4&from=paste&id=u5486d15b&originHeight=704&originWidth=1104&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9d126c33-6441-47e2-8cfd-5c63b67356e&title=)
我们不会涵盖所有模式，但我们将使用`Edit Mode`. 选择一个网格（或创建一个）并切换到`Edit Mode`.
### 编辑模式
实际上有一个快捷方式来切换`Edit Mode`. 只需按下`TAB`。
`Edit Mode`与`Object Mode`非常相似，但我们可以编辑顶点、边和面。默认情况下，我们可以更改顶点。尝试选择顶点，使用常用的快捷方式对它们进行变换——`G`用于位置、`R`旋转、`S`缩放。
要切换到边和面，我们可以使用右上角的按钮3D Viewport：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697450548-ab881ca9-46fe-4e87-9222-af9d3adc34d8.png#averageHue=%23515151&clientId=u088972ae-4aa2-4&from=paste&id=u1fe744d0&originHeight=96&originWidth=222&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf641320b-e53f-4fc3-b7e0-16d8c2340ed&title=)
或者我们可以按键盘顶部的前三个数字`1`, `2`, 和`3`。
完成对象编辑后，保留`Edit Mode`with `TAB`。
## 底纹 
阴影是您在`3D Viewport.`
我们目前处于`Solid`阴影中。此阴影使您可以看到具有默认材质且没有灯光支持的对象。它既高效又方便。
我们可以使用右上角的按钮更改阴影：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697450587-e9aa50fb-1e4a-4e54-8f94-30289707a9a5.png#averageHue=%234f4f4f&clientId=u088972ae-4aa2-4&from=paste&id=u77de6c67&originHeight=118&originWidth=314&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0c56a312-5e4e-4574-aca0-41c8be78051&title=)
或者我们可以按下`Z`打开一个滚轮菜单：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697450569-cf6dd267-2bd6-4c40-b335-d1624595b431.png#averageHue=%23444444&clientId=u088972ae-4aa2-4&from=paste&id=ub69ed8b7&originHeight=686&originWidth=1054&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ubcc29b04-1119-4fdb-aab9-0e8b1ce4543&title=)

- `Solid`：默认为每个对象使用相同的材质。
- `Material`：类似于Solid阴影，但可以预览材质及其纹理。
- `Wireframe`：所有几何图形都在线框内。
- `Renderer`：低质量渲染——它最逼真但性能最低。

如果您在 `Render`中看不到太多东西，可能是因为您的场景中没有足够的灯光。只需按`SHIFT + A`打开菜单即可添加一两个灯光。
## 特性
除非您更改了布局，否则右下方区域名为`Properties`，您可以使用渲染属性、环境属性和活动对象的属性。请记住，活动对象是具有最亮轮廓的对象。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697452128-55736437-0818-459e-bf35-fc705aa21cf1.png#averageHue=%233d3d3d&clientId=u088972ae-4aa2-4&from=paste&id=u157e2433&originHeight=1184&originWidth=626&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3e6f7eb2-c5aa-4c96-b189-b7d50d7cc3d&title=)
我们不会涵盖所有这些选项卡，但最上面的选项卡处理渲染和环境：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697454304-716c05fd-6093-4152-b2d4-f94ca5d6fa38.png#averageHue=%23393939&clientId=u088972ae-4aa2-4&from=paste&id=uf752aa04&originHeight=374&originWidth=98&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud0eebab0-eac3-493c-ac2b-2f47c5811f1&title=)
下面的那些与活动对象有关，它们可能会根据活动对象的类型而有所不同，因为我们没有立方体与灯光相同的属性：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697454890-adbe883f-6c1b-4dd0-a20e-c860bdbfca78.png#averageHue=%23333332&clientId=u088972ae-4aa2-4&from=paste&id=ud91258f9&originHeight=498&originWidth=112&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ub61b14ae-616b-4d02-b39b-7a64d2b9c1a&title=)
### 对象属性
`Object Properties`让您准确更改属性，例如转换：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697455443-43e1aa36-c7de-4cfb-b26e-8bf864635016.png#averageHue=%23403c39&clientId=u088972ae-4aa2-4&from=paste&id=ua414b2e6&originHeight=72&originWidth=108&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue7446b3e-5dcc-42be-9e8e-2c09b409c37&title=)
### 修饰符属性
`Modifiers Properties`让您添加我们所说的修饰符。这些是非破坏性修改。您可以细分、弯曲、增长、收缩等，并根据需要关闭它们：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697455902-9d07f6c9-25f3-4420-8fab-ae1ebba8b43c.png#averageHue=%233b3b3b&clientId=u088972ae-4aa2-4&from=paste&id=u1b61d354&originHeight=64&originWidth=98&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ub3a3989f-54e8-4354-94c1-22bcfa088c6&title=)
### 材料特性
`Material Properties`让你玩的材料：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697457467-a30bca99-cbe7-4705-bc9f-dea4ffe8ff8d.png#averageHue=%23353535&clientId=u088972ae-4aa2-4&from=paste&id=u67e5b4f6&originHeight=72&originWidth=96&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uc228770d-11d8-4ade-b85f-c9d8eb57290&title=)
默认情况下，您可以访问一种名为`Material `的材质，如果您没有删除它，它应该应用于默认立方体：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697457615-b08fec91-3386-46d8-a2ba-7381e19389cf.png#averageHue=%23494949&clientId=u088972ae-4aa2-4&from=paste&id=u4246222c&originHeight=306&originWidth=494&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3c59748c-fd4b-4314-ae8a-99e0fcb8bbb&title=)
您可以使用按钮移除材料-并将它们与按钮组合+，但我们通常每个网格只使用一种材料：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697458385-64797302-f463-4d0c-958b-9ad1b2c73657.png#averageHue=%234d4d4d&clientId=u088972ae-4aa2-4&from=paste&id=ufd7e989c&originHeight=140&originWidth=100&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ua59141f8-f631-4354-a3e9-0362835e137&title=)
如果网格上没有材质，我们可以选择一个现有的，或者我们可以使用按钮创建一个新的New：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697458757-b78379b7-8342-4a2c-a989-1f83e2db4213.png#averageHue=%23434343&clientId=u088972ae-4aa2-4&from=paste&id=uc4287250&originHeight=226&originWidth=970&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u7f68169d-d938-4439-a811-26d2dfe03bc&title=)
对于一种材料，我们可以有不同类型的表面。默认的`Principled `一个被调用`BSDF`，这种类型的表面使用 `PBR` 原则，就像 `MeshStandardMaterial`[在](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial)Three.js 中所做的那样。这意味着如果我们将这种材质导出到 Three.js 场景，我们应该会得到非常相似的结果。
我们不会在本课中看到其他类型的材料。
## 渲染引擎 
转到`Render Properties`选项卡：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697459972-70345f87-3cf4-445f-b328-874733592878.png#averageHue=%23444444&clientId=u088972ae-4aa2-4&from=paste&id=u1fa95c35&originHeight=66&originWidth=104&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u37093d66-90db-49f7-9d28-1fc64549669&title=)
在此面板中，我们可以更改`Render Engine`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697463358-481afc3a-62e8-49fb-a4c3-ef3473069de3.png#averageHue=%234b4b4b&clientId=u088972ae-4aa2-4&from=paste&id=u6b382ebd&originHeight=118&originWidth=496&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ubd86bf20-a759-4d41-aa3d-2e3cfc8b3c6&title=)
有 3 种类型的渲染引擎：

- `Eevee`：实时渲染引擎。它像 Three.js 一样使用 GPU，性能非常好，但它有一些局限性，例如真实感、光反射、反射和折射。
- `Workbench`：我们不再经常使用的遗留渲染引擎。它的性能非常好，但结果不是很现实。
- `Cycles`: 光线追踪引擎。这很现实。它可以处理光反射、深度反射、深度折射和许多其他功能，但它非常缓慢，您可能需要等待数小时甚至数天才能渲染您的场景。

您可以更改此属性并查看场景中是否有任何变化。确保使用`Renderer`阴影 — 按`Z`更改阴影。Blender 开发人员在渲染引擎之间保持非常相似的结果方面做得非常出色。
默认的是`Eevee`，在我们的例子中它是完美的，因为它是实时渲染，Three.js 也是实时渲染。
如果要渲染场景，请按`F12`。渲染将从相机中看到 - 确保相机在您的场景中定位良好。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697463295-9a162edd-5798-415c-91f0-f109cd37ee19.png#averageHue=%234a4a4a&clientId=u088972ae-4aa2-4&from=paste&id=u15e851c1&originHeight=1376&originWidth=2118&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u88b9e3f2-482b-4089-baa4-e9f0b7397f9&title=)
## 搜索
有太多可能的动作，我们不记得如何触发它们。当我们想不通按钮在哪里时的正确解决方案，或者快捷方式是使用面板`Search`。
要打开`Search`面板，请按`F3`（您可能需要添加fn键，具体取决于您的键盘和操作系统）并输入操作名称：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697464198-91900048-18e7-4fe8-8819-0f238cf1da87.png#averageHue=%233b3b3b&clientId=u088972ae-4aa2-4&from=paste&id=u2ece4099&originHeight=604&originWidth=1138&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ucaa41894-319a-4cea-8071-c9b68447cbd&title=)
## 保存我们的设置
创建一个可靠的设置。这取决于你，但因为我们使用 Blender 为 Three.js 导出，所以我们不需要相机。我们还可以在`3D Viewport`带有阴影的`Z``Y`轴上的`Wireframe`主视图下方创建两个侧视图：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697464518-76cbb2f6-a3a6-4e4d-b460-c60b5cf826b9.png#averageHue=%23424242&clientId=u088972ae-4aa2-4&from=paste&id=u6c7a59c8&originHeight=1920&originWidth=3072&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8d9833f4-bb93-4d27-bde3-c73f8fb9dc2&title=)
对设置满意后，转到`File` > `Defaults` >` Save Startup File`。这会将您当前的设置设置为打开 `Blender` 时的默认设置：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697464547-0715f60c-a500-4fb2-92d5-6e8fc10a3cf2.png#averageHue=%233e3e3e&clientId=u088972ae-4aa2-4&from=paste&id=u06d2db93&originHeight=894&originWidth=796&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u2deb76f1-e9a9-434f-8424-9401cd5149a&title=)
点击时要小心`Save Startup File`；确认菜单应该打开，如果您将鼠标移出它，您将失去它。再次点击确认：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697466458-2ddef06c-7766-47fc-998b-5e7bffe13ce6.png#averageHue=%23435922&clientId=u088972ae-4aa2-4&from=paste&id=u5fd181d0&originHeight=184&originWidth=428&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0fa1164d-b44e-4ae2-9e0c-d40c43a5203&title=)
## 汉堡时间
是时候创建我们自己的模型了。在本课中，我们将制作一个汉堡包并将其导入 Three.js。
就像在 Three.js 中一样，一个好的做法是决定单位比例。如果您查看网格，一个正方形真正代表一个单位，默认情况下，Blender 认为一个单位表示一米：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697466905-61b7f7da-8764-4266-88d5-45e712738dac.png#averageHue=%23464646&clientId=u088972ae-4aa2-4&from=paste&id=ud563efd2&originHeight=172&originWidth=374&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ub4ee7f24-8502-4b10-960c-f057d60737f&title=)
我们可以制作一个巨大的汉堡包，但抱歉，我们最好从普通大小的三明治开始。我们可以认为`1m`是`1cm`，但如果您不喜欢看到它，您可以通过选择`Scene Properties`作为我们的`PropertiesNoneUnit System`在该区域的选项卡中将其删除：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697467611-351ef205-8a4e-4880-a430-1fedca17579b.png#averageHue=%233d3d3d&clientId=u088972ae-4aa2-4&from=paste&id=u1992afd6&originHeight=272&originWidth=530&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf0ee096a-de51-453a-901e-a049b5747b4&title=)
我们现在可以认为`1`是`1cm`。
### 汉堡包的底部面饼
对于我们的底部面饼，听起来可能很奇怪，我们将从一个 10 厘米的立方体开始：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697467984-2d212411-a35d-4c50-8bc5-7c6473c02c52.png#averageHue=%233a3a3a&clientId=u088972ae-4aa2-4&from=paste&id=uc1c401d4&originHeight=268&originWidth=634&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3e093cea-4d06-4d1d-bdd2-3f94c2815e6&title=)
然后，在确保我们的立方体处于活动状态后，转到`Modifier Properties`选项卡并添加`Subdivision Surface`修饰符：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697469534-8b2505cb-82a5-40a6-ae82-165273bce975.png#averageHue=%232b2e1e&clientId=u088972ae-4aa2-4&from=paste&id=ue293df72&originHeight=216&originWidth=630&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u294cac34-cf63-4f5c-a8e3-be406621445&title=)
立方体现在有点像球体。
`Subdivision Surface`是最著名的修饰符之一。它细分了几何体，但同时平滑了角度。
在字段中添加更多细分`Subdivisions` > `viewport`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697469572-25a98a3a-0f17-4e6b-9236-e1dd3b0a1487.png#averageHue=%23525252&clientId=u088972ae-4aa2-4&from=paste&id=u0072f21b&originHeight=196&originWidth=292&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u48fae9dd-1448-49a6-9201-eeea6543091&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697470645-69628c59-5636-42ea-b5f7-eedd70a86fee.png#averageHue=%233f3f3d&clientId=u088972ae-4aa2-4&from=paste&id=uf8eec4fe&originHeight=1056&originWidth=1258&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u7d2b7c83-1980-4053-a08e-68cd3e4adca&title=)
面是平的，但我们想要一个光滑的表面。为此，请右键单击球体并选择`Shade Smooth`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697471180-c5df28fa-3d72-45f1-86a1-b1df0c521e97.png#averageHue=%23818384&clientId=u088972ae-4aa2-4&from=paste&id=u068ec368&originHeight=264&originWidth=630&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ub039a435-9ac7-40f1-a5a1-7d47c1e4867&title=)
使用修改器的好处是您可以保留原始几何体。通过`Edit Mode`按下`g`并移动顶点 ，直到您在地面上方看到鹅卵石：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697472368-cb5d56de-3453-430a-8af4-3f6903082682.png#averageHue=%2352504e&clientId=u088972ae-4aa2-4&from=paste&id=u68a72117&originHeight=898&originWidth=1502&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u4eabdec4-0800-4eb4-a768-8d82ddcee3c&title=)
所以它仍然不是面包。为了得到正确的形状，我们必须在发髻的边缘添加更多的顶点。我们需要的是循环切割。按下`CTRL + R`并在`Edit Mode`四个垂直边缘之一上移动鼠标：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697472820-3bb2ac7d-7974-4e25-a605-2bea2fb74dff.png#averageHue=%23484848&clientId=u088972ae-4aa2-4&from=paste&id=u622eaf0a&originHeight=722&originWidth=1486&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3783bb5b-9d24-404c-85f3-ede1469fe07&title=)
单击一次以创建切口，但不要再次单击。此时，您可以上下移动循环剪切。将循环切割更靠近顶部边缘：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697472800-f9825b7e-6def-402e-80c2-02d947f3e90d.png#averageHue=%2341403f&clientId=u088972ae-4aa2-4&from=paste&id=u709ff35d&originHeight=656&originWidth=1348&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf6273e11-1986-4a55-a272-896d701c494&title=)
对面包的下部重复该过程。我们希望我们的面包在底部是平的，但不要太平：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697474062-3ca8fc3c-a0dc-4ac9-9272-c245cbf4701e.png#averageHue=%233e3e3e&clientId=u088972ae-4aa2-4&from=paste&id=u32d0d03b&originHeight=706&originWidth=1652&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0edfd7bb-c7ac-4fca-ae0e-60d3a9c8916&title=)
改进你的发髻，直到你满意为止，但不要花太多时间在上面。别担心，一旦我们有了整个场景，我们就会回来。
### 节省
是时候保存了。按`CMD + S`（`CTRL + S`在 Windows 上）或转到`Files > Save`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697474121-6e4636e9-1d1b-4279-ba7c-2eedebd0e607.png#averageHue=%23323232&clientId=u088972ae-4aa2-4&from=paste&id=uf590e075&originHeight=368&originWidth=434&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uc7cad920-ea4d-466c-a85e-227ec04405a&title=)
保存在任何你想要的地方。
如果您进行了一些更改并再次保存，您将在与`.blend`原始文件相同的文件夹中看到一个文件`.blend1`。这是 Blender 自动生成的最新保存的备份。曾经有一段时间 Blender 不像今天这样稳定。保存文件可能会导致文件损坏。这就是他们创建这些自动备份的原因。今天，Blender 非常稳定，但他们保留备份以防万一，或者因为用户可能会犯错误，例如删除对象、保存和关闭 Blender。幸运的是，您只需重命名该.blend1文件.blend即可访问您之前的保存。
### 肉
对肉重复相同的过程。`SHIFT + D`您还可以使用 `Object Mode`（默认）复制底部发髻
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697475516-e2df3c0e-b7b5-45ad-b6af-12c04af54cd5.png#averageHue=%23434b31&clientId=u088972ae-4aa2-4&from=paste&id=ua0bb9265&originHeight=676&originWidth=1434&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u35a964e5-de80-43b7-a315-f210236ef2a&title=)
不要忘记保存。
### 奶酪
对于奶酪，从肉正上方的平面开始：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697476145-57eb7abd-0d69-43f7-a7e5-d7127d60fec6.png#averageHue=%23c5870d&clientId=u088972ae-4aa2-4&from=paste&id=ube629b57&originHeight=652&originWidth=1030&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0e625485-74b5-4f86-8c68-ed00bcdc70c&title=)
转到`Edit Mode`（您可以在此处编辑顶点、边和面）并细分几何体。选择唯一的面，右键单击它并选择`Subdivide`。设置`Number of Cuts`为`10`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697476073-f1ce0190-e9b6-481f-9bc8-f58589552805.png#averageHue=%2355504d&clientId=u088972ae-4aa2-4&from=paste&id=u4214f904&originHeight=784&originWidth=1392&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u4e1bf673-4def-40cf-a477-abdbaeacbd5&title=)
我们要把奶酪角融化。
当我们还在的时候`Edit Mode`，选择一个奶酪角。如果我们一次移动一个顶点，会花费很长时间，而且结果可能看起来令人失望。我们能做的就是使用`Proportional Editing`. 按`O`“字母”或单击顶部中心的图标`3D Viewport`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697477356-62d9f434-a1a7-440f-b5bc-0e9db3d734ac.png#averageHue=%23434343&clientId=u088972ae-4aa2-4&from=paste&id=u044c1373&originHeight=314&originWidth=674&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue42648c4-e90a-4775-addc-dddca7e0544&title=)
现在 `Proportional Editing`已激活，变换一个顶点也会变换相邻顶点。`WHEEL`按下变形键后使用增加效果区域——就像`G`移动一样：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697477659-7273b170-e89b-4902-9819-83be1e69461d.png#averageHue=%23454545&clientId=u088972ae-4aa2-4&from=paste&id=u29eff401&originHeight=754&originWidth=1122&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ub4205d2d-2f6c-4b82-aa2f-f3f942e7bc2&title=)
相邻顶点移动的方式不正确。要更改它，请单击`Proportional Editing Falloff`图标并选择`Sharp`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697478364-4510312d-9b3d-4aaf-9b0f-ebcaeff05e3e.png#averageHue=%23494949&clientId=u088972ae-4aa2-4&from=paste&id=u1c0af83b&originHeight=474&originWidth=550&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ufad1fc75-961b-4123-93e6-54818844d2b&title=)
现在调整顶点和`Proportional Editing`大小，直到得到漂亮的俗气形状：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697479627-7a8b2594-bc25-47d4-90bf-ea527055e2f8.png#averageHue=%23a67719&clientId=u088972ae-4aa2-4&from=paste&id=u8ef4edbf&originHeight=696&originWidth=1228&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u214bf0cb-96f0-40ce-a692-ca39421cfc7&title=)
在`Object Mode` 中，右键单击并选择`Shade Smooth`平滑表面：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697480471-ef6816f8-e428-49d6-995a-cfa9eeddc003.png#averageHue=%23645023&clientId=u088972ae-4aa2-4&from=paste&id=u68ddbac7&originHeight=708&originWidth=1292&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3d3c8190-5a3b-43a5-b445-ee99ca8bb3c&title=)
我们的奶酪看起来不够厚。要解决这个问题，请转到`Modifier Properties`并添加`Solidify`修饰符：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697481585-53885180-525e-4eb2-bdb3-cfe4b9d63358.png#averageHue=%232a311d&clientId=u088972ae-4aa2-4&from=paste&id=u5c6506e1&originHeight=240&originWidth=636&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue8c100b9-44d0-4146-b837-c3e27cc0d74&title=)
然后将厚度增加到0.08：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697481564-c49983d5-828e-4eb8-9a55-981af74cb528.png#averageHue=%23505050&clientId=u088972ae-4aa2-4&from=paste&id=ue85c6701&originHeight=190&originWidth=294&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u00ddc1f1-8005-4e3e-bd90-7352a9de76a&title=)
如果您想更加欣赏结果，请将阴影更改为线框 — 按`Z`打开着色轮菜单：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697482687-27e3cfce-15ad-46f2-a58e-97239cde8ac3.png#averageHue=%23474038&clientId=u088972ae-4aa2-4&from=paste&id=ud1fd7224&originHeight=930&originWidth=1698&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uea0c5122-60f1-4894-9646-4a1e28bca48&title=)
不要听起来太挑剔，但是`Shade Smooth`边缘看起来有点奇怪：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697483064-b723d96d-09a7-4bd8-9361-2cce1680529e.png#averageHue=%238f9192&clientId=u088972ae-4aa2-4&from=paste&id=uc595bf2f&originHeight=580&originWidth=1248&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u55dcc142-e3ee-4bc0-88ca-e447f4f40c0&title=)
要解决此问题，请转到`Object Data Properties`面板，然后转到该`Normals`部分，然后检查`Auto Smooth`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697483959-31b280a9-30c1-4cce-aaef-c48dfb779f1b.png#averageHue=%23464646&clientId=u088972ae-4aa2-4&from=paste&id=u94038eae&originHeight=220&originWidth=564&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uc954c712-ff9e-4b6c-8920-6f1cad26179&title=)
只有当边缘的角度低于 30° 时，此功能才会使表面平滑。在这一点上，你应该得到一个逼真且开胃的融化奶酪：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697484543-e04b049c-ff63-4905-83c9-1f59a867c3b2.png#averageHue=%238c8e8f&clientId=u088972ae-4aa2-4&from=paste&id=u6f0256dd&originHeight=650&originWidth=1158&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=udafadb35-78d1-4fa8-aeb8-fd1cc14d187&title=)
### 顶包子
像添加底部面包一样添加顶部面包，但使其更圆：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697485162-bae08531-30fb-4129-9e25-bc0c75742d05.png#averageHue=%234e682c&clientId=u088972ae-4aa2-4&from=paste&id=ua694fe1b&originHeight=784&originWidth=1432&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8d718a67-98a1-4a0f-93b0-ee7a1fbfae9&title=)
### 最后的调整
现在我们有了所有的成分，我们可以固定比例，回到以前的成分，改善整体形状。
不要忘记保存。
### 材料
是时候给我们的汉堡添加一些颜色和表面特性了。为简单起见，我们不会应用纹理或使用绘画。
我们需要 3 种材料——一种用于面包，一种用于肉，一种用于奶酪。
选择底部的面包并转到`Material Properties`面板：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697485982-a638db37-819c-4df1-95c4-883ee6f59226.png#averageHue=%233e3e3e&clientId=u088972ae-4aa2-4&from=paste&id=u44c7d317&originHeight=66&originWidth=146&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u91ce1891-850b-4054-9126-35ed404237f&title=)
你应该没有与发髻相关的材料。如果有，请单击它并按下按钮-。
要创建新材料，请单击按钮`New`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697486939-fbb26e22-5889-41fe-a548-8ae7affc7669.png#averageHue=%23484848&clientId=u088972ae-4aa2-4&from=paste&id=u54ea2832&originHeight=318&originWidth=536&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ub456eb1d-fa1b-41b7-be7f-2abe83c81de&title=)
重命名材料是一种很好的做法。双击它的名字并调用它`BunMaterial`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697487915-5f78d545-fa14-4e81-9298-4c88fcfb3677.png#averageHue=%23434343&clientId=u088972ae-4aa2-4&from=paste&id=ua693ada9&originHeight=90&originWidth=362&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u03e447b8-6856-4d0a-a8ac-9a8ca898220&title=)
现在，调整属性以获得美味的颜色。我们只需要更改`Base Color`和`Roughness`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697489104-a968bd0f-5089-4cd8-8df1-3bd5855397b0.png#averageHue=%23d9c545&clientId=u088972ae-4aa2-4&from=paste&id=uefeca056&originHeight=1116&originWidth=510&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u99fdb951-a062-4e80-85fc-acf23549127&title=)
如果您看不到 上的颜色`3D Viewport`，可能是因为您没有使用正确的阴影。要更改阴影，请按`Z`并选择`Renderer`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697489545-5c1b8f96-a85b-4818-9c4e-e7d25e604b53.png#averageHue=%23646058&clientId=u088972ae-4aa2-4&from=paste&id=u9f3bdd1c&originHeight=762&originWidth=1506&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8fae2bef-e7e8-473a-8352-a29e54a1e7d&title=)
如果汉堡看起来真的很黑，那可能是因为光线的原因。选择灯，将其放置在距离汉堡包稍远的位置，转到`Object Data Properties`面板，并将其功率增加到`5000`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697489596-b0d9a1da-fbeb-436f-8685-f7a7742c056d.png#averageHue=%234c4c4c&clientId=u088972ae-4aa2-4&from=paste&id=uc849328c&originHeight=372&originWidth=534&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u45a2b34a-9df7-4061-a48d-4aadffb9db9&title=)
对肉和奶酪重复材料过程：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697489570-e0d1d624-0334-478f-9526-194967b08ba0.png#averageHue=%235c574f&clientId=u088972ae-4aa2-4&from=paste&id=u39621614&originHeight=694&originWidth=1236&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u892d4389-87fd-4dee-aaf1-6082050fe5a&title=)
对于顶部包子，您只需要选择BunMaterial您已经处理过的：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697491009-ddbe7642-4418-49a8-9f29-500643dabb1a.png#averageHue=%235b4e3e&clientId=u088972ae-4aa2-4&from=paste&id=u1cef3095&originHeight=746&originWidth=1284&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ucd5c2ded-fd14-4c8a-90e9-86673ac62dd&title=)
慢慢来，删除并重试，直到你得到一个看起来很美味的汉堡包。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697491584-c1002789-7904-4633-9e6f-d89f9e8c9678.png#averageHue=%23414140&clientId=u088972ae-4aa2-4&from=paste&id=udd518fee&originHeight=192&originWidth=616&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8c0e6bf1-40c9-4450-bc28-63c6da931ed&title=)
你甚至可以添加其他配料，如沙拉、西红柿，如果你是这些人中的一员，也许还可以加入泡菜片——但有人喜欢泡菜吗？
不要忘记保存。
## 导出
终于到了导出我们的汉堡包的时候了。下载并运行启动器。Three.js场景准备好了，剩下的就是提供模型了。
选择汉堡包的所有成分。如果您选择其他元素，如灯光或相机，您也可以导出它们。这可能有用，但对我们来说不是。
前往`File` > `Export` > `glTF 2.0 (.glb/.gltf)`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697492561-9b640a8f-104e-4f13-8bbe-6fc2c3009a32.png#averageHue=%23403f3e&clientId=u088972ae-4aa2-4&from=paste&id=u57c34076&originHeight=1038&originWidth=1068&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud76ec533-f649-4f17-81e3-6bfc0abee4e&title=)
面板应该在屏幕中间打开。使用它导航到`/static/models/`项目的文件夹（`.gitkeep`如果看到该文件，请忽略它）。
在面板的底部，为您的文件选择一个名称。我们会去的`hamburger`。不要添加扩展名：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697492780-f595156e-aef3-4046-8668-c3615edbd412.png#averageHue=%23323130&clientId=u088972ae-4aa2-4&from=paste&id=u0dbebb4d&originHeight=126&originWidth=342&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u07d33835-c00d-45ca-a735-ecd33d74158&title=)
在右侧部分，我们可以选择`Format`. 这些选择对应于我们在上一课中讨论的 `GLTF` 格式。我们会这样做，`glTF Binary`因为我们没有任何纹理，我们想要尽可能小的文件：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697492857-814b8be1-745b-4006-a2e9-bcecad8ee873.png#averageHue=%233b3b3b&clientId=u088972ae-4aa2-4&from=paste&id=u19702e0e&originHeight=420&originWidth=668&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3731224a-80a9-4b08-af76-615349da0b8&title=)
对于其余属性，这里是设置：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697494196-7eec25dc-2099-47b8-831d-a3cdbbbd03b6.png#averageHue=%23414141&clientId=u088972ae-4aa2-4&from=paste&id=ue666e511&originHeight=1294&originWidth=472&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u02054b61-621b-4c89-90eb-21f29c88e64&title=)
其中大部分是显而易见的，但这是列表

- `Remember Export Settings`：下次导出时保留这些设置。
- 包括： `Selected Objects`：仅选定的对象。 `Custom Properties`: 我们可以添加到 Blender 中任何对象的文本信息，但我们没有添加任何内容。 `Cameras`: 相机。 `Punctual Lights`： 灯光。
- `Transform`: +Y `Up`：转换坐标轴，使正 Y 轴位于上方——Three.js 的默认属性。
- 几何：： `Apply Modifiers`应用修改器，如`Subdivision Surface`. 如果你不检查这个，你最终会得到原来的立方体而不是圆面包。 UVs：添加 UV 坐标。这些是 Three.js 和其他环境用于在几何体上应用纹理的坐标。因为我们没有纹理，所以不需要那些坐标。 `Normals`：每个面的外侧方向。如果我们想让灯正常工作，我们确实需要这个。 `Tangents`：与法线协同工作，但它们垂直于法线。` Vertex Colors`：与每个顶点关联的颜色。如果我们绘制顶点很有用，但我们没有。 `Materials`: 我们使用的不同材料。 `Compression`：传说中的天龙压缩。
- 动画： 与动画相关的所有内容，但我们不需要任何这些，因为我们没有动画。

单击`Export glTF 2.0`并检查文件。文件大小应该很小。尝试导出不带 的同一个汉堡包`compression`，它应该大得多。在实际项目中，这将是您必须在使用压缩版本和赢得一些kB加载整个 `Draco` 解码器或选择未压缩版本之间做出决定的时候。
只要我们有文件就没关系。
## 在 Three.js 中测试
运行项目并根据需要更改汉堡包路径：

```javascript
gltfLoader.load(
    '/models/hamburger.glb',

// ...
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697494710-f839e82a-ac48-493e-9e06-c6d1b3fee0b6.png#averageHue=%233f342b&clientId=u088972ae-4aa2-4&from=paste&id=u85acb73b&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u609221d0-e681-41c2-80f9-a97d8acce18&title=)
你应该在 Three.js 场景中看到你的汉堡。
遗憾的是，与 Blender 版本相比，我们的汉堡看起来太橙色了。这是由于 Three.js 设置，我们必须做一些调整。这将是下一课的主题，但是一旦您应用完我们将学习的功能，请随时回到您的汉堡。
## 走得更远
有很多很棒的在线教程，而且大部分都是免费的。以下是您可以使用的资源的非详尽列表：

- Blender Youtube 频道：[https://www.youtube.com/user/BlenderFoundation](https://www.youtube.com/user/BlenderFoundation)
- Blender Guru Youtube 频道：[https://www.youtube.com/channel/UCOKHwx1VCdgnxwbjyb9Iu1g](https://www.youtube.com/channel/UCOKHwx1VCdgnxwbjyb9Iu1g)
- Grant Abbitt Youtube 频道：[https://www.youtube.com/channel/UCZFUrFoqvqlN8seaAeEwjlw](https://www.youtube.com/channel/UCZFUrFoqvqlN8seaAeEwjlw)
- CGFastTrack：[https://www.youtube.com/c/CGFastTrack/videos](https://www.youtube.com/c/CGFastTrack/videos)
- CGCookie： https: [//cgcookie.com/](https://cgcookie.com/)

确保始终遵循至少使用 2.8 版 Blender 的教程。

# **25. **Environment map环境图
## 介绍 [00:00](https://threejs-journey.com/lessons/environment-map#)
我们已经在上一课中讨论了环境贴图。
场景周围的图像可以用作背景，但也可以直接在对象上用作反射和照明。是的，你没看错，环境贴图可以用来以非常逼真的方式照亮整个场景。
在本课程中，我们将发现环境贴图的不同格式以及实现它们的各种技术。
我们还将探索如何使用 Blender 和人工智能驱动的图像生成器等资源查找和生成这些环境地图。
## 设置 [00:56](https://threejs-journey.com/lessons/environment-map#)
我们将使用具有许多细节和材质变化的真实模型，以便欣赏我们要测试的不同环境地图。我们将使用[GLTF 示例模型存储库](https://github.com/KhronosGroup/glTF-Sample-Models)中的[飞行头盔](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/FlightHelmet)，您可以在文件夹中找到它。**/static/models/**
目前，场景中只有一个白色圆环结和一个 Dat.GUI 实例。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688201196642-b10786c7-ac90-4886-b4c4-c3f19ff673ab.png#averageHue=%23111111&clientId=u575691ba-6ebc-4&from=paste&id=uce11f908&originHeight=960&originWidth=1536&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uda420a9f-1f1d-4efa-9843-1a281f86b6d&title=)
## 模型 [02:00](https://threejs-journey.com/lessons/environment-map#)
让我们加载我们的模型。
首先，实例化[GLTFLoader](https://threejs.org/docs/index.html#examples/en/loaders/GLTFLoader)。导入后我们将立即将不同的装载机重新组合在一起。这样做的主要原因是能够将事物重新组合在一起：

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
```
**JavaScript**
**复制**
我们不需要[DRACOLoader](https://threejs.org/docs/index.html#examples/en/loaders/DRACOLoader)，因为模型未压缩。但是，如果您加载 Draco 压缩模型，请像我们在上一课中所做的那样实例化[DRACOLoader 。](https://threejs.org/docs/index.html#examples/en/loaders/DRACOLoader)
我们现在可以加载位于以下位置的模型**/static/models/FlightHelmet/glTF/FlightHelmet.gltf**：

```javascript
/**
 * Models
 */
gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) =>
    {
        console.log('success')
        console.log(gltf)
    }
)
```
**JavaScript**
**复制**
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688201197677-2274f2aa-ee85-4330-b2c7-683e65a5a31d.png#averageHue=%23242527&clientId=u575691ba-6ebc-4&from=paste&id=uacb93b0d&originHeight=960&originWidth=1536&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uabef4983-8223-49bc-956b-60ad400e4c5&title=)
一如既往，慢慢来，确保模型加载良好且没有任何错误。
因为它是一个复杂的模型，我们只需将该**gltf.scene**组添加到我们自己的模型中即可**scene**：

```javascript
gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) =>
    {
        scene.add(gltf.scene)
    }
)
```
**JavaScript**
**复制**
看不到吗？将相机移到白色圆环结下方，您应该可以看到头盔的轮廓。
该模型太小，但也是全黑的，因为它的材质是**MeshStandardMaterial**实例，并且需要光线。
我们将在一分钟内添加照明，但现在让我们将模型放大：

```javascript
gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(10, 10, 10)
        scene.add(gltf.scene)
    }
)
```
**JavaScript**
**复制**
## 立方体纹理环境贴图 [05:46](https://threejs-journey.com/lessons/environment-map#)
首先，我们将使用立方体纹理。实际上我们已经在之前的课程中这样做过，但是练习总是好的，而且这会是一个很好的提醒。
### 加载纹理
该文件夹中有多个环境贴图纹理**/static/environmentMaps/**。
、**0/**和文件夹包含取自[https://polyhaven.com](https://polyhaven.com/)的[HDRI 部分](https://polyhaven.com/hdris)**1/**的环境贴图，它们已使用[https://matheowis.github.io/HDRI-to-CubeMap/](https://matheowis.github.io/HDRI-to-CubeMap/)转换为立方体纹理。**2/**
我们将使用**0/**文件夹中的第一个。
因为这些纹理由 6 个图像组成（就像立方体的面），所以我们必须使用[CubeTextureLoader](https://threejs.org/docs/index.html#api/en/loaders/CubeTextureLoader)。
将[CubeTextureLoader](https://threejs.org/docs/index.html#api/en/loaders/CubeTextureLoader)添加到我们的加载器中：

```javascript
/**
 * Loaders
 */
// ...
const cubeTextureLoader = new THREE.CubeTextureLoader()
```
**JavaScript**
**复制**
现在我们可以加载纹理了。顺序是**positive x**, **negative x**, **positive y**, **negative y**,**positive z**和**negative z**。
创建后添加这些参数**scene**：

```javascript
/**
 * Environment map
 */
// LDR cube texture
const environmentMap = cubeTextureLoader.load([
    '/environmentMaps/0/px.png',
    '/environmentMaps/0/nx.png',
    '/environmentMaps/0/py.png',
    '/environmentMaps/0/ny.png',
    '/environmentMaps/0/pz.png',
    '/environmentMaps/0/nz.png'
])
```
**JavaScript**
**复制**
应该没有任何改变，因为我们正在加载环境贴图，但我们还没有使用它。
检查日志是否存在潜在错误。
### 使用环境贴图作为背景
要将环境贴图添加到场景的背景中，我们可以在场景周围创建一个巨大的立方体，将其面设置为在内部可见，然后将纹理应用到它。它应该可以工作并且看起来不错，但是它的功能非常有限并且只能作为背景。
相反，让我们使用 Three.js 功能。
要将环境贴图应用到场景，请将 分配**environmentMap**给[Scene](https://threejs.org/docs/index.html#api/en/scenes/Scene.background)的**background**属性。确保在创建第一个后执行此**environmentMap**操作**scene**：

```javascript
scene.background = environmentMap
```
**JavaScript**
**复制**
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688201196091-29428d26-e2a6-4807-be7d-f0dd9f9ff257.png#averageHue=%23604435&clientId=u575691ba-6ebc-4&from=paste&id=u4c7ed439&originHeight=960&originWidth=1536&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uc6951aaf-4c08-4995-9ac9-59f73721aa5&title=)
现在我们可以区分模型了，让我们将环面结移到一边：

```javascript
const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
    new THREE.MeshBasicMaterial()
)
torusKnot.position.x = - 4
torusKnot.position.y = 4
scene.add(torusKnot)
```
**JavaScript**
**复制**
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688201197682-7b92bcee-1806-4612-8bed-06d5b9b919f2.png#averageHue=%23644737&clientId=u575691ba-6ebc-4&from=paste&id=ud74ea217&originHeight=960&originWidth=1536&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u011babfa-cebe-477f-8bf3-8ca7c782787&title=)
并将结的材质改为a **MeshStandardMaterial**，以便我们可以在光滑的表面上欣赏环境贴图。使用以下设置：

```javascript
const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
    new THREE.MeshStandardMaterial({ roughness: 0.3, metalness: 1, color: 0xaaaaaa })
)
torusKnot.position.x = - 4
torusKnot.position.y = 4
scene.add(torusKnot)
```
**JavaScript**
**复制**
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688201197827-99baec02-85d3-4c1e-9e89-d679473df653.png#averageHue=%236a4e3c&clientId=u575691ba-6ebc-4&from=paste&id=u2c0046d0&originHeight=960&originWidth=1536&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9d61c518-3009-4bb5-8370-2d73a6f2e92&title=)
### 使用环境贴图照亮模型
获得真实渲染的一项基本功能是使用我们的环境贴图来照亮我们的模型。
在上一课中，我们已经介绍了如何使用属性将环境贴图应用到[MeshStandardMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial.envMap)**envMap**。
要将环境贴图作为照明应用于整个场景，我们可以将其分配给**environment**的属性**scene**（与 相同**background**）：

```javascript
scene.environment = environmentMap
scene.background = environmentMap
```
**JavaScript**
**复制**
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688201226242-7da9d6b8-22cc-4048-a56b-0f1da8b40e02.png#averageHue=%235f4736&clientId=u575691ba-6ebc-4&from=paste&id=u050301e3&originHeight=960&originWidth=1536&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u6eb44b40-782f-42f5-8fb1-6a31d71f192&title=)
就是这样。我们终于可以看到我们的模型了。看看我们实现的漂亮而真实的照明。反射、光照和阴影与环境图中的图片完美匹配。
您可以使用其他两个环境贴图进行测试，看看照明有多么不同：

```javascript
const environmentMap = cubeTextureLoader.load([
    '/environmentMaps/1/px.png',
    '/environmentMaps/1/nx.png',
    '/environmentMaps/1/py.png',
    '/environmentMaps/1/ny.png',
    '/environmentMaps/1/pz.png',
    '/environmentMaps/1/nz.png'
])
```
**JavaScript**
**复制**
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688201247465-0f236565-61f0-4d4b-a3e4-5bd452b8f80e.png#averageHue=%23582f1e&clientId=u575691ba-6ebc-4&from=paste&id=u5231bd29&originHeight=960&originWidth=1536&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue35fc317-5317-42d8-92d0-a0c9224ee05&title=)
或者：

```javascript
const environmentMap = cubeTextureLoader.load([
    '/environmentMaps/2/px.png',
    '/environmentMaps/2/nx.png',
    '/environmentMaps/2/py.png',
    '/environmentMaps/2/ny.png',
    '/environmentMaps/2/pz.png',
    '/environmentMaps/2/nz.png'
])
```
**JavaScript**
**复制**
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688201253030-03b0e275-177b-481f-ac56-08ddf3ef4f42.png#averageHue=%23332f0f&clientId=u575691ba-6ebc-4&from=paste&id=ua1f3c7f6&originHeight=960&originWidth=1536&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u1966b4c4-ceba-4cd5-880e-43c5c90ea26&title=)
让我们回到第一个环境贴图：

```javascript
const environmentMap = cubeTextureLoader.load([
    '/environmentMaps/0/px.png',
    '/environmentMaps/0/nx.png',
    '/environmentMaps/0/py.png',
    '/environmentMaps/0/ny.png',
    '/environmentMaps/0/pz.png',
    '/environmentMaps/0/nz.png'
])
```
**JavaScript**
**复制**
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688201253789-089f870d-560c-4aaf-a3a4-f065378a5b44.png#averageHue=%235f4736&clientId=u575691ba-6ebc-4&from=paste&id=ufaafee11&originHeight=960&originWidth=1536&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf5bd5393-f687-4742-a0b6-d3a4df7cdc3&title=)
它正在工作，但看起来有点暗。我们想稍微作弊一下并控制环境贴图的强度。
我们可以做到这一点，但必须在每种材料上完成。为了确保我们不会错过任何素材，我们将使用**traverse(...)**合适的强度来浏览整个场景并应用强度。
该**traverse(...)**方法可用于每个[Object3D](https://threejs.org/docs/index.html#api/en/core/Object3D)以及继承自它的类，例如[Group](https://threejs.org/docs/index.html#api/en/objects/Group)、[Mesh](https://threejs.org/docs/index.html#api/en/objects/Mesh)甚至[Scene](https://threejs.org/docs/?q=Scene#api/en/scenes/Scene)。
我们需要在模型加载后执行此操作，但我们不是直接在模型的加载成功回调函数中执行此操作，而是将其创建为单独的函数，稍后会派上用场**updateAllMaterials**。
在环境贴图和模型之前创建此函数：

```javascript
/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
    console.log('Traverse the scene and update all materials here')
}
```
**JavaScript**
**复制**
当模型加载并添加到场景时调用它：

```javascript
gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) =>
    {
        // ...

        updateAllMaterials()
    }
)
```
**JavaScript**
**复制**
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688201278451-64a19a3e-49fa-4f69-8058-044e9a859d9e.png#averageHue=%23657d90&clientId=u575691ba-6ebc-4&from=paste&id=ua5395e60&originHeight=960&originWidth=1536&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uc55c4765-5530-4059-bb7a-cb266c73fa6&title=)
现在，**traverse(...)**在场景中使用该方法，向其发送一个函数，并将唯一的参数记录为**child**：

```javascript
/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        console.log(child)
    })
}
```
**JavaScript**
**复制**
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688201302874-c87e94ea-df68-4b4e-8e1d-5e89429b864b.png#averageHue=%235b8592&clientId=u575691ba-6ebc-4&from=paste&id=u987dec50&originHeight=960&originWidth=1536&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u5abb5039-5e6f-4f37-9d60-2866dcd951f&title=)
您应该在日志中看到所有子项和孙项。
将环境贴图应用于灯光、相机、组等是没有意义的。我们只想将环境贴图应用于具有MeshStandardMaterial 的[网格](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial)[体](https://threejs.org/docs/index.html#api/en/objects/Mesh)。
我们能做的是测试 是否是 的**child**实例**THREE.Mesh**以及其材质是否是 的实例**THREE.MeshStandardMaterial**：

```javascript
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            console.log(child)
        }
    })
}
```
**JavaScript**
**复制**
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688201303185-56aa0660-708b-45ff-894b-765711f9bb94.png#averageHue=%235c7c89&clientId=u575691ba-6ebc-4&from=paste&id=ubbe0003b&originHeight=960&originWidth=1536&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u5893e9b4-632a-410a-b344-2b3debfc575&title=)
除了测试 if**child**是 的实例**THREE.Mesh**和**child.material**是 的实例之外**THREE.MeshStandardMaterial**，我们还可以分别测试**isMesh**属性 和**isMeshStandardMaterial**属性：

```javascript
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child.isMesh && child.material.isMeshStandardMaterial)
        {
            console.log(child)
        }
    })
}
```
**JavaScript**
**复制**
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1688201303041-3c03dda7-e00e-4f11-8fec-ca5c3c37fc7f.png#averageHue=%235c7c89&clientId=u575691ba-6ebc-4&from=paste&id=u57f2ecc9&originHeight=960&originWidth=1536&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue91638c5-f444-49cd-92eb-46c007ba717&title=)
我们现在只记录支持环境贴图的子项。让我们将其**envMapIntensity**属性更改**material**为**3**：

```javascript
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child.isMesh && child.material.isMeshStandardMaterial)
        {
            child.material.envMapIntensity = 3
        }
    })
}
```
**JavaScript**
**复制**

接下来，我们要**envMapIntensity**使用 Dat.GUI 来控制。
我们可以在以下内容中创建调整**traverse(...)**：

```javascript
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child.isMesh && child.material.isMeshStandardMaterial)
        {
            child.material.envMapIntensity = 3
            gui.add(child.material, 'envMapIntensity').min(0).max(10).step(0.001)
        }
    })
}
```
**JavaScript**
**复制**
但正如您所看到的，我们对每种受影响的材质进行了调整，这很不方便。
从以下位置删除调整**traverse(...)**：

```javascript
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child.isMesh && child.material.isMeshStandardMaterial)
        {
            child.material.envMapIntensity = 3
        }
    })
}
```
**JavaScript**
**复制**
相反，我们将像上一课中那样使用全局变量，仅调整一个属性并在场景中的每个子项上使用该值。
实例化 Dat.GUI 后，立即创建一个**global**变量并为其分配一个空对象：

```javascript
const gui = new dat.GUI()
const global = {}
```
**JavaScript**
**复制**
在环境贴图部分的开头，添加一个**envMapIntensity**属性**global**并为其创建一个调整：

```javascript
/**
 * Environment map
 */
// Global intensity
global.envMapIntensity = 1
gui.add(global, 'envMapIntensity').min(0).max(10).step(0.001)
```
**JavaScript**
**复制**
我们现在进行了**envMapIntensity**调整，但更改值并不会更新场景及其子场景。
现在，我们应该**updateAllMaterials**在调整值发生变化时调用该函数**onChange**：

```javascript
// Global intensity
global.envMapIntensity = 1
gui
    .add(global, 'envMapIntensity')
    .min(0)
    .max(10)
    .step(0.001)
    .onChange(updateAllMaterials)
```
**JavaScript**
**复制**
最后，回到，我们在材质上**updateAllMaterials**使用：**global.envMapIntensity**

```javascript
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child.isMesh && child.material.isMeshStandardMaterial)
        {
            child.material.envMapIntensity = global.envMapIntensity
        }
    })
}
```
**JavaScript**
**复制**
现在，我们只需直接在调试界面中进行一项调整即可更改每个[网格](https://threejs.org/docs/index.html#api/en/objects/Mesh)环境贴图的强度。
**1**暂时保留该值。
## 背景模糊度和强度 [23:23](https://threejs-journey.com/lessons/environment-map#)
现在我们有了工作环境图，让我们发现两个很酷的[场景](https://threejs.org/docs/?q=scene#api/en/scenes/Scene)属性。
第一个是**backgroundBlurriness**，顾名思义，这个 Scene 属性会模糊背景。我们可以把它放在设置实际环境贴图之前：

```javascript
scene.backgroundBlurriness = 0.2
```
**JavaScript**
**复制**

如果环境分辨率非常低或者您希望用户专注于前景中的对象，则此技术非常有用。
第二个 Scene 属性是**backgroundIntensity**，它将控制背景亮度：

```javascript
scene.backgroundBlurriness = 0.2
scene.backgroundIntensity = 5
```
**JavaScript**
**复制**

请小心，因为此属性仅控制背景，而不控制环境贴图强度。
与往常一样，我们可以将这些属性添加到 Dat.GUI 中：

```javascript
scene.backgroundBlurriness = 0.2
scene.backgroundIntensity = 5

gui.add(scene, 'backgroundBlurriness').min(0).max(1).step(0.001)
gui.add(scene, 'backgroundIntensity').min(0).max(10).step(0.001)
```
**JavaScript**
**复制**
现在，我们坚持使用默认值。我建议设置**backgroundBlurriness**to**0**和**backgroundIntensity**to **1**：

```javascript
scene.backgroundBlurriness = 0
scene.backgroundIntensity = 1
```
**JavaScript**
**复制**

## HDRI 等距矩形环境贴图 [25:43](https://threejs-journey.com/lessons/environment-map#)
如果您已签入该**/static/environmentMaps/**文件夹，您可能已经注意到这些**.hdr**文件。
单击**/static/environmentMaps/0/2k.hdr**，如果您的操作系统支持它，您将获得该环境贴图的预览（如果您没有获得预览，请不要担心，这并不意味着您不能在 Three.js 中使用它） 。
该文件有两个特定功能。
### 高动态范围
首先，文件扩展名是**.hdr**. HDR代表“高动态范围”（我们常说“HDRI”，其中“I”代表“图像”）。这意味着存储的颜色值的范围比传统图像高得多，这使得它非常适合存储亮度数据。
举个例子，如果你看一张明亮的灯的图片，它看起来会是白色的，如果你看一张太阳在后面的图片，它也会看起来是白色的。但它们的光度数据应该不同，因为太阳实际上比灯亮得多。HDR 图像将使差异变得清晰，而传统图像（如 JPG 或 PNG）则不会。
### 等长方形
其次，如果您检查预览，您会发现它只是一张包含周围 360° 视图的图片。
图片不仅仅是水平的，因为我们还可以看到天空和地板，尽管这些部分被拉伸了。
这种投影的正确名称是“等距矩形”。
请注意，HDR 环境贴图不一定是等角柱状投影，但情况经常如此，Three.js（与大多数 3D 软件包、库和引擎一样）支持这种投影。
### 加载和使用 HDRI
让我们首先评论旧的环境地图（同时，保留**backgroundBlurriness**和**backgroundIntensity**调整）：

```javascript
// // LDR cube texture
// const environmentMap = cubeTextureLoader.load([
//     '/environmentMaps/0/px.jpg',
//     '/environmentMaps/0/nx.jpg',
//     '/environmentMaps/0/py.jpg',
//     '/environmentMaps/0/ny.jpg',
//     '/environmentMaps/0/pz.jpg',
//     '/environmentMaps/0/nz.jpg'
// ])

// scene.background = environmentMap
// scene.environment = environmentMap
```
**JavaScript**
**复制**

我们将对环境贴图实现的每个版本进行评论，以便您只需取消注释该部分即可返回到它们。
接下来，我们需要使用**RGBELoader**.
**RGBELoader**像我们导入一样导入**GLTFLoader**：

```javascript
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
```
**JavaScript**
**复制**
“RGBE”代表“红绿蓝指数”，其中指数存储亮度。RGBE 是我们所说的“HDR”格式的编码，它证明了加载器名称的合理性，而不是**HDRLoader**.
使用其他加载器实例化它：

```javascript
/**
 * Loaders
 */
// ...
const rgbeLoader = new RGBELoader()
```
**JavaScript**
**复制**
使用它来加载**/environmentMaps/0/2k.hdr**文件：

```javascript
// HDR (RGBE) equirectangular
rgbeLoader.load('/environmentMaps/0/2k.hdr', (environmentMap) =>
{
    console.log(environmentMap)
})
```
**JavaScript**
**复制**

在回调函数中，将其**mapping**属性设置为**THREE.EquirectangularReflectionMapping**（因为它是前面提到的等距矩形纹理）并将其分配给 的**background**和**environment**属性**scene**：

```javascript
rgbeLoader.load('/environmentMaps/0/2k.hdr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environmentMap
    scene.environment = environmentMap
})
```
**JavaScript**
**复制**

场景感觉更明亮，对比度更高，渲染效果更真实。
### 缺点
虽然这些 HDR 纹理听起来很有吸引力，但它们的加载和渲染通常要重得多，这一点需要注意。
您可以通过使用较低的分辨率并模糊背景来缓解这种情况，以便用户不会注意到低分辨率。
## 使用 Blender 生成环境贴图 [33:35](https://threejs-journey.com/lessons/environment-map#)
[正如我们之前所看到的，我们可以从https://polyhaven.com](https://polyhaven.com/)的[HDRI 部分](https://polyhaven.com/hdris)获取一堆漂亮的 HDR 环境贴图，并且还有其他地方可以获取很酷的环境贴图。但有时，我们需要创建一个非常具体的环境地图，其中所有内容都准确地位于其应在的位置。
幸运的是，我们现在知道如何使用[Blender](https://blender.org/)（至少是基础知识），它是完成这项工作的完美工具。
以下部分是用**Blender 3.5.1**录制的。您可以使用更新的版本，但预计会有一些差异。您可以通过单击此链接下载我使用的相同版本[https://www.blender.org/download/previous-versions/](https://www.blender.org/download/previous-versions/)
请注意，虽然我会提醒您快捷键，但本课程假设您已经遵循了之前学习 Blender 的课程。并且不要忘记快捷方式是区域敏感的，这意味着您需要将鼠标悬停在与我使用快捷方式时相同的区域上。
### 项目设置
我们将从设置项目开始。首先，启动搅拌机。

#### 清除
删除场景中的所有内容。
按**A**选择所有内容并按**X**删除，然后单击提示确认：

#### 渲染引擎
在**Render Properties**选项卡中，将 切换**Render Engine**为**Cycles**：

**Eevee**本来可以做到这一点，但让我们选择最真实的渲染引擎。
#### 采样
仍然在**Render Properties**选项卡的 部分中，将和的分别**Sampling**设置为：**Max SamplesViewportRender256**

这将使渲染速度更快。根据您的计算机以及您愿意等待渲染完成的时间，随意调整这一点。
#### 背景
在**World Properties**选项卡的**Surface**部分中，将 设为**Color**全黑：

在这里设置颜色会在各处应用昏暗的灯光，这可能很有趣，但在我们的例子中并非如此。
#### 解决
在**Output Properties**选项卡的**Format**部分中，将分辨率设置为**2048x1024**：

尽管 WebGL 2（实际版本）支持两个纹理的非幂，但它被认为是很好的实践。这样我们就可以在其他软件中使用环境贴图了。
与采样值类似，您可以根据需要调整该值。为了节省一些时间，您可以更改**%**输入并将其设置为**50%**、**200%**或任何适合您的内容。
### 基本对象
接下来，在场景中心周围创建一些对象。这里的目标是快速预览相机所看到的内容。我们稍后会在现场进行工作。
按**SHIFT + A**并选择您要创建的对象，**G**对其进行移动、**S**缩放和**R**旋转。
在场景中心周围的每一侧放置一个不同的对象：

### 相机
我们现在可以添加一个新相机。
按**SHIFT + A**并选择**Camera**：

显示侧边栏**N**（如果尚不可见）：

选择相机后，从选项卡重置**Location**和。**Rotationitem**
然后将轴上的旋转设置**X**为**90°**：

在**Object Data Properties**选项卡的**Lens**部分中，将 设为 ，**Type**并**Panoramic**针对**Panorama Type**，选择**Equirectangular**：

顺便说一句，不要指望能够在 中看到全景视图的预览**Viewport**。仅在渲染时才能看到此投影。
### 第一缕曙光
按并在菜单中**SHIFT + A**创建灯光：**AreaLight**

将其移离中心，使其变大并向中心旋转（确切位置并不重要）：
在**Object Data Properties**选项卡的**Light**部分中，将其强度设置为**1000W**：

在**Object Properties**选项卡的**Visibility**部分中，选中**Camera**复选框以确保光源可见：

### 第一次渲染
是时候渲染场景了。
按**F12**，等待渲染完成，看看您会得到什么：

正如你所看到的，我们得到了一个漂亮的等距柱状投影渲染。
#### 另存为 HDR
**ALT + S**将鼠标悬停在渲染上时按下。
在底部选择一个名称。我们要去**blender-2k.hdr**。
对于**File Format**，选择**Radiance HDR**。
最后保存到**/static/environmentMaps/**文件夹中。

### 实施
虽然这不是一个非常有趣的环境地图，但我们可以在我们的 Three.js 项目中尝试一下。
更改我们已经加载的路径**/environmentMaps/blender-2k.hdr**：

```javascript
rgbeLoader.load('/environmentMaps/blender-2k.hdr', (environmentMap) =>
{
    // ...
})
```
**JavaScript**
**复制**
它正在发挥作用！
### 演播室灯光
我们可以创建一个具有炫酷效果、建筑物、行星等的完整场景，但这需要相当长的时间。相反，我们将创建一个简单但看起来很棒的工作室设置。
返回 Blender：通过选择所有对象（不是灯光）并按 来删除它们**X**。
我们将复制灯光两次，将一个光源设置为蓝色，另一个光源设置为橙色，并将它们放置在场景周围。
自己尝试一下。使用 复制**SHIFT + D**，确保灯转向中心，并将第二个灯的颜色设置为橙色，将第三个灯的颜色设置为蓝色。
再次渲染**F12**。

看起来很无聊？等待您在 Three.js 中看到结果。
使用 再次保存**ALT + S**，使用与之前相同的设置（**Radiance HDR**和**studio-2k.hdr**），替换以前的文件并重新加载页面。

由于图像很无聊，您可以停用背景，以便我们只享受灯光：

```javascript
rgbeLoader.load('/environmentMaps/studio-2k.hdr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    // scene.background = environmentMap
    scene.environment = environmentMap
})
```
**JavaScript**
**复制**
不要忘记将 Blender 文件保存在某个地方。
## 使用 NVIDIA Canvas 生成的 AI 环境 [53:42](https://threejs-journey.com/lessons/environment-map#)
如果我们可以要求人工智能为我们生成环境地图怎么办？
我们要使用的第一个解决方案是**NVIDIA Canvas**。
当我录制本课程时，该软件仍处于测试阶段，仅适用于 Windows，因此我们不会在其上花费太多时间。
如果您没有 Windows，您可以出于好奇而关注，但请坚持下去，因为紧随其后的是另一个人工智能工具。
### 设置
首先，从网站下载**NVIDIA Canvas **[https://www.nvidia.com/en-us/studio/canvas/](https://www.nvidia.com/en-us/studio/canvas/)
像任何软件包一样安装它并打开 NVIDIA Canvas 应用程序。
打开时，您可以在“标准”图像和“全景”图像之间进行选择。去拍全景：

NVIDIA Canvas 背后的理念是，您使用与视觉元素（云、草、河流、树木等）相对应的特定颜色粗略地绘制形状，软件将使用 AI 生成逼真的版本。
### 材料
在屏幕的右侧，有一个**Materials**部分包含可用的颜色/元素。
如果您需要材质的名称，请将鼠标悬停在它们上方。
此时，您可以选择材质并开始绘制：
### 工具
在屏幕左侧，您可以更改工具来绘制线条、擦除、选择材质、填充、更改画笔大小等。
### 风格
在 下方**Materials**，有一个**Styles**部分可以更改生成的全景图的样式。
如果您有点喜欢这种风格，但想测试变体，请使用滑块**Variation**：
### 尖端
请记住，由于它是等距矩形投影，因此画布的顶部和底部部分位于相机的正上方和下方。不要在那里添加太多细节：
您可以直接在生成的全景图中进行绘制：
您还可以使用像任何 2D 软件工具一样工作的图层。
但由于我们只是快速起草一个粗略的版本，我们往往会忘记我们处于哪一层，这意味着该功能不是很有用。
### 出口
当您对结果感到满意（不要太挑剔）时，单击导出按钮，将其命名为**nvidiaCanvas-4k.exr**，并将其保存在**/static/environmentMaps/**文件夹中（替换现有文件）。
### 实施
对于那些无法使用**NVIDIA Canvas 的用户，**生成的环境贴图已经可以在**/static/environmentMaps/nvidiaCanvas-4k.exr**.
您可能已经注意到扩展名是**.exr**而不是**.hdr**。
我们导出的文件也是关于存储的颜色范围的“HDR”图像，但编码不同。EXR 还可以存储图层并具有 Alpha 通道。
在我们的例子中，这并没有产生很大的区别，但我们仍然需要使用不同的加载器。
首先评论HDR（RGBE）版本：

```javascript
// // HDR (RGBE) equirectangular
// rgbeLoader.load('/environmentMaps/blender-2k.hdr', (environmentMap) =>
// {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping

//     // scene.background = environmentMap
//     scene.environment = environmentMap
// })
```
**JavaScript**
**复制**

**EXRLoader**然后像其他加载器一样导入并实例化它：

```javascript
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js'

/**
 * Loaders
 */
// ...
const exrLoader = new EXRLoader()
```
**JavaScript**
**复制**
使用它来加载**'/environmentMaps/nvidiaCanvas-4k.exr'**文件，设置**mapping**并将**THREE.EquirectangularReflectionMapping**其应用于**background**和**environment**：

```javascript
// HDR (EXR) equirectangular
exrLoader.load('/environmentMaps/nvidiaCanvas-4k.exr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environmentMap
    scene.environment = environmentMap
})
```
**JavaScript**
**复制**

### 想法
NVIDIA Canvas 仍处于测试阶段，该工具缺乏 HDR (RGBE) 导出、灯光管理、选择分辨率、能够绘制风景以外的内容等重要功能。另一方面，它确实有效，令人印象深刻，值得使用。密切关注。
在 Twitter 上关注[@NVIDIAStudio](https://twitter.com/NVIDIAStudio/)。
## 使用 BlockadeLabs AI 生成环境地图 [01:07:33](https://threejs-journey.com/lessons/environment-map#)
让我们继续我们的 AI 之旅，使用[BlockadeLabs的](https://www.blockadelabs.com/)[Skybox Lab](https://skybox.blockadelabs.com/)生成环境地图。
我必须警告您，您在屏幕上看到的内容可能与我录制本课程时想到的不同。该工具变化非常快，并且定期添加功能。
打开[Skybox 实验室](https://skybox.blockadelabs.com/)。由于它是一个网站，因此它应该适用于所有设备。
开箱即用，您已经获得了一张漂亮的环境地图。您可以拖放来移动相机，并使用鼠标滚轮来放大和缩小。
### 生成
如果您一直在使用人工智能，您可能会熟悉提示的概念。页面底部有一个文本输入，您可以在其中要求人工智能生成一些内容。而这一切只受你的想象力的限制。
请注意，我使用的提示可能会导致不同的输出，因为人工智能每次都会生成随机场景。
在文本输入的右侧，有一个选择输入，您可以在其中选择样式。
来吧，玩得开心，看看人工智能会带来什么。您可以询问物体、颜色、地点、一天中的时间等。
生成环境贴图可能需要相当长的时间。这取决于服务器及其繁忙程度，但通常需要等待 30 秒到 2 分钟。
以下是一些提示和样式的示例：
**neon city, orange lights, taxi**使用**Digital Painting**风格：

**castles at night**使用**Fantasy Land**风格：

**cozy wood cabin with cauldron and potions**使用**Interior Views**风格：

**white sky scrapers in clouds at day time**使用**SciFi**风格：

**japan streets with cherry blossom in summer, high contrast**使用**Anime Art Style**风格：

### 正在下载
一旦您对结果感到满意（再次强调，不要太挑剔），请单击按钮**download**。
文件夹中已提供一些生成的环境贴图**/static/environmentMaps/blockadesLabsSkybox/**。你也可以把你的放在那里。
### 实施
如您所见，生成的环境贴图是等距柱状投影 LDR 图像。我希望将来能看到 HDR，但目前 LDR 就可以了。
评论 HDR (EXR) 等距柱状投影：

```javascript
// // HDR (EXR) equirectangular
// exrLoader.load('/environmentMaps/nvidiaCanvas-4k.exr', (environmentMap) =>
// {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping

//     scene.background = environmentMap
//     scene.environment = environmentMap
// })
```
**JavaScript**
**复制**

由于它是一个简单的**.jpg**文件，我们可以使用**TextureLoader**.
实例化一个**TextureLoader**：

```javascript
/**
 * Loaders
 */
// ...
const textureLoader = new THREE.TextureLoader()
```
**JavaScript**
**复制**
用它来加载环境贴图：

```javascript
// LDR equirectangular
const environmentMap = textureLoader.load('/environmentMaps/blockadesLabsSkybox/anime_art_style_japan_streets_with_cherry_blossom_.jpg')
```
**JavaScript**
**复制**
将其设置**mapping**为**THREE.EquirectangularReflectionMapping**：

```javascript
environmentMap.mapping = THREE.EquirectangularReflectionMapping
```
**JavaScript**
**复制**
将其设置**colorSpace**为**THREE.SRGBColorSpace**：

```javascript
environmentMap.colorSpace = THREE.SRGBColorSpace
```
**JavaScript**
**复制**
您将在后面的课程中了解有关色彩空间的更多信息。
将其分配给 的**background**和**environment**属性**scene**：

```javascript
scene.background = environmentMap
scene.environment = environmentMap
```
**JavaScript**
**复制**

由于环境贴图位于 LDR 中，您可能需要增加默认**envMapIntensity**值**global**：

```javascript
global.envMapIntensity = 4
```
**JavaScript**
**复制**
### 更多功能
#### 深度
通过检查**Generate Depth**，并再次生成环境贴图，单击该**download**按钮还将下载灰度深度图（您可能必须允许浏览器下载多个文件）：


这可以用来创建视差效果、雾或任何你能想到的效果。但是，我们不会使用它。
#### 草图到天空盒
在左侧，您可以访问可用于直接在环境上绘制形状的工具。生成的元素将尝试匹配这些形状。
您可以在此处观看此 Sketch-to-skybox 功能的演示：[https://twitter.com/BlockadeLabs/status/1659263006415659008](https://twitter.com/BlockadeLabs/status/1659263006415659008)
这有点随机，但确保特定地点有物体可能很有趣。
### 想法
**Skybox Labs**生成的环境贴图绝对华丽，但您需要花一些时间尝试提示和样式才能掌握它的窍门。
**Blockade Labs**团队不断改进该工具，您甚至可以访问我录制本课程时尚未提供的新功能。
[保持好奇并在 Twitter上](https://twitter.com/blockadelabs)关注[@blockadelabs](https://threejs-journey.com/bd50b898727a47ccacf7b45d48094313?pvs=25)。
## 地面投影环境图 [01:20:57](https://threejs-journey.com/lessons/environment-map#)
使用环境贴图作为背景时最烦人的事情之一是物体看起来像是在飞行。这是因为环境贴图无限远。
我们可以在下面创建一个平面，并尝试使其看起来和感觉起来像是环境贴图的一部分，但有一个更好的解决方案，名为“地面投影天空盒”。
首先注释一下LDR等距矩形环境贴图：

```javascript
// // LDR equirectangular
// const environmentMap = textureLoader.load('/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg')
// environmentMap.mapping = THREE.EquirectangularReflectionMapping
// environmentMap.colorSpace = THREE.SRGBColorSpace

// scene.background = environmentMap
// scene.environment = environmentMap
```
**JavaScript**
**复制**

然后，让我们使用本课程开始时的 HDR 环境贴图之一，但仅用作**environment**（不是**background**）：

```javascript
// Ground projected skybox
rgbeLoader.load('/environmentMaps/2/2k.hdr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = environmentMap
})
```
**JavaScript**
**复制**

**envMapIntensity**减少全局**global**：

```javascript
global.envMapIntensity = 1
```
**JavaScript**
**复制**

### 实施
导入**GroundProjectedSkybox**类：

```javascript
import { GroundProjectedSkybox } from 'three/addons/objects/GroundProjectedSkybox.js'
```
**JavaScript**
**复制**
在环境贴图的回调函数中，实例化它，将 the**environmentMap**作为参数发送，并将其添加到场景中：

```javascript
rgbeLoader.load('/environmentMaps/2/2k.hdr', (environmentMap) =>
{
    // ...
    
    const skybox = new GroundProjectedSkybox(environmentMap)
    scene.add(skybox)
})
```
**JavaScript**
**复制**
我们确实在模型下方得到了一些东西，但它看起来更像是一个神奇的水晶球而不是天空盒。
使用以下方法使其变大**setScalar**：

```javascript
rgbeLoader.load('/environmentMaps/2/2k.hdr', (environmentMap) =>
{
    // ...
    
    const skybox = new GroundProjectedSkybox(environmentMap)
    skybox.scale.setScalar(50)
    scene.add(skybox)
})
```
**JavaScript**
**复制**
好多了。并检查地板与模型的配合情况。
**radius**我们可以使用和控制天空盒投影**height**，但由于结果相当不可预测，因此最好将这些值添加到 Dat.GUI：

```javascript
rgbeLoader.load('/environmentMaps/2/2k.hdr', (environmentMap) =>
{
    // ...

    gui.add(skybox, 'radius', 1, 200, 0.1).name('skyboxRadius')
    gui.add(skybox, 'height', 1, 100, 0.1).name('skyboxHeight')
})
```
**JavaScript**
**复制**
尝试不同的值并找到最适合环境贴图的值：

```javascript
rgbeLoader.load('/environmentMaps/2/2k.hdr', (environmentMap) =>
{
    // ...

    const skybox = new GroundProjectedSkybox(environmentMap)
    skybox.radius = 120
    skybox.height = 11

    // ...
})
```
**JavaScript**
**复制**
请注意，此技巧并不总是有效，特别是当环境贴图中心附近有对象时。
## 实时环境地图 [01:28:42](https://threejs-journey.com/lessons/environment-map#)
**environment**我想向您展示的最后一项技术是如何创建动态环境贴图，我们在每个帧上渲染场景并直接在 Three.js 中使用结果。
### 设置
首先评论地面投影的天空盒：

```javascript
// // Ground projected skybox
// rgbeLoader.load('/environmentMaps/2/2k.hdr', (environmentMap) =>
// {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping
//     scene.environment = environmentMap
    
//     const skybox = new GroundProjectedSkybox(environmentMap)
//     skybox.radius = 120
//     skybox.height = 11
//     skybox.scale.setScalar(50)
//     scene.add(skybox)

//     gui.add(skybox, 'radius', 1, 200, 0.1).name('skyboxRadius')
//     gui.add(skybox, 'height', 1, 100, 0.1).name('skyboxHeight')
// })
```
**JavaScript**
**复制**

本节将需要比前面更多的代码。确保将其与其余代码在视觉上分开：

```javascript
/**
 * Real time environment map
 */
```
**JavaScript**
**复制**
我们将再次插入 LDR 木屋环境贴图，但仅作为其中的**background**一个**scene**：

```javascript
// Base environment map
const environmentMap = textureLoader.load('/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg')
environmentMap.mapping = THREE.EquirectangularReflectionMapping
environmentMap.colorSpace = THREE.SRGBColorSpace

scene.background = environmentMap
```
**JavaScript**
**复制**

我们可以使用之前的任何其他环境贴图，但这一张看起来不错而且很暗，很快就会派上用场。
### 神圣的甜甜圈
我们将在场景周围创建一个圆环（或甜甜圈），并尝试使该圆环照亮并反射在对象的表面上。
使用[TorusGeometry](https://threejs.org/docs/#api/en/geometries/TorusGeometry)并调用该对象，**holyDonut**因为它听起来很酷：

```javascript
// Holy donut
const holyDonut = new THREE.Mesh(
    new THREE.TorusGeometry(8, 0.5),
    new THREE.MeshBasicMaterial({ color: 'white' })
)
holyDonut.position.y = 3.5
scene.add(holyDonut)
```
**JavaScript**
**复制**
您可以将任何想要的内容添加到环境贴图中，但为了本课程的目的，我们坚持使用简单的内容。
接下来，我们要让神圣的甜甜圈旋转。
在函数的开头**tick**，就在 之后**elapsedTime**，我们将测试是否**holyDonut**存在，以便我们可以轻松地停用该部分：

```javascript
const tick = () =>
{
    // Time
    const elapsedTime = clock.getElapsedTime()
        
    // Real time environment map
    if(holyDonut)
    {
    }

    // ...
}
```
**JavaScript**
**复制**
使用**elapsedTime**于**rotation**：

```javascript
const tick = () =>
{
    // Time
    const elapsedTime = clock.getElapsedTime()
        
    // Real time environment map
    if(holyDonut)
    {
        holyDonut.rotation.x = elapsedTime
    }

    // ...
}
```
**JavaScript**
**复制**
为了使动画稍微更有趣，让我们使用 a**Math.sin(...)**并将其相乘：

```javascript
const tick = () =>
{
    // Time
    const elapsedTime = clock.getElapsedTime()
        
    // Real time environment map
    if(holyDonut)
    {
        holyDonut.rotation.x = Math.sin(elapsedTime) * 2
    }

    // ...
}
```
**JavaScript**
**复制**
### 立方体渲染目标
主要思想是我们将在我们自己的环境贴图纹理内渲染场景，并且它将是一个立方体纹理。
要渲染成立方体纹理，我们需要使用[WebGLCubeRenderTarget](https://threejs.org/docs/index.html#api/en/renderers/WebGLCubeRenderTarget)。渲染目标是我们可以在其中存储任何场景渲染的纹理。
第一个参数是立方体每面的分辨率（我们使用**256**）：

```javascript
// Cube render target
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256)
```
**JavaScript**
**复制**
第二个参数是一个对象，其属性将用于设置渲染目标。
这里唯一重要的属性是**type**我们可以选择要存储的值的类型。由于我们希望与具有大范围数据的 HDR 具有相同的行为，因此我们应该使用**THREE.HalfFloatType**or **THREE.FloatType**。
**Float**使用 32 位来存储各种值。
**HalfFloat**仅使用 16 位，但范围仍然很广，差异不会很明显，而且由于需要更少的内存，因此性能更好：

```javascript
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(
    256,
    {
        type: THREE.FloatType
    }
)
```
**JavaScript**
**复制**
即使 中尚未渲染任何内容**cubeRenderTarget**，我们也可以将其分配给**environment**的**scene**：

```javascript
scene.environment = cubeRenderTarget.texture
```
**JavaScript**
**复制**

### 相机
由于我们需要为立方体的每个面渲染一个纹理，因此需要渲染 6 个正方形纹理。我们可以使用**PerspectiveCamera**，做一些数学运算，确保视野完美地填充一侧，进行 6 次渲染，然后将它们组合起来。或者我们可以使用[CubeCamera](https://threejs.org/docs/index.html#api/en/cameras/CubeCamera)来为我们做到这一点。
第一个参数是**near**，第二个参数是**far**，第三个参数是用于保存渲染的[WebGLCubeRenderTarget ：](https://threejs.org/docs/index.html#api/en/renderers/WebGLCubeRenderTarget)

```javascript
// Cube camera
const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget)
```
**JavaScript**
**复制**
### 在每一帧上渲染
回到我们的tick ，我们现在可以通过调用它的方法并向其发送和 来**function**渲染场景：**cubeCameraupdaterendererscene**

```javascript
const tick = () =>
{
    // ...
        
    // Real time environment map
    if(holyDonut)
    {
        holyDonut.rotation.x = Math.sin(elapsedTime) * 2

        cubeCamera.update(renderer, scene)
    }

    // ...
}
```
**JavaScript**
**复制**
我们恢复了环境贴图照明，但这一次神圣的甜甜圈成为其中的一部分。
由于我们在渲染目标上使用高范围纹理，因此我们可以使立方体颜色超出**0**范围**1**。
为此，请将 的 更改**color**为**holyDonut**我们发送到的[Color](https://threejs.org/docs/#api/en/math/Color)**10, 4, 2**实例，该实例应该看起来明亮，但也有点黄色/橙色：

```javascript
const holyDonut = new THREE.Mesh(
    new THREE.TorusGeometry(8, 0.5),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(10, 4, 2) })
)
```
**JavaScript**
**复制**
虽然很难注意到，但还是有一个错误。
要查看它，请将**roughness**环面结的 更改为**0**并观察反射：

```javascript
const torusKnot = new THREE.Mesh(
    // ...
    new THREE.MeshStandardMaterial({ roughness: 0, metalness: 1, color: 0xaaaaaa })
)
```
**JavaScript**
**复制**
正如您所看到的，场景中的所有对象现在都是环境贴图的一部分。
这不一定是个大问题，这取决于您想要在环境贴图中实现什么，但是头盔和圆环结挡住了光线，这并不理想。
### 层数
为了解决这个问题，我们将使用[Layers](https://threejs.org/docs/index.html#api/en/core/Layers)。[图层的工作方式类似于类别，可以在继承自Object3D 的](https://threejs.org/docs/index.html#api/en/core/Object3D)任何对象上设置（例如[Mesh](https://threejs.org/docs/index.html#api/en/objects/Mesh)）。
通过在相机上设置图层，该相机将仅看到与相同图层匹配的对象。
例如，如果相机的图层设置为**1**和**2**，则它只会看到图层设置为**1**或 的对象**2**。
默认情况下，所有对象和相机图层均设置为**0**。
要更改对象或相机的图层，我们可以使用 3 种方法：

- **object.layers.enable(...)**这将添加一个图层；
- **object.layers.disable(...)**这将删除一层；
- **object.layers.set(...)**这将自动启用一个图层并禁用所有其他图层。

在我们的例子中，我们希望**cubeCamera**只看到**holyDonut**，所以让我们将其图层设置为**1**：

```javascript
const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget)
cubeCamera.layers.set(1)
```
**JavaScript**
**复制**
然后，我们希望我们的**holyDonut**默认相机和**cubeCamera**. 由于默认层是**0**，我们只需要添加**1**：

```javascript
const holyDonut = new THREE.Mesh(
    new THREE.TorusGeometry(8, 0.5),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(10, 4, 2) })
)
holyDonut.layers.enable(1)
```
**JavaScript**
**复制**
我们已经修复了该错误，并且**cubeCamera**仅渲染**holyDonut**.
### 想法
小心实时环境地图。在每帧上进行 6 次渲染对于性能而言可能会带来很大的影响。这就是为什么您应该关注帧速率，尝试在 WebGLCubeRenderTarget 上使用尽可能小的分辨率[，](https://threejs.org/docs/index.html#api/en/renderers/WebGLCubeRenderTarget)并保持环境贴图中渲染的场景简单。
另外，要小心图层。很容易迷失在正在渲染的内容中。此外，请注意灯光不受图层的影响。
## 更进一步 [01:48:55](https://threejs-journey.com/lessons/environment-map#)
我们完成了！您现在拥有制作精美环境地图的所有工具，让您的场景熠熠生辉。
**#threejsJourney**使用主题标签在 Twitter 上或在 Three.js Journey Discord 服务器上分享结果。我很想看看你的作品！
# 26. Realistic render逼真的渲染
## 介绍
当我们在上一课中导入汉堡包时，成品渲染的颜色不够逼真。简而言之：很多错误代码导致渲染出的模型颜色不逼真。
有时，我们想要渲染出非常逼真的作品。可能是因为有些人想在自己的网站上展示真实的产品。或者，可能有些人是 3D 艺术家，我们想以最逼真的效果展示我们的作品。无论如何，我们有需求：**真实的渲染**。
在本课中，我们将学习许多技术来改进我们在 Three.js 中渲染后的模型外观。不过要小心，其中一些技术可能会对性能产生影响，并且某些技术取决于您的模型。你必须根据情况进行调整。
## 设置
我们可以使用我们的汉堡包，但最好尝试使用拥有更逼真的纹理、法线贴图等模型。我们将使用[GLTF 示例模型存储库](https://github.com/KhronosGroup/glTF-Sample-Models)中的[飞行头盔](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/FlightHelmet)。您可以在`/static/models/`文件夹中找到模型。
这节课也是复习已经学过的知识的绝好机会。这就是启动项目中没有太多代码的原因。我们必须自己实例化加载程序、灯光、阴影等内容。
我们还将使用 Dat.GUI 来设置调整尽可能多的参数。因为想创造完美的环境，加入调试是必需的。
现在，我们场景中只有一个白色球体和一个 Dat.GUI 实例。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1686824334506-2506cd70-79e5-4189-82ef-bfbdb7680573.png#averageHue=%230b0b0b&clientId=u619d3325-df7b-4&from=paste&id=ua6fad97b&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u53238391-2aa0-46c8-84b9-9b2262c5bf6&title=)
这个球体只是一个占位符，用于确保启动项目正常工作，但我们可以用它来设置灯光。将`testSphere` 的材质更改为[MeshStandardMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial)以查看我们即将添加的灯光：

```javascript
const testSphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial()
)
```
如您所见，画面中一切都变黑了。
## 灯
我们将只使用一个[DirectionalLight](https://threejs.org/docs/index.html#api/en/lights/DirectionalLight)。但是，我们如何才能只用一盏灯的情况下获得逼真的渲染效果呢？答案就是环境贴图，它将发挥大部分的杠杆作用并模拟光的反射。有了环境贴图我们可以不使用任何光线，但如果我们想要更好地控制光照和创建阴影，使用[DirectionalLight就很重要：](https://threejs.org/docs/index.html#api/en/lights/DirectionalLight)

```javascript
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.position.set(0.25, 3, - 2.25)
scene.add(directionalLight)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1686824334520-fa63f552-d75d-4768-8805-5ae9b13a4af0.png#averageHue=%23030303&clientId=u619d3325-df7b-4&from=paste&id=u8fb6867b&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ude8c4b10-0759-4f33-b70b-d81eb1832fc&title=)
让我们向 Dat.GUI 添加一些参数：

```javascript
gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001).name('lightX')
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001).name('lightY')
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001).name('lightZ')
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1686824334542-17f9c196-a225-484d-80ef-8e6e5c484035.png#averageHue=%23030303&clientId=u619d3325-df7b-4&from=paste&id=u73ce3a9e&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=udbda2c80-6453-4a63-876e-9e16c37e1f0&title=)
我们现在可以控制`position`和`intensity`。
默认的 Three.js 光强度值不够真实。它们基于任意比例单位，不反映真实世界的比例。虽然这有点多此一举，但最好让我们的场景基于现实和标准值。以这种方式重现现实生活的逼真感觉可能看起来会更舒服。
要将 Three.js 灯光更改为更真实的值，请将[WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)实例`renderer`的`physicallyCorrectLights`属性切换为`true`：

```javascript
renderer.physicallyCorrectLights = true
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1686824334581-e2f4b69e-6b58-4b20-8722-3c07988008f1.png#averageHue=%23010101&clientId=u619d3325-df7b-4&from=paste&id=u8630109f&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u07cf56ec-6548-43c7-a94e-d05ac4aeaf2&title=)
我们的光变暗了。让我们将其强度增加到`3`：

```javascript
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1686824334562-e25d5822-bdec-4192-9da7-056041f11dfc.png#averageHue=%23030303&clientId=u619d3325-df7b-4&from=paste&id=u24be2b4c&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ub9a225ef-8308-4d87-ade4-1e72f4e77bd&title=)
## 模型
让我们正式开始加载一个模型，而不是那个测试用球体。
首先，实例化[GLTFLoader](https://threejs.org/docs/index.html#examples/en/loaders/GLTFLoader)。我们将把不同的装载机重新组合在一起。没有特别的原因，只是将事物重新组合在一起：

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// ...

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
```
我们不需要用[DRACOLoader](https://threejs.org/docs/index.html#examples/en/loaders/DRACOLoader)，因为模型没有被压缩。但是，如果您加载 Draco 压缩模型，请像我们在上一课中所做的那样实例化[DRACOLoader 即可。](https://threejs.org/docs/index.html#examples/en/loaders/DRACOLoader)
我们现在可以加载位于`/static/models/FlightHelmet/glTF/FlightHelmet.gltf`以下位置的模型：

```javascript
/**
 * Models
 */
gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) =>
    {
        console.log('success')
        console.log(gltf)
    }
)
```
一如既往，慢慢来，确保模型加载正确无误，然后研究检查导入的结果。
因为它是一个复杂的模型，我们将简单地将`gltf.scene`组添加到我们自己的场景中：

```javascript
gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) =>
    {
        scene.add(gltf.scene)
    }
)
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1686824336454-d291864b-c3d7-4247-93a4-9683db89bda5.png#averageHue=%23030303&clientId=u619d3325-df7b-4&from=paste&id=uaceded95&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u90474be0-d3d7-4e47-8fbc-2e8bac6afc2&title=)
如果您看不到它但没有收到任何错误，请移除`testSphere`并稍微放大模型。原因很简单：加载的模型太小了。
增加它的比例，向下移动一点，然后旋转它以更好地适应我们的相机视图：

```javascript
gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(10, 10, 10)
        gltf.scene.position.set(0, - 4, 0)
        gltf.scene.rotation.y = Math.PI * 0.5
        scene.add(gltf.scene)
    }
)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1686824336489-72fe722b-ad1b-43b4-9a23-c97a2b1e03ea.png#averageHue=%23030201&clientId=u619d3325-df7b-4&from=paste&id=u28ade46f&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ua407eb59-db5d-4447-a87b-f33f09a998a&title=)
让我们再添加一个Dat.GUI 调整项来旋转我们 场景 中的整个模型：

```javascript
gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) =>
    {
        // ...

        gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')
    }
)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1686824337667-8632a98e-f4fc-4ff9-8415-bcc66b90e2d6.png#averageHue=%23040201&clientId=u619d3325-df7b-4&from=paste&id=u98640be3&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ue6119ba9-d531-4d61-a43d-c85665f718d&title=)
## 环境图
我们看不到太多模型，因为我们只有一个微弱的[DirectionalLight](https://threejs.org/docs/index.html#api/en/lights/DirectionalLight)。正如我们之前所说，光照将由环境贴图处理。
我们已经在材料课程中讨论了什么是环境贴图。环境贴图就像一张周围环境的照片。它可以是一张 360 度全景照片，也可以是 6 张照片，一旦放在一起，就构成了一个立方体。
我们将使用环境贴图作为背景并照亮我们的模型。
### 载入环境贴图
首先，让我们加载我们的环境贴图。`/static/textures/environmentMaps/`文件夹中有多个纹理。我们将使用第一个。
因为这些纹理由 6 个图像（一个立方体）组成，所以我们必须使用[CubeTextureLoader](https://threejs.org/docs/index.html#api/en/loaders/CubeTextureLoader)。
将[CubeTextureLoader](https://threejs.org/docs/index.html#api/en/loaders/CubeTextureLoader)添加到我们的加载器中：

```javascript
const cubeTextureLoader = new THREE.CubeTextureLoader()
```

现在我们可以加载纹理了。顺序为positive x, negative x, positive y, negative y,positive z和negative z。
创建后添加它scene：

```javascript
/**
 * Environment map
 */
const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])
```

应该没有任何变化，因为我们正在加载环境贴图，但我们还没有使用它。
检查日志中是否存在潜在错误。
### 将环境贴图应用到背景
要在场景背景中添加环境贴图，我们可以在场景周围创建一个巨大的立方体，将其表面设置为在内部可见，并应用其纹理。它应该工作并且看起来不错，但是，本节课让我们使用 Three.js 中已经包含的功能实现。
要在场景上应用 environmentMap，请在 [Scene](https://threejs.org/docs/index.html#api/en/scenes/Scene.background)的`background`属性上使用立方体纹理。确保在创建`environmentMap`和`scene`之后执行此操作：

```javascript
scene.background = environmentMap
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1686824337644-21b82dd5-37b2-4b1d-8423-8432314a62b6.png#averageHue=%2347392c&clientId=u619d3325-df7b-4&from=paste&id=u4422e2d4&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uf1165e6e-c2cc-4f2b-ae3a-933873974e0&title=)
就这样。您应该在背景中看到环境贴图。
### 将环境贴图应用于模型
获得真实渲染的一个基本特征是使用我们的环境贴图来照亮我们的模型。
我们已经介绍了如何将环境贴图应用到具有`envMap`该属性的[MeshStandardMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial.envMap)。问题是我们的模型是由许多[Meshes](https://threejs.org/docs/index.html#api/en/objects/Mesh)组成的。我们可以做的是使用`traverse(...)`遍历出每个[Object3D](https://threejs.org/docs/index.html#api/en/core/Object3D)上可用的方法——以及从它继承的类，如[Group](https://threejs.org/docs/index.html#api/en/objects/Group)和[Mesh](https://threejs.org/docs/index.html#api/en/objects/Mesh)。
我们将创建一个`updateAllMaterials`稍后会派上用场的函数，而不是在成功回调函数中执行此操作。在环境贴图之前创建此函数：

```javascript
/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        console.log(child)
    })
}
```

现在在加载模型并将其添加到场景时调用它：

```javascript
gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) =>
    {
        // ...

        updateAllMaterials()
    }
)
```

您应该在日志中看到所有的children。
我们不想记录所有的children子项，而是想将环境贴图应用到每个children的**材质**上。
将环境贴图应用于灯光、相机、组等上是没有任何意义的。我们只想将环境贴图应用于具有 `MeshStandardMaterial`的[网](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial)[格](https://threejs.org/docs/index.html#api/en/objects/Mesh)。
我们可以做的是测试`child`它是否是`THREE.Mesh`的实例以及它的材料是否是 `THREE.MeshStandardMaterial`的实例：

```javascript
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            console.log(child)
        }
    })
}
```

我们现在只记录支持环境地图的`child`。让我们在`envMap`属性中更改它们的`material`属性：

```javascript
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            child.material.envMap = environmentMap
        }
    })
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1686824339411-ba19e295-46da-473f-9183-74a2dfbaad1d.png#averageHue=%234d3e2f&clientId=u619d3325-df7b-4&from=paste&id=ufd7482de&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uaa942a44-6957-47c1-a046-e145884d363&title=)
看不出太大区别？把`envMapIntensity`增加到_`2.5`：

```javascript
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            child.material.envMap = environmentMap
            child.material.envMapIntensity = 2.5
        }
    })
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1686824341011-2f19ebf7-29e3-44c9-881e-3c45426fee28.png#averageHue=%23534333&clientId=u619d3325-df7b-4&from=paste&id=ua93c1df8&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uc502243b-b991-4ee3-8621-576c6a253b0&title=)
我们得到了一个漂亮而逼真的照明。
为了获得更多控制，让我们将该`envMapIntensity`属性添加到我们的 Dat.GUI。问题是我们只需要调整一个属性，并且在更改时，该值应该应用于所有子材质。
我们可以像在上一课中那样使用`debugObject`该技术。在实例化 Dat.GUI 之后，立即创建一个`debugObject`：

```javascript
const gui = new dat.GUI()
const debugObject = {}
```

然后，在环境贴图代码部分，向`envMapIntensity`该对象以及您的 Dat.GUI 添加一个属性：

```javascript
debugObject.envMapIntensity = 1
gui.add(debugObject, 'envMapIntensity').min(0).max(10).step(0.001)
```

我们现在有了`envMapIntensity`调整，但更改值并没有更新场景及其子项。我们现在应该在调整`updateAllMaterials`值更改时调用函数并使用函数`debugObject.envMapIntensity`中的`updateAllMaterials`值：

```javascript
const updateAllMaterials = () =>
{
    // ...
            child.material.envMapIntensity = debugObject.envMapIntensity
    // ...
}

// ...

debugObject.envMapIntensity = 2.5
gui.add(debugObject, 'envMapIntensity').min(0).max(10).step(0.001).onChange(updateAllMaterials)
```
![tutieshi_640x400_8s (1).gif](https://cdn.nlark.com/yuque/0/2023/gif/35159616/1686840632809-ad25f63b-0139-4ceb-96ec-fa58b60261a1.gif#averageHue=%23463a2c&clientId=u613df4df-08ef-4&from=drop&id=u1c529a6a&originHeight=400&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=655640&status=done&style=none&taskId=u1c94492b-eac8-472b-8f0b-42c74a97c81&title=)
我们现在只需在调试界面中直接进行一次调整即可更改所有[网格环境贴图强度。](https://threejs.org/docs/index.html#api/en/objects/Mesh)
### 默认应用环境贴图
有一种更简单的方法可以将环境贴图应用于所有对象。我们可以像更改`environment`属性一样更新`scene`的`background`属性：

```glsl
scene.environment = environmentMap
```
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1686824340952-32af93b9-f73b-47d0-bfdc-88d655a36827.png#averageHue=%234c3e30&clientId=u619d3325-df7b-4&from=paste&id=u58aaec6f&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u7b5587bb-1637-4e90-bc42-a72d0720298&title=)
不幸的是，我们无法直接从场景中更改每种材质的环境贴图强度，因此我们仍然需要我们的`updateAllMaterials`功能，但这是一个完全可行的解决方案。
## 渲染器 
事情越来越逼真了，但我们的项目看起来还是觉得这很假的。我们需要处理颜色，这是[WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)属性的问题。
### 输出编码
无需过多赘述，该`outputEncoding`属性控制输出渲染编码。`outputEncoding`默认情况下的值为`THREE.LinearEncoding`，虽然用这个渲染编码看起来不错，但却没那么拟真。
想要拟真的效果`outputEncoding`的推荐值为`THREE.sRGBEncoding`：

```javascript
renderer.outputEncoding = THREE.sRGBEncoding
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1686824341639-7d94827a-e548-43b0-bb37-635018a00ade.png#averageHue=%23a29683&clientId=u619d3325-df7b-4&from=paste&id=u627bcb11&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u15be664c-d131-4f6f-95de-67b0857b6f1&title=)
您应该会看到更亮的纹理，它们也会影响环境贴图。
另一个可能影响拟真效果的值是`THREE.GammaEncoding`。这种编码的优点是让您可以使用一个名为`gammaFactor`的值，它的作用有点像亮度，但我们不会在课程中使用它。
`Gamma` 编码是一种存储颜色的方法，同时根据人眼的敏感度优化存储明暗值的方式。当我们使用`sRGBEncoding` 时，就像使用`GammaEncoding`默认伽玛因子`2.2` 一样，这是常用值。
您可以在此处找到有关此主题的更多信息

- [https://www.donmccurdy.com/2020/06/17/color-management-in-threejs/](https://www.donmccurdy.com/2020/06/17/color-management-in-threejs/)
- [https://medium.com/game-dev-daily/the-srgb-learning-curve-773b7f68cf7a](https://medium.com/game-dev-daily/the-srgb-learning-curve-773b7f68cf7a)

虽然有些人可能认为这`GammaEncoding`比我们可以控制更暗或更亮场景的`sRGBEncoding`伽玛因子更好，但这在物理上似乎不正确，我们稍后会看到如何以更好的方式管理“亮度”。
### 纹理编码
您可能没有注意到，但其实环境贴图颜色是错误的。它们看起来呈灰色并且色调柔和。即使效果看起来不错，但保留拟真的颜色更令人满意。
问题是我们的渲染器`outputEncoding`是`THREE.sRGBEncoding`，但环境贴图纹理是默认的`THREE.LinearEncoding`。
规则很简单。我们可以直接看到的所有纹理——比如`map`——应该有`THREE.sRGBEncoding`编码，所有其他纹理——比如`normalMap`——应该有`THREE.LinearEncoding`。
我们可以通过`environmentMap`直接看到纹理，所以我们可以将其编码更改为`THREE.sRGBEncoding`：

```glsl
environmentMap.encoding = THREE.sRGBEncoding
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1686824343222-48b9f3f8-ed2b-46c0-b943-1504d01c1ec9.png#averageHue=%23594838&clientId=u619d3325-df7b-4&from=paste&id=u94414ee4&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u279487df-1cb8-4238-84f8-e1e93220835&title=)
但是模型纹理呢？
幸运的是，[GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)实现了这个规则，所有从它加载的纹理都会自动拥有`encoding`权限。
### 色调映射
色调映射旨在将高动态范围 (HDR) 值转换为低动态范围 (LDR) 值。HDR 远不止下面的解释，但是你可以看到像图像中颜色值`1`可以超越的地方。如果我们想存储光信息，这很有用，因为光没有强度限制。
虽然我们的渲染的资源不是 HDR（我们的是6张图片组合的立方体），但色调映射效果可以产生逼真的效果，就好像相机调整不当一样。
要更改色调映射，请更新[WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)上的`toneMapping`属性。
有多个可能的值：

- `THREE.NoToneMapping（默认）`
- `THREE.LinearToneMapping`
- `THREE.ReinhardToneMapping`
- `THREE.CineonToneMapping`
- `THREE.ACESFilmicToneMapping`

测试这些色调映射：

```javascript
renderer.toneMapping = THREE.ACESFilmicToneMapping
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1686824345845-c4768468-95e4-418e-a5b3-bff3aa42492d.png#averageHue=%234c3d2e&clientId=u619d3325-df7b-4&from=paste&id=u5191ed4b&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u27e02c5a-35da-476c-9618-8cd393af12f&title=)
为了了解不同之处，让我们将 `toneMapping` 添加到我们的 Dat.GUI 中。我们可以通过发送具有不同键和值的对象作为`gui.add(...)`的第三个参数来创建下拉菜单调整：

```javascript
gui.add(renderer, 'toneMapping', {
    No: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping
})
```

更改色调映射时，材料也应更新。
我们还可以更改色调映射曝光。你可以看到我们让多少光进入，算法会按照自己的方式处理它。要更改此值，我们必须在`renderer`上直接更新`toneMappingExposure`属性：

```javascript
renderer.toneMappingExposure = 3
```

我们也将它添加到 Dat.GUI 中：

```javascript
gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)
```

在接下来的课程中随意选择你最喜欢的`toneMapping`值，我选择的是`THREE.ReinhardToneMapping`。
### 抗锯齿
我们将混叠称为伪像，它可能出现在某些情况下，我们可以看到类似阶梯的效果，通常出现在几何图形的边缘。
我们的模型没有这个问题，因为有很多细节，但如果你的屏幕像素比为`1` 查看边缘——尤其是明亮的边缘——慢慢旋转相机，你可能会发现问题：
![](https://cdn.nlark.com/yuque/0/2023/jpeg/35159616/1686824345865-cac58794-e6a8-4d47-b333-93af6f45e2bb.jpeg#averageHue=%2334332f&clientId=u619d3325-df7b-4&from=paste&id=u8c235ee5&originHeight=2165&originWidth=1319&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ue87d6e98-d3a4-4e73-9c11-eae951fc309&title=)
![](https://cdn.nlark.com/yuque/0/2023/jpeg/35159616/1686824346581-d14005b6-abab-40e0-828d-84242725a53d.jpeg#averageHue=%23746258&clientId=u619d3325-df7b-4&from=paste&id=u5b014bbd&originHeight=1032&originWidth=3592&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u2277474f-1517-4f74-aada-a8a31446227&title=)
![](https://cdn.nlark.com/yuque/0/2023/jpeg/35159616/1686824347801-c1938130-048e-4561-9879-f856f89f4109.jpeg#averageHue=%235a4e42&clientId=u619d3325-df7b-4&from=paste&id=u1ec00320&originHeight=1280&originWidth=1480&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u8d020d29-6990-4cc6-9a53-cf03acd342d&title=)
锯齿是一个众所周知的问题。当发生像素渲染时，它会测试该像素中正在渲染的几何体。它计算颜色，最后，该颜色出现在屏幕上。
但是几何边缘通常不会与屏幕像素的垂直线和水平线完全对齐，这就是为什么您会得到这个名为`aliasing`的阶梯状工件。
有很多方法可以解决这个问题，很多开发人员多年来一直在努力解决这个问题。
一个简单的解决方案是增加渲染的分辨率，比方说增加一倍。当调整到正常大小时，每个像素颜色将自动从渲染的 4 个像素中平均。
这种解决方案称为超级采样(SSAA) 或全屏采样(FSAA)，它是最简单、效率更高的一种。不幸的是，这意味着需要渲染 4 倍的像素，这可能会导致性能问题。
另一种解决方案称为多重采样(MSAA)。同样，这个想法是像超级采样一样为每个像素渲染多个值（通常为 4 个），但仅在几何图形的边缘。然后对像素值进行平均以获得最终像素值。
最新的 GPU 可以执行这种多重采样抗锯齿，Three.js 会自动处理设置。我们只需要在实例化期间将`antialias`属性更改为`true`——而不是之后：

```javascript
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
```

那些混叠伪影现在应该消失了。
使用抗锯齿会耗尽一些资源。正如我们之前所说，像素比在`1`以上的屏幕并不真正需要抗锯齿。一种正确的方法是通过js判断只为像素比低于`2.` 的屏幕激活它。我们将在以后的课程中看到如何实现这一目标以及其他优化。
## 阴影 Shadows
逼真的渲染的最后一步是给模型添加阴影。[首先，切换WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)上的阴影。然后我们在阴影课程中所教过的，将阴影类型更改为`THREE.PCFSoftShadowMap`：

```javascript
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
```

[在DirectionalLight](https://threejs.org/docs/index.html#api/en/lights/DirectionalLight)上激活它：

```javascript
directionalLight.castShadow = true
```

我们还需要设置处理此光阴影的相机。
[将CameraHelper](https://threejs.org/docs/index.html#api/en/helpers/CameraHelper)添加到`directionalLight.shadow.camera`：

```javascript
const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightCameraHelper)
```

我们现在可以准确地看到阴影相机将渲染什么。这个盒子应该已经很适合场景了。让我们减少`far`值：

```javascript
directionalLight.shadow.camera.far = 15
```

我们可以删除或评论`directionalLightCameraHelper`.
因为我们想要真实和精确的阴影，并且因为我们只有一盏灯，所以我们可以增加阴影贴图大小而1024x1024不用担心帧速率下降。

```javascript
directionalLight.shadow.mapSize.set(1024, 1024)
```

最后，我们可以激活模型所有[网格](https://threejs.org/docs/index.html#api/en/objects/Mesh)上的阴影。因为我们已经在函数中遍历了场景`updateAllMaterials`，所以让我们简单地激活所有孩子的`receiveShadow`和`castShadow`：

```javascript
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            // ...

            child.castShadow = true
            child.receiveShadow = true
        }
    })
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1686824348252-3da200c0-c06b-4088-94da-5f41d7e28e01.png#averageHue=%23786855&clientId=u619d3325-df7b-4&from=paste&id=u9df87f78&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u50dfddfb-b84f-4899-875d-b314c66f531&title=)
您现在应该观察到一个准确的阴影，主要是在木底座上和模型内部。
## 最后的调整 
现在一切就绪，我们可以调整值，确保对应`directionalLight`于环境贴图中的光，尝试其他环境贴图，测试不同的色调映射，添加动画等。
由你决定。慢慢来，停止查看您的渲染，环顾四周，因为您需要现实生活中的标记，确保您的屏幕颜色很好，也许向您的朋友展示您的作品以获得外部视角，直到一切都正确设置。
## 汉堡包
让我们试试我们的汉堡包。一个版本已经位于`/static/models/hamburger.glb.`
此文件未经过 Draco 压缩。如果您正在使用您的模型，请确保它未被压缩或将[DRACOLoader](https://threejs.org/docs/index.html#examples/en/loaders/DRACOLoader)添加到[GLTFLoader](https://threejs.org/docs/index.html#examples/en/loaders/GLTFLoader)，就像我们在导入模型课程中所做的那样。
替换加载汉堡包的路径并更改比例和位置：

```javascript
gltfLoader.load(
    '/models/hamburger.glb',
    (gltf) =>
    {
        gltf.scene.scale.set(0.3, 0.3, 0.3)
        gltf.scene.position.set(0, - 1, 0)
        scene.add(gltf.scene)

        updateAllMaterials()
    }
)
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1686824349383-7303af1b-bee5-416f-9044-59d9553e1c38.png#averageHue=%237f6d58&clientId=u619d3325-df7b-4&from=paste&id=ud408b6ad&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u533c58a9-7b10-4ad2-8f73-8c2fa7ae041&title=)
你的汉堡包出现了，但它的表面覆盖着一些肮脏的条纹。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1686824351330-d8b1cc12-fc58-405f-80b1-4abecb1c4296.png#averageHue=%239e8360&clientId=u619d3325-df7b-4&from=paste&id=uf97d815b&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=udf0589cd-a1b6-4702-ab62-99a8aa6928a&title=)
不，我们没有让汉堡包在烤架上烤焦。
这些人工制品称为shadow acne。在计算表面是否处于阴影中时，出于精确原因，shadow acne可能出现在光滑和平整的表面上。这里发生的事情是汉堡包在它自己的表面上投下了阴影。
我们必须调整光`shadow`的`bias`和`normalBias`属性来修复这个shadow acne。
通常`bias`有助于平面。这不是我们这里的情况，但如果您在平面上遇到问题，请尝试稍微增加`bias`直到shadow acne消失。
通常`normalBias`有助于圆形表面，这就是我们的情况。让我们增加它直到shadow acne几乎看不见：

```javascript
directionalLight.shadow.normalBias = 0.05
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1686824352899-df498c24-0caa-4a24-93bb-7967ab9e173b.png#averageHue=%23938062&clientId=u619d3325-df7b-4&from=paste&id=u08555aad&originHeight=1120&originWidth=1792&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u1465f7d9-941b-4ec6-a6cb-bac847f8334&title=)
现在你得到了一个非常体面的的汉堡包。
祝你胃口常开。
# 
27. Code structuring for bigger projects大型项目的代码结构


## 介绍
到目前为止，所有的练习都是小的案例，它们可以轻松地放入一个 JavaScript 文件中。我们使用块注释将代码的不同职责部分分开，并且代码行数很长。
但是现实生活中的项目往往有更多的代码。将所有东西像意大利面条一样纠缠在一个文件中很快就会成为一个问题。例如：

- 很难找到你想要的。
- 很难重复使用特定部件。
- 您需要确保变量不与其他变量冲突。
- 如果您与其他开发人员一起工作，您将在该文件上遇到很多冲突。
- 您的手指会开始抽筋，因为您必须滚动太多次。
- ETC。

我们需要一种方法来以更易于维护的方式构建我们的代码。
虽然本课程专门介绍 Three.js，但我们将在本课中学习 JavaScript 概念，例如类和模块。在组织我们的代码时，它们将变得非常方便。
在课程的以下部分，我将向您展示我 (Bruno Simon) 喜欢如何组织我的代码。这是基于您可能不认同的非常个人的偏好，您可能是对的。不要犹豫，创建您自己的结构，只从课程建议中采纳您认为好的部分。
在本课程的其余部分，为了简单起见，并且如果你们中的一些人对在这里学习的内容不满意，我们将不会使用本课中介绍的结构。我们将继续在一个文件中编写所有 JavaScript（意大利面条样式）。但是，如果您在本课中尝试使用新结构感到自在，则可以根据新方法或您自己的结构调整以下课程。
## 模块 Modules 
模块是用于构建我们的代码的最重要的功能之一。我们的想法是将我们的代码分成多个文件，并在需要时导入这些文件。
当我们像这样导入依赖项时，我们实际上已经使用了模块：

```javascript
import * as THREE from 'three'
import gsap from 'gsap'
```
但是这一次，我们要导入我们自己的代码。
### 兼容性 Compatibility
使用 Vite 时，我们所有的导入都被合并到一个文件中，该文件适用于大多数浏览器。这样，我们甚至不用担心模块的兼容性问题。
此外，大多数现代浏览器现在都原生支持模块，而无需使用捆绑器。但是，出于以下几个原因，我们不会使用该原生支持：

- 并非所有浏览器都兼容它（[我可以使用吗](https://caniuse.com/?search=import)）。
- 由于其他原因，我们已经需要 Vite，例如 NPM 依赖项、着色器文件集成（在课程的后面）、本地服务器等。Vite 本身就支持模块。
### 句法 Syntax
我们将暂时忽略项目的当前状态，专注于语法。
在`/src/script.js` 中，注释掉所有内容（甚至 CSS 导入）。
在`/src/`文件夹中，创建一个`test.js`文件。我们将向该文件添加内容并将其导入`script.js`.
一个文件可以导出一个或多个东西，但是，为了简单起见，我喜欢每个文件只导出一个东西。
为此，请在 中编写以下代码`test.js`：

```javascript
export default 'Hello modules'
```

然后，要将此代码导入`/src/script.js`，请编写以下代码：

```javascript
import test from './test.js'

console.log(test)
```

就是这样。检查您的控制台，您应该会看到Hello modules.
一个非常重要的细节是路径以`./` 当我们引用一个文件时，我们需要这样做，否则构建工具将尝试在node_modules文件夹中找到它。
在这里，我们导出了一个字符串，这不是很有用。但是我们可以导出函数：

```javascript
// test.js
export default () =>
{
    console.log('Hello modules')
}

// scripts.js
import test from './test.js'

test()
```
我们还可以导出对象：

```javascript
// test.js
export default {
    hello: 'modules'
}

// scripts.js
import test from './test.js'

console.log(test)
```
我们也可以导出类，但我们稍后会看到。
该export`指令`也可以在对象之后完成：

```javascript
// test.js
const somethingToExport = {
    hello: 'modules'
}

export default somethingToExport
```

正如我之前所说，一个文件可以导出多个内容：

```javascript
// test.js
const oneThing = {
    hello: 'modules'
}

const anotherThing = () =>
{
    console.log('Hi!')
}

export { oneThing, anotherThing }

// scripts.js
import { oneThing, anotherThing } from './test.js'

console.log(oneThing)
anotherThing()
```

通过导出多个东西，我们不需要导入模块中的所有东西。我们可以选择我们想要的：

```javascript
// script.js
import { oneThing } from './test.js'

console.log(oneThing)
```

这实际上就是如何在不导入整个库的情况下导入 Three.js 类。
目前，当我们导入 Three.js 时，我们会这样做：

```javascript
import * as THREE from 'three'
```

从three中导出的所有内容都将在变量`THREE`中可用。但是我们可以像这样按需求导入特定的类：

```javascript
import { SphereGeometry } from 'three'
```

但同样，我们不会使用该功能，我们的每个文件都只会导出一个东西。
## Class
既然我们知道如何将我们的代码分成多个文件，那么我们究竟应该导出和导入什么？
我们将使用类进行导出和导入。类允许我们在 JavaScript 中使用面向对象的编程。
### 兼容性
大多数浏览器都支持类（[Can I Use](https://caniuse.com/es6-class)），因此我们可以毫无问题地使用它们。
### 创建一个类
删除与模块相关的代码（甚至test.js文件）并保留其余代码的注释。我们现在将专注于课程。
要创建类，请在中使用以下语法`/src/script.js`：

```javascript
class HelloClass {}
```

如果你现在测试这段代码，什么都不会发生，因为我们的类目前是空的，我们没有在代码的其他任何地方使用它。但是，在下面示例的类中，我们将在`{}`.
另外，您应该注意，按照惯例，类名通常使用 `PascalCase`，其中每个单词的首字母大写。
### 实例化类 
一个类就像一个蓝图。我们可以使用该蓝图来创建一个对象。我们还可以使用该蓝图创建多个对象。
假设我们的类是创建机器人的蓝图：

```javascript
class Robot {}
```

要从该蓝图创建一个机器人，我们需要这样写：

```javascript
const robot = new Robot()
console.log(robot)
```

就是这样。虽然这个类什么都不做，因此我们的`robot`变量什么也不做，但我们从我们的Robot类中创建了一个机器人。
变量robot就是我们所说的类的实例。
如前所述，我们还可以创建该类的多个实例：

```javascript
class Robot {}

const wallE = new Robot()
const ultron = new Robot()
const astroBoy = new Robot()
```

所有这些机器人都将基于同一个类。
### 方法 Methods


这很可爱，但我们的机器人什么也做不了。我们可以像这样给机器人添加功能：

```javascript
class Robot
{
    sayHi()
    {
        console.log('Hello!')
    }
}
```

类内部的函数称为方法，类的每个实例都将具有这些方法。
现在，我们的每个机器人都可以说“嗨”。

```javascript
ultron.sayHi()
astroBoy.sayHi()
```

但是那些机器人不对他们的创造者说“谢谢”是多么不礼貌啊！
如果你`constructor`在类中添加一个命名的方法，这个方法在实例化时会自动调用：

```javascript
class Robot
{
    constructor()
    {
        console.log('Thank you creator')
    }

    sayHi()
    {
        console.log('Hello!')
    }
}
```

现在，每个用这个类创建的机器人在实例化时都会自动说“谢谢你的创造者”。
我们也可以为它提供参数`constructor`。
为了说明这一点，我们将为每个机器人命名：

```javascript
const wallE = new Robot('Wall-E')
const ultron = new Robot('Ultron')
const astroBoy = new Robot('Astro Boy')
```

要在类中检索这些名称，我们可以将参数添加到函数中`constructor`：

```javascript
class Robot
{
    constructor(name)
    {
        console.log(`I am ${name}. Thank you creator`)
    }

    sayHi()
    {
        console.log('Hello!')
    }
}
```


### 语境 Context
但是，如果我们还希望机器人在说“嗨”时提供他的名字怎么办？
我们已经将名称发送给构造函数，我们不想再次将其发送给函数sayHi。我们想要的是让机器人记住他的名字。
我们可以用`this. `编写以下代码：

```javascript
class Robot
{
    constructor(name)
    {
        this.name = name

        console.log(`I am ${this.name}. Thank you creator`)
    }

    sayHi()
    {
        console.log('Hello!')
    }
}
```

`this`就是我们所说的`context`。尽管类对于每个实例都是相同的，但是上下文对于类的每个实例都是不同的。
在我们的例子中，`this`将是机器人本身。
`this`在每个方法中都可以访问，这就是为什么我们现在可以在函数中检索机器人的名称`sayHi`：

```javascript
class Robot
{
    // ...

    sayHi()
    {
        console.log(`Hello! My name is ${this.name}`)
    }
}
```

`name`就是我们所说的类的属性。我们可以添加更多属性：

```javascript
class Robot
{
    constructor(name, legs)
    {
        this.name = name
        this.legs = legs

        console.log(`I am ${this.name}. Thank you creator`)
    }

    // ...
}

const wallE = new Robot('Wall-E', 0)
const ultron = new Robot('Ultron', 2)
const astroBoy = new Robot('Astro Boy', 2)
```

我们还可以从类外部的实例访问属性：

```javascript
// ...

const wallE = new Robot('Wall-E', 0)
const ultron = new Robot('Ultron', 2)
const astroBoy = new Robot('Astro Boy', 2)

console.log(wallE.legs)
```

方法也可以从上下文中获得，我们可以让机器人在以下情况下自动说“嗨” `constructor`：

```javascript
class Robot
{
    constructor(name, legs)
    {
        this.name = name
        this.legs = legs

        this.sayHi()

        console.log(`I am ${this.name}. Thank you creator`)
    }

    // ...
}
```

### 继承 Inheritance
继承就像在另一个类的基础上创建一个类。在某种程度上，我们根据另一个蓝图创建了一个蓝图。
基类的所有方法都将在新类中可用。
为了说明这一点，让我们为我们的机器人添加一个功能，以便它们可以飞行。但并不是每个机器人都能像 Wall-E 一样飞翔。尽管如此，每个机器人都需要一个名字和腿。
要基于另一个创建类，请使用`extends`关键字。在类之后创建以下类`Robot`：

```javascript
class FlyingRobot extends Robot
{
    
}
```

我们已经创建了一个`FlyingRobot`类，我们现在可以将其用于可以飞行的机器人：

```javascript
const wallE = new Robot('Wall-E', 0)
const ultron = new FlyingRobot('Ultron', 2)
const astroBoy = new FlyingRobot('Astro Boy', 2)
```

目前，这`FlyingRobot`不会向`Robot`类添加任何内容，但我们可以添加如下方法：

```javascript
class FlyingRobot extends Robot
{
    takeOff()
    {
        console.log(`Have a good flight ${this.name}`)
    }

    land()
    {
        console.log(`Welcome back ${this.name}`)
    }
}
```

用 实例化的机器人`FlyingRobot`仍然可以说“嗨”，但现在它们也可以起飞和降落：

```javascript
astroBoy.sayHi()
astroBoy.takeOff()
astroBoy.land()
```

但是如果我们尝试对 Wall-E 做同样的事情：

```javascript
wallE.takeOff()
```

我们得到一个错误。Wall-E 不是`FlyingRobot` 的实例，因此无法起飞。
为类提供同名方法`FlyingRobot`将覆盖该方法在`Robot`类中的作用：

```javascript
class FlyingRobot extends Robot
{
    sayHi()
    {
        console.log(`Hello! My name is ${this.name} and I am a flying robot`)
    }

    // ...
}
```

但是如果你想提供一个不同的`constructor`，你必须启动方法并向`super()`它发送所需的参数：

```javascript
class FlyingRobot extends Robot
{
    constructor(name, legs)
    {
        super(name, legs)

        this.canFly = true
    }

    // ...
}
```

super对应于基类 ( Robot) 并且使用`super()`就像调用基类`constructor`，这样我们在基类构造函数中所做的一切也将在新类中完成。
我们还可以使用`super`从基类调用方法。例如，我们可以让机器人像以前一样说“hi”，然后在另一个日志中说它是一个飞行机器人：

```javascript
class FlyingRobot extends Robot
{
    sayHi()
    {
        super.sayHi()

        console.log('I am a flying robot')
    }

    // ...
}
```

但是这种方法往往会使代码复杂化。
上课就是这样。
## 组合类和模块  Structuring our project
这里的想法是，我们将把代码分成文件，每个文件都将导出一个不同的类。
为了用机器人来说明这一点，创建一个`/src/Robot.js`文件并将`Robot`类放入其中，但`export default`开头要有一个：

```javascript
export default class Robot
{
    constructor(name, legs)
    {
        this.name = name
        this.legs = legs

        console.log(`I am ${this.name}. Thank you creator`)                                                          

        this.sayHi()
    }

    sayHi()
    {
        console.log(`Hello! My name is ${this.name}`)
    }
}
```

现在创建一个`/src/FlyingRobot.js`文件并将`FlyingRobot`类放入其中，但`export default`开头为：

```javascript
export default class FlyingRobot extends Robot
{
    constructor(name, legs)
    {
        super(name, legs)

        this.canFly = true
    }

    sayHi()
    {
        console.log(`Hello! My name is ${this.name} and I'm a flying robot`)
    }

    takeOff()
    {
        console.log(`Have a good flight ${this.name}`)
    }

    land()
    {
        console.log(`Welcome back ${this.name}`)
    }
}
```

然而，在导入它们之前，我们需要解决一个问题。
`FlyingRobot`继承自`Robot`，但`Robot`在文件中不可用。我们需要首先导入该类以引用它。
添加以下导入：

```javascript
import Robot from './Robot.js'

export default class FlyingRobot extends Robot
{
    // ...
```

在`/src/scripts.js` 中，我们现在可以导入并使用这些类：

```javascript
import Robot from './Robot.js'
import FlyingRobot from './FlyingRobot.js'

const wallE = new Robot('Wall-E', 0)
const ultron = new FlyingRobot('Ultron', 2)
const astroBoy = new FlyingRobot('Astro Boy', 2)
```

我们创建机器人的代码突然变得非常简单。
起初，所有这些可能看起来有点复杂，但是您的代码将变得更易于维护，并且您只需复制所需的类就可以在不同的项目中重用它。
## 构建我们的项目 
是时候在我们的项目中使用这些新知识了。
删除我们上面添加的代码并删除与机器人相关的文件。
如果您取消注释项目代码，您将看到一个简单的场景，地板上有一只狐狸。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697628961-5877f1b0-19b5-49d0-99e2-18348456f017.png#averageHue=%23513c27&clientId=u088972ae-4aa2-4&from=paste&id=u0953d3d7&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u59dacf15-3d78-489d-b550-260d834b670&title=)
我们将保留现有代码并将其逐段移动到类中。
再次注释整个代码，但样式 ( import './style.css') 除外。
## 创建  Experience class
一个好的做法是将整个体验放在一个主类中，然后创建其他所有内容。如果您的 WebGL 体验是包含 HTML 内容、其他页面等的更大网站的一部分，这将特别有用。
与您的体验相关的代码将与您的其余代码分开，但仍可通过该类以及您在该类中提供的所有方法和属性进行访问。
至于该类的名称，我喜欢使用，`Experience`但它可以是`MySuperGame`、`WebGLAwesomeStuff`或`Application`其他任何名称。
### 创建并实例化类
在该`/src/`文件夹中，创建一个`Experience/`文件夹，并在该`/src/Experience`文件夹中创建一个`Experience.js`文件。
在该文件中，导出一个类，如下所示：

```javascript
export default class Experience
{
    constructor()
    {
        console.log('Here starts a great experience')
    }
}
```

与体验相关的所有类都将位于该文件夹中。
在`/src/script.js` 中，我们可以导入并实例化该类：

```javascript
import Experience from './Experience/Experience.js'

const experience = new Experience()
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697629057-2f9d1383-c180-41ff-8989-be5eb5347011.png#averageHue=%2325262a&clientId=u088972ae-4aa2-4&from=paste&id=u5e676bcd&originHeight=136&originWidth=1334&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uca2821dd-1723-4170-b76d-91b11ac9e1a&title=)
有时，能够直接从控制台访问体验很有用。但目前的范围使这成为不可能。
我们能做的就是将实例保存在`window.` 为此，我们可以在`constructor`:

```javascript
export default class Experience
{
    constructor()
    {
        // Global access
        window.experience = this
    }
}
```

现在我们可以通过键入直接从控制台访问体验`window.experience`，甚至因为在`window`变量`experience`可以直接隐含在 `JavaScript` 中（真是个怪事）。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697628942-ecb261c4-492f-49c5-91d0-a86dd9403b50.png#averageHue=%23222326&clientId=u088972ae-4aa2-4&from=paste&id=u86371c38&originHeight=352&originWidth=1332&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue1bfe117-a5b2-4b83-bd7b-1a162d3db00&title=)
小心，这不是每个人都会喜欢的技巧，如果您有多种体验，最后一个将覆盖之前的。
### Canvas
在实例化 `Experience` 时，我们将把画布作为参数发送，以便在不同情况下使用我们类的其他开发人员能够选择他们想要使用的`<canvas>`内容。
在`/src/script.js`文件中实例化`Experience`，使用`querySelector()`发送`canvas`参数：

```javascript
const experience = new Experience(document.querySelector('canvas.webgl'))
```

并且，在类中，将其保存为属性：

```javascript
export default class Experience
{
    constructor(canvas)
    {
        // ...

        // Options
        this.canvas = canvas
    }
}
```

这是我们在本课中唯一需要的参数，但您可以发送任何您想要更改体验的参数。
## Useful classes
在整个项目中还有其他类很方便，它们可能会在您未来的项目中发挥作用。正如您将看到的，这些类不一定与 WebGL 或 Three.js 相关。这就是为什么我们要把它们放在我们`/src/Experience/Utils/`现在要创建的文件夹中的原因。
### 尺码Sizes Class
第一个有用的类是处理体验大小的类。它将包括视口的宽度和高度以及屏幕的像素比率。
我们将在调整大小时更新这些值，但我们也会警告调整大小时的体验。
在`/src/Experience/Utils/`文件夹中，创建`Sizes.js`类：

```javascript
export default class Sizes
{
    constructor()
    {
    }
}
```

并在`Experience`类中实例化它：

```javascript
import Sizes from './Utils/Sizes.js'

export default class Experience
{
    constructor(canvas)
    {
        // ...

        // Setup
        this.sizes = new Sizes()
    }
}
```

在该类中Sizes，添加通常的`width,height`和`pixelRatio`我们之前所做的一样，但将它们保存为属性：

```javascript
export default class Sizes
{
    constructor()
    {
        // Setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
    }
}
```

然后监听调整大小事件并更新这些属性：

```javascript
export default class Sizes
{
    constructor()
    {
        // ...

        // Resize event
        window.addEventListener('resize', () =>
        {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        })
    }
}
```

在这里，我们假设体验总是充满视口。如果不是这种情况，您将不得不以不同的方式做事。
我们现在可以从类访问`width`,`height`和`pixelRatioExperience`：

```javascript
import Sizes from './Utils/Sizes.js'

export default class Experience
{
    constructor(canvas)
    {
        // ...

        this.sizes = new Sizes()

        console.log(this.sizes.width)
        console.log(this.sizes.height)
        console.log(this.sizes.pixelRatio)
    }
}
```

在某些时候，我们还必须在调整大小时更新其他值，例如相机或渲染器。我们可以像刚才那样监听window 的`resize`事件，但相反，我们将使用该类`Sizes`来警告其他类有关该更改的信息。
### 事件发射器 EventEmitter
我们现在要做的是对我们的`Sizes`类做一点改变，以便它可以触发事件。稍后，我们将收听这些事件。
为此，我们将使该类继承自一个`EventEmitter`类。
`EventEmitter`将下面的类添加到`/src/Experience/Utils/`文件夹中：

```javascript
export default class EventEmitter
{
    constructor()
    {
        this.callbacks = {}
        this.callbacks.base = {}
    }

    on(_names, callback)
    {
        // Errors
        if(typeof _names === 'undefined' || _names === '')
        {
            console.warn('wrong names')
            return false
        }

        if(typeof callback === 'undefined')
        {
            console.warn('wrong callback')
            return false
        }

        // Resolve names
        const names = this.resolveNames(_names)

        // Each name
        names.forEach((_name) =>
        {
            // Resolve name
            const name = this.resolveName(_name)

            // Create namespace if not exist
            if(!(this.callbacks[ name.namespace ] instanceof Object))
                this.callbacks[ name.namespace ] = {}

            // Create callback if not exist
            if(!(this.callbacks[ name.namespace ][ name.value ] instanceof Array))
                this.callbacks[ name.namespace ][ name.value ] = []

            // Add callback
            this.callbacks[ name.namespace ][ name.value ].push(callback)
        })

        return this
    }

    off(_names)
    {
        // Errors
        if(typeof _names === 'undefined' || _names === '')
        {
            console.warn('wrong name')
            return false
        }

        // Resolve names
        const names = this.resolveNames(_names)

        // Each name
        names.forEach((_name) =>
        {
            // Resolve name
            const name = this.resolveName(_name)

            // Remove namespace
            if(name.namespace !== 'base' && name.value === '')
            {
                delete this.callbacks[ name.namespace ]
            }

            // Remove specific callback in namespace
            else
            {
                // Default
                if(name.namespace === 'base')
                {
                    // Try to remove from each namespace
                    for(const namespace in this.callbacks)
                    {
                        if(this.callbacks[ namespace ] instanceof Object && this.callbacks[ namespace ][ name.value ] instanceof Array)
                        {
                            delete this.callbacks[ namespace ][ name.value ]

                            // Remove namespace if empty
                            if(Object.keys(this.callbacks[ namespace ]).length === 0)
                                delete this.callbacks[ namespace ]
                        }
                    }
                }

                // Specified namespace
                else if(this.callbacks[ name.namespace ] instanceof Object && this.callbacks[ name.namespace ][ name.value ] instanceof Array)
                {
                    delete this.callbacks[ name.namespace ][ name.value ]

                    // Remove namespace if empty
                    if(Object.keys(this.callbacks[ name.namespace ]).length === 0)
                        delete this.callbacks[ name.namespace ]
                }
            }
        })

        return this
    }

    trigger(_name, _args)
    {
        // Errors
        if(typeof _name === 'undefined' || _name === '')
        {
            console.warn('wrong name')
            return false
        }

        let finalResult = null
        let result = null

        // Default args
        const args = !(_args instanceof Array) ? [] : _args

        // Resolve names (should on have one event)
        let name = this.resolveNames(_name)

        // Resolve name
        name = this.resolveName(name[ 0 ])

        // Default namespace
        if(name.namespace === 'base')
        {
            // Try to find callback in each namespace
            for(const namespace in this.callbacks)
            {
                if(this.callbacks[ namespace ] instanceof Object && this.callbacks[ namespace ][ name.value ] instanceof Array)
                {
                    this.callbacks[ namespace ][ name.value ].forEach(function(callback)
                    {
                        result = callback.apply(this, args)

                        if(typeof finalResult === 'undefined')
                        {
                            finalResult = result
                        }
                    })
                }
            }
        }

        // Specified namespace
        else if(this.callbacks[ name.namespace ] instanceof Object)
        {
            if(name.value === '')
            {
                console.warn('wrong name')
                return this
            }

            this.callbacks[ name.namespace ][ name.value ].forEach(function(callback)
            {
                result = callback.apply(this, args)

                if(typeof finalResult === 'undefined')
                    finalResult = result
            })
        }

        return finalResult
    }

    resolveNames(_names)
    {
        let names = _names
        names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '')
        names = names.replace(/[,/]+/g, ' ')
        names = names.split(' ')

        return names
    }

    resolveName(name)
    {
        const newName = {}
        const parts = name.split('.')

        newName.original  = name
        newName.value     = parts[ 0 ]
        newName.namespace = 'base' // Base namespace

        // Specified namespace
        if(parts.length > 1 && parts[ 1 ] !== '')
        {
            newName.namespace = parts[ 1 ]
        }

        return newName
    }
}
```

如果你想知道，我几年前写了这个类，我已经在几十个项目中使用它。我们不会解释代码，但会解释我们需要和将要使用的方法。
使`Sizes`该类继承自该类`EventEmitter`。不要忘记导入它并在开头使用`super()`该函数`constructor`：

```javascript
import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter
{
    constructor()
    {
        super()
        
        // ...
    }
}
```

似乎什么都没有改变，但是现在，我们的`Sizes`类可以访问`EventEmitter`的方法。
我们需要两种方法。
该`on(...)`方法将监听事件，并且`trigger(...)`该方法将`addEventListener()`触发这些事件。我们将从班级内部触发事件并从班级外部收听这些事件。
在`Sizes`类的`resize`事件回调中，触发一个名为`resize`：

```javascript
export default class Sizes extends EventEmitter
{
    constructor()
    {
        // ...

        window.addEventListener('resize', () =>
        {
            // ...

            this.trigger('resize')
        })
    }
}
```

您可以为事件选择任何名称，但`resize`似乎合适。
在类中，在`Experience`类的实例上监听具有相同事件名称的`resizeSize`事件：

```javascript
import Sizes from './Utils/Sizes.js'

export default class Experience
{
    constructor(canvas)
    {
        // Global access
        window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        this.sizes = new Sizes()

        // Resize event
        this.sizes.on('resize', () =>
        {
            console.log('A resize occurred')
        })
    }
}
```

调整视口大小，您应该会在控制台中看到`A resize occurred`。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697628980-f65c7a3e-007a-406f-9452-98ffd8eed41a.png#averageHue=%23282b2e&clientId=u088972ae-4aa2-4&from=paste&id=u8cc0f23f&originHeight=64&originWidth=746&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue9a18632-346f-4528-9913-1b78f6bbae2&title=)
稍后，我们将有更多关于发生调整大小时该怎么做的说明，这就是为什么我们应该将它放在一个单独的方法中。创建一个`resize()`方法并在事件发生时调用该方法`resize`：

```javascript
import Sizes from './Utils/Sizes.js'

export default class Experience
{
    constructor(canvas)
    {
        // ...

        this.sizes.on('resize', () =>
        {
            this.resize()
        })
    }

    resize()
    {

    }
}
```

我们不能直接将`resize`方法作为参数 ( `this.sizes.on('resize', this.resize)`) 发送，因为上下文 ( `this`) 将是`Sizes`实例而不是`Experience`实例。这是一个经典的上下文问题，我们可以通过绑定来解决，但我们不打算在这里讨论。相反，我们只会从箭头函数内部调用`resize`。
我们`Sizes` `Class`就是这样。
### 时间 Time
另一个非常有用的类是处理时间的类。这个类的工作方式有点像Three.js 的[Clock](https://threejs.org/docs/#api/en/core/Clock)类。
它将节省：

- 当前时间。
- 经过的时间。
- 当前帧和前一帧之间的增量时间。

该类还将在每一帧上触发一个事件，以便我们可以收听该事件并更新整个体验。
在`/src/Experience/Utils/`文件夹中，创建`Time.js`类并继承类`EventEmitter`：

```javascript
import EventEmitter from './EventEmitter.js'

export default class Time extends EventEmitter
{
    constructor()
    {
        super()
    }
}
```


`Experience`像我们为`Sizes`类所做的那样在类中实例化该类：

```javascript
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'

export default class Experience
{
    constructor(canvas)
    {
        // ...

        this.sizes = new Sizes()
        this.time = new Time()

        // ...
    }
}
```

在类中创建以下属性Time.js：

```javascript
import EventEmitter from './EventEmitter.js'

export default class Time extends EventEmitter
{
    constructor()
    {
        super()

        // Setup
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16
    }
}
```

- `start`将包含体验开始时的时间戳并将保持不变。
- `current`将包含当前时间戳，并将在每一帧发生变化。
- `elapsed`将包含自体验开始以来花费了多少时间。
- `delta`将包含自上一帧以来花费了多少时间。我们默认将其设置为 `16`，这接近于 `60fps` 下两帧之间的毫秒数。

然后我们可以创建一个`tick()`方法并执行与课程开始时相同的循环`window.requestAnimationFrame(...)`：

```javascript
// ...

export default class Time extends EventEmitter
{
    constructor()
    {
        // ...

        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
    }

    tick()
    {
        console.log('tick')

        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
    }
}
```

您应该在控制台中看到一堆`tick`日志。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697631563-c7c2d456-c797-49f9-8ba0-44f713432865.png#averageHue=%23222427&clientId=u088972ae-4aa2-4&from=paste&id=ue2d62c72&originHeight=218&originWidth=1438&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9ae54b64-8d98-4531-968d-9e863ea4377&title=)
我们可以在`constructor`没有 `tick` 的情况下立即调用`window.requestAnimationFrame`该方法，但这会导致delta 增量 0 等于第一帧。
我们现在可以更新`current`时间，计算`delta`时间并更新`elapsed`时间：

```javascript
// ...

export default class Time extends EventEmitter
{
    // ...

    tick()
    {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        // ...
    }
}
```

您可以测试这些值以确保它们是正确的。它们将以毫秒为单位，但如果您愿意，可以做一些数学运算将它们更改为秒。
最后，我们可以触发一个`tick`事件：

```javascript
// ...

export default class Time extends EventEmitter
{
    // ...

    tick()
    {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.trigger('tick')

        // ...
    }
}
```

并在类中监听该事件`Experience`以调用`update()`方法：

```javascript
// ...

export default class Experience
{
    constructor(canvas)
    {
        // ...

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    // ...

    update()
    {
        
    }
}
```

我们现在有一个`resize()`方法和一个`update()`方法在Experience. 这些方法是自动调用的，它们将在需要时更新其余的体验。
可`EventEmitter`用于任何需要触发事件的类。例如，它可用于表示模型动画已完成、已单击对象、玩家正在离开关卡等。
后面我们要用它来讲述所有资源加载完毕的体验。
## 场景
现在我们有了主类和一些有用的类，我们可以开始使用 Three.js 了。
在类中，使用`Experience`类添加[Scene](https://threejs.org/docs/?q=scene#api/en/scenes/Scene)场景属性。不要忘记像我们以前那样导入：three

```javascript
import * as THREE from 'three'

// ...

export default class Experience
{
    constructor(canvas)
    {
        // ...

        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()

        // ...
    }

    // ...
}
```

## 相机（和单例）
对于相机，我们将创建一个单独的类。
在`/src/Experience/`文件夹中，创建一个`Camera`类：

```javascript
export default class Camera
{
    constructor()
    {
        
    }
}
```

并在`Experience`类中实例化它：

```javascript
// ...
import Camera from './Camera.js'

export default class Experience
{
    constructor(canvas)
    {
        // ...

        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()

        // ...
    }

    // ...
}
```

但是现在，我们有一个问题。在`Camera`类中，我们将实例化[PerspectiveCamera](https://threejs.org/docs/?q=persp#api/en/cameras/PerspectiveCamera)和[OrbitControls](https://threejs.org/docs/?q=orbit#examples/en/controls/OrbitControls)类。但是这些额外的类需要诸如`width`、`height`以及`<canvas>`for [OrbitControls](https://threejs.org/docs/?q=orbit#examples/en/controls/OrbitControls)之类的信息。我们还需要将这个类添加到[Scene](https://threejs.org/docs/?q=scene#api/en/scenes/Scene)中。
换句话说，我们需要访问`Experience`类中的属性。
可以通过三种方式从相机访问体验：

- 来自全局变量
- 通过发送参数
- 通过使用单例

为了学习它们，我们将探索所有这三种技术，但只使用一种。
### 访问体验

- **全局变量**

早些时候，我们将体验添加到`window`：

```javascript
window.experience = this
```

这使得它可以在代码中的任何位置访问，如类中所示`Camera`：

```javascript
export default class Camera
{
    constructor()
    {
        this.experience = window.experience

        console.log(this.experience)
    }
}
```

虽然这有效，但它假定我们`window`确实拥有可用的`experience`属性，并且代码的其他部分确保不会操作该属性。
不推荐添加到全局属性`window`，这就是我们不使用该技术的原因。

- **携带一个参数**

另一种解决方案是将体验作为参数发送给需要它的每个类。
在`Experience Class`上，我们会输入：

```javascript
// ...

export default class Experience
{
    constructor(canvas)
    {
        // ...

        this.camera = new Camera(this)

        // ...
    }

    // ...
}
```

在上`Camera Class`，我们会输入：

```javascript
export default class Camera
{
    constructor(experience)
    {
        this.experience = experience
        
        console.log(this.experience)
    }
}
```

这是一个很好的解决方案。主要问题是，如果我们有更深层次的结构，我们需要为每个需要获得体验的Class以及他们的父级这样做。
我们完全可以选择这个解决方案，但为了学习，我们将使用更方便的方案。

- **通过单例**

简而言之，单例是一个在第一次实例化时会像往常一样实例化的类。但是，对于以下所有时间，它将返回第一个实例。
我们可以做一堆`new Experience()`实例化，但只有第一个才是真正的实例。所有其他实例化也将返回第一个实例。
要将我们的`Experience`类转换为单例，请在最开始添加以下代码`constructor`：

```javascript
// ...

let instance = null

export default class Experience
{
    constructor(canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this
        
        // ...
    }

    // ...
}
```

我们创建一个`instance`变量为`null`并将其设置到类的外部。
在 `constructor`中，我们测试该变量中是否有内容。如果是这样，那么我们将返回里面的内容。当我们执行`return` 时，函数会停在那里，其余的不会执行。否则，我们将实例 ( `this`) 保存在该变量中并继续执行函数的其余部分。
现在，我们可以在代码中任何需要的地方导入它，然后实例化`Experience`以检索第一个实例。
在课堂上`Camera`：

```javascript
import Experience from './Experience.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()

        console.log(this.experience)
    }
}
```

这个解决方案听起来更干净一点，但也更复杂一点。如果您对单例不满意，请不要犹豫，使用之前的解决方案之一。
现在我们可以访问体验，我们也可以访问它的属性。我们将需要`sizes`、`scene`和`canvas`。我们可以将这些作为属性保存到`Camera`类中：

```javascript
import Experience from './Experience.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
    }
}
```
### 实例
创建[PerspectiveCamera](https://threejs.org/docs/?q=orbit#api/en/cameras/PerspectiveCamera)并将其保存为`instance`属性。不要忘记导入`three`：

```javascript
import * as THREE from 'three'
import Experience from './Experience.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(6, 4, 8)
        this.scene.add(this.instance)
    }
}
```

### 轨道控制
对[OrbitControls](https://threejs.org/docs/?q=orbit#examples/en/controls/OrbitControls)做同样的事情：

```javascript
// ...
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        // ...

        this.setControls()
    }

    // ...

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }
}
```

### 调整大小
我们还不能测试它，但如果我们要调整视口的大小，相机将不会更新。
我们可以在课堂上听这个`resize`活动`Sizes`。但最好从父 ( `Experience`) 到子 ( `Camera`) 调用它。它在这里不相关，但是一旦我们有很多类，这些类具有通过实例传播的许多调整大小，控制这些调整大小的顺序是很有用的。
在**Camera**类中，添加`resize()`方法：

```javascript
// ...

export default class Camera
{
    // ...

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }
}
```


在`Experience`类的`resize()`方法中，调用该方法：

```javascript
// ...

export default class Experience
{
    // ...

    resize()
    {
        this.camera.resize()
    }

    // ...
}
```

我们仍然无法真正对此进行测试，因为场景中我们还看不到任何东西。但是您可以尝试调整视口的大小以检查潜在的错误，即使页面保持白色也是如此。
### 更新
正如我们对调整大小所做的那样，我们还需要在每一帧上更新此类。这是由于[OrbitControls](https://threejs.org/docs/?q=orbit#examples/en/controls/OrbitControls)及其阻尼功能。
在**Camera**类中，创建`update`方法：

```javascript
// ...

export default class Camera
{
    // ...

    update()
    {
        this.controls.update()
    }
}
```

并在**Experience Class**上称呼它：

```javascript
// ...

export default class Experience
{
    // ...

    update()
    {
        this.camera.update()
    }
}
```


您现在应该看到我们的结构模式，其中一切都从主类开始并传播到子类。
## 渲染器 
就像我们创建类的方式一样**Camera**，让我们创建一个**Renderer**类。
创建一个`/src/Experience/Renderer.js`文件。
在此类中，检索**Experience**和以下属性：

```javascript
import Experience from './Experience.js'

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
    }
}
```

在以下位置导入并实例化此类**Experience**：

```javascript
// ...

import Renderer from './Renderer.js'

// ...

export default class Experience
{
    constructor(canvas)
    {
        // ...

        this.renderer = new Renderer()

        // ...
    }
}
```

我们现在可以使用`sizes`和`canvas`属性实例化[WebGLRenderer](https://threejs.org/docs/?q=webglrend#api/en/renderers/WebGLRenderer)。不要忘记导入**three**：

```javascript
import * as THREE from 'three'
import Experience from './Experience.js'

export default class Renderer
{
    constructor()
    {
        // ...

        this.setInstance()
    }

    setInstance()
    {
      this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.physicallyCorrectLights = true
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }
}
```

添加`resize()`方法：

```javascript
// ...

export default class Renderer
{
    // ...

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }
}
```


并从**Experience**类中的`resize()`方法调用它：

```javascript
// ...

export default class Experience
{
    // ...

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    // ...
}
```

添加`update()`使用**scene**和**camera**进行渲染的方法。注意，该**camera**属性是我们类的一个实例**Camera**，而不是 Three.js 相机。我们可以通过以下方式访问 Three.js 相机**this.camera.instance**：

```javascript
// ...

export default class Renderer
{
    // ...

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }
}
```

并在**Experience Class**上调用它：

```javascript
// ...

export default class Experience
{
    // ...

    update()
    {
        this.camera.update()
        this.renderer.update()
    }
}
```

屏幕上仍然没有任何内容，但我们已经接近了。我们实际上正在做渲染，但我们的场景是空的。
## 世界
是时候向我们的场景添加一些可见的东西了。为了防止`/src/Experience`文件夹中有太多类，我们将把组成我们世界的所有东西分开在一个单独的类和文件夹中，名为**World**.
在**World**其中创建一个文件夹并在其中`/src/Experience/`创建一个类。**World**首先检索新创建的类中的**Experience**和**scene**：

```javascript
import Experience from '../Experience.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
    }
}
```

在**Experience**中实例化它：

```javascript
import World from './World/World.js'

// ...

export default class Experience
{
    constructor(canvas)
    {
        // ...

        this.world = new World()

        // ...
    }
}
```

让我们[向](https://threejs.org/docs/?q=mesh#api/en/objects/Mesh)我们的**World**. 不要忘记导入**three**：

```javascript
import * as THREE from 'three'

// ...

export default class World
{
    constructor()
    {
        // ...

        // Test mesh
        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ wireframe: true })
        )
        this.scene.add(testMesh)
    }
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697634098-20dc5fb8-d199-435d-a204-fa3790ae5bec.png#averageHue=%23252023&clientId=u088972ae-4aa2-4&from=paste&id=ub9a5e9d1&originHeight=1920&originWidth=3072&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u10ee29a6-a157-45d6-9e83-9744eb7d65a&title=)
恭喜你，终于可以看到东西了。
## 阳光 Sunlight 
如果你记得我们的场景是什么样的，我们有一只狐狸在地板上，有灯光和阴影。在继续之前，我们需要为我们正在构建的场景添加一盏灯。
根据项目的特点和您的喜好，这部分的结构可能会有很大差异。对于这种体验，我们将创建一个**Environment**包含光的类。稍后，我们将向其添加环境贴图。
首先，让我们将**testMesh**材质更改为[MeshStandardMaterial](https://threejs.org/docs/?q=meshstan#api/en/materials/MeshStandardMaterial)，以便我们能够看到光：

```javascript
// ...

export default class World
{
    constructor()
    {
        // ...

        // Test mesh
        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial()
        )
        this.scene.add(testMesh)
    }
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697634074-c21e6bab-a8bc-4e6f-a8f5-081f519bfb36.png#averageHue=%23241f22&clientId=u088972ae-4aa2-4&from=paste&id=u1b831011&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ub7b14aa3-b5f6-4ee5-a283-87fa0641cf5&title=)
现在在`/src/Experience/World/`文件夹中创建**Environment**类：

```javascript
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
    }
}
```

然后，在**World**类之后实例化它**testMesh**：

```javascript
// ...
import Environment from './Environment.js'

export default class World
{
    constructor()
    {
        // ...

        // Setup
        this.environment = new Environment()
    }
}
```

现在，我们可以将光添加到该环境中。
因为我们的光会模仿太阳，所以我们可以将属性命名为**sunLight**。不要忘记导入**three**：

```javascript
import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        // Setup
        this.setSunLight()
    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3, 3, - 2.25)
        this.scene.add(this.sunLight)
    }
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697636360-34e37042-79c2-47ea-8bdb-02d24786128a.png#averageHue=%23252023&clientId=u088972ae-4aa2-4&from=paste&id=u982ce1cf&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u4455bcd3-f8b2-4775-b6ff-e8078d5d1da&title=)
在基础项目中，我们还有一个环境贴图。我们可以在类中实例化一个[CubeTextureLoader](https://threejs.org/docs/?q=cubete#api/en/loaders/CubeTextureLoader)**Environment**，但这意味着每个类都将自行处理资源加载。我们最终会搞得一团糟，我们不知道资产是否准备好，它们会在加载时弹出屏幕。
## 资源 Resources 
为了让事情更清晰，我们将把资产加载集中在一个专门的类中。这个类将实例化我们需要的所有加载器。然后我们发送一个资产数组来加载，一旦所有这些资产都被加载，我们让该类触发一个事件。
在`/src/Experience/Utils/`文件夹中，创建一个**Resources**类。我们已经知道这个类将触发一个事件，这就是为什么我们可以扩展这个**EventEmitter**类：

```javascript
import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter
{
    constructor()
    {
        super()
    }
}
```

在实例化场景后立即在**Experience**类中实例化它：

```javascript
// ...

import Resources from './Utils/Resources.js'

// ...

export default class Experience
{
    constructor(canvas)
    {
        // ...

        this.scene = new THREE.Scene()
        this.resources = new Resources()

        // ...
    }

    // ...
}
```

对于要加载的资产列表，我们将使用一个数组。数组中的每个资源都将由一个由以下属性组成的对象定义：

- **name**: 将用于检索加载的资源。
- **type**: 为了知道使用什么装载机。
- **path**: 要加载的文件的路径。

对于一个更大的项目，这个数组可能会变得有点胖，这就是为什么最好将它放在一个单独的文件中。
在该`/src/Experience/`文件夹中，创建一个`sources.js`导出以下数组的文件：

```javascript
export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg'
        ]
    }
]
```

稍后我们将向该数组添加更多源。
现在，在**Experience**类中，导入该数组并将其作为参数发送给**Resources**类：

```javascript
// ...

import sources from './sources.js'

// ...

export default class Experience
{
    constructor(canvas)
    {
        // ...

        this.resources = new Resources(sources)

        // ...
    }

    // ...
}
```

然后将其保存为**Resources**类中的属性：

```javascript
import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()

        // Options
        this.sources = sources

        console.log(this.sources)
    }
}
```

您应该在控制台中看到您的来源。
在**Resources**类中，创建以下三个属性：

- **items**其中包含加载的资源；我们将在加载源时填充此属性。
- **toLoad**其中包含要加载的源数 ( **this.sources.length**)。
- **loaded**其中包含加载的源数（从 开始**0**）。

```javascript
import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        // ...

        // Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0
    }
}
```


我们现在要创建不同的装载机。在这个项目中，我们将需要[GLTFLoader](https://threejs.org/docs/?q=GLTFLoader#examples/en/loaders/GLTFLoader)、[TextureLoader](https://threejs.org/docs/?q=TextureLoader#api/en/loaders/TextureLoader)和[CubeTextureLoader](https://threejs.org/docs/?q=TextureLoader#api/en/loaders/CubeTextureLoader)。我们将一次创建它们，但您通常会在工作时逐步添加它们。不要忘记导入**three**和**GLTFLoader**：

```javascript
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// ...

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        // ...

        this.setLoaders()
    }

    setLoaders()
    {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    }
}
```

我们不打算使用 Draco 压缩模型，但如果您想加载一个，您还需要在此处添加 DracoLoader [。](https://threejs.org/docs/#examples/en/loaders/DRACOLoader)
我们现在要创建一个`startLoading()`方法。在该方法中，我们将遍历数组**sources**并使用相应的加载器加载它们：

```javascript
// ...

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        // ...

        this.startLoading()
    }

    // ...

    startLoading()
    {
        // Load each source
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        console.log(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        console.log(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        console.log(source, file)
                    }
                )
            }
        }
    }
}
```


您应该看到源和加载的资源在加载时被记录在控制台中。
在每次加载时，我们将调用一个`sourceLoaded`方法，将加载的资源保存在`items`属性中，更新`loaded`属性并测试加载是否完成。如果加载了所有源，我们将触发一个`ready`事件：

```javascript
// ...

export default class Resources extends EventEmitter
{
    // ...

    startLoading()
    {
        // Load each source
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file

        this.loaded++

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }
}
```

`ready`什么都不应该发生，但现在我们可以在实例上监听`Resources`事件。
在**World**类中，在**Environment**实例化类之前检索`Resources`实例并监听`ready`事件：

```javascript
// ...

export default class World
{
    constructor()
    {
        // ...

        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.environment = new Environment()
        })

        // ...
    }
}
```

您在哪里以及如何收听活动**ready**由您决定。在这个项目中，我们将需要世界每个组成部分的资源。但在其他项目中，您可以在加载其余体验的同时开始向用户展示内容，加载后，您可以将其余部分添加到场景中。
以[bruno-simon.com](https://bruno-simon.com/)为例。加载程序的图形几乎立即显示出来，即使它是 3D 的。然后，一旦加载了其余部分，我们就可以单击按钮并发现体验。
## 环境图 Environment map
我们现在可以检索**Resources**环境中的实例并使用该`environmentMapTexture`项目创建环境贴图：

```javascript
// ...

export default class Environment
{
    constructor()
    {
        // ...
        this.resources = this.experience.resources
        
        // Setup
        this.setSunLight()
        this.setEnvironmentMap()
    }

    // ...

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding
        
        this.scene.environment = this.environmentMap.texture
    }
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697637368-b30c76e9-a537-4ab2-bc37-ff1bb7f5ef36.png#averageHue=%23252023&clientId=u088972ae-4aa2-4&from=paste&id=u0dc7fffb&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u1ec85ddd-07f1-4359-b8ed-b969d9651d9&title=)
不幸的是，这行不通，因为环境贴图是在立方体之后添加的，我们需要通知立方体材质它需要更新。
向`environmentMap`属性添加一个`updateMaterials`方法，该方法将遍历场景并在需要时更新材质并在之后立即调用它们：

```javascript
// ...

export default class Environment
{
    // ...

    setEnvironmentMap()
    {
        // ...

        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()
    }
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697638320-0717764a-1082-4f69-885e-8b8581c9d7e4.png#averageHue=%23211d20&clientId=u088972ae-4aa2-4&from=paste&id=u7d93f0a4&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=udcccb6a7-1356-4031-baa0-dd7a8036da3&title=)
您应该看到环境贴图影响了立方体的暗面，现在看起来更亮了。
将场景遍历放在一个单独的函数中会在以后变得很方便。
## 地面 
现在我们有了我们的**Resources Class**，地板会更容易添加。
首先，加载位于`/textures/dirt/normal.jpg` 和`** **/textures/dirt/color.jpg`的两个纹理并将它们添加到`sources.js`文件中：

```javascript
export default [

    /* ... */,
    {
        name: 'grassColorTexture',
        type: 'texture',
        path: 'textures/dirt/color.jpg'
    },
    {
        name: 'grassNormalTexture',
        type: 'texture',
        path: 'textures/dirt/normal.jpg'
    }
]
```

（不要忘记，上一个来源末尾的`**,** `）。
在`/src/Experience/World/`文件夹中创建一个**Floor**类：

```javascript
import Experience from '../Experience.js'

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
    }
}
```


然后在**World**类中实例化它。确保在**Environment** 之前执行此操作，因为环境会更新场景的每个子项，并且我们希望地板在发生这种情况时位于该场景中：

```javascript
// ...

import Floor from './Floor.js'

export default class World
{
    constructor()
    {
        // ...

        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.environment = new Environment()
        })

        // ...
    }
}
```

在这个例子中，我们将把地板的每个部分分成一个单独的方法：

- **setGeometry**
- **setTextures**
- **setMaterial**
- **setMesh**

```javascript
import Experience from '../Experience.js'

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Setup
        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }
}
```

对于几何，我们创建一个[CircleGeometry](https://threejs.org/docs/?q=CircleGeometry#api/en/geometries/CircleGeometry)。不要忘记导入**three**：

```javascript
import * as THREE from 'three'

// ...

export default class Floor
{
    // ...

    setGeometry()
    {
        this.geometry = new THREE.CircleGeometry(5, 64)
    }
}
```

在设置材质之前，我们需要对纹理做一些处理。我们需要让它们重复并确保颜色纹理的编码是**sRGGEncoding**：

```javascript
// ...

export default class Floor
{
    // ...

    setTextures()
    {
         this.textures = {}

        this.textures.color = this.resources.items.grassColorTexture
        this.textures.color.colorSpace = THREE.SRGBColorSpace
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

        this.textures.normal = this.resources.items.grassNormalTexture
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping
    }
}
```

现在我们可以添加材料了：

```javascript
// ...

export default class Floor
{
    // ...

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal
        })
    }
}
```

最后是网格，不要忘记确保它接收到阴影：

```javascript
// ...

export default class Floor
{
    // ...

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697638924-c4ff4a6d-7d87-459a-9785-81f1fbefc3b8.png#averageHue=%23624b36&clientId=u088972ae-4aa2-4&from=paste&id=ueaea4b1f&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ufcd52c13-ba12-44b3-afee-ad77c8bc9f1&title=)
我们现在有一个漂亮的地板，我们可以摆脱盒子。
不要介意丢失的影子，我们稍后会修复它。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697639961-a31c9cd7-46b6-404f-9975-954250c54567.png#averageHue=%23624a34&clientId=u088972ae-4aa2-4&from=paste&id=ucacc7bcd&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u92147dc3-2af3-4563-a10d-ab61776525b&title=)
不，这不是煎饼。
## 狐狸
狐狸的过程非常相似。我们将加载模型并将其添加到场景中。
不同之处在于动画。
通过将其添加到`sources.js`来加载位于/models/Fox/glTF/Fox.gltf的模型：

```javascript
export default [
    // ...
    {
        name: 'foxModel',
        type: 'gltfModel',
        path: 'models/Fox/glTF/Fox.gltf'
    }
]
```

在`/src/Experience/World/`文件夹中创建一个**Fox**类：

```javascript
import Experience from '../Experience.js'

export default class Fox
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
    }
}
```

并在**World**类中实例化它，但要确保在 **Environment **之前执行此操作，因为环境将更新场景的每个子项，我们希望狐狸在它更新时出现在该场景中：

```javascript
// ...

import Fox from './Fox.js'

export default class World
{
    constructor()
    {
        // ...

        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.fox = new Fox()
            this.environment = new Environment()
        })
    }
}
```

在**Fox**类中，我们可以从以下位置获取资源**Resources**：

```javascript
// ...

export default class Fox
{
    constructor()
    {
        // ...

        // Setup
        this.resource = this.resources.items.foxModel
    }
}
```

实际模型可以作为我们资源中称为`scene`的项目进行访问。但是，由于我们将需要该资源中的更多项目，我们将其全部保存为一个`foxModel`属性。
在一个单独的方法中，保存实际模型，缩放它，将它添加到您的场景并确保它投射阴影。不要忘记导入**three**：

```javascript
import * as THREE from 'three'
// ...

export default class Fox
{
    constructor()
    {
        // ...

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.02, 0.02, 0.02)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697641169-877a5029-4858-4e8b-8643-f241ecef5952.png#averageHue=%23614933&clientId=u088972ae-4aa2-4&from=paste&id=uc16060a0&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u00b11b79-40ed-4ba6-a1ac-eceb60c9eed&title=)
这是我们的狐狸，但我们仍然需要让动画正常工作。
在**Fox**类中创建一个`this.resource.animations`并添加第一个[AnimationMixer](https://threejs.org/docs/?q=mixer#api/en/animation/AnimationMixer)动画：

```javascript
// ...

export default class Fox
{
    constructor()
    {
        // ...

        this.setAnimation()
    }

    // ...

    setAnimation()
    {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        this.animation.action = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.action.play()
    }
}
```

这是一个好的开始，但如果您还记得之前的课程之一，我们需要在每一帧上更新该混合器。
为此，我们将更新**World**并且**World**将更新**Fox**.
在**Experience** **Class**上，更新**World**. 确保在进行渲染之前正确执行此操作：

```javascript
//...

export default class Experience
{
    // ...

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }
}
```

在**World** 中，更新**Fox**，但首先确保它存在，因为模型可能尚未加载：

```javascript
// ...

export default class World
{
    // ...

    update()
    {
        if(this.fox)
            this.fox.update()
    }
}
```

在**Fox**类中，检索**Time**类，因为我们将需要经过的时间，然后创建**update**更新 `AnimationMixer` 的[方法](https://threejs.org/docs/?q=mixer#api/en/animation/AnimationMixer)：

```javascript
// ...

export default class Fox
{
    constructor()
    {
        // ...

        this.time = this.experience.time

        // ...
    }

    // ...

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}
```

狐狸应该是有动画的。
似乎我们已经完成了，但是我们忘记了一些东西。
## 调试
我们缺少一个非常重要的部分，即调试 UI。
### 添加类
在`/src/Experience/Utils/`中创建一个**Debug**类：

```javascript
export default class Debug
{
    constructor()
    {
        
    }
}
```

在**Experience**类中，在任何其他类之前实例化它：

```javascript
// ...

import Debug from './Utils/Debug.js'

// ...

export default class Experience
{
    constructor(canvas)
    {
        // ...

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        
        // ...
    }

    // ...
}
```


我们将让用户选择拥有它，而不是总是拥有调试 UI。
如果用户在末尾访问了 URL **#debug**，他们将拥有调试 UI。否则，没有调试 UI。
这很方便，因为大多数用户会在不看到 UI 的情况下访问该网站，但是知道他们在做什么的用户（比如您作为开发人员）可以访问 UI 而无需重建项目。
**#debug**要测试URL 中是否存在，我们可以使用**window.location.hash**：

```javascript
export default class Debug
{
    constructor()
    {
        this.active = window.location.hash === '#debug'
    }
}
```

如果是这样，我们在属性中实例化 Dat.GUI **ui**。不要忘记导入`**lil-gui**`：

```javascript
import * as dat from 'lil-gui'

export default class Debug
{
    constructor()
    {
        this.active = window.location.hash === '#debug'

        if(this.active)
        {
            this.ui = new dat.GUI()
        }
    }
}
```

通过在URl末尾`#debug`添加来访问 。请注意，在更改URL或向 **URL** 添加 # 时，大多数浏览器不会自动刷新，您必须自己进行。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697642708-ce2ef452-84f7-4548-8b7c-26f609b61325.png#averageHue=%235d452f&clientId=u088972ae-4aa2-4&from=paste&id=u2554cf18&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ub0170774-77cb-4a95-aeca-878f146d206&title=)
调试 UI 应出现在右上角。
### 调试狐狸
让我们从狐狸开始吧。作为一个小奖励，我们将创建三个调试按钮，让我们播放模型的三种不同动画。
首先，在**Fox**类中，检索**Debug**类，如果**debug.active**是**true**，则创建一个文件夹：

```javascript
// ...

export default class Fox
{
    constructor()
    {
        // ...

        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('fox')
        }

        // ...
    }

    // ...
}
```


在`setAnimation`方法中，我们将进行一些更改。
首先，让我们创建所有可用的三个操作`this.resource.animations`并将它们保存在一个`actions`属性中：

```javascript
// ...

export default class Fox
{
    // ...

    setAnimation()
    {
        this.animation = {}
        
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        
        this.animation.actions = {}
        
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
    }

    // ...
}
```

然后，我们将其中一个保存在`current`属性中并播放：

```javascript
// ...

export default class Fox
{
    // ...

    setAnimation()
    {
        this.animation = {}
        
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        
        this.animation.actions = {}
        
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
        
        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()
    }

    // ...
}
```

我们应该得到相同的结果，但现在，我们可以访问`walking`和`running`动画。
在为模型播放新动画时，我们希望平滑过渡。为此，我们可以使用[AnimationAction](https://threejs.org/docs/?q=actio#api/en/animation/AnimationAction.crossFadeFrom)类中可用的众多方法之一。
我们将使用`crossFadeFrom(...)`. 需要在传入操作上调用此方法，将前一个操作作为第一个参数，将转换的持续时间（以秒为单位）作为第二个参数。我们还需要重置并播放新动画。
我们将把这些指令放在一个新的方法中。在`animation`属性中，创建一个`play`方法：

```javascript
this.animation.play = (name) =>
{
}
```

在那个`play`方法中，定义以前的和新的动作：

```javascript
this.animation.play = (name) =>
{
    const newAction = this.animation.actions[name]
    const oldAction = this.animation.actions.current
}
```

然后，重置新的，播放它并执行以下`crossFadeFrom(...)`操作：

```javascript
this.animation.play = (name) =>
{
    const newAction = this.animation.actions[name]
    const oldAction = this.animation.actions.current

    newAction.reset()
    newAction.play()
    newAction.crossFadeFrom(oldAction, 1)
}
```

最后，将新动作保存在属性中`current`，这样，下次我们调用我们的`play`函数时，它就会从该动作淡入淡出到新动作：

```javascript
this.animation.play = (name) =>
{
    const newAction = this.animation.actions[name]
    const oldAction = this.animation.actions.current

    newAction.reset()
    newAction.play()
    newAction.crossFadeFrom(oldAction, 1)

    this.animation.actions.current = newAction
}
```

理论上，我们的代码应该可以工作。但是有没有一种方法可以在不将按钮添加到调试 UI 的情况下对其进行测试？
请记住，我们将经验放在一个名为 `**experience** `的全局变量中。这意味着，在控制台中，我们可以键入：

```javascript
window.experience.world.fox.animation.play('walking')
```

你应该看到狐狸开始走路了。
我们现在可以将调试按钮添加到我们的`fox`调试文件夹中。
请记住，Dat.GUI 需要该值作为属性可用。不幸的是，我们不能只将`this.animation.play`函数添加到 Dat.GUI，因为我们还需要发送要播放的动作的名称。
我们将使用 `debugObject`并放入三个函数，每个函数都`this.animation.play`使用相应的参数调用：

```javascript
// ...

export default class Fox
{
    // ...

    setAnimation()
    {
        // ...

        // Debug
        if(this.debug.active)
        {
            const debugObject = {
                playIdle: () => { this.animation.play('idle') },
                playWalking: () => { this.animation.play('walking') },
                playRunning: () => { this.animation.play('running') }
            }
            this.debugFolder.add(debugObject, 'playIdle')
            this.debugFolder.add(debugObject, 'playWalking')
            this.debugFolder.add(debugObject, 'playRunning')
        }
    }

    // ...
}
```

我们现在可以直接从调试 UI 测试不同的动画。
### 调试环境
出于本课的目的并确保我们可以使用调试 UI，让我们对环境进行一些调整。
在**Environment**类中，检索`Debug`并`active`添加一个文件夹：

```javascript
// ...

export default class Environment
{
    constructor()
    {
        // ...

        this.debug = this.experience.debug
        
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }

        // ...
    }

    // ...
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1685697644077-831ffe6e-81b6-420a-add6-2a3b2f522242.png#averageHue=%23614933&clientId=u088972ae-4aa2-4&from=paste&id=uaefd144b&originHeight=1120&originWidth=1792&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf562b0f5-e7cc-4cf1-8bca-9af162b7a89&title=)
您应该会看到**environment**调试文件夹。
在`setEnvironment`函数中，为该文件夹添加一个调整`intensity`，不要忘记`this.environmentMap.updateMaterials`在值更改时调用我们之前准备的方法：

```javascript
// ...

export default class Environment
{
    // ...

    setEnvironmentMap()
    {
        // ...

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)
        }
    }
}
```

我们现在可以调整环境贴图强度，并且场景的所有子项都会正确更新。
让我们对`sunLight`和 `intensity`添加调整来控制`position.z`、`position.x`和`position.y`：

```javascript
// ...

export default class Environment
{
    // ...

    setSunLight()
    {
        // ...

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(10)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'x')
                .name('sunLightX')
                .min(- 5)
                .max(5)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'y')
                .name('sunLightY')
                .min(- 5)
                .max(5)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'z')
                .name('sunLightZ')
                .min(- 5)
                .max(5)
                .step(0.001)
        }
    }

    // ...
}
```

我们现在可以调整光线。
## 销毁 Destroying 
在某些时候，您可能需要销毁部分体验，甚至是整个体验。这可能是因为动画已经完成，玩家移动到另一个级别，WebGL 不再可见或者狐狸跑掉了。
我们可以让事情保持原样，但这对表演不利。我们有在每一帧上调用的函数，我们有 GPU 上的纹理，我们有监听器，等等。
在本节中，我们将销毁整个体验并确保妥善处理这些东西。
### 停止时间和调整大小事件
首先，让我们在我们的**Experience**类中添加一个 `destroy` 方法。`off()`此方法将停止侦听`Time`和`Sizes`事件：

```javascript
// ...

export default class Experience
{
    // ...

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')
    }
}
```

`off()`是**EventEmitter**类的一部分，将删除附加到实例的每个侦听器。
为了测试它，我们可以在浏览器控制台中调用`window.experience.destroy()`。
动画应该停止，因为我们不再监听`tick`事件并且我们的`update()`函数没有被调用。
### 处理场景中的所有内容
我们现在要遍历场景，寻找我们要处理的东西。
首先，让我们在场景中使用该`traverse()`功能：

```javascript
// ...

export default class Experience
{
    // ...

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            console.log(child)
        })
    }
}
```


您应该看到场景中的每个子项（甚至是子项的子项）都已登录到控制台中。
如果你参考 Three.js 文档（[如何处理对象](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects)），你会看到我们需要处理几何体、材质、纹理，然后是特定的东西，如控件、通道等。
以下是我们将如何处理每个孩子：

- 测试它是否是[Mesh](https://threejs.org/docs/index.html?q=mesh#api/en/objects/Mesh)。
- 调用`geometry`属性上的函数`dispose()`。
- 遍历`material`属性的每个键。
- 如果该键上有可用的功能，请调用它`dispose()`。

这样，我们就不需要测试所有可能的材质贴图来处理场景中的所有纹理和几何体：

```javascript
// ...

export default class Experience
{
    // ...

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })
    }
}
```


这是一种破坏场景中一切的极简主义方式。您可能会发现特定类中会有例外，但我们在这里的尝试是让事情尽可能简单。
### 处理控件
还有更多的清理工作要做。不需要处理相机，但 `OrbitControls`[可以](https://threejs.org/docs/index.html?q=controls#examples/en/controls/OrbitControls.dispose)：

```javascript
// ...

export default class Experience
{
    // ...

    destroy()
    {
        // ...

        this.camera.controls.dispose()
    }
}
```


### 处理渲染器
`WebGLRenderer`也有一个 `dispose` 方法，我们可以调用它[而](https://threejs.org/docs/index.html?q=webglre#api/en/renderers/WebGLRenderer.dispose)无需深入研究它。

```javascript
// ...

export default class Experience
{
    // ...

    destroy()
    {
        // ...
        this.renderer.instance.dispose()
    }
}
```

请注意，如果您正在使用后处理，则需要处理 `EffectComposer `[、](https://threejs.org/docs/#examples/en/postprocessing/EffectComposer)它的[WebGLRenderTarget](https://threejs.org/docs/?q=rendertar#api/en/renderers/WebGLRenderTarget)和您正在使用的任何潜在通道。
### 处理调试
我们使用 Dat.GUI 作为调试 UI，它很容易被破坏。我们需要做的就是调用它的**destroy()**方法，但是在这样做之前我们需要确保调试当前处于活动状态：

```javascript
// ...

export default class Experience
{
    // ...

    destroy()
    {
        // ...
        if(this.debug.active)
            this.debug.ui.destroy()
    }
}
```

就这样。您现在可以在控制台中调用`window.experience.destroy()`。
### 警告和进一步处置
如您所见，销毁东西有点棘手。您必须深入研究您使用过的不同组件，并确保正确处理所有组件。
我们没有删除`<canvas>`，最后一帧仍在其中呈现，但如果需要，您可以从页面中删除。
请注意，当我们停止收听`Sizes`和`Time`事件时，这些类仍将收听本机事件。这没什么大不了的，但如果你有点挑剔，你也可以处理掉它们。
还要承认的另一件事是，为了简单起见，我们用相同的`destroy()`方法编写了所有内容。如果你有一个更复杂的项目，需要销毁很多东西，你可能想为每个需要它的类创建一个`destroy()`方法。这样，经验将像我们为`update()`和`resize()`方法所做的那样把`destroy()`传播给它的孩子。
## 概括
使用模块和类构建代码起初可能看起来很难并且适得其反，但现实生活中的 Three.js 项目最终可能会变得如此庞大，如果您想正确完成该项目，您最好不要在一个文件写所有代码。
拥有这些单独的类也非常适合在其他项目中复用它们**。我们**`**Utils**`**创建的大多数类都可以在不对它们做任何事情的情况下被重用**。
构建代码还可以创造一个与其他开发人员合作并限制冲突的良好环境。每个开发人员都可以在特定的类上工作。
我们在本课中做出的许多决定都是针对我的个人喜好。您应该处理您的结构并创建一个模板，以便您可以更快地开始处理新项目。不要犹豫与他人分享该结构。
