import React from 'react';

import styled from 'styled-components';

import {
    Alert,
    BodyShort,
    Button,
    ErrorMessage,
    Fieldset,
    Heading,
    Label,
    Modal,
} from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useEndringstidspunkt } from './UseEndringstidspunkt';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { datoformat, formaterIsoDato } from '../../../../../utils/formatter';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import { FamilieDatovelgerWrapper } from '../../../../../utils/skjema/FamilieDatovelgerWrapper';

const Feltmargin = styled.div`
    margin: 1.5rem 0 2rem;
`;

const StyledModal = styled(Modal)`
    width: 35rem;
    overflow: visible;
`;

const KnappHøyre = styled(Button)`
    margin-left: 1rem;
`;

const Knapperad = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const StyledAlert = styled(Alert)`
    margin-top: 3rem;
    margin-bottom: 3rem;
`;

const StyledFieldset = styled(Fieldset)`
    margin-top: 3rem;
`;

interface IProps {
    visModal: boolean;
    lukkModal: () => void;
    behandlingId: number;
}

export const OppdaterEndringstidspunktModal: React.FC<IProps> = ({
    visModal,
    lukkModal,
    behandlingId,
}) => {
    const erLesevisning = useBehandling().vurderErLesevisning();
    const { endringstidspunktRessurs, endringstidspunkt, skjema, oppdaterEndringstidspunkt } =
        useEndringstidspunkt({ behandlingId, visModal, lukkModal });

    return (
        <StyledModal open={visModal} onClose={lukkModal}>
            <Modal.Content>
                <Heading spacing size="medium" level="1">
                    Oppdater endringstidspunkt
                </Heading>

                <StyledAlert inline variant={'info'}>
                    Dersom du ønsker å vise perioder som er filtrert bort i vedtaksbildet, kan du
                    oppdatere endringstidspunktet tilbake i tid.
                </StyledAlert>

                <Label size="small">Endringstidspunkt</Label>
                {endringstidspunktRessurs.status === RessursStatus.SUKSESS ? (
                    <BodyShort>{formaterIsoDato(endringstidspunkt, datoformat.DATO)}</BodyShort>
                ) : (
                    <ErrorMessage>
                        Systemet kan ikke hente endringstidspunktet. Prøv igjen senere eller kontakt
                        brukerstøtte.
                    </ErrorMessage>
                )}

                <StyledFieldset
                    error={hentFrontendFeilmelding(skjema.submitRessurs)}
                    errorPropagation={false}
                    legend="Nytt endringstidspunkt"
                    hideLegend
                >
                    <Feltmargin>
                        <FamilieDatovelgerWrapper
                            {...skjema.felter.endringstidspunkt.hentNavInputProps(
                                skjema.visFeilmeldinger
                            )}
                            value={skjema.felter.endringstidspunkt.verdi}
                            label={'Nytt endringstidspunkt'}
                            placeholder={'DD.MM.ÅÅÅÅ'}
                            erLesesvisning={erLesevisning}
                        />
                    </Feltmargin>
                </StyledFieldset>

                <Knapperad>
                    {erLesevisning ? (
                        <Button variant="primary" key="Lukk">
                            Lukk
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant={'tertiary'}
                                key={'Avbryt'}
                                onClick={lukkModal}
                                children={'Avbryt'}
                            />
                            <KnappHøyre
                                variant={'primary'}
                                key={'Oppdater'}
                                onClick={oppdaterEndringstidspunkt}
                                children={'Oppdater'}
                                loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                                disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                            />
                        </>
                    )}
                </Knapperad>
            </Modal.Content>
        </StyledModal>
    );
};
