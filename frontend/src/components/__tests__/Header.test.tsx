import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

it("shows app title and tech hint", () => {
  render(<Header />);
  expect(screen.getByText(/Plomo/i)).toBeInTheDocument();
  expect(
    screen.getByText(/Dummy data • Browser Caching • Kanban/i)
  ).toBeInTheDocument();
});
