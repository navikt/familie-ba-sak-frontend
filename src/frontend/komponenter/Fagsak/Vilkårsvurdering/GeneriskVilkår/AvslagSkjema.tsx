import React from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { BodyShort, Checkbox } from '@navikt/ds-react';
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
    const { vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();

    return (
        <MarginSkjemaGruppe
            feil={
                redigerbartVilkår.verdi.avslagBegrunnelser.valideringsstatus ===
                    Valideringsstatus.FEIL && visFeilmeldinger
                    ? redigerbartVilkår.verdi.avslagBegrunnelser.feilmelding
                    : ''
            }
        >
            {erLesevisning ? (
                redigerbartVilkår.verdi.erEksplisittAvslagPåSøknad && (
                    <BodyShort
                        className={classNames('skjemaelement', 'lese-felt')}
                        children={'Vurderingen er et avslag'}
                    />
                )
            ) : (
                <Checkbox
                    value={'Vurderingen er et avslag'}
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
                >
                    {'Vurderingen er et avslag'}
                </Checkbox>
            )}

            {redigerbartVilkår.verdi.erEksplisittAvslagPåSøknad && (
                <VedtaksbegrunnelseTeksterProvider>
                    <AvslagBegrunnelseMultiselect
                        vilkårType={redigerbartVilkår.verdi.vilkårType}
                        regelverk={redigerbartVilkår.verdi.vurderesEtter}
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
