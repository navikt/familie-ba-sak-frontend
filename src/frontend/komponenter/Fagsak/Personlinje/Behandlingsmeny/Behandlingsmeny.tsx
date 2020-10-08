import { RessursStatus } from '@navikt/familie-typer';
import { Menyknapp } from 'nav-frontend-ikonknapper';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import React, { useState } from 'react';
import { useBehandling } from '../../../../context/BehandlingContext';
import { IFagsak } from '../../../../typer/fagsak';
import EndreBehandlendeEnhet from './EndreBehandlendeEnhet/EndreBehandlendeEnhet';
import OpprettBehandling from './OpprettBehandling';
import { OpprettBehandlingProvider } from '../../../../context/OpprettBehandlingContext';
import { IPerson } from '../../../../typer/person';

interface IProps {
    fagsak: IFagsak;
    bruker: IPerson;
}

const Behandlingsmeny: React.FC<IProps> = ({ fagsak, bruker }) => {
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
                    <li>
                        <OpprettBehandlingProvider bruker={bruker} fagsak={fagsak}>
                            <OpprettBehandling
                                onListElementClick={() => settAnker(undefined)}
                                fagsak={fagsak}
                            />
                        </OpprettBehandlingProvider>
                    </li>
                </ul>
            </Popover>
        </>
    );
};

export default Behandlingsmeny;
