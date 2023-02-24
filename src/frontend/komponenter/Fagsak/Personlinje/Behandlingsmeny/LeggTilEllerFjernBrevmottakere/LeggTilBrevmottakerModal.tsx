import React from 'react';

import styled from 'styled-components';

import { AddCircle } from '@navikt/ds-icons';
import { Alert, Button, Heading, Modal } from '@navikt/ds-react';

import type { IBehandling } from '../../../../../typer/behandling';
import BrevmottakerSkjema from './BrevmottakerSkjema';
import BrevmottakerTabell from './BrevmottakerTabell';

const StyledModal = styled(Modal)`
    width: 35rem;
`;
const StyledAlert = styled(Alert)`
    margin: 1rem 0 2.5rem;
`;
const StyledHeading = styled(Heading)`
    margin: 1rem 0 0.75rem;
`;
const LeggTilKnapp = styled(Button)`
    margin-top: 1rem;
`;
const LukkKnapp = styled(Button)`
    margin-top: 2.5rem;
`;

interface Props {
    visModal: boolean;
    lukkModal: () => void;
    åpenBehandling: IBehandling;
    visSkjema: boolean;
    erLesevisning: boolean;
    åpneSkjema: () => void;
}

const utledHeading = (antallMottakere: number, erLesevisning: boolean) => {
    if (erLesevisning) {
        return antallMottakere === 1 ? 'Brevmottaker' : 'Brevmottakere';
    } else {
        return antallMottakere === 0
            ? 'Legg til brevmottaker'
            : antallMottakere === 1
            ? 'Legg til eller fjern brevmottaker'
            : 'Brevmottakere';
    }
};

export const LeggTilBrevmottakerModal: React.FC<Props> = ({
    visModal,
    lukkModal,
    åpenBehandling,
    visSkjema,
    erLesevisning,
    åpneSkjema,
}: Props) => {
    const heading = utledHeading(åpenBehandling.brevmottakere.length, erLesevisning);

    return (
        <StyledModal
            open={visModal}
            aria-label={heading}
            onClose={lukkModal}
            shouldCloseOnOverlayClick={false}
        >
            <Modal.Content>
                <Heading spacing level="2" size="medium" id="modal-heading">
                    {heading}
                </Heading>
                <StyledAlert variant="info">
                    Brev sendes til brukers folkeregistrerte adresse eller annen foretrukken kanal.
                    Legg til mottaker dersom brev skal sendes til utenlandsk adresse, fullmektig,
                    verge eller dødsbo.
                </StyledAlert>
                {åpenBehandling.brevmottakere.map(mottaker => (
                    <BrevmottakerTabell mottaker={mottaker} />
                ))}
                {visSkjema ? (
                    <>
                        {åpenBehandling.brevmottakere.length === 1 && (
                            <StyledHeading size="medium">Ny mottaker</StyledHeading>
                        )}
                        <BrevmottakerSkjema lukkModal={lukkModal} />
                    </>
                ) : (
                    <>
                        {åpenBehandling.brevmottakere.length === 1 && !erLesevisning && (
                            <LeggTilKnapp
                                variant="tertiary"
                                size="small"
                                icon={<AddCircle />}
                                onClick={åpneSkjema}
                            >
                                Legg til ny mottaker
                            </LeggTilKnapp>
                        )}
                        <div>
                            <LukkKnapp onClick={lukkModal}>Lukk vindu</LukkKnapp>
                        </div>
                    </>
                )}
            </Modal.Content>
        </StyledModal>
    );
};
