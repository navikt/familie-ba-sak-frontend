import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import {
    BehandlingResultat,
    BehandlingStatus,
    BehandlingSteg,
    BehandlingStegStatus,
    type IBehandling,
} from '@typer/behandling';
import { describe, expect, test } from 'vitest';

import { finnSideForBehandlingssteg, sider } from '../Sider/sider';
import { Stegstatus, utledStegstatus } from './stegstatus';

function utledStatuser(behandling: IBehandling) {
    const gjeldendeSide = finnSideForBehandlingssteg(behandling);
    return {
        registrerSøknad: utledStegstatus(sider.REGISTRERE_SØKNAD, behandling, gjeldendeSide),
        vilkårsvurdering: utledStegstatus(sider.VILKÅRSVURDERING, behandling, gjeldendeSide),
        behandlingsresultat: utledStegstatus(sider.BEHANDLINGRESULTAT, behandling, gjeldendeSide),
        vedtak: utledStegstatus(sider.VEDTAK, behandling, gjeldendeSide),
    };
}

describe('utledStegstatus', () => {
    test('skal vise steget behandlingen står på som aksjonspunkt, tidligere steg som utført og senere som ikke fullført', () => {
        const behandling = lagBehandling({ steg: BehandlingSteg.VILKÅRSVURDERING });

        const statuser = utledStatuser(behandling);

        expect(statuser.registrerSøknad).toBe(Stegstatus.INNVILGET);
        expect(statuser.vilkårsvurdering).toBe(Stegstatus.AKSJONSPUNKT);
        expect(statuser.behandlingsresultat).toBe(Stegstatus.IKKE_FULLFØRT);
    });

    test('skal vise vedtak som aksjonspunkt mens behandlingen ligger hos beslutter', () => {
        const behandling = lagBehandling({
            steg: BehandlingSteg.BESLUTTE_VEDTAK,
            status: BehandlingStatus.FATTER_VEDTAK,
            resultat: BehandlingResultat.INNVILGET,
        });

        const statuser = utledStatuser(behandling);

        expect(statuser.vedtak).toBe(Stegstatus.AKSJONSPUNKT);
    });

    test('skal vise vedtak som utført mens vedtaket iverksettes', () => {
        const behandling = lagBehandling({
            steg: BehandlingSteg.IVERKSETT_MOT_OPPDRAG,
            status: BehandlingStatus.IVERKSETTER_VEDTAK,
            resultat: BehandlingResultat.INNVILGET,
        });

        const statuser = utledStatuser(behandling);

        expect(statuser.vedtak).toBe(Stegstatus.INNVILGET);
    });

    test('skal vise behandlingsresultat som avslag eller delvis innvilget etter resultatet', () => {
        const avslått = lagBehandling({
            steg: BehandlingSteg.VURDER_TILBAKEKREVING,
            resultat: BehandlingResultat.AVSLÅTT,
        });
        const delvisInnvilget = lagBehandling({
            steg: BehandlingSteg.VURDER_TILBAKEKREVING,
            resultat: BehandlingResultat.DELVIS_INNVILGET,
        });

        expect(utledStatuser(avslått).behandlingsresultat).toBe(Stegstatus.AVSLAG);
        expect(utledStatuser(delvisInnvilget).behandlingsresultat).toBe(Stegstatus.DELVIS_INNVILGET);
    });

    test('skal vise hengelås på alle steg når behandlingen er avsluttet, med avslag på stegene som viser utfallet', () => {
        const behandling = lagBehandling({
            steg: BehandlingSteg.BEHANDLING_AVSLUTTET,
            status: BehandlingStatus.AVSLUTTET,
            resultat: BehandlingResultat.AVSLÅTT,
        });

        const statuser = utledStatuser(behandling);

        expect(statuser.vilkårsvurdering).toBe(Stegstatus.LÅST_INNVILGET);
        expect(statuser.behandlingsresultat).toBe(Stegstatus.LÅST_AVSLAG);
        expect(statuser.vedtak).toBe(Stegstatus.LÅST_AVSLAG);
    });

    test('skal vise steget en henlagt behandling stod på som ikke fullført', () => {
        const behandling = lagBehandling({
            steg: BehandlingSteg.HENLEGG_BEHANDLING,
            status: BehandlingStatus.AVSLUTTET,
            resultat: BehandlingResultat.HENLAGT_SØKNAD_TRUKKET,
            stegTilstand: [
                {
                    behandlingSteg: BehandlingSteg.VILKÅRSVURDERING,
                    behandlingStegStatus: BehandlingStegStatus.IKKE_UTFØRT,
                },
                {
                    behandlingSteg: BehandlingSteg.HENLEGG_BEHANDLING,
                    behandlingStegStatus: BehandlingStegStatus.UTFØRT,
                },
            ],
        });

        const statuser = utledStatuser(behandling);

        expect(statuser.registrerSøknad).toBe(Stegstatus.LÅST_INNVILGET);
        expect(statuser.vilkårsvurdering).toBe(Stegstatus.IKKE_FULLFØRT);
    });
});
