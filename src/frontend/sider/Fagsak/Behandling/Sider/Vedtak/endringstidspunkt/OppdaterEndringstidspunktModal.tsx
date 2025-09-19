import React from 'react';

import styled from 'styled-components';

import { Alert, BodyShort, Button, ErrorMessage, Fieldset, Label, Loader, Modal } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useEndringstidspunkt } from './useEndringstidspunkt';
import Datovelger from '../../../../../../komponenter/Datovelger/Datovelger';
import { dateTilFormatertString, Datoformat } from '../../../../../../utils/dato';
import { hentFrontendFeilmelding } from '../../../../../../utils/ressursUtils';
import { useBehandlingContext } from '../../../context/BehandlingContext';

const StyledAlert = styled(Alert)`
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

const StyledFieldset = styled(Fieldset)`
    margin-top: 2rem;
`;

interface IProps {
    lukkModal: () => void;
    behandlingId: number;
}

export const OppdaterEndringstidspunktModal: React.FC<IProps> = ({ lukkModal, behandlingId }) => {
    const erLesevisning = useBehandlingContext().vurderErLesevisning();
    const { endringstidspunktRessurs, endringstidspunkt, skjema, oppdaterEndringstidspunkt } = useEndringstidspunkt({
        behandlingId,
        lukkModal,
    });

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
                    Dersom du ønsker å vise perioder som er filtrert bort i vedtaksbildet, kan du oppdatere
                    endringstidspunktet tilbake i tid.
                </StyledAlert>

                <Label size="medium">Endringstidspunkt</Label>
                {endringstidspunktRessurs.status === RessursStatus.HENTER && (
                    <div>
                        <Loader />
                    </div>
                )}
                {endringstidspunktRessurs.status === RessursStatus.SUKSESS && (
                    <BodyShort>
                        {dateTilFormatertString({
                            date: endringstidspunkt,
                            tilFormat: Datoformat.DATO,
                            defaultString: 'Ingen dato satt',
                        })}
                    </BodyShort>
                )}
                {(endringstidspunktRessurs.status === RessursStatus.FEILET ||
                    endringstidspunktRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
                    endringstidspunktRessurs.status === RessursStatus.IKKE_TILGANG) && (
                    <ErrorMessage>
                        Systemet kan ikke hente endringstidspunktet. Prøv igjen senere eller kontakt brukerstøtte.
                    </ErrorMessage>
                )}

                <StyledFieldset
                    error={hentFrontendFeilmelding(skjema.submitRessurs)}
                    errorPropagation={false}
                    legend="Nytt endringstidspunkt"
                    hideLegend
                >
                    <Datovelger
                        felt={skjema.felter.endringstidspunkt}
                        label={'Nytt endringstidspunkt'}
                        readOnly={erLesevisning}
                        visFeilmeldinger={skjema.visFeilmeldinger}
                        kanKunVelgeFortid
                    />
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
                        <Button variant={'tertiary'} key={'Avbryt'} onClick={lukkModal} children={'Avbryt'} />
                    </>
                )}
            </Modal.Footer>
        </Modal>
    );
};
