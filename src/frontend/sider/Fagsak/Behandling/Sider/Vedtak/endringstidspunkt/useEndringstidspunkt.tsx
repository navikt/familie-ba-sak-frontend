import { useEffect, useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import { useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { byggHenterRessurs, hentDataFraRessurs, RessursStatus } from '@navikt/familie-typer';

import type { IBehandling } from '../../../../../../typer/behandling';
import type { IRestOverstyrtEndringstidspunkt } from '../../../../../../typer/vedtaksperiode';
import type { IsoDatoString } from '../../../../../../utils/dato';
import { dateTilIsoDatoString, validerGyldigDato } from '../../../../../../utils/dato';
import { useVedtakContext } from '../VedtakContext';

interface IProps {
    lukkModal: () => void;
    behandlingId: number;
}

export function useEndringstidspunkt({ behandlingId, lukkModal }: IProps) {
    const { request } = useHttp();
    const [endringstidspunktRessurs, settEndringstidspunktRessurs] =
        useState(byggHenterRessurs<IsoDatoString | undefined>());

    const hentEndringstidspunkt = () =>
        request<void, IsoDatoString>({
            method: 'GET',
            url: `/familie-ba-sak/api/behandlinger/${behandlingId}/endringstidspunkt`,
        });

    const endringstidspunktFraRessurs = hentDataFraRessurs(endringstidspunktRessurs);

    const endringstidspunkt = endringstidspunktFraRessurs
        ? new Date(endringstidspunktFraRessurs)
        : undefined;

    const { skjema, kanSendeSkjema, onSubmit } = useSkjema<
        {
            endringstidspunkt: Date | undefined;
        },
        IBehandling
    >({
        felter: {
            endringstidspunkt: useFelt<Date | undefined>({
                verdi: undefined,
                valideringsfunksjon: validerGyldigDato,
            }),
        },
        skjemanavn: 'Oppdater første endringstidspunkt',
    });

    const { hentVedtaksperioder } = useVedtakContext();

    const oppdaterEndringstidspunkt = () => {
        if (kanSendeSkjema()) {
            onSubmit<IRestOverstyrtEndringstidspunkt>(
                {
                    method: 'PUT',
                    data: {
                        overstyrtEndringstidspunkt: dateTilIsoDatoString(
                            skjema.felter.endringstidspunkt.verdi
                        ),
                        behandlingId,
                    },
                    url: `/familie-ba-sak/api/vedtaksperioder/endringstidspunkt`,
                    påvirkerSystemLaster: true,
                },
                (response: Ressurs<IBehandling>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        lukkModal();
                        hentVedtaksperioder();
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
