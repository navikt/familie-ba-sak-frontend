import { RessursStatus } from '@navikt/familie-typer';
import { Menyknapp } from 'nav-frontend-ikonknapper';
import KnappBase, { Knapp } from 'nav-frontend-knapper';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useBehandling } from '../../../../context/BehandlingContext';
import { BehandlingStatus } from '../../../../typer/behandling';
import { IFagsak } from '../../../../typer/fagsak';
import { hentAktivBehandlingPåFagsak } from '../../../../utils/fagsak';
import EndreBehandlendeEnhet from './EndreBehandlendeEnhet/EndreBehandlendeEnhet';

interface IProps {
    fagsak: IFagsak;
}

const Behandlingsmeny: React.FC<IProps> = ({ fagsak }) => {
    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);
    const skalViseOpprettBehandlingKnapp =
        aktivBehandling === undefined ||
        (aktivBehandling && aktivBehandling.status === BehandlingStatus.AVSLUTTET);

    const history = useHistory();
    const { åpenBehandling } = useBehandling();

    const [anker, settAnker] = useState<HTMLElement | undefined>(undefined);

    return (
        <>
            <Menyknapp
                id={'behandlingsmeny-arialabel-knapp'}
                mini={true}
                onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                    settAnker(anker === undefined ? event.currentTarget : undefined)
                }
            >
                Behandlingsmeny
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
                    {skalViseOpprettBehandlingKnapp && (
                        <li>
                            <KnappBase
                                mini={true}
                                onClick={() => {
                                    settAnker(undefined);
                                    history.push(`/fagsak/${fagsak.id}/ny-behandling`);
                                }}
                            >
                                Opprett behandling
                            </KnappBase>
                        </li>
                    )}
                </ul>
            </Popover>
        </>
    );
};

export default Behandlingsmeny;
