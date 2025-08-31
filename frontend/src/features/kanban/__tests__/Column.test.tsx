import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import kanbanReducer from "../kanbanSlice";
import { Column } from "../Column";
import { initialData } from "../initialData";
import { DndContext } from "@dnd-kit/core";

type KanbanState = ReturnType<typeof kanbanReducer>;
type TestState = { kanban: KanbanState };
const makeStore = (preloaded?: TestState) =>
  configureStore({
    reducer: { kanban: kanbanReducer },
    preloadedState: preloaded,
  });
type TestStore = ReturnType<typeof makeStore>;

function renderColumn(store: TestStore) {
  const state = store.getState().kanban; // now correctly typed
  const col = state.columns["col-1"];
  const cards = col.cardIds.map((id: string) => state.cards[id]);

  return render(
    <Provider store={store}>
      <DndContext>
        <Column column={col} cards={cards} activeId={null} />
      </DndContext>
    </Provider>
  );
}

describe("Column", () => {
  it("renders its cards", () => {
    const store = makeStore({ kanban: initialData as KanbanState });
    renderColumn(store);
    expect(
      screen.getByText(/Redux store as state management/i)
    ).toBeInTheDocument();
  });

  it("adds a card", () => {
    const store = makeStore({ kanban: initialData as KanbanState });
    const { rerender } = renderColumn(store);

    fireEvent.click(screen.getByText("+ Add Task"));
    const input = screen.getByPlaceholderText("Add Task");
    fireEvent.change(input, { target: { value: "New card" } });
    fireEvent.keyDown(input, { key: "Enter" });

    const state = store.getState().kanban;
    const col = state.columns["col-1"];
    const cardsNow = col.cardIds.map((id: string) => state.cards[id]);
    expect(cardsNow.some((c) => c.title === "New card")).toBe(true);

    rerender(
      <Provider store={store}>
        <DndContext>
          <Column column={col} cards={cardsNow} activeId={null} />
        </DndContext>
      </Provider>
    );
    expect(screen.getByText("New card")).toBeInTheDocument();
  });
});
