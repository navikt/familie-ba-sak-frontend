import { useBehandling } from '@hooks/useBehandling';
import { useBruker } from '@hooks/useBruker';
import { useFagsak } from '@hooks/useFagsak';
import { HStack, Label, Select, Tag } from '@navikt/ds-react';
import { målform } from '@typer/søknad';
import type { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import styles from './Brevskjema.module.css';
import { erBrevmalMedObligatoriskFritekstKulepunkt } from './brevmalRegler';
import { type Brevmal, type BrevtypeSelect, brevmaler } from './typer';
import {
    type BrevModulFormValues,
    BrevmodulFeltnavn,
    brevModulSkjemaStandardverdier,
    useMottakersMålform,
} from './useBrevModul';
import { useSkjemaErLåst } from './useSkjemaErLåst';

const OBLIGATORISK_FRITEKST_KULEPUNKT_VALIDERINGSMELDING =
    'Dette kulepunktet er obligatorisk. Du må skrive tekst i feltet.';

interface Props {
    brevMaler: Brevmal[];
}

export function BrevmalField({ brevMaler }: Props) {
    const behandling = useBehandling();
    const fagsak = useFagsak();
    const bruker = useBruker();
    const { control, getValues, reset } = useFormContext<BrevModulFormValues>();
    const mottakersMålform = useMottakersMålform();
    const skjemaErLåst = useSkjemaErLåst();

    const {
        field: { value },
        fieldState: { error },
    } = useController({
        name: BrevmodulFeltnavn.BREVMAL,
        control,
        rules: { validate: verdi => (verdi ? true : 'Du må velge en brevmal') },
    });

    /**
     * Nullstiller relevante felter når brevmal endres, og legger til et initielt obligatorisk
     * fritekstpunkt for brevmaler som krever det. Vi bruker reset (fremfor setValue) slik at
     * innsendt-tilstanden og eventuelle valideringsfeil også nullstilles. Ellers ville feilmeldinger
     * fra en tidligere innsending/forhåndsvisning blitt vist umiddelbart på de tomme feltene i den nye brevmalen.
     */
    const onEndreBrevmal = (nyBrevmal: Brevmal | '') => {
        reset({
            ...brevModulSkjemaStandardverdier(behandling, fagsak, bruker),
            [BrevmodulFeltnavn.MOTTAKER_IDENT]: getValues(BrevmodulFeltnavn.MOTTAKER_IDENT),
            [BrevmodulFeltnavn.BREVMAL]: nyBrevmal,
            [BrevmodulFeltnavn.FRITEKST_KULEPUNKTER]:
                nyBrevmal !== '' && erBrevmalMedObligatoriskFritekstKulepunkt(nyBrevmal)
                    ? [{ tekst: '', valideringsmelding: OBLIGATORISK_FRITEKST_KULEPUNKT_VALIDERINGSMELDING }]
                    : [],
        });
    };

    return (
        <Select
            value={value}
            error={error?.message}
            readOnly={skjemaErLåst}
            className={styles.select}
            label={
                <HStack marginBlock={'space-16 space-8'} justify={'space-between'}>
                    <Label>Velg brevmal</Label>
                    <Tag variant="neutral" size="small">
                        {målform[mottakersMålform]}
                    </Tag>
                </HStack>
            }
            onChange={(event: ChangeEvent<BrevtypeSelect>): void => onEndreBrevmal(event.target.value as Brevmal | '')}
        >
            <option value={''}>Velg</option>
            {brevMaler.map(mal => (
                <option aria-selected={mal === value} key={mal} value={mal}>
                    {brevmaler[mal]}
                </option>
            ))}
        </Select>
    );
}
