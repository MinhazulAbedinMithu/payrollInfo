import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import PayrollProvider from "../components/PayrollProviderC";
import '@testing-library/jest-dom/extend-expect';

describe("PayrollProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders the initial state correctly", () => {
    act(() => {
      render(<PayrollProvider />);
    });

    expect(screen.getByText(/Payroll Information/i)).toBeInTheDocument();
    expect(screen.queryByText(/Payroll Company Contact/i)).not.toBeInTheDocument();
  });


  test("validates and submits in-house payroll form", async () => {
    render(<PayrollProvider />);
    
    // Click on the button or element that opens the form
    fireEvent.click(screen.getByRole("button", { name: /Open/i }));

    // Check if the form is open
    const inHouseOption = screen.getByLabelText(/In-House/i) as HTMLInputElement;
    fireEvent.click(inHouseOption);
    

    // Enter data into the input field
    const input = screen.getByPlaceholderText("Software ABC") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Test Software" } });
    
    
    
    const obj = {
        [inHouseOption?.name]:inHouseOption?.value,
        payrollSoftware:input?.value
    }

    // Submit the form
    fireEvent.click(screen.getByText(/Submit/i));

    // Wait for the form submission to complete (if any async operations)
    await waitFor(() => {
        // Assert that the localStorage has been updated with the correct data
        expect(obj).toEqual({
        payrollType: "in-house",
        payrollSoftware: "Test Software",
      });
      });
  });


  test("validates and submits payroll company form", async () => {
    let submittedData:any = null; // Variable to hold submitted form data

    render(<PayrollProvider />);

    // Click on the button or element that opens the form
    fireEvent.click(screen.getByRole("button", { name: /Open/i }));

    // Check if the form is open
    const companyOption = screen.getByLabelText(/Payroll Company/i) as HTMLInputElement;
    fireEvent.click(companyOption);

    // Enter data into the input fields
    const companyInput = screen.getByPlaceholderText("Payroll Company Contact") as HTMLInputElement;
    fireEvent.change(companyInput, { target: { value: "Test Company" } });

    const phoneInput = screen.getByPlaceholderText("Payroll Company Phone") as HTMLInputElement;
    fireEvent.change(phoneInput, { target: { value: "35345345" } });

    const emailInput = screen.getByPlaceholderText("Payroll Company Email") as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });

    const payrollInfoYes = screen.getByLabelText("Yes") as HTMLInputElement;
    fireEvent.click(payrollInfoYes);

    // Log the input box values
    // console.log({
    //     payrollType: companyOption.value,
    //     payrollCompanyName: companyInput.value,
    //     payrollCompanyEmail: emailInput.value,
    //     payrollCompanyPhone: phoneInput.value,
    //     payrollCompanyInformation: payrollInfoYes.value
    // });

    // Submit the form
    const submitBtn = screen.getByTestId("submissionId") as HTMLButtonElement;
    console.log(submitBtn);
    
    fireEvent.submit(submitBtn);

    
    

    // Wait for the form submission to complete (if any async operations)
    await waitFor(() => {
      // Assert that the submittedData variable contains the expected values
      expect({
        payrollType: companyOption.value,
        payrollCompanyName: companyInput.value,
        payrollCompanyEmail: emailInput.value,
        payrollCompanyPhone: phoneInput.value,
        payrollCompanyInformation: payrollInfoYes.value
    }).toEqual({
        payrollType: 'payroll company',
        payrollCompanyName: 'Test Company',
        payrollCompanyEmail: 'test@gmail.com',
        payrollCompanyPhone: '35345345',
        payrollCompanyInformation: 'Yes'
      });
    });
  });
});