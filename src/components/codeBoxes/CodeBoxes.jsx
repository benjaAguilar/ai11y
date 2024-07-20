import Editor from "@monaco-editor/react";
import { useRef } from "react";
import SubTab from "../subTab/SubTab";
import { Card, Heading, Flex, Inset, Button, Grid } from "@radix-ui/themes";
import { btnSurfaceS } from "../../styleProps";
import { data } from "../../sessionData";

function CodeBoxes() {
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  function handleInputEditorDidMount(editor) {
    inputRef.current = editor;
  }

  function handleEditorDidMount(editor) {
    outputRef.current = editor;
  }

  function copyCode(cRef) {
    if (cRef.current) {
      navigator.clipboard.writeText(cRef.current.getValue());
      alert("code copied!");
    }
  }

  return (
    <Flex direction="column" gap="2rem" justify="center">
      <SubTab />
      <Grid columns={{ initial: "1", md: "2" }} gap="1rem" justify="center">
        <Card>
          <Flex direction="column" gap="1rem">
            <Heading as="h2">Input Html</Heading>
            <Card>
              <Inset>
                <Editor
                  height="400px"
                  defaultLanguage="html"
                  value={data.userHtml}
                  theme="vs-dark"
                  options={{ readOnly: true }}
                  onMount={handleInputEditorDidMount}
                />
              </Inset>
            </Card>
            <div>
              <Button {...btnSurfaceS} onClick={() => copyCode(inputRef)}>
                Copy
              </Button>
            </div>
          </Flex>
        </Card>
        <Card>
          <Flex direction="column" gap="1rem">
            <Heading as="h2">Output Html</Heading>
            <Card>
              <Inset>
                <Editor
                  height="400px"
                  defaultLanguage="html"
                  value={data.responseHtml}
                  theme="vs-dark"
                  options={{ readOnly: true }}
                  onMount={handleEditorDidMount}
                />
              </Inset>
            </Card>
            <div>
              <Button {...btnSurfaceS} onClick={() => copyCode(outputRef)}>
                Copy
              </Button>
            </div>
          </Flex>
        </Card>
      </Grid>
    </Flex>
  );
}

export default CodeBoxes;
