import { Outlet } from "@tanstack/react-router";

export const NoAuthLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
