import { useState } from 'react';
import { useHistory } from 'react-router';
import { IOpprettBehandlingData, IOpprettEllerHentFagsakData } from '../../api/fagsak';
import { useApp } from '../../context/AppContext';
import { useFagsakRessurser } from '../../context/FagsakContext';
import { Behandlingstype, IBehandling } from '../../typer/behandling';
import { IFagsak } from '../../typer/fagsak';
import { Ressurs, RessursStatus } from '../../typer/ressurs';
import { IPersonResultat } from '../../typer/vilkår';
import { erBehandlingenInnvilget, hentAktivBehandlingPåFagsak } from '../../utils/fagsak';

const useFagsakApi = (
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void,
    settFeilmelding: (feilmelding: string) => void
) => {
    const { settFagsak } = useFagsakRessurser();
    const { axiosRequest } = useApp();

    const history = useHistory();
    const [senderInn, settSenderInn] = useState(false);

    const opprettEllerHentFagsak = (data: IOpprettEllerHentFagsakData) => {
        settSenderInn(true);
        axiosRequest<IFagsak, IOpprettEllerHentFagsakData>({
            data,
            method: 'POST',
            url: `/familie-ba-sak/api/fagsaker`,
        })
            .then((response: Ressurs<IFagsak>) => {
                settSenderInn(false);
                if (response.status === RessursStatus.SUKSESS) {
                    settFagsak(response);
                    history.push(`/fagsak/${response.data.id}/saksoversikt`);
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

    const opprettBehandling = (data: IOpprettBehandlingData) => {
        settSenderInn(true);
        axiosRequest<IFagsak, IOpprettBehandlingData>({
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
                    } else if (aktivBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD) {
                        history.push(
                            `/fagsak/${response.data.id}/${aktivBehandling?.behandlingId}/vilkaarsvurdering`
                        );
                    } else {
                        history.push(
                            `/fagsak/${response.data.id}/${aktivBehandling?.behandlingId}/registrer-soknad`
                        );
                    }

                    return;
                } else if (response.status === RessursStatus.FEILET) {
                    settVisFeilmeldinger(true);
                    settFeilmelding(response.frontendFeilmelding);
                } else {
                    settVisFeilmeldinger(true);
                    settFeilmelding('Opprettelse av behandling feilet');
                }
            })
            .catch(() => {
                settSenderInn(false);
                settVisFeilmeldinger(true);
                settFeilmelding('Opprettelse av behandling feilet');
            });
    };

    const validerVilkårsvurderingOgSendInn = (
        vilkårsvurdering: IPersonResultat[],
        fagsak: IFagsak
    ) => {
        const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);

        axiosRequest<IFagsak, void>({
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
                } else if (response.status === RessursStatus.FEILET) {
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
