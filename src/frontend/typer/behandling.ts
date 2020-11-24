import { INøkkelPar } from './common';
import { IGrunnlagPerson } from './person';
import { IVedtakForBehandling } from './vedtak';
import { IRestPersonResultat, IRestStegTilstand } from './vilkår';
import { ITotrinnskontroll } from './totrinnskontroll';
import { IAndelTilkjentYtelse, IUtbetalingsperiode } from './beregning';
import { IOpplysningsplikt } from './opplysningsplikt';

export enum BehandlingKategori {
    NASJONAL = 'NASJONAL',
    EØS = 'EØS',
}

export enum HenleggelseÅrsak {
    SØKNAD_TRUKKET = 'SØKNAD_TRUKKET',
    FEILAKTIG_OPPRETTET = 'FEILAKTIG_OPPRETTET',
}

export const henleggelseÅrsak: Record<HenleggelseÅrsak, string> = {
    SØKNAD_TRUKKET: 'Søknaden er trukket',
    FEILAKTIG_OPPRETTET: 'Behandlingen er feilaktig opprettet',
};

export enum BehandlingÅrsak {
    SØKNAD = 'SØKNAD',
    FØDSELSHENDELSE = 'FØDSELSHENDELSE',
    ÅRLIG_KONTROLL = 'ÅRLIG_KONTROLL',
    DØDSFALL = 'DØDSFALL',
    NYE_OPPLYSNINGER = 'NYE_OPPLYSNINGER',
    TEKNISK_OPPHØR = 'TEKNISK_OPPHØR',
}

export const behandlingÅrsak: Record<BehandlingÅrsak, string> = {
    SØKNAD: 'Søknad',
    FØDSELSHENDELSE: 'Fødselshendelse',
    ÅRLIG_KONTROLL: 'Årlig kontroll',
    DØDSFALL: 'Dødsfall',
    NYE_OPPLYSNINGER: 'Nye opplysninger',
    TEKNISK_OPPHØR: 'Teknisk opphør',
};

export enum BehandlingUnderkategori {
    ORDINÆR = 'ORDINÆR',
    UTVIDET = 'UTVIDET',
}

export enum BehandlingSteg {
    HENLEGG_SØKNAD = 'HENLEGG_SØKNAD',
    REGISTRERE_SØKNAD = 'REGISTRERE_SØKNAD',
    REGISTRERE_PERSONGRUNNLAG = 'REGISTRERE_PERSONGRUNNLAG',
    VILKÅRSVURDERING = 'VILKÅRSVURDERING',
    SEND_TIL_BESLUTTER = 'SEND_TIL_BESLUTTER',
    BESLUTTE_VEDTAK = 'BESLUTTE_VEDTAK',
    IVERKSETT_MOT_OPPDRAG = 'IVERKSETT_MOT_OPPDRAG',
    VENTE_PÅ_STATUS_FRA_ØKONOMI = 'VENTE_PÅ_STATUS_FRA_ØKONOMI',
    JOURNALFØR_VEDTAKSBREV = 'JOURNALFØR_VEDTAKSBREV',
    DISTRIBUER_VEDTAKSBREV = 'DISTRIBUER_VEDTAKSBREV',
    FERDIGSTILLE_BEHANDLING = 'FERDIGSTILLE_BEHANDLING',
    BEHANDLING_AVSLUTTET = 'BEHANDLING_AVSLUTTET',
}

export enum BehandlingStegStatus {
    UTFØRT = 'UTFØRT',
    IKKE_UTFØRT = 'IKKE_UTFØRT',
}

export const hentStegNummer = (steg: BehandlingSteg): number => {
    switch (steg) {
        case BehandlingSteg.REGISTRERE_SØKNAD:
            return 1;
        case BehandlingSteg.REGISTRERE_PERSONGRUNNLAG:
            return 1;
        case BehandlingSteg.VILKÅRSVURDERING:
            return 2;
        case BehandlingSteg.SEND_TIL_BESLUTTER:
            return 3;
        case BehandlingSteg.BESLUTTE_VEDTAK:
            return 4;
        case BehandlingSteg.IVERKSETT_MOT_OPPDRAG:
            return 5;
        case BehandlingSteg.VENTE_PÅ_STATUS_FRA_ØKONOMI:
            return 6;
        case BehandlingSteg.JOURNALFØR_VEDTAKSBREV:
            return 7;
        case BehandlingSteg.DISTRIBUER_VEDTAKSBREV:
            return 8;
        case BehandlingSteg.FERDIGSTILLE_BEHANDLING:
            return 9;
        case BehandlingSteg.BEHANDLING_AVSLUTTET:
            return 10;
        default:
            return 0;
    }
};

export enum BehandlingStatus {
    OPPRETTET = 'OPPRETTET',
    UTREDES = 'UTREDES',
    FATTER_VEDTAK = 'FATTER_VEDTAK',
    IVERKSETTER_VEDTAK = 'IVERKSETTER_VEDTAK',
    AVSLUTTET = 'AVSLUTTET',
}

