import React, { useState } from 'react';
import { Select } from 'nav-frontend-skjema';
import { useOppgaver } from '../../context/OppgaverContext';
import {
    Oppgavetype,
    Enhet,
    Saksbehandler,
    Gjelder,
    Enhetsmappe,
    Prioritet,
} from '../../typer/oppgave';
import { Knapp } from 'nav-frontend-knapper';
import './visoppgave.less';

interface IOppgaverFilter {
    name: string;
    label: string;
    values: string[];
    selectedValue: string;
}

type IOppgaverFiltre = IOppgaverFilter[];

const initialFiltre: IOppgaverFiltre = [
    {
        name: 'Enhet',
        label: 'Enhet',
        values: Object.values(Enhet),
        selectedValue: Enhet.Alle,
    },

    //needs to figure out possible values
    {
        name: 'Saksbehandler',
        label: 'Saksbehandler',
        values: Object.values(Saksbehandler),
        selectedValue: Saksbehandler.Alle,
    },

    {
        name: 'Oppgavetype',
        label: 'Oppgavetype',
        values: Object.values(Oppgavetype),
        selectedValue: Oppgavetype.Alle,
    },

    {
        name: 'Behandlingstema',
        label: 'Gjelder',
        values: Object.values(Gjelder),
        selectedValue: Gjelder.Alle,
    },

    {
        name: 'Enhetsmappe',
        label: 'Enhetsmappe (status på oppgave)',
        values: Object.values(Enhetsmappe),
        selectedValue: Enhetsmappe.Alle,
    },
    {
        name: 'Prioritet',
        label: 'Prioritet',
        values: Object.values(Prioritet),
        selectedValue: Prioritet.Alle,
    },
];

const getbehandlingstema = (filter: IOppgaverFilter) => {
    const index = filter.values.findIndex(v => v === filter.selectedValue);
    return Object.keys(Gjelder)[index].toString();
};

const getOppgavetype = (filter: IOppgaverFilter) => {
    const index = filter.values.findIndex(v => v === filter.selectedValue);
    return Object.keys(Oppgavetype)[index].toString();
};

const FilterSkjema: React.FunctionComponent = () => {
    const { hentOppgaver, filterOppgaver, henter } = useOppgaver();
    const [filtre, settFiltre] = useState<IOppgaverFiltre>(initialFiltre);
    return (
        <div className="filterskjema">
            <div className="filterskjema__filtre filterskjema__content">
                {filtre.map((filter, index) => {
                    return (
                        <Select
                            bredde={'l'}
                            label={filter.label}
                            autoFocus={true}
                            onChange={event =>
                                settFiltre(
                                    filtre.map((filter, idx) =>
                                        idx === index
                                            ? {
                                                  ...filter,
                                                  selectedValue: event.target.value,
                                              }
                                            : filter
                                    )
                                )
                            }
                            value={filter.selectedValue}
                            className="filterskjema__filtre__filter"
                        >
                            {filter.values.map((value: string) => {
                                return (
                                    <option
                                        aria-selected={filter.selectedValue === value}
                                        key={value}
                                        value={value}
                                    >
                                        {value}
                                    </option>
                                );
                            })}
                        </Select>
                    );
                })}
            </div>
            <Knapp
                onClick={() => {
                    console.log(filtre);
                    hentOppgaver(
                        getbehandlingstema(
                            filtre.find(filter => filter.name === 'Behandlingstema')!!
                        ),
                        getOppgavetype(filtre.find(filter => filter.name === 'Oppgavetype')!!)
                    ).then(() => {
                        filterOppgaver();
                    });
                }}
                spinner={henter}
                className="filterskjema__button filterskjema__content"
            >
                Hent
            </Knapp>
        </div>
    );
};

export default FilterSkjema;
