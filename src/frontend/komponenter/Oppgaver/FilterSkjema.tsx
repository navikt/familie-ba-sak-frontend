import React, { useState, useEffect } from 'react';
import { Select } from 'nav-frontend-skjema';
import { useOppgaver, maksAntallOppgaver } from '../../context/OppgaverContext';
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

interface IOppgaverFiltre {
    [key: string]: IOppgaverFilter;
}

const initialFiltre = (innloggetSaksbehandler?: ISaksbehandler): IOppgaverFiltre => {
    return {
        enhet: {
            name: 'enhet',
            label: 'Enhet',
            values: Object.values(EnhetFilter).map(v => v.toString()),
            selectedValue: EnhetFilter.Alle,
        },
        oppgavetype: {
            name: 'oppgavetype',
            label: 'Oppgavetype',
            values: Object.values(OppgavetypeFilter).map(v => v.toString()),
            selectedValue: OppgavetypeFilter.Alle,
        },
        behandlingstema: {
            name: 'behandlingstema',
            label: 'Gjelder',
            values: Object.values(GjelderFilter).map(v => v.toString()),
            selectedValue: GjelderFilter.Alle,
        },
        prioritet: {
            name: 'prioritet',
            label: 'Prioritet',
            values: Object.values(PrioritetFilter).map(v => v.toString()),
            selectedValue: PrioritetFilter.Alle,
        },
        saksbehandler: {
            name: 'saksbehandler',
            label: 'Saksbehandler',
            values: innloggetSaksbehandler
                ? Object.values(SaksbehandlerFilter)
                      .map(v => v.toString())
                      .concat(innloggetSaksbehandler.displayName)
                : Object.values(SaksbehandlerFilter).map(v => v.toString()),
            selectedValue: innloggetSaksbehandler
                ? innloggetSaksbehandler.displayName
                : SaksbehandlerFilter.Alle,
        },
    };
};

const getBehandlingstema = (filter: IOppgaverFilter) => {
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

const getDato = (dato?: string) => {
    const m = moment(dato, 'YYYY-MM-DD', true);
    return m.isValid() ? m.format('YYYY-MM-DD') : undefined;
};

const getSaksbehandler = (filter: IOppgaverFilter, innloggetSaksbehandler?: ISaksbehandler) => {
    const index = filter.values.findIndex(v => v === filter.selectedValue);
    return index < 2 ? Object.keys(SaksbehandlerFilter)[index] : innloggetSaksbehandler?.navIdent;
};

interface IFilterSkjemaProps {
    innloggetSaksbehandler?: ISaksbehandler;
}

const FilterSkjema: React.FunctionComponent<IFilterSkjemaProps> = ({ innloggetSaksbehandler }) => {
    const { hentOppgaver, oppgaver } = useOppgaver();
    const [filtre, settFiltre] = useState<IOppgaverFiltre>(initialFiltre(innloggetSaksbehandler));
    const [frist, settFrist] = useState<string | undefined>('');
    const [registrertDato, settRegistrertDato] = useState<string | undefined>('');

    useEffect(() => {
        settFiltre({
            ...filtre,
            saksbehandler: {
                ...filtre.saksbehandler,
                values: innloggetSaksbehandler
                    ? Object.values(SaksbehandlerFilter)
                          .map(v => v.toString())
                          .concat(innloggetSaksbehandler.displayName)
                    : Object.values(SaksbehandlerFilter).map(v => v.toString()),
                selectedValue: innloggetSaksbehandler
                    ? innloggetSaksbehandler.displayName
                    : SaksbehandlerFilter.Alle,
            },
        });
    }, [innloggetSaksbehandler]);

    return (
        <div className="filterskjema">
            <div className="filterskjema__filtre filterskjema__content">
                {Object.values(filtre).map(filter => {
                    return (
                        <Select
                            bredde={'l'}
                            label={filter.label}
                            onChange={event =>
                                settFiltre({
                                    ...filtre,
                                    [filter.name]: {
                                        ...filtre[filter.name],
                                        selectedValue: event.target.value,
                                    },
                                })
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
                            maksAntallOppgaver,
                            getBehandlingstema(filtre.behandlingstema),
                            getOppgavetype(filtre.oppgavetype),
                            getEnhet(filtre.enhet),
                            getPrioritet(filtre.prioritet),
                            getDato(frist),
                            getDato(registrertDato),
                            getSaksbehandler(filtre.saksbehandler, innloggetSaksbehandler)
                        );
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
                    className="filterskjema__button"
                >
                    Tilbakestill filtrering
                </Knapp>
            </div>
        </div>
    );
};

export default FilterSkjema;
