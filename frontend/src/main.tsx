import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import "./index.css";

import { queryClient } from "./shared/api/queryClient";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />

            <Toaster
                position="bottom-right"
                richColors
            />
        </QueryClientProvider>
    </React.StrictMode>,
);