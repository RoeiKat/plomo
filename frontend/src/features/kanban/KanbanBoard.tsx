import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectBoard, selectColumns, selectCards } from "./selectors";
import { Column } from "./Column";
import { AddItem } from "./AddItem";
import { addColumn, moveCard, reorderInColumn } from "./kanbanSlice";

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card as CardT } from "./types";
import { Card } from "./Card";

export function KanbanBoard() {
  const board = useAppSelector(selectBoard);
  const columns = useAppSelector(selectColumns);
  const cards = useAppSelector(selectCards);
  const dispatch = useAppDispatch();

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor)
  );

  const [activeId, setActiveId] = useState<string | null>(null);

  const activeCard: CardT | undefined = useMemo(
    () => (activeId ? cards[activeId] : undefined),
    [activeId, cards]
  );

  const onDragStart = (e: DragStartEvent) => {
    setActiveId(String(e.active.id));
  };

  const onDragOver = (_e: DragOverEvent) => {
    // no-op; we handle everything on drop
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    setActiveId(null);
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    let sourceColId: string | undefined;
    let destColId: string | undefined;
    let destIndex = 0;

    for (const colId of board.columnOrder) {
      const col = columns[colId];
      const fromIdx = col.cardIds.indexOf(activeId);
      if (fromIdx !== -1) sourceColId = colId;

      const overIdx = col.cardIds.indexOf(overId);
      if (overIdx !== -1) {
        destColId = colId;
        destIndex = overIdx;
      }
    }

    // Dropped on empty column area: over.id === columnId
    if (!destColId && columns[overId]) {
      destColId = overId;
      destIndex = columns[overId].cardIds.length;
    }

    if (!sourceColId || !destColId) return;

    if (sourceColId === destColId) {
      const fromIdx = columns[sourceColId].cardIds.indexOf(activeId);
      if (fromIdx !== -1 && fromIdx !== destIndex) {
        dispatch(
          reorderInColumn({
            colId: sourceColId,
            sourceIndex: fromIdx,
            destIndex,
          })
        );
      }
    } else {
      dispatch(
        moveCard({ cardId: activeId, sourceColId, destColId, destIndex })
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto ">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={board.columnOrder}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {board.columnOrder.map((colId) => {
              const col = columns[colId];
              const cardList = col.cardIds
                .map((id) => cards[id])
                .filter(Boolean);
              return (
                <div key={col.id} id={col.id}>
                  <Column column={col} cards={cardList} activeId={activeId} />
                </div>
              );
            })}
            <div className="w-80 flex-shrink-0">
              <AddItem
                placeholder="Add a new List"
                onAdd={(t) => dispatch(addColumn(t))}
              />
            </div>
          </div>
        </SortableContext>

        <DragOverlay dropAnimation={{ duration: 150 }}>
          {activeCard ? (
            <div className="w-80">
              <Card card={activeCard} columnId="overlay" />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
