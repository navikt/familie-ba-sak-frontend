export interface IOpplysningsplikt {
    status: OpplysningspliktStatus;
    begrunnelse: string;
}

export enum OpplysningspliktStatus {
    IKKE_SATT = 'IKKE_SATT',
    MOTTATT = 'MOTTATT',
    IKKE_MOTTATT_AVSLAG = 'IKKE_MOTTATT_AVSLAG',
    IKKE_MOTTATT_FORTSETT = 'IKKE_MOTTATT_FORTSETT',
}

export const opplysningspliktVisningtekst: Record<OpplysningspliktStatus, string> = {
    MOTTATT: 'Mottatt dokumentasjon',
    IKKE_MOTTATT_AVSLAG: 'Ikke mottatt dokumentasjon',
    IKKE_MOTTATT_FORTSETT: 'Fortsett med manglende dokumentasjon',
    IKKE_SATT: 'Ingen opplysninger oppgitt',
};
