import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/productsApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProduct,

        onSuccess: () => {
            toast.success(
                "Producto creado correctamente",
            );

            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },

        onError: (error) => {
            toast.error(
                getErrorMessage(error),
            );
        },
    });
}