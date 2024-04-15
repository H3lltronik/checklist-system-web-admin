import { Spin } from "antd";

type AbsoluteCenteredLoaderProps = {
  isLoading: boolean;
};

export const AbsoluteCenteredLoader = ({ isLoading }: AbsoluteCenteredLoaderProps) => {
  if (!isLoading) {
    return null;
  }
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-black bg-opacity-20 z-10">
      <Spin />
    </div>
  );
};
