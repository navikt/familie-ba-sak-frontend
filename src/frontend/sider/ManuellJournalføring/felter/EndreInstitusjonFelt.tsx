import { useSamhandlerRequest } from '@komponenter/Samhandler/useSamhandler';
import { Box, Select } from '@navikt/ds-react';
import { type Ressurs, RessursStatus } from '@navikt/familie-typer';
import { useManuellJournalføringContext } from '@sider/ManuellJournalføring/ManuellJournalføringContext';
import { fagsakStatus } from '@typer/fagsak';
import type { ISamhandlerInfo } from '@typer/samhandler';
import { formaterIdent } from '@utils/formatter';
import { type ChangeEvent, useEffect } from 'react';

interface Props {
    valgtInstitusjon: string;
    settValgtInstitusjon: (orgnummer: string) => void;
    settSamhandlerFeilmelding: (feilmelding: string) => void;
}

export function EndreInstitusjonFelt({ valgtInstitusjon, settValgtInstitusjon, settSamhandlerFeilmelding }: Props) {
    const {
        institusjonsfagsaker,
        skjema,
        settMinimalFagsakTilInstitusjonsfagsak,
        settMinimalFagsakTilNormalFagsakForPerson,
    } = useManuellJournalføringContext();

    const { hentSamhandler } = useSamhandlerRequest(false);

    useEffect(() => {
        settSamhandlerFeilmelding('');
        if (valgtInstitusjon !== '' && valgtInstitusjon !== 'ny-institusjon') {
            settMinimalFagsakTilInstitusjonsfagsak(valgtInstitusjon);
            hentSamhandler(valgtInstitusjon).then((ressurs: Ressurs<ISamhandlerInfo>) => {
                if (ressurs.status === RessursStatus.SUKSESS) {
                    skjema.felter.samhandler.validerOgSettFelt(ressurs.data);
                } else {
                    skjema.felter.samhandler.nullstill();
                    settSamhandlerFeilmelding('Kan ikke hente opplysninger om institusjon');
                }
            });
        } else {
            settMinimalFagsakTilNormalFagsakForPerson(skjema.felter.bruker.verdi?.personIdent);
            skjema.felter.samhandler.nullstill();
        }
    }, [valgtInstitusjon]);

    return (
        <Box marginBlock={'space-12 space-20'}>
            <Select
                label="Institusjon"
                size="small"
                onChange={(event: ChangeEvent<HTMLSelectElement>) => settValgtInstitusjon(event.target.value)}
                value={valgtInstitusjon}
            >
                <option value="">Velg</option>
                {institusjonsfagsaker.status === RessursStatus.SUKSESS &&
                    institusjonsfagsaker.data.map(({ institusjon, status }) => {
                        return (
                            institusjon && (
                                <option value={institusjon.orgNummer} key={institusjon.orgNummer}>
                                    {formaterIdent(institusjon.orgNummer)} | {fagsakStatus[status].navn}
                                </option>
                            )
                        );
                    })}
                <option value="ny-institusjon">Ny institusjon</option>
            </Select>
        </Box>
    );
}
