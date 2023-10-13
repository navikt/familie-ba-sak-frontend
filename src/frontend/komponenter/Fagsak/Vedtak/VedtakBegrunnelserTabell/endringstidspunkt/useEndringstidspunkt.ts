import { useEffect, useState } from 'react';

import type { ISODateString } from '@navikt/familie-datovelger';
import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import {
    byggHenterRessurs,
    byggSuksessRessurs,
    hentDataFraRessurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useOppdaterEndringstidspunktSkjema } from './useOppdaterEndringstidspunktSkjema';
import { useVedtaksperioder } from '../../../../../context/behandlingContext/useVedtaksperioder';
import type { IBehandling } from '../../../../../typer/behandling';
import { formatterDateTilIsoStringEllerUndefined } from '../../../../../utils/dato';

interface IProps {
    visModal: boolean;
    lukkModal: () => void;
    behandlingId: number;
}

export function useEndringstidspunkt({ behandlingId, visModal, lukkModal }: IProps) {
    const { request } = useHttp();
    const [endringstidspunktRessurs, settEndringstidspunktRessurs] = useState(
        byggHenterRessurs<ISODateString | undefined>()
    );

    const hentEndringstidspunkt = () =>
        request<void, ISODateString>({
            method: 'GET',
            url: `/familie-ba-sak/api/behandlinger/${behandlingId}/endringstidspunkt`,
            påvirkerSystemLaster: true,
        });

    const endringstidspunktFraRessurs = hentDataFraRessurs(endringstidspunktRessurs);

    const endringstidspunkt = endringstidspunktFraRessurs
        ? new Date(endringstidspunktFraRessurs)
        : undefined;

    const { skjema, kanSendeSkjema, onSubmit } = useOppdaterEndringstidspunktSkjema(
        endringstidspunkt,
        visModal
    );

    const { hentVedtaksperioder } = useVedtaksperioder();

    const oppdaterEndringstidspunkt = () => {
        if (kanSendeSkjema()) {
            onSubmit(
                {
                    method: 'PUT',
                    data: {
                        overstyrtEndringstidspunkt: skjema.felter.endringstidspunkt.verdi,
                        behandlingId,
                    },
                    url: `/familie-ba-sak/api/vedtaksperioder/endringstidspunkt`,
                    påvirkerSystemLaster: true,
                },
                (response: Ressurs<IBehandling>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        lukkModal();
                        hentVedtaksperioder();
                        settEndringstidspunktRessurs(
                            byggSuksessRessurs(
                                formatterDateTilIsoStringEllerUndefined(
                                    skjema.felter.endringstidspunkt.verdi
                                )
                            )
                        );
                    }
                }
            );
        }
    };

    useEffect(() => {
        hentEndringstidspunkt().then(settEndringstidspunktRessurs);
    }, [behandlingId]);

    return {
        endringstidspunktRessurs,
        endringstidspunkt,
        skjema,
        oppdaterEndringstidspunkt,
    };
}
