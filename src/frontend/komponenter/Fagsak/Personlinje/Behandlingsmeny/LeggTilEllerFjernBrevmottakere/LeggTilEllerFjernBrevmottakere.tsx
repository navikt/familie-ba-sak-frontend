import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AddCircle } from '@navikt/ds-icons';
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

const StyledHeading = styled(Heading)`
    margin: 1rem 0 0.75rem;
`;

const LeggTilKnapp = styled(Button)`
    margin-top: 1rem;
`;

const LukkKnapp = styled(Button)`
    margin-top: 2.5rem;
`;

interface IProps {
    åpenBehandling: IBehandling;
    erLesevisning: boolean;
}

const utledMenyinnslag = (antallMottakere: number, erLesevisning: boolean) => {
    if (erLesevisning) {
        return antallMottakere === 1 ? 'Se brevmottaker' : 'Se brevmottakere';
    } else {
        return antallMottakere === 0
            ? 'Legg til brevmottaker'
            : antallMottakere === 1
            ? 'Legg til eller fjern brevmottaker'
            : 'Se eller fjern brevmottakere';
    }
};

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

const LeggTilEllerFjernBrevmottakere: React.FC<IProps> = ({ åpenBehandling, erLesevisning }) => {
    const [visModal, settVisModal] = useState(false);
    const [visSkjema, settVisSkjema] = useState(true);
    const [heading, settHeading] = useState('');
    const [menyinnslag, settMenyinnslag] = useState('');

    const lukkModal = () => {
        settVisModal(false);
        settVisSkjema(åpenBehandling.brevmottakere.length === 0);
    };

    useEffect(() => {
        settVisSkjema(åpenBehandling.brevmottakere.length === 0);
        settMenyinnslag(utledMenyinnslag(åpenBehandling.brevmottakere.length, erLesevisning));
        settHeading(utledHeading(åpenBehandling.brevmottakere.length, erLesevisning));
    }, [åpenBehandling]);

    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                {menyinnslag}
            </Dropdown.Menu.List.Item>
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
                        Brev sendes til brukers folkeregistrerte adresse eller annen foretrukken
                        kanal. Legg til mottaker dersom brev skal sendes til utenlandsk adresse,
                        fullmektig, verge eller dødsbo.
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
                                    onClick={() => settVisSkjema(true)}
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
        </>
    );
};

export default LeggTilEllerFjernBrevmottakere;
