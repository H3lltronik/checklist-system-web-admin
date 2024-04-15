import { Outlet } from "@tanstack/react-router";
import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { motion } from "framer-motion";
import { useState } from "react";
import { AuthHeader } from "./AuthHeader";
import { SideMenu } from "./sidemenu/SideMenu";

const pageTransition = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

export const AuthLayout = () => {
  const [marginLeft, setMarginLeft] = useState(200);

  const handleCollapse = (collapsed: boolean) => {
    if (collapsed) {
      setMarginLeft(80);
    } else {
      setMarginLeft(200);
    }
  };

  return (
    <Layout hasSider>
      <SideMenu onCollapse={handleCollapse} />
      <Layout
        className="transition-all duration-200"
        style={{ marginLeft: marginLeft }}
        color="red"
      >
        <AuthHeader />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition}>
            <Outlet />
          </motion.div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Created by{" "}
          <a
            className="text-blue-500 underline"
            href="https://h3lltronik-portfolio-v1.vercel.app/"
            target="_blank"
          >
            H3lltronik
          </a>{" "}
          ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
