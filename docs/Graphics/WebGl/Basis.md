背景介绍
OpenGL -> OpenGL ES -> OpenGL ES 2.0 -> WebGL

image
OpenGL Embeded Subset是OpenGL的一个子集, 针对嵌入式和移动端做了功能精简和性能优化

WebGL基于OpenGL ES 2.0标准, 基本就是将原来C语言的API和配置项迁移到Javascript, 去掉了一些实在不兼容的部分

WebGL 2.0基于OpenGL ES 3.0

渲染管道(PipeLine)image
Vertex Array: 顶点数组
初始化数据(利用3D建模工具等生成的模型顶点)

Vertex Shader: 顶点着色器
计算坐标, 颜色等顶点相关数据, 相关概念:

Attributes: 从顶点数组获取的每个顶点的初始数据
Uniforms: 计算需要的常量数据
Samplers: 代表材质(Texture)的一类特殊常量, 在顶点着色器中是可选的
Shader Program: 着色器程序, 使用着色器语言(Shading Language, 类似C语言)编写的可执行程序代码, 指定需要在顶点上作什么样的计算和处理
Varying Variables: 顶点着色器的输出, 计算出的每个顶点相关数据
attribute vec4 a_Position;
attribute vec4 a_Color;
uniform mat4 u_MvpMatrix;
varying vec4 v_Color;
void main() {
    gl_Position = u_MvpMatrix * a_Position;
    v_Color = a_Color;
}
Primitive Assemply: 图元组装
根据计算出的顶点信息和绘图命令绘制基本图形, 包括: 三角形(Triangle), 直线(Line), 点(Point-Sprite); 一般3d图形都是由三角形组成的

Rasterization: 栅格化
利用插值(interpolation)的方法计算顶点之间的边及边之间的内部点的数据, 计算出的数据就是所有需要绘制的像素点, 作为输入传给Fragment Shader

image
一般栅格化之前还要经过裁剪(clipping, 把不在可见区域范围内的点去掉); 剔除(culling, 把背对可见方向, 完全不会被看见的面去掉), 来减少计算量

Fragment Shader: 片段着色器, 像素着色器
在这个阶段可以应用材质(Texture), 进行逐像素的颜色处理, 相关概念:

Varying Variables: 栅格化的结果, 计算出的每个像素点相关数据
Uniforms: 计算需要的常量数据
Samplers: 代表材质(Texture)的一类特殊常量
Shader Program: 着色器程序, 使用着色器语言(Shading Language, 类似C语言)编写的可执行程序代码, 指定需要在像素点上作什么样的计算和处理
varying vec4 v_Color;
void main() {
    gl_FragColor = v_Color;
}
Per-Fragment Operations: 逐像素处理
对像素执行一些可选的后处理

image
scissor test: 限制只在一个矩形区域更新像素
stencil test: 像素级的蒙板(stecil buffer), 可以定义哪些蒙板区域更新, 哪些不更新
depth test: 默认需要开启, 测试像素的深度, 决定哪些像素
Framebuffer: 帧缓存
一个GL Context可以有多个帧缓存, 存储可渲染区域的像素相关数据

坐标变换 &图形变换
通常在顶点着色器中应用坐标变换, 计算每个顶点的最终坐标位置

image
本地坐标系(local coordinate system)
指通过算法或建模软件生成模型时的坐标系, 通常以模型自己的中心点为坐标原点

image
世界坐标系(world coordinate system)
通过平移, 旋转, 放缩等图形变换方法, 把模型放置到一个更大的坐标系中

image
图形变换
任何图形变换都可以用矩阵的方式表达; 不同变换的叠加可以用矩阵相乘的形式来计算. 可以参考 glMatrix 库的 rotate, translate, scale等方法
观察坐标系(view coordinate system)
通过指定观察点坐标(eye point), 目标点(lookAt point), 竖直方向(up vector)来确定一个观察坐标系

image
观察矩阵的生成可以参考glMatrix 库的lookAt方法image
观察矩阵和图形变换矩阵有时是可以互换的, 把物体位置向观察点靠近和把观察点向物体靠近, 两种变化效果是一样的

只是一个应用了图形变换, 一个应用了观察坐标系变换. 通常这两种变换是结合使用, 各有各的目的

剪裁坐标系(clipping coordinate system)
在这一步会利用投影的方法, 把一个3D的物体投影的2D的屏幕中去

这一步可以确认物体是否在可见范围内, 哪一部分在可见范围内, 所以叫剪裁坐标系

