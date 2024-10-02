import { Card } from "antd";
import { ChecklistItem } from "../../types";

export const FormatsMetaCard = ({ item }: { item: ChecklistItem }) => {
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
