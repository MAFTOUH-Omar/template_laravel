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
        cat_id: 0,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/product", {
            data,
            onSuccess: () => {
                setIsOpen(false);
            },
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