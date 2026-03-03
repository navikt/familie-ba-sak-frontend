export var IEndretUtbetalingAndelÅrsak;
(function (IEndretUtbetalingAndelÅrsak) {
    IEndretUtbetalingAndelÅrsak["DELT_BOSTED"] = "DELT_BOSTED";
    IEndretUtbetalingAndelÅrsak["ENDRE_MOTTAKER"] = "ENDRE_MOTTAKER";
    IEndretUtbetalingAndelÅrsak["ALLEREDE_UTBETALT"] = "ALLEREDE_UTBETALT";
    IEndretUtbetalingAndelÅrsak["ETTERBETALING_3\u00C5R"] = "ETTERBETALING_3\u00C5R";
    IEndretUtbetalingAndelÅrsak["ETTERBETALING_3MND"] = "ETTERBETALING_3MND";
})(IEndretUtbetalingAndelÅrsak || (IEndretUtbetalingAndelÅrsak = {}));
export const årsakTekst = {
    DELT_BOSTED: 'Delt bosted',
    ENDRE_MOTTAKER: 'Endre mottaker, begge foreldre rett - opphør',
    ALLEREDE_UTBETALT: 'Allerede utbetalt - innvilgelse',
    ETTERBETALING_3ÅR: 'Etterbetaling 3 år',
    ETTERBETALING_3MND: 'Etterbetaling 3 måneder',
};
export const årsaker = Object.keys(IEndretUtbetalingAndelÅrsak).map(k => k);
