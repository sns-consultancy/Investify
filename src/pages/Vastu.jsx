
import React, { useEffect } from "react";

const Vastu = () => {
  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", (event) => {
        const heading = event.webkitCompassHeading || event.alpha;
        if (heading !== null && !isNaN(heading)) {
          document.getElementById("compass-value").textContent =
            "Heading: " + Math.round(heading) + "°";
        }
      });
    }
  }, []);

  return (
    <div className="hero">
      <h1>Vastu Recommendations</h1>
      <ul style={{ textAlign: "left" }}>
        <li>Entrance should be in the North-East direction for positive energy.</li>
        <li>Kitchen is best placed in the South-East corner.</li>
        <li>Master bedroom should be in the South-West corner.</li>
        <li>Puja room should be in the North-East corner.</li>
        <li>Avoid placing mirrors in front of the bed.</li>
      </ul>
      <div id="compass-value" style={{ marginTop: "20px" }}>Heading: --°</div>
    </div>
  );
};

export default Vastu;
