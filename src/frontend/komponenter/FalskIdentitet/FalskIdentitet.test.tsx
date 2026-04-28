import React from 'react';

import { expect } from 'vitest';

import { FalskIdentitet } from './FalskIdentitet';
import { render } from '../../testutils/testrender';

describe('FalskIdentitet', () => {
    test('skal rendre komponent som forventet når erHeading er false', () => {
        const { screen } = render(<FalskIdentitet erHeading={false} />);
        const mark = screen.getByRole('mark');
        const span = mark?.parentElement;

        expect(mark).toBeInTheDocument();
        expect(mark).toHaveTextContent('Falsk identitet');
        expect(span).toBeInTheDocument();
        expect(span).toHaveClass('aksel-body-short');
    });

    test('skal rendre komponent som forventet når erHeading er true', () => {
        const { screen } = render(<FalskIdentitet erHeading />);
        const mark = screen.getByRole('mark');
        const span = mark?.parentElement;

        expect(mark).toBeInTheDocument();
        expect(mark).toHaveTextContent('Falsk identitet');
        expect(span).toBeInTheDocument();
        expect(span).toHaveClass('aksel-heading');
    });
});
