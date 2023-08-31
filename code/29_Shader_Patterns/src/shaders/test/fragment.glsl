varying vec2 vUv;

void main()
{   
    float strength = 0.15 / ( distance(vec2(vUv.x,(vUv.y - 0.5) * 5.0 + 0.5),vec2(0.5)) );
    strength *= 0.15 / ( distance(vec2((vUv.x - 0.5) * 5.0 + 0.5,vUv.y), vec2(0.5)) );

    gl_FragColor = vec4(vec3(strength), 1.0);
}
