import React, { createContext, useContext, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { type Ressurs } from '@navikt/familie-typer';

import { useHentOgSettBehandlingContext } from './HentOgSettBehandlingContext';
import useBehandlingssteg from './useBehandlingssteg';
import { saksbehandlerHarKunLesevisning } from './utils';
import { useAppContext } from '../../../../context/AppContext';
import useSakOgBehandlingParams from '../../../../hooks/useSakOgBehandlingParams';
import type { BehandlingSteg, IBehandling, ISettPåVent } from '../../../../typer/behandling';
import { BehandlerRolle, BehandlingStatus, Behandlingstype, BehandlingÅrsak } from '../../../../typer/behandling';
import { harTilgangTilEnhet } from '../../../../typer/enhet';
import { FagsakType } from '../../../../typer/fagsak';
import { PersonType } from '../../../../typer/person';
import { Målform } from '../../../../typer/søknad';
import type { IVedtaksperiodeMedBegrunnelser } from '../../../../typer/vedtaksperiode';
import { MIDLERTIDIG_BEHANDLENDE_ENHET_ID } from '../../../../utils/behandling';
import { hentSideHref } from '../../../../utils/miljø';
import { useFagsakContext } from '../../FagsakContext';
import type { ISide, ITrinn, SideId } from '../Sider/sider';
import {
    erViPåUdefinertFagsakSide,
    erViPåUlovligSteg,
    finnSideForBehandlingssteg,
    hentTrinnForBehandling,
    KontrollertStatus,
} from '../Sider/sider';

interface Props extends React.PropsWithChildren {
    behandling: IBehandling;
}

interface BehandlingContextValue {
    vurderErLesevisning: (sjekkTilgangTilEnhet?: boolean, skalIgnorereOmEnhetErMidlertidig?: boolean) => boolean;
    leggTilBesøktSide: (besøktSide: SideId) => void;
    settIkkeKontrollerteSiderTilManglerKontroll: () => void;
    søkersMålform: Målform;
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
    aktivSettPåVent?: ISettPåVent | undefined;
    gjelderInstitusjon: boolean;
    samhandlerOrgnr: string | undefined;
    gjelderEnsligMindreårig: boolean;
    gjelderSkjermetBarn: boolean;
    settÅpenBehandling: (behandling: Ressurs<IBehandling>) => void;
}

const BehandlingContext = createContext<BehandlingContextValue | undefined>(undefined);

export const BehandlingProvider = ({ behandling, children }: Props) => {
    const { fagsakId } = useSakOgBehandlingParams();
    const { fagsak } = useFagsakContext();
    const { settBehandlingRessurs } = useHentOgSettBehandlingContext();

    const {
        submitRessurs: behandlingsstegSubmitressurs,
        vilkårsvurderingNesteOnClick,
        behandlingresultatNesteOnClick,
        sendTilBeslutterNesteOnClick,
    } = useBehandlingssteg(settBehandlingRessurs, behandling);

    const {
        harInnloggetSaksbehandlerSkrivetilgang,
        harInnloggetSaksbehandlerSuperbrukerTilgang,
        innloggetSaksbehandler,
        hentSaksbehandlerRolle,
    } = useAppContext();

    const navigate = useNavigate();
    const location = useLocation();
    const [trinnPåBehandling, settTrinnPåBehandling] = React.useState<{ [sideId: string]: ITrinn }>({});

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

        automatiskNavigeringTilSideForSteg();
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

    const vurderErLesevisning = (sjekkTilgangTilEnhet = true, skalIgnorereOmEnhetErMidlertidig = false): boolean => {
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
            (erViPåUdefinertFagsakSide(location.pathname) || erViPåUlovligSteg(location.pathname, sideForSteg)) &&
            sideForSteg
        ) {
            navigate(`/fagsak/${fagsakId}/${behandling.behandlingId}/${sideForSteg.href}`, {
                replace: true,
            });
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
                søkersMålform,
                trinnPåBehandling,
                behandling: behandling,
                behandlingsstegSubmitressurs,
                vilkårsvurderingNesteOnClick,
                behandlingresultatNesteOnClick,
                sendTilBeslutterNesteOnClick,
                erMigreringsbehandling,
                aktivSettPåVent: behandling?.aktivSettPåVent,
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
