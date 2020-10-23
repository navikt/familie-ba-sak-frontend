export interface IOpplysningsplikt {
    status: OpplysningspliktStatus | undefined;
    begrunnelse: string;
}

export enum OpplysningspliktStatus {
    MOTTATT = 'MOTTATT',
    IKKE_MOTTATT_AVSLAG = 'IKKE_MOTTATT_AVSLAG',
    IKKE_MOTTATT_FORTSETT = 'IKKE_MOTTATT_FORTSETT',
}
