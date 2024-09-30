// ChecklistItemForm.tsx
import { ChecklistItem } from "@/@types/api/entities";
import { FileSizeSuffix } from "@/@types/common";
import { SizeSuffix, SizeSuffixWLabels } from "@/@types/sizes";
import { FormRefHandle } from "@/components/core/forms/common/FormList";
import { Form, Input, Select } from "antd";
import { forwardRef, useImperativeHandle } from "react";

const { Option } = Select;

type Props = {
  defaultValues?: Partial<ChecklistItemFormBody>;
};

export type ChecklistItemFormHandle = FormRefHandle<ChecklistItemFormBody>;

// @ts-expect-error props not used
const ChecklistItemForm = forwardRef<ChecklistItemFormHandle, Props>((props, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(
    ref,
    (): ChecklistItemFormHandle => ({
      getFormData: async () => {
        const values = await form.validateFields();

        return {
          ...values,
          maxFiles: values.maxFiles ? Number(values.maxFiles) : undefined,
          minFiles: values.minFiles ? Number(values.minFiles) : undefined,
          maxSize: values.maxSize ? Number(values.maxSize) : undefined,
        };
      },
      setFormData: (data) => {
        form.setFieldsValue(data);
      },
    }),
  );

  return (
    <>
      <Form form={form} initialValues={{ allowMultiple: false }}>
        <Form.Item<ChecklistItem> name="id" hidden>
          <Input />
        </Form.Item>

        <Form.Item<ChecklistItem> name="title" label="Titulo" rules={[{ required: true }]}>
          <Input placeholder="Ej. Comprobante de domicilio" />
        </Form.Item>

        <Form.Item<ChecklistItem> name="description" label="Descripcion" rules={[{ required: true }]}>
          <Input placeholder="Ej. Cargar comprobante de domicilio con no mas de 3 meses atras" />
        </Form.Item>

        <Form.Item<ChecklistItem> name="maxFiles" label="Cantidad maxima de archivos" tooltip="Indica la cantidad de archivos maxima permitida para resolver este requerimiento">
          <Input type="number" placeholder="3" />
        </Form.Item>

        <Form.Item<ChecklistItem> name="minFiles" label="Cantidad minima de archivos" tooltip="Indica la cantidad de archivos minima para resolver este requerimiento">
          <Input type="number" placeholder="3" />
        </Form.Item>

        <Form.Item label="Tamaño máximo de archivo">
          <Input.Group compact>
            <Form.Item name="maxSize" noStyle>
              <Input type="number" placeholder="1024" style={{ width: '60%' }} />
            </Form.Item>
            <Form.Item name="sizeSuffix" noStyle>
              <Select<FileSizeSuffix> defaultValue="bytes" style={{ width: '40%' }}>
                {Object.entries(SizeSuffixWLabels).map(([value, label]) => (
                  <Option key={value} value={value}>
                    {label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item<ChecklistItem> name="allowedMimeTypes" label="Tipos de archivo permitidos">
          <Select
            mode="multiple"
            allowClear
            placeholder="Ej. image/jpeg, image/png, application/pdf"
            style={{ width: "100%" }}
          >
            {commonMimeTypes.map((mimeType) => (
              <Option key={mimeType.value} value={mimeType.value}>
                {mimeType.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </>
  );
});

const commonMimeTypes = [
  { label: "Image (JPEG)", value: "image/jpeg" },
  { label: "Image (PNG)", value: "image/png" },
  { label: "PDF", value: "application/pdf" },
  { label: "Word Document", value: "application/msword" },
  { label: "Excel Spreadsheet", value: "application/vnd.ms-excel" },
  { label: "Text File", value: "text/plain" },
  { label: "MP4 Video", value: "video/mp4" },
  { label: "MP3 Audio", value: "audio/mpeg" },
  { label: "All Files", value: "*" },
  { label: "Comprimidos", value: "application/zip" },
];

export type ChecklistItemFormBody = {
  id?: string | number;
  title: string;
  description: string;
  allowMultiple: boolean;
  maxFiles?: number;
  maxSize: number;
  sizeSuffix?: SizeSuffix;
  allowedMimeTypes: string[];
};

export default ChecklistItemForm;
