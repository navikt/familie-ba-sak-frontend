import { FamilieDatovelger } from '@navikt/familie-form-elements';
import moment from 'moment';
import { Knapp } from 'nav-frontend-knapper';
import { Select } from 'nav-frontend-skjema';
import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { maksAntallOppgaver, useOppgaver } from '../../context/OppgaverContext';
import {
    EnhetFilter,
    GjelderFilter,
    OppgavetypeFilter,
    SaksbehandlerFilter,
} from '../../typer/oppgave';
import { RessursStatus } from '@navikt/familie-typer';
import { ISaksbehandler } from '@navikt/familie-typer';
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
    return index === 0 ? undefined : Object.values(EnhetFilter)[index].toString().substring(0, 4);
};

const getDato = (dato?: string) => {
    const m = moment(dato, 'YYYY-MM-DD', true);
    return m.isValid() ? m.format('YYYY-MM-DD') : undefined;
};

const getSaksbehandler = (filter: IOppgaverFilter, innloggetSaksbehandler?: ISaksbehandler) => {
    const index = filter.values.findIndex(v => v === filter.selectedValue);
    return index < 2 ? Object.keys(SaksbehandlerFilter)[index] : innloggetSaksbehandler?.navIdent;
};

const FilterSkjema: React.FunctionComponent = () => {
    const { hentOppgaver, oppgaver } = useOppgaver();
    const { innloggetSaksbehandler } = useApp();
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
            <div className="filterskjema__filtre">
                {Object.values(filtre).map(filter => {
                    return (
                        <Select
                            bredde={'m'}
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
                            className="filterskjema__filtre--input"
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
                <FamilieDatovelger
                    id="frist"
                    label="Frist"
                    onChange={verdi => settFrist(verdi)}
                    placeholder={datoformatNorsk.DATO}
                    valgtDato={frist}
                    className="filterskjema__filtre--input"
                />
                <FamilieDatovelger
                    id="registrertDato"
                    label="Registrert dato"
                    onChange={verdi => settRegistrertDato(verdi)}
                    placeholder={datoformatNorsk.DATO}
                    valgtDato={registrertDato}
                    className="filterskjema__filtre--input"
                />
            </div>
            <div className="filterskjema__actions">
                <Knapp
                    onClick={() => {
                        hentOppgaver(
                            maksAntallOppgaver,
                            getBehandlingstema(filtre.behandlingstema),
                            getOppgavetype(filtre.oppgavetype),
                            getEnhet(filtre.enhet),
                            getDato(frist),
                            getDato(registrertDato),
                            getSaksbehandler(filtre.saksbehandler, innloggetSaksbehandler)
                        );
                    }}
                    spinner={oppgaver.status === RessursStatus.HENTER}
                >
                    Hent
                </Knapp>
                <Knapp
                    onClick={() => {
                        settFiltre(initialFiltre(innloggetSaksbehandler));
                        settFrist('');
                        settRegistrertDato('');
                    }}
                >
                    Tilbakestill filtrering
                </Knapp>
            </div>
        </div>
    );
};

export default FilterSkjema;
