import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../api/ordersApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export function useCreateOrder() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: createOrder,

        onSuccess: () => {
            toast.success(
                "Pedido realizado correctamente",
            );

            queryClient.invalidateQueries({
                queryKey: ["orders"],
            });

            queryClient.invalidateQueries({
                queryKey: ["my-orders"],
            });
        },

        onError: (error) => {
            toast.error(
                getErrorMessage(error),
            );
        },
    });
}