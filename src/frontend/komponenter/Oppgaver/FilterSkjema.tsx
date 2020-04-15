import React, { useState } from 'react';
import { Select } from 'nav-frontend-skjema';
import { DatoInput } from '../Felleskomponenter/DatoInput/DatoInput';
import { useOppgaver } from '../../context/OppgaverContext';
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
import { RessursStatus } from '../../typer/ressurs';
import moment from 'moment';

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
        {
            name: 'Saksbehandler',
            label: 'Saksbehandler',
            values: innloggetSaksbehandler
                ? Object.values(SaksbehandlerFilter)
                      .map(v => v.toString())
                      .concat(innloggetSaksbehandler.displayName)
                : Object.values(SaksbehandlerFilter).map(v => v.toString()),
            selectedValue: SaksbehandlerFilter.Alle,
        },
    ];
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

const getPrioritet = (filter: IOppgaverFilter) => {
    const index = filter.values!.findIndex(v => v === filter.selectedValue);
    return index === 0 ? undefined : Object.keys(PrioritetFilter)[index];
};

const getDato = (dato: string) => {
    const m = moment(dato, 'DD.MM.YYYY', true);
    return m.isValid() ? m.format('YYYY-MM-DD') : undefined;
};

interface IFilterSkjemaProps {
    innloggetSaksbehandler?: ISaksbehandler;
}

const FilterSkjema: React.FunctionComponent<IFilterSkjemaProps> = ({ innloggetSaksbehandler }) => {
    const { hentOppgaver, filterOppgaver, oppgaver } = useOppgaver();
    const [filtre, settFiltre] = useState<IOppgaverFilter[]>(initialFiltre(innloggetSaksbehandler));
    const [frist, settFrist] = useState<string>('');
    const [registertDato, settRegistertDato] = useState<string>('');
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
                            key={filter.name}
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
                <DatoInput
                    label="Frist"
                    className="filterskjema__filtre__input"
                    onChange={e => settFrist(e.target.value)}
                    value={frist}
                />
                <DatoInput
                    label="Registert dato"
                    className="filterskjema__filtre__input"
                    onChange={e => settRegistertDato(e.target.value)}
                    value={registertDato}
                />
            </div>
            <div className="filterskjema__content">
                <Knapp
                    onClick={() => {
                        hentOppgaver(
                            getbehandlingstema(
                                filtre.find(filter => filter.name === 'Behandlingstema')!!
                            ),
                            getOppgavetype(filtre.find(filter => filter.name === 'Oppgavetype')!!),
                            getEnhet(filtre.find(filter => filter.name === 'Enhet')!!)
                        ).then(oppgaverRes => {
                            filterOppgaver(
                                oppgaverRes,
                                getPrioritet(filtre.find(filter => filter.name === 'Prioritet')!),
                                undefined,
                                getDato(frist),
                                getDato(registertDato)
                            );
                        });
                    }}
                    spinner={oppgaver.status == RessursStatus.HENTER}
                    className="filterskjema__button"
                >
                    Hent
                </Knapp>
                <Knapp
                    onClick={() => {
                        settFiltre(initialFiltre(innloggetSaksbehandler));
                        settFrist('');
                        settRegistertDato('');
                    }}
                    className="filterskjema__tilbakestill"
                >
                    Tilbakestill filtrering
                </Knapp>
            </div>
        </div>
    );
};

export default FilterSkjema;
