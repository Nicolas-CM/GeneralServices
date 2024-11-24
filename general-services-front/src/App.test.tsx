import React from 'react';
// @ts-expect-error TS(2305): Module '"@testing-library/react"' has no exported ... Remove this comment to see the full error message
import { render, screen, test, expect } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
