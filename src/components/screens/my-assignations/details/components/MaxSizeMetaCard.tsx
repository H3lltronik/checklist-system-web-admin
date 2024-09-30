import { ParsedChecklistItem } from "@/@types/common";
import { Card } from "antd";
import { bytesToSize, bytesWithSuffix } from "../lib";

export const MaxSizeMetaCard = ({ item }: { item: ParsedChecklistItem }) => {

  const sizeInBytes = bytesWithSuffix(item.maxSize, item.sizeSuffix) || 0;

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
