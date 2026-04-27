export default function InputGroup({
  id,
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
