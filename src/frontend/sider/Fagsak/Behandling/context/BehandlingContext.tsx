import type { PropsWithChildren } from 'react';
import { useState, createContext, useContext, useEffect } from 'react';

import { useNavigerAutomatiskTilSideForBehandlingssteg } from '@hooks/useNavigerAutomatiskTilSideForBehandlingssteg';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import type { BehandlingSteg, IBehandling } from '@typer/behandling';
import { BehandlerRolle, BehandlingStatus, Behandlingstype, BehandlingÅrsak } from '@typer/behandling';
import { harTilgangTilEnhet } from '@typer/enhet';
import { FagsakStatus, FagsakType } from '@typer/fagsak';
import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';
import { MIDLERTIDIG_BEHANDLENDE_ENHET_ID } from '@utils/behandling';
import { hentSideHref } from '@utils/miljø';
import { useLocation } from 'react-router';

import { type Ressurs } from '@navikt/familie-typer';

import { useHentOgSettBehandlingContext } from './HentOgSettBehandlingContext';
import useBehandlingssteg from './useBehandlingssteg';
import { saksbehandlerHarKunLesevisning } from './utils';
import { useFagsakContext } from '../../FagsakContext';
import type { ITrinn, SideId } from '../Sider/sider';
import { hentTrinnForBehandling, KontrollertStatus } from '../Sider/sider';

interface Props extends PropsWithChildren {
    behandling: IBehandling;
}

interface BehandlingContextValue {
    /**
     * @Deprecated - Erstattes av {@link useErLesevisning}.
     */
    vurderErLesevisning: (sjekkTilgangTilEnhet?: boolean, skalIgnorereOmEnhetErMidlertidig?: boolean) => boolean;
    leggTilBesøktSide: (besøktSide: SideId) => void;
    settIkkeKontrollerteSiderTilManglerKontroll: () => void;
    trinnPåBehandling: { [sideId: string]: ITrinn };
    behandling: IBehandling;
    behandlingsstegSubmitressurs: Ressurs<IBehandling>;
    vilkårsvurderingNesteOnClick: () => void;
    behandlingresultatNesteOnClick: () => void;
    sendTilBeslutterNesteOnClick: (
        settVisModal: (visModal: boolean) => void,
        erUlagretNyFeilutbetaltValuta: boolean,
        erUlagretNyRefusjonEøs: boolean,
        vedtaksperioderMedBegrunnelser: IVedtaksperiodeMedBegrunnelser[] | undefined,
        erSammensattKontrollsak: boolean
    ) => void;
    erMigreringsbehandling: boolean;
    gjelderInstitusjon: boolean;
    samhandlerOrgnr: string | undefined;
    gjelderEnsligMindreårig: boolean;
    gjelderSkjermetBarn: boolean;
    settÅpenBehandling: (behandling: Ressurs<IBehandling>) => void;
}

const BehandlingContext = createContext<BehandlingContextValue | undefined>(undefined);

