import * as Popover from "@radix-ui/react-popover";
import { SketchPicker } from "react-color";
import PropTypes from "prop-types";
import { Button, Card, IconButton, Flex } from "@radix-ui/themes";
import { BlendingModeIcon } from "@radix-ui/react-icons";
import { btnSurfaceS } from "../../../styleProps";

function ColorPicker({ color, handlePickerChange }) {
  return (
    <Popover.Root>
      <Popover.Trigger className="resetPopover">
        <IconButton variant="surface" size="3">
          <BlendingModeIcon />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content className="popover">
        <Card>
          <Flex direction="column" gap="1rem">
            <SketchPicker color={color} onChange={handlePickerChange} />
            <Popover.Close className="resetPopover" style={{ width: "100%" }}>
              <Button {...btnSurfaceS} style={{ width: "100%" }}>
                Done
              </Button>
            </Popover.Close>
          </Flex>
        </Card>
      </Popover.Content>
    </Popover.Root>
  );
}

ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  handlePickerChange: PropTypes.func.isRequired,
};

export default ColorPicker;
