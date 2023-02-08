import { useEffect, useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

interface IProps {
    fagsakId: number;
}

export const useSatsendringsknapp = ({ fagsakId }: IProps) => {
    const { request } = useHttp();

    const [kanKjøreSatsendringRessurs, settKanKjøreSatsendringRessurs] = useState<Ressurs<boolean>>(
        byggTomRessurs()
    );

    const oppdaterKanKjøreSatsendring = () => {
        request<{ brukerIdent: string }, boolean>({
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

    const kanKjøreSatsendring =
        kanKjøreSatsendringRessurs.status === RessursStatus.SUKSESS &&
        kanKjøreSatsendringRessurs.data;

    return {
        kanKjøreSatsendring,
        oppdaterKanKjøreSatsendring,
    };
};
