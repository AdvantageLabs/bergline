"use client";

import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { BufferGeometry, CatmullRomCurve3, TubeGeometry, Vector3 } from "three";

import {
  buildingOutline,
  GeoCoordinate,
  landmarkCoordinates,
  queueSegments,
} from "../data/berglineGeometry";

type ScenePoint = [x: number, y: number, z: number];

const metersPerDegreeLatitude = 111_320;
const sceneScale = 0.028;
const groundY = -0.82;
const roofY = 0.36;
const origin = landmarkCoordinates.door;
const originLatitudeRadians = (origin[1] * Math.PI) / 180;
const queuePath = flattenSegments(queueSegments).map((coordinate) => projectCoordinate(coordinate));
const buildingFootprint = buildingOutline.map((coordinate) => projectCoordinate(coordinate));
const buildingRoofline = buildingOutline.map((coordinate) => projectCoordinate(coordinate, roofY));
const landmarkPositions = [
  { key: "door", point: projectCoordinate(landmarkCoordinates.door), radius: 0.11 },
  { key: "kiosk", point: projectCoordinate(landmarkCoordinates.kiosk), radius: 0.08 },
  { key: "t-junction", point: projectCoordinate(landmarkCoordinates.tJunction), radius: 0.08 },
  { key: "metro", point: projectCoordinate(landmarkCoordinates.metro), radius: 0.11 },
];

const queueProgress = 1;
const visibleQueuePoints = getVisibleQueuePoints(queuePath, queueProgress);
const visibleQueueNodes = queuePath.slice(
  0,
  Math.max(2, Math.ceil(queuePath.length * Math.min(Math.max(queueProgress, 0), 1))),
);

function flattenSegments(segments: GeoCoordinate[][]) {
  return segments.flatMap((segment, segmentIndex) =>
    segmentIndex === 0 ? segment : segment.slice(1),
  );
}

function projectCoordinate([longitude, latitude]: GeoCoordinate, y = groundY): ScenePoint {
  const eastMeters =
    (longitude - origin[0]) * metersPerDegreeLatitude * Math.cos(originLatitudeRadians);
  const northMeters = (latitude - origin[1]) * metersPerDegreeLatitude;

  return [eastMeters * sceneScale, y, -northMeters * sceneScale];
}

function getVisibleQueuePoints(points: ScenePoint[], progress: number) {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const vectors = points.map((point) => new Vector3(...point));
  const curve = new CatmullRomCurve3(vectors, false, "catmullrom", 0.24);
  const samples = Math.max(2, Math.round(96 * clampedProgress));

  return Array.from({ length: samples + 1 }, (_, index) =>
    curve.getPointAt((index / samples) * clampedProgress),
  );
}

function getPathGeometry(points: Array<ScenePoint | Vector3>, radius: number, segments = 80) {
  const curve = new CatmullRomCurve3(
    points.map((point) => (point instanceof Vector3 ? point : new Vector3(...point))),
    false,
    "catmullrom",
    0.2,
  );

  return new TubeGeometry(curve, segments, radius, 8, false);
}

function getLineSegmentsGeometry(points: ScenePoint[]) {
  const vertices = points
    .slice(0, -1)
    .flatMap((point, index) => [new Vector3(...point), new Vector3(...points[index + 1])]);

  return new BufferGeometry().setFromPoints(vertices);
}

function getBuildingVerticalGeometry() {
  const vertices = buildingFootprint.flatMap((groundPoint, index) => [
    new Vector3(...groundPoint),
    new Vector3(...buildingRoofline[index]),
  ]);

  return new BufferGeometry().setFromPoints(vertices);
}

function QueueNodes({ visibleQueueNodes }: { visibleQueueNodes: ScenePoint[] }) {
  return (
    <>
      {visibleQueueNodes.slice(1, -1).map((point) => (
        <mesh key={point.join(":")} position={point}>
          <sphereGeometry args={[0.055, 18, 18]} />
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
    </>
  );
}

function SceneGeometry() {
  const queueGeometries = useMemo(
    () => ({
      queueGlowGeometry: getPathGeometry(visibleQueuePoints, 0.045, 160),
      queueCoreGeometry: getPathGeometry(visibleQueuePoints, 0.014, 160),
    }),
    [],
  );
  const buildingGeometries = useMemo(
    () => ({
      footprintGeometry: getLineSegmentsGeometry(buildingFootprint),
      rooflineGeometry: getLineSegmentsGeometry(buildingRoofline),
      verticalGeometry: getBuildingVerticalGeometry(),
    }),
    [],
  );
  const { queueGlowGeometry, queueCoreGeometry } = queueGeometries;
  const { footprintGeometry, rooflineGeometry, verticalGeometry } = buildingGeometries;

  return (
    <>
      <color attach="background" args={["#020304"]} />
      <fog attach="fog" args={["#020304", 12, 26]} />

      <group rotation={[0, -0.08, 0]}>
        <lineSegments geometry={footprintGeometry}>
          <lineBasicMaterial color="#1aa99d" transparent opacity={0.44} />
        </lineSegments>
        <lineSegments geometry={rooflineGeometry}>
          <lineBasicMaterial color="#2ff6ff" transparent opacity={0.88} />
        </lineSegments>
        <lineSegments geometry={verticalGeometry}>
          <lineBasicMaterial color="#2ff6ff" transparent opacity={0.34} />
        </lineSegments>

        <mesh geometry={queueGlowGeometry}>
          <meshBasicMaterial color="#66ffb7" transparent opacity={0.98} />
        </mesh>
        <mesh geometry={queueCoreGeometry}>
          <meshBasicMaterial color="#f3fffe" transparent opacity={0.5} />
        </mesh>

        <LandmarkMarkers />
        <QueueNodes visibleQueueNodes={visibleQueueNodes} />

        <gridHelper args={[10, 22, "#0f3b37", "#061817"]} position={[-1.6, -0.9, 3.2]} />
      </group>
    </>
  );
}

export function BerglineScene() {
  return (
    <Canvas
      camera={{ position: [1.35, 10.4, 13.4], fov: 52 }}
      dpr={[1, 1.7]}
      frameloop="demand"
      gl={{ antialias: true }}
      onCreated={({ camera }) => {
        camera.lookAt(-0.55, -0.45, 2.75);
      }}
    >
      <SceneGeometry />
    </Canvas>
  );
}
