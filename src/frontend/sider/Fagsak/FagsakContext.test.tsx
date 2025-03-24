/**
 * @jest-environment jsdom
 */
import React from 'react';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { FagsakProvider, useFagsakContext } from './FagsakContext';

const EksempelKomponent = () => {
    const { minimalFagsak, klagebehandlinger, manuelleBrevmottakerePåFagsak } = useFagsakContext();

    return (
        <div>
            <div data-testid="fagsakId">
                {minimalFagsak ? `Fagsak med id: ${minimalFagsak.id}` : 'Ingen fagsak'}
            </div>
            <div data-testid="klagebehandlinger">
                Antall klagebehandlinger: {klagebehandlinger.length}
            </div>
            <div data-testid="brevmottakere">
                Antall manuelle brevmottakere: {manuelleBrevmottakerePåFagsak.length}
            </div>
        </div>
    );
};

test('Kan hente ut defaultverdier fra context', () => {
    render(
        <FagsakProvider>
            <EksempelKomponent />
        </FagsakProvider>
    );
    expect(screen.getByTestId('fagsakId')).toHaveTextContent('Ingen fagsak');
    expect(screen.getByTestId('klagebehandlinger')).toHaveTextContent(
        'Antall klagebehandlinger: 0'
    );
    expect(screen.getByTestId('brevmottakere')).toHaveTextContent(
        'Antall manuelle brevmottakere: 0'
    );
});
