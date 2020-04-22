export enum TotrinnskontrollStatus {
    IKKE_VURDERT = 'IKKE_VURDERT',
    GODKJENT = 'GODKJENT',
    UNDERKJENT = 'UNDERKJENT',
}

export interface ITotrinnskontrollData {
    status: TotrinnskontrollStatus;
    begrunnelse: string;
}
