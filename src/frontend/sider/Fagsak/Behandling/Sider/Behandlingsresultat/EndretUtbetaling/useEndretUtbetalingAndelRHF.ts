import { isEqual } from 'date-fns';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { byggDataRessurs } from '@navikt/familie-typer';

import { useOnFormSubmitSuccessful } from '../../../../../../hooks/useOnFormSubmitSuccessful';
import {
    OppdaterEndretUtbetalingAndelMutationKeyFactory,
    useOppdaterEndretUtbetalingAndel,
} from '../../../../../../hooks/useOppdaterEndretUtbetalingAndel';
import type { IBehandling } from '../../../../../../typer/behandling';
import type { OptionType } from '../../../../../../typer/common';
import type { IEndretUtbetalingAndelÅrsak, IRestEndretUtbetalingAndel } from '../../../../../../typer/utbetalingAndel';
import {
    dateTilIsoDatoStringEllerUndefined,
    dateTilIsoMånedStringEllerUndefined,
    isoStringTilDateEllerUndefined,
} from '../../../../../../utils/dato';
import { lagPersonLabel } from '../../../../../../utils/formatter';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import type { Utbetaling } from '../Utbetaling';
import { prosentTilUtbetaling, utbetalingTilProsent } from '../Utbetaling';

export interface StandardFeltProps {
    erLesevisning?: boolean;
}

export enum EndretUtbetalingAndelFeltnavn {
    PERSONER = 'personer',
    FOM = 'fom',
    TOM = 'tom',
    UTBETALING = 'utbetaling',
    ÅRSAK = 'årsak',
    SØKNADSTIDSPUNKT = 'søknadstidspunkt',
    AVTALETIDSPUNKT_DELT_BOSTED = 'avtaletidspunktDeltBosted',
    BEGRUNNELSE = 'begrunnelse',
}

export interface EndretUtbetalingAndelFormValues {
    [EndretUtbetalingAndelFeltnavn.PERSONER]: OptionType[];
    [EndretUtbetalingAndelFeltnavn.FOM]: Date | undefined;
    [EndretUtbetalingAndelFeltnavn.TOM]: Date | undefined;
    [EndretUtbetalingAndelFeltnavn.UTBETALING]: Utbetaling | '';
    [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak | '';
    [EndretUtbetalingAndelFeltnavn.SØKNADSTIDSPUNKT]: Date | undefined;
    [EndretUtbetalingAndelFeltnavn.AVTALETIDSPUNKT_DELT_BOSTED]: Date | undefined;
    [EndretUtbetalingAndelFeltnavn.BEGRUNNELSE]: string;
}

export const useEndretUtbetalingAndelRHF = (
    endretUtbetalingAndel: IRestEndretUtbetalingAndel,
    lukkSkjema: () => void
) => {
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const personer = endretUtbetalingAndel.personIdenter.map(ident => ({
        value: ident,
        label: lagPersonLabel(ident, behandling.personer),
    }));

    const form = useForm<EndretUtbetalingAndelFormValues>({
        values: {
            [EndretUtbetalingAndelFeltnavn.PERSONER]: personer,
            [EndretUtbetalingAndelFeltnavn.FOM]: isoStringTilDateEllerUndefined(endretUtbetalingAndel.fom),
            [EndretUtbetalingAndelFeltnavn.TOM]: isoStringTilDateEllerUndefined(endretUtbetalingAndel.tom),
            [EndretUtbetalingAndelFeltnavn.UTBETALING]: prosentTilUtbetaling(endretUtbetalingAndel.prosent) || '',
            [EndretUtbetalingAndelFeltnavn.ÅRSAK]: endretUtbetalingAndel.årsak || '',
            [EndretUtbetalingAndelFeltnavn.SØKNADSTIDSPUNKT]: isoStringTilDateEllerUndefined(
                endretUtbetalingAndel.søknadstidspunkt
            ),
            [EndretUtbetalingAndelFeltnavn.AVTALETIDSPUNKT_DELT_BOSTED]: isoStringTilDateEllerUndefined(
                endretUtbetalingAndel.avtaletidspunktDeltBosted
            ),
            [EndretUtbetalingAndelFeltnavn.BEGRUNNELSE]: endretUtbetalingAndel.begrunnelse || '',
        },
    });

    const { control, reset, watch, setError } = form;

    useOnFormSubmitSuccessful(control, () => reset());

    const { mutate: oppdaterEndretUtbetalingAndel } = useOppdaterEndretUtbetalingAndel({
        mutationKey: OppdaterEndretUtbetalingAndelMutationKeyFactory.endretUtbetalingAndel(endretUtbetalingAndel),
        onSuccess: (behandling: IBehandling) => {
            lukkSkjema();
            settÅpenBehandling(byggDataRessurs(behandling));
        },
        onError: (error: Error) => {
            setError('root', {
                message: error.message ?? 'Ukjent feil oppstod.',
            });
        },
    });

    const onSubmit: SubmitHandler<EndretUtbetalingAndelFormValues> = (values: EndretUtbetalingAndelFormValues) =>
        oppdaterEndretUtbetalingAndel({
            id: endretUtbetalingAndel.id,
            personIdenter: values.personer.map(person => person.value),
            prosent: utbetalingTilProsent(values.utbetaling || undefined),
            fom: dateTilIsoMånedStringEllerUndefined(values.fom),
            tom: dateTilIsoMånedStringEllerUndefined(values.tom),
            årsak: values.årsak || undefined,
            begrunnelse: values.begrunnelse,
            søknadstidspunkt: dateTilIsoDatoStringEllerUndefined(values.søknadstidspunkt),
            avtaletidspunktDeltBosted: dateTilIsoDatoStringEllerUndefined(values.avtaletidspunktDeltBosted),
            erTilknyttetAndeler: endretUtbetalingAndel.erTilknyttetAndeler,
        });

    const skjemaHarEndringerSomIkkeErLagret = (): boolean => {
        const formValues = watch();

        const originalFom = isoStringTilDateEllerUndefined(endretUtbetalingAndel.fom);
        const originalTom = isoStringTilDateEllerUndefined(endretUtbetalingAndel.tom);
        const originalSøknadstidspunkt = isoStringTilDateEllerUndefined(endretUtbetalingAndel.søknadstidspunkt);
        const originalAvtaletidspunkt = isoStringTilDateEllerUndefined(endretUtbetalingAndel.avtaletidspunktDeltBosted);
        const originalUtbetaling = prosentTilUtbetaling(endretUtbetalingAndel.prosent) || '';

        const datesEqual = (date1: Date | undefined, date2: Date | undefined): boolean => {
            if (!date1 && !date2) return true;
            if (!date1 || !date2) return false;
            return isEqual(date1, date2);
        };

        return (
            JSON.stringify(formValues.personer) !== JSON.stringify(personer) ||
            !datesEqual(formValues.fom, originalFom) ||
            !datesEqual(formValues.tom, originalTom) ||
            formValues.utbetaling !== originalUtbetaling ||
            formValues.årsak !== (endretUtbetalingAndel.årsak || '') ||
            !datesEqual(formValues.søknadstidspunkt, originalSøknadstidspunkt) ||
            !datesEqual(formValues.avtaletidspunktDeltBosted, originalAvtaletidspunkt) ||
            formValues.begrunnelse !== (endretUtbetalingAndel.begrunnelse || '')
        );
    };

    return {
        form,
        onSubmit,
        skjemaHarEndringerSomIkkeErLagret,
    };
};
