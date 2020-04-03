import React, { useState } from 'react';
import { SkjemaGruppe, Select } from 'nav-frontend-skjema';
import { useOppgaver } from '../../context/OppgaverContext';
import { Oppgavetype } from '../../typer/oppgave';
import { Knapp } from 'nav-frontend-knapper';

interface IVisOppgaverFilter {
    oppgavetype: Oppgavetype;
}

const initialFilter: IVisOppgaverFilter = {
    oppgavetype: Oppgavetype.Behandle,
};

const FilterSkjema: React.FunctionComponent = () => {
    const { hentOppgaver, henter } = useOppgaver();
    const [filter, settFilter] = useState<IVisOppgaverFilter>(initialFilter);

    return (
        <div className="visoppgaver__filterskjema">
            <SkjemaGruppe className="visoppgaver__filter">
                <Select
                    bredde={'l'}
                    label="Oppgavetype"
                    autoFocus={true}
                    onChange={event =>
                        settFilter({
                            ...filter,
                            oppgavetype: event.target.value as Oppgavetype,
                        })
                    }
                    value={filter.oppgavetype}
                >
                    {Object.values(Oppgavetype).map((value: string) => {
                        return (
                            <option
                                aria-selected={filter.oppgavetype === value}
                                key={value}
                                value={value}
                            >
                                {value}
                            </option>
                        );
                    })}
                </Select>
            </SkjemaGruppe>
            <Knapp
                onClick={() => {
                    hentOppgaver();
                }}
                spinner={henter}
            >
                Hent
            </Knapp>
        </div>
    );
};

export default FilterSkjema;
