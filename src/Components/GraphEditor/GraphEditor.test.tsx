import React from 'react';
import { render, screen } from '@testing-library/react';
import GraphEditor from './GraphEditor';

test('renders learn react link', () => {
  render(<GraphEditor />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
