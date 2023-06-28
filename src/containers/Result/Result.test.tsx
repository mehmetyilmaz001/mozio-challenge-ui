import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Result from '.';
import useFetchDistance from './useFetchDistance';

jest.mock('./useFetchDistance');

describe('Result component', () => {
  test('renders loading skeleton when loading is true', () => {
    (useFetchDistance as jest.Mock).mockReturnValue({
     distance: { totalDistance: 100 },
      lineItems: [],
      loading: true,
      error: null,
    });

    render(<Result />);

    expect(screen.queryAllByText('100 km')).toHaveLength(0);
  });

  test('renders error message when error is present', () => {
    (useFetchDistance as jest.Mock).mockReturnValue({
      distance: null,
      lineItems: [],
      loading: false,
      error: 'Custom Error',
    });

    render(<Result />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  test('renders result UI when distance and line items are present', () => {
    (useFetchDistance as jest.Mock).mockReturnValue({
      distance: { totalDistance: 100 },
      lineItems: [
        { id: '1', name: 'Item 1', info: 'Info 1' },
        { id: '2', name: 'Item 2', info: 'Info 2' },
      ],
      loading: false,
      error: null,
    });

    render(<Result />);

    expect(screen.getByText('100 km')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  
});
