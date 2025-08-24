import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

it("shows app title and tech hint", () => {
  render(<Header />);
  expect(screen.getByText(/Plomo • Kanban/i)).toBeInTheDocument();
  expect(
    screen.getByText(/Dummy data • Redux • dnd-kit • Tailwind/i)
  ).toBeInTheDocument();
});
