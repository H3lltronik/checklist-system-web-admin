import { DeleteFilled, PlusCircleFilled } from "@ant-design/icons";
import { Button } from "antd";
import React, {
  forwardRef,
  ReactNode,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface FormListProps<T> {
  renderForm: (ref: RefObject<FormRefHandle<T>>) => ReactNode;
  addButtonText?: string;
  itemClassName?: string;
  containerClassName?: string;
  // either a string or a function with the index as argument that returns a string
  itemTitle?: string | ((index: number) => string);
}

export interface FormListHandle<T> {
  getAllFormsData: () => Promise<(T | Error)[]>;
  setFormsData: (dataArray: Partial<T>[]) => void;
}

export type FormRefHandle<T, U = T> = {
  getFormData: () => Promise<T>;
  setFormData: (data: Partial<U>) => void;
};

const _FormList = <T,>(props: FormListProps<T>, ref: React.ForwardedRef<FormListHandle<T>>) => {
  const { renderForm, addButtonText: title, itemClassName, containerClassName } = props;
  const [formRefs, setFormRefs] = useState<RefObject<FormRefHandle<T>>[]>([]);
  // Usar una ref para controlar la aplicación de datos iniciales
  const initialDataRef = useRef<Partial<T>[]>([]);

  const addForm = () => setFormRefs((prev) => [...prev, React.createRef<FormRefHandle<T>>()]);
  const removeForm = (index: number) => setFormRefs((prev) => prev.filter((_, i) => i !== index));

  useImperativeHandle(ref, () => ({
    getAllFormsData: async () => {
      return Promise.all(
        formRefs.map((formRef) =>
          formRef.current
            ? formRef.current.getFormData().catch((error) => error)
            : Promise.resolve(new Error("FormRef is null")),
        ),
      );
    },
    setFormsData: (dataArray) => {
      setFormRefs(dataArray.map(() => React.createRef<FormRefHandle<T>>()));
      // Asignar datos iniciales a ref para su uso posterior
      initialDataRef.current = dataArray;
    },
  }));

  useEffect(() => {
    // Aplicar datos iniciales solo si hay datos para aplicar
    if (initialDataRef.current.length > 0) {
      formRefs.forEach((formRef, index) => {
        if (initialDataRef.current[index] !== undefined) {
          formRef.current?.setFormData(initialDataRef.current[index]);
        }
      });
      // Limpiar ref de datos iniciales después de aplicarlos para evitar aplicaciones múltiples
      initialDataRef.current = [];
    }
  }, [formRefs]); // Depender solo de formRefs aquí

  return (
    <div className="w-full">
      <div className="flex items-center mb-5 gap-2">
        <Button
          className="bg-green-600 text-white hover:bg-green-50"
          icon={<PlusCircleFilled />}
          onClick={addForm}
        >
          <span>{title}</span>
        </Button>
        <hr className="w-full" />
      </div>
      {formRefs.length > 0 && (
        <div className={`pl-3 bg-gray-100 p-1 my-2 ${containerClassName}`}>
          {formRefs.map((formRef, index) => (
            <div key={index} className={`${itemClassName}`}>
              <div className="flex items-center pb-4 gap-2">
                {props.itemTitle ? (
                  typeof props.itemTitle === "string" ? (
                    <h3 className="text-lg font-bold whitespace-nowrap">{props.itemTitle}</h3>
                  ) : (
                    <h3 className="text-lg font-bold whitespace-nowrap">
                      {props.itemTitle(index)}
                    </h3>
                  )
                ) : null}
                <Button
                  className="bg-red-500 mr-3 group"
                  icon={<DeleteFilled className="text-white group-hover:text-red-500" />}
                  shape="circle"
                  onClick={() => removeForm(index)}
                />
                <hr className="w-full" />
              </div>
              {renderForm(formRef)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const FormList = forwardRef(_FormList) as <T>(
  props: FormListProps<T> & { ref?: React.ForwardedRef<FormListHandle<T>> },
) => JSX.Element;
