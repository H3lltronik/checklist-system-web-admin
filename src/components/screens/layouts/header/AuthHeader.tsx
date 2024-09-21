import { AuthUserPopover } from "@/components/core/AuthUserPopover";
import { Header } from "antd/es/layout/layout";
import { HeaderGoBackButton } from "./HeaderGoBackButton";
import { OpenMenuButton } from "./OpenMenuButton";

export const AuthHeader = () => {
  return (
    <>
      <Header className="p-0 h-[72px] flex items-center justify-between">
        <div className="h-full">
          <HeaderGoBackButton />
            <OpenMenuButton />
        </div>

        <div className="mr-10">
          <AuthUserPopover />
        </div>
      </Header>
    </>
  );
};
