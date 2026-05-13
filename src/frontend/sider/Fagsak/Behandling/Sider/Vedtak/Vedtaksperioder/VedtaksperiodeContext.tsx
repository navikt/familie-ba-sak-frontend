import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { useBehandling } from '@hooks/useBehandling';
import { MAKS_LENGDE_FRITEKST } from '@sider/Fagsak/Behandling/Sider/Vedtak/Vedtaksperioder/Fritekstbegrunnelser';
import { Behandlingstype } from '@typer/behandling';
import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';
import type { IIsoDatoPeriode } from '@utils/dato';
import type { IFritekstFelt } from '@utils/fritekstfelter';
import { lagInitiellFritekst } from '@utils/fritekstfelter';
import deepEqual from 'deep-equal';

import { feil, ok, useFelt, useSkjema, Valideringsstatus } from '@navikt/familie-skjema';
import type { FeltState, ISkjema } from '@navikt/familie-skjema';

interface Props extends PropsWithChildren {
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
}

interface BegrunnelserSkjema {
    periode: IIsoDatoPeriode;
    fritekster: FeltState<IFritekstFelt>[];
}

interface VedtaksperiodeContextValue {
    erPanelEkspandert: boolean;
    onPanelClose: (visAlert: boolean) => void;
    skjema: ISkjema<BegrunnelserSkjema, IVedtaksperiodeMedBegrunnelser[]>;
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
    kanSendeSkjema: () => boolean;
}

const VedtaksperiodeContext = createContext<VedtaksperiodeContextValue | undefined>(undefined);

export function VedtaksperiodeProvider({ vedtaksperiodeMedBegrunnelser, children }: Props) {
    const behandling = useBehandling();

    const [erPanelEkspandert, settErPanelEkspandert] = useState(
        behandling.type === Behandlingstype.FØRSTEGANGSBEHANDLING &&
            vedtaksperiodeMedBegrunnelser.begrunnelser.length === 0 &&
            vedtaksperiodeMedBegrunnelser.fritekster.length === 0
    );

    const periode = useFelt<IIsoDatoPeriode>({
        verdi: {
            fom: vedtaksperiodeMedBegrunnelser.fom,
            tom: vedtaksperiodeMedBegrunnelser.tom,
        },
    });

    const fritekster = useFelt<FeltState<IFritekstFelt>[]>({
        verdi: [],
        valideringsfunksjon: (felt: FeltState<FeltState<IFritekstFelt>[]>) => {
            return felt.verdi.some(
                fritekst => fritekst.valideringsstatus === Valideringsstatus.FEIL || fritekst.verdi.tekst.length === 0
            )
                ? feil(felt, '')
                : ok(felt);
        },
    });

    const { kanSendeSkjema, settVisfeilmeldinger, skjema } = useSkjema<
        BegrunnelserSkjema,
        IVedtaksperiodeMedBegrunnelser[]
    >({
        felter: {
            periode,
            fritekster,
        },
        skjemanavn: 'Begrunnelser for vedtaksperiode',
    });

    const populerSkjemaFraBackend = () => {
        settVisfeilmeldinger(false);
        skjema.felter.periode.validerOgSettFelt({
            fom: vedtaksperiodeMedBegrunnelser.fom,
            tom: vedtaksperiodeMedBegrunnelser.tom,
        });

        skjema.felter.fritekster.validerOgSettFelt(
            vedtaksperiodeMedBegrunnelser.fritekster.map((fritekst, id) =>
                lagInitiellFritekst(fritekst, id, MAKS_LENGDE_FRITEKST)
            )
        );
    };

    useEffect(() => {
        populerSkjemaFraBackend();
    }, [vedtaksperiodeMedBegrunnelser]);

    const onPanelClose = (visAlert: boolean) => {
        if (
            erPanelEkspandert &&
            visAlert &&
            !deepEqual(
                skjema.felter.fritekster.verdi.map(fritekst => fritekst.verdi.tekst),
                vedtaksperiodeMedBegrunnelser.fritekster
            )
        ) {
            alert('Periode har endringer som ikke er lagret!');
        } else {
            settErPanelEkspandert(!erPanelEkspandert);
            populerSkjemaFraBackend();
        }
    };

    return (
        <VedtaksperiodeContext.Provider
            value={{
                erPanelEkspandert,
                vedtaksperiodeMedBegrunnelser,
                onPanelClose,
                skjema,
                kanSendeSkjema,
            }}
        >
            {children}
        </VedtaksperiodeContext.Provider>
    );
}

export function useVedtaksperiodeContext() {
    const context = useContext(VedtaksperiodeContext);
    if (context === undefined) {
        throw new Error('useVedtaksperiodeContext må brukes inne i en VedtaksperiodeProvider');
    }
    return context;
}
