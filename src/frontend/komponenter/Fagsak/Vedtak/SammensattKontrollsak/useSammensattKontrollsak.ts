import { useState } from 'react';
import * as React from 'react';

import { useHttp } from '@navikt/familie-http';
import { type Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
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
    fritekst: string;
    settFritekst: (fritekst: string) => void;
    fritekstErEndret: boolean;
    opprettEllerOppdaterSammensattKontrollsak: () => void;
    slettSammensattKontrollsak: (sammensattKontrollsak: IRestSammensattKontrollsak) => void;
    erSammensattKontrollsak: (
        sammensattKontrollsak?: IRestSammensattKontrollsak
    ) => sammensattKontrollsak is IRestSammensattKontrollsak;
    feilmelding?: string;
    visSammensattKontrollsak: boolean;
    settVisSammensattKontrollsak: (visSammensattKontrollsak: boolean) => void;
    nullstillSammensattKontrollsak: () => void;
    skalViseSammensattKontrollsakMenyValg: () => boolean;
}

export const useSammensattKontrollsak = (): ISammensattKontrollsakContext => {
    const {
        behandling: { behandlingId, sammensattKontrollsak, resultat, type },
        settÅpenBehandling,
    } = useBehandling();
    const { toggles } = useApp();
    const { request } = useHttp();
    const [fritekst, settFritekst] = useState(sammensattKontrollsak?.fritekst ?? '');
    const [feilmelding, settFeilmelding] = useState<string | undefined>(undefined);
    const [visSammensattKontrollsak, settVisSammensattKontrollsak] =
        React.useState(!!sammensattKontrollsak);

    const fritekstErEndret = fritekst !== (sammensattKontrollsak?.fritekst ?? '');

    const erSammensattKontrollsak = (
        sammensattKontrollsak: IRestSammensattKontrollsak | undefined
    ): sammensattKontrollsak is IRestSammensattKontrollsak => !!sammensattKontrollsak;

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

    const opprettEllerOppdaterSammensattKontrollsak = () => {
        settFeilmelding(undefined);
        if (erSammensattKontrollsak(sammensattKontrollsak)) {
            oppdaterSammensattKontrollsak(sammensattKontrollsak);
        } else {
            opprettSammensattKontrollsak();
        }
    };

    const mottaRespons = (respons: Ressurs<IBehandling>, onSuccess: () => void = () => {}) => {
        if (respons.status == RessursStatus.SUKSESS) {
            settÅpenBehandling(respons);
            onSuccess();
        } else if (
            respons.status === RessursStatus.FEILET ||
            respons.status === RessursStatus.FUNKSJONELL_FEIL ||
            respons.status === RessursStatus.IKKE_TILGANG
        ) {
            settFeilmelding(respons.frontendFeilmelding);
        }
    };

    const nullstillSammensattKontrollsak = () => {
        if (erSammensattKontrollsak(sammensattKontrollsak)) {
            slettSammensattKontrollsak(sammensattKontrollsak);
        } else {
            settVisSammensattKontrollsak(false);
            settFritekst('');
        }
    };

    const opprettSammensattKontrollsak = () => {
        request<IRestOpprettSammensattKontrollsak, IBehandling>({
            method: 'POST',
            data: { behandlingId: behandlingId, fritekst: fritekst },
            url: `/familie-ba-sak/api/sammensatt-kontrollsak`,
        }).then(mottaRespons);
    };

    const oppdaterSammensattKontrollsak = (sammensattKontrollsak: IRestSammensattKontrollsak) => {
        request<IRestSammensattKontrollsak, IBehandling>({
            method: 'PUT',
            data: { ...sammensattKontrollsak, fritekst: fritekst },
            url: `/familie-ba-sak/api/sammensatt-kontrollsak`,
        }).then(mottaRespons);
    };

    const slettSammensattKontrollsak = (sammensattKontrollsak: IRestSammensattKontrollsak) => {
        settFeilmelding(undefined);
        request<IRestSammensattKontrollsak, IBehandling>({
            method: 'DELETE',
            data: { ...sammensattKontrollsak, fritekst: fritekst },
            url: `/familie-ba-sak/api/sammensatt-kontrollsak`,
        }).then((response: Ressurs<IBehandling>) =>
            mottaRespons(response, () => {
                settFritekst('');
                settVisSammensattKontrollsak(false);
            })
        );
    };

    return {
        fritekst,
        settFritekst,
        fritekstErEndret,
        opprettEllerOppdaterSammensattKontrollsak,
        slettSammensattKontrollsak,
        erSammensattKontrollsak,
        feilmelding,
        visSammensattKontrollsak,
        settVisSammensattKontrollsak,
        nullstillSammensattKontrollsak,
        skalViseSammensattKontrollsakMenyValg,
    };
};
