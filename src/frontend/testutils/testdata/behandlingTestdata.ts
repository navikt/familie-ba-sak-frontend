import type { VisningBehandling } from '../../sider/Fagsak/Saksoversikt/visningBehandling';
import {
    BehandlingResultat,
    BehandlingStatus,
    BehandlingSteg,
    Behandlingstype,
    BehandlingÅrsak,
    type IBehandling,
} from '../../typer/behandling';
import { BehandlingKategori, BehandlingUnderkategori } from '../../typer/behandlingstema';

export function lagVisningBehandling(visningBehandling?: Partial<VisningBehandling>): VisningBehandling {
    return {
        behandlingId: 1,
        opprettetTidspunkt: '2025-10-22T12:00:00.00',
        aktivertTidspunkt: '2025-10-22T12:00:00.00',
        kategori: BehandlingKategori.NASJONAL,
        underkategori: BehandlingUnderkategori.ORDINÆR,
        aktiv: true,
        årsak: BehandlingÅrsak.SØKNAD,
        type: Behandlingstype.FØRSTEGANGSBEHANDLING,
        status: BehandlingStatus.AVSLUTTET,
        resultat: BehandlingResultat.INNVILGET,
        ...visningBehandling,
    };
}

export function lagBehandling(behandling?: Partial<IBehandling>): IBehandling {
    return {
        arbeidsfordelingPåBehandling: {
            behandlendeEnhetId: '4833',
            behandlendeEnhetNavn: 'Oslo',
            manueltOverstyrt: false,
        },
        behandlingId: 1,
        endretAv: 'Sak Saksbehanlder',
        aktiv: false,
        kategori: BehandlingKategori.NASJONAL,
        underkategori: BehandlingUnderkategori.ORDINÆR,
        opprettetTidspunkt: '2025-01-01T13:00:00.000',
        aktivertTidspunkt: '2025-01-01T13:00:00.000',
        personResultater: [],
        personer: [],
        resultat: BehandlingResultat.IKKE_VURDERT,
        status: BehandlingStatus.UTREDES,
        steg: BehandlingSteg.REGISTRERE_SØKNAD,
        stegTilstand: [],
        søknadsgrunnlag: undefined,
        totrinnskontroll: undefined,
        type: Behandlingstype.FØRSTEGANGSBEHANDLING,
        fødselshendelsefiltreringResultater: [],
        vedtak: undefined,
        utbetalingsperioder: [],
        endretUtbetalingAndeler: [],
        personerMedAndelerTilkjentYtelse: [],
        årsak: BehandlingÅrsak.SØKNAD,
        skalBehandlesAutomatisk: false,
        tilbakekreving: undefined,
        aktivSettPåVent: undefined,
        migreringsdato: undefined,
        søknadMottattDato: undefined,
        kompetanser: [],
        utenlandskePeriodebeløp: [],
        valutakurser: [],
        korrigertEtterbetaling: undefined,
        korrigertVedtak: undefined,
        feilutbetaltValuta: [],
        refusjonEøs: [],
        brevmottakere: [],
        vurderingsstrategiForValutakurser: null,
        tilbakekrevingsvedtakMotregning: null,
        manglendeSvalbardmerking: [],
        manglendeFinnmarkmerking: undefined,
        ...behandling,
    };
}

export * as BehandlingTestdata from './behandlingTestdata';
