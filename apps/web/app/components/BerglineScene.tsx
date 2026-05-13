"use client";

import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { BufferGeometry, CatmullRomCurve3, TubeGeometry, Vector3 } from "three";

import {
  GeoCoordinate,
  landmarkCoordinates,
  queuePath,
  siteLines,
  sitePolygons,
  SitePolygon,
} from "../data/berglineGeometry";

type ScenePoint = [x: number, y: number, z: number];

const metersPerDegreeAtEquator = 111_320;
const sceneScale = 0.028;
const groundY = -0.82;
const roadsY = groundY + 0.005;
const origin = landmarkCoordinates.door;
const originLatitudeRadians = (origin[1] * Math.PI) / 180;
const mappedQueuePath = queuePath.map((coordinate) => projectCoordinate(coordinate));
const queueProgress = 1;
const visibleQueuePoints = getVisibleQueuePoints(mappedQueuePath, queueProgress);
const visibleQueueNodes = mappedQueuePath.slice(
  0,
  Math.max(2, Math.ceil(mappedQueuePath.length * Math.min(Math.max(queueProgress, 0), 1))),
);
const landmarkPositions = [
  { key: "door", point: projectCoordinate(landmarkCoordinates.door), radius: 0.08 },
  { key: "snake", point: projectCoordinate(landmarkCoordinates.snakeStart), radius: 0.05 },
  { key: "metro", point: projectCoordinate(landmarkCoordinates.metro), radius: 0.08 },
];

function projectCoordinate([longitude, latitude]: GeoCoordinate, y = groundY): ScenePoint {
  const eastMeters =
    (longitude - origin[0]) * metersPerDegreeAtEquator * Math.cos(originLatitudeRadians);
  const northMeters = (latitude - origin[1]) * metersPerDegreeAtEquator;

  return [eastMeters * sceneScale, y, -northMeters * sceneScale];
}

function getVisibleQueuePoints(points: ScenePoint[], progress: number) {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const vectors = points.map((point) => new Vector3(...point));
  const curve = new CatmullRomCurve3(vectors, false, "catmullrom", 0.18);
  const samples = Math.max(2, Math.round(120 * clampedProgress));

  return Array.from({ length: samples + 1 }, (_, index) =>
    curve.getPointAt((index / samples) * clampedProgress),
  );
}

function getPathGeometry(points: Array<ScenePoint | Vector3>, radius: number, segments = 80) {
  const curve = new CatmullRomCurve3(
    points.map((point) => (point instanceof Vector3 ? point : new Vector3(...point))),
    false,
    "catmullrom",
    0.16,
  );

  return new TubeGeometry(curve, segments, radius, 8, false);
}

function getLineSegmentsGeometry(points: ScenePoint[]) {
  const vertices = points
    .slice(0, -1)
    .flatMap((point, index) => [new Vector3(...point), new Vector3(...points[index + 1])]);

  return new BufferGeometry().setFromPoints(vertices);
}

function getPolygonWireframeGeometry(polygon: SitePolygon) {
  const footprint = polygon.coordinates.map((coordinate) => projectCoordinate(coordinate));
  const roofline = polygon.coordinates.map((coordinate) =>
    projectCoordinate(coordinate, groundY + polygon.height),
  );
  const horizontalEdges = [...segmentPairs(footprint), ...segmentPairs(roofline)];
  const verticalEdges = footprint.flatMap((point, index) => [
    new Vector3(...point),
    new Vector3(...roofline[index]),
  ]);

  return new BufferGeometry().setFromPoints([...horizontalEdges, ...verticalEdges]);
}

function segmentPairs(points: ScenePoint[]) {
  return points
    .slice(0, -1)
    .flatMap((point, index) => [new Vector3(...point), new Vector3(...points[index + 1])]);
}

function QueueNodes({ visibleQueueNodes }: { visibleQueueNodes: ScenePoint[] }) {
  return (
    <>
      {visibleQueueNodes.slice(1, -1).map((point) => (
        <mesh key={point.join(":")} position={point}>
          <sphereGeometry args={[0.035, 14, 14]} />
          <meshBasicMaterial color="#69ffdf" />
        </mesh>
      ))}

      <mesh position={visibleQueueNodes[visibleQueueNodes.length - 1]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
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
          <sphereGeometry args={[radius, 18, 18]} />
          <meshBasicMaterial color={key === "door" ? "#86ffe7" : "#d8fff7"} />
        </mesh>
      ))}
    </>
  );
}

function SceneGeometry() {
  const queueGeometries = useMemo(
    () => ({
      queueGlowGeometry: getPathGeometry(visibleQueuePoints, 0.008, 180),
      queueCoreGeometry: getPathGeometry(visibleQueuePoints, 0.003, 180),
    }),
    [],
  );
  const polygonGeometries = useMemo(
    () =>
      sitePolygons.map((polygon) => ({
        geometry: getPolygonWireframeGeometry(polygon),
        name: polygon.name,
        tone: polygon.tone,
      })),
    [],
  );
  const lineGeometries = useMemo(
    () =>
      siteLines.map((line) => ({
        geometry: getLineSegmentsGeometry(
          line.coordinates.map((coordinate) => projectCoordinate(coordinate, roadsY)),
        ),
        name: line.name,
        tone: line.tone,
      })),
    [],
  );
  const { queueGlowGeometry, queueCoreGeometry } = queueGeometries;

  return (
    <>
      <color attach="background" args={["#020304"]} />
      <fog attach="fog" args={["#020304", 12, 30]} />

      <group rotation={[0, -0.08, 0]}>
        {lineGeometries.map(({ geometry, name, tone }) => (
          <lineSegments key={name} geometry={geometry}>
            <lineBasicMaterial
              color={tone === "road" ? "#9aa7a6" : "#c4cfcc"}
              transparent
              opacity={tone === "road" ? 0.78 : 0.88}
            />
          </lineSegments>
        ))}

        {polygonGeometries.map(({ geometry, name, tone }) => (
          <lineSegments key={name} geometry={geometry}>
            <lineBasicMaterial
              color={tone === "building" ? "#2ff6ff" : "#aeb9b6"}
              transparent
              opacity={tone === "building" ? 0.72 : 0.42}
            />
          </lineSegments>
        ))}

        <mesh geometry={queueGlowGeometry}>
          <meshBasicMaterial color="#66ffb7" transparent opacity={0.92} />
        </mesh>
        <mesh geometry={queueCoreGeometry}>
          <meshBasicMaterial color="#f3fffe" transparent opacity={0.42} />
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
      camera={{ position: [0.55, 6.8, 6.7], fov: 43 }}
      dpr={[1, 1.7]}
      frameloop="demand"
      gl={{ antialias: true }}
      onCreated={({ camera }) => {
        camera.lookAt(-0.05, -0.6, 0.1);
      }}
    >
      <SceneGeometry />
    </Canvas>
  );
}
