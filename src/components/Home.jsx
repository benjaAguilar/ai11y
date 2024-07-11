import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <header>
        <h1>
          <span>Ai</span>11y
        </h1>
        <p>Improve web accessibility with AI</p>
      </header>
      <main>
        <section>
          <button>Improve HTML</button>
          <button>Compare</button>
        </section>
        <section>
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default Home;
