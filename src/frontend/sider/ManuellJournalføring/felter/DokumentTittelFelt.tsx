import { UNSAFE_Combobox } from '@navikt/ds-react';
import type { IDokumentInfo } from '@navikt/familie-typer';
import { useManuellJournalføringContext } from '@sider/ManuellJournalføring/ManuellJournalføringContext';
import { BrevkodeMap, DokumentTittel, JournalpostTittel } from '@typer/manuell-journalføring';

interface DokumentTittelFeltProps {
    dokumentFraSkjema: IDokumentInfo | undefined;
    visFeilmeldinger: boolean;
}

export function DokumentTittelFelt({ dokumentFraSkjema, visFeilmeldinger }: DokumentTittelFeltProps) {
    const { skjema, erLesevisning } = useManuellJournalføringContext();

    const tittelListe = (Object.values(JournalpostTittel) as string[]).concat(Object.values(DokumentTittel));

    function settDokumentTittel(nyVerdi: string) {
        skjema.felter.dokumenter.validerOgSettFelt([
            ...skjema.felter.dokumenter.verdi.map((dokument: IDokumentInfo) => {
                return dokumentFraSkjema && dokument.dokumentInfoId === dokumentFraSkjema?.dokumentInfoId
                    ? {
                          ...dokumentFraSkjema,
                          tittel: nyVerdi,
                          brevkode: BrevkodeMap.get(nyVerdi) || '',
                      }
                    : dokument;
            }),
        ]);
    }
    return (
        <UNSAFE_Combobox
            label={'Dokumenttittel'}
            readOnly={erLesevisning()}
            allowNewValues
            placeholder={'Skriv fritekst for å endre tittel...'}
            isMultiSelect={false}
            options={tittelListe}
            selectedOptions={
                !dokumentFraSkjema?.tittel || dokumentFraSkjema.tittel === '' ? [] : [dokumentFraSkjema.tittel]
            }
            error={visFeilmeldinger && dokumentFraSkjema?.tittel === '' ? 'Tittel er ikke satt' : undefined}
            onToggleSelected={(value, isSelected) => {
                if (isSelected) {
                    settDokumentTittel(value);
                } else {
                    settDokumentTittel('');
                }
            }}
        />
    );
}
