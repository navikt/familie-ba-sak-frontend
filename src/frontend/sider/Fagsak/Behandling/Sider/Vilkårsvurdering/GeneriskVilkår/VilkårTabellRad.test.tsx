import { oppdaterVilkårResultat } from '@api/oppdaterVilkårResultat';
import { Table } from '@navikt/ds-react';
import { BehandlingProvider } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '@sider/Fagsak/Behandling/context/HentOgSettBehandlingContext';
import { EkspanderbareVilkårResultatRaderProvider } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/EkspanderbareVilkårResultatRaderContext';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { lagPersonResultat } from '@testutils/testdata/personResultatTestdata';
import { lagGrunnlagPerson } from '@testutils/testdata/personTestdata';
import { lagVilkårResultat } from '@testutils/testdata/vilkårResultatTestdata';
import { render, TestProviders } from '@testutils/testrender';
import { BehandlingSteg, type IBehandling } from '@typer/behandling';
import { PersonType } from '@typer/person';
import { type IRestVilkårResultat, Regelverk, Resultat, VilkårType, vilkårConfig } from '@typer/vilkår';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { VilkårTabellRad } from './VilkårTabellRad';

vi.mock('@api/oppdaterVilkårResultat');
vi.mock('@api/hentAlleBegrunnelser', () => ({
    hentAlleBegrunnelser: vi.fn().mockResolvedValue({
        AVSLAG: [{ id: 'AVSLAG_BOR_IKKE_MED_SØKER', navn: 'Bor ikke med søker', vilkår: 'BOR_MED_SØKER' }],
    }),
}));

afterEach(() => {
    vi.clearAllMocks();
});

const barn = lagGrunnlagPerson({ type: PersonType.BARN, personIdent: '10987654321', fødselsdato: '2020-01-01' });

function lagBehandlingMedVilkår(vilkårResultat: IRestVilkårResultat): IBehandling {
    return lagBehandling({
        steg: BehandlingSteg.VILKÅRSVURDERING,
        personer: [barn],
        personResultater: [lagPersonResultat({ personIdent: barn.personIdent, vilkårResultater: [vilkårResultat] })],
    });
}

