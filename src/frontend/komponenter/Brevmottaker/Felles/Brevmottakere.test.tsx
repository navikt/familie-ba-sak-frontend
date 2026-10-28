import { render, screen } from '@testing-library/react';
import {
    lagBrevmottaker,
    lagBrevmottakerBehandling,
    lagBrevmottakerFagsak,
} from '@testutils/testdata/brevmottakerTestdata';
import { type BrevmottakerBehandling, type BrevmottakerFagsak, Brevmottakertype } from '@typer/brevmottaker';
import { describe, expect, test, vi } from 'vitest';
import { Brevmottakere } from './Brevmottakere';

describe('Brevmottakere', () => {
    test('skal vise at ingen brevmottakere er registrert når listen er tom', () => {
        const children = vi.fn();

        render(<Brevmottakere brevmottakere={[]}>{children}</Brevmottakere>);

        expect(screen.getByRole('heading', { name: 'Brevmottakere:' })).toBeInTheDocument();
        expect(screen.getByText('Ingen brevmottakere er registrert.')).toBeInTheDocument();
        expect(children).not.toHaveBeenCalled();
    });

    test('skal rendre children for hver brevmottaker i rekkefølge', () => {
        const brevmottakere = [
            lagBrevmottaker({ type: Brevmottakertype.FULLMEKTIG, navn: 'Fia Fullmektig' }),
            lagBrevmottaker({ type: Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE, navn: 'Bruker Brukersen' }),
        ];

        render(
            <Brevmottakere brevmottakere={brevmottakere}>
                {brevmottaker => <p key={brevmottaker.navn}>{brevmottaker.navn}</p>}
            </Brevmottakere>
        );

        expect(screen.getAllByRole('paragraph').map(p => p.textContent)).toEqual([
            'Fia Fullmektig',
            'Bruker Brukersen',
        ]);
        expect(screen.queryByText('Ingen brevmottakere er registrert.')).not.toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'Brevmottakere:' })).not.toBeInTheDocument();
    });

    test('skal rendre brevmottakere på behandling med id', () => {
        const brevmottakere = [
            lagBrevmottakerBehandling({ id: 7, navn: 'Fia Fullmektig' }),
            lagBrevmottakerBehandling({ id: 8, navn: 'Bruker Brukersen' }),
        ];
        const children = vi.fn((brevmottaker: BrevmottakerBehandling) => (
            <p key={brevmottaker.id}>
                {brevmottaker.id}: {brevmottaker.navn}
            </p>
        ));

        render(<Brevmottakere brevmottakere={brevmottakere}>{children}</Brevmottakere>);

        expect(screen.getByText('7: Fia Fullmektig')).toBeInTheDocument();
        expect(screen.getByText('8: Bruker Brukersen')).toBeInTheDocument();
        expect(children.mock.calls.map(([brevmottaker]) => brevmottaker)).toEqual(brevmottakere);
    });

    test('skal rendre brevmottakere på fagsak med uuid', () => {
        const brevmottakere = [
            lagBrevmottakerFagsak({ uuid: 'uuid-1', navn: 'Fia Fullmektig' }),
            lagBrevmottakerFagsak({ uuid: 'uuid-2', navn: 'Bruker Brukersen' }),
        ];
        const children = vi.fn((brevmottaker: BrevmottakerFagsak) => (
            <p key={brevmottaker.uuid}>
                {brevmottaker.uuid}: {brevmottaker.navn}
            </p>
        ));

        render(<Brevmottakere brevmottakere={brevmottakere}>{children}</Brevmottakere>);

        expect(screen.getByText('uuid-1: Fia Fullmektig')).toBeInTheDocument();
        expect(screen.getByText('uuid-2: Bruker Brukersen')).toBeInTheDocument();
        expect(children.mock.calls.map(([brevmottaker]) => brevmottaker)).toEqual(brevmottakere);
    });
});
