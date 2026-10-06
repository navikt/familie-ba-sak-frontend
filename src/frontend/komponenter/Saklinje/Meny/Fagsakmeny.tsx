import { useFagsak } from '@hooks/useFagsak';
import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { BrevmottakerDialogFagsak } from '@komponenter/Brevmottaker/Fagsak/BrevmottakerDialogFagsak';
import { useBrevmottakerDialogContext } from '@komponenter/Brevmottaker/Felles/BrevmottakerDialogContext';
import { LeggTilEllerFjernBrevmottakerPåFagsak } from '@komponenter/Saklinje/Meny/Brevmottaker/LeggTilEllerFjernBrevmottakerPåFagsak';
import { ChevronDownIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { FagsakStatus } from '@typer/fagsak';
import { FeatureToggle } from '@typer/featureToggles';
import { useState } from 'react';
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

export function Fagsakmeny() {
    const fagsak = useFagsak();
    const toggles = useFeatureToggles();
    const fagsakErLåst = fagsak.status === FagsakStatus.LÅST;

    const [visOpprettBehandlingModal, settVisOpprettBehandlingModal] = useState(false);
    const [visTilbakekrevingsbehandlingOpprettetModal, settVisTilbakekrevingsbehandlingOpprettetModal] =
        useState(false);

    const {
        erDialogÅpen: erBrevmottakerDialogÅpen,
        åpneDialog: åpneBrevmottakerDialog,
        lukkDialog: lukkBrevmottakerDialog,
    } = useBrevmottakerDialogContext();

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
            {erBrevmottakerDialogÅpen &&
                (toggles[FeatureToggle.brukNyttBrevmottakerSkjema] ? (
                    <BrevmottakerDialogFagsak />
                ) : (
                    <LeggTilBrevmottakerModalFagsak lukkModal={lukkBrevmottakerDialog} />
                ))}
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
                                {toggles[FeatureToggle.brukNyttBrevmottakerSkjema] ? (
                                    <LeggTilEllerFjernBrevmottakerPåFagsak />
                                ) : (
                                    <LeggTilEllerFjernBrevmottakerePåFagsak åpneModal={åpneBrevmottakerDialog} />
                                )}
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
