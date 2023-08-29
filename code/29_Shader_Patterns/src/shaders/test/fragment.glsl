varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{   
    float strength = 0.015 / distance(vUv,vec2(0.5));

    gl_FragColor = vec4(vec3(strength), 10.0);

}
