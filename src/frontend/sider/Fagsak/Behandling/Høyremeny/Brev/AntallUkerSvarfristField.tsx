import { TextField } from '@navikt/ds-react';
import type { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import styles from './Brevskjema.module.css';
import { type BrevModulFormValues, BrevmodulFeltnavn } from './useBrevModul';
import { useSkjemaErLåst } from './useSkjemaErLåst';

const maksSvarfristUker = 4 * 5;

export function AntallUkerSvarfristField() {
    const { control } = useFormContext<BrevModulFormValues>();
    const skjemaErLåst = useSkjemaErLåst();

    const {
        field,
        fieldState: { error },
    } = useController({
        name: BrevmodulFeltnavn.ANTALL_UKER_SVARFRIST,
        control,
        rules: {
            validate: verdi => {
                if (verdi === '') {
                    return 'Antall uker svarfrist er ikke satt';
                }
                if (Number.isNaN(verdi) || verdi < 1) {
                    return 'Antall uker svarfrist må være et positivt tall';
                }
                if (verdi > maksSvarfristUker) {
                    return `Du kan ikke sette antall uker svartid til mer enn ${maksSvarfristUker} uker (5 måneder)`;
                }
                return true;
            },
        },
    });

    return (
        <TextField
            label={'Antall uker svarfrist'}
            size={'small'}
            className={styles.textField}
            readOnly={skjemaErLåst}
            value={field.value === '' ? '' : field.value}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                field.onChange(event.target.value === '' ? '' : Number(event.target.value))
            }
            onBlur={field.onBlur}
            error={error?.message}
        />
    );
}
