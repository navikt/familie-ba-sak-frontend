import { useState } from 'react';

import { useHistory } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import { byggFeiletRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { IOpprettBehandlingData, IOpprettEllerHentFagsakData } from '../../api/fagsak';
import { useFagsakRessurser } from '../../context/FagsakContext';
import { BehandlingÅrsak, IBehandling } from '../../typer/behandling';
import { IFagsak } from '../../typer/fagsak';
import { IPersonResultat } from '../../typer/vilkår';
import { erBehandlingenInnvilget, hentAktivBehandlingPåFagsak } from '../../utils/fagsak';

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
                } else if (response.status === RessursStatus.FEILET) {
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

    const opprettBehandling = (data: IOpprettBehandlingData): Promise<Ressurs<IFagsak>> => {
        settSenderInn(true);
        return request<IOpprettBehandlingData, IFagsak>({
            data,
            method: 'POST',
            url: '/familie-ba-sak/api/behandlinger',
        })
            .then((response: Ressurs<IFagsak>) => {
                settSenderInn(false);
                if (response.status === RessursStatus.SUKSESS) {
                    settFagsak(response);

                    const aktivBehandling: IBehandling | undefined = hentAktivBehandlingPåFagsak(
                        response.data
                    );

                    if (!aktivBehandling) {
                        settVisFeilmeldinger(true);
                        settFeilmelding('Opprettelse av behandling feilet');
                    } else if (aktivBehandling.årsak === BehandlingÅrsak.SØKNAD) {
                        history.push(
                            `/fagsak/${response.data.id}/${aktivBehandling?.behandlingId}/registrer-soknad`
                        );
                    } else {
                        history.push(
                            `/fagsak/${response.data.id}/${aktivBehandling?.behandlingId}/vilkaarsvurdering`
                        );
                    }
                } else if (response.status === RessursStatus.FEILET) {
                    settVisFeilmeldinger(true);
                    settFeilmelding(response.frontendFeilmelding);
                } else {
                    settVisFeilmeldinger(true);
                    settFeilmelding('Opprettelse av behandling feilet');
                }
                return response;
            })
            .catch(() => {
                settSenderInn(false);
                settVisFeilmeldinger(true);
                settFeilmelding('Opprettelse av behandling feilet');
                return byggFeiletRessurs('Opprettelse av behandling feilet');
            });
    };

    const validerVilkårsvurderingOgSendInn = (
        vilkårsvurdering: IPersonResultat[],
        fagsak: IFagsak
    ) => {
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

                    if (erBehandlingenInnvilget(vilkårsvurdering)) {
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
                    response.status === RessursStatus.FUNKSJONELL_FEIL
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

    return {
        opprettBehandling,
        opprettEllerHentFagsak,
        validerVilkårsvurderingOgSendInn,
        senderInn,
    };
};

export default useFagsakApi;
