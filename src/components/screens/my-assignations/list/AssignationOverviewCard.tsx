import { Action, Subjects } from "@/abilities";
import { useAuthData } from "@/components/core/hooks/useAuth";
import { LoginOutlined, ScheduleOutlined, WarningOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import { Button, Card, Progress, Tooltip } from "antd";

type AssignationOverviewCardProps = {
  name: string;
  period: string;
  completedFiles: number;
  totalFiles: number;
  completedPercentage: number;
  assignationId: number;
  needsAttention: boolean;
};

export const AssignationOverviewCard = (props: AssignationOverviewCardProps) => {
  const { ability } = useAuthData();

  const actions = [
    <Tooltip title="Subir archivos">
      <Link to="/admin/my-assignations/$id" params={{ id: props.assignationId.toString() }}>
        <Button icon={<LoginOutlined />} className="bg-blue-500 text-white" />
      </Link>
    </Tooltip>,
  ];

  if (ability.can(Action.Manage, Subjects.ScreenMyAssignations)) {
    actions.push(
      <Tooltip title="Administrar">
        <Link to="/admin/assignations/$id" params={{ id: props.assignationId.toString() }}>
          <Button icon={<ScheduleOutlined />} className="bg-green-500 text-white" />
        </Link>
      </Tooltip>,
    );
  }

  return (
    <Card className="w-full max-w-[350px]" actions={actions}>
      <Card.Meta
        title={props.name}
        description={props.period}
        avatar={
          <div className="w-full flex items-center justify-center">
            {!props.needsAttention && (
              <Progress type="circle" percent={props.completedPercentage} size="small" />
            )}

            {props.needsAttention && (
              <Tooltip title="Accion necesaria, haz click en 'ir'">
                <div className="w-[60px] h-[60px] bg-yellow-500 rounded-full flex items-center justify-center">
                  <WarningOutlined className="text-white text-2xl" />
                </div>
              </Tooltip>
            )}
          </div>
        }
      />
    </Card>
  );
};
