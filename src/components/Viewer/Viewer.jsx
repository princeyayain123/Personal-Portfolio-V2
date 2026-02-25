import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Bounds, Environment } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Model() {
  const group = useRef();
  const { scene, animations } = useGLTF('/model/model.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (actions) {
      const first = Object.keys(actions)[0];
      actions[first]?.reset().play();
    }
  }, [scene, actions]);

  return <primitive ref={group} object={scene} />;
}

export default function Viewer() {
  return (
    <div style={{ width: '100%', height: '700px' }}>
      <Canvas
  shadows
  camera={{ fov: 30 }}
  gl={{
    antialias: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 1,
  }}
>
  {/* Ground Shadow */}
  <mesh
    rotation={[-Math.PI / 2, 0, 0]}
    position={[0, -1.2, 0]}
    receiveShadow
  >
    <planeGeometry args={[30, 30]} />
    <shadowMaterial opacity={0.4} />
  </mesh>

  {/* Balanced Lighting */}
  <ambientLight intensity={3} />

  <directionalLight
    position={[6, 12, 6]}
    intensity={3}
    castShadow
    shadow-mapSize-width={1024}
    shadow-mapSize-height={1024}
    shadow-bias={-0.0001}
  />

  <Bounds fit clip margin={1.2}>
    <Model />
  </Bounds>

  <OrbitControls
    enablePan={false}
    enableZoom={false}
    autoRotate
    autoRotateSpeed={1}
    enableDamping
    dampingFactor={0.05}
  />
</Canvas>
    </div>
  );
}
