import { DataTable } from "@/Components/ui/DataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { 
    Delete, 
    Edit, 
    Fullscreen, 
    MoreHorizontal ,
    ArrowUpDown, 
    Plus,
} from "lucide-react"
import { Button } from "@/Components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/Components/ui/pagination"
import InputSelect from "@/Components/ui/inputSelect";
import { useState } from "react";
import LoadingButton from "@/Components/ui/LoadingButton";
import { Checkbox } from "@/Components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: Category;
    totalProduct: number;
}

interface ProductsPageProps extends PageProps {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        prev_page_url ?: string | undefined;
        next_page_url ?: string | undefined;
    };

    categories : {
        id: number;
        name: string;
    }
}

const Index = () => {
    const { props } = usePage<ProductsPageProps>();
    const { 
        products,
        categories
    } = props;

    const [selectedItem, setSelectedItem] = useState<string | undefined>(undefined);
    const [inputValue, setInputValue] = useState<string | undefined>(undefined);

    const handleSelectChange = (newSelectedItem: string, newInputValue: string) => {
        setSelectedItem(newSelectedItem);
        setInputValue(newInputValue);
    };

    const columns: ColumnDef<Product>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    className="flex justify-center items-center mx-auto"
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    className="flex justify-center items-center mx-auto"
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="flex justify-center items-center mx-auto"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Product Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "description",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="flex justify-center items-center mx-auto"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Description
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "price",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="flex justify-center items-center mx-auto"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Price
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "category.name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="flex justify-center items-center mx-auto"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Category
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 flex justify-center items-center">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Delete/>
                            Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Edit/>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Fullscreen/>
                            Preview
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        }
    ];

    const { get, processing } = useForm({
        search: inputValue ,
        filter : selectedItem
    });

    const handleSubmit = (e : any) => {
        e.preventDefault();
        get(route('product.index'), { preserveState: true });
    };


    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Products
                    </h2>
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" aria-label="Add new item">
                                <Plus size={16} strokeWidth={2} aria-hidden="true" />
                            </Button>
                            </TooltipTrigger>
                            <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
                                New Product
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <DataTable
                            columns={columns}
                            data={products.data}
                        >
                            <form onSubmit={handleSubmit}>
                                <InputSelect 
                                    selectItems={['productname' , 'cat_name']}
                                    onSelectChange={handleSelectChange} 
                                >
                                    {
                                        processing ? (
                                            <LoadingButton variant="outline" />
                                        ) : (
                                            <Button type="submit" disabled={processing} variant="outline" className="mx-1">
                                                Send
                                            </Button>
                                        )
                                    }
                                </InputSelect>
                            </form>
                        </DataTable>
                        <div className="flex items-center justify-center space-x-2 py-4">
                            <Pagination>
                                <PaginationContent>
                                    {products.prev_page_url && (
                                        <PaginationPrevious href={products.prev_page_url}>
                                            Previous
                                        </PaginationPrevious>
                                    )}

                                    {Array.from({ length: products.last_page }, (_, index) => (
                                        <PaginationItem key={index}>
                                            <PaginationLink
                                                href={`?page=${index + 1}`}
                                                className={products.current_page === index + 1 ? "active" : ""}
                                            >
                                                {index > 0 ? (
                                                    <PaginationEllipsis />
                                                ) : (
                                                    index + 1
                                                )}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    {products.next_page_url && (
                                        <PaginationNext href={products.next_page_url}>
                                            Next
                                        </PaginationNext>
                                    )}
                                </PaginationContent>
                            </Pagination>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;