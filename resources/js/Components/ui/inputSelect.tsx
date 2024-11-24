import { Input } from "@/Components/ui/input";
import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";
import { Button } from "@/Components/ui/button";

type InputSelectProps = {
    selectItems: string[];
    onSelectChange: (selectedItem: string, inputValue: string) => void;
    props?: any;
    children ?: ReactNode,
};

export default function InputSelect({ selectItems, onSelectChange, children , ...props }: InputSelectProps) {
    const [selectedItem, setSelectedItem] = useState<string | undefined>();
    const [inputValue, setInputValue] = useState<string | undefined>();

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSelectedItem = e.target.value;
        setSelectedItem(newSelectedItem);
        if (onSelectChange) {
            onSelectChange(newSelectedItem, inputValue || '');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newInputValue = e.target.value;
        setInputValue(newInputValue);
        if (onSelectChange) {
            onSelectChange(selectedItem || '', newInputValue);
        }
    };

    return (
        <div className="space-y-2 my-2">
            <div className="flex rounded-lg shadow-sm shadow-black/5">
                <div className="relative">
                    <select
                        className="peer inline-flex h-full appearance-none items-center rounded-none rounded-s-lg border border-input bg-background pe-8 ps-3 text-sm text-muted-foreground transition-shadow hover:bg-accent hover:text-accent-foreground focus:z-10 focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Protocol"
                        value={selectedItem}
                        onChange={handleSelectChange}
                    >
                        <option>select item</option>
                        {selectItems && selectItems.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 end-0 z-10 flex h-full w-9 items-center justify-center text-muted-foreground/80 peer-disabled:opacity-50">
                        <ChevronDown size={16} strokeWidth={2} aria-hidden="true" role="img" />
                    </span>
                </div>
                <Input
                    id="input-17"
                    className="-ms-px rounded-s-none shadow-none focus-visible:z-10"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={`search by ${selectedItem ?? 'item'}`}
                    type="text"
                />
                {children}
            </div>
        </div>
    );
}