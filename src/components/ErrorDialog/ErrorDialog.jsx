import {
  Button,
  Callout,
  Dialog,
  Flex,
  Heading,
  TextField,
} from "@radix-ui/themes";
import {
  ExclamationTriangleIcon,
  InfoCircledIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { btnSoftS, btnSurfaceS } from "../../styleProps";
import { useEffect, useState } from "react";
import { createOpenAI } from "@ai-sdk/openai";
import { data } from "../../sessionData";
import PropTypes from "prop-types";

function ErrorDialog({ isOpen, error, setDialog, setKey }) {
  const [dialogOpen, setDialogOpen] = useState(isOpen);
  const [userKey, setUserKey] = useState(data.userKey);

  useEffect(() => {
    setDialogOpen(isOpen);
  }, [isOpen]);

  function updateUserKey(value) {
    setUserKey(value);
    data.userKey = value;
    setKey(() =>
      createOpenAI({
        apiKey: value,
        compatibility: "strict",
      })
    );
  }

  function setDefaultKey() {
    setKey(() =>
      createOpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        compatibility: "strict",
      })
    );
    setUserKey("");
    data.userKey = "";
    setDialog(false);
  }

  return (
    <Dialog.Root open={dialogOpen}>
      <Dialog.Content>
        <Flex direction="column" gap="1rem">
          <Flex align="center" gap="1rem">
            <ExclamationTriangleIcon width="25px" height="25px" />
            <Dialog.Title>
              <Heading as="h2">
                <span>Oops!</span> there was an <span>error loading AI</span>{" "}
                model
              </Heading>
            </Dialog.Title>
          </Flex>

          <Callout.Root>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              {" "}
              <Dialog.Description>{error}</Dialog.Description>
            </Callout.Text>
          </Callout.Root>

          <Heading as="h3" size="5">
            <span>Try again</span> or use your OpenAI API key instead
          </Heading>
          <TextField.Root
            size="3"
            type="password"
            value={userKey}
            placeholder="Your Openai API key"
            onChange={(e) => updateUserKey(e.target.value)}
          >
            <TextField.Slot>
              <LockClosedIcon />
            </TextField.Slot>
          </TextField.Root>
          <Dialog.Close>
            <Flex align="center" gap="1rem" className="close">
              <Button {...btnSoftS} onClick={setDefaultKey}>
                Use Default key
              </Button>

              <Button
                {...btnSurfaceS}
                onClick={() => {
                  setDialog(false);
                }}
              >
                Done
              </Button>
            </Flex>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

ErrorDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  error: PropTypes.string,
  setDialog: PropTypes.func.isRequired,
  setKey: PropTypes.func.isRequired,
};

export default ErrorDialog;
