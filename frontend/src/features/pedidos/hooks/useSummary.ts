import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../api/ordersApi";

export function useSummary() {
    return useQuery({
        queryKey: ["summary"],
        queryFn: getSummary,
    });
}