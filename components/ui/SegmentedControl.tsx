export default function SegmentedControl({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex bg-neutral-100 rounded-lg p-1 gap-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex-1 h-8 rounded-md text-[13px] font-medium transition-colors ${value === opt.value ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500"}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
