import type { Role } from "@/features/auth";
import { useAuthStore } from "@/store/authStore";

import {
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";


interface ProtectedRouteProps {
    allowedRoles?: Role[];
}

function ProtectedRoute({
    allowedRoles,
}: ProtectedRouteProps) {

    const location = useLocation();

    const isLoading = useAuthStore(
        (s) => s.isLoading,
    );

    const user = useAuthStore(
        (s) => s.user,
    );

    if (isLoading) {
        return (
            <div>
                Cargando...
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                state={{
                    from: location,
                }}
                replace
            />
        );
    }

    if (
        allowedRoles &&
        !allowedRoles.includes(
            user.role as Role,
        )
    ) {
        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        );
    }

    return <Outlet />;
}

export default ProtectedRoute;