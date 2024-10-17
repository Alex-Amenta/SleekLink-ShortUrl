"use client";

import { RotateCcw, Trash2Icon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import useModal from "@/hooks/useModal";
import ConfirmModal from "./ui/modals/confirm-modal";
import { toast } from "react-toastify";

interface DeleteRestoreButtonProps {
  urlId: string;
  updateStatusUrl: (
    urlId: string,
    active: boolean
  ) => Promise<{ success: boolean }>;
  active: boolean;
  title: string;
}

const DeleteRestoreButton = ({
  urlId,
  updateStatusUrl,
  active,
  title,
}: DeleteRestoreButtonProps) => {
  const { isOpen, closeModal, openModal } = useModal(`confirm-${urlId}`);

  const handleUpdateStatusUrl = async () => {
    const result = await updateStatusUrl(urlId, !active);

    if (result.success) {
      toast.success(`URL ${active ? "eliminada" : "restaurada"} con éxito!`, {
        position: "bottom-right",
      });
    } else {
      toast.error("Error al eliminar URL", { position: "bottom-right" });
    }

    closeModal();
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={`p-1 rounded-md ${
                active
                  ? "hover:bg-red-100 dark:hover:bg-red-950"
                  : "hover:bg-green-100 dark:hover:bg-green-950"
              }  group`}
              onClick={openModal}
            >
              {active ? <Trash2Icon /> : <RotateCcw />}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{active ? "Eliminar Url" : "Restaurar URL"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          message={`¿Estás seguro de ${
            active ? "eliminar" : "restaurar"
          } la URL '${title}'?`}
          onConfirm={handleUpdateStatusUrl}
          onCancel={closeModal}
        />
      )}
    </>
  );
};

export default DeleteRestoreButton;
