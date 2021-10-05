import React, { useState } from 'react';

import { useHistory } from 'react-router';

import { Menyknapp } from 'nav-frontend-ikonknapper';
import KnappBase from 'nav-frontend-knapper';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';

import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import { BehandlingÅrsak } from '../../../../typer/behandling';
import { IFagsak } from '../../../../typer/fagsak';
import { ToggleNavn } from '../../../../typer/toggles';
import EndreBehandlendeEnhet from './EndreBehandlendeEnhet/EndreBehandlendeEnhet';
import EndreBehandling from './EndreBehandling/EndreBehandling';
import HenleggBehandling from './HenleggBehandling/HenleggBehandling';
import LeggTilBarnPBehandling from './LeggTilBarnPåBehandling/LeggTilBarnPåBehandling';
import OpprettBehandling from './OpprettBehandling/OpprettBehandling';

interface IProps {
    fagsak: IFagsak;
}

const Behandlingsmeny: React.FC<IProps> = ({ fagsak }) => {
    const { toggles } = useApp();
    const { åpenBehandling, erLesevisning } = useBehandling();
    const history = useHistory();
    const [anker, settAnker] = useState<HTMLElement | undefined>(undefined);

    return (
        <>
            <div style={{ marginLeft: '3rem' }}></div>
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
                        toggles[ToggleNavn.kanBehandleUtvidet] &&
                        åpenBehandling.data.årsak !== BehandlingÅrsak.SØKNAD && (
                            <li>
                                <EndreBehandling onListElementClick={() => settAnker(undefined)} />
                            </li>
                        )}
                    <li>
                        <OpprettBehandling
                            onListElementClick={() => settAnker(undefined)}
                            fagsak={fagsak}
                        />
                    </li>
                    {åpenBehandling.status === RessursStatus.SUKSESS && (
                        <li>
                            <HenleggBehandling
                                onListElementClick={() => settAnker(undefined)}
                                fagsak={fagsak}
                                behandling={åpenBehandling.data}
                            />
                        </li>
                    )}
                    {åpenBehandling.status === RessursStatus.SUKSESS &&
                        !erLesevisning() &&
                        (åpenBehandling.data.årsak === BehandlingÅrsak.NYE_OPPLYSNINGER ||
                            åpenBehandling.data.årsak === BehandlingÅrsak.KLAGE ||
                            åpenBehandling.data.årsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV) &&
                        toggles[ToggleNavn.brukLeggTilBarnPåBehandling] && (
                            <li>
                                <LeggTilBarnPBehandling
                                    onListElementClick={() => settAnker(undefined)}
                                    behandling={åpenBehandling.data}
                                />
                            </li>
                        )}

                    {toggles[ToggleNavn.brukErDeltBosted] && (
                        <li>
                            <KnappBase
                                mini={true}
                                onClick={() => {
                                    history.push(`/fagsak/${fagsak.id}/dokumentutsending`);
                                    settAnker(undefined);
                                }}
                            >
                                Send informasjonsbrev
                            </KnappBase>
                        </li>
                    )}
                </ul>
            </Popover>
        </>
    );
};

export default Behandlingsmeny;
