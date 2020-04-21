import { IFagsak, FagsakStatus } from '../../frontend/typer/fagsak';
import { Ressurs, byggSuksessRessurs } from '../../frontend/typer/ressurs';
import {
    IBehandling,
    BehandlingSteg,
    BehandlingKategori,
    BehandlingUnderkategori,
    BehandlingStatus,
    Behandlingstype,
} from '../../frontend/typer/behandling';
import { PersonType, IPerson } from '../../frontend/typer/person';
import { IRestPersonResultat, VilkårType, Resultat } from '../../frontend/typer/vilkår';
import { kjønnType } from '@navikt/familie-typer';

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
                vilkårType: VilkårType.BOSATT_I_RIKET,
                resultat: Resultat.KANSKJE,
                periodeFom: undefined,
                periodeTom: undefined,
                begrunnelse: '',
            },
            {
                vilkårType: VilkårType.LOVLIG_OPPHOLD,
                resultat: Resultat.KANSKJE,
                periodeFom: undefined,
                periodeTom: undefined,
                begrunnelse: '',
            },
            {
                vilkårType: VilkårType.GIFT_PARTNERSKAP,
                resultat: Resultat.KANSKJE,
                periodeFom: undefined,
                periodeTom: undefined,
                begrunnelse: '',
            },
            {
                vilkårType: VilkårType.UNDER_18_ÅR,
                resultat: Resultat.KANSKJE,
                periodeFom: undefined,
                periodeTom: undefined,
                begrunnelse: '',
            },
            {
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
        opprettetTidspunkt: '2020-03-19T09:08:56.8',
        kategori: BehandlingKategori.NASJONAL,
        underkategori: BehandlingUnderkategori.ORDINÆR,
        status: BehandlingStatus.SENDT_TIL_BESLUTTER,
        personResultater: [søkerPersonResultat, barnPersonResultat],
        vedtakForBehandling: [],
    };

    return behandling;
};
