import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { useState } from 'react';
import { useHistory } from 'react-router';
import {
    IOpprettBehandlingData,
    IOpprettEllerHentFagsakData,
    IRestVilkårsvurdering,
} from '../../api/fagsak';
import { useApp } from '../../context/AppContext';
import { useFagsakRessurser } from '../../context/FagsakContext';
import { hentBegrunnelse, hentPeriode, hentResultat } from '../../context/Vilkårsvurdering/utils';
import { Behandlingstype, IBehandling } from '../../typer/behandling';
import { IFagsak } from '../../typer/fagsak';
import { IFelt } from '../../typer/felt';
import { Ressurs, RessursStatus } from '../../typer/ressurs';
import {
    IPersonResultat,
    IRestVilkårResultat,
    IVilkårConfig,
    IVilkårResultat,
    vilkårConfig,
} from '../../typer/vilkår';
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
                    settFeilmelding(response.melding);
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
                            `/fagsak/${response.data.id}/${aktivBehandling &&
                                aktivBehandling.behandlingId}/vilkaarsvurdering`
                        );
                    } else {
                        history.push(
                            `/fagsak/${response.data.id}/${aktivBehandling &&
                                aktivBehandling.behandlingId}/registrer-soknad`
                        );
                    }

                    return;
                } else if (response.status === RessursStatus.FEILET) {
                    settVisFeilmeldinger(true);
                    settFeilmelding(response.melding);
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

    const opprettEllerOppdaterVilkårsvurdering = (
        vilkårsvurdering: IPersonResultat[],
        fagsak: IFagsak
    ) => {
        // Basic validering av skjemaet
        const feilmeldinger: FeiloppsummeringFeil[] = [];
        vilkårsvurdering.filter((personResultat: IPersonResultat) =>
            Object.values(vilkårConfig)
                .filter((vc: IVilkårConfig) =>
                    vc.parterDetteGjelderFor.includes(personResultat.person.type)
                )
                .forEach((vc: IVilkårConfig) => {
                    if (
                        personResultat.vilkårResultater.find(
                            (vilkårResultat: IFelt<IVilkårResultat>) =>
                                vilkårResultat.verdi.vilkårType === vc.key &&
                                vilkårResultat.verdi.resultat !== undefined
                        ) === undefined
                    ) {
                        feilmeldinger.push({
                            skjemaelementId: `${vc.key}_${personResultat.personIdent}`,
                            feilmelding: `Vilkåret '${vc.key}' er ikke vurdert for ${personResultat.person.navn}`,
                        });
                    }
                })
        );

        settSenderInn(true);
        axiosRequest<IFagsak, IRestVilkårsvurdering>({
            data: {
                personResultater: vilkårsvurdering.map((personResultat: IPersonResultat) => {
                    return {
                        personIdent: personResultat.personIdent,
                        vilkårResultater: personResultat.vilkårResultater.map(
                            (vilkårResultat: IFelt<IVilkårResultat>): IRestVilkårResultat => ({
                                begrunnelse: hentBegrunnelse(vilkårResultat),
                                periodeFom: hentPeriode(vilkårResultat).fom,
                                periodeTom: hentPeriode(vilkårResultat).tom,
                                resultat: hentResultat(vilkårResultat),
                                vilkårType: vilkårResultat.verdi.vilkårType,
                            })
                        ),
                    };
                }),
            },
            method: 'PUT',
            url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/vedtak`,
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
                            `/fagsak/${fagsak.id}/${aktivBehandling &&
                                aktivBehandling.behandlingId}/tilkjent-ytelse`
                        );
                    } else {
                        history.push(
                            `/fagsak/${fagsak.id}/${aktivBehandling &&
                                aktivBehandling.behandlingId}/vedtak`
                        );
                    }
                } else if (response.status === RessursStatus.FEILET) {
                    settFeilmelding(response.frontendFeilmelding);
                    settVisFeilmeldinger(true);
                } else {
                    settFeilmelding('Opprettelse av vilkårsvurdering feilet');
                    settVisFeilmeldinger(true);
                }
            })
            .catch(() => {
                settSenderInn(false);
                settFeilmelding('Opprettelse av vilkårsvurdering feilet');
            });
    };

    return {
        opprettBehandling,
        opprettEllerHentFagsak,
        opprettEllerOppdaterVilkårsvurdering,
        senderInn,
    };
};

export default useFagsakApi;
