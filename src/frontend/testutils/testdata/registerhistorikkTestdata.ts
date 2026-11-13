import type { IRestRegisterhistorikk } from '@typer/person';

export function lagRegisterhistorikk(registerhistorikk: Partial<IRestRegisterhistorikk> = {}): IRestRegisterhistorikk {
    return {
        hentetTidspunkt: '2025-01-01T12:00:00',
        sivilstand: [],
        oppholdstillatelse: [],
        statsborgerskap: [],
        bostedsadresse: [],
        oppholdsadresse: [],
        dødsboadresse: [],
        deltBosted: [],
        historiskeIdenter: [],
        arbeidsforhold: [],
        ...registerhistorikk,
    };
}

export * as RegisterhistorikkTestdata from './registerhistorikkTestdata';
