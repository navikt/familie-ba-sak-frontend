import React from 'react';

import styled from 'styled-components';

import { Alert, BodyShort, Button, ErrorMessage, Fieldset, Label, Modal } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useEndringstidspunkt } from './UseEndringstidspunkt';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { formatterDate } from '../../../../../utils/dato';
import { Datoformat } from '../../../../../utils/formatter';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import Datovelger from '../../../../Felleskomponenter/Datovelger';

const Feltmargin = styled.div`
    margin: 1.5rem 0 2rem;
`;

const StyledAlert = styled(Alert)`
    margin-top: 3rem;
    margin-bottom: 3rem;
`;

const StyledFieldset = styled(Fieldset)`
    margin-top: 3rem;
`;

interface IProps {
    lukkModal: () => void;
    behandlingId: number;
}

export const OppdaterEndringstidspunktModal: React.FC<IProps> = ({ lukkModal, behandlingId }) => {
    const erLesevisning = useBehandling().vurderErLesevisning();
    const { endringstidspunktRessurs, endringstidspunkt, skjema, oppdaterEndringstidspunkt } =
        useEndringstidspunkt({ behandlingId, lukkModal });

    return (
        <Modal
            open
            onClose={lukkModal}
            width={'35rem'}
            header={{ heading: 'Oppdater endringstidspunkt', size: 'medium' }}
            portal
        >
            <Modal.Body>
                <StyledAlert inline variant={'info'}>
                    Dersom du ønsker å vise perioder som er filtrert bort i vedtaksbildet, kan du
                    oppdatere endringstidspunktet tilbake i tid.
                </StyledAlert>

                <Label size="medium">Endringstidspunkt</Label>
                {endringstidspunktRessurs.status === RessursStatus.SUKSESS ? (
                    <BodyShort>
                        {formatterDate({
                            dato: endringstidspunkt,
                            datoformat: Datoformat.DATO,
                            defaultString: 'Ingen dato satt',
                        })}
                    </BodyShort>
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
                        <Datovelger
                            felt={skjema.felter.endringstidspunkt}
                            label={'Nytt endringstidspunkt'}
                            readOnly={erLesevisning}
                            visFeilmeldinger={skjema.visFeilmeldinger}
                            kanKunVelgeFortid
                        />
                    </Feltmargin>
                </StyledFieldset>
            </Modal.Body>
            <Modal.Footer>
                {erLesevisning ? (
                    <Button variant="primary" key="Lukk">
                        Lukk
                    </Button>
                ) : (
                    <>
                        <Button
                            variant={'primary'}
                            key={'Oppdater'}
                            onClick={oppdaterEndringstidspunkt}
                            children={'Oppdater'}
                            loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                            disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                        />
                        <Button
                            variant={'tertiary'}
                            key={'Avbryt'}
                            onClick={lukkModal}
                            children={'Avbryt'}
                        />
                    </>
                )}
            </Modal.Footer>
        </Modal>
    );
};
