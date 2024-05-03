varying vec3 vPosition;
uniform float uTime;
varying vec3 vNormal;

void main() {
    
    // Stripes
    float stripes = mod((vPosition.y - uTime * 0.02) * 20., 1.0);
    stripes = pow(stripes, 3.0);

    // Fresnel
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    float fresnel = dot(viewDirection, vNormal);
    // Final color
    gl_FragColor = vec4(1., 1., 1., fresnel);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}