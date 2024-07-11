import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import InputCode from "./components/inputPage/InputCode.jsx";
import OutputCode from "./components/outputPage/OutputPage.jsx";
import CodeBoxes from "./components/codeBoxes/CodeBoxes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <InputCode />,
      },
      {
        path: "/details",
        element: <OutputCode />,
      },
      {
        path: "/compare",
        element: <CodeBoxes />,
      },
    ],
  },
]);

export default router;
