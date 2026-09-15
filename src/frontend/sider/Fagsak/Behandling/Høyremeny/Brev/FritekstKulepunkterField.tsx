import { useErLesevisning } from '@hooks/useErLesevisning';
import { PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import { Button, Fieldset, HStack, Label, Textarea } from '@navikt/ds-react';
import {
    genererIdBasertPåAndreFritekstKulepunkter,
    lagInitiellFritekst,
    validerFritekstKulepunkt,
} from '@utils/fritekstfelter';
import { useController, useFieldArray, useFormContext } from 'react-hook-form';

import styles from './Brevskjema.module.css';
import { erBrevmalMedObligatoriskFritekstKulepunkt } from './brevmalRegler';
import { Brevmal } from './typer';
import { type BrevModulFormValues, BrevmodulFeltnavn } from './useBrevModul';
import { useSkjemaErLåst } from './useSkjemaErLåst';

const makslengdeFritekstHvertKulepunkt = 220;
const maksAntallKulepunkter = 20;
const fritekstSkjemaGruppeId = 'Fritekster-brev';

const hjelpetekstVarselAnnenForelderMedSelvstendigRettSøkt =
    'Skriv her hvilke opplysninger vi har som er av betydning for saken. For eksempel: Vi har fått opplyst at barnet bor fast sammen med den andre forelderen.';

interface TekstfeltProps {
    index: number;
    valideringsmelding?: string;
    hjelpetekst: string;
    skjemaErLåst: boolean;
}

function FritekstKulepunktTekstfelt({ index, valideringsmelding, hjelpetekst, skjemaErLåst }: TekstfeltProps) {
    const { control } = useFormContext<BrevModulFormValues>();

    const { field, fieldState } = useController({
        name: `${BrevmodulFeltnavn.FRITEKST_KULEPUNKTER}.${index}.tekst`,
        control,
        rules: {
            validate: (tekst: string) =>
                validerFritekstKulepunkt({ tekst, id: 0, valideringsmelding }, makslengdeFritekstHvertKulepunkt),
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

export function FritekstKulepunkterField() {
    const { control, watch } = useFormContext<BrevModulFormValues>();
    const erLesevisning = useErLesevisning();
    const skjemaErLåst = useSkjemaErLåst();

    const valgtBrevmal = watch(BrevmodulFeltnavn.BREVMAL) as Brevmal;

    const { fields, append, remove } = useFieldArray({
        control,
        name: BrevmodulFeltnavn.FRITEKST_KULEPUNKTER,
        keyName: 'key',
    });

    const erMaksAntallKulepunkter = fields.length >= maksAntallKulepunkter;

    const leggTilKulepunkt = () => {
        append(lagInitiellFritekst('', genererIdBasertPåAndreFritekstKulepunkter(fields)));
    };

    return (
        <div>
            <Label htmlFor={fritekstSkjemaGruppeId}>Legg til kulepunkt</Label>
            <Fieldset legend="Legg til kulepunkt" hideLegend id={fritekstSkjemaGruppeId}>
                {fields.map((field, index) => {
                    const hjelpetekst =
                        index === 0 && valgtBrevmal === Brevmal.VARSEL_ANNEN_FORELDER_MED_SELVSTENDIG_RETT_SØKT
                            ? hjelpetekstVarselAnnenForelderMedSelvstendigRettSøkt
                            : '';

                    const kanFjernes = !(erBrevmalMedObligatoriskFritekstKulepunkt(valgtBrevmal) && index === 0);

                    return (
                        <HStack key={field.key}>
                            <FritekstKulepunktTekstfelt
                                index={index}
                                valideringsmelding={field.valideringsmelding}
                                hjelpetekst={hjelpetekst}
                                skjemaErLåst={skjemaErLåst}
                            />
                            {kanFjernes && (
                                <Button
                                    type={'button'}
                                    variant={'tertiary'}
                                    onClick={() => remove(index)}
                                    size={'small'}
                                    disabled={skjemaErLåst}
                                    aria-label={'Fjern fritekst'}
                                    icon={<TrashIcon />}
                                    className={styles.removeButton}
                                >
                                    Fjern
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
                    onClick={leggTilKulepunkt}
                    size={'small'}
                    disabled={skjemaErLåst}
                    icon={<PlusCircleIcon />}
                    className={styles.addButton}
                >
                    Legg til kulepunkt
                </Button>
            )}
        </div>
    );
}
