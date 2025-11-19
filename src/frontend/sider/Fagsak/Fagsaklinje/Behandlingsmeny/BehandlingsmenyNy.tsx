import React, { useState } from 'react';

import { ChevronDownIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';

import { AInntektNy } from './AInntekt/AInntektNy';
import Styles from './BehandlingsmenyNy.module.css';
import { EndreBehandlendeEnhetModal } from './EndreBehandlendeEnhet/EndreBehandlendeEnhetModal';
import { EndreBehandlendeEnhetNy } from './EndreBehandlendeEnhet/EndreBehandlendeEnhetNy';
import { EndreBehandlingstemaModal } from './EndreBehandling/EndreBehandlingstemaModal';
import { EndreBehandlingstemaNy } from './EndreBehandling/EndreBehandlingstemaNy';
import { HenleggBehandlingNy } from './HenleggBehandling/HenleggBehandlingNy';
import { SettBehandlingPåVentModal } from './LeggBehandlingPåVent/SettBehandlingPåVentModal';
import { SettEllerOppdaterVentingNy } from './LeggBehandlingPåVent/SettEllerOppdaterVentingNy';
import { TaBehandlingAvVentModal } from './LeggBehandlingPåVent/TaBehandlingAvVentModal';
import { TaBehandlingAvVentNy } from './LeggBehandlingPåVent/TaBehandlingAvVentNy';
import { LeggTilBarnPåBehandlingModal } from './LeggTilBarnPåBehandling/LeggTilBarnPåBehandlingModal';
import { LeggTilBarnPåBehandlingNy } from './LeggTilBarnPåBehandling/LeggTilBarnPåBehandlingNy';
import { LeggTilBrevmottakerModalBehandling } from './LeggTilEllerFjernBrevmottakere/LeggTilBrevmottakerModalBehandling';
import { LeggTilEllerFjernBrevmottakerePåBehandlingNy } from './LeggTilEllerFjernBrevmottakere/LeggTilEllerFjernBrevmottakerePåBehandlingNy';
import { OpprettBehandlingModal } from './OpprettBehandling/OpprettBehandlingModal';
import { OpprettBehandlingNy } from './OpprettBehandling/OpprettBehandlingNy';
import { OpprettFagsakNy } from './OpprettFagsak/OpprettFagsakNy';
import { SendInformasjonsbrev } from './SendInformasjonsbrev/SendInformasjonsbrev';
import { sjekkErBehandleneEnhetMidlertidig } from '../../../../typer/behandling';
import { useBehandlingContext } from '../../Behandling/context/BehandlingContext';

export function BehandlingsmenyNy() {
    const { behandling } = useBehandlingContext();

    const erBehandleneEnhetMidlertidig = sjekkErBehandleneEnhetMidlertidig(behandling);
    const erBehandlingPåVent = !!behandling.aktivSettPåVent;

    const [visOpprettBehandlingModal, settVisOpprettBehandlingModal] = useState(false);
    const [visEndreBehandlendeEnhetModal, settVisEndreBehandlendeEnhetModal] = useState(erBehandleneEnhetMidlertidig);
    const [visEndreBehandlingstemaModal, settVisEndreBehandlingstemaModal] = useState(false);
    const [visLeggTilBarnPåBehandlingaModal, settVisLeggTilBarnPåBehandlingaModal] = useState(false);
    const [visBehandlingPåVentModal, settVisBehandlingPåVentModal] = useState(erBehandlingPåVent);
    const [visTaBehandlingAvVentModal, settVisTaBehandlingAvVentModal] = useState(false);
    const [visLeggTilBrevmottakerPåBehandlingModal, settVisLeggTilBrevmottakerPåBehandlingModal] = useState(false);

    return (
        <>
            {visOpprettBehandlingModal && (
                <OpprettBehandlingModal lukkModal={() => settVisOpprettBehandlingModal(false)} />
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
                        <SendInformasjonsbrev />
                    </ActionMenu.Group>
                    <ActionMenu.Divider />
                    <ActionMenu.Group className={Styles.group} aria-label={'Behandling'}>
                        <HenleggBehandlingNy />
                        <EndreBehandlendeEnhetNy åpneModal={() => settVisEndreBehandlendeEnhetModal(true)} />
                        <EndreBehandlingstemaNy åpneModal={() => settVisEndreBehandlingstemaModal(true)} />
                        <LeggTilBarnPåBehandlingNy åpneModal={() => settVisLeggTilBarnPåBehandlingaModal(true)} />
                        <SettEllerOppdaterVentingNy åpneModal={() => settVisBehandlingPåVentModal(true)} />
                        <TaBehandlingAvVentNy åpneModal={() => settVisTaBehandlingAvVentModal(true)} />
                        <LeggTilEllerFjernBrevmottakerePåBehandlingNy
                            åpneModal={() => settVisLeggTilBrevmottakerPåBehandlingModal(true)}
                        />
                        <AInntektNy />
                    </ActionMenu.Group>
                </ActionMenu.Content>
            </ActionMenu>
        </>
    );
}
