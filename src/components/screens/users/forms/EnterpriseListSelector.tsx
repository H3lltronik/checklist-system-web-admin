import { Enterprise } from "@/@types/api/entities";
import { ApiSelect } from "@/components/core/forms/common/ApiSelect";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Row } from "antd";
import React from "react";
import { ENTERPRISE_LIST_QUERY_KEY } from "../../enterprise/queries";

interface EnterpriseListProps {
  name: string;
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
                      <ApiSelect<Enterprise[], Enterprise>
                        queryKey={[ENTERPRISE_LIST_QUERY_KEY]}
                        endpoint="/api/enterprise"
                        itemExtractor={(data) => data}
                        keyExtractor={(item) => item.id}
                        labelExtractor={(item) => item.name}
                        valueExtractor={(item) => item.id}
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
