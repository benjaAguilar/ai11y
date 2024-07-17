import { Flex, Heading, Button } from "@radix-ui/themes";
import { btnSurface, homePageFlex } from "../../styleProps";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";

function Hompage() {
  return (
    <Flex {...homePageFlex} className="home">
      <Heading as="h1" className="title">
        <span>AI</span>11Y
      </Heading>
      <Heading as="h2">
        improve web accesibility with <span>AI</span>
      </Heading>
      <Flex gap="1rem" wrap="wrap">
        <Button {...btnSurface}>
          Semantic Html <DoubleArrowRightIcon />
        </Button>
        <Button {...btnSurface}>
          Color contrast <DoubleArrowRightIcon />
        </Button>
      </Flex>
    </Flex>
  );
}

export default Hompage;
