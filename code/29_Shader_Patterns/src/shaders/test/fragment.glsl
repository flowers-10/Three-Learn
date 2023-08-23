varying vec2 vUv;
void main()
{   
    float strength = step(0.8,mod(vUv.x *10.0, 1.0));
    strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
    gl_FragColor = vec4(vec3(strength), 10.0);

}