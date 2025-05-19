import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { useLayoutEffect } from "react";
import { useLocation } from "wouter";
import { useEffect } from "react";

function ScrollToTop() {
  const [location] = useLocation();
  
  // Reset scroll position when location changes
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

createRoot(document.getElementById("root")!).render(
  <>
    <ScrollToTop />
    <App />
  </>
);
