// FileChecklistForm.tsx
import { FormList, FormListHandle, FormRefHandle } from "@/components/core/forms/common/FormList";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { forwardRef, RefObject, useImperativeHandle } from "react";
import ChecklistItemForm, {
  ChecklistItemFormBody,
  ChecklistItemFormHandle,
} from "./ChecklistItemForm";

type Props = {
  defaultValues?: Partial<FileChecklistFormBody>;
};

export type FileChecklistFormHandle = FormRefHandle<FileChecklistFormBody>;

// @ts-expect-error props not used
export const FileChecklistForm = forwardRef<FileChecklistFormHandle, Props>((props, ref) => {
  const [form] = Form.useForm();
  const formListRef = React.useRef<FormListHandle<ChecklistItemFormBody>>(null);

  useImperativeHandle(
    ref,
    (): FileChecklistFormHandle => ({
      getFormData: async () => {
        const values = await form.validateFields();
        const formListData = await formListRef.current?.getAllFormsData();
        console.log("formListData", formListData);

        return {
          ...values,
          checklistItems: formListData,
        };
      },
      setFormData: (data) => {
        form.setFieldsValue(data);
        formListRef.current?.setFormsData(data.checklistItems || []);
      },
    }),
  );

  return (
    <div className="">
      <Form form={form}>
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="title" label="Titulo" rules={[{ required: true }]}>
          <Input placeholder="Titulo" />
        </Form.Item>

        <Form.Item name="description" label="Descripcion" rules={[{ required: true }]}>
          <TextArea placeholder="Descriptcion" />
        </Form.Item>
      </Form>
      <div className="flex flex-wrap gap-2 flex-row">
        <FormList
          addButtonText="Agregar archivo"
          itemClassName="bg-gray-100 p-3 border rounded-md max-w-[400px] hover:shadow-md transition duration-300 ease-in-out"
          containerClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          ref={formListRef}
          renderForm={(ref: RefObject<ChecklistItemFormHandle>) => <ChecklistItemForm ref={ref} />}
          itemTitle={(index) => `Archivo ${index + 1}`}
          min={1}
        />
      </div>
    </div>
  );
});

export type FileChecklistFormBody = {
  id?: string | number;
  title: string;
  description: string;
  checklistItems: ChecklistItemFormBody[];
};
