import { useEffect, useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { byggSuksessRessurs, byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

interface IProps {
    fagsakId: number;
}

export const useSatsendringsknapp = ({ fagsakId }: IProps) => {
    const { request } = useHttp();

    const [kanKjøreSatsendringRessurs, settKanKjøreSatsendringRessurs] = useState<Ressurs<boolean>>(
        byggTomRessurs()
    );

    const oppdaterKanKjøreSatsendring = () => {
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
