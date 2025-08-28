import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InputForm = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState({
    p1: { x: "", y: "" },
    p2: { x: "", y: "" },
    p3: { x: "", y: "" },
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e, point, coord) => {
    setPoints((prevPoints) => ({
      ...prevPoints,
      [point]: {
        ...prevPoints[point],
        [coord]: e.target.value,
      },
    }));

    // מנקה את השגיאה ברגע שממלאים
    setErrors((prevErrors) => ({
      ...prevErrors,
      [`${point}_${coord}`]: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    let hasErrors = false;

    ["p1", "p2", "p3"].forEach((pointName) => {
      if (!points[pointName].x) {
        newErrors[`${pointName}_x`] = true;
        hasErrors = true;
      }
      if (!points[pointName].y) {
        newErrors[`${pointName}_y`] = true;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      const { p1, p2, p3 } = points;
      navigate(
        `/display?p1x=${p1.x}&p1y=${p1.y}&p2x=${p2.x}&p2y=${p2.y}&p3x=${p3.x}&p3y=${p3.y}`
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-50 to-purple-100 p-6 font-sans">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-8">
          הזן קואורדינטות ליצירת משולש
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {["p1", "p2", "p3"].map((pointName, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                נקודה {index + 1}
              </h3>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <input
                    type="number"
                    placeholder="X"
                    value={points[pointName].x}
                    onChange={(e) => handleChange(e, pointName, "x")}
                    className={`w-full p-3 border rounded-lg focus:outline-none transition-all duration-200 ${
                      errors[`${pointName}_x`]
                        ? "border-red-500 focus:ring-2 focus:ring-red-300"
                        : "border-gray-300 focus:ring-2 focus:ring-blue-400"
                    }`}
                  />
                  {errors[`${pointName}_x`] && (
                    <p className="text-sm text-red-600 mt-1">יש למלא ערך ל-X</p>
                  )}
                </div>
                <div className="w-1/2">
                  <input
                    type="number"
                    placeholder="Y"
                    value={points[pointName].y}
                    onChange={(e) => handleChange(e, pointName, "y")}
                    className={`w-full p-3 border rounded-lg focus:outline-none transition-all duration-200 ${
                      errors[`${pointName}_y`]
                        ? "border-red-500 focus:ring-2 focus:ring-red-300"
                        : "border-gray-300 focus:ring-2 focus:ring-blue-400"
                    }`}
                  />
                  {errors[`${pointName}_y`] && (
                    <p className="text-sm text-red-600 mt-1">יש למלא ערך ל-Y</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
          >
            ✨ הצג את המשולש
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
