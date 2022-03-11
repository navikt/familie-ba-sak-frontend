import React from 'react';

import styled from 'styled-components';

import { Label } from 'nav-frontend-skjema';

import { FamilieReactSelect } from '@navikt/familie-form-elements';

import { useDokumentutsending } from '../../../../context/DokumentutsendingContext';
import type { ISelectOptionMedBrevtekst } from '../../../Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import {
    leggTilValuePåOption,
    opplysningsdokumenter,
} from '../../../Felleskomponenter/Hendelsesoversikt/BrevModul/typer';

const LabelOgEtikett = styled.div`
    display: flex;
    justify-content: space-between;
`;
export const Dokumentvelger = () => {
    const { skjema } = useDokumentutsending();

    const dokumenter = skjema.felter.dokumenter;
    const inputProps = dokumenter.hentNavInputProps(skjema.visFeilmeldinger);
    return (
        <FamilieReactSelect
            {...inputProps}
            label={
                <LabelOgEtikett>
                    <Label htmlFor={inputProps.id}>Velg dokumenter</Label>
                </LabelOgEtikett>
            }
            creatable={false}
            erLesevisning={false}
            isMulti={true}
            onChange={valgteOptions => {
                dokumenter.onChange(
                    valgteOptions === null ? [] : (valgteOptions as ISelectOptionMedBrevtekst[])
                );
            }}
            options={opplysningsdokumenter.map(leggTilValuePåOption)}
        />
    );
};
