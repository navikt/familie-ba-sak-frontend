import { Select, SkjemaGruppe } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';

import {
    BehandlingKategori,
    Behandlingstype,
    behandlingstyper,
    BehandlingUnderkategori,
} from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
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
        </SkjemaGruppe>
    );
};

export default OpprettBehandlingSkjema;
