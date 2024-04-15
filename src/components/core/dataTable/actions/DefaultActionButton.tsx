import { DefaultActionProps } from "@/@types/table";
import { Button, Tooltip } from "antd";
import { useCallback } from "react";

export const DefaultActionButton = <T,>(props: DefaultActionProps<T>) => {
  const handleClick = useCallback(() => {
    const defaultAction = () => {
      console.log("Default action: ", props.record);
    };

    if (props.onClick) {
      props.onClick(props.record);
    } else {
      defaultAction();
    }
  }, [props]);

  const handleHover = useCallback(() => {
    const defaultAction = () => {
      console.log("Default action: ", props.record);
    };

    if (props.onHover) {
      props.onHover(props.record);
    } else {
      defaultAction();
    }
  }, [props]);

  return (
    <Tooltip title={props.tooltip}>
      <Button
        icon={props.icon}
        className={props.className}
        onClick={handleClick}
        onMouseEnter={handleHover}
      />
    </Tooltip>
  );
};
