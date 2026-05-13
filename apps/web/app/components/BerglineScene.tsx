"use client";

import { Line, Edges } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { CatmullRomCurve3, Vector3 } from "three";

type QueuePoint = [number, number, number];

const queuePath: QueuePoint[] = [
  [-1.35, -0.8, 0.75],
  [-2.2, -0.8, 0.75],
  [-2.9, -0.8, 1.2],
  [-2.6, -0.8, 2.05],
  [-1.4, -0.8, 2.3],
  [-0.3, -0.8, 1.8],
  [0.8, -0.8, 2.15],
  [1.8, -0.8, 1.75],
  [2.7, -0.8, 2.25],
];

const queueProgress = 0.72;

function getVisibleQueuePoints(points: QueuePoint[], progress: number) {
  const vectors = points.map((point) => new Vector3(...point));
  const curve = new CatmullRomCurve3(vectors, false, "catmullrom", 0.28);
  const samples = Math.max(8, Math.round(72 * Math.min(Math.max(progress, 0), 1)));

  return curve.getPoints(samples);
}

function SceneGeometry() {
  const visibleQueuePoints = useMemo(
    () => getVisibleQueuePoints(queuePath, queueProgress),
    [],
  );

  return (
    <>
      <color attach="background" args={["#020304"]} />
      <fog attach="fog" args={["#020304", 7, 15]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 3]} intensity={1.2} color="#d7fff8" />
      <pointLight position={[-2.4, 0.2, 1.4]} intensity={8} color="#00f5ff" />

      <group rotation={[0, -0.25, 0]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 2.2, 1.5]} />
          <meshBasicMaterial
            color="#090d10"
          />
          <Edges color="#2ff6ff" threshold={15} />
        </mesh>

        <mesh position={[-1.32, -0.55, 0.76]}>
          <boxGeometry args={[0.14, 0.72, 0.08]} />
          <meshBasicMaterial color="#35f7ff" />
        </mesh>

        <Line
          points={visibleQueuePoints}
          color="#35f7ff"
          lineWidth={5}
          transparent
          opacity={0.95}
        />
        <Line
          points={visibleQueuePoints}
          color="#d42cff"
          lineWidth={1.4}
          transparent
          opacity={0.5}
        />

        <gridHelper
          args={[8, 18, "#10313a", "#07151a"]}
          position={[0, -0.86, 1.25]}
        />
      </group>
    </>
  );
}

function CameraTarget() {
  const { camera } = useThree();

  useFrame(() => {
    camera.lookAt(0, -0.25, 1.05);
  });

  return null;
}

export function BerglineScene() {
  return (
    <Canvas
      camera={{ position: [0.8, 3.2, 6.5], fov: 42 }}
      dpr={[1, 1.7]}
      gl={{ antialias: true }}
    >
      <CameraTarget />
      <SceneGeometry />
    </Canvas>
  );
}
