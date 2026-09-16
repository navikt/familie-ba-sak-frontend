import { useErLesevisning } from '@hooks/useErLesevisning';
import { PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import { Button, Fieldset, HStack, Label } from '@navikt/ds-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import styles from './Brevskjema.module.css';
import { erBrevmalMedObligatoriskFritekstKulepunkt } from './brevmalRegler';
import { FritekstKulepunktField } from './FritekstKulepunktField';
import { Brevmal } from './typer';
import { SendManueltBrevFeltnavn, type SendManueltBrevFormValues } from './useSendManueltBrevForm';
import { useSkjemaErLåst } from './useSkjemaErLåst';

const maksAntallKulepunkter = 20;
const fritekstSkjemaGruppeId = 'Fritekster-brev';

const hjelpetekstVarselAnnenForelderMedSelvstendigRettSøkt =
    'Skriv her hvilke opplysninger vi har som er av betydning for saken. For eksempel: Vi har fått opplyst at barnet bor fast sammen med den andre forelderen.';

export function FritekstKulepunkter() {
    const { control, watch } = useFormContext<SendManueltBrevFormValues>();
    const erLesevisning = useErLesevisning();
    const skjemaErLåst = useSkjemaErLåst();

    const valgtBrevmal = watch(SendManueltBrevFeltnavn.BREVMAL);

    const { fields, append, remove } = useFieldArray({
        control,
        name: SendManueltBrevFeltnavn.FRITEKST_KULEPUNKTER,
    });

    const erMaksAntallKulepunkter = fields.length >= maksAntallKulepunkter;

    const leggTilKulepunkt = () => {
        append({ tekst: '', valideringsmelding: undefined });
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
                        <HStack key={field.id}>
                            <FritekstKulepunktField
                                index={index}
                                valideringsmelding={field.valideringsmelding}
                                hjelpetekst={hjelpetekst}
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
