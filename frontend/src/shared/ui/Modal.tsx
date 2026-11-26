import type { ReactNode } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
};

export function Modal({
    isOpen,
    onClose,
    title,
    children,
}: ModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
            <div
                onClick={(e) =>
                    e.stopPropagation()
                }
                className=" w-full max-w-lg rounded-xl bg-white p-6 shadow-xl
                "
            >
                <div
                    className="mb-4 flex items-center justify-between border-b pb-3"
                >
                    <h2
                        className="text-xl font-bold text-slate-800"
                    >
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 transition-colors hover:text-slate-700"
                    >
                        ✕
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}