import type { IsoDatoString } from '../utils/dato';

export interface IManuellDødsfall {
    dødsfallDato: IsoDatoString;
    begrunnelse: string;
    personIdent: string;
}
