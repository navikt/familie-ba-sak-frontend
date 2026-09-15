import { useErLesevisning } from '@hooks/useErLesevisning';
import { PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import { Button, Fieldset, HStack, Label, Textarea } from '@navikt/ds-react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import styles from './Brevskjema.module.css';
import { type BrevModulFormValues, BrevmodulFeltnavn } from './useBrevModul';
import { useSkjemaErLåst } from './useSkjemaErLåst';

const maksLengdeFritekstAvsnitt = 1000;
const fritekstSkjemaGruppeId = 'Fritekster-brev';

export function FritekstAvsnittField() {
    const { control } = useFormContext<BrevModulFormValues>();
    const erLesevisning = useErLesevisning();
    const skjemaErLåst = useSkjemaErLåst();

    const {
        field,
        fieldState: { error },
    } = useController({
        name: BrevmodulFeltnavn.FRITEKST_AVSNITT,
        control,
        rules: {
            validate: verdi => {
                if (verdi === null) {
                    return true;
                }
                if (verdi.trim() === '') {
                    return 'Du må skrive tekst i feltet, eller fjerne det om du ikke skal ha fritekst.';
                }
                if (verdi.length > maksLengdeFritekstAvsnitt) {
                    return `Du har nådd maks antall tegn: ${maksLengdeFritekstAvsnitt}`;
                }
                return true;
            },
        },
    });

    const [visFritekstAvsnittTekstboks, settVisFritekstAvsnittTekstboks] = useState(field.value !== null);

    return (
        <div>
            <Label htmlFor={fritekstSkjemaGruppeId}>Legg til fritekst avsnitt</Label>
            {visFritekstAvsnittTekstboks ? (
                <Fieldset legend="Legg til fritekst avsnitt" hideLegend id={fritekstSkjemaGruppeId}>
                    <HStack>
                        <Textarea
                            label="Skriv inn fritekstavsnitt"
                            hideLabel
                            size={'small'}
                            className={styles.textarea}
                            value={field.value ?? ''}
                            maxLength={maksLengdeFritekstAvsnitt}
                            readOnly={skjemaErLåst}
                            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => field.onChange(event.target.value)}
                            error={error?.message}
                            autoFocus
                        />

                        <Button
                            type={'button'}
                            variant={'tertiary'}
                            onClick={() => {
                                field.onChange(null);
                                settVisFritekstAvsnittTekstboks(false);
                            }}
                            size={'small'}
                            disabled={skjemaErLåst}
                            aria-label={'Fjern fritekst'}
                            icon={<TrashIcon />}
                            className={styles.removeButton}
                        >
                            Fjern
                        </Button>
                    </HStack>
                </Fieldset>
            ) : (
                !erLesevisning && (
                    <Button
                        type={'button'}
                        variant={'tertiary'}
                        onClick={() => settVisFritekstAvsnittTekstboks(true)}
                        size={'small'}
                        disabled={skjemaErLåst}
                        icon={<PlusCircleIcon />}
                        className={styles.addButton}
                    >
                        Legg til fritekst avsnitt
                    </Button>
                )
            )}
        </div>
    );
}
