import React from 'react';
import { render, screen } from '@testing-library/react';
import MathGrass from './MathGrass';

test('renders learn react link', () => {
  render(<MathGrass />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
