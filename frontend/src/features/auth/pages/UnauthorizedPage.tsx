import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UnauthorizedPage() {
    const navigate = useNavigate();

    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            navigate("/");
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [navigate]);

    return (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-6">
            <div className="text-center">
                <h1 className="mb-4 text-5xl font-bold text-red-600">
                    Acceso denegado
                </h1>

                <p className="mb-3 text-lg text-slate-600">
                    No tenés permisos suficientes para acceder a esta sección.
                </p>

                <p className="mb-6 text-sm text-slate-500">
                    Serás redirigido al catálogo en{" "}
                    <span className="font-semibold">
                        {seconds}
                    </span>{" "}
                    segundos.
                </p>

                <Link
                    to="/"
                    className="inline-block rounded-lg bg-orange-600 px-6 py-3 text-white hover:bg-orange-700"
                >
                    Volver al catálogo
                </Link>
            </div>
        </div>
    );
}

export default UnauthorizedPage;