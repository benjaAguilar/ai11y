import Editor from "@monaco-editor/react";

import { Grid, Card, Heading, Inset, Flex, Button } from "@radix-ui/themes";

import { useRef } from "react";
import Scores from "./scores/Scores";
import { useNavigate } from "react-router-dom";
import { btnSurfaceS } from "../../styleProps";
import SubTab from "../subTab/SubTab";
import { data } from "../../sessionData";

function OutputCode() {
  const nav = useNavigate();
  const outputRef = useRef(null);

  function handleEditorDidMount(editor) {
    outputRef.current = editor;
  }

  function copyCode() {
    if (outputRef.current) {
      navigator.clipboard.writeText(outputRef.current.getValue());
      alert("code copied!");
    }
  }

  return (
    <Flex direction="column" gap="2rem" justify="center">
      <SubTab />
      <div>
        <Grid columns={{ initial: "1", md: "2" }} gap="2rem" justify="center">
          <Card>
            <Flex direction="column" gap="1rem">
              <Heading as="h2">Output HTML</Heading>
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
              <Flex gap="1rem">
                <Button {...btnSurfaceS} onClick={copyCode}>
                  Copy
                </Button>
                <Button {...btnSurfaceS} onClick={() => nav("/semantic-html")}>
                  Input new HTML
                </Button>
              </Flex>
            </Flex>
          </Card>
          <Flex direction="column" gap="2rem">
            {/* Scores and Suggestions! */}
            <Scores
              scoreAfter={data.scores.after}
              scoreBefore={data.scores.before}
            />
            <div>
              <Heading as="h2">Suggestions</Heading>
              <div>
                <ul>
                  {data.suggestions.map((suggestion, index) => (
                    <p key={index}>{suggestion}</p>
                  ))}
                </ul>
              </div>
            </div>
          </Flex>
        </Grid>
      </div>
    </Flex>
  );
}

export default OutputCode;
