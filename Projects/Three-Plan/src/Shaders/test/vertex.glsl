uniform mat4 projectionMatrix; //透视矩阵
uniform mat4 viewMatrix; // 视图矩阵
uniform mat4 modelMatrix; // 模型矩阵
attribute vec3 position; // 传入的顶点坐标

void main()
{   
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1);
}