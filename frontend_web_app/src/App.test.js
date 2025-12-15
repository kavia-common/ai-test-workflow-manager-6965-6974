import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders brand name", () => {
  render(<App />);
  const elt = screen.getByText(/AI Test Workflow Manager/i);
  expect(elt).toBeInTheDocument();
});
