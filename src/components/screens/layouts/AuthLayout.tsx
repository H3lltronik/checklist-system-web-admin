import { AnimatedOutlet } from "@/components/core/animations/AnimatedOutlet";
import { useMatch, useMatches } from "@tanstack/react-router";
import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { AuthHeader } from "./header/AuthHeader";
import { SideMenu } from "./sidemenu/SideMenu";

export const AuthLayout = () => {
  const matches = useMatches();
  const match = useMatch({ strict: false });
  const nextMatchIndex = matches.findIndex((d) => d.id === match.id) + 1;
  const nextMatch = matches[nextMatchIndex];
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
          <AnimatePresence mode="popLayout">
            <AnimatedOutlet key={nextMatch.id} />
          </AnimatePresence>
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
