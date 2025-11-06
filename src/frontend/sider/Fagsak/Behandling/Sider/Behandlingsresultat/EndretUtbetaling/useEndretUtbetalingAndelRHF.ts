import { isEqual } from 'date-fns';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { byggDataRessurs } from '@navikt/familie-typer';

import { useOnFormSubmitSuccessful } from '../../../../../../hooks/useOnFormSubmitSuccessful';
import {
    OppdaterEndretUtbetalingAndelMutationKeyFactory,
    useOppdaterEndretUtbetalingAndel,
} from '../../../../../../hooks/useOppdaterEndretUtbetalingAndel';
import { useSlettEndretUtbetalingAndel } from '../../../../../../hooks/useSlettEndretUtbetalingAndel';
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
    lagretEndretUtbetalingAndel: IRestEndretUtbetalingAndel,
    lukkSkjema: () => void
) => {
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const personer = lagretEndretUtbetalingAndel.personIdenter.map(ident => ({
        value: ident,
        label: lagPersonLabel(ident, behandling.personer),
    }));

    const form = useForm<EndretUtbetalingAndelFormValues>({
        values: {
            [EndretUtbetalingAndelFeltnavn.PERSONER]: personer,
            [EndretUtbetalingAndelFeltnavn.FOM]: isoStringTilDateEllerUndefined(lagretEndretUtbetalingAndel.fom),
            [EndretUtbetalingAndelFeltnavn.TOM]: isoStringTilDateEllerUndefined(lagretEndretUtbetalingAndel.tom),
            [EndretUtbetalingAndelFeltnavn.UTBETALING]: prosentTilUtbetaling(lagretEndretUtbetalingAndel.prosent) || '',
            [EndretUtbetalingAndelFeltnavn.ÅRSAK]: lagretEndretUtbetalingAndel.årsak || '',
            [EndretUtbetalingAndelFeltnavn.SØKNADSTIDSPUNKT]: isoStringTilDateEllerUndefined(
                lagretEndretUtbetalingAndel.søknadstidspunkt
            ),
            [EndretUtbetalingAndelFeltnavn.AVTALETIDSPUNKT_DELT_BOSTED]: isoStringTilDateEllerUndefined(
                lagretEndretUtbetalingAndel.avtaletidspunktDeltBosted
            ),
            [EndretUtbetalingAndelFeltnavn.BEGRUNNELSE]: lagretEndretUtbetalingAndel.begrunnelse || '',
        },
    });

    const { control, reset, watch, setError } = form;

    useOnFormSubmitSuccessful(control, () => reset());

    const onSuccess = (behandling: IBehandling) => {
        lukkSkjema();
        settÅpenBehandling(byggDataRessurs(behandling));
    };

    const onError = (error: Error) => {
        setError('root', {
            message: error.message ?? 'Ukjent feil oppstod.',
        });
    };

    const { mutate: oppdaterEndretUtbetalingAndel } = useOppdaterEndretUtbetalingAndel({
        mutationKey: OppdaterEndretUtbetalingAndelMutationKeyFactory.endretUtbetalingAndel(lagretEndretUtbetalingAndel),
        onSuccess,
        onError,
    });

    const { mutate: slettLagretEndretUtbetalingAndel } = useSlettEndretUtbetalingAndel({
        onSuccess,
        onError,
    });

    const slettEndretUtbetalingAndel = () => slettLagretEndretUtbetalingAndel(lagretEndretUtbetalingAndel);

    const onSubmit: SubmitHandler<EndretUtbetalingAndelFormValues> = (values: EndretUtbetalingAndelFormValues) =>
        oppdaterEndretUtbetalingAndel({
            id: lagretEndretUtbetalingAndel.id,
            personIdenter: values.personer.map(person => person.value),
            prosent: utbetalingTilProsent(values.utbetaling || undefined),
            fom: dateTilIsoMånedStringEllerUndefined(values.fom),
            tom: dateTilIsoMånedStringEllerUndefined(values.tom),
            årsak: values.årsak || undefined,
            begrunnelse: values.begrunnelse,
            søknadstidspunkt: dateTilIsoDatoStringEllerUndefined(values.søknadstidspunkt),
            avtaletidspunktDeltBosted: dateTilIsoDatoStringEllerUndefined(values.avtaletidspunktDeltBosted),
            erTilknyttetAndeler: lagretEndretUtbetalingAndel.erTilknyttetAndeler,
        });

    const skjemaHarEndringerSomIkkeErLagret = (): boolean => {
        const formValues = watch();

        const originalFom = isoStringTilDateEllerUndefined(lagretEndretUtbetalingAndel.fom);
        const originalTom = isoStringTilDateEllerUndefined(lagretEndretUtbetalingAndel.tom);
        const originalSøknadstidspunkt = isoStringTilDateEllerUndefined(lagretEndretUtbetalingAndel.søknadstidspunkt);
        const originalAvtaletidspunkt = isoStringTilDateEllerUndefined(
            lagretEndretUtbetalingAndel.avtaletidspunktDeltBosted
        );
        const originalUtbetaling = prosentTilUtbetaling(lagretEndretUtbetalingAndel.prosent) || '';

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
            formValues.årsak !== (lagretEndretUtbetalingAndel.årsak || '') ||
            !datesEqual(formValues.søknadstidspunkt, originalSøknadstidspunkt) ||
            !datesEqual(formValues.avtaletidspunktDeltBosted, originalAvtaletidspunkt) ||
            formValues.begrunnelse !== (lagretEndretUtbetalingAndel.begrunnelse || '')
        );
    };

    return {
        form,
        onSubmit,
        skjemaHarEndringerSomIkkeErLagret,
        slettEndretUtbetalingAndel,
    };
};
