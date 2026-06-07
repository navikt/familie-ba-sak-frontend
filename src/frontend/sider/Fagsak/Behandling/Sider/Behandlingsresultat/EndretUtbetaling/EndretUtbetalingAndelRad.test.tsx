import type { ReactNode } from 'react';

import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { lagPersonMedAndelerTilkjentYtelse } from '@testutils/testdata/personTestdata';
import { render, TestProviders } from '@testutils/testrender';
import type { IBehandling } from '@typer/behandling';
import { PersonType } from '@typer/person';
import { Målform } from '@typer/søknad';
import { IEndretUtbetalingAndelÅrsak, type IRestEndretUtbetalingAndel } from '@typer/utbetalingAndel';
import { describe, expect, test } from 'vitest';

import { Table } from '@navikt/ds-react';
import { kjønnType } from '@navikt/familie-typer';

import EndretUtbetalingAndelRad from './EndretUtbetalingAndelRad';
import { FagsakProvider } from '../../../../FagsakContext';
import { BehandlingProvider } from '../../../context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '../../../context/HentOgSettBehandlingContext';

const barn = {
    type: PersonType.BARN,
    personIdent: '10987654321',
    fødselsdato: '2023-12-31',
    navn: 'Barn 1',
    kjønn: kjønnType.MANN,
    målform: Målform.NB,
    harFalskIdentitet: false,
};

const behandlingMedAndeler: IBehandling = {
    ...lagBehandling(),
    personer: [barn],
    personerMedAndelerTilkjentYtelse: [lagPersonMedAndelerTilkjentYtelse({ personIdent: barn.personIdent })],
};

function lagAndel(overstyringer: Partial<IRestEndretUtbetalingAndel>): IRestEndretUtbetalingAndel {
    return {
        id: 1,
        personIdenter: [],
        prosent: 0,
        fom: '2024-01',
        tom: '2024-06',
        begrunnelse: 'Fylt ut automatisk fra søknadstidspunkt.',
        årsak: IEndretUtbetalingAndelÅrsak.ETTERBETALING_3MND,
        søknadstidspunkt: '2024-01-01',
        erTilknyttetAndeler: true,
        ...overstyringer,
    };
}

function Wrapper({ children }: { children: ReactNode }) {
    return (
        <TestProviders>
            <FagsakProvider fagsak={lagFagsak()}>
                <HentOgSettBehandlingProvider>
                    <BehandlingProvider behandling={behandlingMedAndeler}>
                        <Table>
                            <Table.Body>{children}</Table.Body>
                        </Table>
                    </BehandlingProvider>
                </HentOgSettBehandlingProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

describe('EndretUtbetalingAndelRad (lesevisning for automatisk genererte andeler)', () => {
    test('skal låse feltene og kun tillate sletting for automatisk genererte andeler når toggle er på', () => {
        const { screen } = render(
            <EndretUtbetalingAndelRad
                lagretEndretUtbetalingAndel={lagAndel({ erAutomatiskGenerert: true })}
                åpenBehandling={behandlingMedAndeler}
            />,
            { wrapper: Wrapper }
        );

        expect(screen.queryByRole('button', { name: 'Bekreft' })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Avbryt' })).not.toBeInTheDocument();
        expect(screen.getByLabelText('Begrunnelse')).toHaveAttribute('readonly');
    });

    test('skal tillate endring for manuelt opprettet andel med etterbetaling-årsak', () => {
        const { screen } = render(
            <EndretUtbetalingAndelRad
                lagretEndretUtbetalingAndel={lagAndel({ erAutomatiskGenerert: false, begrunnelse: 'Manuell' })}
                åpenBehandling={behandlingMedAndeler}
            />,
            { wrapper: Wrapper }
        );

        expect(screen.getByRole('button', { name: 'Bekreft' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Avbryt' })).toBeInTheDocument();
        expect(screen.getByLabelText('Begrunnelse')).not.toHaveAttribute('readonly');
        expect(screen.getByRole('button', { name: /Fjern periode/ })).toBeInTheDocument();
    });
});
