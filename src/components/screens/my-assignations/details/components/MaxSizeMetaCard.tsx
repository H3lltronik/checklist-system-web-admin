import { SizeSuffix } from "@/@types/sizes";
import { Card } from "antd";
import { ChecklistItem } from "../../types";
import { bytesToSize, bytesWithSuffix } from "../lib";

export const MaxSizeMetaCard = ({ item }: { item: ChecklistItem }) => {

  const sizeInBytes = bytesWithSuffix(item.maxSize, item.sizeSuffix as SizeSuffix) || 0;

  return (
    <>
      {!!item.maxSize && (
        <Card.Meta
          className="pt-2"
          description={
            <p>
              <strong>Tamaño: </strong>
              <i>{bytesToSize(sizeInBytes)}</i>
            </p>
          }
        />
      )}
    </>
  );
};
