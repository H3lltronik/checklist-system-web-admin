// AssignationForm.tsx
import { Assignation, Enterprise, FileChecklist, Period } from "@/@types/api/entities";
import { ApiSelect } from "@/components/core/forms/common/ApiSelect";
import { FormRefHandle } from "@/components/core/forms/common/FormList";
import { Col, Form, Input, Row } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import { FILE_CHECKLIST_LIST_QUERY_KEY } from "../../checklist/checklist-queries";
import { ENTERPRISE_LIST_QUERY_KEY } from "../../enterprise/queries";

type Props = {
  defaultValues?: Partial<AssignationFormBody>;
};

export type AssignationFormHandle = FormRefHandle<AssignationFormBody>;

// @ts-expect-error props not used
export const AssignationForm = forwardRef<AssignationFormHandle, Props>((props, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(
    ref,
    (): AssignationFormHandle => ({
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
        <Form.Item<Assignation> name="id" hidden>
          <Input />
        </Form.Item>

        <Row gutter={16} className="px-5 ">
          <Col span={6}>
            <Form.Item<Assignation> name="name" label="Nombre" rules={[{ required: true }]}>
              <Input placeholder="Ej. CFE" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item<Assignation>
              name="enterpriseId"
              label="Empresa"
              rules={[{ required: true }]}
            >
              <ApiSelect<Enterprise[], Enterprise>
                queryKey={[ENTERPRISE_LIST_QUERY_KEY]}
                endpoint="/api/enterprise"
                itemExtractor={(data) => data}
                keyExtractor={(item) => item.id}
                labelExtractor={(item) => item.name}
                valueExtractor={(item) => item.id}
                onChange={(value) => console.log(value)}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item<Assignation> name="periodId" label="Periodo" rules={[{ required: true }]}>
              <ApiSelect<Period[], Period>
                queryKey={["periods"]}
                endpoint="/api/period"
                itemExtractor={(data) => data}
                keyExtractor={(item) => item.id}
                labelExtractor={(item) => item.name}
                valueExtractor={(item) => item.id}
                onChange={(value) => console.log(value)}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<Assignation>
              name="fileChecklistId"
              label="Checklist"
              rules={[{ required: true }]}
            >
              <ApiSelect<FileChecklist[], FileChecklist>
                queryKey={[FILE_CHECKLIST_LIST_QUERY_KEY]}
                endpoint="/api/file-checklist"
                itemExtractor={(data) => data}
                keyExtractor={(item) => item.id}
                labelExtractor={(item) => item.title}
                valueExtractor={(item) => item.id}
                onChange={(value) => console.log(value)}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item<Assignation>
              name="description"
              label="Descripción"
              rules={[{ required: true }]}
            >
              <Input placeholder="Ej. Asignación" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
});

export type AssignationFormBody = {
  id?: string | number;
  name: string;
  description: string;
  periodId: number;
  period: Period;
  enterpriseId: number;
  enterprise: Enterprise;
  fileChecklistId: number;
  fileChecklist: FileChecklist;
};
