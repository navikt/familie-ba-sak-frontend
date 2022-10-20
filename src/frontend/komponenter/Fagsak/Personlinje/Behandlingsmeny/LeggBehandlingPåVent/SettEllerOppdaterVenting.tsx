import React, { useState } from 'react';

import { Dropdown } from '@navikt/ds-react-internal';
import type { Ressurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../../typer/behandling';
import { BehandlingStatus } from '../../../../../typer/behandling';
import { SettBehandlingPåVentModal } from './SettBehandlingPåVentModal';
import { useSettPåVentSkjema } from './useSettPåVentSkjema';

interface IProps {
    behandling: IBehandling;
}

const SettEllerOppdaterVenting: React.FC<IProps> = ({ behandling }) => {
    const { settÅpenBehandling } = useBehandling();
    const [visModal, settVisModal] = useState<boolean>(!!behandling.aktivSettPåVent);
    const { skjema, kanSendeSkjema, onSubmit } = useSettPåVentSkjema(
        behandling.aktivSettPåVent,
        visModal
    );

    const erBehandlingAlleredePåVent = !!behandling.aktivSettPåVent;

    const settBehandlingPåVent = () => {
        if (kanSendeSkjema()) {
            onSubmit(
                {
                    method: erBehandlingAlleredePåVent ? 'PUT' : 'POST',
                    data: { frist: skjema.felter.frist.verdi, årsak: skjema.felter.årsak.verdi },
                    url: `/familie-ba-sak/api/sett-på-vent/${behandling.behandlingId}`,
                },
                (ressurs: Ressurs<IBehandling>) => {
                    settÅpenBehandling(ressurs);
                    settVisModal(false);
                }
            );
        }
    };

    return (
        <>
            <Dropdown.Menu.List.Item
                onClick={() => settVisModal(true)}
                disabled={behandling.status !== BehandlingStatus.UTREDES}
            >
                {erBehandlingAlleredePåVent
                    ? 'Endre ventende behandling'
                    : 'Sett behandling på vent'}
            </Dropdown.Menu.List.Item>

            <SettBehandlingPåVentModal
                visModal={visModal}
                onAvbryt={() => settVisModal(false)}
                settBehandlingPåVent={settBehandlingPåVent}
                skjema={skjema}
                erBehandlingAlleredePåVent={erBehandlingAlleredePåVent}
            />
        </>
    );
};

export default SettEllerOppdaterVenting;
