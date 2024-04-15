import { ParsedChecklistItem } from "@/@types/common";
import { Card } from "antd";

export const MaxFilesMetaCard = ({ item }: { item: ParsedChecklistItem }) => {
  return (
    <>
      {item.maxFiles && (
        <Card.Meta
          className="pt-2"
          description={
            <p>
              <strong>Max archivos: </strong>
              <i>{item.maxFiles} archivo(s)</i>
            </p>
          }
        />
      )}
    </>
  );
};
