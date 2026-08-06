import * as THREE from 'three';

export function createGlobalKeyframes(keyframeCount, style, isMobile) {
  const group = new THREE.Group();

  const keyframeGeometry = new THREE.BoxGeometry(0.28, 0.07, 0.07);
  const keyframeMaterial = new THREE.MeshBasicMaterial({
    color: style.colorB,
    transparent: true,
    opacity: 0.58,
  });

  const keyframes = [];
  const timelineRadius = isMobile ? 7 : 7.8;

  for (let i = 0; i < keyframeCount; i++) {
    const theta = (i / keyframeCount) * Math.PI * 2;
    const block = new THREE.Mesh(keyframeGeometry, keyframeMaterial);
    block.position.set(
      Math.cos(theta) * timelineRadius,
      Math.sin(theta) * timelineRadius,
      Math.sin(theta * 4) * 0.16
    );
    block.lookAt(0, 0, block.position.z);
    group.add(block);
    keyframes.push({ mesh: block, phase: Math.random() * Math.PI * 2 });
  }

  group.rotation.x = Math.PI * 0.5;

  return {
    mesh: group,
    update: (elapsed) => {
      group.rotation.z += 0.0032;
      for (let i = 0; i < keyframes.length; i++) {
        const entry = keyframes[i];
        const pulse = 1 + Math.sin(elapsed * 2.6 + entry.phase) * 0.22;
        entry.mesh.scale.x = pulse;
        entry.mesh.scale.y = 1 + Math.sin(elapsed * 2 + entry.phase) * 0.08;
      }
    },
    dispose: () => {
      keyframeGeometry.dispose();
      keyframeMaterial.dispose();
    },
  };
}
