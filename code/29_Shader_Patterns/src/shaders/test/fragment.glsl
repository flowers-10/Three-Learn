varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{   
    vec2 girdUv = vec2(floor(vUv.x * 10.0) / 10.0,floor(vUv.y * 10.0) / 10.0);
    float strength = random(girdUv);

    gl_FragColor = vec4(vec3(strength), 10.0);

}
