import React from 'react';

import styled from 'styled-components';

import { Fieldset, Button, Select } from '@navikt/ds-react';
import type { ISODateString } from '@navikt/familie-datovelger';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import FilterSkjemaDatovelger from './FilterSkjemaDatovelger';
import type { IOppgaveFelt } from './oppgavefelter';
import { useApp } from '../../context/AppContext';
import { useOppgaver } from '../../context/OppgaverContext';
import type { IPar } from '../../typer/common';

const StyledButton = styled(Button)`
    margin-top: 0.5rem;
    margin-right: 1.5rem;
`;

const StyledFieldset = styled(Fieldset)`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`;

const FilterRad = styled.div`
    display: flex;
    margin-top: 1rem;

    & > * {
        padding-right: 1.5rem;
    }
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

    return (
        <StyledFieldset legend="Oppgavebenken filterskjema" hideLegend>
            <FilterRad>
                {Object.values(oppgaveFelter)
                    .filter((oppgaveFelt: IOppgaveFelt) => oppgaveFelt.filter)
                    .map((oppgaveFelt: IOppgaveFelt) => {
                        switch (oppgaveFelt.filter?.type) {
                            case 'dato':
                                return (
                                    <FilterSkjemaDatovelger
                                        key={oppgaveFelt.nøkkel}
                                        label={oppgaveFelt.label}
                                        onDateChange={(dato: ISODateString) => {
                                            settVerdiPåOppgaveFelt(oppgaveFelt, dato);
                                        }}
                                        value={oppgaveFelt.filter.selectedValue}
                                        visFeilmeldinger={
                                            oppgaveFelt.valideringsstatus === Valideringsstatus.FEIL
                                        }
                                        feilmelding={oppgaveFelt.feilmelding}
                                    />
                                );
                            case 'select':
                                return (
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
                                                        ? oppgaveFelt.erSynlig(
                                                              par,
                                                              innloggetSaksbehandler
                                                          )
                                                        : true
                                                )
                                                .map((par: IPar) => {
                                                    return (
                                                        <option
                                                            aria-selected={
                                                                oppgaveFelt.filter &&
                                                                oppgaveFelt.filter.selectedValue ===
                                                                    par.id
                                                            }
                                                            key={par.id}
                                                            value={par.id}
                                                        >
                                                            {par.navn}
                                                        </option>
                                                    );
                                                })}
                                    </Select>
                                );
                            default:
                                return null;
                        }
                    })}
            </FilterRad>

            <div className="filterskjema__actions">
                <StyledButton
                    variant="primary"
                    onClick={() => {
                        validerSkjema() && hentOppgaver();
                    }}
                    loading={oppgaver.status === RessursStatus.HENTER}
                    disabled={oppgaver.status === RessursStatus.HENTER}
                    children={'Hent oppgaver'}
                />
                <StyledButton
                    onClick={tilbakestillOppgaveFelter}
                    variant="secondary"
                    children={'Tilbakestill filtrering'}
                />
            </div>
        </StyledFieldset>
    );
};

export default FilterSkjema;
