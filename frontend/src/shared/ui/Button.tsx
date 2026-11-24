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
            className={`
                rounded-lg
                bg-blue-600
                px-4
                py-2
                font-medium
                text-white
                hover:bg-blue-700
                disabled:opacity-50
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;