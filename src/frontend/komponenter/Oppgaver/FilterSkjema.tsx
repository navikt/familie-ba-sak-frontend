import React, { useState, useEffect } from 'react';
import { Select } from 'nav-frontend-skjema';
import { useOppgaver } from '../../context/OppgaverContext';
import {
    OppgavetypeFilter,
    EnhetFilter,
    SaksbehandlerFilter,
    GjelderFilter,
    PrioritetFilter,
} from '../../typer/oppgave';
import { Knapp } from 'nav-frontend-knapper';
import './visoppgave.less';
import { ISaksbehandler } from '../../typer/saksbehandler';
import { RessursStatus } from '../../typer/ressurs';
import moment from 'moment';
import Datovelger from '../Felleskomponenter/Datovelger/Datovelger';
import { datoformatNorsk } from '../../utils/formatter';

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
    const index = filter.values.findIndex(v => v === filter.selectedValue);
    return index === 0 ? undefined : Object.keys(GjelderFilter)[index].toString();
};

const getOppgavetype = (filter: IOppgaverFilter) => {
    const index = filter.values.findIndex(v => v === filter.selectedValue);
    return index === 0 ? undefined : Object.keys(OppgavetypeFilter)[index].toString();
};

const getEnhet = (filter: IOppgaverFilter) => {
    const index = filter.values.findIndex(v => v === filter.selectedValue);
    return index === 0
        ? undefined
        : Object.values(EnhetFilter)
              [index].toString()
              .substring(0, 4);
};

const getPrioritet = (filter: IOppgaverFilter) => {
    const index = filter.values.findIndex(v => v === filter.selectedValue);
    return index === 0 ? undefined : Object.keys(PrioritetFilter)[index];
};

const getDato = (dato: string) => {
    const m = moment(dato, 'YYYY-MM-DD', true);
    return m.isValid() ? m.format('YYYY-MM-DD') : undefined;
};

const getSaksbehandler = (filter: IOppgaverFilter, innloggetSaksbehandler?: ISaksbehandler) => {
    const index = filter.values.findIndex(v => v === filter.selectedValue);
    return index < 2 ? Object.keys(SaksbehandlerFilter)[index] : innloggetSaksbehandler?.identifier;
};

interface IFilterSkjemaProps {
    innloggetSaksbehandler?: ISaksbehandler;
}

const FilterSkjema: React.FunctionComponent<IFilterSkjemaProps> = ({ innloggetSaksbehandler }) => {
    const { hentOppgaver, filterOppgaver, oppgaver } = useOppgaver();
    const [filtre, settFiltre] = useState<IOppgaverFilter[]>(initialFiltre(innloggetSaksbehandler));
    const [frist, settFrist] = useState<string>('');
    const [registrertDato, settRegistrertDato] = useState<string>('');

    useEffect(() => {
        settFiltre(
            filtre.map(filter =>
                filter.name === 'Saksbehandler'
                    ? {
                          ...filter,
                          values: innloggetSaksbehandler
                              ? Object.values(SaksbehandlerFilter)
                                    .map(v => v.toString())
                                    .concat(innloggetSaksbehandler.displayName)
                              : Object.values(SaksbehandlerFilter).map(v => v.toString()),
                      }
                    : filter
            )
        );
    }, [innloggetSaksbehandler]);

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
                                    filtre.map((f, idx) =>
                                        idx === index
                                            ? {
                                                  ...f,
                                                  selectedValue: event.target.value,
                                              }
                                            : f
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
                <Datovelger
                    id="frist"
                    label="Frist"
                    onChange={verdi => settFrist(verdi)}
                    placeholder={datoformatNorsk.DATO}
                    valgtDato={frist}
                    className="filterskjema__filtre__input"
                />
                <Datovelger
                    id="registrertDato"
                    label="Registrert dato"
                    onChange={verdi => settRegistrertDato(verdi)}
                    placeholder={datoformatNorsk.DATO}
                    valgtDato={registrertDato}
                    className="filterskjema__filtre__input"
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
                                getDato(frist),
                                getDato(registrertDato),
                                getSaksbehandler(
                                    filtre.find(filter => filter.name === 'Saksbehandler')!,
                                    innloggetSaksbehandler
                                )
                            );
                        });
                    }}
                    spinner={oppgaver.status === RessursStatus.HENTER}
                    className="filterskjema__button"
                >
                    Hent
                </Knapp>
                <Knapp
                    onClick={() => {
                        settFiltre(initialFiltre(innloggetSaksbehandler));
                        settFrist('');
                        settRegistrertDato('');
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
