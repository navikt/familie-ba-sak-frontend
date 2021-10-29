import { useEffect, useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import { feil, FeltState, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import { byggHenterRessurs, byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import {
    IBehandlingstema,
    IRestEndreBehandlingUnderkategori,
    tilBehandlingstema,
} from '../../../../../typer/behandlingstema';
import { IFagsak } from '../../../../../typer/fagsak';

const useEndreBehandling = (lukkModal: () => void) => {
    const { request } = useHttp();
    const { settFagsak } = useFagsakRessurser();
    const { åpenBehandling } = useBehandling();

    const [ressurs, settRessurs] = useState(byggTomRessurs());

    const { skjema } = useSkjema<{ behandlingstema: IBehandlingstema | undefined }, string>({
        felter: {
            behandlingstema: useFelt<IBehandlingstema | undefined>({
                verdi: undefined,
                valideringsfunksjon: (felt: FeltState<IBehandlingstema | undefined>) =>
                    felt.verdi ? ok(felt) : feil(felt, 'Behandlingstema må settes.'),
            }),
        },
        skjemanavn: 'Endre behandlingstema',
    });

    useEffect(() => {
        nullstillSkjema();
    }, [åpenBehandling]);

    const endreBehandlingstema = (behandlingId: number) => {
        const { behandlingstema } = skjema.felter;
        if (behandlingstema.verdi !== undefined) {
            const { kategori, underkategori } = behandlingstema.verdi;
            settRessurs(byggHenterRessurs());
            request<IRestEndreBehandlingUnderkategori, IFagsak>({
                method: 'PUT',
                data: { behandlingUnderkategori: underkategori, behandlingKategori: kategori },
                url: `/familie-ba-sak/api/behandlinger/${behandlingId}/behandlingstema`,
            }).then((oppdatertFagsak: Ressurs<IFagsak>) => {
                if (oppdatertFagsak.status === RessursStatus.SUKSESS) {
                    settFagsak(oppdatertFagsak);
                    settRessurs(byggTomRessurs());
                }
                settRessurs(oppdatertFagsak);
            });
        }
        lukkModal();
    };

    const nullstillSkjema = () => {
        if (åpenBehandling.status === RessursStatus.SUKSESS) {
            const { kategori, underkategori } = åpenBehandling.data;

            skjema.felter.behandlingstema.validerOgSettFelt(
                tilBehandlingstema(kategori, underkategori)
            );
        }
    };

    return {
        skjema,
        nullstillSkjema,
        endreBehandlingstema,
        ressurs,
    };
};

export default useEndreBehandling;
