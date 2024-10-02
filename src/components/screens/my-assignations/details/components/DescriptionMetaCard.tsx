import { Card } from "antd";
import { ChecklistItem } from "../../types";

export const DescriptionMetaCard = ({ item }: { item: ChecklistItem }) => {
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
