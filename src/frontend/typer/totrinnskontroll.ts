export enum TotrinnskontrollBeslutning {
    IKKE_VURDERT = 'IKKE_VURDERT',
    GODKJENT = 'GODKJENT',
    UNDERKJENT = 'UNDERKJENT',
}

export interface ITotrinnskontrollData {
    beslutning: TotrinnskontrollBeslutning;
    begrunnelse: string;
    kontrollerteSider: string[];
}

export interface ITotrinnskontroll {
    saksbehandler: string;
    beslutter?: string;
    godkjent: boolean;
    opprettetTidspunkt: string;
}
