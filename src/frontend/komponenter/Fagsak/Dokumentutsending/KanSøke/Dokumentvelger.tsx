import React from 'react';

import styled from 'styled-components';

import { UNSAFE_Combobox } from '@navikt/ds-react';

import { useDokumentutsending } from '../../../../context/DokumentutsendingContext';
import { opplysningsdokumenter } from '../../../Fagsak/Behandling/Høyremeny/Hendelsesoversikt/BrevModul/typer';

const Container = styled.div`
    margin-bottom: 1rem;
`;

export const Dokumentvelger = () => {
    const { skjema } = useDokumentutsending();

    const dokumenter = skjema.felter.dokumenter;
    const { error } = dokumenter.hentNavBaseSkjemaProps(skjema.visFeilmeldinger);

    const onToggleSelected = (option: string, isSelected: boolean) => {
        if (isSelected) {
            dokumenter.validerOgSettFelt([...dokumenter.verdi, option]);
        } else {
            dokumenter.validerOgSettFelt(dokumenter.verdi.filter(dokument => dokument !== option));
        }
    };

    return (
        <Container>
            <UNSAFE_Combobox
                label="Velg dokumenter"
                isMultiSelect
                onToggleSelected={onToggleSelected}
                selectedOptions={dokumenter.verdi}
                options={opplysningsdokumenter.map(dokument => dokument.label)}
                error={error}
            />
        </Container>
    );
};
