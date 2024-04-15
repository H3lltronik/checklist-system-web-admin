import dashboardImage from "@/assets/dashboard.svg";
import { createFileRoute } from "@tanstack/react-router";
import { Typography } from "antd";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: async () => {
    // throw redirect({
    //   to: "/login",
    //   search: { from: location.href },
    // });
  },
});

function Index() {
  return (
    <main className="">
      <div className="flex items-center justify-center flex-col">
        <Typography.Title level={1}>{`Bienvenido al sistema`}</Typography.Title>
        <div className="m-auto">
          <img className="max-h-[80vh]" src={dashboardImage} alt="" />
        </div>
      </div>
    </main>
  );
}
