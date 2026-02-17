// ─── Morphing Neural Engine — Fragment Shader ───

uniform vec3 uColorBase;     // Cyber cyan
uniform vec3 uColorRogue;    // Alert red — #FF3131
uniform float uTime;

varying float vAlpha;
varying float vRogue;

void main() {
  // Circular particle with soft edge
  vec2 center = gl_PointCoord - 0.5;
  float dist = length(center);
  if (dist > 0.5) discard;

  // Reduced brightness — particles serve content, not compete with it
  float alpha = smoothstep(0.5, 0.15, dist) * vAlpha * 0.6;

  // Rogue particle: brief red flash, then self-correct
  vec3 color = uColorBase;
  if (vRogue > 0.5) {
    float flash = sin(uTime * 12.0) * 0.5 + 0.5;
    color = mix(uColorBase, uColorRogue, flash * 0.8);
    alpha = max(alpha, 0.55);
  }

  gl_FragColor = vec4(color, alpha);
}
