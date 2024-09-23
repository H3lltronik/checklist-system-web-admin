import { QueryKeys } from "@/@types/queries";
import { fileUploadRequestWithToken } from "@/lib/files/file-upload";
import { GetProp, Image, message, Spin, Upload } from "antd";
import ImgCrop from 'antd-img-crop';
import { UploadFile, UploadProps } from "antd/es/upload/interface";
import imageCompression, { Options } from "browser-image-compression";
import { useState } from "react";
import { queryClient } from "../queryClient";
import { allowedMimeTypes, validateAvatarPickedFile } from "./validation";

type AvatarChangerProps = {
  userId: number;
  currentAvatarUrl?: string;
  onSuccess?: () => void;
  onError?: () => void;
};

export const AvatarChanger = (props: AvatarChangerProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'current-avatar.png',
      status: 'done',
      url: props.currentAvatarUrl || '',
    },
  ]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    const valid = validateAvatarPickedFile(file);
    if (!valid) return onError && onError(new Error("Invalid file"));

    try {
      const options: Options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 300,
        useWebWorker: true,
      };

      const compressedBlob = await imageCompression(file as File, options);
      const compressedFile = new File([compressedBlob], file.name, {
        type: file.type,
      });

      setLoading(true);
      fileUploadRequestWithToken({
        file: compressedFile,
        method: "PATCH",
        url: `/api/user/${props.userId}/picture-update`,
        onSuccess: () => {
          message.success("Imagen subida correctamente");
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.USER_LIST, props.userId],
          });
          setLoading(false);
          if (onSuccess) onSuccess();
          if (props.onSuccess) props.onSuccess();
        },
        onError: (error) => {
          message.error("Error al subir imagen");
          console.error("Error uploading file:", error);
          setLoading(false);
          if (onError) onError(error);
          if (props.onError) props.onError();
        },
      });
    } catch (error) {
      message.error("Error al comprimir imagen");
      console.error("Error compressing file:", error);
      if (onError) onError(error);
    }
  };

  const onPreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  return (
    <div className="relative flex flex-col gap-5 justify-center align-middle">
      <ImgCrop aspect={1}>
        <Upload
          listType="picture-circle"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          accept={allowedMimeTypes.join(",")}
          customRequest={customRequest} // Añadir customRequest aquí
        >
          {fileList.length < 1 && '+ Cambiar imagen'}
        </Upload>
      </ImgCrop>

      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}

      {loading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-black bg-opacity-20 z-10 rounded-full">
          <Spin />
        </div>
      )}
    </div>
  );
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

function getBase64(file: FileType): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
