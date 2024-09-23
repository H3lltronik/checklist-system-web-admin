import { MutationKeys } from "@/@types/queries";
import { fileUploadRequestWithToken, RcCustomRequestOptions } from "@/lib/files/file-upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useAvatarChangerMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MutationKeys.FILE_UPLOAD] as const,
        mutationFn: (options: RcCustomRequestOptions) => fileUploadRequestWithToken(options),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [] });

            message.success("Avatar cambiado correctamente");
        },
        onError: (error) => {
            message.error(error.message);
        },
    });
};