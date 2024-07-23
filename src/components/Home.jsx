import { Link, Outlet, useLocation } from "react-router-dom";

import { Theme } from "@radix-ui/themes";
import { Flex, Heading, TabNav, IconButton, Text } from "@radix-ui/themes";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { headerFlex } from "../styleProps";

import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { useState } from "react";
import MenuBtn from "./MenuBtn/MenuBtn.jsx";
import { data } from "../sessionData.js";

// eslint-disable-next-line react-refresh/only-export-components
export const userOpenai = createOpenAI({
  apiKey: data.userKey,
  compatibility: "strict",
});

function Home() {
  const [response, setResponse] = useState({});
  const [userHtml, setUserHtml] = useState("<!-- Your HTML code goes here -->");
  const [openai, setOpenai] = useState(() =>
    createOpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      compatibility: "strict",
    })
  );
  const location = useLocation();
  let tabs = {
    home: false,
    html: false,
    color: false,
  };

  const contextValues = {
    userHtml,
    setUserHtml,
    gen,
    response,
    setResponse,
    openai,
    setOpenai,
  };

  async function gen(obj) {
    try {
      const { object } = await generateObject(obj);

      console.log(object);
      return {
        ...object,
        success: true,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        errorMessage: e,
      };
    }
  }

  switch (location.pathname) {
    case "/":
      tabs = {
        home: true,
        html: false,
        color: false,
      };
      break;
    case "/semantic-html":
      tabs = {
        home: false,
        html: true,
        color: false,
      };
      break;
    case "/color-contrast":
      tabs = {
        home: false,
        html: false,
        color: true,
      };
      break;
    default:
      tabs = {
        home: false,
        html: true,
        color: false,
      };
      break;
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
              <TabNav.Link active={tabs.home}>
                <Link to={"/"} className="link">
                  Home
                </Link>
              </TabNav.Link>
              <TabNav.Link active={tabs.html}>
                <Link to={"/semantic-html"} className="link">
                  Semantic HTML
                </Link>
              </TabNav.Link>
              <TabNav.Link active={tabs.color}>
                <Link to={"/color-contrast"} className="link">
                  Color Contrast
                </Link>
              </TabNav.Link>
            </TabNav.Root>
          </nav>
          <div className="headBtns">
            <a href="https://github.com/benjaAguilar" target="_blank">
              <IconButton variant="ghost">
                <GitHubLogoIcon className="icon" />
              </IconButton>
            </a>
            <a href="https://www.instagram.com/benja_aguilarv/" target="_blank">
              <IconButton variant="ghost">
                <InstagramLogoIcon className="icon" />
              </IconButton>
            </a>
          </div>
          <MenuBtn />
        </Flex>
      </header>
      <main>
        <section>
          <Outlet context={contextValues} />
        </section>
      </main>
      <footer>
        <Text className="foot">Created by ColorCode :D</Text>
      </footer>
    </Theme>
  );
}

export default Home;
