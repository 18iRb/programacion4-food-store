import { Link } from "react-router-dom";

function AdminPage() {
    return (
        <div className="mx-auto max-w-7xl p-6">
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-slate-900">
                    Panel de Administración
                </h1>

                <p className="mt-2 text-slate-600">
                    Gestioná pedidos, productos, categorías y usuarios.
                </p>
            </div>

            <section>
                <h2 className="mb-4 text-lg font-semibold text-slate-700">
                    Accesos rápidos
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                    <Link
                        to="/admin/pedidos"
                        className="rounded-xl border bg-white p-6 transition hover:border-orange-500 hover:shadow-md"
                    >
                        <div className="mb-2 text-3xl">
                            📦
                        </div>

                        <h3 className="text-xl font-semibold">
                            Pedidos
                        </h3>

                        <p className="mt-2 text-sm text-slate-600">
                            Gestionar estados y entregas.
                        </p>
                    </Link>

                    <Link
                        to="/admin/productos"
                        className="rounded-xl border bg-white p-6 transition hover:border-orange-500 hover:shadow-md"
                    >
                        <div className="mb-2 text-3xl">
                            🍔
                        </div>

                        <h3 className="text-xl font-semibold">
                            Productos
                        </h3>

                        <p className="mt-2 text-sm text-slate-600">
                            Administrar catálogo y stock.
                        </p>
                    </Link>

                    <Link
                        to="/admin/categorias"
                        className="rounded-xl border bg-white p-6 transition hover:border-orange-500 hover:shadow-md"
                    >
                        <div className="mb-2 text-3xl">
                            🏷️
                        </div>

                        <h3 className="text-xl font-semibold">
                            Categorías
                        </h3>

                        <p className="mt-2 text-sm text-slate-600">
                            Gestionar categorías disponibles.
                        </p>
                    </Link>

                    <Link
                        to="/admin/usuarios"
                        className="rounded-xl border bg-white p-6 transition hover:border-orange-500 hover:shadow-md"
                    >
                        <div className="mb-2 text-3xl">
                            👥
                        </div>

                        <h3 className="text-xl font-semibold">
                            Usuarios
                        </h3>

                        <p className="mt-2 text-sm text-slate-600">
                            Activar y desactivar usuarios.
                        </p>
                    </Link>
                </div>
            </section>

            <section className="mt-10">
                <Link
                    to="/admin/resumen"
                    className="flex items-center justify-between rounded-xl border border-orange-200 bg-orange-50 p-5 transition hover:bg-orange-100"
                >
                    <div>
                        <h2 className="text-lg font-semibold text-orange-700">
                            📊 Ver resumen del negocio
                        </h2>

                        <p className="text-sm text-orange-600">
                            Consultar indicadores y estadísticas generales.
                        </p>
                    </div>

                    <span className="text-2xl">
                        →
                    </span>
                </Link>
            </section>
        </div>
    );
}

export default AdminPage;