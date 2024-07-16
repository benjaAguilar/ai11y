import { Link, Outlet } from "react-router-dom";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

import { useState } from "react";

function Home() {
  const [response, setResponse] = useState({});
  const [userHtml, setUserHtml] = useState("");

  const prompt = `
  Mejora el siguiente codigo html teniendo en cuenta las mejores practicas para accesibilidad web y html semantico,
  ademas haz puntuaciones de 0 a 100 del codigo de antes y del despues mejorado,
  agrega tambien unas sugerencias de no mas de 100 palabras para mejorar la accesibilidad del codigo y ten en cuenta de incluir cosas que
  pueden no estarse viendo a simple vista como un event listener click a un div para que el usuario tenga en cuenta.
  Este es el codigo HTML:
  ${userHtml}  
`;

  const contextValues = {
    userHtml,
    setUserHtml,
    gen,
    response,
    setResponse,
  };

  const openai = createOpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    compatibility: "strict",
  });

  async function gen() {
    try {
      const { object } = await generateObject({
        model: openai("gpt-3.5-turbo"),
        schema: z.object({
          htmlCode: z.string(),
          scores: z.object({ after: z.number(), before: z.number() }),
          suggestions: z.array(z.string()),
        }),
        prompt: prompt,
      });

      console.log(object);
      setResponse(object);
    } catch (e) {
      console.error(e);
      setResponse(`Error Loading ai model: ${e}`);
    }
  }

  return (
    <>
      <header>
        <div className="logo">
          <span>AI</span>11Y
        </div>
        <nav>
          <Link to={"/"}>Home</Link>
          <Link to={"/semantic-html"}>Semantic HTML</Link>
          <Link to={"/color-contrast"}>Color Contrast</Link>
        </nav>
      </header>
      <main>
        <section>
          <Outlet context={contextValues} />
        </section>
      </main>
    </>
  );
}

export default Home;
