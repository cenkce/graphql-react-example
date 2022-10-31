import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  const context = render(<App />);

  expect(context.container.children[0].className).toBe("App");
});
