import { useState } from 'react';

import { ChevronDownIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';

import Styles from './Fagsakmeny.module.css';
import { LeggTilBrevmottakerModalFagsak } from './LeggTilEllerFjernBrevmottakere/LeggTilBrevmottakerModalFagsak';
import { LeggTilEllerFjernBrevmottakerePåFagsak } from './LeggTilEllerFjernBrevmottakere/LeggTilEllerFjernBrevmottakerePåFagsak';
import { LåsOppFagsak } from './LåsOppFagsak/LåsOppFagsak';
import { LåsOppFagsakModal } from './LåsOppFagsak/LåsOppFagsakModal';
import { OpprettBehandling } from './OpprettBehandling/OpprettBehandling';
import { OpprettBehandlingModal } from './OpprettBehandling/OpprettBehandlingModal';
import { TilbakekrevingsbehandlingOpprettetModal } from './OpprettBehandling/TilbakekrevingsbehandlingOpprettetModal';
import { OpprettFagsak } from './OpprettFagsak/OpprettFagsak';
import { SendInformasjonsbrev } from './SendInformasjonsbrev/SendInformasjonsbrev';
import { useFagsakContext } from '../../../sider/Fagsak/FagsakContext';
import { FagsakStatus } from '../../../typer/fagsak';

export function Fagsakmeny() {
    const { fagsak } = useFagsakContext();
    const fagsakErLåst = fagsak.status === FagsakStatus.LÅST;

    const [visOpprettBehandlingModal, settVisOpprettBehandlingModal] = useState(false);
    const [visTilbakekrevingsbehandlingOpprettetModal, settVisTilbakekrevingsbehandlingOpprettetModal] =
        useState(false);
    const [visLeggTilBrevmottakerModal, settVisLeggTilBrevmottakerModal] = useState(false);

    return (
        <>
            {visOpprettBehandlingModal && (
                <OpprettBehandlingModal
                    lukkModal={() => settVisOpprettBehandlingModal(false)}
                    onTilbakekrevingsbehandlingOpprettet={() => settVisTilbakekrevingsbehandlingOpprettetModal(true)}
                />
            )}
            {visTilbakekrevingsbehandlingOpprettetModal && (
                <TilbakekrevingsbehandlingOpprettetModal
                    lukkModal={() => settVisTilbakekrevingsbehandlingOpprettetModal(false)}
                />
            )}
            {visLeggTilBrevmottakerModal && (
                <LeggTilBrevmottakerModalFagsak lukkModal={() => settVisLeggTilBrevmottakerModal(false)} />
            )}
            <LåsOppFagsakModal />
            <ActionMenu>
                <ActionMenu.Trigger>
                    <Button variant={'secondary'} size={'small'} iconPosition={'right'} icon={<ChevronDownIcon />}>
                        Meny
                    </Button>
                </ActionMenu.Trigger>
                <ActionMenu.Content>
                    <ActionMenu.Group className={Styles.group} aria-label={'Fagsak'}>
                        {!fagsakErLåst && (
                            <>
                                <OpprettBehandling åpneModal={() => settVisOpprettBehandlingModal(true)} />
                                <OpprettFagsak />
                                <LeggTilEllerFjernBrevmottakerePåFagsak
                                    åpneModal={() => settVisLeggTilBrevmottakerModal(true)}
                                />
                                <SendInformasjonsbrev />
                            </>
                        )}
                        {fagsakErLåst && <LåsOppFagsak />}
                    </ActionMenu.Group>
                </ActionMenu.Content>
            </ActionMenu>
        </>
    );
}
