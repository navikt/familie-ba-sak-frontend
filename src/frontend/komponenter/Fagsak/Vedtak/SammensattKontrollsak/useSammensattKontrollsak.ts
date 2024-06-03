import { useEffect, useState } from 'react';

import createUseContext from 'constate';

import { useHttp } from '@navikt/familie-http';
import { type Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../context/AppContext';
import {
    Behandlingstype,
    erBehandlingAvslått,
    erBehandlingFortsattInnvilget,
    type IBehandling,
} from '../../../../typer/behandling';
import type {
    IRestOpprettSammensattKontrollsak,
    IRestSammensattKontrollsak,
} from '../../../../typer/sammensatt-kontrollsak';
import { ToggleNavn } from '../../../../typer/toggles';

export interface ISammensattKontrollsakContext {
    opprettEllerOppdaterSammensattKontrollsak: (fritekst: string) => void;
    slettSammensattKontrollsak: () => void;
    feilmelding: string | undefined;
    sammensattKontrollsak?: IRestSammensattKontrollsak;
    visSammensattKontrollsak: boolean;
    settVisSammensattKontrollsak: (visSammensattKontrollsak: boolean) => void;
    skalViseSammensattKontrollsakMenyValg: () => boolean;
}

interface ISammensattKontrollsakProps {
    åpenBehandling: IBehandling;
}

export const [SammensattKontrollsakProvider, useSammensattKontrollsak] = createUseContext(
    ({ åpenBehandling }: ISammensattKontrollsakProps): ISammensattKontrollsakContext => {
        const { behandlingId, resultat, type } = åpenBehandling;
        const { request } = useHttp();
        const { toggles } = useApp();
        const [feilmelding, settFeilmelding] = useState<string | undefined>(undefined);
        const [visSammensattKontrollsak, settVisSammensattKontrollsak] = useState<boolean>(false);
        const [sammensattKontrollsak, settSammensattKontrollsak] =
            useState<IRestSammensattKontrollsak>();

        useEffect(() => {
            if (!sammensattKontrollsak) {
                hentSammensattKontrollsak();
            }
        }, [åpenBehandling.behandlingId]);

        const skalViseSammensattKontrollsakMenyValg = (): boolean => {
            if (!toggles[ToggleNavn.kanOppretteOgEndreSammensatteKontrollsaker]) {
                return false;
            }
            return (
                type !== Behandlingstype.FØRSTEGANGSBEHANDLING &&
                !erBehandlingAvslått(resultat) &&
                !erBehandlingFortsattInnvilget(resultat)
            );
        };

        const erSammensattKontrollsak = (
            sammensattKontrollsak: IRestSammensattKontrollsak | undefined
        ): sammensattKontrollsak is IRestSammensattKontrollsak => !!sammensattKontrollsak;

        const opprettEllerOppdaterSammensattKontrollsak = (fritekst: string) => {
            settFeilmelding(undefined);
            if (erSammensattKontrollsak(sammensattKontrollsak)) {
                oppdaterSammensattKontrollsak(sammensattKontrollsak, fritekst);
            } else {
                opprettSammensattKontrollsak(fritekst);
            }
        };

        const mottaRespons = (respons: Ressurs<IRestSammensattKontrollsak | undefined>) => {
            if (respons.status == RessursStatus.SUKSESS) {
                if (erSammensattKontrollsak(respons.data)) {
                    settSammensattKontrollsak(respons.data);
                    settVisSammensattKontrollsak(true);
                }
            } else if (
                respons.status === RessursStatus.FEILET ||
                respons.status === RessursStatus.FUNKSJONELL_FEIL ||
                respons.status === RessursStatus.IKKE_TILGANG
            ) {
                settFeilmelding(respons.frontendFeilmelding);
            }
        };

        const hentSammensattKontrollsak = () => {
            request<void, IRestSammensattKontrollsak>({
                method: 'GET',
                url: `/familie-ba-sak/api/sammensatt-kontrollsak/${behandlingId}`,
            }).then(mottaRespons);
        };

        const opprettSammensattKontrollsak = (fritekst: string) => {
            request<IRestOpprettSammensattKontrollsak, IRestSammensattKontrollsak>({
                method: 'POST',
                data: { behandlingId: behandlingId, fritekst: fritekst },
                url: `/familie-ba-sak/api/sammensatt-kontrollsak`,
                påvirkerSystemLaster: true,
            }).then(mottaRespons);
        };

        const oppdaterSammensattKontrollsak = (
            sammensattKontrollsak: IRestSammensattKontrollsak,
            fritekst: string
        ) => {
            request<IRestSammensattKontrollsak, IRestSammensattKontrollsak>({
                method: 'PUT',
                data: { ...sammensattKontrollsak, fritekst: fritekst },
                url: `/familie-ba-sak/api/sammensatt-kontrollsak`,
                påvirkerSystemLaster: true,
            }).then(mottaRespons);
        };

        const slettSammensattKontrollsak = () => {
            settFeilmelding(undefined);
            if (erSammensattKontrollsak(sammensattKontrollsak)) {
                request<IRestSammensattKontrollsak, number>({
                    method: 'DELETE',
                    data: { ...sammensattKontrollsak },
                    url: `/familie-ba-sak/api/sammensatt-kontrollsak`,
                    påvirkerSystemLaster: true,
                }).then(() => {
                    settSammensattKontrollsak(undefined);
                    settVisSammensattKontrollsak(false);
                });
            } else {
                settVisSammensattKontrollsak(false);
            }
        };

        return {
            opprettEllerOppdaterSammensattKontrollsak,
            slettSammensattKontrollsak,
            feilmelding,
            sammensattKontrollsak,
            visSammensattKontrollsak,
            settVisSammensattKontrollsak,
            skalViseSammensattKontrollsakMenyValg,
        };
    }
);
