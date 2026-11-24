import { useEffect } from "react";

import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./store/authStore";

function App() {

    const checkSession = useAuthStore(
        (s) => s.checkSession,
    );

    useEffect(() => {
        void checkSession();
    }, [checkSession]);

    return (
        <AppRouter />
    );
}

export default App;