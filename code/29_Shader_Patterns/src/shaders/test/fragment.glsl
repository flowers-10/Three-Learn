varying vec2 vUv;



void main()
{   
    vec2 wavedUv = vec2(
    vUv.x,
    vUv.y + sin(vUv.x * 30.0) * 0.1
    );
    float strength = 1.0 - step(0.02, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    gl_FragColor = vec4(vec3(strength), 1.0);
}
