// ChecklistItemForm.tsx
import { FileSizeSuffix } from "@/@types/common";
import { FormRefHandle } from "@/components/core/forms/common/FormList";
import { Form, Input, Select } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";

const { Option } = Select;

type Props = {
  defaultValues?: Partial<ChecklistItemFormBody>;
};

export type ChecklistItemFormHandle = FormRefHandle<ChecklistItemFormBody>;

// @ts-expect-error props not used
const ChecklistItemForm = forwardRef<ChecklistItemFormHandle, Props>((props, ref) => {
  const [form] = Form.useForm();
  const [fileSizeSuffix, setFileSizeSuffix] = useState<FileSizeSuffix>("bytes");

  useImperativeHandle(
    ref,
    (): ChecklistItemFormHandle => ({
      getFormData: async () => {
        const values = await form.validateFields();
        const factor: Record<FileSizeSuffix, number> = {
          bytes: 1,
          KB: 1024,
          MB: 1024 ** 2,
          GB: 1024 ** 3,
        };
        const fileSizeBytes = values.maxSizeInBytes
          ? Number(values.maxSizeInBytes) * factor[fileSizeSuffix]
          : undefined;

        return {
          ...values,
          maxFiles: values.maxFiles ? Number(values.maxFiles) : undefined,
          maxSizeInBytes: fileSizeBytes,
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
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input placeholder="Description" />
        </Form.Item>

        <Form.Item name="maxFiles" label="Maximum Files">
          <Input type="number" placeholder="Maximum number of files" />
        </Form.Item>

        <Form.Item name="maxSizeInBytes" label="Maximum Size in Bytes">
          <Input
            type="number"
            placeholder="Maximum file size in bytes"
            addonAfter={<SuffixSelector onChange={setFileSizeSuffix} />}
          />
        </Form.Item>

        <Form.Item name="allowedMimeTypes" label="Allowed MIME Types">
          <Select
            mode="multiple"
            allowClear
            placeholder="Select allowed MIME types"
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

type SuffixSelectorProps = {
  onChange?: (value: FileSizeSuffix) => void;
};
const SuffixSelector = (props: SuffixSelectorProps) => (
  <Select<FileSizeSuffix>
    defaultValue="bytes"
    className="w-[80px]"
    onChange={props.onChange}
    disabled
  >
    <Select.Option value="bytes">B</Select.Option>
    <Select.Option value="KB">KB</Select.Option>
    <Select.Option value="MB">MB</Select.Option>
    <Select.Option value="GB">GB</Select.Option>
  </Select>
);

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
  maxFiles: number | null;
  maxSizeInBytes: number;
  allowedMimeTypes: string[];
};

export default ChecklistItemForm;
