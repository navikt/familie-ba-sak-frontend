import React from 'react';

import { FamilieReactSelect, ISelectOption } from '@navikt/familie-form-elements';
import { IDokumentInfo, ILogiskVedlegg } from '@navikt/familie-typer';

import { useManuellJournalfør } from '../../../context/ManuellJournalførContext';
import { DokumentTittel } from '../../../typer/manuell-journalføring';
import { journalpostTittelList } from '../Journalpost';

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
}

export const EndreDokumentInfoPanel: React.FC<IProps> = ({ dokument }) => {
    const { skjema, settDokumentTittel, settLogiskeVedlegg } = useManuellJournalfør();

    const dokumentFraSkjema = skjema.felter.dokumenter.verdi.find(
        findDokument => findDokument.dokumentInfoId === dokument.dokumentInfoId
    );

    const hentVedleggList = (): ISelectOption[] => {
        return dokumentFraSkjema
            ? dokumentFraSkjema.logiskeVedlegg.map((vedlegg: ILogiskVedlegg) => {
                  return {
                      value: vedlegg.tittel,
                      label: vedlegg.tittel,
                  };
              })
            : [];
    };

    const tittelOption = (): ISelectOption => {
        return {
            value: dokumentFraSkjema?.tittel ?? '',
            label: dokumentFraSkjema?.tittel ?? '',
        };
    };

    return (
        <div>
            <FamilieReactSelect
                id="tittelSelect"
                label={'Dokumenttittel'}
                erLesevisning={false}
                creatable={true}
                isClearable
                isMulti={false}
                options={tittelList}
                value={tittelOption()}
                onChange={value => {
                    if (value && 'value' in value) {
                        settDokumentTittel(value.value || '', dokument.dokumentInfoId);
                    } else {
                        settDokumentTittel('', dokument.dokumentInfoId);
                    }
                }}
            />
            <br />
            <FamilieReactSelect
                id="innholdSelect"
                label={'Annet innhold'}
                creatable={true}
                isClearable
                erLesevisning={false}
                isMulti={true}
                options={tittelList}
                value={hentVedleggList()}
                placeholder={'Velg innhold'}
                onChange={options => {
                    settLogiskeVedlegg(
                        options instanceof Array ? options.map(({ value }) => value) : [],
                        dokument.dokumentInfoId
                    );
                }}
            />
        </div>
    );
};
