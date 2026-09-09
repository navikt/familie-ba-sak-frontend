import { useErLesevisning } from '@hooks/useErLesevisning';
import { PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import { Button, Fieldset, HStack, Label, Textarea } from '@navikt/ds-react';
import type { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import styles from './Brevskjema.module.css';
import type { BrevModulFormValues } from './useBrevModul';

const maksLengdeFritekstAvsnitt = 1000;
const fritekstSkjemaGruppeId = 'Fritekster-brev';

interface Props {
    visFritekstAvsnittTekstboks: boolean;
    settVisFritekstAvsnittTekstboks: (vis: boolean) => void;
}

export function FritekstAvsnittField({ visFritekstAvsnittTekstboks, settVisFritekstAvsnittTekstboks }: Props) {
    const { control } = useFormContext<BrevModulFormValues>();
    const erLesevisning = useErLesevisning();

    const {
        field,
        fieldState: { error },
    } = useController({
        name: 'fritekstAvsnitt',
        control,
        rules: {
            validate: verdi => {
                if (verdi === undefined) {
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
                            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => field.onChange(event.target.value)}
                            error={error?.message}
                            autoFocus
                        />

                        <Button
                            type={'button'}
                            variant={'tertiary'}
                            onClick={() => {
                                field.onChange(undefined);
                                settVisFritekstAvsnittTekstboks(false);
                            }}
                            id={`fjern_fritekst`}
                            size={'small'}
                            aria-label={'Fjern fritekst'}
                            icon={<TrashIcon />}
                            className={styles.removeButton}
                        >
                            {'Fjern'}
                        </Button>
                    </HStack>
                </Fieldset>
            ) : (
                !erLesevisning && (
                    <Button
                        type={'button'}
                        variant={'tertiary'}
                        onClick={() => settVisFritekstAvsnittTekstboks(true)}
                        id={`legg-til-fritekst-avsnitt`}
                        size={'small'}
                        icon={<PlusCircleIcon />}
                        className={styles.addButton}
                    >
                        {'Legg til fritekst avsnitt'}
                    </Button>
                )
            )}
        </div>
    );
}
