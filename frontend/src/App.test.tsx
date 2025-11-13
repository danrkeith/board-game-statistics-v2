import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from './App';

test('should render navbar with title', () => {
    render(<App />);

    expect(screen.getByText('Board Game Statistics')).toBeInTheDocument();
});

test('should render home page by default', () => {
    render(<App />);

    expect(screen.getByText('Welcome!')).toBeInTheDocument();
});
