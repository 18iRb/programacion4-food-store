import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../api/ordersApi";

export function useAllOrders() {
    return useQuery({
        queryKey: ["orders"],
        queryFn: getAllOrders,
    });
}