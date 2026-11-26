import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/productsApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,

        onSuccess: () => {
            toast.success(
                "Producto desactivado correctamente",
            )

            queryClient.invalidateQueries({
                queryKey: ["products"],
            })
        },

        onError: (error) => {
            toast.error(
                getErrorMessage(error.message),
            )
        },
    });
}