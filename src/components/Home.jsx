import { Link, Outlet } from "react-router-dom";

import { Theme } from "@radix-ui/themes";
import { Flex, Heading, TabNav, IconButton } from "@radix-ui/themes";
import { GitHubLogoIcon, DiscordLogoIcon } from "@radix-ui/react-icons";
import { headerFlex } from "../styleProps";

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
    <Theme
      appearance="dark"
      panelBackground="translucent"
      accentColor="iris"
      radius="large"
      scaling="100%"
    >
      <header>
        <Flex {...headerFlex}>
          <Heading as="h4" size="7">
            <span>AI</span>11Y
          </Heading>
          <nav>
            <TabNav.Root>
              <TabNav.Link active={true}>
                <Link to={"/"} className="link">
                  Home
                </Link>
              </TabNav.Link>
              <TabNav.Link active={false}>
                <Link to={"/semantic-html"} className="link">
                  Semantic HTML
                </Link>
              </TabNav.Link>
              <TabNav.Link active={false}>
                <Link to={"/color-contrast"} className="link">
                  Color Contrast
                </Link>
              </TabNav.Link>
            </TabNav.Root>
          </nav>
          <div className="headBtns">
            <IconButton>
              <GitHubLogoIcon />
            </IconButton>
            <IconButton>
              <DiscordLogoIcon />
            </IconButton>
          </div>
        </Flex>
      </header>
      <main>
        <section>
          <Outlet context={contextValues} />
        </section>
      </main>
    </Theme>
  );
}

export default Home;
