import { Textarea } from '@navikt/ds-react';
import { validerFritekstKulepunkt } from '@utils/fritekstfelter';
import { useController, useFormContext } from 'react-hook-form';

import styles from './Brevskjema.module.css';
import { Brevmal } from './typer';
import { SendManueltBrevFeltnavn, type SendManueltBrevFormValues } from './useSendManueltBrevForm';
import { useSkjemaErLåst } from './useSkjemaErLåst';

const makslengdeFritekstHvertKulepunkt = 220;

const hjelpetekstVarselAnnenForelderMedSelvstendigRettSøkt =
    'Skriv her hvilke opplysninger vi har som er av betydning for saken. For eksempel: Vi har fått opplyst at barnet bor fast sammen med den andre forelderen.';

interface Props {
    index: number;
    valideringsmelding?: string;
}

export function FritekstKulepunktField({ index, valideringsmelding }: Props) {
    const { control, watch } = useFormContext<SendManueltBrevFormValues>();
    const skjemaErLåst = useSkjemaErLåst();

    const valgtBrevmal = watch(SendManueltBrevFeltnavn.BREVMAL);

    const hjelpetekst =
        index === 0 && valgtBrevmal === Brevmal.VARSEL_ANNEN_FORELDER_MED_SELVSTENDIG_RETT_SØKT
            ? hjelpetekstVarselAnnenForelderMedSelvstendigRettSøkt
            : '';

    const { field, fieldState } = useController({
        name: `${SendManueltBrevFeltnavn.FRITEKST_KULEPUNKTER}.${index}.tekst`,
        control,
        rules: {
            validate: (tekst: string) =>
                validerFritekstKulepunkt({ tekst, valideringsmelding }, makslengdeFritekstHvertKulepunkt),
        },
    });

    return (
        <Textarea
            {...field}
            className={styles.textarea}
            label="Skriv inn kulepunkt"
            hideLabel
            size={'small'}
            maxLength={makslengdeFritekstHvertKulepunkt}
            description={hjelpetekst}
            readOnly={skjemaErLåst}
            error={fieldState.error?.message}
            autoFocus
        />
    );
}
