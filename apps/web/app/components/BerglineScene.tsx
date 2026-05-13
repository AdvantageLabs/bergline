"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import {
  BufferGeometry,
  CatmullRomCurve3,
  DoubleSide,
  Float32BufferAttribute,
  MOUSE,
  ShapeUtils,
  TOUCH,
  TubeGeometry,
  Vector2,
  Vector3,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
const siteLineY = groundY + 0.005;
const cameraTarget = new Vector3(-0.05, -0.6, 0.1);
const endpointMarkerSize = 0.08 / 3;
const origin = landmarkCoordinates.door;
const originLatitudeRadians = (origin[1] * Math.PI) / 180;
const mappedQueuePath = queuePath.map((coordinate) => projectCoordinate(coordinate));
const queueProgress = 1;
const visibleQueuePoints = getVisibleQueuePoints(mappedQueuePath, queueProgress);
const visibleQueueNodes = mappedQueuePath.slice(
  0,
  Math.max(2, Math.ceil(mappedQueuePath.length * Math.min(Math.max(queueProgress, 0), 1))),
);
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
  return new BufferGeometry().setFromPoints(getSegmentVertices(points));
}

function getPolygonWireframeGeometry(polygon: SitePolygon) {
  const footprint = polygon.coordinates.map((coordinate) => projectCoordinate(coordinate));
  const roofline = polygon.coordinates.map((coordinate) =>
    projectCoordinate(coordinate, groundY + polygon.height),
  );
  const uniqueFootprint = withoutClosingPoint(footprint);
  const uniqueRoofline = withoutClosingPoint(roofline);
  const horizontalEdges = [...getSegmentVertices(footprint), ...getSegmentVertices(roofline)];
  const verticalEdges = uniqueFootprint.flatMap((point, index) => [
    new Vector3(...point),
    new Vector3(...uniqueRoofline[index]),
  ]);

  return new BufferGeometry().setFromPoints([...horizontalEdges, ...verticalEdges]);
}

function getSegmentVertices(points: ScenePoint[]) {
  return points
    .slice(0, -1)
    .flatMap((point, index) => [new Vector3(...point), new Vector3(...points[index + 1])]);
}

function getPolygonVolumeGeometry(polygon: SitePolygon) {
  const footprint = withoutClosingPoint(
    polygon.coordinates.map((coordinate) => projectCoordinate(coordinate)),
  );
  const roofline = footprint.map(
    ([x, , z]) => [x, groundY + polygon.height, z] satisfies ScenePoint,
  );
  const shapePoints = footprint.map(([x, , z]) => new Vector2(x, z));
  const triangles = ShapeUtils.triangulateShape(shapePoints, []);
  const vertices: number[] = [];

  triangles.forEach(([a, b, c]) => {
    pushTriangle(vertices, roofline[a], roofline[b], roofline[c]);
    pushTriangle(vertices, footprint[c], footprint[b], footprint[a]);
  });

  footprint.forEach((point, index) => {
    const nextIndex = (index + 1) % footprint.length;
    const nextPoint = footprint[nextIndex];
    const roofPoint = roofline[index];
    const nextRoofPoint = roofline[nextIndex];

    pushTriangle(vertices, point, nextPoint, nextRoofPoint);
    pushTriangle(vertices, point, nextRoofPoint, roofPoint);
  });

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  geometry.computeVertexNormals();

  return geometry;
}

function withoutClosingPoint(points: ScenePoint[]) {
  const [firstPoint] = points;
  const lastPoint = points[points.length - 1];

  if (firstPoint && lastPoint && firstPoint.every((value, index) => value === lastPoint[index])) {
    return points.slice(0, -1);
  }

  return points;
}

function pushTriangle(vertices: number[], a: ScenePoint, b: ScenePoint, c: ScenePoint) {
  vertices.push(...a, ...b, ...c);
}

function PanControls() {
  const { camera, gl, invalidate } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);

    controls.enableRotate = false;
    controls.enableZoom = false;
    controls.enablePan = true;
    controls.mouseButtons.LEFT = MOUSE.PAN;
    controls.touches.ONE = TOUCH.PAN;
    controls.touches.TWO = TOUCH.DOLLY_PAN;
    controls.screenSpacePanning = true;
    controls.target.copy(cameraTarget);
    controls.update();
    const requestFrame = () => invalidate();

    controls.addEventListener("change", requestFrame);

    return () => {
      controls.removeEventListener("change", requestFrame);
      controls.dispose();
    };
  }, [camera, gl, invalidate]);

  return null;
}

function QueueNodes({ visibleQueueNodes }: { visibleQueueNodes: ScenePoint[] }) {
  return (
    <mesh position={visibleQueueNodes[visibleQueueNodes.length - 1]}>
      <boxGeometry args={[endpointMarkerSize, endpointMarkerSize, endpointMarkerSize]} />
      <meshBasicMaterial color="#69ffdf" />
    </mesh>
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
        fillGeometry: getPolygonVolumeGeometry(polygon),
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
          line.coordinates.map((coordinate) => projectCoordinate(coordinate, siteLineY)),
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

        {polygonGeometries.map(({ fillGeometry, geometry, name, tone }) => (
          <group key={name}>
            <mesh geometry={fillGeometry}>
              <meshBasicMaterial
                color={tone === "building" ? "#6f7d7b" : "#8c9693"}
                side={DoubleSide}
                transparent
                opacity={tone === "building" ? 0.16 : 0.28}
              />
            </mesh>
            <lineSegments geometry={geometry}>
              <lineBasicMaterial
                color={tone === "building" ? "#2ff6ff" : "#aeb9b6"}
                transparent
                opacity={tone === "building" ? 0.72 : 0.52}
              />
            </lineSegments>
          </group>
        ))}

        <mesh geometry={queueGlowGeometry}>
          <meshBasicMaterial color="#66ffb7" transparent opacity={0.92} />
        </mesh>
        <mesh geometry={queueCoreGeometry}>
          <meshBasicMaterial color="#f3fffe" transparent opacity={0.42} />
        </mesh>

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
        camera.lookAt(cameraTarget);
      }}
    >
      <SceneGeometry />
      <PanControls />
    </Canvas>
  );
}
