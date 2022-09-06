import React, { useState } from 'react';

import classNames from 'classnames';

import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import { FamilieCheckbox } from '@navikt/familie-form-elements';

import type { BehandlingResultat } from '../../../typer/behandling';
import { erBehandlingHenlagt } from '../../../typer/behandling';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import type { ITilbakekrevingsbehandling } from '../../../typer/tilbakekrevingsbehandling';
import { Behandlingsresultatstype } from '../../../typer/tilbakekrevingsbehandling';
import { kalenderDiff } from '../../../utils/kalender';
import { Behandling } from './Behandling';
import { BehandlingEllerTilbakekreving } from './BehandlingEllerTilbakekreving';
import type { VisningBehandling } from './visningBehandling';

interface IBehandlingshistorikkProps {
    minimalFagsak: IMinimalFagsak;
}

const konverterBehandling = (
    behandlingEllerTilbakekreving: VisningBehandling | ITilbakekrevingsbehandling,
    type: BehandlingEllerTilbakekreving
): BehandlingTabellobjekt => {
    return {
        type: type,
        behandlingEllerTilbakekreving: behandlingEllerTilbakekreving,
    };
};

interface BehandlingTabellobjekt {
    type: BehandlingEllerTilbakekreving;
    behandlingEllerTilbakekreving: VisningBehandling | ITilbakekrevingsbehandling;
}

const visRad = (behandling: BehandlingTabellobjekt, visHenlagteBehandlinger: boolean) => {
    if (visHenlagteBehandlinger) return true;
    if (!behandling.behandlingEllerTilbakekreving.resultat) return true;
    if (behandling.type === BehandlingEllerTilbakekreving.BEHANDLING) {
        return !erBehandlingHenlagt(
            behandling.behandlingEllerTilbakekreving.resultat as BehandlingResultat
        );
    }
    return Behandlingsresultatstype.HENLAGT !== behandling.behandlingEllerTilbakekreving.resultat;
};

const Behandlinger: React.FC<IBehandlingshistorikkProps> = ({ minimalFagsak }) => {
    const behandlinger: BehandlingTabellobjekt[] = [
        ...minimalFagsak.behandlinger.map(b =>
            konverterBehandling(b, BehandlingEllerTilbakekreving.BEHANDLING)
        ),
        ...minimalFagsak.tilbakekrevingsbehandlinger.map(b =>
            konverterBehandling(b, BehandlingEllerTilbakekreving.TIlBAKEBETALING)
        ),
    ];

    const [visHenlagteBehandlinger, setVisHenlagteBehandlinger] = useState(false);

    return (
        <div className={'saksoversikt__behandlingshistorikk'}>
            <Systemtittel
                children={
                    <>
                        Behandlinger
                        <FamilieCheckbox
                            id={'vis-henlagte-behandlinger'}
                            erLesevisning={false}
                            label={'Vis henlagte behandlinger'}
                            checked={visHenlagteBehandlinger}
                            onChange={() => {
                                setVisHenlagteBehandlinger(!visHenlagteBehandlinger);
                            }}
                        />
                    </>
                }
            />
            {behandlinger.length > 0 ? (
                <table
                    className={classNames('tabell', 'saksoversikt__behandlingshistorikk__tabell')}
                >
                    <thead>
                        <tr>
                            <th children={'Opprettet'} />
                            <th children={'Årsak'} />
                            <th children={'Type'} />
                            <th children={'Behandlingstema'} />
                            <th children={'Status'} />
                            <th children={'Vedtaksdato'} />
                            <th children={'Resultat'} />
                        </tr>
                    </thead>
                    <tbody>
                        {behandlinger
                            .filter(behandling => visRad(behandling, visHenlagteBehandlinger))
                            .sort((a, b) =>
                                kalenderDiff(
                                    new Date(b.behandlingEllerTilbakekreving.opprettetTidspunkt),
                                    new Date(a.behandlingEllerTilbakekreving.opprettetTidspunkt)
                                )
                            )
                            .map((behandling: BehandlingTabellobjekt) => (
                                <Behandling
                                    key={behandling.behandlingEllerTilbakekreving.behandlingId}
                                    behandling={behandling.behandlingEllerTilbakekreving}
                                    minimalFagsak={minimalFagsak}
                                />
                            ))}
                    </tbody>
                </table>
            ) : (
                <Normaltekst children={'Ingen tidligere behandlinger'} />
            )}
        </div>
    );
};

export default Behandlinger;
