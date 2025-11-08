import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Html } from "@react-three/drei";

function Token() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.6;
    ref.current.rotation.x += Math.sin(state.clock.elapsedTime * 0.3) * 0.002;
  });
  return (
    <Float speed={1} rotationIntensity={0.6} floatIntensity={0.9}>
      <mesh ref={ref} scale={[1.6, 1.6, 1.6]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial roughness={0.2} metalness={0.7} color={"#00c6ff"} />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} style={{ width: "100%", height: "360px", borderRadius: 12 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={<Html>Loading...</Html>}>
        <Token />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
