// import React from "react";
// import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import '@testing-library/jest-dom/extend-expect';
// import CompanyDetails from "../components/company/CompanyDetails";

// describe("CompanyDetails", () => {
//   beforeEach(() => {
//     localStorage.clear();
//   });

//   test("renders the initial state correctly", () => {
//     render(<CompanyDetails />);

//     expect(screen.getByText(/Company Details/i)).toBeInTheDocument();
//     // expect(screen.queryByText(/Payroll Company Contact/i)).not.toBeInTheDocument();
//   });

//   test("validates and submits Identifier form", async () => {
//     const detailsSubmit = jest.fn();
//     render(<CompanyDetails onSubmitProp={detailsSubmit} />);

//     // Click on the button or element that opens the form
//     fireEvent.click(screen.getByRole("button", { name: /Open/i }));

//     // Check if the form is open
//     // Enter data into the input fields
//     const fiscalYear = await screen.findByTestId('fiscalYear') as HTMLInputElement;
//     fireEvent.change(fiscalYear, { target: { value: 'Fiscal year' } });

//     const noOfEmployee = await screen.findByTestId('noOfEmployee') as HTMLInputElement;
//     fireEvent.change(noOfEmployee, { target: { value: "45" } });

//     const inceptionDate = await screen.findByTestId('inceptionDate') as HTMLInputElement;
//     fireEvent.change(inceptionDate, { target: { value: '4353453' } });

//     const formEntity = await screen.findByTestId('formEntity') as HTMLInputElement;
//     fireEvent.change(formEntity, { target: { value: 'Test formEntity' } });

//     const submitBtn = screen.getByTestId('detailsSubmit') as HTMLButtonElement;
//     fireEvent.click(submitBtn); 

//     // Wait for the form submission to complete (if any async operations)
//     await waitFor(() => {
//       expect(detailsSubmit).toHaveBeenCalledWith({
        
//             formEntity: "sadfsdf",
//             inceptionDate: "2024-07-24",
//             noOfEmployee: 34543,
//             fiscalYear: "sdfasda"
        
//       });
//     });
//   });
// });
