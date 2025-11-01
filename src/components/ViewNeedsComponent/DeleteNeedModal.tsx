// import { useState } from 'react';
import {
  AlertDialog,
  // AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import type { Need } from "./NeedCard";

interface DeleteNeedModalProps {
  need: Need | null;
  onClose: () => void;
  onConfirmDelete: (needId: number) => void; // This function will be passed from the page
  isDeleting: boolean; // We'll get this from our state store
}

export function DeleteNeedModal({ 
  need, 
  onClose, 
  onConfirmDelete, 
  isDeleting 
}: DeleteNeedModalProps) {
  
  const handleConfirm = () => {
    if (need) {
      onConfirmDelete(need.id);
    }
  };

  return (
    <AlertDialog open={!!need} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <AlertDialogContent className="bg-slate-900 border-slate-700 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-rose-400">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-400">
            This action cannot be undone. This will permanently delete your need
            posting <strong className="text-white">{need?.title}</strong> and remove
            its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={onClose} 
            className="bg-transparent text-white hover:bg-slate-700 border-slate-600"
            disabled={isDeleting}
          >
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={handleConfirm}
            className="bg-rose-600 hover:bg-rose-700 text-white"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Yes, delete this need
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}