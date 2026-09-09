import { useErLesevisning } from '@hooks/useErLesevisning';
import { PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import { Button, Fieldset, HStack, Label, Textarea } from '@navikt/ds-react';
import { validerFritekstKulepunkt } from '@utils/fritekstfelter';
import type { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import styles from './Brevskjema.module.css';
import { Brevmal } from './typer';
import { type BrevModulFormValues, erBrevmalMedObligatoriskFritekstKulepunkt } from './useBrevModul';

const makslengdeFritekstHvertKulepunkt = 220;
const maksAntallKulepunkter = 20;
const fritekstSkjemaGruppeId = 'Fritekster-brev';

const hjelpetekstVarselAnnenForelderMedSelvstendigRettSøkt =
    'Skriv her hvilke opplysninger vi har som er av betydning for saken. For eksempel: Vi har fått opplyst at barnet bor fast sammen med den andre forelderen.';

interface Props {
    leggTilFritekstKulepunkt: () => void;
}

export function FritekstKulepunkterField({ leggTilFritekstKulepunkt }: Props) {
    const {
        control,
        watch,
        formState: { isSubmitted },
    } = useFormContext<BrevModulFormValues>();
    const erLesevisning = useErLesevisning();

    const valgtBrevmal = watch('brevmal') as Brevmal;

    const { field } = useController({
        name: 'fritekstKulepunkter',
        control,
        rules: {
            validate: kulepunkter =>
                !kulepunkter.some(
                    kulepunkt => validerFritekstKulepunkt(kulepunkt, makslengdeFritekstHvertKulepunkt) !== undefined
                ),
        },
    });

    const erMaksAntallKulepunkter = field.value.length >= maksAntallKulepunkter;

    return (
        <div>
            <Label htmlFor={fritekstSkjemaGruppeId}>Legg til kulepunkt</Label>
            <Fieldset legend="Legg til kulepunkt" hideLegend id={fritekstSkjemaGruppeId}>
                {field.value.map((fritekst, index) => {
                    const fritekstId = fritekst.id;

                    const hjelpetekst =
                        index === 0 && valgtBrevmal === Brevmal.VARSEL_ANNEN_FORELDER_MED_SELVSTENDIG_RETT_SØKT
                            ? hjelpetekstVarselAnnenForelderMedSelvstendigRettSøkt
                            : '';

                    const feilmelding = isSubmitted
                        ? validerFritekstKulepunkt(fritekst, makslengdeFritekstHvertKulepunkt)
                        : undefined;

                    return (
                        <HStack key={`fritekst-${fritekstId}`}>
                            <Textarea
                                key={`fritekst-${fritekstId}`}
                                id={`${fritekstId}`}
                                className={styles.textarea}
                                label="Skriv inn kulepunkt"
                                hideLabel
                                size={'small'}
                                value={fritekst.tekst}
                                maxLength={makslengdeFritekstHvertKulepunkt}
                                description={hjelpetekst}
                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                                    field.onChange(
                                        field.value.map(kulepunkt =>
                                            kulepunkt.id === fritekstId
                                                ? {
                                                      ...kulepunkt,
                                                      tekst: event.target.value,
                                                  }
                                                : kulepunkt
                                        )
                                    )
                                }
                                error={feilmelding}
                                autoFocus
                            />
                            {!(erBrevmalMedObligatoriskFritekstKulepunkt(valgtBrevmal) && index === 0) && (
                                <Button
                                    type={'button'}
                                    variant={'tertiary'}
                                    onClick={() =>
                                        field.onChange(field.value.filter(kulepunkt => kulepunkt.id !== fritekstId))
                                    }
                                    id={`fjern_fritekst-${fritekstId}`}
                                    size={'small'}
                                    aria-label={'Fjern fritekst'}
                                    icon={<TrashIcon />}
                                    className={styles.removeButton}
                                >
                                    {'Fjern'}
                                </Button>
                            )}
                        </HStack>
                    );
                })}
            </Fieldset>

            {!erMaksAntallKulepunkter && !erLesevisning && (
                <Button
                    type={'button'}
                    variant={'tertiary'}
                    onClick={() => leggTilFritekstKulepunkt()}
                    id={`legg-til-fritekst`}
                    size={'small'}
                    icon={<PlusCircleIcon />}
                    className={styles.addButton}
                >
                    {'Legg til kulepunkt'}
                </Button>
            )}
        </div>
    );
}
