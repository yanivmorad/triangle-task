import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { distance, calculateAngle, normalizePoints } from "../hook/utils";

const TriangleDisplay = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleBack = () => navigate("/");

  const p1 = {
    x: parseFloat(searchParams.get("p1x")),
    y: parseFloat(searchParams.get("p1y")),
  };
  const p2 = {
    x: parseFloat(searchParams.get("p2x")),
    y: parseFloat(searchParams.get("p2y")),
  };
  const p3 = {
    x: parseFloat(searchParams.get("p3x")),
    y: parseFloat(searchParams.get("p3y")),
  };

  if (isNaN(p1.x) || isNaN(p2.x) || isNaN(p3.x)) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h2 className="text-xl font-semibold text-red-600">
          נא להזין ערכים תקינים.
        </h2>
      </div>
    );
  }

  const a = distance(p2, p3);
  const b = distance(p1, p3);
  const c = distance(p1, p2);

  const angleA = calculateAngle(a, b, c).toFixed(2);
  const angleB = calculateAngle(b, a, c).toFixed(2);
  const angleC = calculateAngle(c, a, b).toFixed(2);

  const svgSize = 400; // נתאים לגודל מסך
  const padding = 40;
  const [nP1, nP2, nP3] = normalizePoints(
    [p1, p2, p3],
    svgSize,
    svgSize,
    padding
  );

  const trianglePath = `M ${nP1.x} ${nP1.y} L ${nP2.x} ${nP2.y} L ${nP3.x} ${nP3.y} Z`;

  const drawAngleArc = (center, p1, p2) => {
    const radius = 30;
    const angle1 =
      (Math.atan2(p1.y - center.y, p1.x - center.x) * 180) / Math.PI;
    const angle2 =
      (Math.atan2(p2.y - center.y, p2.x - center.x) * 180) / Math.PI;
    let startAngle = angle1;
    let endAngle = angle2;
    if (endAngle < startAngle) endAngle += 360;
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    const startX = center.x + radius * Math.cos((startAngle * Math.PI) / 180);
    const startY = center.y + radius * Math.sin((startAngle * Math.PI) / 180);
    const endX = center.x + radius * Math.cos((endAngle * Math.PI) / 180);
    const endY = center.y + radius * Math.sin((endAngle * Math.PI) / 180);
    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  const angleArcA = drawAngleArc(nP1, nP3, nP2);
  const angleArcB = drawAngleArc(nP2, nP1, nP3);
  const angleArcC = drawAngleArc(nP3, nP2, nP1);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 bg-gray-50 min-h-screen">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 sm:p-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          המשולש שלך
        </h2>

        <div className="flex justify-center">
          <svg
            width={svgSize}
            height={svgSize}
            className="border border-gray-300 rounded-md bg-white"
          >
            <path
              d={trianglePath}
              fill="#e6f0ff"
              stroke="#4a90e2"
              strokeWidth="2"
            />
            {[nP1, nP2, nP3].map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="6" fill="#ff5e5e">
                <title>{`נקודה ${i + 1}`}</title>
              </circle>
            ))}

            {[angleArcA, angleArcB, angleArcC].map((arc, i) => (
              <path
                key={i}
                d={arc}
                fill="none"
                stroke="#6ee7b7"
                strokeWidth="2"
              />
            ))}

            <text
              x={nP1.x + 15}
              y={nP1.y - 10}
              className="text-sm"
              fill="#1f2937"
              fontSize="14"
              fontWeight="bold"
            >
              {`${angleA}°`}
            </text>
            <text
              x={nP2.x - 25}
              y={nP2.y - 10}
              className="text-sm"
              fill="#1f2937"
              fontSize="14"
              fontWeight="bold"
            >
              {`${angleB}°`}
            </text>
            <text
              x={nP3.x + 15}
              y={nP3.y + 20}
              className="text-sm"
              fill="#1f2937"
              fontSize="14"
              fontWeight="bold"
            >
              {`${angleC}°`}
            </text>
          </svg>
        </div>

        <button
          onClick={handleBack}
          className="mt-8 w-full py-3 text-lg font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
        >
          🔄 נסה שוב
        </button>
      </div>
    </div>
  );
};

export default TriangleDisplay;
