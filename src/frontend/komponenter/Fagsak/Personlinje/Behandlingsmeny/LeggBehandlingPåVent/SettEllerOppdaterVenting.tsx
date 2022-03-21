import React, { useState } from 'react';

import KnappBase from 'nav-frontend-knapper';

import type { Ressurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../../typer/behandling';
import { BehandlingSteg, hentStegNummer } from '../../../../../typer/behandling';
import { SettBehandlingPåVentModal } from './SettBehandlingPåVentModal';
import { useSettPåVentSkjema } from './useSettPåVentSkjema';

interface IProps {
    onListElementClick: () => void;
    behandling: IBehandling;
}

const SettEllerOppdaterVenting: React.FC<IProps> = ({ onListElementClick, behandling }) => {
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

    const behandlingErSendtTilBeslutter =
        hentStegNummer(behandling.steg) > hentStegNummer(BehandlingSteg.SEND_TIL_BESLUTTER);

    return (
        <>
            <KnappBase
                mini={true}
                onClick={() => {
                    settVisModal(true);
                    onListElementClick();
                }}
                disabled={behandlingErSendtTilBeslutter}
            >
                {erBehandlingAlleredePåVent
                    ? 'Endre ventende behandling'
                    : 'Sett behandling på vent'}
            </KnappBase>

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
