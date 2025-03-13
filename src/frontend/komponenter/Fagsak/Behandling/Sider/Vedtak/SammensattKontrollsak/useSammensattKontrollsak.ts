import { useEffect, useState } from 'react';

import createUseContext from 'constate';

import { useHttp } from '@navikt/familie-http';
import { type Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../../../context/AppContext';
import {
    Behandlingstype,
    erBehandlingAvslått,
    erBehandlingFortsattInnvilget,
    type IBehandling,
} from '../../../../../../typer/behandling';
import type {
    IRestOpprettSammensattKontrollsak,
    IRestSammensattKontrollsak,
} from '../../../../../../typer/sammensatt-kontrollsak';
import { ToggleNavn } from '../../../../../../typer/toggles';

interface ISammensattKontrollsakProps {
    åpenBehandling: IBehandling;
}

export const [SammensattKontrollsakProvider, useSammensattKontrollsak] = createUseContext(
    ({ åpenBehandling }: ISammensattKontrollsakProps) => {
        const { behandlingId, resultat, type } = åpenBehandling;
        const { request } = useHttp();
        const { toggles } = useApp();
        const [feilmelding, settFeilmelding] = useState<string | undefined>(undefined);
        const [erSammensattKontrollsak, settErSammensattKontrollsak] = useState<boolean>(false);
        const [sammensattKontrollsak, settSammensattKontrollsak] =
            useState<IRestSammensattKontrollsak>();

        useEffect(() => {
            hentSammensattKontrollsak();
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

        const erIRestSammensattKontrollsak = (
            sammensattKontrollsak: IRestSammensattKontrollsak | undefined
        ): sammensattKontrollsak is IRestSammensattKontrollsak => !!sammensattKontrollsak;

        const opprettEllerOppdaterSammensattKontrollsak = (fritekst: string) => {
            settFeilmelding(undefined);
            if (erIRestSammensattKontrollsak(sammensattKontrollsak)) {
                oppdaterSammensattKontrollsak(sammensattKontrollsak, fritekst);
            } else {
                opprettSammensattKontrollsak(fritekst);
            }
        };

        const mottaRespons = (respons: Ressurs<IRestSammensattKontrollsak | undefined>) => {
            if (respons.status == RessursStatus.SUKSESS) {
                if (erIRestSammensattKontrollsak(respons.data)) {
                    settSammensattKontrollsak(respons.data);
                    settErSammensattKontrollsak(true);
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
            if (erIRestSammensattKontrollsak(sammensattKontrollsak)) {
                request<IRestSammensattKontrollsak, number>({
                    method: 'DELETE',
                    data: { ...sammensattKontrollsak },
                    url: `/familie-ba-sak/api/sammensatt-kontrollsak`,
                    påvirkerSystemLaster: true,
                }).then(() => {
                    settSammensattKontrollsak(undefined);
                    settErSammensattKontrollsak(false);
                });
            } else {
                settErSammensattKontrollsak(false);
            }
        };

        return {
            opprettEllerOppdaterSammensattKontrollsak,
            slettSammensattKontrollsak,
            feilmelding,
            sammensattKontrollsak,
            erSammensattKontrollsak,
            settErSammensattKontrollsak,
            skalViseSammensattKontrollsakMenyValg,
        };
    }
);
