import { Link } from "react-router-dom";
import { Theme, Card, Flex, Heading } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

function ErrorPage() {
  return (
    <Theme
      appearance="dark"
      panelBackground="translucent"
      accentColor="iris"
      radius="large"
      scaling="100%"
    >
      <Flex justify="center" align="center" className="errorPage">
        <Card>
          <Flex direction="column" align="center" justify="center" gap="3rem">
            <Heading as="h1" size="8">
              Whoops! <span>404</span> page not found
            </Heading>
            <Heading as="h2" size="5">
              Seems that this path does not exist
            </Heading>
            <Link to={"/"}>Go back to home</Link>
          </Flex>
        </Card>
      </Flex>
    </Theme>
  );
}

export default ErrorPage;
