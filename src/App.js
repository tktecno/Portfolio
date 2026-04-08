import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from "./component/Portfolio.jsx";

const WorldEduhubPreview = lazy(() =>
  import("./component/project/WorldEduhubPreview.jsx")
);
const Success = lazy(() => import("./component/Success.jsx"));

const THEME_STORAGE_KEY = "tapashroy-theme";

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
    document.documentElement.dataset.theme = theme;
    document.body.style.backgroundColor =
      theme === "dark" ? "#05131a" : "#f6f0e7";
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  }

  return (
    <Router>
      <Suspense fallback={null}>
        <Routes>
          <Route
            path="/"
            element={<Portfolio theme={theme} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/world-eduhub"
            element={
              <WorldEduhubPreview theme={theme} toggleTheme={toggleTheme} />
            }
          />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
