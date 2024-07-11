import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { useState } from "react";

function Text() {
  const [response, setResponse] = useState("");
  const prompt = "cual es la capital de noruega?";

  const openai = createOpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    compatibility: "strict",
  });

  async function gen() {
    try {
      const text = await generateText({
        model: openai("gpt-3.5-turbo"),
        prompt: prompt,
      });

      console.log(text);

      setResponse(text.text);
    } catch (e) {
      console.error(e);
      setResponse(`Error Loading ai model: ${e}`);
    }
  }

  return (
    <>
      <h1>{prompt}</h1> <button onClick={gen}>ASK</button>
      <p>{response}</p>
    </>
  );
}

export default Text;
