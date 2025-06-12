import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function useRouteChange(onRouteLeave, watchedPath) {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const prev = prevPathRef.current;
    const current = location.pathname;

    if (prev === watchedPath && current !== watchedPath) {
      onRouteLeave(prev, current);
    }

    prevPathRef.current = current;
  }, [location.pathname, onRouteLeave, watchedPath]);
}
