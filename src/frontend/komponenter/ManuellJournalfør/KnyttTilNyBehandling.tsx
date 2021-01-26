import React from 'react';

import styled from 'styled-components';

import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';

import { FamilieCheckbox, FamilieReactSelect } from '@navikt/familie-form-elements';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import { Behandlingstype, BehandlingÅrsak } from '../../typer/behandling';
import { formaterTilKunFørstBokstavStor } from '../../utils/formatter';

const StyledPanel = styled(Panel)`
    width: 20rem;
`;

const StyledSelect = styled(FamilieReactSelect)`
    width: 20rem;
`;

const tilLabel = (key: Behandlingstype | BehandlingÅrsak) =>
    formaterTilKunFørstBokstavStor(key.toString().replace('_', ' ')) || '';

const tilBehandlingstype = (type: string) =>
    Behandlingstype[type.replace(' ', '_').toUpperCase() as keyof typeof Behandlingstype];

const tilBehandlingÅrsak = (årsak: string) =>
    BehandlingÅrsak[årsak.replace(' ', '_').toUpperCase() as keyof typeof BehandlingÅrsak];

const nyBehandlingstyper = [
    {
        value: tilLabel(Behandlingstype.FØRSTEGANGSBEHANDLING),
        label: tilLabel(Behandlingstype.FØRSTEGANGSBEHANDLING),
    },
    {
        value: tilLabel(Behandlingstype.REVURDERING),
        label: tilLabel(Behandlingstype.REVURDERING),
    },
];

const nyBehandlingsårsaker = [
    {
        value: tilLabel(BehandlingÅrsak.SØKNAD),
        label: tilLabel(BehandlingÅrsak.SØKNAD),
    },
    {
        value: tilLabel(BehandlingÅrsak.NYE_OPPLYSNINGER),
        label: tilLabel(BehandlingÅrsak.NYE_OPPLYSNINGER),
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
            <StyledPanel border={true}>
                <FamilieCheckbox
                    erLesevisning={false}
                    label={'Knytt til ny behandling'}
                    checked={knyttTilNyBehandling}
                    onChange={() => {
                        settKnyttTilNyBehandling(!knyttTilNyBehandling);
                    }}
                />
            </StyledPanel>
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
                            value: tilLabel(nyBehandlingstype),
                            label: tilLabel(nyBehandlingstype),
                        }}
                        onChange={value => {
                            if (value && 'value' in value) {
                                settNyBehandlingstype(tilBehandlingstype(value.value));
                            }
                        }}
                    />
                </>
            )}
            {nyBehandlingstype === Behandlingstype.REVURDERING && (
                <>
                    <StyledSelect
                        creatable={false}
                        erLesevisning={false}
                        label={'Årsak'}
                        id="select"
                        isMulti={false}
                        options={nyBehandlingsårsaker}
                        value={{
                            value: tilLabel(nyBehandlingsårsak),
                            label: tilLabel(nyBehandlingsårsak),
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
