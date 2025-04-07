import React, { useState } from 'react';

import styled from 'styled-components';

import { Alert, BodyLong, Button, HStack, Modal } from '@navikt/ds-react';

const StyledAlert = styled(Alert)`
    margin-top: 2rem;
    width: fit-content;
`;

interface IProps {
    slettForenkletTilbakekrevingsvedtak: () => Promise<void>;
    oppdaterForenkletTilbakekrevingSamtykke: (samtykke: boolean) => Promise<void>;
}

export const BekreftSamtykkeOmMotregning = ({
    slettForenkletTilbakekrevingsvedtak,
    oppdaterForenkletTilbakekrevingSamtykke,
}: IProps) => {
    const [visBekreftSlettingModal, settVisBekreftSlettingModal] = useState<boolean>(false);
    const åpneModal = () => settVisBekreftSlettingModal(true);
    const lukkModal = () => settVisBekreftSlettingModal(false);

    const [oppdaterer, settOppdaterer] = useState(false);
    const [sletter, settSletter] = useState(false);

    return (
        <>
            <StyledAlert variant={'info'}>
                <BodyLong spacing>
                    Bruker har samtykket til at vi venter med etterbetalingen til vi har vurdert
                    feilutbetalingen
                </BodyLong>
                <HStack gap="4" justify="center">
                    <Button onClick={åpneModal} disabled={oppdaterer}>
                        Nei
                    </Button>
                    <Button
                        onClick={() => {
                            settOppdaterer(true);
                            oppdaterForenkletTilbakekrevingSamtykke(true).finally(() => {
                                settOppdaterer(false);
                            });
                        }}
                        loading={oppdaterer}
                        disabled={oppdaterer}
                    >
                        Ja
                    </Button>
                </HStack>
            </StyledAlert>
            <Modal
                open={visBekreftSlettingModal}
                onClose={lukkModal}
                header={{
                    heading: 'Er du sikker på at du vil slette forenklet tilbakekrevingsvedtak?',
                    size: 'small',
                    closeButton: false,
                }}
                width={'35rem'}
            >
                <Modal.Footer>
                    <Button
                        key={'bekreft'}
                        onClick={() => {
                            settSletter(true);
                            slettForenkletTilbakekrevingsvedtak().finally(() => {
                                settSletter(false);
                                settVisBekreftSlettingModal(false);
                            });
                        }}
                        disabled={sletter}
                        loading={sletter}
                    >
                        Bekreft
                    </Button>
                    <Button
                        variant="secondary"
                        key={'avbryt'}
                        onClick={lukkModal}
                        disabled={sletter}
                    >
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
