varying float vTime;

void main()
{
   float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
 float strength = (abs(sin(vTime)) * 0.04 + 0.02) / distanceToCenter -  0.1;

    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
}