export function SmartMessage({
  type,
  description,
}: {
  type: "blue" | "yellow" | "green" | "purple" | "red";
  description: React.ReactNode;
}) {
  const config = {
    blue: {
      bg: "bg-blue-50 border-blue-200",
      text: "text-blue-950",
    },
    yellow: {
      bg: "bg-yellow-50 border-yellow-200",
      text: "text-yellow-950",
    },
    green: {
      bg: "bg-green-50 border-green-200",
      text: "text-green-950",
    },
    purple: {
      bg: "bg-purple-50 border-purple-200",
      text: "text-purple-950",
    },
    red: {
      bg: "bg-red-50 border-red-200",
      text: "text-red-950",
    },
  };

  const { bg, text } = config[type];

  return (
    <div className={`flex gap-3 px-4 py-3 rounded-lg border ${bg}`}>
      <p className={`text-sm leading-relaxed ${text}`}>{description}</p>
    </div>
  );
}
