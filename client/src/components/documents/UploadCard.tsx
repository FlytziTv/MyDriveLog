import { FileUp } from "lucide-react";

export default function UploadCard() {
  return (
    <div className="group h-64 w-full flex flex-col items-center gap-3 justify-center border-dashed border-2 border-muted-foreground/25 hover:border-primary/60 hover:bg-primary/2 rounded-xl transition-all duration-300 cursor-pointer">
      <div className="p-3 rounded-xl bg-muted/60 group-hover:bg-primary/10 transition-colors duration-300">
        <FileUp
          size={24}
          className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
        />
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium">Drag and drop your files here</p>
        <p className="text-xs text-muted-foreground">
          PDF, PNG, JPG up to 10MB
        </p>
      </div>

      <button className="mt-1 text-xs font-medium text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground px-4 py-1.5 rounded-lg transition-all duration-200">
        Select Files
      </button>
    </div>
  );
}
