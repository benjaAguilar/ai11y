import { useEffect, useState } from "react";
import ColorPicker from "../color-picker/ColorPicker";
import PropTypes from "prop-types";
import { TextField, Flex } from "@radix-ui/themes";
import { BlendingModeIcon } from "@radix-ui/react-icons";

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
    <Flex gap="0.2rem" align="center">
      <TextField.Root
        size="3"
        placeholder="#000000"
        value={InputPlaceholder}
        onChange={(e) => isValidHex(e.target.value)}
      >
        <TextField.Slot>
          <BlendingModeIcon color={color} />
        </TextField.Slot>
      </TextField.Root>
      <ColorPicker color={color} handlePickerChange={handlePickerChange} />
    </Flex>
  );
}

InputHex.propTypes = {
  setColor: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  handleInputSet: PropTypes.func.isRequired,
};

export default InputHex;
