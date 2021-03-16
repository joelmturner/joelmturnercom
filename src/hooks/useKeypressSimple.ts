import { useEffect } from "react";

export default function useKeypress(key: string, action, deps = []) {
  useEffect(() => {
    function onKeyup(e) {
      if (e.key === key) action();
    }
    window.addEventListener("keyup", onKeyup);
    return () => window.removeEventListener("keyup", onKeyup);
  }, deps);
}
