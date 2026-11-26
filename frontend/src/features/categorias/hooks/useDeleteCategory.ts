import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../api/categoriesApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCategory,

        onSuccess: () => {
            toast.success(
                "Categoría desactivada correctamente",
            );

            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },

        onError: (error) => {
            toast.error(
                getErrorMessage(error),
            )
        }
    })
}