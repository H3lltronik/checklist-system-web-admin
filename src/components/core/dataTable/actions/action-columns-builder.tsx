import { UserPermissions } from "@/@types/auth";
import { ActionsColumnConfig } from "@/@types/table";
import { createAbilityForUser } from "@/abilities";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { DefaultActionButton } from "./DefaultActionButton";

export const createActionsColumn = <T extends { id: number }>(config: ActionsColumnConfig<T>, permissions: UserPermissions) => {
  const ability = createAbilityForUser(permissions);

  return {
    title: "Acciones",
    key: "acciones",
    width: "100px",
    dataIndex: "actions",
    dataType: "string",
    render: (_: unknown, record: T) => {
      if (!config) return null;

      const canView = config?.view?.permission?.subject && ability.can(config?.view?.permission?.action, config?.view?.permission?.subject);
      const canEdit = config?.edit?.permission?.subject && ability.can(config?.edit?.permission?.action, config?.edit?.permission?.subject);
      const canDelete = config?.delete?.permission?.subject && ability.can(config?.delete?.permission?.action, config?.delete?.permission?.subject);

      return (
        <div className="w-full flex gap-3 justify-center">
          {config.view && canView &&
            (config.view.component ? (
              config.view.component(record)
            ) : (
              <DefaultActionButton
                record={record}
                icon={config.view.icon || <EyeOutlined />}
                className={config.view.className || "bg-green-500 text-white"}
                tooltip={config.view.tooltip || "Ver"}
                onClick={config.view.onClick}
                onHover={config.view.onHover}
              />
            ))}
          {config.edit && canEdit &&
            (config.edit.component ? (
              config.edit.component(record)
            ) : (
              <DefaultActionButton
                record={record}
                icon={config.edit.icon || <EditOutlined />}
                className={config.edit.className || "bg-blue-500 text-white"}
                tooltip={config.edit.tooltip || "Editar"}
                onClick={config.edit.onClick}
                onHover={config.edit.onHover}
              />
            ))}
          {config.delete && canDelete &&
            (config.delete.component ? (
              config.delete.component(record)
            ) : (
              <DefaultActionButton
                record={record}
                icon={config.delete.icon || <DeleteOutlined />}
                className={config.delete.className || "bg-red-500 text-white"}
                tooltip={config.delete.tooltip || "Borrar"}
                onClick={config.delete.onClick}
                onHover={config.delete.onHover}
              />
            ))}
          {config.additionalActions?.map((action, index) => {
            const canPerformAction = action.permission?.subject && ability.can(action.permission.action, action.permission.subject) || true;
            if (!canPerformAction) return null;

            if (action.component) {
              return action.component(record);
            } else {
              return (
                <DefaultActionButton
                  key={index}
                  record={record}
                  icon={action.icon}
                  className={action.className}
                  tooltip={action.tooltip}
                />
              );
            }
          }
          )}
        </div>
      )
    },
  }
};
