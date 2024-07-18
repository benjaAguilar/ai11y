import Editor from "@monaco-editor/react";
import * as htmlparser2 from "htmlparser2";

import {
  Grid,
  Card,
  Heading,
  Text,
  Badge,
  Inset,
  Flex,
  Button,
  Blockquote,
} from "@radix-ui/themes";

import { useNavigate, useOutletContext } from "react-router-dom";

import { openai } from "../Home";
import { z } from "zod";
import { btnSurfaceS } from "../../styleProps";

function InputCode() {
  const { userHtml, setUserHtml, gen, setResponse } = useOutletContext();
  const nav = useNavigate();

  const prompt = `
  Mejora el siguiente codigo html teniendo en cuenta las mejores practicas para accesibilidad web y html semantico,
  ademas haz puntuaciones de 0 a 100 del codigo de antes y del despues mejorado,
  agrega tambien unas sugerencias de no mas de 100 palabras para mejorar la accesibilidad del codigo y ten en cuenta de incluir cosas que
  pueden no estarse viendo a simple vista como un event listener click a un div para que el usuario tenga en cuenta.
  Este es el codigo HTML:
  ${userHtml}  
`;

  const aiObject = {
    model: openai("gpt-3.5-turbo"),
    schema: z.object({
      htmlCode: z.string(),
      scores: z.object({ after: z.number(), before: z.number() }),
      suggestions: z.array(z.string()),
    }),
    prompt: prompt,
  };

  function handleEditorChange(value) {
    setUserHtml(value);
  }

  function isHtml() {
    try {
      const dom = htmlparser2.parseDocument(userHtml);
      const isHtmlNode = dom.children.some(
        (node) => node.type === "directive" || node.type === "tag"
      );

      return isHtmlNode;
    } catch (error) {
      console.log("Error parsing HTML: " + error);
      return false;
    }
  }

  async function handleBtn() {
    const isValidHtml = isHtml();

    if (!isValidHtml) {
      alert("please provide a valid HTML code");
      return;
    }

    const res = await gen(aiObject);
    setResponse(res);
    nav("/semantic-html/details");
  }

  function clearInput() {
    setUserHtml("");
  }

  return (
    <Flex align="center" justify="center" className="heightFix">
      <Grid columns={{ initial: "1", md: "2" }} gap="2rem" justify="center">
        <Card>
          <Flex direction="column" gap="1rem">
            <Heading as="h2">Input Html</Heading>
            <Card>
              <Inset>
                <Editor
                  defaultLanguage="html"
                  height="400px"
                  theme="vs-dark"
                  value={userHtml}
                  onChange={handleEditorChange}
                />
              </Inset>
            </Card>
            <Flex gap="1rem">
              <Button {...btnSurfaceS} onClick={handleBtn}>
                Improve Html
              </Button>
              <Button {...btnSurfaceS} onClick={clearInput}>
                Clear Input
              </Button>
            </Flex>
          </Flex>
        </Card>
        <Flex direction="column" gap="2rem">
          <Flex direction="column" gap="1rem">
            <Heading as="h1" size="7">
              Improve your HTML
            </Heading>
            <Text className="txt">
              Add some Html code and click <Badge>Improve HTML</Badge>.<br />
              <span>AI11Y</span> is gonna be responsible for improving the
              semantics of your HTML
            </Text>
          </Flex>
          <div>
            <Heading as="h2">
              <span>AI</span>11Y is capable of
            </Heading>
            <ul>
              <li>Improve semantics of HTML</li>
              <li>Provide before and after semantic scores</li>
              <li>Provide Tips and suggestions to keep in mind</li>
            </ul>
          </div>
          <Blockquote className="quote">
            Keep in mind that AI11Y is not an AI model, is just an app that uses
            OpenAI and VercelSDK. <br /> AI can make mistakes so always check
            the information
          </Blockquote>
        </Flex>
      </Grid>
    </Flex>
  );
}

export default InputCode;
