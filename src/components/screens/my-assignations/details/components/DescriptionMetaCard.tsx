import { ParsedChecklistItem } from "@/@types/common";
import { Card } from "antd";

export const DescriptionMetaCard = ({ item }: { item: ParsedChecklistItem }) => {
  return (
    <>
      {item.description && (
        <Card.Meta
          className="pt-2"
          description={
            <p>
              <strong>Descripcion: </strong>
              <i>{item.description}</i>
            </p>
          }
        />
      )}
    </>
  );
};
