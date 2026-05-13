import { queueKeyPoints } from "../../data/berglineGeometry";

export const dynamic = "force-dynamic";

export function GET() {
  const keyPoint = queueKeyPoints[Math.floor(Math.random() * queueKeyPoints.length)];

  return Response.json({
    percent: keyPoint.percent,
    keyPoint,
  });
}
