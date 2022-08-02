import React from 'react';

import classNames from 'classnames';

import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import { FamilieCheckbox } from '@navikt/familie-form-elements';

import type { IMinimalFagsak } from '../../../typer/fagsak';
import type { ITilbakekrevingsbehandling } from '../../../typer/tilbakekrevingsbehandling';
import { kalenderDiff } from '../../../utils/kalender';
import { Behandling } from './Behandling';
import type { VisningBehandling } from './visningBehandling';

interface IBehandlingshistorikkProps {
    minimalFagsak: IMinimalFagsak;
}

const Behandlinger: React.FC<IBehandlingshistorikkProps> = ({ minimalFagsak }) => {
    const behandlinger: (VisningBehandling | ITilbakekrevingsbehandling)[] = [
        ...minimalFagsak.behandlinger,
        ...minimalFagsak.tilbakekrevingsbehandlinger,
    ];

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
                            checked={minimalFagsak.visHenlagteBehandlinger}
                            onChange={() => {
                                minimalFagsak.visHenlagteBehandlinger =
                                    !minimalFagsak.visHenlagteBehandlinger || false;
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
                            .sort((a, b) =>
                                kalenderDiff(
                                    new Date(b.opprettetTidspunkt),
                                    new Date(a.opprettetTidspunkt)
                                )
                            )
                            .map((behandling: VisningBehandling | ITilbakekrevingsbehandling) => (
                                <Behandling behandling={behandling} minimalFagsak={minimalFagsak} />
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
