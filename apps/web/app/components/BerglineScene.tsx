"use client";

import { Line, Edges } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { CatmullRomCurve3, Vector3 } from "three";

type QueuePoint = [number, number, number];

const doorPosition: QueuePoint = [0, -0.78, -1.05];

const queuePath: QueuePoint[] = [
  doorPosition,
  [0.18, -0.8, -0.64],
  [0.56, -0.8, -0.3],
  [0.38, -0.8, 0.12],
  [-0.54, -0.8, 0.48],
  [-1.08, -0.8, 0.94],
  [-0.46, -0.8, 1.38],
  [0.72, -0.8, 1.88],
  [1.16, -0.8, 2.42],
  [0.22, -0.8, 2.92],
  [-0.06, -0.8, 3.42],
  [0.64, -0.8, 4.0],
];

const queueProgress = 0.9;

function getVisibleQueuePoints(points: QueuePoint[], progress: number) {
  const vectors = points.map((point) => new Vector3(...point));
  const curve = new CatmullRomCurve3(vectors, false, "catmullrom", 0.28);
  const samples = Math.max(8, Math.round(72 * Math.min(Math.max(progress, 0), 1)));

  return curve.getPoints(samples);
}

function QueueNodes() {
  const visibleNodes = queuePath.slice(
    0,
    Math.max(2, Math.round(queuePath.length * queueProgress)),
  );

  return (
    <>
      {visibleNodes.slice(1).map((point) => (
        <mesh key={point.join(":")} position={point}>
          <sphereGeometry args={[0.07, 18, 18]} />
          <meshBasicMaterial color="#69ffdf" />
        </mesh>
      ))}

      <mesh position={visibleNodes[visibleNodes.length - 1]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshBasicMaterial color="#69ffdf" />
      </mesh>
    </>
  );
}

function FacadeStripes() {
  const stripeXPositions = [-0.74, -0.58, -0.42, 0.42, 0.58, 0.74];

  return (
    <>
      {stripeXPositions.map((x) => (
        <mesh key={x} position={[x, -0.24, -1.035]}>
          <boxGeometry args={[0.035, 0.74, 0.025]} />
          <meshBasicMaterial color="#2ff6ff" transparent opacity={0.34} />
        </mesh>
      ))}
    </>
  );
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
      <pointLight position={[0, -0.2, -0.7]} intensity={11} color="#2ff6ff" />
      <pointLight position={[-1.8, 1.2, 1.2]} intensity={4} color="#6cffdf" />

      <group rotation={[0, -0.2, 0]}>
        <mesh position={[0, -0.08, -1.55]} castShadow receiveShadow>
          <boxGeometry args={[2.05, 1.42, 1]} />
          <meshBasicMaterial color="#050b0d" />
          <Edges color="#2ff6ff" threshold={15} />
        </mesh>

        <mesh position={[0, -0.42, -1.04]}>
          <boxGeometry args={[0.46, 0.68, 0.06]} />
          <meshBasicMaterial color="#071314" />
          <Edges color="#6cffdf" threshold={10} />
        </mesh>
        <FacadeStripes />

        <mesh position={[0, -0.42, -0.99]}>
          <boxGeometry args={[0.32, 0.52, 0.025]} />
          <meshBasicMaterial color="#6cffdf" transparent opacity={0.22} />
        </mesh>

        <mesh position={[0, -0.78, -1.0]}>
          <sphereGeometry args={[0.105, 24, 24]} />
          <meshBasicMaterial color="#86ffe7" />
        </mesh>

        <Line
          points={visibleQueuePoints}
          color="#69ffdf"
          lineWidth={6}
          transparent
          opacity={0.95}
        />
        <Line
          points={visibleQueuePoints}
          color="#f3fffe"
          lineWidth={2}
          transparent
          opacity={0.42}
        />
        <QueueNodes />

        <gridHelper
          args={[8.5, 18, "#145247", "#071d1b"]}
          position={[0, -0.86, 1.22]}
        />
      </group>
    </>
  );
}

function CameraTarget() {
  const { camera } = useThree();

  useFrame(() => {
    camera.lookAt(0, -0.55, 1.08);
  });

  return null;
}

export function BerglineScene() {
  return (
    <Canvas
      camera={{ position: [0.35, 5.45, 7.35], fov: 42 }}
      dpr={[1, 1.7]}
      gl={{ antialias: true }}
    >
      <CameraTarget />
      <SceneGeometry />
    </Canvas>
  );
}
