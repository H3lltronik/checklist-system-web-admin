import { checkTokenQueryOptions, logout } from "@/auth";
import { PoweroffOutlined, UserOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Avatar, Button, Popconfirm, Popover, Typography } from "antd";

export const AuthUserPopover = () => {
  const { data } = useQuery(checkTokenQueryOptions);

  return (
    <div className="flex items-center gap-5">
      <Typography.Text strong className="text-lg text-white" ellipsis={true}>
        Hola, {data?.user?.email}
      </Typography.Text>
      <Popover
        trigger={"click"}
        content={<PopoverContent name={data?.user?.email || ""} />}
        className="cursor-pointer"
      >
        <Avatar className="bg-green-300" shape="square" size={35}>
          <strong className="text-green-900">ME</strong>
        </Avatar>
      </Popover>
    </div>
  );
};

function PopoverContent({ name }: { name: string }) {
  const handleLogoutClick = () => {
    logout();
    window.location.reload();
  };

  return (
    <>
      <div className="w-min-[350px] bg-blue-200 p-5 flex gap-4">
        <Avatar className="bg-green-300 outline outline-green-900" shape="square" size={50}>
          <strong className="text-green-900">AD</strong>
        </Avatar>
        <div className="my-auto max-w-[200px]">
          <Typography.Text strong className="text-lg" ellipsis={true}>
            {name}
          </Typography.Text>
        </div>
      </div>
      <div className="flex px-3 pt-2 gap-2">
        <Link to="/admin/my-assignations">
          <Button block icon={<UserOutlined />}>
            Mis asignaciones
          </Button>
        </Link>
        <Popconfirm onConfirm={handleLogoutClick} title="¿Deseas cerrar la sesión?">
          <Button block icon={<PoweroffOutlined />}>
            Cerrar sesión
          </Button>
        </Popconfirm>
      </div>
    </>
  );
}
