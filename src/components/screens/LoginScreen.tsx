import { checkTokenQueryOptions, useLoginMutation } from "@/auth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Button, Card } from "antd";
import React, { useEffect } from "react";
import { AbsoluteCenteredLoader } from "../core/AbsoluteCenteredLoader";
import LoginForm, { LoginFormHandle } from "../core/forms/login/LoginForm";

const LoginScreen: React.FC = () => {
  const ref = React.useRef<LoginFormHandle>(null);
  const { data: checkTokenData } = useQuery(checkTokenQueryOptions);
  const { mutateAsync: doLogin, isPending } = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (checkTokenData?.valid) navigate({ to: "/" });
  }, [checkTokenData, navigate]);

  const handleSubmit = async () => {
    const data = await ref.current?.getValidatedData();
    if (!data) return;

    const result = await doLogin({ email: data.username, password: data.password });

    if (result?.access_token) navigate({ to: "/" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <Card className="w-96" bordered={false} style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <LoginForm onSubmit={handleSubmit} ref={ref} />

        <AbsoluteCenteredLoader isLoading={isPending} />

        <div className="flex flex-col justify-center gap-5 mt-10">
          <Button type="primary" className="w-full" onClick={handleSubmit}>
            Iniciar sesión
          </Button>
          <Button type="link" className="text-blue-500">
            ¿Olvidaste tu contraseña?
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginScreen;
