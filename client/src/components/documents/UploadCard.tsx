import { FileUp } from "lucide-react";

export default function UploadCard() {
  return (
    <div className="h-64 w-full flex flex-col items-center gap-3 justify-center border-dashed border-2 hover:border-primary rounded-md transition-colors duration-500 cursor-pointer">
      <FileUp size={48} className="text-muted-foreground" />
      <div className="flex flex-col items-center gap-2">
        <p className="text-base ">Drag and drop your files here</p>
        <p className="text-sm text-muted-foreground">or click to browse</p>
      </div>
      <button className="bg-transparent text-primary border border-muted-foreground/40 font-medium hover:bg-primary/90 px-6 py-2 rounded-lg transition-colors duration-300">
        Select Files
      </button>
    </div>
  );
}
