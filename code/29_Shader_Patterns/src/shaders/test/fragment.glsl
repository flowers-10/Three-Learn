varying vec2 vUv;



void main()
{   
    float angle = atan(vUv.x, vUv.y);
    float strength = angle;
    gl_FragColor = vec4(vec3(strength), 1.0);
}
