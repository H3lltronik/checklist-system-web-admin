import { ChallengeLoginResponse, checkTokenQueryOptions, hasPasswordRequest, useLoginMutation } from "@/auth";
import { Route } from "@/routes/login";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Button, Card } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { AbsoluteCenteredLoader } from "../core/AbsoluteCenteredLoader";
import LoginForm, { LoginFormHandle } from "../core/forms/login/LoginForm";
import MFAForm from "../core/forms/login/MFAForm";

const LoginScreen: React.FC = () => {
  const ref = React.useRef<LoginFormHandle>(null);
  const { data: checkTokenData } = useQuery(checkTokenQueryOptions);
  const { e: emailParam } = Route.useSearch()

  const { mutateAsync: doLogin, isPending } = useLoginMutation();

  const [email, setEmail] = useState("");
  const [isMFARequired, setIsMFARequired] = useState(false);
  const [challengeData, setChallengeData] = useState<ChallengeLoginResponse | null>(null);

  const navigate = useNavigate();

  const [hasPassword, setHasPassword] = useState(false);

  useEffect(() => {
    if (checkTokenData?.valid) navigate({ to: "/" });
  }, [checkTokenData, navigate]);

  const handleSubmit = useCallback(async () => {
    const data = await ref.current?.getValidatedData();
    if (!data) return;

    setEmail(data.username);

    try {
      const result = await doLogin({ email: data.username, password: data.password });

      if ('access_token' in result) {
        navigate({ to: "/" });
      } else if ('challenge' in result) {
        setIsMFARequired(true);
        setChallengeData(result);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  }, [ref, doLogin, navigate]);

  const handleContinue = useCallback(async () => {
    const data = await ref.current?.getValidatedData();
    if (!data) return;

    const { hasPassword: _hasPassword } = await hasPasswordRequest(data.username);
    console.log("Has password", _hasPassword);
    setHasPassword(_hasPassword);

    if (!_hasPassword)
      handleSubmit();
    else
      ref.current?.showPassword();
  }, [ref, handleSubmit, setHasPassword]);

  useEffect(() => {
    if (!emailParam) return;
    ref.current?.setEmail(atob(emailParam as string));
    handleContinue();
  }, [emailParam, ref, handleContinue]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      {
        isMFARequired && challengeData ? (
          <MFAForm
            challengeData={{
              challenge: challengeData.challenge,
              destination: challengeData.destination,
              session: challengeData.session,
              email,
            }}
          />
        ) :
          <Card className="w-96" bordered={false} style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
            <LoginForm onSubmit={handleSubmit} ref={ref} />

            <AbsoluteCenteredLoader isLoading={isPending} />

            <div className="flex flex-col justify-center gap-5 mt-10">
              {
                !hasPassword ? (
                  <Button type="primary" className="w-full" onClick={handleContinue}>
                    Continuar
                  </Button>
                ) : (
                  <Button type="primary" className="w-full" onClick={handleSubmit}>
                    Iniciar sesión
                  </Button>
                )
              }
              <Button type="link" className="text-blue-500">
                ¿Olvidaste tu contraseña?
              </Button>
            </div>
          </Card>
      }
    </div>
  );
};

export default LoginScreen;
