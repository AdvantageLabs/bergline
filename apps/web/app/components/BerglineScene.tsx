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
const kioskPosition: QueuePoint = [-0.85, -0.8, 0.95];
const tJunctionPosition: QueuePoint = [-1.52, -0.8, 3.18];
const metroSignPosition: QueuePoint = [-1.86, -0.8, 5.05];

const queuePath: QueuePoint[] = [
  doorPosition,
  [0.14, -0.8, -0.72],
  [-0.18, -0.8, -0.42],
  [-0.58, -0.8, -0.02],
  [-0.74, -0.8, 0.46],
  kioskPosition,
  [-1.06, -0.8, 1.52],
  [-1.2, -0.8, 2.08],
  [-1.34, -0.8, 2.66],
  tJunctionPosition,
  [-1.62, -0.8, 3.82],
  [-1.74, -0.8, 4.38],
  metroSignPosition,
];

const streetPaths: QueuePoint[][] = [
  [
    [-1.42, -0.84, -1.35],
    [-1.62, -0.84, -0.45],
    [-1.8, -0.84, 0.58],
    [-1.96, -0.84, 1.64],
    [-2.12, -0.84, 2.78],
    [-2.32, -0.84, 4.05],
    [-2.55, -0.84, 5.55],
  ],
  [
    [-0.62, -0.845, -1.55],
    [-0.96, -0.845, -0.38],
    [-1.2, -0.845, 0.92],
    [-1.42, -0.845, 2.28],
    [-1.64, -0.845, 3.62],
    [-1.86, -0.845, 5.1],
  ],
  [
    [-3.15, -0.85, 4.68],
    [-2.36, -0.85, 4.88],
    [-1.78, -0.85, 5.08],
    [-0.78, -0.85, 5.28],
  ],
  [
    [-2.95, -0.85, 2.88],
    [-2.16, -0.85, 3.06],
    [-1.52, -0.85, 3.18],
    [-0.62, -0.85, 3.54],
  ],
  [
    [-1.1, -0.85, -1.04],
    [-0.52, -0.85, -0.7],
    [0.06, -0.85, -0.5],
    [0.82, -0.85, -0.38],
  ],
  [
    [0.56, -0.85, -0.88],
    [0.36, -0.85, -0.2],
    [0.12, -0.85, 0.42],
    [-0.32, -0.85, 0.84],
  ],
];

const landmarkPositions = [
  { key: "door", point: doorPosition, radius: 0.105 },
  { key: "kiosk", point: kioskPosition, radius: 0.08 },
  { key: "t-junction", point: tJunctionPosition, radius: 0.08 },
  { key: "metro", point: metroSignPosition, radius: 0.11 },
];

const queueProgress = 1;
const facadeStripeXPositions = [-0.74, -0.58, -0.42, 0.42, 0.58, 0.74];

function getVisibleQueuePoints(points: QueuePoint[], progress: number) {
  const vectors = points.map((point) => new Vector3(...point));
  const curve = new CatmullRomCurve3(vectors, false, "catmullrom", 0.28);
  const samples = Math.max(8, Math.round(72 * Math.min(Math.max(progress, 0), 1)));

  return curve.getPoints(samples);
}

function getPathGeometry(points: QueuePoint[], radius: number, segments = 80) {
  const curve = new CatmullRomCurve3(
    points.map((point) => new Vector3(...point)),
    false,
    "catmullrom",
    0.22,
  );

  return new TubeGeometry(curve, segments, radius, 8, false);
}

const visibleQueuePoints = getVisibleQueuePoints(queuePath, queueProgress);
const visibleQueueNodes = queuePath.slice(
  0,
  Math.max(2, Math.round(queuePath.length * queueProgress)),
);
const queueGlowGeometry = getPathGeometry(
  visibleQueuePoints.map((point) => point.toArray() as QueuePoint),
  0.04,
  120,
);
const queueCoreGeometry = getPathGeometry(
  visibleQueuePoints.map((point) => point.toArray() as QueuePoint),
  0.014,
  120,
);
const streetGeometries = streetPaths.map((path) => getPathGeometry(path, 0.012, 64));
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

function LandmarkMarkers() {
  return (
    <>
      {landmarkPositions.map(({ key, point, radius }) => (
        <mesh key={key} position={point}>
          <sphereGeometry args={[radius, 20, 20]} />
          <meshBasicMaterial color={key === "door" ? "#86ffe7" : "#d8fff7"} />
        </mesh>
      ))}

      <mesh position={[kioskPosition[0] + 0.18, -0.79, kioskPosition[2] + 0.08]}>
        <boxGeometry args={[0.2, 0.13, 0.2]} />
        <meshBasicMaterial color="#d8fff7" transparent opacity={0.54} />
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
      <fog attach="fog" args={["#020304", 11, 22]} />

      <group rotation={[0, -0.06, 0]}>
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

        {streetGeometries.map((geometry, index) => (
          <mesh key={index} geometry={geometry}>
            <meshBasicMaterial color="#b9c7c3" transparent opacity={0.28} />
          </mesh>
        ))}

        <mesh geometry={queueGlowGeometry}>
          <meshBasicMaterial color="#66ffb7" transparent opacity={0.98} />
        </mesh>
        <mesh geometry={queueCoreGeometry}>
          <meshBasicMaterial color="#f3fffe" transparent opacity={0.5} />
        </mesh>
        <LandmarkMarkers />
        <QueueNodes />

        <gridHelper
          args={[9.5, 20, "#0f3b37", "#061817"]}
          position={[-0.72, -0.88, 2.15]}
        />
      </group>
    </>
  );
}

export function BerglineScene() {
  return (
    <Canvas
      camera={{ position: [0.05, 8.3, 10.4], fov: 45 }}
      dpr={[1, 1.7]}
      gl={{ antialias: true }}
      onCreated={({ camera }) => {
        camera.lookAt(-0.86, -0.62, 2.35);
      }}
    >
      <SceneGeometry />
    </Canvas>
  );
}
