export enum TotrinnskontrollBeslutning {
    IKKE_VURDERT = 'IKKE_VURDERT',
    GODKJENT = 'GODKJENT',
    UNDERKJENT = 'UNDERKJENT',
}

export interface ITotrinnskontrollData {
    beslutning: TotrinnskontrollBeslutning;
    begrunnelse: string;
}
