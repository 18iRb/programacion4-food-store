import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateUser } from "../api/usersApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export function useActivateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: activateUser,

        onSuccess: () => {
            toast.success(
                "Usuario activado correctamente",
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