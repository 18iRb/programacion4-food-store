import { AdminNavigation } from "@/features/admin/components/AdminNavigation";

import { useSummary } from "../hooks/useSummary";

function AdminResumenPage() {
    const {
        data,
        isLoading,
        error,
    } = useSummary();

    if (isLoading) {
        return (
            <div className="p-6">
                Cargando resumen...
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="p-6">
                Error al cargar resumen.
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl p-6">
            <AdminNavigation />

            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Resumen General
                </h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">
                        ⏳ Pendientes
                    </p>

                    <p className="mt-2 text-4xl font-bold text-yellow-600">
                        {data.pendientes}
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">
                        👨‍🍳 En preparación
                    </p>

                    <p className="mt-2 text-4xl font-bold text-blue-600">
                        {data.en_preparacion}
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">
                        ✅ Entregados
                    </p>

                    <p className="mt-2 text-4xl font-bold text-green-600">
                        {data.entregados}
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">
                        ❌ Cancelados
                    </p>

                    <p className="mt-2 text-4xl font-bold text-red-600">
                        {data.cancelados}
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">
                        📦 Pedidos hoy
                    </p>

                    <p className="mt-2 text-4xl font-bold text-orange-600">
                        {data.pedidos_hoy}
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">
                        💰 Ingresos
                    </p>

                    <p className="mt-2 text-4xl font-bold text-emerald-600">
                        $
                        {data.ingresos_entregados.toLocaleString(
                            "es-AR",
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AdminResumenPage;