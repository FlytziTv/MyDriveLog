import { Plus } from "lucide-react";

export function HeaderDashboard({
  title,
  description,
  buttonText = "Add Expense",
  button = true,
}: {
  title: string;
  description?: string;
  buttonText?: string;
  button?: boolean;
}) {
  return (
    <div className="w-full flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {button && (
        <button className="bg-primary text-primary-foreground flex flex-row items-center justify-center gap-2 text-sm hover:bg-primary/80 px-4 py-2 rounded-md transition-colors duration-200">
          <Plus size={16} />
          {buttonText}
        </button>
      )}
    </div>
  );
}
