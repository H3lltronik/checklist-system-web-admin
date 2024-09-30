// ExtraChecklistItemForm.tsx
import type { FileChecklist } from "@/@types/api/entities";
import { QueryKeys } from "@/@types/queries";
import { SizeSuffix } from "@/@types/sizes";
import { ApiSelect } from "@/components/core/forms/common/ApiSelect";
import { FormRefHandle } from "@/components/core/forms/common/FormList";
import { Form, Input, Switch } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import ChecklistItemForm, {
  ChecklistItemFormBody,
  ChecklistItemFormHandle,
} from "./ChecklistItemForm";

type Props = {
  defaultValues?: Partial<ExtraChecklistItemFormBody>;
  fileChecklistId?: number;
};

export type MergedExtraChecklistItemFormBody = ExtraChecklistItemFormBody & ChecklistItemFormBody;

export type ExtraChecklistItemFormHandle = FormRefHandle<MergedExtraChecklistItemFormBody>;

const ExtraChecklistItemForm = forwardRef<ExtraChecklistItemFormHandle, Props>((props, ref) => {
  const [form] = Form.useForm<ExtraChecklistItemFormBody>();
  const checkListFormRef = useRef<ChecklistItemFormHandle>(null);

  const [override, setOverride] = React.useState(false);

  useImperativeHandle(
    ref,
    (): ExtraChecklistItemFormHandle => ({
      getFormData: async () => {
        const values = await form.validateFields();
        const checklist = await checkListFormRef.current?.getFormData();

        return {
          id: values.id,
          overrideChecklistItemId: values.overrideChecklistItemId,
          title: checklist?.title ?? "",
          description: checklist?.description ?? "",
          allowMultiple: checklist?.allowMultiple ?? false,
          maxFiles: checklist?.maxFiles,
          maxSize: checklist?.maxSize ?? 0,
          sizeSuffix: checklist?.sizeSuffix ?? SizeSuffix.BYTES,
          allowedMimeTypes: checklist?.allowedMimeTypes ?? [],
        };
      },
      setFormData: (data) => {
        setOverride(data.overrideChecklistItemId ? true : false);
        setTimeout(() => {
          form.setFieldsValue({
            allowMultiple: data.allowMultiple,
            id: data.id,
            overrideChecklistItemId: data.overrideChecklistItemId,
          });
        }, 100);
        checkListFormRef.current?.setFormData(data);
      },
    }),
  );

  useEffect(
    () => form.setFieldsValue({ overrideChecklistItemId: undefined }),
    [form, props.fileChecklistId],
  );

  return (
    <>
      <Form form={form} initialValues={{ allowMultiple: false }}>
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <div className="mb-4 flex items-center gap-2">
          <label>Sobreescritura: </label>
          <Switch checked={override} onChange={setOverride} />
        </div>

        {override && (
          <>
            <Form.Item<MergedExtraChecklistItemFormBody>
              name="overrideChecklistItemId"
              label="Archivo"
              rules={[{ required: true }]}
              tooltip="Al seleccionar un checklist, podra sobreescribir alguno de los archivos"
            >
              <ApiSelect<FileChecklist[], FileChecklist>
                disabled={!props.fileChecklistId}
                itemExtractor={(data) => data}
                keyExtractor={(item) => item.id}
                labelExtractor={(item) => item.title}
                valueExtractor={(item) => item.id}
                endpoints={{
                  simpleFindAll: {
                    queryKey: [QueryKeys.FILE_CHECKLIST_LIST, "assignationId", String(props.fileChecklistId)],
                    endpoint: `/api/checklist-item/by-file-checklist/${props.fileChecklistId}`,
                    searchOptions: {
                      keys: ["title"],
                      threshold: 0.3,
                    }
                  },
                }}
              />
            </Form.Item>
          </>
        )}
        <ChecklistItemForm ref={checkListFormRef} />
      </Form>
    </>
  );
});

export type ExtraChecklistItemFormBody = {
  id?: string | number;
  overrideChecklistItemId?: string | number;
  allowMultiple: boolean;
};

export default ExtraChecklistItemForm;
