"use client";

import { useModalStore } from "@/zustand/store";

const useModal = (modalId: string) => {
  const { openModal, closeModal, isOpen, toggleModal } = useModalStore();

  const handleOpen = () => openModal(modalId);
  const handleClose = () => closeModal(modalId);
  const handleToggleModal = () => toggleModal(modalId);

  return {
    isOpen: isOpen(modalId),
    openModal: handleOpen,
    closeModal: handleClose,
    toggleModal: handleToggleModal,
  };
};

export default useModal;
