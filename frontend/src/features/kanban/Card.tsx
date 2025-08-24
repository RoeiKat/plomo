import type { Card as CardT } from "./types";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { deleteCard, editCard } from "./kanbanSlice";

export function Card({ card, columnId }: { card: CardT; columnId: string }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const dispatch = useAppDispatch();

  const onSave = () => {
    const v = title.trim();
    if (!v) return;
    dispatch(editCard({ id: card.id, title: v }));
    setEditing(false);
  };

  return (
    <div className="rounded-xl bg-white p-3 shadow-sm border border-slate-200">
      {editing ? (
        <div className="space-y-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSave();
            }}
            className="w-full px-3 py-2 rounded-md border border-slate-300"
          />
          <div className="flex gap-2">
            <button
              onClick={onSave}
              className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-3 py-1.5 rounded-md text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-3">
          <div className="text-sm">{card.title}</div>
          <div className="flex items-center gap-1">
            <button
              aria-label="Edit card"
              className="text-slate-500 hover:text-slate-700"
              onClick={() => setEditing(true)}
            >
              ✏️
            </button>
            <button
              aria-label="Delete card"
              className="text-slate-500 hover:text-red-600"
              onClick={() =>
                dispatch(deleteCard({ columnId, cardId: card.id }))
              }
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
