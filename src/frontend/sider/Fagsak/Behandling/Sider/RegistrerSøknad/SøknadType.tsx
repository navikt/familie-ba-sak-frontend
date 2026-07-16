import { useErLesevisning } from '@hooks/useErLesevisning';
import { behandlingUnderkategori, BehandlingUnderkategori } from '@typer/behandlingstema';
import { useController, useFormContext } from 'react-hook-form';

import { Heading, Radio, RadioGroup } from '@navikt/ds-react';

import { RegistrerSøknadFelt, type RegistrerSøknadFormValues } from './SøknadContext';
import styles from './SøknadType.module.css';

export const SøknadType = () => {
    const erLesevisning = useErLesevisning();

    const { control } = useFormContext<RegistrerSøknadFormValues>();

    const {
        field: { value, onChange },
        formState: { isSubmitting },
    } = useController({
        name: RegistrerSøknadFelt.UNDERKATEGORI,
        control,
    });

    return (
        <RadioGroup
            className={styles.radioGroup}
            readOnly={isSubmitting || erLesevisning}
            value={behandlingUnderkategori[value]}
            legend={<Heading size={'medium'} level={'2'} children={'Hva har bruker søkt om?'} />}
        >
            <Radio
                className={styles.radio}
                value={behandlingUnderkategori[BehandlingUnderkategori.ORDINÆR]}
                name={'registrer-søknad-søknadtype'}
                checked={value === BehandlingUnderkategori.ORDINÆR}
                onChange={() => onChange(BehandlingUnderkategori.ORDINÆR)}
            >
                {behandlingUnderkategori[BehandlingUnderkategori.ORDINÆR]}
            </Radio>
            <Radio
                className={styles.radio}
                value={behandlingUnderkategori[BehandlingUnderkategori.UTVIDET]}
                name={'registrer-søknad-søknadtype'}
                checked={value === BehandlingUnderkategori.UTVIDET}
                onChange={() => onChange(BehandlingUnderkategori.UTVIDET)}
            >
                {behandlingUnderkategori[BehandlingUnderkategori.UTVIDET]}
            </Radio>
        </RadioGroup>
    );
};
