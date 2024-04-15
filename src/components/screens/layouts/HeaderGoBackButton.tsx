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
      className="h-full rounded-none !w-[100px] border-l-0 border-t-0 border-b-0 hover:!bg-transparent hover:border-r !border-white group"
      onClick={handleBackPress}
      size="large"
      icon={<ArrowLeftOutlined className="group-hover:text-white duration-200 transition-colors" />}
    />
  );
};
