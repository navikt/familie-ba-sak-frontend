import React, { useState } from 'react';

import styled from 'styled-components';

import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Alert, Button, Heading, Modal } from '@navikt/ds-react';

import BrevmottakerSkjema from './BrevmottakerSkjema';
import BrevmottakerTabell from './BrevmottakerTabell';
import type { BrevmottakerUseSkjema, IRestBrevmottaker } from './useBrevmottakerSkjema';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';

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
    lukkModal: () => void;
    brevmottakere: IRestBrevmottaker[];
    lagreMottaker: (useSkjema: BrevmottakerUseSkjema) => void;
    fjernMottaker: (mottakerId: IRestBrevmottaker) => void;
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
    lukkModal,
    brevmottakere,
    lagreMottaker,
    fjernMottaker,
}) => {
    const { vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();

    const heading = utledHeading(brevmottakere.length, erLesevisning);

    const [visSkjemaNårDetErÉnBrevmottaker, settVisSkjemaNårDetErÉnBrevmottaker] = useState(false);

    const erSkjemaSynlig =
        (brevmottakere.length === 0 && !erLesevisning) ||
        (brevmottakere.length === 1 && visSkjemaNårDetErÉnBrevmottaker);

    const lukkModalOgSkjema = () => {
        lukkModal();
        settVisSkjemaNårDetErÉnBrevmottaker(false);
    };

    return (
        <Modal
            open
            onClose={lukkModalOgSkjema}
            header={{ heading: heading, size: 'medium' }}
            width={'35rem'}
            portal
        >
            <Modal.Body>
                <StyledAlert variant="info">
                    Brev sendes til brukers folkeregistrerte adresse eller annen foretrukken kanal.
                    Legg til mottaker dersom brev skal sendes til utenlandsk adresse, fullmektig,
                    verge eller dødsbo.
                </StyledAlert>
                {brevmottakere.map(mottaker => (
                    <BrevmottakerTabell
                        mottaker={mottaker}
                        key={`mottaker-${mottaker.id}`}
                        fjernMottaker={fjernMottaker}
                    />
                ))}
                {erSkjemaSynlig ? (
                    <>
                        {brevmottakere.length === 1 && (
                            <StyledHeading size="medium">Ny mottaker</StyledHeading>
                        )}
                        <BrevmottakerSkjema
                            lukkModal={lukkModalOgSkjema}
                            brevmottakere={brevmottakere}
                            lagreMottaker={lagreMottaker}
                        />
                    </>
                ) : (
                    <>
                        {brevmottakere.length === 1 && !erLesevisning && (
                            <LeggTilKnapp
                                variant="tertiary"
                                size="small"
                                icon={<PlusCircleIcon />}
                                onClick={() => settVisSkjemaNårDetErÉnBrevmottaker(true)}
                            >
                                Legg til ny mottaker
                            </LeggTilKnapp>
                        )}
                        <div>
                            <LukkKnapp onClick={lukkModal}>Lukk vindu</LukkKnapp>
                        </div>
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
};
