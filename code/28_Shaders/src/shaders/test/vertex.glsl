uniform vec2 uFrequency;
uniform float uTime;

attribute float aRandom;

varying float vElevation;
varying vec2 vUv;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
    
    modelPosition.z += elevation;
    // modelPosition.z += aRandom * 0.1;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // vRandom = aRandom;
    vUv = uv;
    vElevation = elevation;
}