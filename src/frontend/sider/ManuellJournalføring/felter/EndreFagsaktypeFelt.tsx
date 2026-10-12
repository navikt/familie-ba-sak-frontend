import { Box, Select } from '@navikt/ds-react';
import { useManuellJournalføringContext } from '@sider/ManuellJournalføring/ManuellJournalføringContext';
import { FagsakType } from '@typer/fagsak';
import type { ChangeEvent } from 'react';

interface Props {
    settValgtInstitusjon: (orgnummer: string) => void;
}

export function EndreFagsaktypeFelt({ settValgtInstitusjon }: Props) {
    const { skjema } = useManuellJournalføringContext();

    function oppdaterFagsaktype(nyFagsakType: FagsakType) {
        skjema.felter.fagsakType.validerOgSettFelt(nyFagsakType);
        if (nyFagsakType !== FagsakType.INSTITUSJON) {
            settValgtInstitusjon('');
        }
    }

    return (
        <Box marginBlock={'space-12 space-20'}>
            <Select
                label="Fagsaktype"
                size="small"
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    oppdaterFagsaktype(event.target.value as FagsakType)
                }
                value={skjema.felter.fagsakType.verdi}
            >
                <option value={FagsakType.NORMAL}>Velg</option>
                <option value={FagsakType.INSTITUSJON}>Institusjon</option>
                <option value={FagsakType.BARN_ENSLIG_MINDREÅRIG}>Enslig mindreårig</option>
            </Select>
        </Box>
    );
}
