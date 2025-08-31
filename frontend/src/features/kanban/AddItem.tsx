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
        className="w-full text-center font-semibold text-sm px-3 py-2 rounded-md  hover:bg-gray-300 hover:text-black hover:border-solid transition-all border border-dashed"
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
        className="mt-1 w-full px-3 py-2 rounded-md border border-slate-300 bg-column-list"
      />
      <div className="flex gap-2">
        <button
          onClick={submit}
          className="px-3 py-1.5 rounded-md btn-plomo-primary text-white text-sm"
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
