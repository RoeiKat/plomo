import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import App from "../App";

describe("App", () => {
  it("renders Header and board", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText(/Plomo/i)).toBeInTheDocument();
    expect(screen.getByText("To Do")).toBeInTheDocument();
  });
});
