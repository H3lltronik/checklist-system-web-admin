import { Subjects } from "@/abilities";
import { ReactNode } from "react";

export interface DefaultActionProps<T> {
  record: T;
  icon?: ReactNode;
  className?: string;
  tooltip?: string;
  onClick?: (record: T) => void;
  onHover?: (record: T) => void;
}

export interface CustomAction<T> {
  component?: (record: T) => ReactNode;
  icon?: ReactNode;
  className?: string;
  tooltip?: string;
  onClick?: (record: T) => void;
  onHover?: (record: T) => void;
  permission?: {
    subject: Subjects;
    action: Action;
  }
}

export interface ActionsColumnConfig<T> {
  view?: CustomAction<T>;
  edit?: CustomAction<T>;
  delete?: CustomAction<T>;
  additionalActions?: CustomAction<T>[];
}
