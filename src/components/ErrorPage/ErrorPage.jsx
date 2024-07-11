import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <h1>Whoops! 404 page not found</h1>
      <p>seems that path does not exist</p>
      <Link to={"/"}>Go back to home</Link>
    </div>
  );
}

export default ErrorPage;
