import type { KanbanState } from "./types";

export const initialData: KanbanState = {
  board: {
    id: "board-1",
    title: "Plomo Board",
    columnOrder: ["col-1", "col-2", "col-3"],
  },
  columns: {
    "col-1": { id: "col-1", title: "To Do", cardIds: ["c-1", "c-2"] },
    "col-2": { id: "col-2", title: "In Progress", cardIds: ["c-3"] },
    "col-3": { id: "col-3", title: "Done", cardIds: ["c-4"] },
  },
  cards: {
    "c-1": { id: "c-1", title: "Set up Redux store" },
    "c-2": { id: "c-2", title: "Scaffold components" },
    "c-3": { id: "c-3", title: "Drag & drop with dnd-kit" },
    "c-4": { id: "c-4", title: "Tailwind styling" },
  },
};
