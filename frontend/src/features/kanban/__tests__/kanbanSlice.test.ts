import reducer, {
  addColumn,
  addCard,
  deleteCard,
  moveCard,
  reorderInColumn,
} from "../kanbanSlice";
import { initialData } from "../initialData";

describe("kanbanSlice", () => {
  it("adds a column", () => {
    const state = reducer(initialData, addColumn("New"));
    const newId = state.board.columnOrder.at(-1)!;
    expect(state.columns[newId].title).toBe("New");
  });

  it("adds and deletes a card", () => {
    let state = reducer(initialData, addCard("col-1", "Hello"));
    const newCardId = state.columns["col-1"].cardIds.at(-1)!;
    expect(state.cards[newCardId].title).toBe("Hello");
    state = reducer(
      state,
      deleteCard({ columnId: "col-1", cardId: newCardId })
    );
    expect(state.columns["col-1"].cardIds.includes(newCardId)).toBe(false);
    expect(state.cards[newCardId]).toBeUndefined();
  });

  it("reorders within a column", () => {
    const base = structuredClone(initialData);
    const next = reducer(
      base,
      reorderInColumn({ colId: "col-1", sourceIndex: 0, destIndex: 1 })
    );
    expect(next.columns["col-1"].cardIds[1]).toBe("c-1");
  });

  it("moves a card across columns", () => {
    const base = structuredClone(initialData);
    const next = reducer(
      base,
      moveCard({
        cardId: "c-1",
        sourceColId: "col-1",
        destColId: "col-2",
        destIndex: 1,
      })
    );
    expect(next.columns["col-1"].cardIds.includes("c-1")).toBe(false);
    expect(next.columns["col-2"].cardIds[1]).toBe("c-1");
  });
});