正交投影(orthographic projection)
用一个盒子状的可见范围平行投影物体, 没有近大远小的概念, left, right, bottom, top, near, far分别表示盒子的六个面的坐标

image
glMatrix中的对应方法

image
矩阵公式

image
透视投影(perspective projection)
类似素描里近大远小的透视方法, 用一个四面梯形定义可见范围, fov表示视角(上下平面之间角度), aspect表示剪裁矩形的宽高比, near和far表示剪裁近平面和远平面

image
glMatrix的方法

image
矩阵公式

image
最终的剪裁坐标系x, y, z轴都会标准化为[-1, 1]的范围, z轴表示物体的前后覆盖关系; 在剪裁阶段所有坐标不在[-1, 1]范围内的点都会认为不可见(z轴是0到-1, 因为观察点在0点且向负方向看)

image image
光照 &材质
光照类型
平行光源: 类似太阳光, 可以认为发光光源距离无限远, 因此所有光线方向相同, 光照强度相同; 计算时只用考虑方向和颜色 image
点光源: 类似聚光灯效果, 照射到物体上的光线方向不同, 强度也不同 image
环境光: 从各个方向以相同强度照射到物体上的光线, 计算时只考虑颜色 image
反射类型
漫反射(diffuse reflection) 光线照射在纸张, 木头等表面粗糙的物体上会发生漫反射, 光线会向各个方向均匀的反射, 强度与入射方向和表面方向夹角theta有关; 与观察方向无关

image
计算公式: Diffuse = kDiffuse × N • L × CBase
    Diffuse表示漫反射颜色
    KDiffuse表示入射光颜色
    N表示物体表面法线方向
    L表示入射光方向
    CBase表示物体本身颜色
环境反射(Ambient reflection) 环境光照射的效果, 由各个方向入射再反射到各个方向 image
计算公式: Ambient = kAmbient × CBase
    Ambient表示环境反射颜色
    kAmbient表示入射光颜色
    CBase表示物体本身颜色
镜面反射(specular reflection) 在镜面, 金属等表面光滑物体表面, 入射光大部分会从单一方向反射出去, 因此反射强度跟入射方向, 物体表面方向和观察方向都有关系
计算公式: Specular = kSpecular × pow(max(R • V, 0), kSpecularPower)
    Specular表示镜面反射颜色
    kSpecular表示入射光颜色
    R = 2 × N × (N • L) – L
    N, L分别表示法线方向和入射光方向
    V表示观察方向
    kSpecularPower表示高光系数, 代表物体表面反射光的能力
环境反射和平行光的漫反射可以在顶点着色器阶段计算, 因为不考虑光的方向或入射光方向一致;

聚光灯的漫反射和镜面反射效果需要在片段着色器阶段计算, 因为照射到物体表面的每个点光线方向不同(聚光灯漫反射)或对于每个点观察方向都不同(镜面反射)

物体表面某点的颜色 = 漫反射颜色 + 环境反射颜色 + 镜面反射颜色 (也可以没有镜面反射)

影响物体材质的因素:
    物体本身颜色(CBase)
    入射光颜色(kDiffuse, kAmbient, kSpecular)
    法线方向(N)
    入射方向(L)
    观察方向(V)
    高光系数(kSpecularPower)
纹理贴图
贴图类型
色彩贴图: 将贴图的数据赋值给物体的本身颜色 image
法线贴图: 将贴图数据复制给法线N image
高光贴图 类似法线贴图, 将贴图数据赋值给高光系数
凹凸贴图 类似法线贴图, 不过存储的是物体表面的相对高度, 也是通过高度参数影响原始的法线方向达到凹凸效果; 效果不如法线贴图
光照贴图: 模拟阴影效果 image
环境贴图: 模拟物体的反光效果 image
立方环境贴图: 用六张图组成一个立方体, 将物体置于立方体中, 模拟全景效果 image
... ...
UV贴图
uv指2d图形的坐标名称, 在贴图时可以指定一个矩形的坐标; 可以指定放大缩小模式; 重复(repeat)模式等高级操作

image
[The uv coordinates are often used. However, we are using st coordinates because GLSL ES uses the component names to access the texture image.]

webGL初始化流程及代码
获取webgl上下文

var canvas = document.querySelector('#canvas');
gl = canvas.getContext('webgl');
初始化视窗(viewport)

gl.viewportWidth = canvas.width;
gl.viewportHeight = canvas.height;
gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
初始化顶点着色器(vertex shader)

