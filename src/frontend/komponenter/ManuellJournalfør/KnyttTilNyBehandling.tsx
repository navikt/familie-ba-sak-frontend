import React from 'react';

import styled from 'styled-components';

import { CheckboksPanelGruppe } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';

import { FamilieReactSelect } from '@navikt/familie-form-elements';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import {
    Behandlingstype,
    behandlingstyper,
    behandlingÅrsak,
    BehandlingÅrsak,
} from '../../typer/behandling';

const StyledCheckboxDiv = styled.div`
    width: 20rem;
`;

const StyledSelect = styled(FamilieReactSelect)`
    width: 20rem;
`;

const nyBehandlingstyper = [
    {
        value: Behandlingstype.FØRSTEGANGSBEHANDLING,
        label: behandlingstyper[Behandlingstype.FØRSTEGANGSBEHANDLING].navn,
    },
    {
        value: Behandlingstype.REVURDERING,
        label: behandlingstyper[Behandlingstype.REVURDERING].navn,
    },
];

const nyBehandlingsårsaker = [
    {
        value: BehandlingÅrsak.SØKNAD,
        label: behandlingÅrsak[BehandlingÅrsak.SØKNAD],
    },
    {
        value: BehandlingÅrsak.NYE_OPPLYSNINGER,
        label: behandlingÅrsak[BehandlingÅrsak.NYE_OPPLYSNINGER],
    },
];

export const KnyttTilNyBehandling: React.FC = () => {
    const { skjema } = useManuellJournalfør();
    return (
        <>
            <Undertittel>Knytt til ny behandling</Undertittel>
            <br />
            <StyledCheckboxDiv>
                <CheckboksPanelGruppe
                    checkboxes={[
                        {
                            label: 'Knytt til ny behandling',
                            value: 'Knytt til ny behandling',
                            id: 'Knytt til ny behandling',
                            checked: skjema.felter.knyttTilNyBehandling.verdi,
                        },
                    ]}
                    onChange={() => {
                        skjema.felter.knyttTilNyBehandling.validerOgSettFelt(
                            !skjema.felter.knyttTilNyBehandling.verdi
                        );
                    }}
                />
            </StyledCheckboxDiv>
            {skjema.felter.knyttTilNyBehandling.verdi && (
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
                            value: skjema.felter.behandlingstype.verdi,
                            label: behandlingstyper[skjema.felter.behandlingstype.verdi].navn,
                        }}
                        onChange={value => {
                            if (value && 'value' in value) {
                                skjema.felter.behandlingstype.validerOgSettFelt(
                                    value.value as Behandlingstype
                                );
                            }
                        }}
                    />
                </>
            )}
            {skjema.felter.knyttTilNyBehandling.verdi &&
                skjema.felter.behandlingstype.verdi === Behandlingstype.REVURDERING && (
                    <>
                        <StyledSelect
                            creatable={false}
                            erLesevisning={false}
                            label={'Årsak'}
                            id="select"
                            isMulti={false}
                            options={nyBehandlingsårsaker}
                            value={{
                                value: skjema.felter.behandlingsårsak.verdi,
                                label:
                                    behandlingÅrsak[
                                        skjema.felter.behandlingsårsak.verdi as BehandlingÅrsak
                                    ] ?? '',
                            }}
                            onChange={value => {
                                if (value && 'value' in value) {
                                    skjema.felter.behandlingstype.validerOgSettFelt(
                                        value.value as Behandlingstype
                                    );
                                }
                            }}
                        />
                    </>
                )}
        </>
    );
};
