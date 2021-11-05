import { useState } from 'react';

import { useHistory } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { IOpprettEllerHentFagsakData } from '../../api/fagsak';
import { useFagsakRessurser } from '../../context/FagsakContext';
import { BehandlingResultat, IBehandling } from '../../typer/behandling';
import { IFagsak } from '../../typer/fagsak';
import { defaultFunksjonellFeil } from '../../typer/feilmeldinger';
import { hentAktivBehandlingPåFagsak } from '../../utils/fagsak';

const useFagsakApi = (
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void,
    settFeilmelding: (feilmelding: string) => void
) => {
    const { settFagsak } = useFagsakRessurser();
    const { request } = useHttp();

    const history = useHistory();
    const [senderInn, settSenderInn] = useState(false);

    const opprettEllerHentFagsak = (data: IOpprettEllerHentFagsakData) => {
        settSenderInn(true);
        request<IOpprettEllerHentFagsakData, IFagsak>({
            data,
            method: 'POST',
            url: `/familie-ba-sak/api/fagsaker`,
        })
            .then((response: Ressurs<IFagsak>) => {
                settSenderInn(false);
                if (response.status === RessursStatus.SUKSESS) {
                    settFagsak(response);

                    const aktivBehandling: IBehandling | undefined = hentAktivBehandlingPåFagsak(
                        response.data
                    );
                    aktivBehandling
                        ? history.push(
                              `/fagsak/${response.data.id}/${aktivBehandling.behandlingId}`
                          )
                        : history.push(`/fagsak/${response.data.id}/saksoversikt`);
                } else if (
                    response.status === RessursStatus.FEILET ||
                    response.status === RessursStatus.FUNKSJONELL_FEIL ||
                    response.status === RessursStatus.IKKE_TILGANG
                ) {
                    settVisFeilmeldinger(true);
                    settFeilmelding(response.frontendFeilmelding);
                } else {
                    settVisFeilmeldinger(true);
                    settFeilmelding('Opprettelse av fagsak feilet');
                }
            })
            .catch(() => {
                settSenderInn(false);
                settVisFeilmeldinger(true);
                settFeilmelding('Opprettelse av fagsak feilet');
            });
    };

    const validerVilkårsvurderingOgSendInn = (fagsak: IFagsak) => {
        const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);
        settSenderInn(true);

        request<void, IFagsak>({
            method: 'POST',
            url: `/familie-ba-sak/api/vilkaarsvurdering/${aktivBehandling?.behandlingId}/valider`,
        })
            .then((response: Ressurs<IFagsak>) => {
                settSenderInn(false);
                if (response.status === RessursStatus.SUKSESS) {
                    settFagsak(response);

                    const aktivBehandling: IBehandling | undefined = hentAktivBehandlingPåFagsak(
                        response.data
                    );

                    if (aktivBehandling?.resultat !== BehandlingResultat.AVSLÅTT) {
                        history.push(
                            `/fagsak/${fagsak.id}/${aktivBehandling?.behandlingId}/tilkjent-ytelse`
                        );
                    } else {
                        history.push(
                            `/fagsak/${fagsak.id}/${aktivBehandling?.behandlingId}/vedtak`
                        );
                    }
                } else if (
                    response.status === RessursStatus.FEILET ||
                    response.status === RessursStatus.FUNKSJONELL_FEIL ||
                    response.status === RessursStatus.IKKE_TILGANG
                ) {
                    settFeilmelding(response.frontendFeilmelding);
                    settVisFeilmeldinger(true);
                } else {
                    settFeilmelding('Validering av vilkårsvurdering feilet');
                    settVisFeilmeldinger(true);
                }
            })
            .catch(() => {
                settSenderInn(false);
                settFeilmelding('Validering av vilkårsvurdering feilet');
            });
    };

    const behandlingresultatNesteOnClick = (fagsak: IFagsak) => {
        const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);
        settSenderInn(true);
        settFeilmelding('');

        request<void, IFagsak>({
            method: 'POST',
            url: `/familie-ba-sak/api/behandlinger/${aktivBehandling?.behandlingId}/steg/behandlingsresultat`,
        })
            .then((response: Ressurs<IFagsak>) => {
                settSenderInn(false);

                if (response.status === RessursStatus.SUKSESS) {
                    settFagsak(response);

                    const aktivBehandling: IBehandling | undefined = hentAktivBehandlingPåFagsak(
                        response.data
                    );

                    if (aktivBehandling?.resultat !== BehandlingResultat.AVSLÅTT) {
                        history.push(
                            `/fagsak/${fagsak.id}/${aktivBehandling?.behandlingId}/simulering`
                        );
                    } else {
                        history.push(
                            `/fagsak/${fagsak.id}/${aktivBehandling?.behandlingId}/vedtak`
                        );
                    }
                } else if (
                    response.status === RessursStatus.FEILET ||
                    response.status === RessursStatus.FUNKSJONELL_FEIL ||
                    response.status === RessursStatus.IKKE_TILGANG
                ) {
                    settFeilmelding(response.frontendFeilmelding);
                }
            })
            .catch(() => {
                settSenderInn(false);
                settFeilmelding(defaultFunksjonellFeil);
            });
    };

    return {
        opprettEllerHentFagsak,
        validerVilkårsvurderingOgSendInn,
        behandlingresultatNesteOnClick,
        senderInn,
    };
};

export default useFagsakApi;
