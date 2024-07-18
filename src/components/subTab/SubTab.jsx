import { Flex, TabNav, Button } from "@radix-ui/themes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { btnSurfaceS } from "../../styleProps";

function SubTab() {
  const nav = useNavigate();
  const location = useLocation();
  let details = false;
  let comparison = false;

  switch (location.pathname) {
    case "/semantic-html/details":
      details = true;
      break;
    case "/semantic-html/compare":
      comparison = true;
      break;
    default:
      details = true;
      break;
  }

  return (
    <Flex gap="1rem" align="center">
      <TabNav.Root>
        <TabNav.Link active={details}>
          <Link to={"/semantic-html/details"} className="link">
            Details
          </Link>
        </TabNav.Link>
        <TabNav.Link active={comparison}>
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
  );
}

export default SubTab;
