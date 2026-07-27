import { useOnFormSubmitSuccessful } from '@hooks/useOnFormSubmitSuccessful';
import { useOppdaterValutakurs } from '@hooks/useOppdaterValutakurs';
import { useSlettValutakurs } from '@hooks/useSlettValutakurs';
import type { OptionType } from '@typer/common';
import type { IRestValutakurs } from '@typer/eøsPerioder';
import {
    dateTilIsoDatoStringEllerUndefined,
    type IIsoMånedPeriode,
    isoStringTilDate,
    nyIsoMånedPeriode,
} from '@utils/dato';
import { konverterDesimalverdiTilSkjemaVisning, konverterSkjemaverdiTilDesimal } from '@utils/eøs';
import { isBefore } from 'date-fns';
import { useForm, useWatch } from 'react-hook-form';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { useBehandlingContext } from '../../../../context/BehandlingContext';

export enum ValutakursFelt {
    BARN = 'barnIdenter',
    PERIODE = 'periode',
    VALUTAKODE = 'valutakode',
    VALUTAKURSDATO = 'valutakursdato',
    KURS = 'kurs',
}

export interface ValutakursFormValues {
    [ValutakursFelt.BARN]: OptionType[];
    [ValutakursFelt.PERIODE]: IIsoMånedPeriode;
    [ValutakursFelt.VALUTAKODE]: string | undefined;
    [ValutakursFelt.VALUTAKURSDATO]: Date | undefined;
    [ValutakursFelt.KURS]: string | undefined;
}

export const valutakursFeilmeldingId = (valutakurs: IRestValutakurs): string =>
    `valutakurs_${valutakurs.barnIdenter.map(barn => `${barn}-`)}_${valutakurs.fom}`;

// Systemet har ikke automatiske valutakurser for islandske kroner (ISK) med valutakursdato før 1. februar 2018.
const FØRSTE_DATO_MED_AUTOMATISK_ISK_KURS = new Date(2018, 1, 1, 0, 0, 0);

interface Props {
    valutakurs: IRestValutakurs;
    barnIValutakurs: OptionType[];
    lukkSkjema: () => void;
}

export const useValutakursSkjema = ({ valutakurs, barnIValutakurs, lukkSkjema }: Props) => {
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const { mutateAsync: oppdaterValutakurs } = useOppdaterValutakurs();
    const { mutateAsync: slettValutakursMutate, isPending: sletterValutakurs } = useSlettValutakurs();

    const form = useForm<ValutakursFormValues>({
        values: {
            [ValutakursFelt.BARN]: barnIValutakurs,
            [ValutakursFelt.PERIODE]: nyIsoMånedPeriode(valutakurs.fom, valutakurs.tom),
            [ValutakursFelt.VALUTAKODE]: valutakurs.valutakode,
            [ValutakursFelt.VALUTAKURSDATO]: valutakurs.valutakursdato
                ? isoStringTilDate(valutakurs.valutakursdato)
                : undefined,
            [ValutakursFelt.KURS]: konverterDesimalverdiTilSkjemaVisning(valutakurs.kurs),
        },
    });

    const { control, setError, reset } = form;

    useOnFormSubmitSuccessful(control, () => reset());

    const valutakode = useWatch({ control, name: ValutakursFelt.VALUTAKODE });
    const valutakursdato = useWatch({ control, name: ValutakursFelt.VALUTAKURSDATO });

    const erManuellInputAvKurs: boolean =
        valutakode === 'ISK' && !!valutakursdato && isBefore(valutakursdato, FØRSTE_DATO_MED_AUTOMATISK_ISK_KURS);

    const onSubmit = async (values: ValutakursFormValues) => {
        try {
            const oppdatertBehandling = await oppdaterValutakurs({
                behandlingId: behandling.behandlingId,
                id: valutakurs.id,
                fom: values.periode.fom ?? '',
                tom: values.periode.tom,
                barnIdenter: values.barnIdenter.map(barn => barn.value),
                valutakode: values.valutakode,
                valutakursdato: dateTilIsoDatoStringEllerUndefined(values.valutakursdato),
                kurs: konverterSkjemaverdiTilDesimal(values.kurs),
            });
            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
            lukkSkjema();
        } catch (error) {
            setError('root', {
                message: error instanceof Error ? error.message : 'Teknisk feil ved lagring av valutakurs.',
            });
        }
    };

    const slettValutakurs = async () => {
        try {
            const oppdatertBehandling = await slettValutakursMutate({
                behandlingId: behandling.behandlingId,
                valutakursId: valutakurs.id,
            });
            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
            lukkSkjema();
        } catch (error) {
            setError('root', {
                message: error instanceof Error ? error.message : 'Teknisk feil ved sletting av valutakurs.',
            });
        }
    };

    return {
        form,
        onSubmit,
        slettValutakurs,
        sletterValutakurs,
        erManuellInputAvKurs,
        initiellFom: valutakurs.fom,
    };
};
