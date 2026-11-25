import { useFagsak } from '@hooks/useFagsak';
import { BrevmottakerDialogFagsak } from '@komponenter/Brevmottaker/Fagsak/BrevmottakerDialogFagsak';
import { useBrevmottakerDialogContext } from '@komponenter/Brevmottaker/Felles/BrevmottakerDialogContext';
import { LeggTilEllerFjernBrevmottakerPåFagsak } from '@komponenter/Saklinje/Meny/Brevmottaker/LeggTilEllerFjernBrevmottakerPåFagsak';
import { ChevronDownIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { FagsakStatus } from '@typer/fagsak';
import { useState } from 'react';
import Styles from './Fagsakmeny.module.css';
import { LåsOppFagsak } from './LåsOppFagsak/LåsOppFagsak';
import { LåsOppFagsakModal } from './LåsOppFagsak/LåsOppFagsakModal';
import { OpprettBehandling } from './OpprettBehandling/OpprettBehandling';
import { OpprettBehandlingModal } from './OpprettBehandling/OpprettBehandlingModal';
import { TilbakekrevingsbehandlingOpprettetModal } from './OpprettBehandling/TilbakekrevingsbehandlingOpprettetModal';
import { OpprettFagsak } from './OpprettFagsak/OpprettFagsak';
import { SendInformasjonsbrev } from './SendInformasjonsbrev/SendInformasjonsbrev';

export function Fagsakmeny() {
    const fagsak = useFagsak();
    const fagsakErLåst = fagsak.status === FagsakStatus.LÅST;

    const [visOpprettBehandlingModal, settVisOpprettBehandlingModal] = useState(false);
    const [visTilbakekrevingsbehandlingOpprettetModal, settVisTilbakekrevingsbehandlingOpprettetModal] =
        useState(false);

    const { erDialogÅpen: erBrevmottakerDialogÅpen } = useBrevmottakerDialogContext();

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
            {erBrevmottakerDialogÅpen && <BrevmottakerDialogFagsak />}
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
                                <LeggTilEllerFjernBrevmottakerPåFagsak />
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
