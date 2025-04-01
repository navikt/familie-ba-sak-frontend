import { useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import { RessursStatus, type Ressurs } from '@navikt/familie-typer';

import { useBehandlingContext } from '../../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../../typer/behandling';
import type { IRestEndretUtbetalingAndel } from '../../../../../typer/utbetalingAndel';

export const useBehandlingsresultat = (åpenBehandling: IBehandling) => {
    const { request } = useHttp();
    const { settÅpenBehandling } = useBehandlingContext();

    const [visFeilmeldinger, settVisFeilmeldinger] = useState(false);
    const [opprettEndretUtbetalingFeilmelding, settOpprettEndretUtbetalingFeilmelding] =
        useState('');
    const [personerMedUgyldigEtterbetalingsperiode, settPersonerMedUgyldigEtterbetalingsperiode] =
        useState<string[]>([]);

    const opprettEndretUtbetaling = () => {
        request<IRestEndretUtbetalingAndel, IBehandling>({
            method: 'POST',
            url: `/familie-ba-sak/api/endretutbetalingandel/${åpenBehandling.behandlingId}`,
            påvirkerSystemLaster: true,
            data: {},
        }).then((response: Ressurs<IBehandling>) => {
            if (response.status === RessursStatus.SUKSESS) {
                settVisFeilmeldinger(false);
                settÅpenBehandling(response);
            } else if (
                response.status === RessursStatus.FUNKSJONELL_FEIL ||
                response.status === RessursStatus.FEILET
            ) {
                settVisFeilmeldinger(true);
                settOpprettEndretUtbetalingFeilmelding(response.frontendFeilmelding);
            }
        });
    };

    const hentPersonerMedUgyldigEtterbetalingsperiode = () => {
        request<void, string[]>({
            method: 'GET',
            url: `/familie-ba-sak/api/behandlinger/${åpenBehandling.behandlingId}/personer-med-ugyldig-etterbetalingsperiode`,
        }).then((erGyldigEtterbetalingsperiode: Ressurs<string[]>) => {
            if (erGyldigEtterbetalingsperiode.status === RessursStatus.SUKSESS) {
                settPersonerMedUgyldigEtterbetalingsperiode(erGyldigEtterbetalingsperiode.data);
            }
        });
    };

    return {
        opprettEndretUtbetaling,
        opprettEndretUtbetalingFeilmelding,
        visFeilmeldinger,
        settVisFeilmeldinger,
        hentPersonerMedUgyldigEtterbetalingsperiode,
        personerMedUgyldigEtterbetalingsperiode,
    };
};
