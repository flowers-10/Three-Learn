uniform vec2 iResolution; // 屏幕分辨率
uniform float iTime;      // 时间
varying vec2 vUv;

void main()
{   
    vec2 fragCoord = gl_FragCoord.xy; // 当前像素坐标
    float C = 1. - fragCoord.y / iResolution.y; // 垂直方向上的渐变因子
    
    fragCoord = 5. * ( fragCoord + fragCoord - iResolution) / iResolution.y; // 归一化坐标，放大到屏幕高度的5倍
    fragCoord.y = 1. - fragCoord.y * 2.; // 垂直方向翻转
    fragCoord /= 1. + fragCoord.y / 10.; // 透视效果
    fragCoord.y -= iTime; // 根据时间偏移
    
    fragCoord = abs(fract(fragCoord) - .5); // 计算到坐标轴的距离
    fragCoord = .1 / sqrt(fragCoord); // 将距离转为模糊线效果
    
    // 组合水平和垂直效果以及颜色，并根据渐变因子调整颜色
    vec4 alpha = (fragCoord.x * C + fragCoord.y * C * 2.) * vec4(.3, .3, 1., 0) * C + vec4(.4, 0.1, .2, 0.) * C;
    gl_FragColor = vec4(vUv.xy, 0.6, alpha);
}