import { Lukknapp } from 'nav-frontend-ikonknapper';
import { Knapp } from 'nav-frontend-knapper';
import { Input, Select, SkjemaGruppe } from 'nav-frontend-skjema';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import {
    Behandlingstype,
    behandlingstyper,
    BehandlingKategori,
    kategorier,
    underkategorier,
    IFagsak,
} from '../../../typer/fagsak';
import { IFelt, Valideringsstatus } from '../../../typer/felt';
import {
    actions,
    useOpprettBehandlingContext,
    useOpprettBehandlingDispatch,
} from './OpprettBehandlingProvider';

interface IOpprettBehandlingSkjema {
    fagsak: IFagsak;
    opprettelseFeilmelding: string;
    visFeilmeldinger: boolean;
}

const OpprettBehandlingSkjema: React.FunctionComponent<IOpprettBehandlingSkjema> = ({
    fagsak,
    opprettelseFeilmelding,
    visFeilmeldinger,
}) => {
    const context = useOpprettBehandlingContext();
    const dispatch = useOpprettBehandlingDispatch();

    return (
        <SkjemaGruppe
            className={'opprettbehandling__skjemagruppe'}
            feil={
                visFeilmeldinger && opprettelseFeilmelding !== ''
                    ? opprettelseFeilmelding
                    : undefined
            }
        >
            <Select
                bredde={'l'}
                label="Velg behandlingstype"
                autoFocus={true}
                onChange={event =>
                    dispatch({
                        payload: event.target.value as Behandlingstype,
                        type: actions.SETT_BEHANDLINGSTYPE,
                    })
                }
                value={context.behandlingstype}
            >
                {Object.keys(behandlingstyper)
                    .filter(behandlingstype =>
                        fagsak.behandlinger.length === 0
                            ? behandlingstyper.REVURDERING.id !== behandlingstype
                            : behandlingstyper.REVURDERING.id === behandlingstype
                    )
                    .map((key: string) => {
                        return (
                            <option
                                aria-selected={context.behandlingstype === key}
                                key={key}
                                value={key}
                            >
                                {behandlingstyper[key].navn}
                            </option>
                        );
                    })}
            </Select>

            <br />
            <Undertittel children={'Velg sakstype'} />
            <Select
                bredde={'l'}
                label="Kategori"
                onChange={event =>
                    dispatch({
                        payload: event.target.value as BehandlingKategori,
                        type: actions.SETT_BEHANDLING_KATEGORI,
                    })
                }
                value={context.kategori}
            >
                {Object.keys(kategorier).map((key: string) => {
                    return (
                        <option aria-selected={context.kategori === key} key={key} value={key}>
                            {kategorier[key].navn}
                        </option>
                    );
                })}
            </Select>

            <Select
                bredde={'l'}
                label="Underkategori"
                onChange={event =>
                    dispatch({
                        payload: event.target.value as Behandlingstype,
                        type: actions.SETT_BEHANDLING_UNDERKATEGORI,
                    })
                }
                value={context.underkategori}
            >
                {Object.keys(underkategorier).map((key: string) => {
                    return (
                        <option aria-selected={context.underkategori === key} key={key} value={key}>
                            {underkategorier[key].navn}
                        </option>
                    );
                })}
            </Select>

            <br />
            <hr />
            <br />
            <Undertittel children={'Søker'} />
            <Normaltekst children={fagsak.søkerFødselsnummer} />

            <br />
            <Undertittel children={'Barn'} />
            {context.barnasIdenter.map((barnIdentFelt: IFelt<string>, index: number) => {
                return (
                    <div key={index} className={'opprettbehandling__skjemagruppe--barn'}>
                        <Input
                            label={'Ident'}
                            value={barnIdentFelt.verdi}
                            placeholder={'fnr/dnr'}
                            onChange={event => {
                                dispatch({
                                    payload: {
                                        ident: event.target.value,
                                        index,
                                    },
                                    type: actions.SETT_BARNAS_IDENTER,
                                });
                            }}
                            feil={
                                barnIdentFelt.valideringsstatus !== Valideringsstatus.OK &&
                                visFeilmeldinger
                                    ? barnIdentFelt.feilmelding
                                    : undefined
                            }
                        />
                        <Lukknapp
                            onClick={() => {
                                if (context.barnasIdenter.length > 1) {
                                    dispatch({
                                        payload: index,
                                        type: actions.SLETT_BARN,
                                    });
                                }
                            }}
                        />
                    </div>
                );
            })}

            <Knapp
                onClick={() => {
                    dispatch({
                        payload: undefined,
                        type: actions.LEGG_TIL_BARN,
                    });
                }}
            >
                Legg til barn
            </Knapp>

            <br />
        </SkjemaGruppe>
    );
};

export default OpprettBehandlingSkjema;
