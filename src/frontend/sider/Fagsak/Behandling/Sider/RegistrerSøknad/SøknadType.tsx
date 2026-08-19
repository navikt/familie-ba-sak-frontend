import { useErLesevisning } from '@hooks/useErLesevisning';
import { Heading, Radio, RadioGroup } from '@navikt/ds-react';
import { BehandlingUnderkategori, behandlingUnderkategori } from '@typer/behandlingstema';

import { useSøknadContext } from './SøknadContext';
import styles from './SøknadType.module.css';

export const SøknadType = () => {
    const { skjema } = useSøknadContext();

    const erLesevisning = useErLesevisning();

    const radioOnChange = (underKategori: BehandlingUnderkategori) => {
        skjema.felter.underkategori.validerOgSettFelt(underKategori);
    };

    return (
        <RadioGroup
            className={styles.radioGroup}
            {...skjema.felter.underkategori.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
            readOnly={erLesevisning}
            value={behandlingUnderkategori[skjema.felter.underkategori.verdi]}
            legend={
                <Heading size={'medium'} level={'2'}>
                    Hva har bruker søkt om?
                </Heading>
            }
        >
            <Radio
                className={styles.radio}
                value={behandlingUnderkategori[BehandlingUnderkategori.ORDINÆR]}
                name={'registrer-søknad-søknadtype'}
                checked={skjema.felter.underkategori.verdi === BehandlingUnderkategori.ORDINÆR}
                onChange={() => radioOnChange(BehandlingUnderkategori.ORDINÆR)}
            >
                {behandlingUnderkategori[BehandlingUnderkategori.ORDINÆR]}
            </Radio>
            <Radio
                className={styles.radio}
                value={behandlingUnderkategori[BehandlingUnderkategori.UTVIDET]}
                name={'registrer-søknad-søknadtype'}
                checked={skjema.felter.underkategori.verdi === BehandlingUnderkategori.UTVIDET}
                onChange={() => radioOnChange(BehandlingUnderkategori.UTVIDET)}
            >
                {behandlingUnderkategori[BehandlingUnderkategori.UTVIDET]}
            </Radio>
        </RadioGroup>
    );
};
