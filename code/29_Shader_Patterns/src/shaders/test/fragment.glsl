varying vec2 vUv;
#define PI 3.1415926535897932384626433832795


void main()
{   
    float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    float strength = mod(angle * 20.0 , 1.0);
    gl_FragColor = vec4(vec3(strength), 1.0);
}
