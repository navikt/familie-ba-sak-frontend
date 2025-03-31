import React from 'react';

import { AZIndexPopover } from '@navikt/ds-tokens/dist/tokens';
import { FamilieReactSelect } from '@navikt/familie-form-elements';
import type { IDokumentInfo, ILogiskVedlegg } from '@navikt/familie-typer';

import type { OptionType } from '../../../typer/common';
import { BrevkodeMap, DokumentTittel } from '../../../typer/manuell-journalføring';
import { journalpostTittelList } from '../Journalpost';
import { useManuellJournalføringContext } from '../ManuellJournalførContext';

const dokumentTittelList = Object.keys(DokumentTittel).map((_, index) => {
    return {
        value: Object.values(DokumentTittel)[index].toString(),
        label: Object.values(DokumentTittel)[index].toString(),
        isDisabled: false,
    };
});

const tittelList = journalpostTittelList
    .concat([{ value: '----------', label: '----------', isDisabled: true }])
    .concat(dokumentTittelList);

interface IProps {
    dokument: IDokumentInfo;
    visFeilmeldinger: boolean;
}

export const EndreDokumentInfoPanel: React.FC<IProps> = ({ dokument, visFeilmeldinger }) => {
    const { skjema, erLesevisning } = useManuellJournalføringContext();

    const dokumentFraSkjema: IDokumentInfo | undefined = skjema.felter.dokumenter.verdi.find(
        findDokument => findDokument.dokumentInfoId === dokument.dokumentInfoId
    );

    const hentVedleggList = (): OptionType[] => {
        return dokumentFraSkjema
            ? dokumentFraSkjema.logiskeVedlegg.map((vedlegg: ILogiskVedlegg) => {
                  return {
                      value: vedlegg.tittel,
                      label: vedlegg.tittel,
                  };
              })
            : [];
    };

    const settDokumentTittel = (nyVerdi: string) => {
        skjema.felter.dokumenter.validerOgSettFelt([
            ...skjema.felter.dokumenter.verdi.map((dokument: IDokumentInfo) => {
                return dokumentFraSkjema &&
                    dokument.dokumentInfoId === dokumentFraSkjema?.dokumentInfoId
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
                return dokumentFraSkjema &&
                    dokument.dokumentInfoId === dokumentFraSkjema?.dokumentInfoId
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
            <FamilieReactSelect
                label={'Dokumenttittel'}
                erLesevisning={erLesevisning()}
                creatable={true}
                isClearable
                placeholder={'Skriv fritekst for å endre tittel...'}
                isMulti={false}
                options={tittelList}
                value={
                    !dokumentFraSkjema?.tittel || dokumentFraSkjema.tittel === ''
                        ? null
                        : {
                              value: dokumentFraSkjema.tittel,
                              label: dokumentFraSkjema.tittel,
                          }
                }
                feil={
                    visFeilmeldinger && dokumentFraSkjema?.tittel === ''
                        ? 'Tittel er ikke satt'
                        : undefined
                }
                onChange={value => {
                    if (value && 'value' in value) {
                        settDokumentTittel(value.value);
                    } else {
                        settDokumentTittel('');
                    }
                }}
                propSelectStyles={{
                    container: (base, props) => ({
                        ...base,
                        zIndex: props.isFocused ? AZIndexPopover : 1,
                    }),
                }}
            />
            <br />
            <FamilieReactSelect
                id="innholdSelect"
                label={'Annet innhold'}
                creatable={true}
                isClearable
                erLesevisning={erLesevisning()}
                isMulti={true}
                options={tittelList}
                value={hentVedleggList()}
                placeholder={'Velg innhold'}
                onChange={options => {
                    settLogiskeVedlegg(
                        options instanceof Array ? options.map(({ value }) => value) : []
                    );
                }}
                propSelectStyles={{
                    container: (base, props) => ({
                        ...base,
                        zIndex: props.isFocused ? AZIndexPopover : 1,
                    }),
                }}
            />
        </>
    );
};
