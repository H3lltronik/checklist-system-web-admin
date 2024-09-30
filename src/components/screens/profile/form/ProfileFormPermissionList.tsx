import { Action, Subject } from "@/@types/api/entities";
import { QueryKeys } from "@/@types/queries";
import { ApiSelect } from "@/components/core/forms/common/ApiSelect";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Row } from "antd";

interface ProfileFormPermissionListProps {
  name: string;
}

export const ProfileFormPermissionList: React.FC<ProfileFormPermissionListProps> = ({ name }) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <Row gutter={12}>
          {fields.map(({ key, name, ...restField }) => (
            <Col span={6} key={key}>
              <Card
                size="small"
                title={<div className="text-left">Permiso</div>}
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
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      {...restField}
                      name={[name, "subjectId"]}
                      label="Recurso"
                      rules={[{ required: true, message: "Seleccione un subject" }]}
                    >
                      <ApiSelect<Subject[], Subject>
                        itemExtractor={(data) => data}
                        keyExtractor={(item) => item.id}
                        labelExtractor={(item) => item.name}
                        valueExtractor={(item) => item.id}
                        onChange={(value) => console.log(value)}
                        endpoints={{
                          simpleFindAll: {
                            endpoint: "/api/auth/subject",
                            queryKey: [QueryKeys.SUBJECT_LIST],
                            staleTime: Infinity,
                            searchOptions: {
                              keys: ["name", "descriptions.es"],
                              threshold: 0.3
                            }
                          }
                        }}
                        optionRenderer={(item) => (
                          <div className="">
                            <strong>{item.name} - </strong>
                            <span>{item.descriptions.es}</span>
                          </div>
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      {...restField}
                      name={[name, "actionId"]}
                      label="Accion"
                      rules={[{ required: true, message: "Seleccione un action" }]}
                    >
                      <ApiSelect<Action[], Action>
                        className="!h-[24]"
                        itemExtractor={(data) => data}
                        keyExtractor={(item) => item.id}
                        labelExtractor={(item) => item.name}
                        valueExtractor={(item) => item.id}
                        onChange={(value) => console.log(value)}
                        endpoints={{
                          simpleFindAll: {
                            endpoint: "/api/auth/action",
                            queryKey: [QueryKeys.ACTION_LIST],
                            staleTime: Infinity,
                            searchOptions: {
                              keys: ["name", "descriptions.es"],
                              threshold: 0.3
                            }
                          }
                        }}
                        optionRenderer={(item) => (
                          <div className="">
                            <strong>{item.name} - </strong>
                            <span>{item.descriptions.es}</span>
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
            Añadir Permiso
          </Button>
        </Row>
      )}
    </Form.List>
  );
};
