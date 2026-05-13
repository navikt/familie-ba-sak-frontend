import type { PropsWithChildren } from 'react';
import { useState, createContext, useContext, useEffect } from 'react';

import { useNavigerAutomatiskTilSideForBehandlingssteg } from '@hooks/useNavigerAutomatiskTilSideForBehandlingssteg';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import type { IBehandling } from '@typer/behandling';
import { BehandlerRolle, BehandlingStatus, Behandlingstype } from '@typer/behandling';
import { FagsakType } from '@typer/fagsak';
import { hentSideHref } from '@utils/miljø';
import { useLocation } from 'react-router';

import { type Ressurs } from '@navikt/familie-typer';

import { useHentOgSettBehandlingContext } from './HentOgSettBehandlingContext';
import { useFagsakContext } from '../../FagsakContext';
import type { ITrinn, SideId } from '../Sider/sider';
import { hentTrinnForBehandling, KontrollertStatus } from '../Sider/sider';

interface Props extends PropsWithChildren {
    behandling: IBehandling;
}

interface BehandlingContextValue {
    leggTilBesøktSide: (besøktSide: SideId) => void;
    settIkkeKontrollerteSiderTilManglerKontroll: () => void;
    trinnPåBehandling: { [sideId: string]: ITrinn };
    behandling: IBehandling;
    erMigreringsbehandling: boolean;
    gjelderInstitusjon: boolean;
    gjelderEnsligMindreårig: boolean;
    gjelderSkjermetBarn: boolean;
    settÅpenBehandling: (behandling: Ressurs<IBehandling>) => void;
}

const BehandlingContext = createContext<BehandlingContextValue | undefined>(undefined);

export const BehandlingProvider = ({ behandling, children }: Props) => {
    const { fagsak } = useFagsakContext();
    const { settBehandlingRessurs } = useHentOgSettBehandlingContext();

    useNavigerAutomatiskTilSideForBehandlingssteg({ behandling });

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

    const kanBeslutteVedtak =
        behandling.status === BehandlingStatus.FATTER_VEDTAK &&
        BehandlerRolle.BESLUTTER === saksbehandler.rolle &&
        saksbehandler.email !== behandling.endretAv;

    const erMigreringsbehandling = behandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;
    const gjelderInstitusjon = fagsak.fagsakType === FagsakType.INSTITUSJON;
    const gjelderEnsligMindreårig = fagsak.fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG;
    const gjelderSkjermetBarn = fagsak.fagsakType === FagsakType.SKJERMET_BARN;

    return (
        <BehandlingContext.Provider
            value={{
                leggTilBesøktSide,
                settIkkeKontrollerteSiderTilManglerKontroll,
                trinnPåBehandling,
                behandling: behandling,
                erMigreringsbehandling,
                gjelderInstitusjon,
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
