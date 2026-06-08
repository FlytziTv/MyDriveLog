import { Eye, EyeOff } from "lucide-react";

function InputBase({
  type,
  placeholder,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full h-10 px-3.5 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
      {...props}
    />
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
        className="w-full h-10 px-3.5 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
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

export { InputBase, PasswordInput };
