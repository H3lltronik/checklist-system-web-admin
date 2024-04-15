import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import { loginFormRules } from "./login-form.schema";

type LoginData = { username: string; password: string } | null;

export type LoginFormHandle = {
  getValidatedData: () => Promise<LoginData>;
};

export type Props = {
  onSubmit?: (data: LoginData) => void;
};

const LoginForm = forwardRef<LoginFormHandle, Props>((props, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    async getValidatedData() {
      try {
        const validatedData = await form.validateFields();
        return validatedData;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  }));

  const keyDownEnterSubmit = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      form.submit();
    }
  };

  return (
    <Form
      form={form}
      name="loginForm"
      initialValues={{ remember: true }}
      autoComplete="off"
      onKeyDown={keyDownEnterSubmit}
      onFinish={props.onSubmit}
    >
      <Form.Item name="username" rules={loginFormRules.username}>
        <Input
          prefix={<MailOutlined className="text-blue-500" />}
          placeholder="Correo electrónico"
        />
      </Form.Item>

      <Form.Item name="password" rules={loginFormRules.password}>
        <Input.Password
          prefix={<LockOutlined className="text-blue-500" />}
          type="password"
          placeholder="Contraseña"
        />
      </Form.Item>
    </Form>
  );
});

export default LoginForm;
