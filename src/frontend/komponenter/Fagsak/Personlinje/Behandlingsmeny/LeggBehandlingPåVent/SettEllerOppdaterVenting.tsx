import React, { useState } from 'react';

import KnappBase from 'nav-frontend-knapper';

import { Ressurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { IBehandling } from '../../../../../typer/behandling';
import { SettBehandlingPåVentModal } from './SettBehandlingPåVentModal';
import { useSettPåVentSkjema } from './useSettPåVentSkjema';

interface IProps {
    onListElementClick: () => void;
    behandling: IBehandling;
}

const SettEllerOppdaterVenting: React.FC<IProps> = ({ onListElementClick, behandling }) => {
    const { settÅpenBehandling } = useBehandling();
    const [visModal, settVisModal] = useState<boolean>(false);
    const { skjema, kanSendeSkjema, nullstillSkjema, onSubmit } = useSettPåVentSkjema(
        behandling.settPåVent
    );

    const erBehandlingAlleredePåVent = !!behandling.settPåVent;

    const lukkModal = () => {
        settVisModal(false);
        nullstillSkjema();
    };

    const settBehandlingPåVent = () => {
        if (kanSendeSkjema()) {
            onSubmit(
                {
                    method: erBehandlingAlleredePåVent ? 'PUT' : 'POST',
                    data: { frist: skjema.felter.frist.verdi, årsak: skjema.felter.årsak.verdi },
                    url: `/familie-ba-sak/api/sett-på-vent/${behandling.behandlingId}`,
                    påvirkerSystemLaster: true,
                },
                (ressurs: Ressurs<IBehandling>) => {
                    settÅpenBehandling(ressurs);
                    lukkModal();
                }
            );
        }
    };

    return (
        <>
            <KnappBase
                mini={true}
                onClick={() => {
                    settVisModal(true);
                    onListElementClick();
                }}
            >
                {erBehandlingAlleredePåVent
                    ? 'Oppdater behandling på vent'
                    : 'Legg behandling på vent'}
            </KnappBase>

            <SettBehandlingPåVentModal
                visModal={visModal}
                onAvbryt={lukkModal}
                settBehandlingPåVent={settBehandlingPåVent}
                skjema={skjema}
                erBehandlingAlleredePåVent={erBehandlingAlleredePåVent}
            />
        </>
    );
};

export default SettEllerOppdaterVenting;
