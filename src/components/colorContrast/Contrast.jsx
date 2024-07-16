import { useState } from "react";
import Color from "color";

function Contrast() {
  const [InputPlaceholder, setInputPlaceholder] = useState({
    bg: "#262626",
    fg: "#DBFF5E",
  });
  const [inputs, setInputs] = useState({
    bg: "#262626",
    fg: "#DBFF5E",
  });
  const [ratio, setRatio] = useState(calcRatio(inputs).toFixed(2));

  function switchValues() {
    setInputs({ bg: inputs.fg, fg: inputs.bg });
    setInputPlaceholder({ bg: InputPlaceholder.fg, fg: InputPlaceholder.bg });
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

  function calcRatio(colors) {
    //convert hex to rgb array of vals
    let bgRGB = Color(colors.bg).rgb().array();
    let fgRGB = Color(colors.fg).rgb().array();

    bgRGB = calcColorVals(bgRGB);
    fgRGB = calcColorVals(fgRGB);

    return bgRGB > fgRGB
      ? (bgRGB + 0.05) / (fgRGB + 0.05)
      : (fgRGB + 0.05) / (bgRGB + 0.05);
  }

  function handleInputSet(colors) {
    setInputs(colors);
    setRatio(calcRatio(colors).toFixed(2));
  }

  function isValidHex(colors, value) {
    const hexColorRegexRGBA =
      /^#?([a-fA-F0-9]{8}|[a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    setInputPlaceholder(colors);

    if (!hexColorRegexRGBA.test(value)) return;

    handleInputSet(colors);
  }

  return (
    <>
      <h1>contrast</h1>
      <p>color contrast</p>
      <div>
        <input
          style={{ color: "#262626" }}
          type="text"
          placeholder="#000000"
          value={InputPlaceholder.bg}
          onChange={(e) =>
            isValidHex(
              { ...InputPlaceholder, bg: e.target.value },
              e.target.value
            )
          }
        />
        <button onClick={switchValues}>switch</button>
        <input
          style={{ color: "#262626" }}
          type="text"
          placeholder="#000000"
          value={InputPlaceholder.fg}
          onChange={(e) =>
            isValidHex(
              { ...InputPlaceholder, fg: e.target.value },
              e.target.value
            )
          }
        />
      </div>
      <div>
        <p style={{ color: inputs.bg }}>ratio contrast</p>
        <p>
          {ratio} {ratio <= 4.5 ? "poor" : ratio >= 7 ? "very good" : "good"}
        </p>
      </div>
      <div style={{ backgroundColor: inputs.bg }}>
        <h2 style={{ color: inputs.fg }}>Example box</h2>
        <p style={{ color: inputs.fg }}>here you can visualize the contrast</p>
      </div>
    </>
  );
}

export default Contrast;
