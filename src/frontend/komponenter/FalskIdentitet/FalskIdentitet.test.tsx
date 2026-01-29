import React from 'react';

import { expect } from 'vitest';

import { FalskIdentitet } from './FalskIdentitet';
import { render } from '../../testutils/testrender';

describe('FalskIdentitet', () => {
    test('skal rendre komponent som forventet når harFalskIdentitet er true', () => {
        const { screen } = render(<FalskIdentitet harFalskIdentitet={true} />);
        const mark = screen.queryByRole('mark');
        const span = mark?.parentElement;
        const skillelinjeParagraf = screen.queryByText('|');

        expect(mark).toBeInTheDocument();
        expect(mark).toHaveTextContent('Falsk identitet');
        expect(span).toBeInTheDocument();
        expect(span).toHaveClass('navds-body-short');
        expect(skillelinjeParagraf).toBeInTheDocument();
        expect(skillelinjeParagraf).toHaveClass('navds-body-short');
    });

    test('skal rendre komponent som heading når erHeading er true', () => {
        const { screen } = render(<FalskIdentitet harFalskIdentitet={true} erHeading />);
        const mark = screen.queryByRole('mark');
        const span = mark?.parentElement;
        const skillelinjeSpan = screen.queryByText('|');

        expect(mark).toBeInTheDocument();
        expect(mark).toHaveTextContent('Falsk identitet');
        expect(span).toBeInTheDocument();
        expect(span).toHaveClass('navds-heading');
        expect(skillelinjeSpan).toBeInTheDocument();
        expect(skillelinjeSpan).toHaveClass('navds-heading');
    });

    test('skal ikke rendre komponent når harFalskIdentitet er false', async () => {
        const { screen } = render(<FalskIdentitet harFalskIdentitet={false} />);
        expect(screen.queryByRole('mark')).not.toBeInTheDocument();
    });
});
