# 02.什么是WebGL和如何使用Three.js

`Three.js`是一个`3D JavaScript`库，使开发人员能够为`web`创建`3D`体验
它适用于 `WebGL`，但您可以使其适用于 `SVG` 和 `CSS`，但这两者非常有限，我们不会在本课程中介绍。

## 什么是 WebGL？

`WebGL` 是一种 `JavaScript API`，可以以**惊人的速度在画布中绘制三角形**。它与大多数现代浏览器兼容，而且速度很快，因为它使用访问者的图形处理单元 (`GPU`)。
`WebGL` 不仅可以绘制三角形，还可以用于创建 `2D` 体验，但为了课程的缘故，我们将专注于绘制三角形的 `3D` 体验。
`GPU` 可以进行数千次并行计算。想象一下，您想要渲染一个 `3D` 模型，而这个模型由 1000 个三角形组成——仔细想想，这并不多。每个三角形包括 3 个点。当我们想要渲染我们的模型时，`GPU` 将不得不计算这 `3000` 个点的位置。因为 `GPU` 可以进行并行计算，所以它会在一个原始数据中处理所有的三角形点。
模型的点放置好后，`GPU` 需要绘制这些三角形的每个可见像素。再一次，`GPU` 将一次性处理成千上万的像素计算。
放置点和绘制像素的指令是用我们所说的着色器编写的。让我告诉你，**着色器很难掌握**。我们还需要向这些着色器提供数据。例如：如何根据模型变换改变相机的属性放置点。这些被称为矩阵。我们还需要提供数据来帮助像素进行着色。如果有一盏灯并且照耀着三角形，它应该比没有照耀的三角形更亮。
**在画布上绘制一个三角形至少需要 100 行代码**。这就是原生 `WebGL` 学习如此困难的原因。如果您想在这种情况下添加透视图、灯光、模型并为所有内容设置动画，我只能说祝您好运。
不过使用原生的 `WebGL` 不全是坏处，因为原生 `WebGL` 源于底层，非常接近 `GPU`所以我们可以实现出色的优化和更多控制。

## Three.js 来拯救复杂的WebGl

`Three.js` 是 `MIT` 许可下的 `JavaScript` 库，可在 `WebGL` 之上运行。该库的目标是大大简化处理我们刚才所说的所有内容的过程。只需几行代码，您就可以拥有一个动画 `3D` 场景，而且您不必提供着色器和矩阵。
因为 `Three.js` 就在 `WebGL` 之上，我们仍然可以通过某些方式与它交互。在某些时候，我们将开始编写着色器并创建矩阵。