import { Suspense, useState, useEffect } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import Home from "./components/home";

function App() {
  const [tempoRoutes, setTempoRoutes] = useState<React.ReactElement | null>(
    null,
  );

  useEffect(() => {
    if (import.meta.env.VITE_TEMPO === "true") {
      // @ts-ignore - This import is handled by the tempo plugin in development
      import("tempo-routes")
        .then((module) => {
          const { default: routes } = module;
          setTempoRoutes(useRoutes(routes));
        })
        .catch((err) => console.error("Failed to load tempo routes:", err));
    }
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {tempoRoutes}
      </>
    </Suspense>
  );
}

export default App;
