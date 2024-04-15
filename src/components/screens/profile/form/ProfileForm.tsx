import { User } from "@/@types/api/entities";
import { FormRefHandle } from "@/components/core/forms/common/FormList";
import { Col, Form, Input, Row } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import { roleFormRules } from "./profile-form.schema";
import { ProfileFormPermissionList } from "./ProfileFormPermissionList";

type Props = {
  defaultValues?: Partial<RoleFormBody>;
  editMode?: boolean;
};

export type RoleFormHandle = FormRefHandle<RoleFormBody>;

export const RoleForm = forwardRef<RoleFormHandle, Props>((_props, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(
    ref,
    (): RoleFormHandle => ({
      getFormData: async () => {
        const values = await form.validateFields();

        return {
          ...values,
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

        <Row gutter={16} className="px-5 ">
          <Col span={6}>
            <Form.Item name="name" label="Nombre" rules={roleFormRules.name}>
              <Input placeholder="Nombre" />
            </Form.Item>
          </Col>

          <Col span={24} className="bg-slate-200 p-5">
            <h3 className="mb-5 text-2xl">Asignacion de Permisos</h3>
            <ProfileFormPermissionList name="permissions" />
          </Col>
        </Row>
      </Form>
    </div>
  );
});

export type RoleFormBody = {
  id?: number;
  name: string;
  permissions: { id?: number; actionId: number; subjectId: number }[];
};
