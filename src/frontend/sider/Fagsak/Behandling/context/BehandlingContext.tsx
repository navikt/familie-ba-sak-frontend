import React, { createContext, useContext, useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { RessursStatus, type Ressurs } from '@navikt/familie-typer';

import { useHentOgSettBehandlingContext } from './HentOgSettBehandlingContext';
import useBehandlingApi from './useBehandlingApi';
import useBehandlingssteg from './useBehandlingssteg';
import { saksbehandlerHarKunLesevisning } from './utils';
import { useAppContext } from '../../../../context/AppContext';
import useSakOgBehandlingParams from '../../../../hooks/useSakOgBehandlingParams';
import type {
    BehandlingSteg,
    IBehandling,
    IOpprettBehandlingData,
    ISettPåVent,
} from '../../../../typer/behandling';
import {
    BehandlerRolle,
    BehandlingStatus,
    Behandlingstype,
    BehandlingÅrsak,
} from '../../../../typer/behandling';
import { harTilgangTilEnhet } from '../../../../typer/enhet';
import { FagsakType } from '../../../../typer/fagsak';
import type { ILogg } from '../../../../typer/logg';
import { PersonType } from '../../../../typer/person';
import { Målform } from '../../../../typer/søknad';
import type { IVedtaksperiodeMedBegrunnelser } from '../../../../typer/vedtaksperiode';
import { MIDLERTIDIG_BEHANDLENDE_ENHET_ID } from '../../../../utils/behandling';
import { hentSideHref } from '../../../../utils/miljø';
import { useFagsakContext } from '../../FagsakContext';
import {
    erViPåUdefinertFagsakSide,
    erViPåUlovligSteg,
    finnSideForBehandlingssteg,
    hentTrinnForBehandling,
    KontrollertStatus,
    sider,
} from '../Sider/sider';
import type { ISide, ITrinn, SideId } from '../Sider/sider';

interface Props extends React.PropsWithChildren {
    behandling: IBehandling;
}

interface BehandlingContextValue {
    vurderErLesevisning: (
        sjekkTilgangTilEnhet?: boolean,
        skalIgnorereOmEnhetErMidlertidig?: boolean
    ) => boolean;
    forrigeÅpneSide: ISide | undefined;
    hentStegPåÅpenBehandling: () => BehandlingSteg | undefined;
    leggTilBesøktSide: (besøktSide: SideId) => void;
    settIkkeKontrollerteSiderTilManglerKontroll: () => void;
    søkersMålform: Målform;
    trinnPåBehandling: { [sideId: string]: ITrinn };
    behandling: IBehandling;
    opprettBehandling: (data: IOpprettBehandlingData) => Promise<void | Ressurs<IBehandling>>;
    logg: Ressurs<ILogg[]>;
    hentLogg: () => void;
    behandlingsstegSubmitressurs: Ressurs<IBehandling>;
    vilkårsvurderingNesteOnClick: () => void;
    behandlingresultatNesteOnClick: () => void;
    oppdaterRegisteropplysninger: () => Promise<Ressurs<IBehandling>>;
    sendTilBeslutterNesteOnClick: (
        settVisModal: (visModal: boolean) => void,
        erUlagretNyFeilutbetaltValuta: boolean,
        erUlagretNyRefusjonEøs: boolean,
        vedtaksperioderMedBegrunnelserRessurs: Ressurs<IVedtaksperiodeMedBegrunnelser[]>,
        erSammensattKontrollsak: boolean
    ) => void;
    erMigreringsbehandling: boolean;
    aktivSettPåVent?: ISettPåVent | undefined;
    erBehandleneEnhetMidlertidig?: boolean;
    åpenHøyremeny: boolean;
    settÅpenHøyremeny: (åpenHøyremeny: boolean) => void;
    åpenVenstremeny: boolean;
    settÅpenVenstremeny: (åpenVenstremeny: boolean) => void;
    erBehandlingAvsluttet: boolean;
    gjelderInstitusjon: boolean;
    samhandlerOrgnr: string | undefined;
    gjelderEnsligMindreårig: boolean;
    settÅpenBehandling: (behandling: Ressurs<IBehandling>) => void;
}

const BehandlingContext = createContext<BehandlingContextValue | undefined>(undefined);

export const BehandlingProvider = ({ behandling, children }: Props) => {
    const { fagsakId } = useSakOgBehandlingParams();
    const { minimalFagsakRessurs } = useFagsakContext();
    const { settBehandlingRessurs } = useHentOgSettBehandlingContext();
    const [åpenHøyremeny, settÅpenHøyremeny] = useState(true);
    const [åpenVenstremeny, settÅpenVenstremeny] = useState(true);

    const {
        submitRessurs: behandlingsstegSubmitressurs,
        vilkårsvurderingNesteOnClick,
        behandlingresultatNesteOnClick,
        sendTilBeslutterNesteOnClick,
    } = useBehandlingssteg(settBehandlingRessurs, behandling);

    const { opprettBehandling, logg, hentLogg, oppdaterRegisteropplysninger } =
        useBehandlingApi(settBehandlingRessurs);

    const {
        harInnloggetSaksbehandlerSkrivetilgang,
        harInnloggetSaksbehandlerSuperbrukerTilgang,
        innloggetSaksbehandler,
        hentSaksbehandlerRolle,
    } = useAppContext();

    const navigate = useNavigate();
    const location = useLocation();
    const [forrigeÅpneSide, settForrigeÅpneSide] = React.useState<ISide | undefined>(undefined);
    const [trinnPåBehandling, settTrinnPåBehandling] = React.useState<{
        [sideId: string]: ITrinn;
    }>({});

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
                            sideHref === side.href
                                ? KontrollertStatus.KONTROLLERT
                                : KontrollertStatus.IKKE_KONTROLLERT,
                    },
                };
            }, {})
        );

        automatiskNavigeringTilSideForSteg();
    }, [behandling.behandlingId]);

    useEffect(() => {
        settForrigeÅpneSide(
            Object.values(sider).find((side: ISide) => location.pathname.includes(side.href))
        );
    }, [location.pathname]);

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

    const vurderErLesevisning = (
        sjekkTilgangTilEnhet = true,
        skalIgnorereOmEnhetErMidlertidig = false
    ): boolean => {
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

        const innloggetSaksbehandlerSkrivetilgang = harInnloggetSaksbehandlerSkrivetilgang();
        const saksbehandlerHarSuperbrukerRolle = harInnloggetSaksbehandlerSuperbrukerTilgang();
        const behandlingsårsak = åpenBehandlingData?.årsak;
        const behandlingsårsakErÅpenForAlleMedTilgangTilÅOppretteÅrsak =
            behandlingsårsak === BehandlingÅrsak.TEKNISK_ENDRING ||
            behandlingsårsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV;

        const saksbehandlerHarTilgangTilEnhet =
            behandlingsårsakErÅpenForAlleMedTilgangTilÅOppretteÅrsak ||
            saksbehandlerHarSuperbrukerRolle ||
            harTilgangTilEnhet(
                åpenBehandlingData?.arbeidsfordelingPåBehandling.behandlendeEnhetId ?? '',
                innloggetSaksbehandler?.groups ?? []
            );

        const steg = hentStegPåÅpenBehandling();

        return saksbehandlerHarKunLesevisning(
            innloggetSaksbehandlerSkrivetilgang,
            saksbehandlerHarTilgangTilEnhet,
            steg,
            sjekkTilgangTilEnhet
        );
    };

    const automatiskNavigeringTilSideForSteg = () => {
        const sideForSteg: ISide | undefined = finnSideForBehandlingssteg(behandling);

        if (
            (erViPåUdefinertFagsakSide(location.pathname) ||
                erViPåUlovligSteg(location.pathname, sideForSteg)) &&
            sideForSteg
        ) {
            navigate(`/fagsak/${fagsakId}/${behandling.behandlingId}/${sideForSteg.href}`);
        }
    };

    const søkersMålform: Målform =
        behandling.personer.find(person => person.type === PersonType.SØKER)?.målform ?? Målform.NB;

    const kanBeslutteVedtak =
        behandling.status === BehandlingStatus.FATTER_VEDTAK &&
        BehandlerRolle.BESLUTTER === hentSaksbehandlerRolle() &&
        innloggetSaksbehandler?.email !== behandling.endretAv;

    const erMigreringsbehandling = behandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    const erBehandleneEnhetMidlertidig =
        behandling.arbeidsfordelingPåBehandling.behandlendeEnhetId ===
        MIDLERTIDIG_BEHANDLENDE_ENHET_ID;

    const erBehandlingAvsluttet = behandling.status === BehandlingStatus.AVSLUTTET;

    const gjelderInstitusjon =
        minimalFagsakRessurs.status === RessursStatus.SUKSESS &&
        minimalFagsakRessurs.data.fagsakType === FagsakType.INSTITUSJON;

    const gjelderEnsligMindreårig =
        minimalFagsakRessurs.status === RessursStatus.SUKSESS &&
        minimalFagsakRessurs.data.fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG;

    const samhandlerOrgnr = gjelderInstitusjon
        ? minimalFagsakRessurs.data.institusjon?.orgNummer
        : undefined;

    return (
        <BehandlingContext.Provider
            value={{
                vurderErLesevisning,
                forrigeÅpneSide,
                hentStegPåÅpenBehandling,
                leggTilBesøktSide,
                settIkkeKontrollerteSiderTilManglerKontroll,
                søkersMålform,
                trinnPåBehandling,
                behandling: behandling,
                opprettBehandling,
                logg,
                hentLogg,
                behandlingsstegSubmitressurs,
                vilkårsvurderingNesteOnClick,
                behandlingresultatNesteOnClick,
                oppdaterRegisteropplysninger,
                sendTilBeslutterNesteOnClick,
                erMigreringsbehandling,
                aktivSettPåVent: behandling?.aktivSettPåVent,
                erBehandleneEnhetMidlertidig,
                åpenHøyremeny,
                settÅpenHøyremeny,
                åpenVenstremeny,
                settÅpenVenstremeny,
                erBehandlingAvsluttet,
                gjelderInstitusjon,
                samhandlerOrgnr,
                gjelderEnsligMindreårig,
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
