import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
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
import { ReactNode, useState } from "react";
import LoadingButton from "@/Components/ui/LoadingButton";
import { toast } from "sonner";
import { getDescription } from '@/helpers/helpers';
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";

type Category = {
    id: number;
    name: string;
};

type PageCreateProduct = {
    categories: Category[];
    children: ReactNode;
};

export function Create({ categories, children }: PageCreateProduct) {
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, errors, processing } = useForm({
        name: "",
        description: "",
        price: 0,
        cat_id: null as number | null,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/product", {
            data,
            onSuccess: () => {
                setIsOpen(false);
                toast("Product created successfully!", {
                description: getDescription(),
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                }})
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Product</DialogTitle>
                    <DialogDescription>
                        Fill in the details to create a new product.
                    </DialogDescription>
                </DialogHeader>

                {Object.keys(errors).length > 0 && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        {Object.values(errors).map((error, index) => (
                            <AlertDescription key={index}>{error}</AlertDescription>
                        ))}
                    </Alert>
                )}

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
                        </div>
                        <div className="grid items-center justify-between gap-2">
                            <Textarea
                                placeholder="Leave a description"
                                className="col-span-3"
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {processing ? (
                            <LoadingButton variant="outline" />
                        ) : (
                            <Button type="submit">Save</Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}