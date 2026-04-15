import { useInView } from "framer-motion";
import { useRef } from "react";

export function useFadeIn(delay: number = 0) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
        delay,
      },
    },
  };

  return { ref, variants, initial: "hidden", animate: isInView ? "visible" : "hidden" };
}
