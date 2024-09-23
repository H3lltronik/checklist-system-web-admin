import { QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import es_ES from "antd/es/locale/es_ES";
import React, { Suspense } from "react";
import { queryClient } from "./components/core/queryClient";
import { AppLayout } from "./components/screens/layouts/AppLayout";

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
    <ConfigProvider locale={es_ES}>
      <QueryClientProvider client={queryClient}>
        <AppLayout />

        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
        <Suspense>
          <ReactQueryDevtools />
        </Suspense>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
