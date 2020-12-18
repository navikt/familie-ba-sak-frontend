import React from 'react';

import CreatableSelect from 'react-select/creatable';

import { Label } from 'nav-frontend-skjema';

import { useManuellJournalfør } from '../../../context/ManuellJournalførContext';
import { DokumentTittel } from '../../../typer/manuell-journalføring';
import { ITittel, journalpostTittelList } from '../Journalpost';

const dokumentTittelList: Array<ITittel> = Object.keys(DokumentTittel).map((_, index) => {
    return {
        value: Object.values(DokumentTittel)[index],
        label: Object.values(DokumentTittel)[index],
    };
});

const tittelList = journalpostTittelList.concat(dokumentTittelList);

export const EndreDokumentInfoPanel: React.FC = () => {
    const {
        settLogiskeVedlegg,
        finnValgtDokument,
        settDokumentTittel,
        tilbakestillDokumentTittel,
    } = useManuellJournalfør();

    const hentVedleggList = () => {
        const valgtDokument = finnValgtDokument();
        return valgtDokument
            ? valgtDokument.logiskeVedlegg.map(vedlegg => {
                  return {
                      value: vedlegg.tittel,
                      label: vedlegg.tittel,
                  };
              })
            : [];
    };

    const tittelOption = () => {
        const valgtDokument = finnValgtDokument();
        return {
            value: valgtDokument?.tittel,
            label: valgtDokument?.tittel,
        };
    };

    return (
        <div>
            <Label htmlFor="tittelSelect">Dokumenttittel</Label>
            <CreatableSelect
                id="tittelSelect"
                isClearable
                isMulti={false}
                options={tittelList}
                value={tittelOption()}
                onChange={value => {
                    if (value && 'value' in value) {
                        settDokumentTittel(value.value || '');
                    } else {
                        tilbakestillDokumentTittel();
                    }
                }}
            />
            <br />
            <Label htmlFor="innholdSelect">Annet innhold</Label>
            <CreatableSelect
                id="innholdSelect"
                isClearable
                isMulti={true}
                options={tittelList}
                value={hentVedleggList()}
                onChange={options => {
                    settLogiskeVedlegg(
                        options instanceof Array ? options.map(({ value }) => value) : []
                    );
                }}
            />
        </div>
    );
};
