import { useEffect, useState } from 'react';

import type { ISODateString } from '@navikt/familie-datovelger';
import { useHttp } from '@navikt/familie-http';
import { useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import {
    byggHenterRessurs,
    byggSuksessRessurs,
    hentDataFraRessurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useVedtaksperioder } from '../../../../../context/behandlingContext/useVedtaksperioder';
import type { IBehandling } from '../../../../../typer/behandling';
import type { IRestOverstyrtEndringstidspunkt } from '../../../../../typer/vedtaksperiode';
import {
    formatterDateTilIsoString,
    formatterDateTilIsoStringEllerUndefined,
    validerGyldigDato,
} from '../../../../../utils/dato';

interface IProps {
    lukkModal: () => void;
    behandlingId: number;
}

export function useEndringstidspunkt({ behandlingId, lukkModal }: IProps) {
    const { request } = useHttp();
    const [endringstidspunktRessurs, settEndringstidspunktRessurs] = useState(
        byggHenterRessurs<ISODateString | undefined>()
    );

    const hentEndringstidspunkt = () =>
        request<void, ISODateString>({
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

    const { hentVedtaksperioder } = useVedtaksperioder();

    const oppdaterEndringstidspunkt = () => {
        if (kanSendeSkjema()) {
            onSubmit<IRestOverstyrtEndringstidspunkt>(
                {
                    method: 'PUT',
                    data: {
                        overstyrtEndringstidspunkt: formatterDateTilIsoString(
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
