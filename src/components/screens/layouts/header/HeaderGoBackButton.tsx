import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "@tanstack/react-router";
import { Button } from "antd";

export const HeaderGoBackButton = () => {
  const router = useRouter();

  const handleBackPress = () => {
    router.history.back();
  };

  return (
    <Button
      className="h-full rounded-none !w-[50px] md:!w-[100px] hover:!bg-transparent border-none group"
      onClick={handleBackPress}
      size="large"
      icon={<ArrowLeftOutlined className="group-hover:text-white duration-200 transition-colors" />}
    />
  );
};
