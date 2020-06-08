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
import Sakstype from '../../Felleskomponenter/Sakstype/Sakstype';
import { useOpprettBehandling } from '../../../context/OpprettBehandlingContext';
import VelgBarn from './VelgBarn';

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
    const {
        behandlingstype,
        kategori,
        settBehandlingstype,
        settKategori,
        settUnderkategori,
        underkategori,
    } = useOpprettBehandling();

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
                onChange={(event: React.ChangeEvent<HTMLSelectElement>): void =>
                    settBehandlingstype(event.target.value as Behandlingstype)
                }
                value={behandlingstype}
            >
                {Object.keys(behandlingstyper)
                    .filter(behandlingstype =>
                        fagsak.behandlinger.length === 0
                            ? behandlingstyper.REVURDERING.id !== behandlingstype
                            : behandlingstyper.REVURDERING.id === behandlingstype
                    )
                    .map((key: string) => {
                        return (
                            <option aria-selected={behandlingstype === key} key={key} value={key}>
                                {behandlingstyper[key].navn}
                            </option>
                        );
                    })}
            </Select>

            <br />
            <Undertittel children={'Velg sakstype'} />
            <Sakstype
                kategori={kategori}
                kategoriOnChange={(behandlingKategori: BehandlingKategori): void =>
                    settKategori(behandlingKategori)
                }
                underkategori={underkategori}
                underkategoriOnChange={(behandlingUnderkategori: BehandlingUnderkategori): void =>
                    settUnderkategori(behandlingUnderkategori)
                }
            />

            {behandlingstype === Behandlingstype.MIGRERING_FRA_INFOTRYGD && <VelgBarn />}
        </SkjemaGruppe>
    );
};

export default OpprettBehandlingSkjema;
