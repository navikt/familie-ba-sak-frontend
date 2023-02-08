import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Alert, Button, Heading, Modal } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';

import type { IBehandling } from '../../../../../typer/behandling';
import BrevmottakerSkjema from './BrevmottakerSkjema';
import BrevmottakerTabell from './BrevmottakerTabell';

const StyledModal = styled(Modal)`
    width: 35rem;
`;

const StyledAlert = styled(Alert)`
    margin: 1rem 0 2.5rem;
`;

const LukkKnapp = styled(Button)`
    margin-top: 2.5rem;
`;

interface IProps {
    åpenBehandling: IBehandling;
}

const LeggTilEllerFjernBrevmottakere: React.FC<IProps> = ({ åpenBehandling }) => {
    const [visModal, settVisModal] = useState(false);
    const [visSkjema, settVisSkjema] = useState(true);

    const lukkModal = () => {
        settVisModal(false);
        settVisSkjema(åpenBehandling.brevmottakere.length === 0);
    };

    useEffect(() => {
        settVisSkjema(åpenBehandling.brevmottakere.length === 0);
    }, [åpenBehandling]);

    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                Legg til / fjern brevmottakere
            </Dropdown.Menu.List.Item>
            <StyledModal
                open={visModal}
                aria-label="Legg til eller fjern brevmottakere"
                onClose={lukkModal}
                shouldCloseOnOverlayClick={false}
            >
                <Modal.Content>
                    <Heading spacing level="2" size="medium" id="modal-heading">
                        Legg til eller fjern brevmottakere
                    </Heading>
                    <StyledAlert variant="info">
                        Brev sendes til brukers folkeregistrerte adresse eller annen foretrukken
                        kanal. Legg til mottaker dersom brev skal sendes til utenlandsk adresse,
                        fullmektig, verge eller dødsbo.
                    </StyledAlert>
                    {visSkjema ? (
                        <BrevmottakerSkjema lukkModal={lukkModal} />
                    ) : (
                        <>
                            {åpenBehandling.brevmottakere.map(mottaker => (
                                <BrevmottakerTabell
                                    mottaker={mottaker}
                                    visLeggTilKnapp={åpenBehandling.brevmottakere.length === 1}
                                    leggTilOnClick={() => settVisSkjema(true)}
                                />
                            ))}
                            <LukkKnapp onClick={lukkModal}>Lukk vindu</LukkKnapp>
                        </>
                    )}
                </Modal.Content>
            </StyledModal>
        </>
    );
};

export default LeggTilEllerFjernBrevmottakere;
