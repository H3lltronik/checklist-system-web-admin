import { Enterprise } from "@/@types/api/entities";
import { Descriptions } from "antd";
import React from "react";

interface EnterpriseDetailsProps {
  enterprise: Enterprise;
}

export const EnterpriseDetails: React.FC<EnterpriseDetailsProps> = ({ enterprise }) => {
  return (
    <Descriptions bordered title="Enterprise Details" size="small" column={1}>
      <Descriptions.Item label="Name">{enterprise.name}</Descriptions.Item>
      <Descriptions.Item label="RFC">{enterprise.rfc}</Descriptions.Item>
      <Descriptions.Item label="Phone">{enterprise.phone}</Descriptions.Item>
      <Descriptions.Item label="Email">{enterprise.email}</Descriptions.Item>
      <Descriptions.Item label="Address">
        {`${enterprise.streetName} ${enterprise.streetType}, ${enterprise.exteriorNumber}-${enterprise.interiorNumber}, ${enterprise.neighborhood}, ${enterprise.locationName}, ${enterprise.municipality}, ${enterprise.state}, ${enterprise.postalCode}, Between: ${enterprise.betweenStreets}`}
      </Descriptions.Item>
    </Descriptions>
  );
};
