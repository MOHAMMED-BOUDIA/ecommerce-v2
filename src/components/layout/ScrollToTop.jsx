import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * Ensures that every route change resets the scroll position to the top of the viewport.
 * Also handles initial page load and manual reloads.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset scroll to top instantly on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    // Fallback for some browsers or slow rendering frames
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
