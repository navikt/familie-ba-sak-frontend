import { Lukknapp } from 'nav-frontend-ikonknapper';
import { Knapp } from 'nav-frontend-knapper';
import { Input, Select, SkjemaGruppe } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';

import {
    BehandlingKategori,
    Behandlingstype,
    behandlingstyper,
    kategorier,
    underkategorier,
    BehandlingUnderkategori,
} from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { IFelt, Valideringsstatus } from '../../../typer/felt';
import {
    actions,
    useOpprettBehandlingContext,
    useOpprettBehandlingDispatch,
} from './OpprettBehandlingProvider';
import Sakstype from '../../Felleskomponenter/Sakstype/Sakstype';

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
            <Sakstype
                kategori={context.kategori}
                kategoriOnChange={(behandlingKategori: BehandlingKategori) =>
                    dispatch({
                        payload: behandlingKategori,
                        type: actions.SETT_BEHANDLING_KATEGORI,
                    })
                }
                underkategori={context.underkategori}
                underkategoriOnChange={(behandlingUnderkategori: BehandlingUnderkategori) =>
                    dispatch({
                        payload: behandlingUnderkategori,
                        type: actions.SETT_BEHANDLING_UNDERKATEGORI,
                    })
                }
            />

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
