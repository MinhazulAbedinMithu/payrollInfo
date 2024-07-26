import React from "react";
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import CompanyDetails from "../components/company/CompanyDetails";

describe("CompanyDetails", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders the initial state correctly", () => {
    render(<CompanyDetails />);
    expect(screen.getByText(/Company Details/i)).toBeInTheDocument();
  });

  test("validates and submits Identifier form", async () => {
    const detailsSubmit = jest.fn();
    render(<CompanyDetails onSubmitProp={detailsSubmit} />);

    // Click on the button or element that opens the form
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Open/i }));
    });

    // Enter data into the input fields
    const fiscalYear = await screen.findByTestId('fiscalYear') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(fiscalYear, { target: { value: 'Fiscal year' } });
    });

    const noOfEmployee = await screen.findByTestId('noOfEmployee') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(noOfEmployee, { target: { value: '45' } });
    });

    const inceptionDate = await screen.findByTestId('inceptionDate') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(inceptionDate, { target: { value: '2024-07-24' } });
    });

    const formEntity = await screen.findByTestId('formEntity') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(formEntity, { target: { value: 'Test formEntity' } });
    });

    const submitBtn = screen.getByTestId('detailsSubmit') as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    // Wait for the form submission to complete (if any async operations)
    await waitFor(() => {
      expect(
        {
        fiscalYear: 'Fiscal year',
        noOfEmployee: 45,
        inceptionDate: '2024-07-24',
        formEntity: 'Test formEntity'
      }
    ).toEqual({
        fiscalYear: 'Fiscal year',
        noOfEmployee: 45,
        inceptionDate: '2024-07-24',
        formEntity: 'Test formEntity'
      });
    });
  });
});
