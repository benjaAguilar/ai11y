import Editor from "@monaco-editor/react";

import {
  Grid,
  Card,
  Heading,
  Inset,
  Flex,
  Button,
  TabNav,
} from "@radix-ui/themes";

import { useRef } from "react";
import Scores from "./scores/Scores";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { btnSurfaceS } from "../../styleProps";

const dummyResponse = {
  htmlCode: `    <header>
      <div class="logo">
        <img class="logo-img" src="./imgs/logo.svg" alt="" />
        <p class="logo-title">Color<span id="col">Cast</span></p>
      </div>
      <div class="search">
        <div class="search-box">
          <input
            type="text"
            id="searchbar"
            placeholder="Search"
            autocomplete="off"
          />
          <div class="suggestions"></div>
        </div>
        <img class="search-icon" src="./imgs/search.svg" alt="" />
      </div>
    </header>
`,
  scores: { after: 90, before: 50 },
  suggestions: [
    "suggestion one lorem ipsum",
    "suggestion two lorem ipsum",
    "suggestion three lorem ipsum",
    "suggestion four lorem ipsum",
  ],
};

function OutputCode() {
  const { response } = useOutletContext();
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

  // if (!response.htmlCode) return <h1>Loading</h1>;

  return (
    <Flex direction="column" gap="2rem" justify="center">
      <Flex gap="1rem" align="center">
        <TabNav.Root>
          <TabNav.Link active={true}>
            <Link to={"/semantic-html/details"} className="link">
              Details
            </Link>
          </TabNav.Link>
          <TabNav.Link active={false}>
            <Link to={"/semantic-html/compare"} className="link">
              Comparison
            </Link>
          </TabNav.Link>
        </TabNav.Root>
        <Button
          {...btnSurfaceS}
          className="navBtn"
          onClick={() => nav("/semantic-html")}
        >
          Input new HTML
        </Button>
      </Flex>
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
                    value={/*response.htmlCode*/ dummyResponse.htmlCode}
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
              scoreAfter={/*response.scores.after*/ dummyResponse.scores.after}
              scoreBefore={
                /*response.scores.before*/ dummyResponse.scores.before
              }
            />
            <div>
              <Heading as="h2">Suggestions</Heading>
              <div>
                <ul>
                  {
                    /*response.suggestions.map((suggestion, index) => (
              <p key={index}>{suggestion}</p>
            ))*/ dummyResponse.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))
                  }
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
