import { render, screen } from '@testing-library/react';
import { Modus } from '@typer/brevmottaker';
import { describe, expect, test } from 'vitest';
import { Informasjonskort } from './Informasjonskort';

const FELLES_TEKST =
    'Brev sendes til brukers folkeregistrerte adresse eller annen foretrukken kanal. Legg til mottaker dersom brev skal sendes til utenlandsk adresse,';

describe('Informasjonskort', () => {
    test('skal nevne fullmektig, verge og dødsbo for behandling', () => {
        render(<Informasjonskort modus={Modus.BEHANDLING} />);

        expect(screen.getByText(`${FELLES_TEKST} fullmektig, verge eller dødsbo.`)).toBeInTheDocument();
    });

    test('skal nevne fullmektig og verge, men ikke dødsbo, for fagsak', () => {
        render(<Informasjonskort modus={Modus.FAGSAK} />);

        expect(screen.getByText(`${FELLES_TEKST} fullmektig eller verge.`)).toBeInTheDocument();
        expect(screen.queryByText(/dødsbo/)).not.toBeInTheDocument();
    });
});
