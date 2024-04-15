import { Action, Subject } from "@/@types/api/entities";
import { ApiSelect } from "@/components/core/forms/common/ApiSelect";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Row } from "antd";
import { ACTION_LIST_QUERY_KEY } from "../data/action/queries";
import { SUBJECT_LIST_QUERY_KEY } from "../data/subject/queries";

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
                title="Permiso"
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
                        queryKey={[SUBJECT_LIST_QUERY_KEY]}
                        endpoint="http://localhost:3002/auth/subject"
                        itemExtractor={(data) => data}
                        keyExtractor={(item) => item.id}
                        labelExtractor={(item) => item.name}
                        valueExtractor={(item) => item.id}
                        onChange={(value) => console.log(value)}
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
                        queryKey={[ACTION_LIST_QUERY_KEY]}
                        endpoint="http://localhost:3002/auth/action"
                        itemExtractor={(data) => data}
                        keyExtractor={(item) => item.id}
                        labelExtractor={(item) => item.name}
                        valueExtractor={(item) => item.id}
                        onChange={(value) => console.log(value)}
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
