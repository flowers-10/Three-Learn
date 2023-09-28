#define S(a, b, t) smoothstep(a, b, t)  // 定义了一个名为 S 的宏，该宏使用 smoothstep 函数来进行插值
#define USE_POST_PROCESSING

uniform float iTime;  // 时间参数
uniform float iAnimationSpeed; // 动画速度
uniform float iLightningFrequency; // 闪电频率
uniform float iStaticDropsSum; // 静态雨滴个数
uniform float iStaticDropsFade; // 静态雨滴淡入淡出速度
uniform float iDropLayerSum; // 雨滴落痕条数
uniform float iVignette; // 暗角范围

uniform vec3 iResolution;  // 分辨率参数
uniform sampler2D iChannel0;  // 纹理参数


varying vec2 vUv;  // 顶点着色器传递过来的纹理坐标

vec3 N13(float p) {
    // 根据 Dave Hoskins 提供的方法生成噪声
	vec3 p3 = fract(vec3(p) * vec3(.1031, .11369, .13787));
	p3 += dot(p3, p3.yzx + 19.19);
	return fract(vec3((p3.x + p3.y) * p3.z, (p3.x + p3.z) * p3.y, (p3.y + p3.z) * p3.x));
}

vec4 N14(float t) {
    // 根据时间 t 生成四个随机数
	return fract(sin(t * vec4(123., 1024., 1456., 264.)) * vec4(6547., 345., 8799., 1564.));
}

float N(float t) {
    // 根据时间 t 生成一个随机数
	return fract(sin(t * 12345.564) * 7658.76);
}

float Saw(float b, float t) {
    // 生成锯齿波函数，范围在 [0, b] 之间
    return S(0., b, t) * S(1., b, t);
}

// 静态雨滴
float StaticDrops(vec2 uv, float t) {
	uv *= iStaticDropsSum;  // 放大 uv 坐标
	vec2 id = floor(uv);  // 获取每个格子的 id
	uv = fract(uv) - .5;  // 将每个格子的中点移动到格子中心位置
	vec3 n = N13(id.x * 107.45 + id.y * 3543.654);  // 根据 id 生成噪声
	vec2 p = (n.xy - .5) * .7;  // 打散圆心的位置
	float d = length(uv - p);  // 计算点到圆心位置的距离(静态雨滴)
	float fade = Saw(iStaticDropsFade, fract(t + n.z));  // 随机雨滴随着时间渐入渐出
	float c = S(.3, 0., d) * fract(n.z * 10.) * fade;  // 获得静态雨滴形状
	return c;
}

// 动态雨滴
vec2 DropLayer2(vec2 uv, float t) {
 vec2 UV = uv;
  //整体画布跟着匀速运动
  uv.y += t * 0.75;
  vec2 a = vec2(6., 1.);
  vec2 grid = a * iDropLayerSum;
  /* 放大uv x：6 * iDropLayerSum倍 y:1 * iDropLayerSum倍 */
  vec2 id = floor(uv * grid);

  float colShift = N(id.x); //得到随机数
  uv.y += colShift; //y轴偏移

  id = floor(uv * grid);  //重新获取y轴偏移后的格子
  vec3 n = N13(id.x * 35.2 + id.y * 2376.1);
  vec2 st = fract(uv * grid) - vec2(.5, 0); //将坐标原点由0,0 移动到0.5,0

  //左右随机错落
  float x = n.x - .5;
  /* y轴上下运动 上快下慢 */
  float y = UV.y * 20.;
  // 增加落痕路径自然扭曲
  float wiggle = sin(y + sin(y));
  x += wiggle * (.5 - abs(x)) * (n.z - .5);
  x *= .7;

  //上下随机错落
  float ti = fract(t + n.z);
  y = (Saw(.85, ti) - .5) * .9 + .5;
  vec2 p = vec2(x, y);

  float d = length((st - p) * a.yx);

  float mainDrop = S(.4, .0, d);
  // 落痕
  float r = sqrt(S(1., y, st.y));
  float cd = abs(st.x - x);
  //雨滴形状
  float trail = S(.23 * r, .15 * r * r, cd);
  //截取前面的一部分落痕
  float trailFront = S(-.02, .02, st.y - y);
  trail *= trailFront * r * r;

  y = UV.y;
  float trail2 = S(.2 * r, .0, cd);
  float droplets = max(0., (sin(y * (1. - y) * 120.) - st.y)) * trail2 * trailFront * n.z;
  //增加落痕路径上的小水滴
  y = fract(y * 10.) + (st.y - .5);
  float dd = length(st - vec2(x, y));
  droplets = S(.3, 0., dd);
  float m = mainDrop + droplets * r * trailFront;

    //m += st.x>a.y*.45 || st.y>a.x*.165 ? 1.2 : 0.;
  return vec2(m, trail);
}

vec2 Drops(vec2 uv, float t, float l0, float l1, float l2) {
  float s = StaticDrops(uv, t) * l0;
  vec2 m1 = DropLayer2(uv, t) * l1;
  vec2 m2 = DropLayer2(uv * 1.85, t) * l2;

  float c = s + m1.x + m2.x;
  c = S(.3, 1., c);

  return vec2(c, max(m1.y * l0, m2.y * l1));
}



void main() {
	vec2 uv = (gl_FragCoord.xy - .5 * iResolution.xy) / iResolution.y;  // 计算归一化的纹理坐标
	vec2 UV = gl_FragCoord.xy / iResolution.xy;  // 计算原始纹理坐标
	float T = iTime;

	float t = T * iAnimationSpeed;  // 时间因子
	float rainAmount = sin(T * .05) * .3 + .7;  // 雨量

	float maxBlur = mix(3., 6., rainAmount);  // 最大模糊程度
	float minBlur = 2.;  // 最小模糊程度

	float staticDrops = S(-.5, 1., rainAmount) * 2.;  // 静态雨滴形状
	float layer1 = S(.25, .75, rainAmount);  // 第一层落痕形状
	float layer2 = S(.0, .5, rainAmount);  // 第二层落痕形状
	
	vec2 c = Drops(uv, t, staticDrops, layer1, layer2);  // 落痕形状和拖尾形状
	vec2 n;

	#ifdef CHEAP_NORMALS
		n = vec2(dFdx(c.x), dFdy(c.x));  // 利用前后颜色计算法线
	#else
		vec2 e = vec2(.001, 0.);
		float cx = Drops(uv + e, t, staticDrops, layer1, layer2).x;  // 利用前后颜色计算 x 方向的法线分量
		float cy = Drops(uv + e.yx, t, staticDrops, layer1, layer2).x;  // 利用前后颜色计算 y 方向的法线分量
		n = vec2(cx - c.x, cy - c.x);  // 法线
	#endif

	vec3 col = textureLod(iChannel0, UV + n, maxBlur + 0.1).rgb;  // 在纹理上采样得到颜色

	

	#ifdef USE_POST_PROCESSING
		t = (T+3.) * iLightningFrequency;				
		float lightning = sin(t * sin(t * 10.));
		lightning *= pow(max(0.,sin(t+sin(t))), 10.);
		col *= 1. + lightning;
		// 增加蓝色滤镜
		col *= vec3(.8, .9,1.3);
		//  暗角效果
		col *= 1.-dot(UV-= iVignette, UV);	
	#endif

    gl_FragColor = vec4(col, 1.);  // 输出最终颜色
}