import React, { useState } from 'react';

import { Calender } from '@navikt/ds-icons';
import { Dropdown } from '@navikt/ds-react-internal';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { OppdaterEndringstidspunktModal } from './OppdaterEndringstidspunktModal';
import { useOppdaterEndringstidspunktSkjema } from './useOppdaterEndringstidspunktSkjema';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../typer/behandling';

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
        <>
            <Dropdown.Menu.List.Item
                onClick={() => {
                    settVisModal(true);
                }}
            >
                <Calender />
                Oppdater endringstidspunkt
            </Dropdown.Menu.List.Item>

            <OppdaterEndringstidspunktModal
                visModal={visModal}
                onAvbryt={() => settVisModal(false)}
                oppdaterEndringstidspunkt={oppdaterEndringstidspunkt}
                skjema={skjema}
            />
        </>
    );
};

export default EndreEndringstidspunkt;
