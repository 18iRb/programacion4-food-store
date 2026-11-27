import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/ordersApi";

export function useOrders() {
    return useQuery({
        queryKey: ["my-orders"],
        queryFn: getOrders,
    });
}