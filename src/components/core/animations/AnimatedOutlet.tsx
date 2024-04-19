import { getRouterContext, Outlet } from "@tanstack/react-router";
import { motion, useIsPresent } from "framer-motion";
import deepClone from "lodash.clonedeep";
import { forwardRef, useContext, useRef } from "react";
import { FadeInAndScale } from "./FadeInAndScale";

export const AnimatedOutlet = forwardRef<HTMLDivElement>((_, ref) => {
  const RouterContext = getRouterContext();

  const routerContext = useContext(RouterContext);

  const renderedContext = useRef(routerContext);

  const isPresent = useIsPresent();

  if (isPresent) {
    renderedContext.current = deepClone(routerContext);
  }

  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <FadeInAndScale>
        <RouterContext.Provider value={renderedContext.current}>
          <Outlet />
        </RouterContext.Provider>
      </FadeInAndScale>
    </motion.div>
  );
});
