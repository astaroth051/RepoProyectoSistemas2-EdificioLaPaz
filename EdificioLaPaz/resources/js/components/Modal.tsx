import React from "react";

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: "success" | "error";
}

export default function Modal({ visible, onClose, title, message, type = "success" }: ModalProps) {
    if (!visible) return null;

    // Colores basados en tu paleta: #1E3A8A (azul principal) y #10B981 (verde accent)
    const buttonClass = type === "success"
        ? "bg-[#10B981] hover:bg-green-600"
        : "bg-red-600 hover:bg-red-700";

    const titleClass = type === "success" ? "text-[#1E3A8A]" : "text-red-600";
    const borderClass = type === "success" ? "border-[#10B981]" : "border-red-500";

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
            <div className={`bg-white rounded-lg p-6 w-96 shadow-lg text-center text-black border-4 ${borderClass}`}>
                <h2 className={`text-2xl font-bold mb-4 ${titleClass}`}>{title}</h2>
                <p className="mb-6 text-gray-700">{message}</p>
                <button
                    onClick={onClose}
                    className={`${buttonClass} text-white px-6 py-3 rounded-xl text-lg font-semibold transition`}
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}
