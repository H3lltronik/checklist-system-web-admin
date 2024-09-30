import { createFileRoute } from "@tanstack/react-router";
import LoginScreen from "../components/screens/LoginScreen";

type LoginParams = {
  e?: string;
}

export const Route = createFileRoute("/login")({
  component: LoginScreen,
  validateSearch: (search: Record<string, unknown>): LoginParams => {
    return {
      e: search.e as LoginParams["e"],
    }
  }
});
