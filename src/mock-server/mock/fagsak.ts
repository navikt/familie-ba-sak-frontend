import { FagsakStatus, IFagsak } from '../../frontend/typer/fagsak';
import { byggSuksessRessurs, Ressurs, RessursStatus } from '../../frontend/typer/ressurs';
import {
    BehandlingKategori,
    BehandlingResultat,
    BehandlingStatus,
    BehandlingSteg,
    Behandlingstype,
    BehandlingUnderkategori,
    IBehandling,
} from '../../frontend/typer/behandling';
import { IPerson, PersonType } from '../../frontend/typer/person';
import { IRestPersonResultat, Resultat, VilkårType } from '../../frontend/typer/vilkår';
import { kjønnType } from '@navikt/familie-typer';
import fs from 'fs';
import path from 'path';

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
    const barn: IPerson = {
        personIdent: '12345678903',
        fødselsdato: '2006-11-20',
        type: PersonType.BARN,
        kjønn: 'KVINNE' as kjønnType,
        navn: 'Mock Barn',
        familierelasjoner: [],
    };

    const søker: IPerson = {
        personIdent: '12345678930',
        fødselsdato: '1979-01-14',
        type: PersonType.SØKER,
        kjønn: 'KVINNE' as kjønnType,
        navn: 'Mock Søker',
        familierelasjoner: [],
    };

    const søkerPersonResultat: IRestPersonResultat = {
        personIdent: søker.personIdent,
        vilkårResultater: [
            {
                id: 1,
                vilkårType: VilkårType.LOVLIG_OPPHOLD,
                resultat: Resultat.KANSKJE,
                periodeFom: '2000-01-01',
                periodeTom: undefined,
                begrunnelse: '',
            },
        ],
    };

    const barnPersonResultat: IRestPersonResultat = {
        personIdent: barn.personIdent,
        vilkårResultater: [
            {
                id: 2,
                vilkårType: VilkårType.BOSATT_I_RIKET,
                resultat: Resultat.KANSKJE,
                periodeFom: undefined,
                periodeTom: undefined,
                begrunnelse: '',
            },
            {
                id: 3,
                vilkårType: VilkårType.LOVLIG_OPPHOLD,
                resultat: Resultat.KANSKJE,
                periodeFom: undefined,
                periodeTom: undefined,
                begrunnelse: '',
            },
            {
                id: 4,
                vilkårType: VilkårType.GIFT_PARTNERSKAP,
                resultat: Resultat.KANSKJE,
                periodeFom: undefined,
                periodeTom: undefined,
                begrunnelse: '',
            },
            {
                id: 5,
                vilkårType: VilkårType.UNDER_18_ÅR,
                resultat: Resultat.KANSKJE,
                periodeFom: undefined,
                periodeTom: undefined,
                begrunnelse: '',
            },
            {
                id: 6,
                vilkårType: VilkårType.BOR_MED_SØKER,
                resultat: Resultat.KANSKJE,
                periodeFom: undefined,
                periodeTom: undefined,
                begrunnelse: '',
            },
        ],
    };

    const behandling: IBehandling = {
        behandlingId,
        aktiv,
        steg: (steg as unknown) as BehandlingSteg,
        type: Behandlingstype.FØRSTEGANGSBEHANDLING,
        personer: [barn, søker],
        begrunnelse: '',
        samletResultat: BehandlingResultat.INNVILGET,
        opprettetTidspunkt: '2020-03-19T09:08:56.8',
        kategori: BehandlingKategori.NASJONAL,
        underkategori: BehandlingUnderkategori.ORDINÆR,
        status: BehandlingStatus.SENDT_TIL_BESLUTTER,
        personResultater: [søkerPersonResultat, barnPersonResultat],
        vedtakForBehandling: [],
        endretAv: 'VL',
        totrinnskontroll: {
            saksbehandler: 'Saksbehandler',
            beslutter: 'Beslutter',
            godkjent: true,
            opprettetTidspunkt: '2020-03-19T10:08:56.8',
        },
    };

    return behandling;
};
