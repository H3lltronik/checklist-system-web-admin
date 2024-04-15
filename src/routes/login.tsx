import { createFileRoute } from "@tanstack/react-router";
import LoginScreen from "../components/screens/LoginScreen";

export const Route = createFileRoute("/login")({
  component: LoginScreen,
});
