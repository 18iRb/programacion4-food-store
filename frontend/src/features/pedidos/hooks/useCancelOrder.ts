import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "../api/ordersApi";

export function useCancelOrder() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: cancelOrder,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["my-orders"],
            });
        },
    });
}