import { AnyRoute, RegisteredRouter, RoutePaths, ToPathOption } from "@tanstack/react-router";

export type SystemRoutes<
  TRouteTree extends AnyRoute = RegisteredRouter["routeTree"],
  TFrom extends RoutePaths<TRouteTree> | string = string,
  TTo extends string = "",
> = ToPathOption<TRouteTree, TFrom, TTo>;
