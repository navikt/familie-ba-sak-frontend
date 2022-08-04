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
import { BehandlingEllerTilbakebetaling } from './BehandlingEllerTilbakebetaling';
import type { VisningBehandling } from './visningBehandling';

interface IBehandlingshistorikkProps {
    minimalFagsak: IMinimalFagsak;
}

const konverterBehandling = (
    faktiskObjekt: VisningBehandling | ITilbakekrevingsbehandling,
    behandlingEllerTilbakemelding: BehandlingEllerTilbakebetaling
): BehandlingTabellobjekt => {
    return {
        behandlingEllerTilbakemelding: behandlingEllerTilbakemelding,
        faktiskObjekt: faktiskObjekt,
    };
};

interface BehandlingTabellobjekt {
    behandlingEllerTilbakemelding: BehandlingEllerTilbakebetaling;
    faktiskObjekt: VisningBehandling | ITilbakekrevingsbehandling;
}

const visRad = (behandling: BehandlingTabellobjekt, visHenlagteBehandlinger: boolean) => {
    if (visHenlagteBehandlinger) return true;
    if (!behandling.faktiskObjekt.resultat) return false;
    if (behandling.behandlingEllerTilbakemelding === BehandlingEllerTilbakebetaling.BEHANDLING) {
        return !erBehandlingHenlagt(behandling.faktiskObjekt.resultat as BehandlingResultat);
    }
    return Behandlingsresultatstype.HENLAGT !== behandling.faktiskObjekt.resultat;
};

const Behandlinger: React.FC<IBehandlingshistorikkProps> = ({ minimalFagsak }) => {
    const behandlinger: BehandlingTabellobjekt[] = [
        ...minimalFagsak.behandlinger.map(b =>
            konverterBehandling(b, BehandlingEllerTilbakebetaling.BEHANDLING)
        ),
        ...minimalFagsak.tilbakekrevingsbehandlinger.map(b =>
            konverterBehandling(b, BehandlingEllerTilbakebetaling.TIlBAKEBETALING)
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
                                    new Date(b.faktiskObjekt.opprettetTidspunkt),
                                    new Date(a.faktiskObjekt.opprettetTidspunkt)
                                )
                            )
                            .map((behandling: BehandlingTabellobjekt) => (
                                <Behandling
                                    behandling={behandling.faktiskObjekt}
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
