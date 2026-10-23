import { UNSAFE_Combobox } from '@navikt/ds-react';
import type { IDokumentInfo, ILogiskVedlegg } from '@navikt/familie-typer';
import { useManuellJournalføringContext } from '@sider/ManuellJournalføring/ManuellJournalføringContext';
import { DokumentTittel, JournalpostTittel } from '@typer/manuell-journalføring';

interface LogiskeVedleggFeltProps {
    dokumentFraSkjema: IDokumentInfo | undefined;
}

export function LogiskeVedleggFelt({ dokumentFraSkjema }: LogiskeVedleggFeltProps) {
    const { skjema, erLesevisning } = useManuellJournalføringContext();

    const tittelListe = (Object.values(JournalpostTittel) as string[]).concat(Object.values(DokumentTittel));

    function hentVedleggList(): string[] {
        return dokumentFraSkjema
            ? dokumentFraSkjema.logiskeVedlegg.map((vedlegg: ILogiskVedlegg) => vedlegg.tittel)
            : [];
    }

    function settLogiskeVedlegg(logiskeVedleggNavn: string[]) {
        skjema.felter.dokumenter.validerOgSettFelt([
            ...skjema.felter.dokumenter.verdi.map(dokument => {
                return dokumentFraSkjema && dokument.dokumentInfoId === dokumentFraSkjema?.dokumentInfoId
                    ? {
                          ...dokumentFraSkjema,
                          logiskeVedlegg: logiskeVedleggNavn.map(vedlegg => ({
                              tittel: vedlegg,
                              logiskVedleggId: '0', // Påkrevd felt, ignoreres av backend. Kan settes til hva som helst.
                          })),
                      }
                    : dokument;
            }),
        ]);
    }

    return (
        <UNSAFE_Combobox
            id="innholdSelect"
            label={'Annet innhold'}
            allowNewValues
            readOnly={erLesevisning()}
            isMultiSelect
            options={tittelListe}
            selectedOptions={hentVedleggList()}
            placeholder={'Velg innhold'}
            onToggleSelected={(option, isSelected) => {
                if (isSelected) {
                    settLogiskeVedlegg([...hentVedleggList(), option]);
                } else {
                    settLogiskeVedlegg(hentVedleggList().filter(vedlegg => vedlegg !== option));
                }
            }}
        />
    );
}
