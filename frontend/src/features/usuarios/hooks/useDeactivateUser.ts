import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateUser } from "../api/usersApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export function useDeactivateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deactivateUser,

        onSuccess: () => {
            toast.success(
                "Usuario desactivado correctamente",
            );

            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },

        onError: (error) => {
            toast.error(
                getErrorMessage(error),
            );
        },
    });
}