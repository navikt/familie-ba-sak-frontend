import { HStack, Label, Select, Tag } from '@navikt/ds-react';
import { type Målform, målform } from '@typer/søknad';
import type { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import styles from './Brevskjema.module.css';
import { type Brevmal, type BrevtypeSelect, brevmaler } from './typer';
import { type BrevModulFormValues, BrevmodulFeltnavn } from './useBrevModul';

interface Props {
    brevMaler: Brevmal[];
    mottakersMålform: (mottakerIdent: string) => Målform;
    onEndreBrevmal: (nyBrevmal: Brevmal | '') => void;
}

export function BrevmalSelect({ brevMaler, mottakersMålform, onEndreBrevmal }: Props) {
    const { control, watch } = useFormContext<BrevModulFormValues>();
    const mottakerIdent = watch(BrevmodulFeltnavn.MOTTAKER_IDENT);

    const {
        field,
        fieldState: { error },
    } = useController({
        name: BrevmodulFeltnavn.BREVMAL,
        control,
        rules: { validate: verdi => (verdi ? true : 'Du må velge en brevmal') },
    });

    return (
        <Select
            id={'velg-brevmal'}
            value={field.value}
            error={error?.message}
            className={styles.select}
            label={
                <HStack marginBlock={'space-16 space-8'} justify={'space-between'}>
                    <Label htmlFor={'velg-brevmal'}>Velg brevmal</Label>
                    <Tag variant="neutral" size="small">
                        {målform[mottakersMålform(mottakerIdent)]}
                    </Tag>
                </HStack>
            }
            onChange={(event: ChangeEvent<BrevtypeSelect>): void => onEndreBrevmal(event.target.value as Brevmal | '')}
        >
            <option value={''}>Velg</option>
            {brevMaler.map(mal => (
                <option aria-selected={mal === field.value} key={mal} value={mal}>
                    {brevmaler[mal]}
                </option>
            ))}
        </Select>
    );
}
