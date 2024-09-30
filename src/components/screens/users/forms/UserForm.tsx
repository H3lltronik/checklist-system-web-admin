// UserForm.tsx
import { Role, User } from "@/@types/api/entities";
import { QueryKeys } from "@/@types/queries";
import { checkTokenQueryOptions } from "@/auth";
import { ApiSelect } from "@/components/core/forms/common/ApiSelect";
import { FormRefHandle } from "@/components/core/forms/common/FormList";
import { useQuery } from "@tanstack/react-query";
import { Col, Form, Input, Row, Switch } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import EnterpriseList from "./EnterpriseListSelector";
import { buildUserFormRules } from "./user-form.schema";

type Props = {
  defaultValues?: Partial<UserFormBody>;
  editMode?: boolean;
};

export type UserFormHandle = FormRefHandle<UserFormBody, UserFormReturns>;

export const UserForm = forwardRef<UserFormHandle, Props>((props, ref) => {
  const [form] = Form.useForm();
  const { data } = useQuery(checkTokenQueryOptions);

  const hasPassword = Form.useWatch(["credential", "hasPassword"], form);

  const userFormRules = buildUserFormRules({
    editMode: props.editMode || false,
    permissions: data?.user,
  });

  useImperativeHandle(
    ref,
    (): UserFormHandle => ({
      getFormData: async () => {
        const values = (await form.validateFields()) as UserFormReturns;

        return {
          ...values,
          enterprises: values?.enterprises?.map((item) => item.enterpriseId),
        };
      },
      setFormData: (data) => {
        form.setFieldsValue(data);
      },
    }),
  );

  return (
    <div className="">
      hasPassword: {hasPassword?.toString()}
      <Form form={form} layout="vertical" initialValues={{ credential: { hasPassword: true } }}>
        <Form.Item<User> name="id" hidden>
          <Input />
        </Form.Item>

        <Row gutter={16} className="px-5 gap-y-5">
          <Col span={24}>
            <Form.Item<UserFormReturns> name="name" label="Nombre" rules={userFormRules.name}>
              <Input placeholder="Nombre" />
            </Form.Item>
          </Col>

          <Col span={24} className="bg-slate-200 p-5">
            <h3 className="mb-5 text-2xl">Credenciales</h3>
            <Row>
              <Form.Item<UserFormReturns> name={["credential", "id"]} label="credentialId" hidden>
                <Input />
              </Form.Item>
              <Col span={6}>
                <Form.Item<UserFormReturns>
                  name={["credential", "email"]}
                  label="Email"
                  rules={userFormRules.username}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item<UserFormReturns>
                  name={["credential", "roleId"]}
                  label="Perfil"
                  rules={userFormRules.roleId}
                >
                  <ApiSelect<Role[], Role>
                    itemExtractor={(data) => data}
                    keyExtractor={(item) => item.id}
                    labelExtractor={(item) => item.name}
                    valueExtractor={(item) => item.id}
                    onChange={(value) => console.log(value)}
                    endpoints={{
                      simpleFindAll: {
                        endpoint: "/api/role",
                        queryKey: [QueryKeys.ROLE_LIST],
                        searchOptions: {
                          keys: ["name"],
                          threshold: 0.3
                        }
                      }
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item<UserFormReturns>
                  name={["credential", "hasPassword"]}
                  label="Habilitar contraseña"
                  tooltip="Al desactivar esta opcion, cada vez que este usuario inicie sesion, se le pedira acceso con OTP (One-Time-Password) por correo electronico"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>

            {
              hasPassword &&
              <>
                <Row>
                  <Col span={6}>
                    <Form.Item<UserFormReturns>
                      name={["credential", "mfaEnabled"]}
                      label="Requerir autenticación de dos factores"
                      tooltip="Requerir autenticación de dos factores para este usuario"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <Form.Item<UserFormReturns>
                      name={["credential", "password"]}
                      label="Contraseña"
                      rules={userFormRules.password}
                    >
                      <Input.Password placeholder="Contraseña" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item<UserFormReturns>
                      name={["credential", "repeatPassword"]}
                      label="Repetir contraseña"
                      rules={userFormRules.confirmPassword}
                    >
                      <Input.Password placeholder="Repite la contraseña" type="password" />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            }
          </Col>

          <Col span={24} className="bg-slate-200 p-5">
            <h3 className="mb-5 text-2xl">Asignacion de Empresas</h3>
            <EnterpriseList name="enterprises" formRef={form} />
          </Col>
        </Row>
      </Form>
    </div>
  );
});

export type UserFormBody = {
  id?: number;
  name: string;
  pictureUrl: string;
  enterprises: number[];
  credential: {
    email: string;
    password?: string;
    repeatPassword?: string;
    hasPassword: boolean;
    mfaEnabled: boolean;
    roleId: number;
  };
};

export type UserFormReturns = {
  id?: number;
  name: string;
  pictureUrl: string;
  enterprises: {
    enterpriseId: number;
  }[];
  credential: {
    id?: number;
    email: string;
    hasPassword: boolean;
    password?: string;
    repeatPassword?: string;
    mfaEnabled: boolean;
    roleId: number;
  };
};
