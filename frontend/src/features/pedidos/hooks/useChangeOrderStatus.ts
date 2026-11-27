import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeOrderStatus } from "../api/ordersApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export function useChangeOrderStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: changeOrderStatus,

        onSuccess: () => {
            toast.success(
                "Estado actualizado correctamente",
            )

            queryClient.invalidateQueries({
                queryKey: ["orders"],
            });

            queryClient.invalidateQueries({
                queryKey: ["my-orders"],
            });
        },

        onError: (error) => {
            toast.error(
                getErrorMessage(error.message),
            );
        },
    });
}