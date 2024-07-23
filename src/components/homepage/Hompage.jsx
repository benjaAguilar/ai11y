import { Flex, Heading, Button } from "@radix-ui/themes";
import { btnSurface, homePageFlex } from "../../styleProps";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

function Hompage() {
  const nav = useNavigate();

  return (
    <Flex {...homePageFlex} className="home">
      <Heading as="h1" className="title">
        <span>AI</span>11Y
      </Heading>
      <Heading as="h2">
        improve web accessibility with <span>AI</span>
      </Heading>
      <Flex gap="1rem" wrap="wrap" className="homepageBtns">
        <Button {...btnSurface} onClick={() => nav("/semantic-html")}>
          Semantic Html <DoubleArrowRightIcon />
        </Button>
        <Button {...btnSurface} onClick={() => nav("/color-contrast")}>
          Color contrast <DoubleArrowRightIcon />
        </Button>
      </Flex>
    </Flex>
  );
}

export default Hompage;
