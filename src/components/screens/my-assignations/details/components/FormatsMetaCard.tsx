import { ParsedChecklistItem } from "@/@types/common";
import { Card } from "antd";

export const FormatsMetaCard = ({ item }: { item: ParsedChecklistItem }) => {
  return (
    <>
      {item.allowedMimeTypes?.length > 0 && (
        <Card.Meta
          className="pt-5"
          description={
            <p>
              <strong>Formato: </strong>
              <i>{item.allowedMimeTypes?.join(", ")}</i>
            </p>
          }
        />
      )}
    </>
  );
};
