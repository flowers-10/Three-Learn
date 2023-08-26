varying vec2 vUv;
void main()
{   
    float strength = floor(vUv.x * 10.0) / 10.0 * floor(vUv.y * 10.0) / 10.0;

    gl_FragColor = vec4(vec3(strength), 10.0);

}