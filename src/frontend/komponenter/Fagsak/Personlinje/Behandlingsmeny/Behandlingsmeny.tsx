import React, { useState } from 'react';

import { useHistory } from 'react-router';

import { Menyknapp } from 'nav-frontend-ikonknapper';
import KnappBase from 'nav-frontend-knapper';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';

import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import { Behandlingstype, BehandlingÅrsak } from '../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../typer/fagsak';
import type { IPersonInfo } from '../../../../typer/person';
import EndreBehandlendeEnhet from './EndreBehandlendeEnhet/EndreBehandlendeEnhet';
import EndreBehandlingstema from './EndreBehandling/EndreBehandlingstema';
import HenleggBehandling from './HenleggBehandling/HenleggBehandling';
import SettEllerOppdaterVenting from './LeggBehandlingPåVent/SettEllerOppdaterVenting';
import TaBehandlingAvVent from './LeggBehandlingPåVent/TaBehandlingAvVent';
import LeggTilBarnPBehandling from './LeggTilBarnPåBehandling/LeggTilBarnPåBehandling';
import OpprettBehandling from './OpprettBehandling/OpprettBehandling';
import OpprettFagsak from './OpprettFagsak/OpprettFagsak';

interface IProps {
    bruker?: IPersonInfo;
    minimalFagsak: IMinimalFagsak;
}

const Behandlingsmeny: React.FC<IProps> = ({ bruker, minimalFagsak }) => {
    const { åpenBehandling, erLesevisning } = useBehandling();
    const history = useHistory();
    const [anker, settAnker] = useState<HTMLElement | undefined>(undefined);

    console.log(bruker);
    return (
        <>
            <div style={{ marginLeft: '3rem' }} />
            <Menyknapp
                id={'behandlingsmeny-arialabel-knapp'}
                mini={true}
                onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                    settAnker(anker === undefined ? event.currentTarget : undefined)
                }
            >
                Meny
            </Menyknapp>

            <Popover
                id={'behandlingsmeny-arialabel-popover'}
                ankerEl={anker}
                orientering={PopoverOrientering.Under}
                autoFokus={false}
                onRequestClose={() => {
                    settAnker(undefined);
                }}
                tabIndex={-1}
                utenPil
            >
                <ul
                    className="behandlingsmeny__list"
                    role="menu"
                    style={{ minWidth: 190 }}
                    aria-labelledby={'behandlingsmeny-arialabel-knapp'}
                >
                    {åpenBehandling.status === RessursStatus.SUKSESS && (
                        <li>
                            <EndreBehandlendeEnhet
                                onListElementClick={() => settAnker(undefined)}
                            />
                        </li>
                    )}
                    {åpenBehandling.status === RessursStatus.SUKSESS &&
                        åpenBehandling.data.årsak !== BehandlingÅrsak.SØKNAD && (
                            <li>
                                <EndreBehandlingstema
                                    onListElementClick={() => settAnker(undefined)}
                                />
                            </li>
                        )}
                    <li>
                        <OpprettBehandling
                            onListElementClick={() => settAnker(undefined)}
                            minimalFagsak={minimalFagsak}
                        />
                    </li>
                    {(!bruker?.fagsakId || bruker.fagsakId.size < 2) && (
                        <li>
                            <OpprettFagsak
                                onListElementClick={() => settAnker(undefined)}
                                minimalFagsak={minimalFagsak}
                            />
                        </li>
                    )}
                    {åpenBehandling.status === RessursStatus.SUKSESS && (
                        <li>
                            <HenleggBehandling
                                onListElementClick={() => settAnker(undefined)}
                                fagsakId={minimalFagsak.id}
                                behandling={åpenBehandling.data}
                            />
                        </li>
                    )}
                    {åpenBehandling.status === RessursStatus.SUKSESS &&
                        !erLesevisning() &&
                        (åpenBehandling.data.årsak === BehandlingÅrsak.NYE_OPPLYSNINGER ||
                            åpenBehandling.data.årsak === BehandlingÅrsak.KLAGE ||
                            åpenBehandling.data.årsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV ||
                            åpenBehandling.data.årsak === BehandlingÅrsak.TEKNISK_ENDRING ||
                            åpenBehandling.data.type ===
                                Behandlingstype.MIGRERING_FRA_INFOTRYGD) && (
                            <li>
                                <LeggTilBarnPBehandling
                                    onListElementClick={() => settAnker(undefined)}
                                    behandling={åpenBehandling.data}
                                />
                            </li>
                        )}
                    {åpenBehandling.status === RessursStatus.SUKSESS &&
                        åpenBehandling.data.aktivSettPåVent && (
                            <li>
                                <TaBehandlingAvVent
                                    onListElementClick={() => settAnker(undefined)}
                                    behandling={åpenBehandling.data}
                                />
                            </li>
                        )}
                    {åpenBehandling.status === RessursStatus.SUKSESS && (
                        <li>
                            <SettEllerOppdaterVenting
                                onListElementClick={() => settAnker(undefined)}
                                behandling={åpenBehandling.data}
                            />
                        </li>
                    )}

                    <li>
                        <KnappBase
                            mini={true}
                            onClick={() => {
                                history.push(`/fagsak/${minimalFagsak.id}/dokumentutsending`);
                                settAnker(undefined);
                            }}
                        >
                            Send informasjonsbrev
                        </KnappBase>
                    </li>
                </ul>
            </Popover>
        </>
    );
};

export default Behandlingsmeny;
