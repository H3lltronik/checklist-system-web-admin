// AssignationForm.tsx
import { GetChecklistListResponse } from "@/@types/api/checklist";
import { GetEnterpriseListResponse } from "@/@types/api/enterprise";
import { Assignation, Enterprise, FileChecklist, Period } from "@/@types/api/entities";
import { QueryKeys } from "@/@types/queries";
import { ApiSelect } from "@/components/core/forms/common/ApiSelect";
import { FormList, FormListHandle, FormRefHandle } from "@/components/core/forms/common/FormList";
import { Col, Form, Input, Row } from "antd";
import { forwardRef, RefObject, useImperativeHandle, useRef } from "react";
import ExtraChecklistItemForm, {
  ExtraChecklistItemFormHandle,
  MergedExtraChecklistItemFormBody,
} from "../../checklist/forms/ExtraChecklistItemForm";

type Props = {
  defaultValues?: Partial<AssignationFormBody>;
};

export type AssignationFormHandle = FormRefHandle<AssignationFormBody>;

export const AssignationForm = forwardRef<AssignationFormHandle, Props>((_props, ref) => {
  const [form] = Form.useForm();
  const formListRef = useRef<FormListHandle<MergedExtraChecklistItemFormBody>>(null);

  const checklistIdWatch = Form.useWatch("fileChecklistId", form);
  const enterpriseIdWatch = Form.useWatch("enterpriseId", form);

  useImperativeHandle(
    ref,
    (): AssignationFormHandle => ({
      getFormData: async () => {
        const values = await form.validateFields();
        const extraItems = await formListRef.current?.getAllFormsData();

        return {
          ...values,
          extraChecklistItems: extraItems,
        };
      },
      setFormData: (data) => {
        form.setFieldsValue(data);
        formListRef.current?.setFormsData(data.extraChecklistItems || []);
      },
    }),
  );

  return (
    <div className="">
      <Form form={form} layout="horizontal">
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
              <ApiSelect<GetEnterpriseListResponse, Enterprise>
                itemExtractor={(data) => data.data}
                keyExtractor={(item) => item.id}
                labelExtractor={(item) => item.name}
                valueExtractor={(item) => item.id}
                endpoints={{
                  search: {
                    debounceTime: 300,
                    endpoint: "/api/enterprise",
                    initialFetch: {
                      endpoint: `/api/enterprise?id=${enterpriseIdWatch}`,
                      queryKey: [QueryKeys.FILE_CHECKLIST_LIST, enterpriseIdWatch],
                      enabled: enterpriseIdWatch !== undefined,
                    },
                    searchParams: {
                      limit: 2,
                    },
                    searchParamName: "search",
                    queryKey: [QueryKeys.FILE_CHECKLIST_LIST, "search"],
                  }
                }}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item<Assignation> name="periodId" label="Periodo" rules={[{ required: true }]}>
              <ApiSelect<Period[], Period>
                itemExtractor={(data) => data}
                keyExtractor={(item) => item.id}
                labelExtractor={(item) => item.name}
                valueExtractor={(item) => item.id}
                onChange={(value) => console.log(value)}
                endpoints={{
                  simpleFindAll: {
                    endpoint: "/api/period",
                    queryKey: [QueryKeys.PERIODS],
                    searchOptions: {
                      keys: ["name"],
                      threshold: 0.3,
                    }
                  }
                }}
                
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<Assignation>
              name="fileChecklistId"
              label="Checklist"
              rules={[{ required: true }]}
            >
              <ApiSelect<GetChecklistListResponse, FileChecklist>
                itemExtractor={(data) => data.data}
                keyExtractor={(item) => item.id}
                labelExtractor={(item) => item.title}
                valueExtractor={(item) => item.id}
                endpoints={{
                  search: {
                    debounceTime: 500,
                    endpoint: "/api/file-checklist",
                    initialFetch: {
                      endpoint: `/api/file-checklist?id=${checklistIdWatch}`,
                      queryKey: [QueryKeys.FILE_CHECKLIST_LIST, checklistIdWatch],
                      enabled: checklistIdWatch !== undefined,
                    },
                    searchParamName: "search",
                    queryKey: [QueryKeys.FILE_CHECKLIST_LIST, "search"],
                  }
                }}
                optionRenderer={(item) => (
                  <div className="flex flex-col">
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </div>
                )}
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

          <div className="my-5 w-full">
          <hr className="w-full my-2" />
          <h3 className="text-xl">Requerimientos extra</h3>
          </div>

          <div className="flex flex-wrap gap-2 flex-row w-full">
            <FormList
              addButtonText="Agregar archivo"
              itemClassName="bg-gray-100 p-3 border rounded-md max-w-[400px] hover:shadow-md transition duration-300 ease-in-out"
              containerClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              ref={formListRef}
              renderForm={(ref: RefObject<ExtraChecklistItemFormHandle>) => (
                <ExtraChecklistItemForm fileChecklistId={checklistIdWatch} ref={ref} />
              )}
              itemTitle={(index) => `Archivo ${index + 1}`}
              min={0}
            />
          </div>
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
  extraChecklistItems: MergedExtraChecklistItemFormBody[];
};
