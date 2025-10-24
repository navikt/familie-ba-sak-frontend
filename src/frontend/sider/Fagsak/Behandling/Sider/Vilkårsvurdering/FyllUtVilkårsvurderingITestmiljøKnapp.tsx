import React from 'react';

import { Button } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { erProd } from '../../../../../utils/miljø';

interface IProps {
    behandlingId: number;
}

export const FyllUtVilkårsvurderingITestmiljøKnapp: React.FunctionComponent<IProps> = ({ behandlingId }) => {
    const { request } = useHttp();

    const fyllUtVilkårsvurdering = () => {
        if (erProd()) {
            return;
        }

        request<undefined, string>({
            method: 'PUT',
            url: `/familie-ba-sak/api/preprod/${behandlingId}/fyll-ut-vilkarsvurdering`,
            påvirkerSystemLaster: true,
        }).then((fyllUtVilkårsvurderingRessurs: Ressurs<string>) => {
            if (fyllUtVilkårsvurderingRessurs.status === RessursStatus.SUKSESS) {
                window.location.reload();
            }
        });
    };

    return <Button onClick={fyllUtVilkårsvurdering}>Fyll ut vilkårsvurdering</Button>;
};
