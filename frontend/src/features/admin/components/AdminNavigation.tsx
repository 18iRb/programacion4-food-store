import { Link } from "react-router-dom";

const LinkClassName = `flex-1 rounded-xl bg-slate-50 px-5 py-4 text-center font-bold text-slate-700 transition-all hover:text-orange-600 hover:shadow-md hover:bg-orange-50`

export function AdminNavigation() {
    return (
        <div className="mb-8 flex w-full gap-3">
            <Link
                to="/admin/pedidos"
                className={LinkClassName}
            >
                📦 Pedidos
            </Link>

            <Link
                to="/admin/productos"
                className={LinkClassName}
            >
                🍔 Productos
            </Link>

            <Link
                to="/admin/categorias"
                className={LinkClassName}
            >
                🏷️ Categorías
            </Link>

            <Link
                to="/admin/usuarios"
                className={LinkClassName}
            >
                👥 Usuarios
            </Link>

            <Link
                to="/admin/resumen"
                className={LinkClassName}
            >
                📊 Resumen
            </Link>
        </div>
    );
}