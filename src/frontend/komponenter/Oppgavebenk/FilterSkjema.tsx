import React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { Select, SkjemaGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import { Button } from '@navikt/ds-react';
import type { ISODateString } from '@navikt/familie-form-elements';
import { FamilieDatovelger } from '@navikt/familie-form-elements';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../context/AppContext';
import { useOppgaver } from '../../context/OppgaverContext';
import type { IPar } from '../../typer/common';
import { datoformatNorsk } from '../../utils/formatter';
import type { IOppgaveFelt } from './oppgavefelter';

const StyledElement = styled(Element)`
    margin-top: 0.5rem;
    color: ${navFarger.redError};
`;

const DatoVelgerContainer = styled.div`
    max-width: 12.5rem;
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
        <SkjemaGruppe className="filterskjema" aria-label="oppgavebenken-filterskjema">
            <div className="filterskjema__filtre">
                {Object.values(oppgaveFelter)
                    .filter((oppgaveFelt: IOppgaveFelt) => oppgaveFelt.filter)
                    .map((oppgaveFelt: IOppgaveFelt) => {
                        switch (oppgaveFelt.filter?.type) {
                            case 'dato':
                                return (
                                    <DatoVelgerContainer key={oppgaveFelt.nøkkel}>
                                        <FamilieDatovelger
                                            id={oppgaveFelt.nøkkel}
                                            label={oppgaveFelt.label}
                                            onChange={(dato?: ISODateString) => {
                                                settVerdiPåOppgaveFelt(
                                                    oppgaveFelt,
                                                    dato ? dato : ''
                                                );
                                            }}
                                            placeholder={datoformatNorsk.DATO}
                                            valgtDato={oppgaveFelt.filter.selectedValue}
                                            className="filterskjema__filtre--input"
                                        />
                                        {oppgaveFelt.valideringsstatus ===
                                            Valideringsstatus.FEIL && (
                                            <StyledElement>{oppgaveFelt.feilmelding}</StyledElement>
                                        )}
                                    </DatoVelgerContainer>
                                );
                            case 'select':
                                return (
                                    <Select
                                        bredde={'l'}
                                        label={oppgaveFelt.label}
                                        onChange={event =>
                                            settVerdiPåOppgaveFelt(oppgaveFelt, event.target.value)
                                        }
                                        key={oppgaveFelt.nøkkel}
                                        value={oppgaveFelt.filter.selectedValue}
                                        className="filterskjema__filtre--input"
                                        feil={
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
            </div>
        </SkjemaGruppe>
    );
};

export default FilterSkjema;
