import { Textarea } from '@navikt/ds-react';
import { validerFritekstKulepunkt } from '@utils/fritekstfelter';
import { useController, useFormContext } from 'react-hook-form';

import styles from './Brevskjema.module.css';
import { SendManueltBrevFeltnavn, type SendManueltBrevFormValues } from './useSendManueltBrevForm';
import { useSkjemaErLåst } from './useSkjemaErLåst';

const makslengdeFritekstHvertKulepunkt = 220;

interface Props {
    index: number;
    valideringsmelding?: string;
    hjelpetekst: string;
}

export function FritekstKulepunktField({ index, valideringsmelding, hjelpetekst }: Props) {
    const { control } = useFormContext<SendManueltBrevFormValues>();
    const skjemaErLåst = useSkjemaErLåst();

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