var vertexShader = gl.createShader(gl.VERTEX_SHADER);
// 这一步一般需要先load着色器源代码
gl.shaderSource(vertexShader, 'attribute vec4 a_Position ......  // 顶点着色器内容');
gl.compileShader(vertexShader);
// 获取着色器编译状态, 如果出错则打印log信息并结束
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(vertexShader));
        return;
}
初始化片段着色器(fragment shader)

var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, 'varying vec4 v_Color ......  //片段着色器内容');
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(fragmentShader));
        return;
}
初始化程序(program)

gl.program = gl.createProgram();
// 绑定着色器, 不同的'程序'可以绑定不同的着色器
gl.attachShader(gl.program, vertexShader);
gl.attachShader(gl.program, fragmentShader);
// 链接程序
gl.linkProgram(gl.program);
// 检查程序链接状态
if (!gl.getProgramParameter(gl.program, gl.LINK_STATUS)) {
         console.log('program link problem');
         return;
}
使用程序(program)

// 使用刚刚初始化好的程序, 可以创建多个program来使用
gl.useProgram(gl.program);
初始化顶点数组(vertex buffer)

/**
 * initVertexBuffers: vertices, indices => n
 *     vertices: Float32Array    // 顶点数组,一般需要是有类型的特殊Array
 *     indices: Uint8Array       // 序号数组, 序号指顶点数组中的序号index
 *     n: number                 // 顶点数, indices.length
 */            
