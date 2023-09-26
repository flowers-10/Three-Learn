#define S(a, b, t) smoothstep(a, b, t)  // 定义了一个名为 S 的宏，该宏使用 smoothstep 函数来进行插值

uniform float iTime;  // 时间参数
uniform float iAnimationSpeed; // 动画速度

uniform vec3 iResolution;  // 分辨率参数
uniform float iStaticDropsSum; // 静态雨滴个数
uniform float iStaticDropsFade; // 静态雨滴淡入淡出速度

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
    
    uv.y += t*0.75;
    vec2 a = vec2(5., 1.);
    vec2 grid = a*2.;
		// uv放大 x 10倍 y 2倍
    vec2 id = floor(uv*grid);
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

  	//上下随机错落
  	float ti = fract(t + n.z);
  	y = (Saw(.85, ti) - .5) * .9 + .5;
  	vec2 p = vec2(x, y);
  	float d = length((st - p) * a.yx);

		 // 落痕
  float r = sqrt(S(1., y, st.y));
  float cd = abs(st.x - x);

  //雨滴形状
  float trail = S(.23 * r, .15 * r * r, cd);
 //截取前面的一部分落痕
  float trailFront = S(-.02, .02, st.y - y);
  trail *= trailFront * r * r;
	float trail2 = S(.2 * r, .0, cd);
    return vec2(trail2);
}



void main() {
	vec2 uv = (gl_FragCoord.xy - .5 * iResolution.xy) / iResolution.y;  // 计算归一化的纹理坐标
	vec2 UV = gl_FragCoord.xy / iResolution.xy;  // 计算原始纹理坐标
	float T = iTime;

	float t = T * iAnimationSpeed;  // 时间因子
	vec2 d = DropLayer2(uv, t);
    float drops = S(.3, 1.,d.y + d.x);

    gl_FragColor = vec4(vec3(drops),1.);// 输出最终颜色
}