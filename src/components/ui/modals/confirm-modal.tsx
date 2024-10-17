"use client";

import Modal from "react-modal";

interface ConfirmModalProps {
  isOpen: boolean;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }: ConfirmModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      ariaHideApp={false}
      className="bg-white dark:bg-black p-6 rounded-lg max-w-lg w-full mx-auto my-52 shadow-lg outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
    >
      <p className="mb-4">{message}</p>

      <div className="mt-6 flex justify-end items-center gap-4">
        <button
          onClick={onConfirm}
          className=" shadow-lg p-2 rounded-md bg-green-500 text-white hover:bg-green-700 transition"
        >
          Confirmar
        </button>

        <button
          onClick={onCancel}
          className="shadow-lg p-2 border rounded-md text-black bg-white hover:bg-white/80 transition"
        >
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
