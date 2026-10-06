import { useBruker } from '@hooks/useBruker';
import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { useValgbareBrevmottakertyper } from '@komponenter/Saklinje/Meny/Brevmottaker/Fagsak/useValgbareBrevmottakertyper';
import { Select } from '@navikt/ds-react';
import { useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import { Brevmottakertype, brevmottakertypeVisningsnavn, erBrevmottakertype } from '@typer/brevmottaker';
import type { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { BrevmottakerField, type BrevmottakerFormValues } from './useBrevmottakerForm';

export function BrevmottakertypeField() {
    const erLesevisning = useErLesevisningFagsak();
    const bruker = useBruker();

    const { control, setValue, resetField, getValues } = useFormContext<BrevmottakerFormValues>();

    const { brevmottakere } = useBrevmottakereFagsakContext();

    const {
        field: { name, ref, value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: BrevmottakerField.BREVMOTTAKERTYPE,
        control,
        rules: {
            required: 'Mottaker må velges.',
            validate: value => {
                if (!erBrevmottakertype(value)) {
                    return 'Mottaker må velges.';
                }
                if (value === Brevmottakertype.DØDSBO) {
                    return 'Dødsbo kan ikke velges.';
                }
                const alleredeValgteBrevmottakertyper = brevmottakere.map(it => it.type);
                if (alleredeValgteBrevmottakertyper.includes(value)) {
                    return 'Mottaker er allerede valgt.';
                }
                const harValgtFullmektigEllerVerge =
                    alleredeValgteBrevmottakertyper.includes(Brevmottakertype.FULLMEKTIG) ||
                    alleredeValgteBrevmottakertyper.includes(Brevmottakertype.VERGE);
                if (harValgtFullmektigEllerVerge && value !== Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE) {
                    return 'Når fullmektig eller verge er valgt kan kun bruker med utenlandsk adresse legges til.';
                }
            },
        },
    });

    const valgbareBrevmottakertyper = useValgbareBrevmottakertyper();

    function onVelgBrevmottaker(event: ChangeEvent<HTMLSelectElement>) {
        const value = event.target.value;

        if (!erBrevmottakertype(value)) {
            onChange('');
            return;
        }

        const forrige = getValues(BrevmottakerField.BREVMOTTAKERTYPE);
        const forrigeVarDødsbo = forrige === Brevmottakertype.DØDSBO;
        const forrigeVarBrukerMedUtenlandskAdresse = forrige === Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE;
        const varPreutfylt = forrigeVarDødsbo || forrigeVarBrukerMedUtenlandskAdresse;

        const erDødsbo = value === Brevmottakertype.DØDSBO;
        const erBrukerMedUtenlandskAdresse = value === Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE;
        const skalPreutfylles = erDødsbo || erBrukerMedUtenlandskAdresse;

        if (skalPreutfylles && erDødsbo) {
            const erNorgeValgt = getValues(BrevmottakerField.LAND) === 'NO';
            setValue(BrevmottakerField.NAVN, erNorgeValgt ? `${bruker.navn} v/dødsbo` : `Estate of ${bruker.navn}`);
        }

        if (skalPreutfylles && erBrukerMedUtenlandskAdresse) {
            setValue(BrevmottakerField.NAVN, bruker.navn);
        }

        if (!skalPreutfylles && varPreutfylt) {
            resetField(BrevmottakerField.NAVN);
        }

        onChange(value);
    }

    return (
        <Select
            name={name}
            ref={ref}
            label={'Mottaker'}
            value={value}
            onChange={onVelgBrevmottaker}
            onBlur={onBlur}
            readOnly={erLesevisning || isSubmitting}
            error={error?.message}
        >
            <option value={''} disabled={true}>
                -- Velg mottaker --
            </option>
            {valgbareBrevmottakertyper.map(brevmottakertype => (
                <option value={brevmottakertype} key={brevmottakertype}>
                    {brevmottakertypeVisningsnavn[brevmottakertype]}
                </option>
            ))}
        </Select>
    );
}
