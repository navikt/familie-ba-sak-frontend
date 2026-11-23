import { type IRestKorrigertEtterbetaling, KorrigertEtterbetalingÅrsak } from '@typer/vedtak';

export function lagKorrigertEtterbetaling(
    korrigertEtterbetaling?: Partial<IRestKorrigertEtterbetaling>
): IRestKorrigertEtterbetaling {
    return {
        årsak: KorrigertEtterbetalingÅrsak.FEIL_TIDLIGERE_UTBETALT_BELØP,
        beløp: 1000,
        begrunnelse: 'Begrunnelse for korrigering',
        ...korrigertEtterbetaling,
    };
}

export * as KorrigertEtterbetalingTestdata from './korrigertEtterbetalingTestdata';
