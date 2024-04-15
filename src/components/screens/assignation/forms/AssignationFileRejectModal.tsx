import { AbsoluteCenteredLoader } from "@/components/core/AbsoluteCenteredLoader";
import { Form, Input, Modal, Typography } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { ChecklistFileStatus } from "../../my-assignations/details/components/UploadedFilesMetaCard";
import { useUpdateAssignationFileStatusMutation } from "../queries";

type AssignationFileRejectModalProps = {};

type OpenModalParams = {
  assignationId: number;
  fileName: string;
  uploadedAssignationFileId: number;
  checklistName: string;
};

export type RejectModalHandle = {
  open: (params: OpenModalParams) => void;
  close: () => void;
};

export const AssignationFileRejectModal = forwardRef<
  RejectModalHandle,
  AssignationFileRejectModalProps
>((_props, ref) => {
  const [form] = Form.useForm();

  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [assignationId, setAssignationId] = useState(0);
  const [uploadedAssignationFileId, setUploadedAssignationFileId] = useState(0);
  const [checklistName, setChecklistName] = useState("");

  const { mutateAsync, isPending } = useUpdateAssignationFileStatusMutation(assignationId);

  useImperativeHandle(ref, () => ({
    open: (params: OpenModalParams) => {
      setIsOpen(true);
      setFileName(params.fileName);
      setUploadedAssignationFileId(params.uploadedAssignationFileId);
      setChecklistName(params.checklistName);
      setAssignationId(params.assignationId);
    },
    close: () => {
      setIsOpen(false);
      setFileName("");
      setUploadedAssignationFileId(0);
      setChecklistName("");
      setAssignationId(0);
    },
  }));

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleOk = async () => {
    const data = await form.validateFields();

    await mutateAsync({
      data: {
        assignationUploadedFileStatusId: ChecklistFileStatus.REJECTED,
        comment: data.reason,
      },
      id: uploadedAssignationFileId,
    });

    handleCancel();
  };

  return (
    <Modal
      open={isOpen}
      centered
      title={`Rechazar archivo de "${checklistName}"`}
      onOk={handleOk}
      onCancel={handleCancel}
      className="relative"
    >
      <AbsoluteCenteredLoader isLoading={isPending} />

      <Typography.Paragraph>
        Se va a rechazar el archivo <i>{fileName}</i>
      </Typography.Paragraph>
      <Form form={form} className="mt-5">
        <Form.Item
          name="reason"
          label="Motivo de rechazo"
          rules={[{ required: true, message: "Por favor, introduce el motivo de rechazo" }]}
        >
          <Input.TextArea autoSize placeholder="Motivo de rechazo" />
        </Form.Item>
      </Form>
    </Modal>
  );
});
