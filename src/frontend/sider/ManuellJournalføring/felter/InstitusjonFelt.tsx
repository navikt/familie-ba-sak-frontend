import { Select } from '@navikt/ds-react';
import {
    ManuellJournalføringFelter,
    type ManuellJournalføringFormValues,
} from '@sider/ManuellJournalføring/useManuellJournalføringSkjema';
import { FagsakType } from '@typer/fagsak';
import { useController, useFormContext } from 'react-hook-form';

// TODO: dette sendes ikke inn til MJSkjemaet, så mulig det ikke trenger en egen komponent - får se
export function InstitusjonFelt() {
    const { control } = useFormContext<ManuellJournalføringFormValues>();

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: ManuellJournalføringFelter.FAGSAK_TYPE,
        control,
    });

    function oppdaterFagsakType(nyFagsakType: FagsakType) {
        // TODO: finn ut hva som er best her
        onChange(nyFagsakType);
        if (nyFagsakType !== FagsakType.INSTITUSJON) {
            // settValgtInstitusjon('');
        }
    }

    return (
        <Select
            label={'Fagsakstype'}
            size={'small'}
            readOnly={isSubmitting}
            value={value}
            onChange={e => oppdaterFagsakType(e.target.value as FagsakType)}
            error={error?.message}
        >
            <option value={FagsakType.NORMAL}>Normal</option>
            <option value={FagsakType.INSTITUSJON}>Institusjon</option>
            <option value={FagsakType.BARN_ENSLIG_MINDREÅRIG}>Enslig mindreårig</option>
        </Select>
    );
}
