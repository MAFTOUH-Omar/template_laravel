import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog"
import { router } from "@inertiajs/react";
import { ReactNode, useState, useEffect } from "react";

type DeleteProduct = {
    id: number | undefined;
    children: ReactNode;
    open?: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
}

export function Delete({ id, children, open = false, onClose, onConfirm, ...props }: DeleteProduct) {
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const handleClose = () => {
        setIsOpen(false);
        if (onClose) onClose();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id) {
            router.delete(`/product/${id}`, {
                onSuccess: () => {
                    setIsOpen(false);
                    if (onConfirm) onConfirm();
                },
            });
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the product and remove its data from our system.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit} className="bg-red-600 hover:bg-red-500">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
