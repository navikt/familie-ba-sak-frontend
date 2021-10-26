import React from 'react';

import styled from 'styled-components';

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { FamilieReactSelect, FamilieSelect } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../context/AppContext';
import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import { behandlingstemaer, IBehandlingstema } from '../../typer/behandling';
import { JournalpostTittel } from '../../typer/manuell-journalføring';
import { ToggleNavn } from '../../typer/toggles';
import { datoformat, formaterIsoDato } from '../../utils/formatter';

export const journalpostTittelList = Object.keys(JournalpostTittel).map((_, index) => {
    return {
        value: Object.values(JournalpostTittel)[index].toString(),
        label: Object.values(JournalpostTittel)[index].toString(),
        isDisabled: false,
    };
});

const JournalpostMetadataDiv = styled.div`
    margin: 0 0 20px 0;
`;

const EndreJournalpost: React.FC = () => {
    const { toggles } = useApp();
    const { skjema, erLesevisning } = useManuellJournalfør();

    return (
        <>
            <FamilieReactSelect
                {...skjema.felter.journalpostTittel.hentNavInputProps(skjema.visFeilmeldinger)}
                creatable={true}
                isClearable
                erLesevisning={erLesevisning()}
                label={'Endre journalposttittel'}
                placeholder={'Skriv fritekst for å endre tittel...'}
                isMulti={false}
                options={journalpostTittelList}
                value={
                    skjema.felter.journalpostTittel.verdi === ''
                        ? null
                        : {
                              value: skjema.felter.journalpostTittel.verdi,
                              label: skjema.felter.journalpostTittel.verdi,
                          }
                }
                onChange={value => {
                    if (value && 'value' in value) {
                        skjema.felter.journalpostTittel.validerOgSettFelt(value.value);
                    } else {
                        skjema.felter.journalpostTittel.nullstill();
                    }
                }}
            />
            {toggles[ToggleNavn.brukEøs] && (
                <FamilieSelect
                    {...skjema.felter.behandlingstema.hentNavInputProps(skjema.visFeilmeldinger)}
                    value={
                        skjema.felter.behandlingstema.verdi
                            ? skjema.felter.behandlingstema.verdi.id
                            : ''
                    }
                    label={'Sett behandlingstema / Gjelder'}
                    onChange={evt => {
                        if (evt.target.value !== '') {
                            skjema.felter.behandlingstema.validerOgSettFelt(
                                behandlingstemaer[evt.target.value]
                            );
                        }
                    }}
                    erLesevisning={erLesevisning()}
                    lesevisningVerdi={skjema.felter.behandlingstema.verdi?.navn}
                >
                    <option
                        disabled
                        key={'behandlingstema-select-disabled'}
                        value={''}
                        aria-selected={skjema.felter.behandlingstema.verdi === undefined}
                    >
                        Velg behandlingstema
                    </option>
                    {Object.entries(behandlingstemaer).map(
                        ([key, behandlingstema]: [string, IBehandlingstema]) => (
                            <option
                                key={key}
                                aria-selected={
                                    skjema.felter.behandlingstema.verdi?.id === behandlingstema.id
                                }
                                value={behandlingstema.id}
                            >
                                {behandlingstema.navn}
                            </option>
                        )
                    )}
                </FamilieSelect>
            )}
        </>
    );
};

const Journalpost: React.FC = () => {
    const { dataForManuellJournalføring, skjema } = useManuellJournalfør();
    const datoMottatt =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? dataForManuellJournalføring.data.journalpost.datoMottatt
            : undefined;

    return (
        <Ekspanderbartpanel
            id={skjema.felter.journalpostTittel.id}
            tittel={
                <Undertittel>{skjema.felter.journalpostTittel.verdi || 'Ingen tittel'}</Undertittel>
            }
        >
            <JournalpostMetadataDiv>
                <Normaltekst>
                    Mottatt:{' '}
                    {datoMottatt
                        ? formaterIsoDato(datoMottatt, datoformat.DATO)
                        : 'Ingen mottatt dato'}
                </Normaltekst>
            </JournalpostMetadataDiv>
            <EndreJournalpost />
        </Ekspanderbartpanel>
    );
};

export default Journalpost;
