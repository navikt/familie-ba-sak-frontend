import React, { type ReactElement } from 'react';

import styled from 'styled-components';

import { Fieldset, Button, Select, HStack } from '@navikt/ds-react';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import type { IOppgaveFelt } from './oppgavefelter';
import { useApp } from '../../context/AppContext';
import { useOppgaver } from '../../context/OppgaverContext';
import type { IPar } from '../../typer/common';
import type { IsoDatoString } from '../../utils/dato';
import DatovelgerForGammelSkjemaløsning from '../Felleskomponenter/Datovelger/DatovelgerForGammelSkjemaløsning';

const StyledFieldset = styled(Fieldset)`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`;

const FilterSkjema: React.FunctionComponent = () => {
    const { innloggetSaksbehandler } = useApp();
    const {
        hentOppgaver,
        oppgaver,
        oppgaveFelter,
        settVerdiPåOppgaveFelt,
        tilbakestillOppgaveFelter,
        validerSkjema,
    } = useOppgaver();

    const tilOppgaveFeltKomponent = (oppgaveFelt: IOppgaveFelt): ReactElement | null => {
        switch (oppgaveFelt.filter?.type) {
            case 'dato':
                return (
                    <DatovelgerForGammelSkjemaløsning
                        key={oppgaveFelt.nøkkel}
                        label={oppgaveFelt.label}
                        onDateChange={(dato: IsoDatoString) => {
                            settVerdiPåOppgaveFelt(oppgaveFelt, dato);
                        }}
                        value={oppgaveFelt.filter.selectedValue}
                        visFeilmeldinger={oppgaveFelt.valideringsstatus === Valideringsstatus.FEIL}
                        feilmelding={oppgaveFelt.feilmelding}
                    />
                );
            case 'select':
                return (
                    <div>
                        <Select
                            label={oppgaveFelt.label}
                            onChange={event =>
                                settVerdiPåOppgaveFelt(oppgaveFelt, event.target.value)
                            }
                            key={oppgaveFelt.nøkkel}
                            value={oppgaveFelt.filter.selectedValue}
                            error={
                                oppgaveFelt.valideringsstatus === Valideringsstatus.FEIL
                                    ? oppgaveFelt.feilmelding
                                    : undefined
                            }
                            data-cy={`select-${oppgaveFelt.label}`}
                        >
                            {oppgaveFelt.filter.nøkkelPar &&
                                Object.values(oppgaveFelt.filter.nøkkelPar)
                                    .filter((par: IPar) =>
                                        oppgaveFelt.erSynlig
                                            ? oppgaveFelt.erSynlig(par, innloggetSaksbehandler)
                                            : true
                                    )
                                    .map((par: IPar) => {
                                        return (
                                            <option
                                                aria-selected={
                                                    oppgaveFelt.filter &&
                                                    oppgaveFelt.filter.selectedValue === par.id
                                                }
                                                key={par.id}
                                                value={par.id}
                                            >
                                                {par.navn}
                                            </option>
                                        );
                                    })}
                        </Select>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <StyledFieldset legend="Oppgavebenken filterskjema" hideLegend>
            <HStack gap="6">
                {Object.values(oppgaveFelter)
                    .filter((oppgaveFelt: IOppgaveFelt) => oppgaveFelt.filter)
                    .map(tilOppgaveFeltKomponent)}
            </HStack>

            <HStack gap="2">
                <Button
                    variant="primary"
                    onClick={() => {
                        validerSkjema() && hentOppgaver();
                    }}
                    loading={oppgaver.status === RessursStatus.HENTER}
                    disabled={oppgaver.status === RessursStatus.HENTER}
                    children={'Hent oppgaver'}
                />
                <Button
                    onClick={tilbakestillOppgaveFelter}
                    variant="secondary"
                    children={'Tilbakestill filtrering'}
                />
            </HStack>
        </StyledFieldset>
    );
};

export default FilterSkjema;
