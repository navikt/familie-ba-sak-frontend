import React from 'react';

import { FamilieReactSelect, ISelectOption } from '@navikt/familie-form-elements';

import { useManuellJournalfør } from '../../../context/ManuellJournalførContext';
import { DokumentTittel } from '../../../typer/manuell-journalføring';
import { journalpostTittelList } from '../Journalpost';

const dokumentTittelList: ISelectOption[] = Object.keys(DokumentTittel).map((_, index) => {
    return {
        value: Object.values(DokumentTittel)[index],
        label: Object.values(DokumentTittel)[index],
    };
});

const tittelList: ISelectOption[] = journalpostTittelList.concat(dokumentTittelList);

export const EndreDokumentInfoPanel: React.FC = () => {
    const {
        settLogiskeVedlegg,
        finnValgtDokument,
        settDokumentTittel,
        tilbakestillDokumentTittel,
    } = useManuellJournalfør();

    const hentVedleggList = (): ISelectOption[] => {
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

    const tittelOption = (): ISelectOption => {
        const valgtDokument = finnValgtDokument();
        return {
            value: valgtDokument?.tittel ?? '',
            label: valgtDokument?.tittel ?? '',
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
                        settDokumentTittel(value.value || '');
                    } else {
                        tilbakestillDokumentTittel();
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
                        options instanceof Array ? options.map(({ value }) => value) : []
                    );
                }}
            />
        </div>
    );
};
