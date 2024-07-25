import React from "react";
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import CompanyIdentifier from "../components/company/CompanyIdentifier";

describe("CompanyIdentifier", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders the initial state correctly", () => {
    render(<CompanyIdentifier />);
    expect(screen.getByText(/Company Identifier/i)).toBeInTheDocument();
  });

  test("validates and submits Identifier form", async () => {
    const mockSubmit = jest.fn();
    render(<CompanyIdentifier onSubmitProp={mockSubmit} />);

    // Click on the button or element that opens the form
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Open/i }));
    });

    // Enter data into the input fields
    const legalName = await screen.findByTestId('legalName') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(legalName, { target: { value: 'Test name' } });
    });

    const commonName = await screen.findByTestId('commonName') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(commonName, { target: { value: 'Test Common' } });
    });

    const ein = await screen.findByTestId('ein') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(ein, { target: { value: '4353453' } });
    });

    const taxId = await screen.findByTestId('taxId') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(taxId, { target: { value: 'Test tax id' } });
    });

    const submitBtn = screen.getByTestId('identifySubmit') as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    // Wait for the form submission to complete (if any async operations)
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        legalName: 'Test name',
        commonName: 'Test Common',
        ein: 4353453,
        taxId: 'Test tax id',
      });
    });
  });
});
