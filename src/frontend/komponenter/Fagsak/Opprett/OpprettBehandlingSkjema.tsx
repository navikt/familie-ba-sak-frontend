import { Lukknapp } from 'nav-frontend-ikonknapper';
import { Knapp } from 'nav-frontend-knapper';
import { Input, Select, SkjemaGruppe, FnrInput } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import {
    Behandlingstype,
    behandlingstyper,
    BehandlingKategori,
    kategorier,
    underkategorier,
} from '../../../typer/fagsak';
import { IFelt, Valideringsstatus } from '../../../typer/felt';
import {
    actions,
    useOpprettBehandlingContext,
    useOpprettBehandlingDispatch,
} from './OpprettBehandlingProvider';

interface IOpprettBehandlingSkjema {
    opprettelseFeilmelding: string;
    visFeilmeldinger: boolean;
}

const OpprettBehandlingSkjema: React.FunctionComponent<IOpprettBehandlingSkjema> = ({
    opprettelseFeilmelding,
    visFeilmeldinger,
}) => {
    const context = useOpprettBehandlingContext();
    const dispatch = useOpprettBehandlingDispatch();

    return (
        <SkjemaGruppe
            className={'opprett__skjemagruppe'}
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
                {Object.keys(behandlingstyper).map((key: string) => {
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
            <Input
                bredde={'L'}
                label={'Ident'}
                value={context.søkersIdent.verdi}
                placeholder={'fnr/dnr'}
                onChange={event => {
                    dispatch({
                        payload: event.target.value,
                        type: actions.SETT_SØKERS_FØDSELSNUMMER,
                    });
                }}
                feil={
                    context.søkersIdent.valideringsstatus !== Valideringsstatus.OK &&
                    visFeilmeldinger
                        ? context.søkersIdent.feilmelding
                        : undefined
                }
            />

            <br />
            <Undertittel children={'Barn'} />
            {context.barnasIdenter.map((barnIdentFelt: IFelt<string>, index: number) => {
                return (
                    <div key={index} className={'opprett__skjemagruppe--barn'}>
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
