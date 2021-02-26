import { kjønnType } from '@navikt/familie-typer';

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
} from '../../../typer/behandling';
import { IGrunnlagPerson, PersonType } from '../../../typer/person';
import { Målform } from '../../../typer/søknad';
import { IRestPersonResultat, Resultat, VilkårType } from '../../../typer/vilkår';

interface IMockBehandlingInput {
    behandlingId?: number;
    aktiv?: boolean;
    steg?: string;
    opprettetTidspunkt?: string;
}

export const mockBehandling = ({
    behandlingId = 1,
    opprettetTidspunkt = '2020-03-19T09:08:56.8',
    steg = 'VILKÅRSVURDERING',
    aktiv = true,
}: IMockBehandlingInput): IBehandling => {
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
                resultat: Resultat.IKKE_VURDERT,
                periodeFom: '2000-01-01',
                periodeTom: undefined,
                begrunnelse: '',
                endretAv: 'VL',
                erVurdert: false,
                erAutomatiskVurdert: false,
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
                resultat: Resultat.IKKE_VURDERT,
                periodeFom: undefined,
                periodeTom: undefined,
                begrunnelse: '',
                endretAv: 'VL',
                erVurdert: false,
                erAutomatiskVurdert: false,
                endretTidspunkt: '2020-03-19T09:08:56.8',
                behandlingId,
            },
            {
                id: 3,
                vilkårType: VilkårType.LOVLIG_OPPHOLD,
                resultat: Resultat.IKKE_VURDERT,
                periodeFom: undefined,
                periodeTom: undefined,
                begrunnelse: '',
                endretAv: 'VL',
                erVurdert: false,
                erAutomatiskVurdert: false,
                endretTidspunkt: '2020-03-19T09:08:56.8',
                behandlingId,
            },
            {
                id: 4,
                vilkårType: VilkårType.GIFT_PARTNERSKAP,
                resultat: Resultat.IKKE_VURDERT,
                periodeFom: undefined,
                periodeTom: undefined,
                begrunnelse: '',
                endretAv: 'VL',
                erVurdert: false,
                erAutomatiskVurdert: false,
                endretTidspunkt: '2020-03-19T09:08:56.8',
                behandlingId,
            },
            {
                id: 5,
                vilkårType: VilkårType.UNDER_18_ÅR,
                resultat: Resultat.IKKE_VURDERT,
                periodeFom: undefined,
                periodeTom: undefined,
                begrunnelse: '',
                endretAv: 'VL',
                erVurdert: false,
                erAutomatiskVurdert: false,
                endretTidspunkt: '2020-03-19T09:08:56.8',
                behandlingId,
            },
            {
                id: 6,
                vilkårType: VilkårType.BOR_MED_SØKER,
                resultat: Resultat.IKKE_VURDERT,
                periodeFom: undefined,
                periodeTom: undefined,
                begrunnelse: '',
                endretAv: 'VL',
                erVurdert: false,
                erAutomatiskVurdert: false,
                endretTidspunkt: '2020-03-19T09:08:56.8',
                behandlingId,
            },
        ],
    };

    return {
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
        resultat: BehandlingResultat.INNVILGET,
        opprettetTidspunkt,
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
            opprettetTidspunkt,
        },
        utbetalingsperioder: [],
        personerMedAndelerTilkjentYtelse: [],
        årsak: BehandlingÅrsak.SØKNAD,
        skalBehandlesAutomatisk: false,
    };
};
