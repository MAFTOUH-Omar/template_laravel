import { Button } from "@/Components/ui/button";
import { LoaderCircle } from "lucide-react";

type TLoadingButton = {
  label ?: string;
  variant ?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" ;
  size ?: "default" | "sm" | "lg" | "icon" ;
  props ?: any
}

export default function LoadingButton( { label , variant , size , ...props } : TLoadingButton ) {
  return (
    <Button variant={variant} size={size} className="mx-2">
        <LoaderCircle
            className="-ms-1 me-2 animate-spin"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
        />
        { label ?? "Processing" }
    </Button>
  );
}
