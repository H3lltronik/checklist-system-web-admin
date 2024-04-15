import { GetEnterpriseAssignationListResponse } from "@/@types/api/assignation";
import { FadeInAndScale } from "@/components/core/animations/FadeInAndScale";
import { AssignationOverviewCard } from "./AssignationOverviewCard";

type EnterpriseAssignationGridProps = {
  data: GetEnterpriseAssignationListResponse;
};

export const EnterpriseAssignationGrid = (props: EnterpriseAssignationGridProps) => {
  return (
    <div className="flex flex-col gap-10">
      {props.data.map((group, index) => (
        <FadeInAndScale key={group.name} delay={index * 10}>
          <h3 className="text-3xl font-bold mb-5">Empresa: {group.name}</h3>

          {group.assignations.length === 0 && <div>No hay datos</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {group.assignations.map((item) => (
              <AssignationOverviewCard
                key={item.id}
                name={item.name}
                period={item.period}
                completedFiles={item.completedFiles}
                totalFiles={item.totalFiles}
                completedPercentage={item.completedPercentage}
                assignationId={item.id}
                needsAttention={item.needsAttention}
              />
            ))}
          </div>
        </FadeInAndScale>
      ))}
    </div>
  );
};
