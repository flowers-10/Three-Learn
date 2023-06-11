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

