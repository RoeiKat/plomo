export type ID = string;

export interface Card {
  id: ID;
  title: string;
  description?: string;
}

export interface Column {
  id: ID;
  title: string;
  cardIds: ID[];
}

export interface Board {
  id: ID;
  title: string;
  columnOrder: ID[];
}

export interface KanbanState {
  board: Board;
  columns: Record<ID, Column>;
  cards: Record<ID, Card>;
}
