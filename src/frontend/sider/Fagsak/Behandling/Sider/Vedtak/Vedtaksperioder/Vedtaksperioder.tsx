import { useBehandling } from '@hooks/useBehandling';
import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';
import { Vedtaksperiodetype } from '@typer/vedtaksperiode';
import { partition } from '@utils/commons';

import { Heading, VStack } from '@navikt/ds-react';

import { filtrerOgSorterPerioderMedBegrunnelseBehov } from './utils';
import { Vedtaksperiode } from './Vedtaksperiode';
import { VedtaksperiodeProvider } from './VedtaksperiodeContext';
import { useVedtaksperioderContext } from './VedtaksperioderContext';

export function Vedtaksperioder() {
    const { vedtaksperioder } = useVedtaksperioderContext();

    const behandling = useBehandling();

    const vedtaksperioderSomSkalVises = filtrerOgSorterPerioderMedBegrunnelseBehov(vedtaksperioder, behandling.status);

    const [avslagsbegrunnelser, begrunnelser] = partition(vedtaksperiode => {
        const erAvslag = vedtaksperiode.type === Vedtaksperiodetype.AVSLAG;
        const harIngenFom = !vedtaksperiode.fom;
        const harIngenTom = !vedtaksperiode.tom;
        return erAvslag && harIngenFom && harIngenTom;
    }, vedtaksperioderSomSkalVises);

    if (vedtaksperioderSomSkalVises.length <= 0) {
        return null;
    }

    return (
        <VStack gap={'space-32'} marginBlock={'space-32'}>
            <GrupperteVedtaksperioder
                vedtaksperioderMedBegrunnelser={begrunnelser}
                overskrift={'Begrunnelser i vedtaksbrev'}
            />
            <GrupperteVedtaksperioder
                vedtaksperioderMedBegrunnelser={avslagsbegrunnelser}
                overskrift={'Generelle avslagsbegrunnelser'}
            />
        </VStack>
    );
}

function GrupperteVedtaksperioder({
    vedtaksperioderMedBegrunnelser,
    overskrift,
}: {
    vedtaksperioderMedBegrunnelser: IVedtaksperiodeMedBegrunnelser[];
    overskrift: string;
}) {
    if (vedtaksperioderMedBegrunnelser.length === 0) {
        return null;
    }

    return (
        <VStack gap={'space-0'}>
            <Heading level={'2'} size={'small'} spacing={true}>
                {overskrift}
            </Heading>
            <VStack gap={'space-20'}>
                {vedtaksperioderMedBegrunnelser.map(vedtaksperiodeMedBegrunnelser => (
                    <VedtaksperiodeProvider
                        key={vedtaksperiodeMedBegrunnelser.id}
                        vedtaksperiodeMedBegrunnelser={vedtaksperiodeMedBegrunnelser}
                    >
                        <Vedtaksperiode />
                    </VedtaksperiodeProvider>
                ))}
            </VStack>
        </VStack>
    );
}