gl.n = initVertexBuffers(vertices, indices);
if (gl.n <= 0) {
    console.log(&#039;fail to initialize vertex buffers&#039;);
    return;
}
vertices & indices

表示顶点数组和序号数组, 如一个正方体的顶点数组

image ```javascript /** * vertices数组, 前三个数字代表一个三维空间坐标点, 后三个数字代表颜色 * 下面例子里列出的内容表示一个正方体的正面(front)的坐标点 **/ var vertices = new Float32Array([ 1.0, 1.0, 1.0, 0.0, 0.0, -1.0, // v0 -1.0, 1.0, 1.0, 0.0, 0.0, -1.0, // v1 -1.0, -1.0, 1.0, 0.0, 0.0, -1.0, // v2 1.0, -1.0, 1.0, 0.0, 0.0, -1.0, // v3 front ... ... ]), ```
/**
 * indices数组, 0,1,2  0,2,3分别表示一个三角形, 两个三角形组成正方体的一个面
 * 三角形点的顺序要逆时针列出(右手定则), 顺序不对的话会被当成背对屏幕而不被渲染
 **/     
var indices = new Uint8Array([
    0, 1, 2, 0, 2, 3,           // front
    4, 5, 6, 4, 6, 7,           // right
    8, 9, 10, 8, 10, 11,        // up
    12, 13, 14, 12, 14, 15,     // left
    16, 17, 18, 16, 18, 19,     // down
    20, 21, 22, 20, 22, 23      // back              
])
initVertexBuffers

初始化buffer

var vertexBuffer = gl.createBuffer();
var indexBuffer = gl.createBuffer();
if (!vertexBuffer || !indexBuffer) {
    console.log(&#039;fail to create buffer&#039;);
    return;
}
绑定buffer

// 绑定vertexBuffer并填入值vertices
// 注意!! 顶点的原始数据必须用gl.ARRAY_BUFFER存储
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
// 绑定indexBuffer并填入值indices
// 注意!! 顶点的index必须用gl.ELEMENT_ARRAY_BUFFER存储
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
初始化Attributes

定义attributes数组

attributes是vertices数组的结构定义, 必须跟vertices数组对应起来

- vertices结构

    <img src="http://eux-blog-static.bj.bcebos.com/vertex-object-structure.png?authorization=bce-auth-v1%2Fcb0c7cb965b444ee8bc9e75e45308734%2F2017-12-13T08%3A25%3A28Z%2F-1%2Fhost%2F1359f6ce7d9adf4c7a93cd950c25d3126d6cc3d9a5a1959bd8e7c2cfbe708749" alt="image" width="550" height="94" />
    
    如图vertices数组中10个数字表示一个顶点, 分别表示坐标位置; 法向量方向; 贴图TEX0的坐标位置; 贴图TEX1的坐标位置

    这种vertices结构叫*Array of structure*, 通常用3D软件生成的顶点数据都是这个结构;也可以为position, normal, color每种数据都建立一个buffer, 这种结构叫*Structure of Array*

    ```javascript
    /**
     * 根据上面的结构定义的attributes
     * size表示当前attribute由几个元素组成, 范围大小是1~4
     * strip表示由几个元素代表一个顶点, 每个attribute都相同
     * offset表示从第几个元素开始查找, 这个要算之前的attribute占用了多少元素
     **/
    var attributes = [
        {name: &#039;a_position&#039;, size: 3, strip: 10, offset: 0},
        {name: &#039;a_normal&#039;, size: 3, strip: 10, offset: 3},
        {name: &#039;a_tex0&#039;, size: 2, strip: 10, offset: 6},
        {name: &#039;a_tex1&#039;, size: 2, strip: 10, offset: 8}
    ];
    ```

```javascript
// 根据正方体vertices数组定义的attributes结构
var attributes = [
    {name: &#039;a_position&#039;, size: 3, strip: 10, offset: 0},
    {name: &#039;a_color&#039;, size: 3, strip: 10, offset: 3}
];
```
// 记录FSIZE, 即顶点数组每个元素的byte数, 后面需要使用
gl.FSIZE = vertices.BYTES_PER_ELEMENT;
// 遍历attributes并初始化
for(var i = 0; i < attributes.length; i++) {
    initAttributes(attributes[i]);
}
initAttributes

// 为attribute分配存储空间
var a_Loc = gl.getAttribLocation(gl.program, attribute.name);
// a_Loc是分配的存储空间地址, 如果小于0表示分配失败
if (a_Loc < 0) {
    console.log(&#039;fail to get location of&#039; + attr.name);
    return;
}
// 定义attribute查找规则
gl.vertexAttribPointer(
    a_Loc,
    attribute.size,    // 3
    gl.FLOAT,          // 数据类型
    false,             // 实际类型跟FLOAT不符时的处理, 这里符合所以false
    gl.FSIZE * attribute.strip,    // 4 * 6
    gl.FSIZE * attribute.offset   // 4 * (0 | 3)
);
// enable分配的存储位置
gl.enableVertexAttribArray(a_Loc);
初始化Uniforms

// 定义uniforms数组: 变量名, 类型, 地址, 值
var uniforms = [
    {name: &#039;u_b_direct_light&#039;, type: &#039;b&#039;, location: null, value: null},
    {name: &#039;u_MvpMatrix&#039;, type: &#039;mat4&#039;, location: null, value: null},
    {name: &#039;u_MvMatrix&#039;, type: &#039;mat4&#039;, location: null, value: null},
    // ... ...
]
// 遍历uniforms并初始化
for(var i = 0; i < uniforms.length; i++) {
    initUniforms(uniforms[i]);
}
initUniforms

// 分配uniform存储空间
var u_Loc = gl.getUniformLocation(gl.program, uniform.name);
if (u_Loc < 0) {
    console.log(&#039;fail to get location of u_MvpMatrix&#039;);
    return;
}
else {
    uniform.location = u_Loc;
}
updateUniforms

/**
 * 给uniform赋值, 不同的类型对应不同的方法
 * 其中f表示float, i表示integer, v表示vector; 一般matrix和vector都是数组
 * gl.uniformxxxx的第一个参数是之前缓存的uniform地址
 * 第二个参数表示是否需要转置矩阵(横竖反转), webGL里不具有这个功能, 必须传false
 * 第三个参数是uniform值, 可以是数组或单个数字, 数字可以是float或inter类型
 * 具体内容需要跟前面的api对应起来
 **/
if (uniform.value) {
    try {
        switch (uniform.type) {
            case &#039;mat4&#039;:
                gl.uniformMatrix4fv(uniform.location, false, uniform.value);
                break;
            case &#039;mat3&#039;:
                gl.uniformMatrix3fv(uniform.location, false, uniform.value);
                break;
            case &#039;vec4&#039;:
                gl.uniformVec4fv(uniform.location, false, uniform.value);
                break;
            case &#039;vec3&#039;:
                gl.uniformVec3fv(uniform.location, false, uniform.value);
                break;
            case &#039;f&#039;:
                if (uniform.value.length) {
                    gl.uniform1fv(uniform.location, false, uniform.value);
                }
                else {
                    gl.uniform1f(uniform.location, false, uniform.value);
                }
                break;
            case &#039;i&#039;:
                if (uniform.value.length) {
                    gl.uniform1iv(uniform.location, false, uniform.value);
                }
                else {
                    gl.uniform1i(uniform.location, false, uniform.value);
                }
                break;
        }
    }
}
初始化纹理(texture)

// 如果需要使用纹理
if (!initTextures(imageSrc)) {
    console.log(&#039;fail to initialize texture&#039;);
}
initTextures

// 创建texture
var texture = gl.createTexture();
if (!texture) {
    console.log(&#039;fail to create texture&#039;);
    return;
}
// 为u_Sampler分配空间, texture会是u_Sampler的值
var u_Sampler = gl.getUniformLocation(gl.program, &#039;u_Sampler&#039;);
if (u_Sampler < 0) {
    console.log(&#039;fail to get location of u_Sampler&#039;);
    return;
}
// 加载图片并loadTexture
var image = new Image();
image.src = require(imageSrc);
image.onload = function() {
    loadTexture(texture, u_Sampler, image);
};
loadTexture

/**
 * 翻转图片的Y坐标; 1表示enable前面的配置项
 * 因为贴图的uv(或st)坐标系跟html的xy坐标系, y轴方向正好相反
 * 所以之后要使用贴图的uv坐标通常需要这步操作
 **/
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
/**
 * 一个program最多可以使用8个贴图, 从gl.TEXTURE0 到 gl.TEXTURE7
 * 这里只用了一个所以只active TEXTURE0
 **/
gl.activeTexture(gl.TEXTURE0);
/**
 * 绑定texture, 这一步是要告诉webGL texture的类型
 * 除了立方体贴图要用gl.TEXTURE_CUBE_MAP, 其它的基本都用gl.TEXTURE_2D
 **/
gl.bindTexture(gl.TEXTURE_2D, texture);
/**
 * 这一步设置应用贴图时的参数, 第一个参数指定贴图类型(2d或cude)
 * 后面两个参数分别是贴图处理方法(funcName)和对应的值(funcValue)
 * 后面详细介绍
 **/
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
texPrameter - funcName

gl.TEXTURE_MAG_FILTER: 放大策略; 当贴图大小比目标区域小的时候的放大策略, 可以使用gl.NEAREST和gl.LINEAR两个值

gl.TEXTURE_MIN_FILTER: 缩小策略: 当贴图大小比目标区域大时的缩小策略, 可以使用gl.NEAREST和gl.LINEAR及MIPMAP的所有值

gl.TEXTURE_WRAP_S: s轴(横轴)填充策略: 可以使用REPEAT, MIRRORED_REPEAT, CLAMP_TO_EDGE三种策略, 默认REPEAT

gl.TEXTURE_WRAP_T: t轴(纵轴)填充策略: 可以使用REPEAT, MIRRORED_REPEAT, CLAMP_TO_EDGE三种策略, 默认REPEAT
texPrameter - funcValue

```
gl.NEAREST: 取与目标像素几何距离最近的点

gl.LINEAR: 取与目标像素距离最近的四个点做权重平均(or bilinear fetch); 一般比NEAREST更清晰, 但更花时间

MIPMAP ———— 把贴图标准化为类似16x16, 32x32, 64x64等一系列图片, 然后根据目标区域大小选取相应的图片处理; 使用MIPMAP的话后面需要手工加载不同级别的图片

    gl.NEAREST_MIPMAP_NEAREST: 取一个跟目标区域最相近的图片, 然后再用NEAREST选一个最近的点

    gl.LINEAR_MIPMAP_NEAREST: 取一个跟目标区域最相近的图片, 然后再用LINEAR的方式算出点

    gl.NEAREST_MIPMAP_LINEAR: 取跟目标区域大小最相近的较大较小两个图片, 然后做插值算出点

    gl.LINEAR_MIPMAP_LINEAR: 先取最相近的两个图片分别做LINEAR(bilinear fetch)算出两个点, 然后再做插值算出目标点; 这种方式叫: trilinear filtering, 是所有方式中质量最高的

gl.REPEAT: 复制

gl.MIRRORED_REPEAT: 镜像复制

gl.CLAMP_TO_EDGE: 用贴图的边缘颜色填充
```
/**
将图片绑定到texture对象上, 第一个参数指定贴图类型(2d或cube)

第二个参数指定MIPMAP级别, 不使用时默认传0, 如果使用MIPMAP则需要绑定0~n不同级别的图片

第三个参数指定图片像素的数据类型, 有RGB, RGBA, ALPHA, LUMINANCE, LUMINANCE_ALPHA几种

第四个参数指定贴图像素被使用时的数据类型, 需要跟第三个参数保持相同

第五个参数指定贴图像素的数据类型, 有

UNSIGNED_BYTE: 每个部分占1byte

UNSIGNED_SHORT_5_6_5: RGB类型且分别占5,6,5 bits

UNSIGNED_SHORT_4_4_4_4: RGBA类型且分别占4bits

UNSIGNED_SHORT_5_5_5_1: RGBA类型前三个占4bits, 最后alpha占1bits

最后一个参数是加载的image对象 **/ gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

```javascript
/**
给之前分配空间的uniform: u_Sampler赋值

这一步跟普通的uniform赋值一样, 只是后面的0对应gl.TEXTURE0

如果之前绑定的是TEXTUREn这里需要传n

在片段着色器中的声明方式:

uniform sampler2D u_Sampler;

如果是立方体贴图需要把sampler2D改成samplerCube **/ gl.uniform1i(u_Sampler, 0);

开启深度检测(depth test)

// 一般需要开启深度检测
gl.enable(gl.DEPTH_TEST);
开启其它可选的后处理

gl.enable(gl.BLEND);
gl.enable(gl.STENCIL_TEST);
// ... ...
// 除了enable之外一般还需要设置其它相关参数和方法, 如
// gl.blendFunc(... ....);
// gl.stencilFunc(... ....);
初始化颜色及buffer

// 清空颜色
gl.clearColor(0.0, 0.0, 0.0, 1.0);
// 清空buffer, 如果使用了stencilTest, 需要清空 gl.STENCIL_BUFFER_BIT
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
webGL渲染流程及代码
跟进用户交互及时间等参数更新uniform值 (参考updateUniforms)

清空buffer (参考初始化颜色及buffer)

绘制图形

drawElements: 使用的是之前初始化的indexBuffer (参考绑定vertexBuffer)

/**
 * 第一个参数表示绘制的图元mode, 后面有详细介绍
 * 第二个参数表示需要绘制的顶点序号数量, 这里绘制全部所以是gl.n
 * 第三个参数表示存储的顶点序号的数据类型, 有gl.UNSIGNED_BYTE | gl.UNSIGNED_SHORT两种
 * 对应js里Uint8Array | Uint16Array两种数据定义
 * 第四个参数是offset, 从indexBuffer的第几个元素开始绘制
 **/
gl.drawElements(gl.TRIANGLES, gl.n, gl.UNSIGNED_BYTE, 0);        
drawArrays: 使用的是之前初始化的vertexBuffer, 即顶点原始数据 (参考绑定indexBuffer)

```javascript
/**
 * 第一个参数表示绘制的图元mode, 后面有详细介绍
 * 第二个参数是offset, 从vertexBuffer的第几个元素开始绘制
 * 第三个参数表示需要绘制的顶点序号数量
 **/
gl.drawArrays(gl.TRIANGLE_STRIP, 0, gl.n);
```
drawArrays跟drawElement不同的是它只能顺序的使用vertexBuffer的顶点, 不能指定序号;

因为3D建模工具导出的数据一般都会有顶点的复用, 不能顺序使用, 所以一般复杂模型都会使用indexBuffer绘制

draw mode:

image
gl.POINTS: 根据使用的是vertexBuffer还是indexBuffer, 顺序的画点

gl.LINES: 以v0-v1, v2-v3, v4-v5,的顺序画线

gl.LINE_STRIP: 以v0-v1-v2-v3-v4-v5的顺序画整条线

gl.LINE_LOOP: 以v0-v1-v2-v3-v4-v5-v0的顺序连接起点和终点

gl.TRIANGLES: 以v0-v1-v2, v3-v4-v5的顺序画三角形

gl.TRIANGLES_STRIP: 以v0-v1-v2, v2-v1-v3, v2-v3-v4, v4-v3-v5的顺序画连续的三角形

gl.TRIANGLES_FAN: 以v0-v1-v2, v0-v2-v3, v0-v3-v4, v0-v4-v5的顺序画扇形的三角形
一些后续学习内容:
理解和灵活运用 (坐标变换 &图形变换) 部分的矩阵变换公式和api
(光照 &材质) 相关的高级光照效果
(纹理贴图) 相关的高级贴图效果及uv贴图应用
顶点着色器和片段着色器的使用, shadertoy 上有大量着色器可以参考
一些高级效果, 如阴影, 反射, 雾, 使用多个gl program, 用户键盘及鼠标交互, 动画及骨架原理等等... ...
如何转换并使用3d建模工具(如blender)导出的模型相关数据
参考资料:
WebGL Programming Guide (webGL编程指南)
OpenGL ES 2.0 Programming Guide (OpenGL ES 2.0编程指南)
threejs 例子, 教程, 源码学习