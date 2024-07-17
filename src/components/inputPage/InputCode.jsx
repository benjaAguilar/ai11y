import Editor from "@monaco-editor/react";
import * as htmlparser2 from "htmlparser2";
import styles from "./input.module.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import { openai } from "../Home";
import { z } from "zod";

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
    <div className={styles.box}>
      <h2>Input Html</h2>
      <Editor
        className={styles.editor}
        height="400px"
        defaultLanguage="html"
        theme="vs-dark"
        value={userHtml}
        onChange={handleEditorChange}
      />
      <div className={styles.btnBox}>
        <button onClick={handleBtn}>Improve Html</button>
        <button onClick={clearInput}>Clear Input</button>
      </div>
    </div>
  );
}

export default InputCode;
