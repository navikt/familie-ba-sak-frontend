import { useEffect, useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { byggSuksessRessurs, byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import type { IMinimalFagsak } from '../../../typer/fagsak';
import { FagsakStatus } from '../../../typer/fagsak';

interface IProps {
    minimalFagsak: IMinimalFagsak;
}

export const useSatsendringsknapp = ({ minimalFagsak }: IProps) => {
    const { request } = useHttp();

    const [kanKjøreSatsendringRessurs, settKanKjøreSatsendringRessurs] = useState<Ressurs<boolean>>(
        byggTomRessurs()
    );

    const oppdaterKanKjøreSatsendring = () => {
        if (minimalFagsak.status !== FagsakStatus.LØPENDE) return false;

        request<undefined, boolean>({
            method: 'GET',
            url: `/familie-ba-sak/api/satsendring/${minimalFagsak.id}/kan-kjore-satsendring`,
            påvirkerSystemLaster: true,
        }).then((ressurs: Ressurs<boolean>) => {
            settKanKjøreSatsendringRessurs(ressurs);
        });
    };

    useEffect(() => {
        oppdaterKanKjøreSatsendring();
    }, [minimalFagsak.id]);

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
