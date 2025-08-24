import type { RootState } from "../../store/store";

export const selectBoard = (s: RootState) => s.kanban.board;
export const selectColumns = (s: RootState) => s.kanban.columns;
export const selectCards = (s: RootState) => s.kanban.cards;
