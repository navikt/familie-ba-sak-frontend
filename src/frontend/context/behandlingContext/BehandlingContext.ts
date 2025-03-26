import React, { useEffect, useState } from 'react';

import createUseContext from 'constate';
import { useLocation, useNavigate } from 'react-router';

import { RessursStatus } from '@navikt/familie-typer';

import { useHentOgSettBehandling } from './HentOgSettBehandlingContext';
import useBehandlingApi from './useBehandlingApi';
import useBehandlingssteg from './useBehandlingssteg';
import { saksbehandlerHarKunLesevisning } from './util';
import useSakOgBehandlingParams from '../../hooks/useSakOgBehandlingParams';
import type { ISide, ITrinn, SideId } from '../../sider/Fagsak/Behandling/Sider/sider';
import {
    erViPåUdefinertFagsakSide,
    erViPåUlovligSteg,
    finnSideForBehandlingssteg,
    hentTrinnForBehandling,
    KontrollertStatus,
    sider,
} from '../../sider/Fagsak/Behandling/Sider/sider';
import { useFagsakContext } from '../../sider/Fagsak/FagsakContext';
import type { BehandlingSteg, IBehandling } from '../../typer/behandling';
import {
    BehandlerRolle,
    BehandlingStatus,
    Behandlingstype,
    BehandlingÅrsak,
} from '../../typer/behandling';
import { harTilgangTilEnhet } from '../../typer/enhet';
import { FagsakType } from '../../typer/fagsak';
import { PersonType } from '../../typer/person';
import { Målform } from '../../typer/søknad';
import { MIDLERTIDIG_BEHANDLENDE_ENHET_ID } from '../../utils/behandling';
import { hentSideHref } from '../../utils/miljø';
import { useApp } from '../AppContext';

interface Props {
    behandling: IBehandling;
}

const [BehandlingProvider, useBehandling] = createUseContext(({ behandling }: Props) => {
    const { fagsakId } = useSakOgBehandlingParams();
    const { minimalFagsakRessurs } = useFagsakContext();
    const { settBehandlingRessurs } = useHentOgSettBehandling();
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
    } = useApp();

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

    return {
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
    };
});

export { BehandlingProvider, useBehandling };
