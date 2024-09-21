import { MenuFoldOutlined } from "@ant-design/icons";
import { useRouter } from "@tanstack/react-router";
import { Button } from "antd";

export const OpenMenuButton = () => {
  const router = useRouter();

  const handleBackPress = () => {
    router.history.back();
  };

  return (
    <Button
      className="h-full md:!hidden rounded-none !w-[50px] md:!w-[100px] hover:!bg-transparent border-none group"
      onClick={handleBackPress}
      size="large"
      icon={<MenuFoldOutlined className="group-hover:text-white duration-200 transition-colors" />}
    />
  );
};
