import { Button } from "@/Components/ui/button";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";
import { useForm } from "@inertiajs/react";
import { Textarea } from "@/Components/ui/textarea";
import { ReactNode, useEffect, useState } from "react";
import LoadingButton from "@/Components/ui/LoadingButton";
import { toast } from "sonner";
import { getDescription } from '@/helpers/helpers';

type Category = {
    id: number;
    name: string;
};

type PageUpdateProduct = {
    categories: Category[];
    id: number;
    name: string ;
    price: number;
    description: string | undefined;
    children: ReactNode;
    open?: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
};

export function Update({ 
    id , 
    name,
    price,
    description,
    categories , 
    open = false, 
    onClose, 
    onConfirm, 
    children, 
    ...props 
    }: PageUpdateProduct) {

    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        if (open !== isOpen) {
            setIsOpen(open);
        }
    }, [open]); 

    const handleClose = () => {
        if (onClose) onClose();
    };

    const { data, setData, put, errors, processing } = useForm({
        name: name || '',
        description: description || '',
        price: price || '',
        cat_id: null as number | null, 
    });    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(`/product/${id}`, {
            data,
            onSuccess: () => {
                toast("Product updated successfully!", {
                description: getDescription(),
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                }})
                handleClose();
            }
        });
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit Product</AlertDialogTitle>
                    <AlertDialogDescription>
                        Fill in the details to edit product.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid items-center gap-2">
                            <Input
                                id="name"
                                className="col-span-3"
                                placeholder="Name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name}</p>
                            )}
                        </div>
                        <div className="grid items-center gap-2">
                            <Input
                                id="price"
                                type="number"
                                className="col-span-3"
                                placeholder="Price"
                                value={data.price}
                                onChange={(e) => setData("price", parseInt(e.target.value))}
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm">{errors.price}</p>
                            )}
                        </div>
                        <div className="grid items-center gap-2">
                            <Select
                                onValueChange={(value) => setData("cat_id", parseInt(value))}
                                value={data.cat_id ? data.cat_id.toString() : ""}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        {categories.map((item) => (
                                            <SelectItem key={item.id} value={item.id.toString()}>
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.cat_id && (
                                <p className="text-red-500 text-sm">{errors.cat_id}</p>
                            )}
                        </div>
                        <div className="grid items-center justify-between gap-2">
                            <Textarea
                                placeholder="Leave a description"
                                className="col-span-3"
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">{errors.description}</p>
                            )}
                        </div>
                    </div>
                    <AlertDialogFooter>
                        {processing ? (
                            <LoadingButton variant="outline" />
                        ) : (
                            <Button type="submit" className="bg-yellow-600 hover:bg-yellow-500">Edit</Button>
                        )}
                        <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}