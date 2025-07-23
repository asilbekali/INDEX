import React from "react";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 transition-opacity duration-300">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-sm transition-all scale-100">
                <h2 className="text-lg font-semibold mb-4">Rostdan ham o‘chirmoqchimisiz?</h2>
                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                        Bekor qilish
                    </button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                        Ha, o‘chirish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
