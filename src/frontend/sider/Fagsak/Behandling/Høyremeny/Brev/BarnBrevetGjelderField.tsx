import { useBehandling } from '@hooks/useBehandling';
import { Checkbox, CheckboxGroup, InlineMessage } from '@navikt/ds-react';
import { BehandlingSteg, hentStegNummer } from '@typer/behandling';
import { lagBarnLabel, sorterBarnEtterFødselsdato } from '@utils/formatter';
import { useController, useFormContext } from 'react-hook-form';

import styles from './BarnBrevetGjelder.module.css';
import { type BrevModulFormValues, BrevmodulFeltnavn } from './useBrevModul';
import { useSkjemaErLåst } from './useSkjemaErLåst';

export function BarnBrevetGjelderField() {
    const { control } = useFormContext<BrevModulFormValues>();
    const behandling = useBehandling();
    const skjemaErLåst = useSkjemaErLåst();

    const {
        field,
        fieldState: { error },
    } = useController({
        name: BrevmodulFeltnavn.BARN_BREVET_GJELDER,
        control,
        rules: {
            validate: verdi => (verdi.some(barn => barn.merket) ? true : 'Du må velge hvilke barn brevet gjelder'),
        },
    });

    const barnBrevetGjelder = field.value;
    const merkedeIdenter = barnBrevetGjelder.filter(barn => barn.merket).map(barn => barn.ident);
    const sorterteBarn = sorterBarnEtterFødselsdato(barnBrevetGjelder);

    const skalViseVarselOmManglendeBarn =
        hentStegNummer(behandling.steg) <= hentStegNummer(BehandlingSteg.REGISTRERE_SØKNAD) &&
        barnBrevetGjelder.length === 0;

    const oppdaterBarnMedNyMerketStatus = (barnaSomErMerket: string[]) => {
        field.onChange(barnBrevetGjelder.map(barn => ({ ...barn, merket: barnaSomErMerket.includes(barn.ident) })));
    };

    return (
        <CheckboxGroup
            legend={'Hvilke barn gjelder brevet?'}
            error={error?.message}
            readOnly={skjemaErLåst}
            value={merkedeIdenter}
            onChange={oppdaterBarnMedNyMerketStatus}
        >
            {sorterteBarn.map((barn, index) => {
                const barnLabel = lagBarnLabel(barn);
                return (
                    <Checkbox value={barn.ident} key={'barn-' + index} className={styles.checkbox}>
                        <p title={barnLabel} className={styles.labelTekst}>
                            {barnLabel}
                        </p>
                    </Checkbox>
                );
            })}
            {skalViseVarselOmManglendeBarn && (
                <InlineMessage status="warning" size={'small'}>
                    Du må trykke "Bekreft og fortsett" før du kan legge til barn.
                </InlineMessage>
            )}
        </CheckboxGroup>
    );
}
