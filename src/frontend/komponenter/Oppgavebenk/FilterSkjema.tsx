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

const DatoVelgerContainer = styled.div`
    max-width: 12.5rem;
`;

// Denne stylingen skal fjernes på sikt (minus marginer)
const StyledButton = styled(Button)`
    margin-top: 0.5rem;
    margin-right: 1.5rem;
    padding: calc(0.25rem - 1px) 1.5rem calc(0.25rem - 1px) 1.5rem;
    font-weight: bolder;
    min-height: 2rem;
    .navds-button__inner {
        font-weight: 600;
        letter-spacing: 0.0625em;
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
        <Fieldset className="filterskjema" legend="Oppgavebenken filterskjema" hideLegend>
            <div className="filterskjema__filtre">
                {Object.values(oppgaveFelter)
                    .filter((oppgaveFelt: IOppgaveFelt) => oppgaveFelt.filter)
                    .map((oppgaveFelt: IOppgaveFelt) => {
                        switch (oppgaveFelt.filter?.type) {
                            case 'dato':
                                return (
                                    <DatoVelgerContainer key={oppgaveFelt.nøkkel}>
                                        <FilterSkjemaDatovelger
                                            key={oppgaveFelt.nøkkel}
                                            label={oppgaveFelt.label}
                                            onDateChange={(dato: ISODateString) => {
                                                settVerdiPåOppgaveFelt(oppgaveFelt, dato);
                                            }}
                                            value={oppgaveFelt.filter.selectedValue}
                                            visFeilmeldinger={
                                                oppgaveFelt.valideringsstatus ===
                                                Valideringsstatus.FEIL
                                            }
                                            feilmelding={oppgaveFelt.feilmelding}
                                        />
                                    </DatoVelgerContainer>
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
                                        className="filterskjema__filtre--input"
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
            </div>

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
        </Fieldset>
    );
};

export default FilterSkjema;
