import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../api/categoriesApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export function useUpdateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCategory,

        onSuccess: () => {
            toast.success(
                "Categoría actualizada correctamente",
            );

            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },

        onError: (error) => {
            toast.error(
                getErrorMessage(error),
            );
        },
    });
}