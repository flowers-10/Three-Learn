varying vec2 vUv;



void main()
{   
    float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    float strength = angle;
    gl_FragColor = vec4(vec3(strength), 1.0);
}
