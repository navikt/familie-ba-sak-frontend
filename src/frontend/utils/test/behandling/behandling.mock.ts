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
import { IRestPersonResultat } from '../../../typer/vilkår';
import { mockBarn, mockSøker } from '../person/person.mock';
import { mockRestPersonResultat } from '../vilkårsvurdering/vilkår.mock';

interface IMockBehandling {
    behandlingId?: number;
    aktiv?: boolean;
    steg?: BehandlingSteg;
    status?: BehandlingStatus;
    opprettetTidspunkt?: string;
    årsak?: BehandlingÅrsak;
    type?: Behandlingstype;
    skalBehandlesAutomatisk?: boolean;
}

export const mockBehandling = ({
    behandlingId = 1,
    opprettetTidspunkt = '2020-03-19T09:08:56.8',
    steg = BehandlingSteg.VILKÅRSVURDERING,
    status = BehandlingStatus.FATTER_VEDTAK,
    aktiv = true,
    årsak = BehandlingÅrsak.SØKNAD,
    type = Behandlingstype.FØRSTEGANGSBEHANDLING,
    skalBehandlesAutomatisk = false,
}: IMockBehandling = {}): IBehandling => {
    const barn = mockBarn;

    const søker = mockSøker();

    const søkerRestPersonResultat: IRestPersonResultat = mockRestPersonResultat({
        personIdent: søker.personIdent,
    });

    const barnRestPersonResultat: IRestPersonResultat = mockRestPersonResultat({
        personIdent: barn.personIdent,
    });

    return {
        behandlingId,
        aktiv,
        arbeidsfordelingPåBehandling: {
            behandlendeEnhetId: '4820',
            behandlendeEnhetNavn: 'enhet navn',
            manueltOverstyrt: false,
        },
        steg: steg,
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
        type: type,
        personer: [barn, søker],
        begrunnelse: '',
        resultat: BehandlingResultat.INNVILGET,
        opprettetTidspunkt,
        kategori: BehandlingKategori.NASJONAL,
        underkategori: BehandlingUnderkategori.ORDINÆR,
        status,
        personResultater: [søkerRestPersonResultat, barnRestPersonResultat],
        fødselshendelsefiltreringResultater: [],
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
        årsak: årsak,
        skalBehandlesAutomatisk,
    };
};
