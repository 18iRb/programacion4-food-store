import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "../api/ordersApi";
import { toast } from "sonner";

export function useCancelOrder() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: cancelOrder,

        onSuccess: () => {
            toast.success(
                "Pedido cancelado correctamente",
            );

            queryClient.invalidateQueries({
                queryKey: ["orders"],
            });

            queryClient.invalidateQueries({
                queryKey: ["my-orders"],
            });
        },
    });
}