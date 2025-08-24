import { AddItem } from "./AddItem";
import type { Column as ColumnT, Card as CardT } from "./types";
import { useAppDispatch } from "../../store/hooks";
import { addCard, deleteColumn, renameColumn } from "./kanbanSlice";
import { Card } from "./Card";
import { useState } from "react";

import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";

function SortableCard({
  card,
  columnId,
  dimmed,
}: {
  card: CardT;
  columnId: string;
  dimmed: boolean;
}) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    // keep a placeholder in the list while dragging
    opacity: isDragging || dimmed ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card card={card} columnId={columnId} />
    </div>
  );
}

export function Column({
  column,
  cards,
  activeId,
}: {
  column: ColumnT;
  cards: CardT[];
  /** id of the currently dragged card (for dimming placeholder) */
  activeId: string | null;
}) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(column.title);
  const [editing, setEditing] = useState(false);

  // Make the whole column a droppable target (so empty-area drops work)
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div
      ref={setNodeRef}
      className="w-80 flex-shrink-0 bg-slate-100/60 rounded-2xl p-3 space-y-3 border border-slate-200"
    >
      <div className="flex items-center justify-between gap-2">
        {editing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              setEditing(false);
              const v = title.trim();
              if (v && v !== column.title)
                dispatch(renameColumn({ id: column.id, title: v }));
            }}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.target as HTMLInputElement).blur()
            }
            className="px-2 py-1 rounded-md border border-slate-300 bg-white text-sm w-full"
          />
        ) : (
          <h2
            className="font-semibold tracking-tight text-slate-800"
            onClick={() => setEditing(true)}
          >
            {column.title}
          </h2>
        )}
        <button
          aria-label="Delete column"
          className="text-slate-500 hover:text-red-600"
          onClick={() => dispatch(deleteColumn({ id: column.id }))}
        >
          🗑️
        </button>
      </div>

      <SortableContext
        items={cards.map((c) => c.id)}
        strategy={rectSortingStrategy}
      >
        <div className="space-y-2 min-h-2">
          {cards.map((card) => (
            <SortableCard
              key={card.id}
              card={card}
              columnId={column.id}
              dimmed={activeId === card.id}
            />
          ))}
        </div>
      </SortableContext>

      <AddItem
        placeholder="Add card"
        onAdd={(t) => dispatch(addCard(column.id, t))}
      />
    </div>
  );
}
