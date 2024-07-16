import { useState } from "react";
import Color from "color";
import InputHex from "./inputHex/InputHex";

function Contrast() {
  const [bgValue, setBgValue] = useState("#262626");
  const [fgValue, setFgValue] = useState("#DBFF5E");
  const [ratio, setRatio] = useState(calcRatio(bgValue, fgValue).toFixed(2));

  function switchValues() {
    setBgValue(fgValue);
    setFgValue(bgValue);
  }

  function calcColorVals(values) {
    //convert values in a range of 0 and 1
    const linearRgb = values.map((val) => {
      const value = val / 255;
      return value <= 0.03928
        ? value / 12.92
        : Math.pow((value + 0.055) / 1.055, 2.4);
    });

    //calc the relative luminance R * G * B
    const luminance =
      0.2126 * linearRgb[0] + 0.7152 * linearRgb[1] + 0.0722 * linearRgb[2];

    return luminance;
  }

  function calcRatio(bg, fg) {
    //convert hex to rgb array of vals
    let bgRGB = Color(bg).rgb().array();
    let fgRGB = Color(fg).rgb().array();

    bgRGB = calcColorVals(bgRGB);
    fgRGB = calcColorVals(fgRGB);

    return bgRGB > fgRGB
      ? (bgRGB + 0.05) / (fgRGB + 0.05)
      : (fgRGB + 0.05) / (bgRGB + 0.05);
  }

  function handleInputSet() {
    setRatio(calcRatio(bgValue, fgValue).toFixed(2));
  }

  return (
    <>
      <h1>contrast</h1>
      <p>color contrast</p>
      <div>
        <InputHex
          setColor={setBgValue}
          color={bgValue}
          handleInputSet={handleInputSet}
        />
        <button onClick={switchValues}>switch</button>
        <InputHex
          setColor={setFgValue}
          color={fgValue}
          handleInputSet={handleInputSet}
        />
      </div>
      <div>
        <p style={{ color: bgValue }}>ratio contrast</p>
        <p>
          {ratio} {ratio <= 4.5 ? "poor" : ratio >= 7 ? "very good" : "good"}
        </p>
      </div>
      <div style={{ backgroundColor: bgValue }}>
        <h2 style={{ color: fgValue }}>Example box</h2>
        <p style={{ color: fgValue }}>here you can visualize the contrast</p>
      </div>
    </>
  );
}

export default Contrast;
