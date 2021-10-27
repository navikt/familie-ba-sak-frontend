import { useEffect, useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import { feil, FeltState, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import { byggHenterRessurs, byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../../context/AppContext';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import {
    IBehandlingstema,
    IRestEndreBehandlingUnderkategori,
    isIBehandlingstema,
    tilBehandlingstema,
} from '../../../../../typer/behandlingstema';
import { IFagsak } from '../../../../../typer/fagsak';
import { ToggleNavn } from '../../../../../typer/toggles';

const useEndreBehandlingstema = (lukkModal: () => void) => {
    const { toggles } = useApp();
    const { request } = useHttp();
    const { settFagsak } = useFagsakRessurser();
    const { åpenBehandling } = useBehandling();

    const [ressurs, settRessurs] = useState(byggTomRessurs());

    const { skjema } = useSkjema<{ behandlingstema: IBehandlingstema | '' }, string>({
        felter: {
            behandlingstema: useFelt<IBehandlingstema | ''>({
                verdi: '',
                valideringsfunksjon: (felt: FeltState<IBehandlingstema | ''>) => {
                    if (!toggles[ToggleNavn.brukEøs]) {
                        return ok(felt);
                    }
                    return felt.verdi ? ok(felt) : feil(felt, 'Behandlingstema må settes.');
                },
            }),
        },
        skjemanavn: 'Endre behandlingstema',
    });

    useEffect(() => {
        nullstillSkjema();
    }, [åpenBehandling]);

    const endreBehandlingstema = (behandlingId: number) => {
        const { behandlingstema } = skjema.felter;
        if (isIBehandlingstema(behandlingstema)) {
            const { kategori, underkategori } = behandlingstema;
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

export default useEndreBehandlingstema;
