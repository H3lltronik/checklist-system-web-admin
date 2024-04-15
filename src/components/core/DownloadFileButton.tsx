import { downloadFileBySlug } from "@/lib/files/file-upload";
import { Button } from "antd";
import React from "react";

type File = {
  slug: string;
  name: string;
  mimetype: string;
};

type DownloadFileButtonProps = {
  file: File;
};

export const DownloadFileButton: React.FC<DownloadFileButtonProps> = (props) => {
  const {
    file: { slug },
  } = props;

  const [loading, setLoading] = React.useState(false);

  const handleDownload = async () => {
    setLoading(true);
    await downloadFileBySlug(slug);
    setLoading(false);
  };

  return (
    <Button
      loading={loading}
      onClick={handleDownload}
      type="link"
      className="text-wrap text-left h-auto ml-0 pl-0 mt-0 pt-0"
    >
      <strong>{props.file.name} </strong>(<i>{props.file.mimetype}</i>)
    </Button>
  );
};
