import { Descriptions } from "antd";
import React from "react";

interface ChecklistItem {
  id: number;
  title: string;
  description: string;
  maxFiles?: number | null;
  maxSizeInBytes?: number | null;
  allowedMimeTypes: string[];
}

interface Requirement {
  id: number;
  title: string;
  description: string;
  checklistItems: ChecklistItem[];
}

interface ChecklistItemDetailsProps {
  item: ChecklistItem;
}

const ChecklistItemDetails: React.FC<ChecklistItemDetailsProps> = ({ item }) => {
  return (
    <Descriptions bordered title={item.title} size="small" column={1}>
      <Descriptions.Item label="Description">{item.description}</Descriptions.Item>
      <Descriptions.Item label="Max Files">{item.maxFiles || "Unlimited"}</Descriptions.Item>
      <Descriptions.Item label="Max Size In Bytes">
        {item.maxSizeInBytes ? `${item.maxSizeInBytes} bytes` : "Unlimited"}
      </Descriptions.Item>
      <Descriptions.Item label="Allowed Mime Types">
        {item.allowedMimeTypes?.join(", ")}
      </Descriptions.Item>
    </Descriptions>
  );
};

interface RequirementDetailsProps {
  data: Requirement;
}

export const RequirementDetails: React.FC<RequirementDetailsProps> = ({ data }) => {
  return (
    <div>
      <Descriptions bordered title="Requirement Details" size="small">
        <Descriptions.Item label="Title">{data.title}</Descriptions.Item>
        <Descriptions.Item label="Description">{data.description}</Descriptions.Item>
      </Descriptions>
      {data.checklistItems.map((item, index) => (
        <ChecklistItemDetails key={index} item={item} />
      ))}
    </div>
  );
};
