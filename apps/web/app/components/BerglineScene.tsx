"use client";

import { Canvas } from "@react-three/fiber";
import {
  BoxGeometry,
  CatmullRomCurve3,
  EdgesGeometry,
  TubeGeometry,
  Vector3,
} from "three";

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
const facadeStripeXPositions = [-0.74, -0.58, -0.42, 0.42, 0.58, 0.74];

function getVisibleQueuePoints(points: QueuePoint[], progress: number) {
  const vectors = points.map((point) => new Vector3(...point));
  const curve = new CatmullRomCurve3(vectors, false, "catmullrom", 0.28);
  const samples = Math.max(8, Math.round(72 * Math.min(Math.max(progress, 0), 1)));

  return curve.getPoints(samples);
}

const visibleQueuePoints = getVisibleQueuePoints(queuePath, queueProgress);
const visibleQueueNodes = queuePath.slice(
  0,
  Math.max(2, Math.round(queuePath.length * queueProgress)),
);
const visibleQueueCurve = new CatmullRomCurve3(
  visibleQueuePoints,
  false,
  "catmullrom",
  0.28,
);
const queueGlowGeometry = new TubeGeometry(visibleQueueCurve, 96, 0.035, 10, false);
const queueCoreGeometry = new TubeGeometry(visibleQueueCurve, 96, 0.013, 8, false);
const buildingEdgesGeometry = new EdgesGeometry(new BoxGeometry(2.05, 1.42, 1));
const doorEdgesGeometry = new EdgesGeometry(new BoxGeometry(0.46, 0.68, 0.06));

function QueueNodes() {
  return (
    <>
      {visibleQueueNodes.slice(1).map((point) => (
        <mesh key={point.join(":")} position={point}>
          <sphereGeometry args={[0.07, 18, 18]} />
          <meshBasicMaterial color="#69ffdf" />
        </mesh>
      ))}

      <mesh position={visibleQueueNodes[visibleQueueNodes.length - 1]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshBasicMaterial color="#69ffdf" />
      </mesh>
    </>
  );
}

function FacadeStripes() {
  return (
    <>
      {facadeStripeXPositions.map((x) => (
        <mesh key={x} position={[x, -0.24, -1.035]}>
          <boxGeometry args={[0.035, 0.74, 0.025]} />
          <meshBasicMaterial color="#2ff6ff" transparent opacity={0.34} />
        </mesh>
      ))}
    </>
  );
}

function SceneGeometry() {
  return (
    <>
      <color attach="background" args={["#020304"]} />
      <fog attach="fog" args={["#020304", 7, 15]} />

      <group rotation={[0, -0.2, 0]}>
        <mesh position={[0, -0.08, -1.55]}>
          <boxGeometry args={[2.05, 1.42, 1]} />
          <meshBasicMaterial color="#050b0d" />
        </mesh>
        <lineSegments position={[0, -0.08, -1.55]}>
          <primitive object={buildingEdgesGeometry} attach="geometry" />
          <lineBasicMaterial color="#2ff6ff" />
        </lineSegments>

        <mesh position={[0, -0.42, -1.04]}>
          <boxGeometry args={[0.46, 0.68, 0.06]} />
          <meshBasicMaterial color="#071314" />
        </mesh>
        <lineSegments position={[0, -0.42, -1.04]}>
          <primitive object={doorEdgesGeometry} attach="geometry" />
          <lineBasicMaterial color="#6cffdf" />
        </lineSegments>
        <FacadeStripes />

        <mesh position={[0, -0.42, -0.99]}>
          <boxGeometry args={[0.32, 0.52, 0.025]} />
          <meshBasicMaterial color="#6cffdf" transparent opacity={0.22} />
        </mesh>

        <mesh position={[0, -0.78, -1.0]}>
          <sphereGeometry args={[0.105, 24, 24]} />
          <meshBasicMaterial color="#86ffe7" />
        </mesh>

        <mesh geometry={queueGlowGeometry}>
          <meshBasicMaterial color="#69ffdf" transparent opacity={0.92} />
        </mesh>
        <mesh geometry={queueCoreGeometry}>
          <meshBasicMaterial color="#f3fffe" transparent opacity={0.5} />
        </mesh>
        <QueueNodes />

        <gridHelper
          args={[8.5, 18, "#145247", "#071d1b"]}
          position={[0, -0.86, 1.22]}
        />
      </group>
    </>
  );
}

export function BerglineScene() {
  return (
    <Canvas
      camera={{ position: [0.35, 5.45, 7.35], fov: 42 }}
      dpr={[1, 1.7]}
      gl={{ antialias: true }}
      onCreated={({ camera }) => {
        camera.lookAt(0, -0.55, 1.08);
      }}
    >
      <SceneGeometry />
    </Canvas>
  );
}
