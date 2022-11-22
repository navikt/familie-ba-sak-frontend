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
    margin: 2rem 0;
`;

const StyledModal = styled(Modal)`
    width: 35rem;
`;

const KnappHøyre = styled(Button)`
    margin-left: 1rem;
`;

const Knapperad = styled.div`
    display: flex;
    justify-content: center;
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
                <Heading size="medium" level="2" spacing>
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
                            valgtDato={skjema.felter.endringstidspunkt.verdi}
                            label={'Endringstidspunkt'}
                            placeholder={'DD.MM.ÅÅÅÅ'}
                            erLesesvisning={erLesevisning}
                        />
                    </Feltmargin>
                </SkjemaGruppe>
                <Knapperad>
                    {erLesevisning ? (
                        <Button variant="primary" key="Lukk" size="small">
                            Lukk
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant={'tertiary'}
                                key={'Avbryt'}
                                size={'small'}
                                onClick={onAvbryt}
                                children={'Avbryt'}
                            />
                            <KnappHøyre
                                variant={'primary'}
                                key={'Oppdater'}
                                size={'small'}
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
