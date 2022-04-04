import type { ISODateString, OptionType } from '@navikt/familie-form-elements';

import type { FamilieIsoDate } from '../utils/kalender';

export interface IRestEndretUtbetalingAndel {
    id?: number;
    personIdent?: string;
    prosent?: number;
    fom?: ISODateString;
    tom?: ISODateString;
    begrunnelse?: string;
    søknadstidspunkt?: FamilieIsoDate;
    avtaletidspunktDeltBosted?: FamilieIsoDate;
    årsak?: IEndretUtbetalingAndelÅrsak;
    erTilknyttetAndeler?: boolean;
}

export enum IEndretUtbetalingAndelÅrsak {
    DELT_BOSTED = 'DELT_BOSTED',
    ENDRE_MOTTAKER = 'ENDRE_MOTTAKER',
    ALLEREDE_UTBETALT = 'ALLEREDE_UTBETALT',
    ETTERBETALING_3ÅR = 'ETTERBETALING_3ÅR',
}

export const årsakTekst: { [key in IEndretUtbetalingAndelÅrsak]: string } = {
    DELT_BOSTED: 'Delt bosted',
    ENDRE_MOTTAKER: 'Foreldrene bor sammen, endret mottaker',
    ALLEREDE_UTBETALT: 'Allerede utbetalt',
    ETTERBETALING_3ÅR: 'Etterbetaling 3 år',
};

export interface ÅrsakOption extends OptionType {
    årsak: IEndretUtbetalingAndelÅrsak;
}

export const årsakTilOption = (årsak: IEndretUtbetalingAndelÅrsak): ÅrsakOption => ({
    value: årsak.valueOf(),
    label: årsakTekst[årsak],
    årsak: årsak,
});

export const årsaker: IEndretUtbetalingAndelÅrsak[] = Object.keys(IEndretUtbetalingAndelÅrsak).map(
    k => k as IEndretUtbetalingAndelÅrsak
);

export enum IEndretUtbetalingAndelFullSats {
    FULL_SATS = 'FULL_SATS',
}

export interface SatsOption extends OptionType {
    fullSats: boolean;
}

export const satsTilOption = (fullSats: boolean): SatsOption => ({
    value: fullSats ? '100' : '50',
    label: fullSats ? 'Full' : 'Delt',
    fullSats: fullSats,
});

export const optionTilsats = (satsLabel: string): boolean => {
    if (satsLabel === IEndretUtbetalingAndelFullSats.FULL_SATS.valueOf()) {
        return true;
    } else {
        return false;
    }
};

export const satser: IEndretUtbetalingAndelFullSats[] = Object.keys(
    IEndretUtbetalingAndelFullSats
).map(k => k as IEndretUtbetalingAndelFullSats);
