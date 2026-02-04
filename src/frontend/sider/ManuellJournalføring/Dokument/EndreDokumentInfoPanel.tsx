import React from 'react';

import { UNSAFE_Combobox } from '@navikt/ds-react';
import type { IDokumentInfo, ILogiskVedlegg } from '@navikt/familie-typer';

import { BrevkodeMap, DokumentTittel, JournalpostTittel } from '../../../typer/manuell-journalføring';
import { useManuellJournalføringContext } from '../ManuellJournalføringContext';

const tittelList = (Object.values(JournalpostTittel) as string[]).concat(Object.values(DokumentTittel));

interface IProps {
    dokument: IDokumentInfo;
    visFeilmeldinger: boolean;
}

export const EndreDokumentInfoPanel: React.FC<IProps> = ({ dokument, visFeilmeldinger }) => {
    const { skjema, erLesevisning } = useManuellJournalføringContext();

    const dokumentFraSkjema: IDokumentInfo | undefined = skjema.felter.dokumenter.verdi.find(
        findDokument => findDokument.dokumentInfoId === dokument.dokumentInfoId
    );

    const hentVedleggList = (): string[] => {
        return dokumentFraSkjema
            ? dokumentFraSkjema.logiskeVedlegg.map((vedlegg: ILogiskVedlegg) => vedlegg.tittel)
            : [];
    };

    const settDokumentTittel = (nyVerdi: string) => {
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
    };

    const settLogiskeVedlegg = (logiskeVedleggNavn: string[]) => {
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
    };

    return (
        <>
            <UNSAFE_Combobox
                label={'Dokumenttittel'}
                readOnly={erLesevisning()}
                allowNewValues
                placeholder={'Skriv fritekst for å endre tittel...'}
                isMultiSelect={false}
                options={tittelList}
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
            <br />
            <UNSAFE_Combobox
                id="innholdSelect"
                label={'Annet innhold'}
                allowNewValues
                readOnly={erLesevisning()}
                isMultiSelect
                options={tittelList}
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
        </>
    );
};
