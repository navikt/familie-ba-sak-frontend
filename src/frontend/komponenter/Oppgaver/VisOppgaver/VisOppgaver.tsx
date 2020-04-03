import React, { useState } from 'react';
import { useOppgaver } from '../../../context/OppgaverContext';
import { Knapp } from 'nav-frontend-knapper';
import { RessursStatus } from '../../../typer/ressurs';
import { Input, Select, SkjemaGruppe } from 'nav-frontend-skjema';
import { Oppgavetype } from '../../../typer/oppgave';

interface IVisOppgaverFilter {
    oppgavetype: Oppgavetype;
}

const initialFilter: IVisOppgaverFilter = {
    oppgavetype: Oppgavetype.Behandle,
};

const VisOppgaver: React.FunctionComponent = () => {
    const { hentetOppgaver, hentOppgaver, henter } = useOppgaver();
    const [filter, settFilter] = useState<IVisOppgaverFilter>(initialFilter);

    return (
        <div className="visoppgaver">
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
            {hentetOppgaver &&
                hentetOppgaver.status == RessursStatus.SUKSESS &&
                hentetOppgaver.data.map((oppg, index) => <p key={index}>{oppg.aktoerid}</p>)}
        </div>
    );
};

export default VisOppgaver;
