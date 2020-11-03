import { FamilieDatovelger } from '@navikt/familie-form-elements';
import { Knapp } from 'nav-frontend-knapper';
import { Select } from 'nav-frontend-skjema';
import React from 'react';
import { useOppgaver } from '../../context/OppgaverContext';

import { RessursStatus } from '@navikt/familie-typer';
import { datoformatNorsk } from '../../utils/formatter';
import { IPar } from '../../typer/common';
import { IOppgaveFelt } from './oppgavefelter';

const FilterSkjema: React.FunctionComponent = () => {
    const {
        hentOppgaver,
        oppgaver,
        oppgaveFelter,
        settVerdiPåOppgaveFelt,
        tilbakestillOppgaveFelter,
    } = useOppgaver();

    return (
        <div className="filterskjema">
            <div className="filterskjema__filtre">
                {Object.values(oppgaveFelter)
                    .filter((oppgaveFelt: IOppgaveFelt) => oppgaveFelt.filter)
                    .map((oppgaveFelt: IOppgaveFelt) => {
                        switch (oppgaveFelt.filter?.type) {
                            case 'dato':
                                return (
                                    <FamilieDatovelger
                                        key={oppgaveFelt.nøkkel}
                                        id={oppgaveFelt.nøkkel}
                                        label={oppgaveFelt.label}
                                        onChange={(dato: string | undefined) =>
                                            settVerdiPåOppgaveFelt(oppgaveFelt, dato ? dato : '')
                                        }
                                        placeholder={datoformatNorsk.DATO}
                                        valgtDato={oppgaveFelt.filter.selectedValue}
                                        className="filterskjema__filtre--input"
                                    />
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
                                    >
                                        {oppgaveFelt.filter.nøkkelPar &&
                                            Object.values(oppgaveFelt.filter.nøkkelPar).map(
                                                (par: IPar) => {
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
                                                }
                                            )}
                                    </Select>
                                );
                            default:
                                return null;
                        }
                    })}
            </div>

            <div className="filterskjema__actions">
                <Knapp
                    type={'hoved'}
                    mini
                    onClick={() => {
                        hentOppgaver();
                    }}
                    spinner={oppgaver.status === RessursStatus.HENTER}
                    children={'Hent'}
                />
                <Knapp
                    onClick={tilbakestillOppgaveFelter}
                    mini
                    children={'Tilbakestill filtrering'}
                />
            </div>
        </div>
    );
};

export default FilterSkjema;
