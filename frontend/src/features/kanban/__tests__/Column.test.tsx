import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import kanbanReducer from "../kanbanSlice";
import { Column } from "../Column";
import { initialData } from "../initialData";

function setup() {
  const store = configureStore({
    reducer: { kanban: kanbanReducer },
    preloadedState: { kanban: initialData },
  });
  const col = initialData.columns["col-1"];
  const cards = col.cardIds.map((id) => initialData.cards[id]);
  render(
    <Provider store={store}>
      <Column column={col} cards={cards} activeId={null} />
    </Provider>
  );
}

describe("Column", () => {
  it("renders its cards", () => {
    setup();
    expect(screen.getByText(/Set up Redux store/)).toBeInTheDocument();
  });

  it("adds a card", () => {
    setup();
    fireEvent.click(screen.getByText("+ Add card"));
    const input = screen.getByPlaceholderText("Add card");
    fireEvent.change(input, { target: { value: "New card" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("New card")).toBeInTheDocument();
  });
});
