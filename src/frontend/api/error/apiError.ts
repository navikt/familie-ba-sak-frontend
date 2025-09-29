import type { RessursStatus } from '@navikt/familie-typer';

enum Type {
    IKKE_HENTET = 'IKKE_HENTET',
    HENTER = 'HENTER',
    IKKE_TILGANG = 'IKKE_TILGANG',
    FEILET = 'FEILET',
    FUNKSJONELL_FEIL = 'FUNKSJONELL_FEIL',
}

export class ApiError extends Error {
    static readonly Type = Type;
    public readonly type: Type;

    static opprettFraRessurs(message: string, status: Exclude<RessursStatus, RessursStatus.SUKSESS>) {
        return this.opprettFra(message, Type[status]);
    }

    static opprettFra(message: string, type: Type) {
        return new ApiError(message, type);
    }

    constructor(message: string, type: Type) {
        super(message);
        this.type = type;
    }
}
