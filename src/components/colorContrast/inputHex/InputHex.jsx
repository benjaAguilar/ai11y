import { useEffect, useState } from "react";
import ColorPicker from "../color-picker/ColorPicker";
import PropTypes from "prop-types";

function InputHex({ setColor, color, handleInputSet }) {
  const [InputPlaceholder, setInputPlaceholder] = useState(color);

  useEffect(() => {
    setInputPlaceholder(color);
  }, [color]);

  function isValidHex(value) {
    const hexColorRegexRGBA =
      /^#?([a-fA-F0-9]{8}|[a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    setInputPlaceholder(value);

    if (!hexColorRegexRGBA.test(value)) return;

    setColor(value);
    handleInputSet();
  }

  function handlePickerChange(color) {
    setInputPlaceholder(color.hex);
    setColor(color.hex);
    handleInputSet();
  }

  return (
    <div>
      <input
        style={{ color: "#262626" }}
        type="text"
        placeholder="#000000"
        value={InputPlaceholder}
        onChange={(e) => isValidHex(e.target.value)}
      />
      <ColorPicker color={color} handlePickerChange={handlePickerChange} />
    </div>
  );
}

InputHex.propTypes = {
  setColor: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  handleInputSet: PropTypes.func.isRequired,
};

export default InputHex;
