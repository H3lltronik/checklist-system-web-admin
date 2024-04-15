// EnterpriseForm.tsx
import { FormRefHandle } from "@/components/core/forms/common/FormList";
import { Col, Form, Input, Row, Typography } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import { enterpriseFormRules } from "./enterprise-form.schema";

type Props = {
  defaultValues?: Partial<EnterpriseFormBody>;
};

export type EnterpriseFormHandle = FormRefHandle<EnterpriseFormBody>;

// @ts-expect-error props not used
export const EnterpriseForm = forwardRef<EnterpriseFormHandle, Props>((props, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(
    ref,
    (): EnterpriseFormHandle => ({
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
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>

        <section className="mb-5">
          <Typography.Title level={4}>Datos basicos</Typography.Title>

          <Row gutter={16} className="px-5 bg-slate-200 bg-opacity-50">
            <Col span={12}>
              <Form.Item name="name" label="Nombre" rules={enterpriseFormRules.name}>
                <Input placeholder="Ej. CFE" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="phone" label="Telefono" rules={enterpriseFormRules.phone}>
                <Input placeholder="Ej. 5551234567" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                <Input placeholder="Ej. CFE123456789" />
              </Form.Item>
            </Col>
          </Row>
        </section>

        <section className="mb-5">
          <Typography.Title level={4}>Datos de identificacion del contribuinte</Typography.Title>

          <Row gutter={16} className="px-5 bg-slate-200 bg-opacity-50">
            <Col span={24}>
              <Form.Item name="rfc" label="RFC" rules={enterpriseFormRules.rfc}>
                <Input placeholder="Ej. CFE123456789" />
              </Form.Item>
            </Col>
          </Row>
        </section>

        <section className="">
          <Typography.Title level={4}>Datos del domicilio registrado</Typography.Title>

          <Row gutter={16} className="px-5 bg-slate-200 bg-opacity-50">
            <Col span={6}>
              <Form.Item
                name="postalCode"
                label="Codigo postal"
                rules={enterpriseFormRules.postalCode}
              >
                <Input placeholder="Ej. 12345" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="streetName"
                label="Nombre de vialidad"
                rules={enterpriseFormRules.streetName}
              >
                <Input placeholder="Ej. MAGISTERIO" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="interiorNumber"
                label="Numero interior"
                rules={enterpriseFormRules.interiorNumber}
              >
                <Input placeholder="Ej. 22" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="locationName"
                label="Nombre de la localidad"
                rules={enterpriseFormRules.locationName}
              >
                <Input placeholder="Ej. GUADALAJARA" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="state"
                label="Nombre de la entidad federativa"
                rules={enterpriseFormRules.state}
              >
                <Input placeholder="Ej. JALISCO" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="streetType"
                label="Tipo de vialidad"
                rules={enterpriseFormRules.streetType}
              >
                <Input placeholder="Ej. CALLE" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="exteriorNumber"
                label="Numero exterior"
                rules={enterpriseFormRules.exteriorNumber}
              >
                <Input placeholder="Ej. 1533" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="neighborhood"
                label="Nombre de la colonia"
                rules={enterpriseFormRules.neighborhood}
              >
                <Input placeholder="Ej. MIRAFLORES" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="municipality"
                label="Nombre del municipio o demarcacion territorial"
                rules={enterpriseFormRules.municipality}
              >
                <Input placeholder="Ej. GUADALAJARA" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="betweenStreets"
                label="Entre calle"
                rules={enterpriseFormRules.betweenStreets}
              >
                <Input placeholder="Ej. NUEVO LEON" />
              </Form.Item>
            </Col>
          </Row>
        </section>
      </Form>
    </div>
  );
});

export type EnterpriseFormBody = {
  id?: string | number;
  name: string;
  rfc: string;
  phone: string;
  email: string;
  postalCode: string;
  streetName: string;
  streetType: string;
  exteriorNumber: string;
  interiorNumber: string;
  neighborhood: string;
  locationName: string;
  municipality: string;
  state: string;
  betweenStreets: string;
};
