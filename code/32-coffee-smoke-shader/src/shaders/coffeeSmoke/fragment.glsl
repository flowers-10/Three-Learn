varying vec2 vUv;
uniform float uTime;
uniform sampler2D uPerlinTexture;

void main()
{
    // Scale and animate
    vec2 smokeUv = vUv;
    smokeUv.x *= 0.5;
    smokeUv.y *= 0.3;
    smokeUv.y -= uTime * .03;

    // Smoke
    float smoke = texture(uPerlinTexture, smokeUv).r;
    // Final color
    gl_FragColor = vec4(vec3(1.), smoke);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}