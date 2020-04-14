import React, { useState } from 'react';
import { Select } from 'nav-frontend-skjema';
import { DatoInput } from '../Felleskomponenter/DatoInput/DatoInput';
import { useOppgaver, OppgaverProvider } from '../../context/OppgaverContext';
import {
    OppgavetypeFilter,
    EnhetFilter,
    SaksbehandlerFilter,
    GjelderFilter,
    EnhetsmappeFilter,
    PrioritetFilter,
} from '../../typer/oppgave';
import { Knapp } from 'nav-frontend-knapper';
import './visoppgave.less';
import { ISaksbehandler } from '../../typer/saksbehandler';
import { v4 as uuidv4 } from 'uuid';
import { RessursStatus } from '../../typer/ressurs';

type IOppgaverFilter = {
    name: string;
    label: string;
    values: string[];
    selectedValue: string;
};

const initialFiltre = (innloggetSaksbehandler?: ISaksbehandler): IOppgaverFilter[] => {
    return [
        {
            name: 'Enhet',
            label: 'Enhet',
            values: Object.values(EnhetFilter).map(v => v.toString()),
            selectedValue: EnhetFilter.Alle,
        },
        {
            name: 'Oppgavetype',
            label: 'Oppgavetype',
            values: Object.values(OppgavetypeFilter).map(v => v.toString()),
            selectedValue: OppgavetypeFilter.Alle,
        },
        {
            name: 'Behandlingstema',
            label: 'Gjelder',
            values: Object.values(GjelderFilter).map(v => v.toString()),
            selectedValue: GjelderFilter.Alle,
        },
        {
            name: 'Enhetsmappe',
            label: 'Enhetsmappe (status på oppgave)',
            values: Object.values(EnhetsmappeFilter).map(v => v.toString()),
            selectedValue: EnhetsmappeFilter.Alle,
        },
        {
            name: 'Prioritet',
            label: 'Prioritet',
            values: Object.values(PrioritetFilter).map(v => v.toString()),
            selectedValue: PrioritetFilter.Alle,
        },
    ].concat(
        innloggetSaksbehandler
            ? {
                  name: 'Saksbehandler',
                  label: 'Saksbehandler',
                  values: Object.values(SaksbehandlerFilter)
                      .map(v => v.toString())
                      .concat(innloggetSaksbehandler!.identifier),
                  selectedValue: PrioritetFilter.Alle,
              }
            : {
                  name: 'Saksbehandler',
                  label: 'Saksbehandler',
                  values: Object.values(SaksbehandlerFilter).map(v => v.toString()),
                  selectedValue: PrioritetFilter.Alle,
              }
    );
};

const getbehandlingstema = (filter: IOppgaverFilter) => {
    const index = filter.values!.findIndex(v => v === filter.selectedValue);
    return index === 0 ? undefined : Object.keys(GjelderFilter)[index].toString();
};

const getOppgavetype = (filter: IOppgaverFilter) => {
    const index = filter.values!.findIndex(v => v === filter.selectedValue);
    return index === 0 ? undefined : Object.keys(OppgavetypeFilter)[index].toString();
};

const getEnhet = (filter: IOppgaverFilter) => {
    const index = filter.values!.findIndex(v => v === filter.selectedValue);
    return index === 0
        ? undefined
        : Object.values(EnhetFilter)
              [index].toString()
              .substring(0, 4);
};

interface IFilterSkjemaProps {
    innloggetSaksbehandler?: ISaksbehandler;
}

const FilterSkjema: React.FunctionComponent<IFilterSkjemaProps> = ({ innloggetSaksbehandler }) => {
    const { hentOppgaver, filterOppgaver, oppgaver } = useOppgaver();
    const [filtre, settFiltre] = useState<IOppgaverFilter[]>(initialFiltre(innloggetSaksbehandler));
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
                            key={uuidv4()}
                            value={filter.selectedValue}
                            className="filterskjema__filtre__input"
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
            <div className="filterskjema__filtre filterskjema__content">
                <DatoInput label="Frist" className="filterskjema__filtre__input" />
                <DatoInput label="Registert dato" className="filterskjema__filtre__input" />
            </div>
            <Knapp
                onClick={() => {
                    hentOppgaver(
                        getbehandlingstema(
                            filtre.find(filter => filter.name === 'Behandlingstema')!!
                        ),
                        getOppgavetype(filtre.find(filter => filter.name === 'Oppgavetype')!!),
                        getEnhet(filtre.find(filter => filter.name === 'Enhet')!!)
                    ).then(() => {
                        filterOppgaver();
                    });
                }}
                spinner={oppgaver.status == RessursStatus.HENTER}
                className="filterskjema__button filterskjema__content"
            >
                Hent
            </Knapp>
        </div>
    );
};

export default FilterSkjema;
