import React, { useState } from 'react';

import styled from 'styled-components';

import { Calender } from '@navikt/ds-icons';
import { Button, Label } from '@navikt/ds-react';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../typer/behandling';
import { OppdaterEndringstidspunktModal } from './OppdaterEndringstidspunktModal';
import { useOppdaterEndringstidspunktSkjema } from './useOppdaterEndringstidspunktSkjema';

const EndringstidspunktDiv = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const EndreEndringstidspunkt: React.FC<{
    åpenBehandling: IBehandling;
}> = ({ åpenBehandling }) => {
    const [visModal, settVisModal] = useState(false);
    const { settÅpenBehandling } = useBehandling();
    const { skjema, kanSendeSkjema, onSubmit } = useOppdaterEndringstidspunktSkjema(
        åpenBehandling.endringstidspunkt,
        visModal
    );
    const oppdaterEndringstidspunkt = () => {
        if (kanSendeSkjema()) {
            onSubmit(
                {
                    method: 'PUT',
                    data: {
                        overstyrtEndringstidspunkt: skjema.felter.endringstidspunkt.verdi,
                        behandlingId: åpenBehandling.behandlingId,
                    },
                    url: `/familie-ba-sak/api/vedtaksperioder/endringstidspunkt`,
                },
                (response: Ressurs<IBehandling>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        settVisModal(false);
                        settÅpenBehandling(response);
                    }
                }
            );
        }
    };

    return (
        <EndringstidspunktDiv>
            <Button
                variant="tertiary"
                size="small"
                onClick={() => {
                    settVisModal(true);
                }}
            >
                <Calender />
                <Label>Oppdater endringstidspunkt</Label>
            </Button>
            <OppdaterEndringstidspunktModal
                visModal={visModal}
                onAvbryt={() => settVisModal(false)}
                oppdaterEndringstidspunkt={oppdaterEndringstidspunkt}
                skjema={skjema}
            />
        </EndringstidspunktDiv>
    );
};

export default EndreEndringstidspunkt;
