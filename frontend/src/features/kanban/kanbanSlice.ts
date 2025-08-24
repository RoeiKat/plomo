import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import type { KanbanState, ID, Card } from "./types";
import { initialData } from "./initialData";

type MoveCardPayload = {
  cardId: ID;
  sourceColId: ID;
  destColId: ID;
  destIndex: number;
};

type ReorderInColPayload = {
  colId: ID;
  sourceIndex: number;
  destIndex: number;
};

type MoveColumnPayload = {
  sourceIndex: number;
  destIndex: number;
};

const slice = createSlice({
  name: "kanban",
  initialState: initialData as KanbanState,
  reducers: {
    addColumn: {
      reducer(state, action: PayloadAction<{ id: ID; title: string }>) {
        const { id, title } = action.payload;
        state.columns[id] = { id, title, cardIds: [] };
        state.board.columnOrder.push(id);
      },
      prepare(title: string) {
        return { payload: { id: `col-${nanoid(6)}`, title } };
      },
    },
    renameColumn(state, action: PayloadAction<{ id: ID; title: string }>) {
      const col = state.columns[action.payload.id];
      if (col) col.title = action.payload.title;
    },
    deleteColumn(state, action: PayloadAction<{ id: ID }>) {
      const { id } = action.payload;
      const col = state.columns[id];
      if (!col) return;
      for (const cardId of col.cardIds) delete state.cards[cardId];
      delete state.columns[id];
      state.board.columnOrder = state.board.columnOrder.filter((c) => c !== id);
    },
    addCard: {
      reducer(state, action: PayloadAction<{ columnId: ID; card: Card }>) {
        const { columnId, card } = action.payload;
        state.cards[card.id] = card;
        state.columns[columnId].cardIds.push(card.id);
      },
      prepare(columnId: ID, title: string) {
        return { payload: { columnId, card: { id: `c-${nanoid(6)}`, title } } };
      },
    },
    editCard(
      state,
      action: PayloadAction<{ id: ID; title: string; description?: string }>
    ) {
      const card = state.cards[action.payload.id];
      if (card) {
        card.title = action.payload.title;
        card.description = action.payload.description;
      }
    },
    deleteCard(state, action: PayloadAction<{ columnId: ID; cardId: ID }>) {
      const { columnId, cardId } = action.payload;
      state.columns[columnId].cardIds = state.columns[columnId].cardIds.filter(
        (id) => id !== cardId
      );
      delete state.cards[cardId];
    },
    moveCard(state, action: PayloadAction<MoveCardPayload>) {
      const { cardId, sourceColId, destColId, destIndex } = action.payload;
      const source = state.columns[sourceColId];
      const dest = state.columns[destColId];
      if (!source || !dest) return;
      const fromIdx = source.cardIds.indexOf(cardId);
      if (fromIdx === -1) return;
      source.cardIds.splice(fromIdx, 1);
      dest.cardIds.splice(destIndex, 0, cardId);
    },
    reorderInColumn(state, action: PayloadAction<ReorderInColPayload>) {
      const { colId, sourceIndex, destIndex } = action.payload;
      const col = state.columns[colId];
      if (!col) return;
      const [moved] = col.cardIds.splice(sourceIndex, 1);
      col.cardIds.splice(destIndex, 0, moved);
    },
    moveColumn(state, action: PayloadAction<MoveColumnPayload>) {
      const { sourceIndex, destIndex } = action.payload;
      const [moved] = state.board.columnOrder.splice(sourceIndex, 1);
      state.board.columnOrder.splice(destIndex, 0, moved);
    },
  },
});

export const {
  addColumn,
  renameColumn,
  deleteColumn,
  addCard,
  editCard,
  deleteCard,
  moveCard,
  reorderInColumn,
  moveColumn,
} = slice.actions;

export default slice.reducer;
