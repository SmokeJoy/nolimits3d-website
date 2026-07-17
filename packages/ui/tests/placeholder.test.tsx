import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Placeholder Test', () => {
  it('renders successfully', () => {
    render(<div>Hello Atlas</div>);
    expect(screen.getByText('Hello Atlas')).toBeInTheDocument();
  });
});
