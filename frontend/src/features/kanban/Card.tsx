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
    // <div className="rounded-xl bg-white p-3 shadow-sm border border-slate-200">
    <div className="rounded-md bg-card-task p-3 shadow-md">
      {editing ? (
        <div className="text-sm space-y-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSave();
            }}
            className="w-full px-3 py-2 rounded-md border border-slate-300 bg-card-task"
          />
          <div className="flex gap-2">
            <button
              onClick={onSave}
              className="px-3 py-1.5 rounded-md btn-plomo-primary text-white text-sm"
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
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold flex-1 min-w-0 break-words whitespace-normal">
            {card.title}
          </div>
          <div className="flex items-center gap-1">
            <button
              aria-label="Edit card"
              className="svg-btn hover:bg-orange-300 transition-all rounded-md p-1"
              onClick={() => setEditing(true)}
            >
              <img
                src="https://res.cloudinary.com/dm20uwmki/image/upload/v1756643444/edit-fill-1480-svgrepo-com_trdjex.svg"
                alt="editCard"
              />
            </button>
            <button
              aria-label="Delete card"
              className="svg-btn hover:bg-red-300 transition-all rounded-md p-1"
              onClick={() =>
                dispatch(deleteCard({ columnId, cardId: card.id }))
              }
            >
              <img
                src="https://res.cloudinary.com/dm20uwmki/image/upload/v1756643444/delete-1-svgrepo-com_kwl6eh.svg"
                alt="deleteColumn"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
