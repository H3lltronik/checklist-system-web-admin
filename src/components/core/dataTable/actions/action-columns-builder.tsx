import { ActionsColumnConfig } from "@/@types/table";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { DefaultActionButton } from "./DefaultActionButton";

export const createActionsColumn = <T extends { id: number }>(config: ActionsColumnConfig<T>) => ({
  title: "Acciones",
  key: "acciones",
  width: "100px",
  dataIndex: "actions",
  dataType: "string",
  render: (_: unknown, record: T) => (
    <div className="w-full flex gap-3 justify-center">
      {config.view &&
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
      {config.edit &&
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
      {config.delete &&
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
      {config.additionalActions?.map((action, index) =>
        action.component ? (
          action.component(record)
        ) : (
          <DefaultActionButton
            key={index}
            record={record}
            icon={action.icon}
            className={action.className}
            tooltip={action.tooltip}
          />
        ),
      )}
    </div>
  ),
});
