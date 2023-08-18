import React, { useState } from 'react';

import styled from 'styled-components';

import { Combobox } from '@navikt/ds-react/esm/form/combobox';

import { useDokumentutsending } from '../../../../context/DokumentutsendingContext';
import { opplysningsdokumenter } from '../../../Felleskomponenter/Hendelsesoversikt/BrevModul/typer';

const Container = styled.div`
    margin-bottom: 1rem;
`;

export const Dokumentvelger = () => {
    const { skjema } = useDokumentutsending();
    const [value, setValue] = useState('');

    const dokumenter = skjema.felter.dokumenter;

    const onToggleSelected = (option: string, isSelected: boolean) => {
        if (isSelected) {
            dokumenter.validerOgSettFelt([...dokumenter.verdi, option]);
        } else {
            dokumenter.validerOgSettFelt(dokumenter.verdi.filter(dokument => dokument !== option));
        }
    };

    return (
        <Container>
            <Combobox
                {...dokumenter.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                label="Velg dokumenter"
                isMultiSelect
                onToggleSelected={onToggleSelected}
                selectedOptions={dokumenter.verdi}
                options={opplysningsdokumenter.map(dokument => dokument.label)}
                value={value}
                onChange={event => {
                    if (event) {
                        setValue(event.target.value);
                    }
                }}
            />
        </Container>
    );
};
