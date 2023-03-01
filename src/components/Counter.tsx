import { animate } from "framer-motion";
import React, { useEffect, useRef } from "react";

export default function Counter({ from, to }:any) {
  const ref = useRef<any>();

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        ref.current.textContent = value.toFixed(0);
      }
    });
    return () => controls.stop();
  }, [from, to]);

  return <p ref={ref} />;
}