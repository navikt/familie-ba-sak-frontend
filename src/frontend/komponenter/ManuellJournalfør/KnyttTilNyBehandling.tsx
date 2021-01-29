import React from 'react';

import styled from 'styled-components';

import { CheckboksPanelGruppe } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';

import { FamilieReactSelect } from '@navikt/familie-form-elements';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import { Behandlingstype, BehandlingÅrsak } from '../../typer/behandling';

const StyledCheckboxDiv = styled.div`
    width: 20rem;
`;

const StyledSelect = styled(FamilieReactSelect)`
    width: 20rem;
`;

const tilAlternativ = (key: Behandlingstype | BehandlingÅrsak) =>
    (
        key.toString().charAt(0).toLocaleUpperCase() +
        key.toString().substring(1, key.toString().length).toLocaleLowerCase()
    ).replace('_', ' ');

const tilBehandlingstype = (type: string) =>
    Behandlingstype[type.replace(' ', '_').toLocaleUpperCase() as keyof typeof Behandlingstype];

const tilBehandlingÅrsak = (årsak: string) =>
    BehandlingÅrsak[årsak.replace(' ', '_').toLocaleUpperCase() as keyof typeof BehandlingÅrsak];

const nyBehandlingstyper = [
    {
        value: tilAlternativ(Behandlingstype.FØRSTEGANGSBEHANDLING),
        label: tilAlternativ(Behandlingstype.FØRSTEGANGSBEHANDLING),
    },
    {
        value: tilAlternativ(Behandlingstype.REVURDERING),
        label: tilAlternativ(Behandlingstype.REVURDERING),
    },
];

const nyBehandlingsårsaker = [
    {
        value: tilAlternativ(BehandlingÅrsak.SØKNAD),
        label: tilAlternativ(BehandlingÅrsak.SØKNAD),
    },
    {
        value: tilAlternativ(BehandlingÅrsak.NYE_OPPLYSNINGER),
        label: tilAlternativ(BehandlingÅrsak.NYE_OPPLYSNINGER),
    },
];

export const KnyttTilNyBehandling: React.FC = () => {
    const {
        knyttTilNyBehandling,
        settKnyttTilNyBehandling,
        nyBehandlingstype,
        settNyBehandlingstype,
        nyBehandlingsårsak,
        settNyBehandlingsårsak,
    } = useManuellJournalfør();
    return (
        <>
            <br />
            <Undertittel>Knytt til ny behandling</Undertittel>
            <br />
            <StyledCheckboxDiv>
                <CheckboksPanelGruppe
                    checkboxes={[
                        {
                            label: 'Knytt til ny behandling',
                            value: 'Knytt til ny behandling',
                            id: 'Knytt til ny behandling',
                            checked: knyttTilNyBehandling,
                        },
                    ]}
                    onChange={() => {
                        settKnyttTilNyBehandling(!knyttTilNyBehandling);
                    }}
                />
            </StyledCheckboxDiv>
            {knyttTilNyBehandling && (
                <>
                    <br />
                    <StyledSelect
                        creatable={false}
                        erLesevisning={false}
                        label={'Behandlingstype'}
                        id="select"
                        isMulti={false}
                        options={nyBehandlingstyper}
                        value={{
                            value: tilAlternativ(nyBehandlingstype),
                            label: tilAlternativ(nyBehandlingstype),
                        }}
                        onChange={value => {
                            if (value && 'value' in value) {
                                settNyBehandlingstype(tilBehandlingstype(value.value));
                            }
                        }}
                    />
                </>
            )}
            {knyttTilNyBehandling && nyBehandlingstype === Behandlingstype.REVURDERING && (
                <>
                    <StyledSelect
                        creatable={false}
                        erLesevisning={false}
                        label={'Årsak'}
                        id="select"
                        isMulti={false}
                        options={nyBehandlingsårsaker}
                        value={{
                            value: tilAlternativ(nyBehandlingsårsak),
                            label: tilAlternativ(nyBehandlingsårsak),
                        }}
                        onChange={value => {
                            if (value && 'value' in value) {
                                settNyBehandlingsårsak(tilBehandlingÅrsak(value.value));
                            }
                        }}
                    />
                </>
            )}
        </>
    );
};
