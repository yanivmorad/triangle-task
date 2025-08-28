// src/utils/math.js

/**
 * @param {Object} point1
 * @param {Object} point2
 * @returns {number} The distance between the points.
 */
export const distance = (point1, point2) =>
  Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  );

/**
 * Calculates a triangle angle in degrees using the Law of Cosines.
 * @param {number} a - Length of the side opposite the angle.
 * @param {number} b - Length of an adjacent side.
 * @param {number} c - Length of the other adjacent side.
 * @returns {number} The angle in degrees.
 */
export const calculateAngle = (a, b, c) => {
  if (2 * b * c === 0) return 0;
  const cosA = (b * b + c * c - a * a) / (2 * b * c);
  const angleRad = Math.acos(Math.min(1, Math.max(-1, cosA)));
  return (angleRad * 180) / Math.PI;
};

/**
 * Normalizes point values to fit within a given drawing area.
 * @param {Array<Object>} points - An array of points ({x, y}).
 * @param {number} svgWidth - The width of the drawing area.
 * @param {number} svgHeight - The height of the drawing area.
 * @param {number} padding - The spacing from the edges.
 * @returns {Array<Object>} An array of normalized points.
 */
export const normalizePoints = (points, svgWidth, svgHeight, padding) => {
  const minX = Math.min(...points.map((p) => p.x));
  const maxX = Math.max(...points.map((p) => p.x));
  const minY = Math.min(...points.map((p) => p.y));
  const maxY = Math.max(...points.map((p) => p.y));

  const triangleWidth = maxX - minX;
  const triangleHeight = maxY - minY;

  const scaleX = (svgWidth - 2 * padding) / triangleWidth;
  const scaleY = (svgHeight - 2 * padding) / triangleHeight;
  const scale = Math.min(scaleX, scaleY);

  const normalizedTriangleWidth = triangleWidth * scale;
  const normalizedTriangleHeight = triangleHeight * scale;
  const translateX = (svgWidth - normalizedTriangleWidth) / 2 - minX * scale;
  const translateY = (svgHeight - normalizedTriangleHeight) / 2 - minY * scale;

  return points.map((p) => ({
    x: p.x * scale + translateX,
    y: p.y * scale + translateY,
  }));
};
