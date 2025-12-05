import React, { useState } from 'react';

import { ChevronDownIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';

import Styles from './Fagsakmeny.module.css';
import { LeggTilBrevmottakerModalFagsak } from './LeggTilEllerFjernBrevmottakere/LeggTilBrevmottakerModalFagsak';
import { LeggTilEllerFjernBrevmottakerePåFagsak } from './LeggTilEllerFjernBrevmottakere/LeggTilEllerFjernBrevmottakerePåFagsak';
import { OpprettBehandling } from './OpprettBehandling/OpprettBehandling';
import { OpprettBehandlingModal } from './OpprettBehandling/OpprettBehandlingModal';
import { TilbakekrevingsbehandlingOpprettetModal } from './OpprettBehandling/TilbakekrevingsbehandlingOpprettetModal';
import { OpprettFagsak } from './OpprettFagsak/OpprettFagsak';
import { SendInformasjonsbrev } from './SendInformasjonsbrev/SendInformasjonsbrev';

export function Fagsakmeny() {
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
            <ActionMenu>
                <ActionMenu.Trigger>
                    <Button variant={'secondary'} size={'small'} iconPosition={'right'} icon={<ChevronDownIcon />}>
                        Meny
                    </Button>
                </ActionMenu.Trigger>
                <ActionMenu.Content>
                    <ActionMenu.Group className={Styles.group} aria-label={'Fagsak'}>
                        <OpprettBehandling åpneModal={() => settVisOpprettBehandlingModal(true)} />
                        <OpprettFagsak />
                        <LeggTilEllerFjernBrevmottakerePåFagsak
                            åpneModal={() => settVisLeggTilBrevmottakerModal(true)}
                        />
                        <SendInformasjonsbrev />
                    </ActionMenu.Group>
                </ActionMenu.Content>
            </ActionMenu>
        </>
    );
}
