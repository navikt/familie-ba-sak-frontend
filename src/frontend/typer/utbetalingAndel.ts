import { ISODateString, OptionType } from '@navikt/familie-form-elements';

import { FamilieIsoDate } from '../utils/kalender';

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
    tilknyttetAndeler?: boolean;
}

export enum IEndretUtbetalingAndelÅrsak {
    DELT_BOSTED = 'DELT_BOSTED',
}

export const årsakTekst: { [key in IEndretUtbetalingAndelÅrsak]: string } = {
    DELT_BOSTED: 'Delt bosted',
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
