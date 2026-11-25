import type {
    ButtonHTMLAttributes,
    PropsWithChildren,
} from "react";

type ButtonProps =
    ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
    children,
    className = "",
    ...props
}: PropsWithChildren<ButtonProps>) {
    return (
        <button
            className={`cursor-pointer rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;