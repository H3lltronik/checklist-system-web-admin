import { Enterprise } from "@/@types/api/entities";
import { EnterpriseDetails } from "./EnterpriseDetails";

type EnterpriseDetailsScreenProps = {
  data: Enterprise;
};

export const EnterpriseDetailsScreen = (props: EnterpriseDetailsScreenProps) => {
  return (
    <div>
      <EnterpriseDetails enterprise={props.data} />
    </div>
  );
};
