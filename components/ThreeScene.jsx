import styles from "../styles/ThreeCanvas.module.css";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { Vector3 } from "three";
import { useRef } from "react";

const Particle = () => {
  const { position } = useThree();

  useFrame(() => {
    position.x -= 0.01;
  });

  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" args={[0.1, 8, 8]} />
      <meshBasicMaterial attach="material" color="#ffffff" />
    </mesh>
  );
};

const ParticleWave = () => {
  const { scene } = useThree();

  for (let i = 0; i < 1000; i++) {
    const particle = <Particle key={i} />;
    scene.add(particle);
  }

  return null;
};

const ThreeScene = () => {
  return (
    <Canvas>
      <ParticleWave />
    </Canvas>
  );
};

export default ThreeScene;
