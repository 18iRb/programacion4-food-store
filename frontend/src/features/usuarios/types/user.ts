import type { Role } from "@/features/auth";

export interface User {
    username: string;
    full_name: string;
    email: string;
    id: number;
    role: Role;
    disabled: boolean;
    created_at: string;
}