import { FagsakStatus, IFagsak } from '../../frontend/typer/fagsak';
import { byggSuksessRessurs, kjønnType, Ressurs, RessursStatus } from '@navikt/familie-typer';
import {
    BehandlingKategori,
    BehandlingResultat,
    BehandlingStatus,
    BehandlingSteg,
    BehandlingStegStatus,
    Behandlingstype,
    BehandlingUnderkategori,
    BehandlingÅrsak,
    IBehandling,
} from '../../frontend/typer/behandling';
import { IGrunnlagPerson, PersonType } from '../../frontend/typer/person';
import { IRestPersonResultat, RestResultat, VilkårType } from '../../frontend/typer/vilkår';
import fs from 'fs';
import path from 'path';
import { Målform } from 'frontend/typer/søknad';

const lesMockFil = (filnavn: string) => {
    return fs.readFileSync(path.join(__dirname, filnavn), 'utf-8');
};

export const hentMockFagsak = (id: string): Ressurs<IFagsak> | null => {
    try {
        const fagsak: Ressurs<IFagsak> | null =
            id === '3'
                ? mockFagsak3(parseInt(id, 10), '12345678910')
                : JSON.parse(lesMockFil(`fagsak-${id}.json`));
        return fagsak;
    } catch (e) {
        return null;
    }
};

export const mockFagsak3 = (id: number, søkerFødselsnummer: string): Ressurs<IFagsak> | null => {
    const fagsak: IFagsak = {
        id,
        søkerFødselsnummer,
        opprettetTidspunkt: '2020-03-19T09:08:56.8',
        saksnummer: '1234',
        status: FagsakStatus.LØPENDE,
        underBehandling: false,
        behandlinger: [mockBehandling(1, true, 'VILKÅRSVURDERING')],
    };

    return byggSuksessRessurs<IFagsak>(fagsak);
};

export const oppdaterBehandlingsstatusPaaFagsak = (
    fagsak: Ressurs<IFagsak>,
    behandlingStatus: BehandlingStatus
) => {
    if (fagsak.status !== RessursStatus.SUKSESS) {
        return fagsak;
    }

    fagsak.data.behandlinger = fagsak.data.behandlinger.map(behandling => {
        return behandling.aktiv ? { ...behandling, status: behandlingStatus } : behandling;
    });
    return fagsak;
};

export const mockBehandling = (behandlingId: number, aktiv: boolean, steg: string): IBehandling => {
    const barn: IGrunnlagPerson = {
        personIdent: '12345678903',
        fødselsdato: '2006-11-20',
        type: PersonType.BARN,
        kjønn: 'KVINNE' as kjønnType,
        navn: 'Mock Barn',
        målform: Målform.NB,
    };

    const søker: IGrunnlagPerson = {
        personIdent: '12345678930',
        fødselsdato: '1979-01-14',
        type: PersonType.SØKER,
        kjønn: 'KVINNE' as kjønnType,
        navn: 'Mock Søker',
        målform: Målform.NB,
    };

    const søkerPersonResultat: IRestPersonResultat = {
        personIdent: søker.personIdent,
        vilkårResultater: [
            {
                id: 1,
                vilkårType: VilkårType.LOVLIG_OPPHOLD,
                resultat: RestResultat.IKKE_VURDERT,
                periodeFom: '2000-01-01',
                periodeTom: undefined,
                begrunnelse: '',
                endretAv: 'VL',
                endretTidspunkt: '2020-03-19T09:08:56.8',
                behandlingId,
            },
        ],
    };

    const barnPersonResultat: IRestPersonResultat = {
        personIdent: barn.personIdent,
        vilkårResultater: [
            {
                id: 2,
                vilkårType: VilkårType.BOSATT_I_RIKET,
                resultat: RestResultat.IKKE_VURDERT,
                periodeFom: undefined,
                periodeTom: undefined,
                begrunnelse: '',
                endretAv: 'VL',
                endretTidspunkt: '2020-03-19T09:08:56.8',
                behandlingId,
            },
            {
                id: 3,
                vilkårType: VilkårType.LOVLIG_OPPHOLD,
                resultat: RestResultat.IKKE_VURDERT,
                periodeFom: undefined,
                periodeTom: undefined,
                begrunnelse: '',
                endretAv: 'VL',
                endretTidspunkt: '2020-03-19T09:08:56.8',
                behandlingId,
            },
            {
                id: 4,
                vilkårType: VilkårType.GIFT_PARTNERSKAP,
                resultat: RestResultat.IKKE_VURDERT,
                periodeFom: undefined,
                periodeTom: undefined,
                begrunnelse: '',
                endretAv: 'VL',
                endretTidspunkt: '2020-03-19T09:08:56.8',
                behandlingId,
            },
            {
                id: 5,
                vilkårType: VilkårType.UNDER_18_ÅR,
                resultat: RestResultat.IKKE_VURDERT,
                periodeFom: undefined,
                periodeTom: undefined,
                begrunnelse: '',
                endretAv: 'VL',
                endretTidspunkt: '2020-03-19T09:08:56.8',
                behandlingId,
            },
            {
                id: 6,
                vilkårType: VilkårType.BOR_MED_SØKER,
                resultat: RestResultat.IKKE_VURDERT,
                periodeFom: undefined,
                periodeTom: undefined,
                begrunnelse: '',
                endretAv: 'VL',
                endretTidspunkt: '2020-03-19T09:08:56.8',
                behandlingId,
            },
        ],
    };

    const behandling: IBehandling = {
        behandlingId,
        aktiv,
        arbeidsfordelingPåBehandling: {
            behandlendeEnhetId: '4820',
            behandlendeEnhetNavn: 'enhet navn',
            manueltOverstyrt: false,
        },
        steg: (steg as unknown) as BehandlingSteg,
        stegTilstand: [
            {
                behandlingSteg: BehandlingSteg.REGISTRERE_SØKNAD,
                behandlingStegStatus: BehandlingStegStatus.UTFØRT,
            },
            {
                behandlingSteg: BehandlingSteg.REGISTRERE_PERSONGRUNNLAG,
                behandlingStegStatus: BehandlingStegStatus.UTFØRT,
            },
        ],
        type: Behandlingstype.FØRSTEGANGSBEHANDLING,
        personer: [barn, søker],
        begrunnelse: '',
        samletResultat: BehandlingResultat.INNVILGET,
        opprettetTidspunkt: '2020-03-19T09:08:56.8',
        kategori: BehandlingKategori.NASJONAL,
        underkategori: BehandlingUnderkategori.ORDINÆR,
        status: BehandlingStatus.FATTER_VEDTAK,
        personResultater: [søkerPersonResultat, barnPersonResultat],
        vedtakForBehandling: [],
        endretAv: 'VL',
        totrinnskontroll: {
            saksbehandler: 'Saksbehandler',
            beslutter: 'Beslutter',
            godkjent: true,
            opprettetTidspunkt: '2020-03-19T10:08:56.8',
        },
        beregningOversikt: [],
        årsak: BehandlingÅrsak.SØKNAD,
        skalBehandlesAutomatisk: false,
    };

    return behandling;
};
