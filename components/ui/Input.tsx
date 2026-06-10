import { ChevronDown, Eye, EyeOff } from "lucide-react";

function LabelBase({ label }: { label: string }) {
  return (
    <label className="block text-xs font-medium text-neutral-500 px-1">
      {label}
    </label>
  );
}

function InputBase({
  type,
  placeholder,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full h-10 px-3.5 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-transparent transition-all"
      {...props}
    />
  );
}

function InputUnit({
  type,
  placeholder,
  unit,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { unit: string }) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-10 px-3.5 pr-12 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-transparent transition-all"
        {...props}
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 text-[14px]">
        {unit}
      </span>
    </div>
  );
}

function PasswordInput({
  placeholder,
  showPassword,
  setShowPassword,
  ...props
}: {
  placeholder: string;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="w-full h-10 px-3.5 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-transparent transition-all"
        {...props}
      />
      <button
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        {showPassword ? (
          <EyeOff className="text-neutral-400" size={18} />
        ) : (
          <Eye className="text-neutral-400" size={18} />
        )}
      </button>
    </div>
  );
}

function SelectBase({
  options,
  ...props
}: {
  options: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className="w-full h-10 px-3.5 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-transparent transition-all appearance-none"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none"
        strokeWidth={1.5}
      />
    </div>
  );
}

function TextareaBase({
  placeholder,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      placeholder={placeholder}
      className="w-full px-4.5 py-3.5 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-transparent transition-all resize-none"
      {...props}
    />
  );
}

function GroupInput({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5">{children}</div>;
}

export {
  LabelBase,
  InputBase,
  InputUnit,
  PasswordInput,
  SelectBase,
  TextareaBase,
  GroupInput,
};
