import { Card, Flex, IconButton } from "@radix-ui/themes";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useRef } from "react";
import { Link } from "react-router-dom";

function MenuBtn() {
  const menuRef = useRef(null);

  function toggleMenuOpen() {
    if (!menuRef.current) return;

    if (menuRef.current.style.display === "block") {
      menuRef.current.style.display = "none";
    } else {
      menuRef.current.style.display = "block";
    }
  }

  return (
    <>
      <IconButton
        variant="ghost"
        className="H-menu icon"
        onClick={toggleMenuOpen}
      >
        <HamburgerMenuIcon />
      </IconButton>
      <Card className="menu" ref={menuRef}>
        <Flex direction="column">
          <Link to="/" className="menuLinks" onClick={toggleMenuOpen}>
            Home
          </Link>
          <Link
            to="/semantic-html"
            className="menuLinks"
            onClick={toggleMenuOpen}
          >
            Semantic HTML
          </Link>
          <Link
            to="/color-contrast"
            className="menuLinks"
            onClick={toggleMenuOpen}
          >
            Color Contrast
          </Link>
          <a
            href="https://github.com/benjaAguilar"
            className="menuLinks"
            onClick={toggleMenuOpen}
            target="_blank"
          >
            GitHub
          </a>
          <a
            href="https://www.instagram.com/benja_aguilarv/"
            className="menuLinks"
            onClick={toggleMenuOpen}
            target="_blank"
          >
            Instagram
          </a>
        </Flex>
      </Card>
    </>
  );
}

export default MenuBtn;
