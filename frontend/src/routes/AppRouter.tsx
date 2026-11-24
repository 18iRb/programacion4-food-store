import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AdminUsuariosPage from "@/features/usuarios/pages/AdminUsuariosPage";

import AdminCategoriasPage from "@/features/categorias/pages/AdminCategoriasPage";

import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import UnauthorizedPage from "@/features/auth/pages/UnauthorizedPage";

import CarritoPage from "@/features/pedidos/pages/CarritoPage";
import CheckoutPage from "@/features/pedidos/pages/CheckoutPage";
import MisPedidosPage from "@/features/pedidos/pages/MisPedidosPage";
import AdminResumenPage from "@/features/pedidos/pages/AdminResumenPage";
import AdminPedidosPage from "@/features/pedidos/pages/AdminPedidosPage";

import CatalogoPage from "@/features/productos/pages/CatalogoPage";
import AdminProductosPage from "@/features/productos/pages/AdminProductosPage";
import MainLayout from "@/shared/layout/MainLayout";


function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas  públicas*/}

                <Route element={<MainLayout />}>
                    <Route
                        path="/"
                        element={<CatalogoPage />}
                    />

                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />

                    <Route
                        path="/register"
                        element={<RegisterPage />}
                    />

                    <Route
                        path="/carrito"
                        element={<CarritoPage />}
                    />

                    <Route
                        path="/unauthorized"
                        element={<UnauthorizedPage />}
                    />
                </Route>


                {/* Session */}
                <Route element={<MainLayout />}>
                    <Route element={<ProtectedRoute />}>

                        <Route
                            path="/checkout"
                            element={<CheckoutPage />}
                        />

                        <Route
                            path="/mis-pedidos"
                            element={<MisPedidosPage />}
                        />

                    </Route>
                </Route>


                {/* Admin */}
                <Route element={<MainLayout />}>
                    <Route
                        element={
                            <ProtectedRoute
                                allowedRoles={["admin"]}
                            />
                        }
                    >
                        <Route
                            path="/admin/resumen"
                            element={<AdminResumenPage />}
                        />

                        <Route
                            path="/admin/categorias"
                            element={<AdminCategoriasPage />}
                        />

                        <Route
                            path="/admin/productos"
                            element={<AdminProductosPage />}
                        />

                        <Route
                            path="/admin/pedidos"
                            element={<AdminPedidosPage />}
                        />

                        <Route
                            path="/admin/usuarios"
                            element={<AdminUsuariosPage />}
                        />
                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter