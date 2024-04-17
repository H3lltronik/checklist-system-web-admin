import { User } from "@/@types/api/entities";
import { Descriptions, Image } from "antd";
import React from "react";
import { EnterpriseDetails } from "../enterprise/EnterpriseDetails";

interface UserDetailsProps {
  data: User;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ data }) => {
  return (
    <div>
      <Descriptions bordered title="User Details" size="small">
        <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
        <Descriptions.Item label="Status">
          {data.isActive ? "Active" : "Inactive"}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{data.credentials[0].email}</Descriptions.Item>
        <Descriptions.Item label="Picture">
          <Image width={200} src={data.pictureUrl} />
        </Descriptions.Item>
      </Descriptions>
      {data.enterprises?.map((enterprise, index) => (
        <EnterpriseDetails key={index} enterprise={enterprise} />
      ))}
    </div>
  );
};
