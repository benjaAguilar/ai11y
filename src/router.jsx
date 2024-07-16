import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import InputCode from "./components/inputPage/InputCode.jsx";
import OutputCode from "./components/outputPage/OutputPage.jsx";
import CodeBoxes from "./components/codeBoxes/CodeBoxes.jsx";
import Hompage from "./components/homepage/Hompage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Hompage />,
      },
      {
        path: "/semantic-html",
        element: <InputCode />,
      },
      {
        path: "/semantic-html/details",
        element: <OutputCode />,
      },
      {
        path: "/semantic-html/compare",
        element: <CodeBoxes />,
      },
    ],
  },
]);

export default router;