export const BehandlingProvider = ({ behandling, children }: Props) => {
    const { fagsak } = useFagsakContext();
    const { settBehandlingRessurs } = useHentOgSettBehandlingContext();

    useNavigerAutomatiskTilSideForBehandlingssteg({ behandling });

    const {
        submitRessurs: behandlingsstegSubmitressurs,
        vilkårsvurderingNesteOnClick,
        behandlingresultatNesteOnClick,
        sendTilBeslutterNesteOnClick,
    } = useBehandlingssteg(settBehandlingRessurs, behandling);

    const saksbehandler = useSaksbehandler();

    const location = useLocation();
    const [trinnPåBehandling, settTrinnPåBehandling] = useState<{ [sideId: string]: ITrinn }>({});

    useEffect(() => {
        const siderPåBehandling = hentTrinnForBehandling(behandling);

        const sideHref = hentSideHref(location.pathname);
        settTrinnPåBehandling(
            Object.entries(siderPåBehandling).reduce((acc, [sideId, side]) => {
                return {
                    ...acc,
                    [sideId]: {
                        ...side,
                        kontrollert:
                            sideHref === side.href ? KontrollertStatus.KONTROLLERT : KontrollertStatus.IKKE_KONTROLLERT,
                    },
                };
            }, {})
        );
    }, [behandling.behandlingId]);

    const leggTilBesøktSide = (besøktSide: SideId) => {
        if (kanBeslutteVedtak) {
            settTrinnPåBehandling({
                ...trinnPåBehandling,
                [besøktSide]: {
                    ...trinnPåBehandling[besøktSide],
                    kontrollert: KontrollertStatus.KONTROLLERT,
                },
            });
        }
    };

    const settIkkeKontrollerteSiderTilManglerKontroll = () => {
        settTrinnPåBehandling(
            Object.entries(trinnPåBehandling).reduce((acc, [sideId, trinn]) => {
                if (trinn.kontrollert === KontrollertStatus.IKKE_KONTROLLERT) {
                    return {
                        ...acc,
                        [sideId]: {
                            ...trinn,
                            kontrollert: KontrollertStatus.MANGLER_KONTROLL,
                        },
                    };
                } else return acc;
            }, trinnPåBehandling)
        );
    };

    const hentStegPåÅpenBehandling = (): BehandlingSteg | undefined => {
        return behandling?.steg;
    };

    /**
     * @Deprecated - Erstattes av {@link useErLesevisning}.
     */
    const vurderErLesevisning = (sjekkTilgangTilEnhet = true, skalIgnorereOmEnhetErMidlertidig = false): boolean => {
        if (fagsak.status === FagsakStatus.LÅST) {
            return true;
        }
        const åpenBehandlingData = behandling;
        if (
            åpenBehandlingData?.status === BehandlingStatus.SATT_PÅ_VENT ||
            åpenBehandlingData?.status === BehandlingStatus.SATT_PÅ_MASKINELL_VENT
        ) {
            return true;
        }
        if (erBehandleneEnhetMidlertidig && !skalIgnorereOmEnhetErMidlertidig) {
            return true;
        }

        const behandlingsårsak = åpenBehandlingData?.årsak;
        const behandlingsårsakErÅpenForAlleMedTilgangTilÅOppretteÅrsak =
            behandlingsårsak === BehandlingÅrsak.TEKNISK_ENDRING ||
            behandlingsårsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV;

        const saksbehandlerHarTilgangTilEnhet =
            behandlingsårsakErÅpenForAlleMedTilgangTilÅOppretteÅrsak ||
            saksbehandler.harSuperbrukertilgang ||
            harTilgangTilEnhet(
                åpenBehandlingData?.arbeidsfordelingPåBehandling.behandlendeEnhetId ?? '',
                saksbehandler.groups
            );

        const steg = hentStegPåÅpenBehandling();

        return saksbehandlerHarKunLesevisning(
            saksbehandler.harSkrivetilgang,
            saksbehandlerHarTilgangTilEnhet,
            steg,
            sjekkTilgangTilEnhet
        );
    };

    const kanBeslutteVedtak =
        behandling.status === BehandlingStatus.FATTER_VEDTAK &&
        BehandlerRolle.BESLUTTER === saksbehandler.rolle &&
        saksbehandler.email !== behandling.endretAv;

    const erMigreringsbehandling = behandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    const erBehandleneEnhetMidlertidig =
        behandling.arbeidsfordelingPåBehandling.behandlendeEnhetId === MIDLERTIDIG_BEHANDLENDE_ENHET_ID;

    const gjelderInstitusjon = fagsak.fagsakType === FagsakType.INSTITUSJON;
    const gjelderEnsligMindreårig = fagsak.fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG;
    const gjelderSkjermetBarn = fagsak.fagsakType === FagsakType.SKJERMET_BARN;

    const samhandlerOrgnr = gjelderInstitusjon ? fagsak.institusjon?.orgNummer : undefined;

    return (
        <BehandlingContext.Provider
            value={{
                vurderErLesevisning,
                leggTilBesøktSide,
                settIkkeKontrollerteSiderTilManglerKontroll,
                trinnPåBehandling,
                behandling: behandling,
                behandlingsstegSubmitressurs,
                vilkårsvurderingNesteOnClick,
                behandlingresultatNesteOnClick,
                sendTilBeslutterNesteOnClick,
                erMigreringsbehandling,
                gjelderInstitusjon,
                samhandlerOrgnr,
                gjelderEnsligMindreårig,
                gjelderSkjermetBarn,
                settÅpenBehandling: settBehandlingRessurs,
            }}
        >
            {children}
        </BehandlingContext.Provider>
    );
};

export const useBehandlingContext = () => {
    const context = useContext(BehandlingContext);

    if (context === undefined) {
        throw new Error('useBehandlingContext må brukes innenfor en BehandlingProvider');
    }

    return context;
};
