import React, { useState } from 'react';

import { ChevronDownIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';

import Styles from './Fagsakmeny.module.css';
import { LeggTilBrevmottakerModalFagsak } from './LeggTilEllerFjernBrevmottakere/LeggTilBrevmottakerModalFagsak';
import { LeggTilEllerFjernBrevmottakerePåFagsakNy } from './LeggTilEllerFjernBrevmottakere/LeggTilEllerFjernBrevmottakerePåFagsakNy';
import { OpprettBehandlingModal } from './OpprettBehandling/OpprettBehandlingModal';
import { OpprettBehandlingNy } from './OpprettBehandling/OpprettBehandlingNy';
import { OpprettFagsakNy } from './OpprettFagsak/OpprettFagsakNy';
import { SendInformasjonsbrev } from './SendInformasjonsbrev/SendInformasjonsbrev';

export function Fagsakmeny() {
    const [visOpprettBehandlingModal, settVisOpprettBehandlingModal] = useState(false);
    const [visLeggTilBrevmottakerModal, settVisLeggTilBrevmottakerModal] = useState(false);

    return (
        <>
            {visOpprettBehandlingModal && (
                <OpprettBehandlingModal lukkModal={() => settVisOpprettBehandlingModal(false)} />
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
                        <OpprettBehandlingNy åpneModal={() => settVisOpprettBehandlingModal(true)} />
                        <OpprettFagsakNy />
                        <LeggTilEllerFjernBrevmottakerePåFagsakNy
                            åpneModal={() => settVisLeggTilBrevmottakerModal(true)}
                        />
                        <SendInformasjonsbrev />
                    </ActionMenu.Group>
                </ActionMenu.Content>
            </ActionMenu>
        </>
    );
}
