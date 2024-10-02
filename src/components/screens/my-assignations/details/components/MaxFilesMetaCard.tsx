import { Card } from "antd";
import { ChecklistItem } from "../../types";

export const MaxFilesMetaCard = ({ item }: { item: ChecklistItem }) => {
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
      {item.minFiles && (
        <Card.Meta
          className="pt-2"
          description={
            <p>
              <strong>Min archivos: </strong>
              <i>{item.minFiles} archivo(s)</i>
            </p>
          }
        />
      )}
    </>
  );
};
