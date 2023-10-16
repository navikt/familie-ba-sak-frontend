import React, { useState } from 'react';

import { Dropdown } from '@navikt/ds-react';
import type { Ressurs } from '@navikt/familie-typer';

import { SettBehandlingPåVentModal } from './SettBehandlingPåVentModal';
import { useSettPåVentSkjema } from './useSettPåVentSkjema';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling, ISettPåVent } from '../../../../../typer/behandling';
import { formatterDateTilIsoString } from '../../../../../utils/dato';

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
    const { årsak, frist } = skjema.felter;

    const erBehandlingAlleredePåVent = !!behandling.aktivSettPåVent;

    const settBehandlingPåVent = () => {
        if (kanSendeSkjema() && årsak.verdi && frist.verdi) {
            onSubmit<ISettPåVent>(
                {
                    method: erBehandlingAlleredePåVent ? 'PUT' : 'POST',
                    data: {
                        frist: formatterDateTilIsoString(frist.verdi),
                        årsak: årsak.verdi,
                    },
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
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                {erBehandlingAlleredePåVent
                    ? 'Endre ventende behandling'
                    : 'Sett behandling på vent'}
            </Dropdown.Menu.List.Item>

            {visModal && (
                <SettBehandlingPåVentModal
                    onAvbryt={() => settVisModal(false)}
                    settBehandlingPåVent={settBehandlingPåVent}
                    skjema={skjema}
                    erBehandlingAlleredePåVent={erBehandlingAlleredePåVent}
                />
            )}
        </>
    );
};

export default SettEllerOppdaterVenting;
