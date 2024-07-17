import { Link, Outlet } from "react-router-dom";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const openai = createOpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  compatibility: "strict",
});

function Home() {
  const [response, setResponse] = useState({});
  const [userHtml, setUserHtml] = useState("");

  const contextValues = {
    userHtml,
    setUserHtml,
    gen,
    response,
    setResponse,
  };

  async function gen(obj) {
    try {
      const { object } = await generateObject(obj);

      console.log(object);
      return object;
    } catch (e) {
      console.error(e);
      return `Error Loading ai model: ${e}`;
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
