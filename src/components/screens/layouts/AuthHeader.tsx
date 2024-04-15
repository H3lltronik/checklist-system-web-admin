import { AuthUserPopover } from "@/components/core/AuthUserPopover";
import { Header } from "antd/es/layout/layout";
import { HeaderGoBackButton } from "./HeaderGoBackButton";

export const AuthHeader = () => {
  return (
    <>
      <Header className="p-0 h-[72px] flex items-center justify-between">
        <HeaderGoBackButton />

        <div className="mr-10">
          <AuthUserPopover />
        </div>
      </Header>
    </>
  );
};
