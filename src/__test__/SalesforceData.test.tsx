import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import dataReducer, { fetchData } from '../store/features/dataSlice';
import Home from '../pages/Home';

const renderWithStore = (store: ReturnType<typeof configureStore>) => {
  return render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

describe('Home', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        data: dataReducer,
      },
    });
  });

  it('should display loading state', () => {
    store.dispatch(fetchData.pending(''));
    renderWithStore(store);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('should display data on successful fetch', async () => {
    const mockData = { key: 'value' };
    store.dispatch(fetchData.fulfilled(mockData, ''));

    renderWithStore(store);
    expect(screen.getByText(/Salesforce data/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/"key": "value"/i)).toBeInTheDocument();
    });
  });

  it('should display error message on failed fetch', async () => {
    const errorMessage = 'Failed to fetch';
    store.dispatch(fetchData.rejected(new Error(errorMessage), ''));

    renderWithStore(store);
    expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
  });
});
