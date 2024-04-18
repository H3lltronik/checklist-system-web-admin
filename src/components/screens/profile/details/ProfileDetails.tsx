import { GetRoleResponse } from "@/@types/api/roles";
import { Card, List, Tag, Typography } from "antd";

interface ProfileDetailsProps {
  data: GetRoleResponse;
}

export const ProfileDetails = (props: ProfileDetailsProps) => {
  const { data } = props;

  return (
    <div>
      <Typography.Title level={2}>Detales de Perfil</Typography.Title>
      <Card bordered={true} style={{ width: 300 }}>
        <Typography.Title level={4}>{data.name}</Typography.Title>
        <p>{`ID: ${data.id}`}</p>
        <p>{`Active: ${data.isActive ? "SI" : "No"}`}</p>
        <List
          header={<div>Permissions</div>}
          bordered
          dataSource={data.permissions}
          renderItem={(item) => (
            <List.Item>
              <Tag color="blue">{item.action.name}</Tag> on{" "}
              <Tag color="green">{item.subject.name}</Tag>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};
