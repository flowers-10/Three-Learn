varying vec2 vUv;
void main()
{   
    float strength = 1.0 - vUv.y;
    gl_FragColor = vec4(vec3(strength), 1.0);

}