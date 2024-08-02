// src/pages/Homepage.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';
import dataReducer, { fetchData } from '../store/features/dataSlice';
import Home from '../pages/Home';

fetchMock.enableMocks();

const renderWithProviders = (ui: React.ReactElement, { reduxState } = { reduxState: {} }) => {
  const store = configureStore({
    reducer: { data: dataReducer },
    preloadedState: reduxState,
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

beforeEach(() => {
  fetchMock.resetMocks();
});

test('fetches and displays data from API', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ data: 'Salesforce data' }));

  renderWithProviders(<Home />);

  // Initially shows loading state
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Wait for the data to be displayed
  await waitFor(() => {
    expect(screen.getByText(/Data: Salesforce data/i)).toBeInTheDocument();
  });

  // Ensure loading message is no longer present
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});