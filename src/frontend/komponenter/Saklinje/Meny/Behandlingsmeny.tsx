import { useState } from 'react';

import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { BehandlingÅrsak, sjekkErBehandleneEnhetMidlertidig } from '@typer/behandling';
import { FeatureToggle } from '@typer/featureToggles';

import { ChevronDownIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';

import { AInntekt } from './AInntekt/AInntekt';
import Styles from './Behandlingsmeny.module.css';
import { EndreBehandlendeEnhet } from './EndreBehandlendeEnhet/EndreBehandlendeEnhet';
import { EndreBehandlendeEnhetModal } from './EndreBehandlendeEnhet/EndreBehandlendeEnhetModal';
import { EndreBehandlingstema } from './EndreBehandling/EndreBehandlingstema';
import { EndreBehandlingstemaModal } from './EndreBehandling/EndreBehandlingstemaModal';
import { EndreSøknadstidspunkt } from './EndreSøknadstidspunkt/EndreSøknadstidspunkt';
import { EndreSøknadstidspunktModal } from './EndreSøknadstidspunkt/EndreSøknadstidspunktModal';
import { HenleggBehandling } from './HenleggBehandling/HenleggBehandling';
import { SettBehandlingPåVentModal } from './LeggBehandlingPåVent/SettBehandlingPåVentModal';
import { SettEllerOppdaterVenting } from './LeggBehandlingPåVent/SettEllerOppdaterVenting';
import { TaBehandlingAvVent } from './LeggBehandlingPåVent/TaBehandlingAvVent';
import { TaBehandlingAvVentModal } from './LeggBehandlingPåVent/TaBehandlingAvVentModal';
import { LeggTilBarnPBehandling } from './LeggTilBarnPåBehandling/LeggTilBarnPåBehandling';
import { LeggTilBarnPåBehandlingModal } from './LeggTilBarnPåBehandling/LeggTilBarnPåBehandlingModal';
import { LeggTilBrevmottakerModalBehandling } from './LeggTilEllerFjernBrevmottakere/LeggTilBrevmottakerModalBehandling';
import { LeggTilEllerFjernBrevmottakerePåBehandling } from './LeggTilEllerFjernBrevmottakere/LeggTilEllerFjernBrevmottakerePåBehandling';
import { OpprettBehandling } from './OpprettBehandling/OpprettBehandling';
import { OpprettBehandlingModal } from './OpprettBehandling/OpprettBehandlingModal';
import { TilbakekrevingsbehandlingOpprettetModal } from './OpprettBehandling/TilbakekrevingsbehandlingOpprettetModal';
import { OpprettFagsak } from './OpprettFagsak/OpprettFagsak';
import { SendInformasjonsbrev } from './SendInformasjonsbrev/SendInformasjonsbrev';

export function Behandlingsmeny() {
    const { behandling } = useBehandlingContext();
    const toggles = useFeatureToggles();

    const erBehandleneEnhetMidlertidig = sjekkErBehandleneEnhetMidlertidig(behandling);
    const erBehandlingPåVent = !!behandling.aktivSettPåVent;

    const kanEndreSøknadstidspunkt =
        toggles[FeatureToggle.kanRegistrereSøknadstidspunkt] && behandling.årsak === BehandlingÅrsak.SØKNAD;

    const [visOpprettBehandlingModal, settVisOpprettBehandlingModal] = useState(false);
    const [visTilbakekrevingsbehandlingOpprettetModal, settVisTilbakekrevingsbehandlingOpprettetModal] =
        useState(false);
    const [visEndreBehandlendeEnhetModal, settVisEndreBehandlendeEnhetModal] = useState(erBehandleneEnhetMidlertidig);
    const [visEndreBehandlingstemaModal, settVisEndreBehandlingstemaModal] = useState(false);
    const [visLeggTilBarnPåBehandlingaModal, settVisLeggTilBarnPåBehandlingaModal] = useState(false);
    const [visBehandlingPåVentModal, settVisBehandlingPåVentModal] = useState(erBehandlingPåVent);
    const [visTaBehandlingAvVentModal, settVisTaBehandlingAvVentModal] = useState(false);
    const [visLeggTilBrevmottakerPåBehandlingModal, settVisLeggTilBrevmottakerPåBehandlingModal] = useState(false);
    const [visEndreSøknadstidspunktModal, settVisEndreSøknadstidspunktModal] = useState(false);

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
            {visEndreBehandlendeEnhetModal && (
                <EndreBehandlendeEnhetModal lukkModal={() => settVisEndreBehandlendeEnhetModal(false)} />
            )}
            {visEndreBehandlingstemaModal && (
                <EndreBehandlingstemaModal lukkModal={() => settVisEndreBehandlingstemaModal(false)} />
            )}
            {visLeggTilBarnPåBehandlingaModal && (
                <LeggTilBarnPåBehandlingModal lukkModal={() => settVisLeggTilBarnPåBehandlingaModal(false)} />
            )}
            {visBehandlingPåVentModal && (
                <SettBehandlingPåVentModal lukkModal={() => settVisBehandlingPåVentModal(false)} />
            )}
            {visTaBehandlingAvVentModal && (
                <TaBehandlingAvVentModal lukkModal={() => settVisTaBehandlingAvVentModal(false)} />
            )}
            {visLeggTilBrevmottakerPåBehandlingModal && (
                <LeggTilBrevmottakerModalBehandling
                    lukkModal={() => settVisLeggTilBrevmottakerPåBehandlingModal(false)}
                />
            )}
            {kanEndreSøknadstidspunkt && visEndreSøknadstidspunktModal && (
                <EndreSøknadstidspunktModal lukkModal={() => settVisEndreSøknadstidspunktModal(false)} />
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
                        <SendInformasjonsbrev />
                    </ActionMenu.Group>
                    <ActionMenu.Divider />
                    <ActionMenu.Group className={Styles.group} aria-label={'Behandling'}>
                        <EndreBehandlingstema åpneModal={() => settVisEndreBehandlingstemaModal(true)} />
                        <SettEllerOppdaterVenting åpneModal={() => settVisBehandlingPåVentModal(true)} />
                        <TaBehandlingAvVent åpneModal={() => settVisTaBehandlingAvVentModal(true)} />
                        <HenleggBehandling />
                        {kanEndreSøknadstidspunkt && (
                            <EndreSøknadstidspunkt åpneModal={() => settVisEndreSøknadstidspunktModal(true)} />
                        )}
                        <EndreBehandlendeEnhet åpneModal={() => settVisEndreBehandlendeEnhetModal(true)} />
                        <LeggTilEllerFjernBrevmottakerePåBehandling
                            åpneModal={() => settVisLeggTilBrevmottakerPåBehandlingModal(true)}
                        />
                        <AInntekt />
                        <LeggTilBarnPBehandling åpneModal={() => settVisLeggTilBarnPåBehandlingaModal(true)} />
                    </ActionMenu.Group>
                </ActionMenu.Content>
            </ActionMenu>
        </>
    );
}
