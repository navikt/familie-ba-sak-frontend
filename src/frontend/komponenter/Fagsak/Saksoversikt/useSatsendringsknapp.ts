import { useEffect, useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { byggSuksessRessurs, byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import { FagsakStatus } from '../../../typer/fagsak';

interface IProps {
    fagsakStatus: FagsakStatus;
    fagsakId: number;
}

export const useSatsendringsknapp = ({ fagsakId, fagsakStatus }: IProps) => {
    const { request } = useHttp();

    const [kanKjøreSatsendringRessurs, settKanKjøreSatsendringRessurs] = useState<Ressurs<boolean>>(
        byggTomRessurs()
    );

    const oppdaterKanKjøreSatsendring = () => {
        if (fagsakStatus !== FagsakStatus.LØPENDE) return false;

        request<undefined, boolean>({
            method: 'GET',
            url: `/familie-ba-sak/api/satsendring/${fagsakId}/kan-kjore-satsendring`,
            påvirkerSystemLaster: true,
        }).then((ressurs: Ressurs<boolean>) => {
            settKanKjøreSatsendringRessurs(ressurs);
        });
    };

    useEffect(() => {
        oppdaterKanKjøreSatsendring();
    }, [fagsakId]);

    const settKanKjøreSatsendringTilFalse = () =>
        settKanKjøreSatsendringRessurs(byggSuksessRessurs(false));

    const kanKjøreSatsendring =
        kanKjøreSatsendringRessurs.status === RessursStatus.SUKSESS &&
        kanKjøreSatsendringRessurs.data;

    return {
        kanKjøreSatsendring,
        settKanKjøreSatsendringTilFalse,
    };
};
