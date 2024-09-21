import { Action, createAbilityForUser, Subjects } from "@/abilities";
import Logo from '@/assets/logo_luve.svg';
import { checkTokenQueryOptions } from "@/auth";
import {
  CheckSquareOutlined,
  ContactsOutlined,
  KeyOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AnyAbility } from "@casl/ability";
import { Can } from "@casl/react";
import { useQuery } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { Button, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";

type SideMenuProps = {
  onCollapse: (collapsed: boolean) => void;
};

export const SideMenu = (props: SideMenuProps) => {
  const router = useRouter();
  const currentRoute = router.state.location.pathname;
  const [collapsed, setCollapsed] = useState(false);

  const { data } = useQuery(checkTokenQueryOptions);
  const ability = createAbilityForUser(data?.user);

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
    props.onCollapse(!collapsed);
  };

  useEffect(() => {
    if (currentRoute.startsWith("/admin/credentials")) {
      setOpenKeys(["credentials"]);
    } else {
      setOpenKeys([]);
    }
  }, [currentRoute]);

  return (
    <Sider
      collapsed={collapsed}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="logo bg-white px-2 py-2 h-[72px]">
        <img
          className="object-contain h-full w-full"
          src={Logo}
          alt=""
        />
      </div>
      <Button
        className="!w-full mb-5 rounded-none"
        onClick={handleToggleCollapse}
        icon={
          collapsed ? (
            <MenuUnfoldOutlined className="text-blue-400" />
          ) : (
            <MenuFoldOutlined className="text-blue-400" />
          )
        }
      />

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[currentRoute]}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
      >
        <Menu.ItemGroup
          key="g1"
          title={
            <>
              <SettingOutlined className="mr-2" /> Mi panel
            </>
          }
        >
          <Menu.Item key="/admin/my-assignations" icon={<LoginOutlined />}>
            <Link to="/admin/my-assignations">Mis asignaciones</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Can ability={ability as AnyAbility} I={Action.Manage} a={Subjects.All}>
          <Menu.ItemGroup
            key="g2"
            title={
              <>
                <SettingOutlined className="mr-2" /> Administración
              </>
            }
          >
            <Can ability={ability as AnyAbility} I={Action.Manage} a={Subjects.Assignations}>
              <Menu.Item
                className="!pl-[24px]"
                key="/admin/assignations"
                icon={<SolutionOutlined />}
              >
                <Link to="/admin/assignations">Asignación</Link>
              </Menu.Item>
            </Can>
            <Can ability={ability as AnyAbility} I={Action.Manage} a={Subjects.FileChecklist}>
              <Menu.Item
                className="!pl-[24px]"
                key="/admin/file-checklist"
                icon={<CheckSquareOutlined />}
              >
                <Link to="/admin/file-checklist">Requerimientos</Link>
              </Menu.Item>
            </Can>
            <Can ability={ability as AnyAbility} I={Action.Manage} a={Subjects.Enterprise}>
              <Menu.Item
                className="!pl-[24px]"
                key="/admin/enterprises"
                icon={<ContactsOutlined />}
              >
                <Link to="/admin/enterprises">Empresas</Link>
              </Menu.Item>
            </Can>
          </Menu.ItemGroup>
        </Can>
        <Can ability={ability as AnyAbility} I={Action.Manage} a={Subjects.All}>
          <Menu.ItemGroup
            key="s1"
            title={
              <>
                <TeamOutlined /> Security
              </>
            }
          >
            <Menu.SubMenu key="credentials" icon={<KeyOutlined />} title={"Credenciales"}>
              <Menu.Item key="/admin/credentials/users" icon={<UserOutlined />}>
                <Link to="/admin/credentials/users">Usuarios</Link>
              </Menu.Item>
              <Menu.Item key="/admin/credentials/profiles" icon={<SettingOutlined />}>
                {/* @ts-expect-error TODO: fix this */}
                <Link to="/admin/credentials/profiles">Perfiles</Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu.ItemGroup>
        </Can>
      </Menu>
    </Sider>
  );
};
