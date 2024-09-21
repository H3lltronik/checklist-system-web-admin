import { ParsedChecklistItem } from "@/@types/common";
import { Card } from "antd";
import { bytesToSize } from "../lib";

export const MaxSizeMetaCard = ({ item }: { item: ParsedChecklistItem }) => {
  return (
    <>
      {!!item.maxSizeInBytes && (
        <Card.Meta
          className="pt-2"
          description={
            <p>
              <strong>Tamaño: </strong>
              <i>{bytesToSize(item.maxSizeInBytes)}</i>
            </p>
          }
        />
      )}
    </>
  );
};
