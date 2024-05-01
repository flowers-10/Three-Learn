
uniform float uTime;
uniform sampler2D uPerlinTexture;
varying vec2 vUv;
vec2 rotate2D(vec2 value, float angle)
{
    float s = sin(angle);
    float c = cos(angle);
    mat2 m = mat2(c, s, -s, c);
    return m * value;
}

void main()
{
    vec3 newPosition = position;
    // Twist
    float twistPerlin = texture(
        uPerlinTexture, 
        vec2(0.5, uv.y * .2 - uTime * 0.005)
    ).r;
    float angle = twistPerlin * 10.;
    newPosition.xz = rotate2D(newPosition.xz, angle);

    // Final position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    
    // Varyings
    vUv = uv;
}