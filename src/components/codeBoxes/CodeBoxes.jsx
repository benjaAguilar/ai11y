import Editor from "@monaco-editor/react";
import { useRef } from "react";
import { useOutletContext } from "react-router-dom";
import SubTab from "../subTab/SubTab";
import { Card, Heading, Flex, Inset, Button, Grid } from "@radix-ui/themes";
import { btnSurfaceS } from "../../styleProps";

function CodeBoxes() {
  const { userHtml, response } = useOutletContext();
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
                  value={userHtml}
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
                  value={response.htmlCode}
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
