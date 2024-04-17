// UserForm.tsx
import { Role, User } from "@/@types/api/entities";
import { ApiSelect } from "@/components/core/forms/common/ApiSelect";
import { FormRefHandle } from "@/components/core/forms/common/FormList";
import { Col, Form, Input, Row } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import { ROLE_LIST_QUERY_KEY } from "../../profile/data/role/queries";
import EnterpriseList from "./EnterpriseListSelector";
import { buildUserFormRules } from "./user-form.schema";

type Props = {
  defaultValues?: Partial<UserFormBody>;
  editMode?: boolean;
};

export type UserFormHandle = FormRefHandle<UserFormBody, UserFormReturns>;

export const UserForm = forwardRef<UserFormHandle, Props>((props, ref) => {
  const [form] = Form.useForm();
  const userFormRules = buildUserFormRules(props.editMode || false);

  useImperativeHandle(
    ref,
    (): UserFormHandle => ({
      getFormData: async () => {
        const values = (await form.validateFields()) as UserFormReturns;

        return {
          ...values,
          enterprises: values.enterprises.map((item) => item.enterpriseId),
        };
      },
      setFormData: (data) => {
        form.setFieldsValue(data);
      },
    }),
  );

  return (
    <div className="">
      <Form form={form} layout="vertical">
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
              <Col span={6}>
                <Form.Item<UserFormReturns>
                  name={["credential", "roleId"]}
                  label="Perfil"
                  rules={userFormRules.roleId}
                >
                  <ApiSelect<Role[], Role>
                    queryKey={[ROLE_LIST_QUERY_KEY]}
                    endpoint="http://localhost:3002/role"
                    itemExtractor={(data) => data}
                    keyExtractor={(item) => item.id}
                    labelExtractor={(item) => item.name}
                    valueExtractor={(item) => item.id}
                    onChange={(value) => console.log(value)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col span={24} className="bg-slate-200 p-5">
            <h3 className="mb-5 text-2xl">Asignacion de Empresas</h3>
            <EnterpriseList name="enterprises" />
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
    password: string;
    repeatPassword: string;
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
    password: string;
    repeatPassword: string;
    roleId: number;
  };
};
