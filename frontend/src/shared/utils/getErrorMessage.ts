import axios from "axios";

export function getErrorMessage(
    error: unknown,
): string {
    if (!axios.isAxiosError(error)) {
        return "Ocurrió un error inesperado";
    }

    const data = error.response?.data;

    if (typeof data?.detail === "string") {
        return data.detail;
    }

    if (
        Array.isArray(data?.detail) &&
        data.detail.length > 0
    ) {
        return data.detail[0].msg;
    }

    return error.message;
}
