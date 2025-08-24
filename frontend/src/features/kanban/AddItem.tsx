import { useState } from "react";

export function AddItem({
  placeholder,
  onAdd,
}: {
  placeholder: string;
  onAdd: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const submit = () => {
    const v = value.trim();
    if (!v) return;
    onAdd(v);
    setValue("");
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left text-sm px-3 py-2 rounded-md bg-slate-100 hover:bg-slate-200"
      >
        + {placeholder}
      </button>
    );
  }

  return (
    <div className="space-y-2">
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white"
      />
      <div className="flex gap-2">
        <button
          onClick={submit}
          className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm"
        >
          Add
        </button>
        <button
          onClick={() => {
            setOpen(false);
            setValue("");
          }}
          className="px-3 py-1.5 rounded-md text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
