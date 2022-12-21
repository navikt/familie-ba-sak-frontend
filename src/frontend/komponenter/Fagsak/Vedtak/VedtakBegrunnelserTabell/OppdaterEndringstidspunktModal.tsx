import React from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { Button, Heading, Modal } from '@navikt/ds-react';
import type { ISkjema } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../typer/behandling';
import type { FamilieIsoDate } from '../../../../utils/kalender';
import { hentFrontendFeilmelding } from '../../../../utils/ressursUtils';
import { FamilieDatovelgerWrapper } from '../../../../utils/skjema/FamilieDatovelgerWrapper';

const Feltmargin = styled.div`
    margin: 1.5rem 0 2rem;
`;

const StyledModal = styled(Modal)`
    width: 35rem;
`;

const KnappHøyre = styled(Button)`
    margin-left: 1rem;
`;

const Knapperad = styled.div`
    display: flex;
    justify-content: flex-start;
`;

interface IProps {
    visModal: boolean;
    onAvbryt: () => void;
    oppdaterEndringstidspunkt: () => void;
    skjema: ISkjema<{ endringstidspunkt: FamilieIsoDate | undefined }, IBehandling>;
}

export const OppdaterEndringstidspunktModal: React.FC<IProps> = ({
    visModal,
    onAvbryt,
    oppdaterEndringstidspunkt,
    skjema,
}) => {
    const { vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();
    return (
        <StyledModal open={visModal} onClose={onAvbryt}>
            <Modal.Content>
                <Heading size="medium" level="2">
                    Oppdater endringstidspunkt
                </Heading>
                <SkjemaGruppe
                    feil={hentFrontendFeilmelding(skjema.submitRessurs)}
                    utenFeilPropagering={true}
                >
                    <Feltmargin>
                        <FamilieDatovelgerWrapper
                            {...skjema.felter.endringstidspunkt.hentNavInputProps(
                                skjema.visFeilmeldinger
                            )}
                            value={skjema.felter.endringstidspunkt.verdi}
                            valgtDato={skjema.felter.endringstidspunkt.verdi}
                            label={'Endringstidspunkt'}
                            placeholder={'DD.MM.ÅÅÅÅ'}
                            erLesesvisning={erLesevisning}
                        />
                    </Feltmargin>
                </SkjemaGruppe>
                <Knapperad>
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
                            <KnappHøyre
                                variant={'tertiary'}
                                key={'Avbryt'}
                                onClick={onAvbryt}
                                children={'Avbryt'}
                            />
                        </>
                    )}
                </Knapperad>
            </Modal.Content>
        </StyledModal>
    );
};
