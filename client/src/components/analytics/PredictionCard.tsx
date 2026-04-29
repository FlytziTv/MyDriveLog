export function PredictionCard({
  type,
  title,
  description,
}: {
  type: "blue" | "yellow" | "green" | "purple" | "red";
  title: string;
  description: React.ReactNode;
}) {
  const config = {
    blue: {
      bg: "bg-blue-50 border-blue-200",
      title: "text-blue-600",
    },
    yellow: {
      bg: "bg-yellow-50 border-yellow-200",
      title: "text-yellow-600",
    },
    green: {
      bg: "bg-green-50 border-green-200",
      title: "text-green-600",
    },
    purple: {
      bg: "bg-purple-50 border-purple-200",
      title: "text-purple-600",
    },
    red: {
      bg: "bg-red-50 border-red-200",
      title: "text-red-600",
    },
  };

  const { bg, title: titleColor } = config[type];

  return (
    <div
      className={`relative col-span-1 flex gap-3 rounded-xl border px-4 py-3.5 cursor-default ${bg}`}
    >
      <div className="flex flex-col gap-1">
        <h4 className={`text-sm font-semibold leading-snug ${titleColor}`}>
          {title}
        </h4>
        <p className={`text-sm leading-relaxed`}>{description}</p>
      </div>
    </div>
  );
}
