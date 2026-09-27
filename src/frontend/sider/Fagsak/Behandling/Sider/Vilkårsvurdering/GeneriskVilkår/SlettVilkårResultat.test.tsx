import { slettVilkårResultat } from '@api/slettVilkårResultat';
import { Table } from '@navikt/ds-react';
import { useEkspanderbareVilkårResultatRader } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/EkspanderbareVilkårResultatRaderContext';
import { renderIVilkårsvurdering } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/testutils/renderIVilkårsvurdering';
import { waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagPersonResultat } from '@testutils/testdata/personResultatTestdata';
import { lagGrunnlagPerson } from '@testutils/testdata/personTestdata';
import { lagVilkårResultat } from '@testutils/testdata/vilkårResultatTestdata';
import { BehandlingSteg, type IBehandling } from '@typer/behandling';
import { PersonType } from '@typer/person';
import { type IRestVilkårResultat, Resultat } from '@typer/vilkår';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { SlettVilkårResultat } from './SlettVilkårResultat';

vi.mock('@api/slettVilkårResultat');

afterEach(() => {
    vi.clearAllMocks();
});

const barn = lagGrunnlagPerson({ type: PersonType.BARN, personIdent: '10987654321', fødselsdato: '2020-01-01' });

function lagBehandlingMedVilkårResultater(vilkårResultater: IRestVilkårResultat[]): IBehandling {
    return lagBehandling({
        steg: BehandlingSteg.VILKÅRSVURDERING,
        personer: [barn],
        personResultater: [lagPersonResultat({ personIdent: barn.personIdent, vilkårResultater })],
    });
}

function EkspanderteRader({ ider }: { ider: number[] }) {
    const { erRadEkspandert } = useEkspanderbareVilkårResultatRader();
    return <span data-testid={'ekspanderte-rader'}>{ider.filter(id => erRadEkspandert(id)).join(',')}</span>;
}

function renderSlett(behandling: IBehandling, vilkårResultatId: number, ider: number[]) {
    return renderIVilkårsvurdering(
        <Table.Row>
            <Table.DataCell>
                <SlettVilkårResultat personIdent={barn.personIdent} vilkårResultatId={vilkårResultatId} />
                <EkspanderteRader ider={ider} />
            </Table.DataCell>
        </Table.Row>,
        { behandling }
    );
}

describe('SlettVilkårResultat', () => {
    test('skal kollapse slettet rad og ekspandere rader som er nyopprettet av backend', async () => {
        // Arrange
        const slettet = lagVilkårResultat({ id: 1, resultat: Resultat.IKKE_VURDERT });
        const uendret = lagVilkårResultat({ id: 2, resultat: Resultat.OPPFYLT, periodeFom: '2020-01-01' });
        const nyopprettet = lagVilkårResultat({ id: 3, resultat: Resultat.IKKE_VURDERT });
        vi.mocked(slettVilkårResultat).mockResolvedValue(lagBehandlingMedVilkårResultater([uendret, nyopprettet]));

        const { screen, user } = renderSlett(
            lagBehandlingMedVilkårResultater([slettet, uendret]),
            slettet.id,
            [1, 2, 3]
        );
        expect(screen.getByTestId('ekspanderte-rader')).toHaveTextContent(/^1$/);

        // Act
        await user.click(screen.getByRole('button', { name: 'Fjern' }));

        // Assert
        await waitFor(() => expect(screen.getByTestId('ekspanderte-rader')).toHaveTextContent(/^3$/));
        expect(slettVilkårResultat).toHaveBeenCalledWith(
            { behandlingId: expect.any(Number), vilkårResultatId: slettet.id },
            { personIdent: barn.personIdent }
        );
    });

    test('skal holde raden åpen når backend nullstiller vilkårresultatet med samme id', async () => {
        // Arrange
        const vilkårResultat = lagVilkårResultat({ id: 1, resultat: Resultat.IKKE_VURDERT });
        const nyopprettet = lagVilkårResultat({ id: 4, resultat: Resultat.IKKE_VURDERT });
        vi.mocked(slettVilkårResultat).mockResolvedValue(
            lagBehandlingMedVilkårResultater([vilkårResultat, nyopprettet])
        );

        const { screen, user } = renderSlett(
            lagBehandlingMedVilkårResultater([vilkårResultat]),
            vilkårResultat.id,
            [1, 4]
        );
        expect(screen.getByTestId('ekspanderte-rader')).toHaveTextContent(/^1$/);

        // Act
        await user.click(screen.getByRole('button', { name: 'Fjern' }));

        // Assert
        await waitFor(() => expect(screen.getByTestId('ekspanderte-rader')).toHaveTextContent(/^1,4$/));
    });
});
