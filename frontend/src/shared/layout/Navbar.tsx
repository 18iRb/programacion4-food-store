import { useAuthStore } from "@/store/authStore";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useCartStore } from "@/store/cartStore";



function Navbar() {
    const navigate = useNavigate();

    const user = useAuthStore(
        (s) => s.user,
    );

    const logout = useAuthStore(
        (s) => s.logout,
    );

    const items = useCartStore(
        (s) => s.items,
    )

    const totalItems = items.reduce(
        (acc, item) => acc + item.cantidad,
        0,
    );

    return (
        <nav className="border-b bg-white shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <Link
                    to="/"
                    className="hidden text-2xl font-bold text-orange-600 md:block"
                >
                    FoodStore
                </Link>

                {/* Navegación */}
                <div className="flex items-center gap-6">

                    <Link
                        to="/"
                        className="text-sm font-medium text-slate-700 transition-colors hover:text-orange-600"
                    >
                        Catálogo
                    </Link>

                    <Link
                        to="/carrito"
                        className="text-sm font-medium text-slate-700 transition-colors hover:text-orange-600"
                    >
                        Carrito ({totalItems})
                    </Link>

                    {user && (
                        <Link
                            to="/mis-pedidos"
                            className="text-sm font-medium text-slate-700 transition-colors hover:text-orange-600"
                        >
                            Mis pedidos
                        </Link>
                    )}

                    {user?.role === "admin" && (
                        <Link
                            to="/admin"
                            className="text-sm font-medium text-slate-700 transition-colors hover:text-orange-600"
                        >
                            Panel
                        </Link>
                    )}
                </div>

                {/* Usuario */}
                <div className="flex items-center gap-4">

                    {!user && (
                        <>
                            <Link
                                to="/login"
                                className="text-sm font-medium text-slate-700 transition-colors hover:text-orange-600"
                            >
                                Iniciar sesión
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
                            >
                                Registrarse
                            </Link>
                        </>
                    )}

                    {user && (
                        <>
                            <span className="text-sm font-medium text-slate-700">
                                {user.full_name}
                            </span>

                            <Button
                                onClick={async () => {
                                    await logout();

                                    navigate("/login")
                                }}
                            >
                                Cerrar sesión
                            </Button>
                        </>
                    )}
                </div>

            </div>
        </nav>
    );
}

export default Navbar