export enum Behandlingstype {
    FØRSTEGANGSBEHANDLING = 'FØRSTEGANGSBEHANDLING',
    MIGRERING_FRA_INFOTRYGD = 'MIGRERING_FRA_INFOTRYGD',
    REVURDERING = 'REVURDERING',
    TEKNISK_OPPHØR = 'TEKNISK_OPPHØR',
}

export enum BehandlingResultat {
    AVSLÅTT = 'AVSLÅTT',
    IKKE_VURDERT = 'IKKE_VURDERT',
    INNVILGET = 'INNVILGET',
    OPPHØRT = 'OPPHØRT',
    HENLAGT_FEILAKTIG_OPPRETTET = 'HENLAGT_FEILAKTIG_OPPRETTET',
    HENLAGT_SØKNAD_TRUKKET = 'HENLAGT_SØKNAD_TRUKKET',
}

export enum BehandlerRolle {
    UKJENT = 0,
    VEILEDER = 1,
    SAKSBEHANDLER = 2,
    BESLUTTER = 3,
    SYSTEM = 4,
}

export interface IBehandling {
    aktiv: boolean;
    arbeidsfordelingPåBehandling: IArbeidsfordelingPåBehandling;
    begrunnelse: string;
    behandlingId: number;
    endretAv: string;
    kategori: BehandlingKategori;
    opprettetTidspunkt: string;
    personResultater: IRestPersonResultat[];
    personer: IGrunnlagPerson[];
    samletResultat: BehandlingResultat;
    status: BehandlingStatus;
    steg: BehandlingSteg;
    stegTilstand: IRestStegTilstand[];
    totrinnskontroll?: ITotrinnskontroll;
    opplysningsplikt?: IOpplysningsplikt;
    type: Behandlingstype;
    underkategori: BehandlingUnderkategori;
    vedtakForBehandling: IVedtakForBehandling[];
    utbetalingsperioder: IUtbetalingsperiode[];
    andelerTilkjentYtelse: IAndelTilkjentYtelse[];
    årsak: BehandlingÅrsak;
    skalBehandlesAutomatisk: boolean;
}

export interface IArbeidsfordelingPåBehandling {
    behandlendeEnhetId: string;
    behandlendeEnhetNavn: string;
    manueltOverstyrt: boolean;
}

export const behandlerRoller: INøkkelPar = {
    SYSTEM: { id: 'SYSTEM', navn: 'System' },
    VEILEDER: { id: 'VEILEDER', navn: 'Veileder' },
    SAKSBEHANDLER: { id: 'SAKSBEHANDLER', navn: 'Saksbehandler' },
    BESLUTTER: { id: 'BESLUTTER', navn: 'Beslutter' },
};

export const behandlingstyper: INøkkelPar = {
    FØRSTEGANGSBEHANDLING: {
        id: 'FØRSTEGANGSBEHANDLING',
        navn: 'Førstegangsbehandling',
    },
    MIGRERING_FRA_INFOTRYGD: {
        id: 'MIGRERING_FRA_INFOTRYGD',
        navn: 'Migrering fra infotrygd',
    },
    MIGRERING_FRA_INFOTRYGD_OPPHØRT: {
        id: 'MIGRERING_FRA_INFOTRYGD',
        navn: 'Opphør migrering fra infotrygd',
    },
    REVURDERING: {
        id: 'REVURDERING',
        navn: 'Revurdering',
    },
    TEKNISK_OPPHØR: {
        id: 'TEKNISK_OPPHØR',
        navn: 'Teknisk opphør',
    },
    KLAGE: {
        id: 'KLAGE',
        navn: 'Klage',
    },
};

export const kategorier: INøkkelPar = {
    NASJONAL: {
        id: 'NASJONAL',
        navn: 'Nasjonal',
    },
    EØS: {
        id: 'EØS',
        navn: 'EØS',
    },
};

export const underkategorier: INøkkelPar = {
    ORDINÆR: {
        id: 'ORDINÆR',
        navn: 'Ordinær',
    },
    UTVIDET: {
        id: 'UTVIDET',
        navn: 'Utvidet',
    },
};

export const behandlingsresultater: Record<BehandlingResultat, string> = {
    AVSLÅTT: 'Avslått',
    IKKE_VURDERT: 'Ikke vurdert',
    INNVILGET: 'Innvilget',
    OPPHØRT: 'Opphørt',
    HENLAGT_FEILAKTIG_OPPRETTET: 'Henlagt (feilaktig opprettet)',
    HENLAGT_SØKNAD_TRUKKET: 'Henlagt (søknad trukket)',
};

type Behandlingsstatuser = {
    [key in BehandlingStatus]: string;
};

export const behandlingsstatuser: Behandlingsstatuser = {
    OPPRETTET: 'Opprettet',
    UTREDES: 'Utredes',
    FATTER_VEDTAK: 'Fatter vedtak',
    IVERKSETTER_VEDTAK: 'Iverksetter vedtak',
    AVSLUTTET: 'Avsluttet',
};
