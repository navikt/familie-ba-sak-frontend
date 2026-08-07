export enum TotrinnskontrollBeslutning {
    IKKE_VURDERT = 'IKKE_VURDERT',
    GODKJENT = 'GODKJENT',
    UNDERKJENT = 'UNDERKJENT',
}

export interface ITotrinnskontroll {
    saksbehandler: string;
    saksbehandlerId: string;
    beslutter?: string;
    godkjent: boolean;
    opprettetTidspunkt: string;
}
