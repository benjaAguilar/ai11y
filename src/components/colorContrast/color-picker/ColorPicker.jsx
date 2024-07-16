import * as Popover from "@radix-ui/react-popover";
import { SketchPicker } from "react-color";
import PropTypes from "prop-types";

function ColorPicker({ color, handlePickerChange }) {
  return (
    <Popover.Root>
      <Popover.Trigger>color</Popover.Trigger>
      <Popover.Content>
        <SketchPicker color={color} onChange={handlePickerChange} />
        <Popover.Close>done</Popover.Close>
      </Popover.Content>
    </Popover.Root>
  );
}

ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  handlePickerChange: PropTypes.func.isRequired,
};

export default ColorPicker;
