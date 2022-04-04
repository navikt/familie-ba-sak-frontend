import React, { useState } from 'react';

import styled from 'styled-components';

import { Flatknapp } from 'nav-frontend-knapper';
import { Element } from 'nav-frontend-typografi';

import { Edit } from '@navikt/ds-icons';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../typer/behandling';
import { OppdaterEndringstidspunktModal } from './OppdaterEndringstidspunktModal';
import { useOppdaterEndringstidspunktSkjema } from './useOppdaterEndringstidspunktSkjema';

const EndringstidspunktDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 2.75rem 0 1rem;
`;
const StyledEditIkon = styled(Edit)`
    margin-right: 0.5rem;
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
            <Flatknapp
                mini
                onClick={() => {
                    settVisModal(true);
                }}
            >
                <StyledEditIkon />
                <Element>Oppdater endringstidspunkt</Element>
            </Flatknapp>
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
