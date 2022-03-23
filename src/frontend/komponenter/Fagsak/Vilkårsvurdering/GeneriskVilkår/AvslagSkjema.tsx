import React from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { FamilieCheckbox } from '@navikt/familie-form-elements';
import { Valideringsstatus } from '@navikt/familie-skjema';
import type { FeltState } from '@navikt/familie-skjema';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { VedtakBegrunnelse } from '../../../../typer/vedtak';
import type { IVilkårResultat } from '../../../../typer/vilkår';
import { VedtaksbegrunnelseTeksterProvider } from '../../Vedtak/VedtakBegrunnelserTabell/Context/VedtaksbegrunnelseTeksterContext';
import AvslagBegrunnelseMultiselect from './AvslagBegrunnelseMultiselect';

interface IProps {
    redigerbartVilkår: FeltState<IVilkårResultat>;
    settRedigerbartVilkår: (redigerbartVilkår: FeltState<IVilkårResultat>) => void;
    visFeilmeldinger: boolean;
    settVisFeilmeldingerForEttVilkår: (visFeilmeldinger: boolean) => void;
}

const MarginSkjemaGruppe = styled(SkjemaGruppe)`
    margin: 1.5rem 0 2.5rem 0 !important;
    .skjemaelement {
        margin-bottom: 0 !important;
    }
    > div:nth-child(2) {
        margin: 0.5rem 0 0 0;
        & > div {
            max-width: 100%;
            z-index: 999;
        }
    }
`;

const AvslagSkjema: React.FC<IProps> = ({
    redigerbartVilkår,
    settRedigerbartVilkår,
    visFeilmeldinger,
    settVisFeilmeldingerForEttVilkår,
}) => {
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();

    return (
        <MarginSkjemaGruppe
            feil={
                redigerbartVilkår.verdi.avslagBegrunnelser.valideringsstatus ===
                    Valideringsstatus.FEIL && visFeilmeldinger
                    ? redigerbartVilkår.verdi.avslagBegrunnelser.feilmelding
                    : ''
            }
        >
            <FamilieCheckbox
                erLesevisning={lesevisning}
                label={'Vurderingen er et avslag'}
                checked={redigerbartVilkår.verdi.erEksplisittAvslagPåSøknad}
                onChange={() => {
                    settRedigerbartVilkår({
                        ...redigerbartVilkår,
                        verdi: {
                            ...redigerbartVilkår.verdi,
                            erEksplisittAvslagPåSøknad:
                                !redigerbartVilkår.verdi.erEksplisittAvslagPåSøknad,
                            avslagBegrunnelser: {
                                ...redigerbartVilkår.verdi.avslagBegrunnelser,
                                verdi: [],
                            },
                        },
                    });
                    settVisFeilmeldingerForEttVilkår(false);
                }}
            />
            {redigerbartVilkår.verdi.erEksplisittAvslagPåSøknad && (
                <VedtaksbegrunnelseTeksterProvider>
                    <AvslagBegrunnelseMultiselect
                        vilkårType={redigerbartVilkår.verdi.vilkårType}
                        periode={redigerbartVilkår.verdi.periode.verdi}
                        begrunnelser={redigerbartVilkår.verdi.avslagBegrunnelser.verdi}
                        onChange={(oppdaterteAvslagbegrunnelser: VedtakBegrunnelse[]) => {
                            settRedigerbartVilkår({
                                ...redigerbartVilkår,
                                verdi: {
                                    ...redigerbartVilkår.verdi,
                                    avslagBegrunnelser: {
                                        ...redigerbartVilkår.verdi.avslagBegrunnelser,
                                        verdi: oppdaterteAvslagbegrunnelser,
                                    },
                                },
                            });
                        }}
                    />
                </VedtaksbegrunnelseTeksterProvider>
            )}
        </MarginSkjemaGruppe>
    );
};

export default AvslagSkjema;
