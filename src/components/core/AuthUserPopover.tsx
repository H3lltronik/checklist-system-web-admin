import { checkTokenQueryOptions, logout } from "@/auth";
import { PoweroffOutlined, UserOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Avatar, Button, Popconfirm, Popover, Typography } from "antd";
import { buildUserProfileByEmailQueryOptions } from "../screens/users/data/queries";

const nameInitials = (name: string) => {
  try {
    const [firstName, lastName] = name.split(" ");
    return `${firstName[0]}${lastName[0]}`;
  } catch (error) {
    console.error("Error generating initials:", error);
    return "N/A";
  }
};

export const AuthUserPopover = () => {
  const { data: tokenData } = useQuery(checkTokenQueryOptions);
  const { data: profileData } = useQuery(
    buildUserProfileByEmailQueryOptions(tokenData?.user?.email),
  );

  return (
    <div className="flex items-center gap-5">
      <Typography.Text strong className="text-lg text-white" ellipsis={true}>
        Hola, {profileData?.name}
      </Typography.Text>
      <Popover
        trigger={"click"}
        content={<PopoverContent name={profileData?.name || ""} avatar={profileData?.pictureUrl} />}
        className="cursor-pointer"
      >
        &#x200B;
        <UserAvatar name={profileData?.name || ""} picture={profileData?.pictureUrl} size={40} />
      </Popover>
    </div>
  );
};

function PopoverContent({ name, avatar }: { name: string; avatar: string | undefined }) {
  const handleLogoutClick = () => {
    logout();
    window.location.reload();
  };

  return (
    <>
      <div className="w-min-[350px] bg-blue-200 p-5 flex gap-4">
        <UserAvatar name={name} picture={avatar} />
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

type UserAvatarProps = {
  name: string;
  picture: string | undefined;
  size?: number;
};
const UserAvatar = (props: UserAvatarProps) => {
  const { name, picture, size } = props;

  return (
    <>
      <Avatar
        className="bg-green-300 outline outline-green-900"
        shape="square"
        size={size ?? 50}
        src={picture}
        icon={!picture ? <UserOutlined className="text-green-900" /> : undefined}
      >
        {!picture && <strong className="text-green-900">{nameInitials(name)}</strong>}
      </Avatar>
    </>
  );
};
