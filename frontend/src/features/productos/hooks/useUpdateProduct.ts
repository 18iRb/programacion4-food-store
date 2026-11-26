import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../api/productsApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProduct,

        onSuccess: () => {
            toast.success(
                "Producto actualizado correctamente",
            );

            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },

        onError: (error) => {
            toast.error(
                getErrorMessage(error.message),
            );
        },
    });
}