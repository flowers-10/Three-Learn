varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    // Position
    vec4 modelPosition = modelMatrix * vec4(position , 1.);

    // Final position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
    vPosition = modelPosition.xyz;
    // Model normal
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
    vNormal = modelNormal.xyz;
}