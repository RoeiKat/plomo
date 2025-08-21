import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import kanbanReducer from "../kanbanSlice";
import { Card } from "../Card";
import { initialData } from "../initialData";

describe("Card", () => {
  it("edits and deletes", () => {
    const store = configureStore({
      reducer: { kanban: kanbanReducer },
      preloadedState: { kanban: initialData },
    });
    const card = initialData.cards["c-1"];

    render(
      <Provider store={store}>
        <Card card={card} columnId="col-1" />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText("Edit card"));
    const input = screen.getByDisplayValue(card.title);
    fireEvent.change(input, { target: { value: "Updated title" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("Updated title")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Delete card"));
    expect(screen.queryByText("Updated title")).not.toBeInTheDocument();
  });
});
