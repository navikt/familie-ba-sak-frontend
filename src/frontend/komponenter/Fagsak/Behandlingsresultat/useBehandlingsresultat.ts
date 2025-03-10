import { useHttp } from '@navikt/familie-http';
import { RessursStatus, type Ressurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../typer/behandling';
import type { IRestEndretUtbetalingAndel } from '../../../typer/utbetalingAndel';

export const useBehandlingsresultat = (åpenBehandling: IBehandling) => {
    const { request } = useHttp();
    const { settÅpenBehandling } = useBehandling();

    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

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
                settOpprettelseFeilmelding(response.frontendFeilmelding);
            }
        });
    };

    return {
        opprettEndretUtbetaling,
        opprettelseFeilmelding,
        visFeilmeldinger,
        settVisFeilmeldinger,
    };
};
