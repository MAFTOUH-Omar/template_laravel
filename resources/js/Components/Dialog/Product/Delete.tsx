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
import { router, useForm } from "@inertiajs/react";
import { ReactNode, useState, useEffect } from "react";
import { toast } from "sonner";
import { getDescription } from '@/helpers/helpers';
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { AlertCircle } from "lucide-react";

type DeleteProduct = {
    id: number | undefined;
    children: ReactNode;
    open?: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
}

export function Delete({ id, children, open = false, onClose, onConfirm, ...props }: DeleteProduct) {
    const [isOpen, setIsOpen] = useState<boolean>(open);

    const { errors } = useForm()

    useEffect(() => {
        if (open !== isOpen) {
            setIsOpen(open);
        }
    }, [open]);    

    const handleClose = () => {
        if (onClose) onClose();
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id) {
            router.delete(`/product/${id}`, {
                onSuccess: () => {
                    toast("Product deleted successfully!", {
                        description: getDescription(),
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                    });
                    handleClose();
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

                {Object.keys(errors).length > 0 && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        {Object.values(errors).map((error, index) => (
                            <AlertDescription key={index}>{error}</AlertDescription>
                        ))}
                    </Alert>
                )}

                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
                    <form onSubmit={handleSubmit}>
                        <AlertDialogAction type="submit" className="bg-red-600 hover:bg-red-500">Delete</AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}