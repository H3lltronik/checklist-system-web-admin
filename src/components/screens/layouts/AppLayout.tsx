import { checkTokenQueryOptions } from "@/auth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { AuthLayout } from "./AuthLayout";
import { NoAuthLayout } from "./NoAuthLayout";

export const AppLayout = () => {
  const state = useRouterState();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useQuery(checkTokenQueryOptions);
  
  useEffect(() => {
    refetch();
  }, [refetch, state.location.pathname]); 

  useEffect(() => {
    console.log("[AppLayout] data", data);
    if (!isLoading && (data?.valid === false || data?.valid === undefined)) {
      navigate({ to: "/login" });
    }
  }, [data, isLoading, navigate]);

  if (isLoading) return <>Loading...</>;

  return <>{data?.valid ? <AuthLayout /> : <NoAuthLayout />}</>;
};
