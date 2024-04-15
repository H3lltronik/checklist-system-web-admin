import { QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { AbsoluteCenteredLoader } from "./components/core/AbsoluteCenteredLoader";
import { queryClient } from "./components/core/queryClient";
import { AppLayout } from "./components/screens/layouts/AppLayout";
import { router } from "./main";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

const ReactQueryDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/react-query-devtools").then((res) => ({
          default: res.ReactQueryDevtools,
        })),
      );

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout />

      <AbsoluteCenteredLoader isLoading={router.state.isTransitioning} />

      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
      <Suspense>
        <ReactQueryDevtools />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
