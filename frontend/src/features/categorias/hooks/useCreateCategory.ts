import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createCategory } from "../api/categoriesApi";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";


export function useCreateCategory() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: createCategory,

        onSuccess: () => {
            toast.success(
                "Categoría creada correctamente",
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