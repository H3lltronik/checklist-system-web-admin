import { message } from "antd";

const SIZE_LIMIT = 5 * 1024 * 1024;
export const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
const allowedResolution = [150, 150];

export const validateAvatarPickedFile = (file: File | undefined) => {
  if (file) {
    const size = file.size;
    const mimeType = file.type;
    const [width, height] = [150, 150];

    if (size > SIZE_LIMIT) {
      message.warning(`File too large. Max size is ${SIZE_LIMIT} bytes`);
      return false;
    }

    if (!allowedMimeTypes.includes(mimeType)) {
      message.warning(`Invalid mime type. Allowed types are: ${allowedMimeTypes.join(", ")}`);
      return false;
    }

    if (width !== allowedResolution[0] || height !== allowedResolution[1]) {
      message.warning(`Invalid resolution. Expected ${allowedResolution.join("x")}`);
      return false;
    }

    return true;
  }

  return false;
};