function Wrapper({ children, behandling }: { children: ReactNode; behandling: IBehandling }) {
    return (
        <TestProviders>
            <FagsakProvider fagsak={lagFagsak()}>
                <HentOgSettBehandlingProvider>
                    <BehandlingProvider behandling={behandling}>
                        <EkspanderbareVilkårResultatRaderProvider>
                            <Table>
                                <Table.Body>{children}</Table.Body>
                            </Table>
                        </EkspanderbareVilkårResultatRaderProvider>
                    </BehandlingProvider>
                </HentOgSettBehandlingProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

function renderRad(vilkårResultat: IRestVilkårResultat, visFeilmeldinger = false) {
    const behandling = lagBehandlingMedVilkår(vilkårResultat);
    return render(
        <VilkårTabellRad
            person={barn}
            vilkårFraConfig={vilkårConfig[vilkårResultat.vilkårType]}
            vilkårResultat={vilkårResultat}
            visFeilmeldinger={visFeilmeldinger}
            settFokusPåKnapp={vi.fn()}
        />,
        { wrapper: props => <Wrapper {...props} behandling={behandling} /> }
    );
}

describe('VilkårTabellRad', () => {
    test('ikke vurdert vilkår åpnes med skjema og viser valideringsfeil ved lagring uten resultat og periode', async () => {
        // Arrange
        const { screen, user } = renderRad(
            lagVilkårResultat({ resultat: Resultat.IKKE_VURDERT, vilkårType: VilkårType.UNDER_18_ÅR, begrunnelse: '' })
        );

        // Act
        await user.click(screen.getByRole('button', { name: 'Ferdig' }));

        // Assert
        expect(await screen.findByText('Resultat er ikke satt')).toBeInTheDocument();
        expect(screen.getByText('F.o.m. må settes før du kan gå videre')).toBeInTheDocument();
        expect(oppdaterVilkårResultat).not.toHaveBeenCalled();
    });

    test('lagrer vilkårresultat med verdier fra skjemaet', async () => {
        // Arrange
        const vilkårResultat = lagVilkårResultat({
            id: 42,
            resultat: Resultat.IKKE_VURDERT,
            vilkårType: VilkårType.UNDER_18_ÅR,
            begrunnelse: '',
        });
        const behandling = lagBehandlingMedVilkår(vilkårResultat);
        const { screen, user } = renderRad(vilkårResultat);
        vi.mocked(oppdaterVilkårResultat).mockResolvedValue(behandling);

        // Act
        await user.click(screen.getByRole('radio', { name: 'Ja' }));
        await user.type(screen.getByLabelText('F.o.m'), '01.01.2020');
        await user.type(screen.getByLabelText('Begrunnelse (valgfri)'), 'Barnet er under 18');
        await user.click(screen.getByRole('button', { name: 'Ferdig' }));

        // Assert
        await waitFor(() => expect(oppdaterVilkårResultat).toHaveBeenCalledTimes(1));
        expect(oppdaterVilkårResultat).toHaveBeenCalledWith(
            { behandlingId: behandling.behandlingId, vilkårResultatId: 42 },
            {
                personIdent: barn.personIdent,
                andreVurderinger: [],
                vilkårResultater: [
                    expect.objectContaining({
                        id: 42,
                        resultat: Resultat.OPPFYLT,
                        resultatBegrunnelse: null,
                        periodeFom: '2020-01-01',
                        periodeTom: undefined,
                        begrunnelse: 'Barnet er under 18',
                        erEksplisittAvslagPåSøknad: false,
                        avslagBegrunnelser: [],
                    }),
                ],
            }
        );
    });

    test('viser feilmelding fra server i skjemaet når lagring feiler', async () => {
        // Arrange
        const { screen, user } = renderRad(
            lagVilkårResultat({
                resultat: Resultat.OPPFYLT,
                vilkårType: VilkårType.UNDER_18_ÅR,
                periodeFom: '2020-01-01',
            })
        );
        vi.mocked(oppdaterVilkårResultat).mockRejectedValue(new Error('Noe gikk galt på serveren'));

        // Act
        await user.click(screen.getByRole('button', { name: 'Vis mer' }));
        await user.click(screen.getByRole('radio', { name: 'Nei' }));
        await user.click(screen.getByRole('button', { name: 'Ferdig' }));

        // Assert
        expect(await screen.findByText('Noe gikk galt på serveren')).toBeInTheDocument();
    });

    test('nei på vilkår i søknadsbehandling gir mulighet til å markere avslag, og krever begrunnelse i brev', async () => {
        // Arrange
        const { screen, user } = renderRad(
            lagVilkårResultat({
                resultat: Resultat.IKKE_VURDERT,
                vilkårType: VilkårType.BOR_MED_SØKER,
                begrunnelse: '',
            })
        );

        // Act
        await user.click(screen.getByRole('radio', { name: 'Nei' }));
        await user.click(screen.getByRole('checkbox', { name: 'Vurderingen er et avslag' }));
        await user.click(screen.getByRole('button', { name: 'Ferdig' }));

        // Assert
        expect(await screen.findByText('Du må velge minst en begrunnelse ved avslag')).toBeInTheDocument();
        expect(screen.getByLabelText('F.o.m (valgfri)')).toBeInTheDocument();
        expect(oppdaterVilkårResultat).not.toHaveBeenCalled();
    });

    test('tømt t.o.m. gir åpen periode og blokkerer ikke lagring', async () => {
        // Arrange
        const vilkårResultat = lagVilkårResultat({
            id: 42,
            resultat: Resultat.IKKE_VURDERT,
            vilkårType: VilkårType.UNDER_18_ÅR,
            begrunnelse: '',
        });
        const { screen, user } = renderRad(vilkårResultat);
        vi.mocked(oppdaterVilkårResultat).mockResolvedValue(lagBehandlingMedVilkår(vilkårResultat));
        await user.click(screen.getByRole('radio', { name: 'Ja' }));
        await user.type(screen.getByLabelText('F.o.m'), '01.01.2020');
        await user.type(screen.getByLabelText('T.o.m (valgfri)'), '01.02.2020');

        // Act
        await user.clear(screen.getByLabelText('T.o.m (valgfri)'));
        await user.click(screen.getByRole('button', { name: 'Ferdig' }));

        // Assert
        await waitFor(() => expect(oppdaterVilkårResultat).toHaveBeenCalledTimes(1));
        const [, personResultat] = vi.mocked(oppdaterVilkårResultat).mock.calls[0];
        expect(personResultat.vilkårResultater[0]).toEqual(
            expect.objectContaining({ periodeFom: '2020-01-01', periodeTom: undefined })
        );
    });

    test('feil vises uten innsending når siden viser feilmeldinger, og forsvinner når feltet rettes', async () => {
        // Arrange
        const { screen, user } = renderRad(
            lagVilkårResultat({ resultat: Resultat.IKKE_VURDERT, vilkårType: VilkårType.UNDER_18_ÅR, begrunnelse: '' }),
            true
        );
        expect(await screen.findByText('Resultat er ikke satt')).toBeInTheDocument();

        // Act
        await user.click(screen.getByRole('radio', { name: 'Ja' }));

        // Assert
        await waitFor(() => expect(screen.queryByText('Resultat er ikke satt')).not.toBeInTheDocument());
        expect(oppdaterVilkårResultat).not.toHaveBeenCalled();
    });

    test('avslag fjerner periodefeilen uten ny innsending', async () => {
        // Arrange
        const { screen, user } = renderRad(
            lagVilkårResultat({
                resultat: Resultat.IKKE_VURDERT,
                vilkårType: VilkårType.BOR_MED_SØKER,
                begrunnelse: '',
            })
        );
        await user.click(screen.getByRole('radio', { name: 'Nei' }));
        await user.click(screen.getByRole('button', { name: 'Ferdig' }));
        expect(await screen.findByText('F.o.m. må settes før du kan gå videre')).toBeInTheDocument();

        // Act
        await user.click(screen.getByRole('checkbox', { name: 'Vurderingen er et avslag' }));

        // Assert
        await waitFor(() =>
            expect(screen.queryByText('F.o.m. må settes før du kan gå videre')).not.toBeInTheDocument()
        );
        expect(screen.getByLabelText('F.o.m (valgfri)')).toBeInTheDocument();
    });

    test('EØS-regelverk på lovlig opphold gir valget "Ikke aktuelt" som lagres som oppfylt med resultatbegrunnelse', async () => {
        // Arrange
        const vilkårResultat = lagVilkårResultat({
            id: 7,
            resultat: Resultat.IKKE_VURDERT,
            vilkårType: VilkårType.LOVLIG_OPPHOLD,
            vurderesEtter: Regelverk.NASJONALE_REGLER,
            begrunnelse: '',
        });
        const { screen, user } = renderRad(vilkårResultat);
        vi.mocked(oppdaterVilkårResultat).mockResolvedValue(lagBehandlingMedVilkår(vilkårResultat));

        expect(screen.queryByRole('radio', { name: 'Ikke aktuelt' })).not.toBeInTheDocument();

        // Act
        await user.selectOptions(screen.getByLabelText('Vurderes etter'), Regelverk.EØS_FORORDNINGEN);
        await user.click(screen.getByRole('radio', { name: 'Ikke aktuelt' }));
        await user.type(screen.getByLabelText('F.o.m'), '01.01.2020');
        await user.click(screen.getByRole('button', { name: 'Ferdig' }));

        // Assert
        await waitFor(() => expect(oppdaterVilkårResultat).toHaveBeenCalledTimes(1));
        const [, personResultat] = vi.mocked(oppdaterVilkårResultat).mock.calls[0];
        expect(personResultat.vilkårResultater[0]).toEqual(
            expect.objectContaining({
                resultat: Resultat.OPPFYLT,
                resultatBegrunnelse: 'IKKE_AKTUELT',
                vurderesEtter: Regelverk.EØS_FORORDNINGEN,
            })
        );
    });
});
