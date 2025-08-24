import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import { KanbanBoard } from "../KanbanBoard";

describe("KanbanBoard", () => {
  it("renders initial columns", () => {
    render(
      <Provider store={store}>
        <KanbanBoard />
      </Provider>
    );
    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("adds a new column", () => {
    render(
      <Provider store={store}>
        <KanbanBoard />
      </Provider>
    );
    fireEvent.click(screen.getByText("+ Add column"));
    const input = screen.getByPlaceholderText("Add column");
    fireEvent.change(input, { target: { value: "Testing" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(screen.getByText("Testing")).toBeInTheDocument();
  });
});
