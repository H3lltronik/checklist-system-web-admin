import { GetEnterpriseListResponse } from "@/@types/api/enterprise";
import { Enterprise } from "@/@types/api/entities";
import { QueryKeys } from "@/@types/queries";
import { ApiSelect } from "@/components/core/forms/common/ApiSelect";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, FormInstance, Row } from "antd";
import React from "react";

interface EnterpriseListProps {
  name: string;
  formRef: FormInstance;
}

export const EnterpriseList: React.FC<EnterpriseListProps> = ({ name }) => {
  
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <Row gutter={12}>
          {fields.map(({ key, name, ...restField }) => (
            <Col span={6} key={key}>
              <Card
                size="small"
                title="Empresa"
                style={{ marginBottom: 16 }}
                extra={
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => remove(name)}
                    icon={<MinusCircleOutlined />}
                  >
                    Eliminar
                  </Button>
                }
              >
                <Row key={key} gutter={16} align={"middle"}>
                  <Col span={22}>
                    <Form.Item
                      {...restField}
                      name={[name, "enterpriseId"]}
                      label="Empresa"
                      rules={[{ required: true, message: "Seleccione una empresa" }]}
                    >
                      <ApiSelect<GetEnterpriseListResponse, Enterprise>
                        itemExtractor={(data) => data.data}
                        keyExtractor={(item) => item.id}
                        labelExtractor={(item) => item.name}
                        valueExtractor={(item) => item.id}
                        endpoints={{
                          search: {
                            debounceTime: 500,
                            endpoint: "/api/enterprise",
                            initialFetch: {
                              endpoint: `/api/enterprise?id=${1}`,
                              queryKey: [QueryKeys.ENTERPRISE_LIST, "1"],
                              enabled: 1 !== undefined,
                            },
                            searchParamName: "search",
                            queryKey: [QueryKeys.ENTERPRISE_LIST, "search"],
                          }
                        }}
                        optionRenderer={(item) => (
                          <div className="flex flex-col">
                            <strong>{item.name}</strong>
                            <span>{item.email}</span>
                          </div>
                        )}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
            Añadir Empresa
          </Button>
        </Row>
      )}
    </Form.List>
  );
};

export default EnterpriseList;
