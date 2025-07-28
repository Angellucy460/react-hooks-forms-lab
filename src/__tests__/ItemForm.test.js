import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemForm from "../components/ItemForm";
import App from "../components/App";

test("calls the onItemFormSubmit callback prop when the form is submitted", () => {
  const onItemFormSubmit = jest.fn();
  render(<ItemForm onItemFormSubmit={onItemFormSubmit} />);

  const nameInput = screen.getByLabelText(/Name/i);
  const categorySelect = screen.getByLabelText(/Category/i);
  const submitButton = screen.getByRole("button", { name: /Add to List/i });

  fireEvent.change(nameInput, { target: { value: "Ice Cream" } });
  fireEvent.change(categorySelect, { target: { value: "Dessert" } });
  fireEvent.click(submitButton);

  expect(onItemFormSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      id: expect.any(String),
      name: "Ice Cream",
      category: "Dessert",
    })
  );
});

test("adds a new item to the list when the form is submitted", () => {
  render(<App />);

  const nameInput = screen.getAllByLabelText(/Name/i)[0];
  const categorySelect = screen.getAllByLabelText(/Category/i)[0];
  const submitButton = screen.getAllByRole("button", { name: /Add to List/i })[0];

  const initialDessertCount = screen.queryAllByText(/Dessert/).length;

  fireEvent.change(nameInput, { target: { value: "Ice Cream" } });
  fireEvent.change(categorySelect, { target: { value: "Dessert" } });
  fireEvent.click(submitButton);

  expect(screen.queryByText(/Ice Cream/)).toBeInTheDocument();
  expect(screen.queryAllByText(/Dessert/).length).toBe(initialDessertCount + 1);
});