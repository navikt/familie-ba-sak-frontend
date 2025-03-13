import React from 'react';

import classNames from 'classnames';

import { BodyShort, Checkbox, Fieldset, VStack } from '@navikt/ds-react';
import { Valideringsstatus } from '@navikt/familie-skjema';
import type { FeltState } from '@navikt/familie-skjema';

import AvslagBegrunnelseMultiselect from './AvslagBegrunnelseMultiselect';
import { useBehandling } from '../../../../../../context/behandlingContext/BehandlingContext';
import type { VedtakBegrunnelse } from '../../../../../../typer/vedtak';
import type { IVilkårResultat } from '../../../../../../typer/vilkår';
import { VedtaksbegrunnelseTeksterProvider } from '../../../../Vedtak/VedtakBegrunnelserTabell/Context/VedtaksbegrunnelseTeksterContext';

interface IProps {
    redigerbartVilkår: FeltState<IVilkårResultat>;
    settRedigerbartVilkår: (redigerbartVilkår: FeltState<IVilkårResultat>) => void;
    visFeilmeldinger: boolean;
    settVisFeilmeldingerForEttVilkår: (visFeilmeldinger: boolean) => void;
}

const AvslagSkjema: React.FC<IProps> = ({
    redigerbartVilkår,
    settRedigerbartVilkår,
    visFeilmeldinger,
    settVisFeilmeldingerForEttVilkår,
}) => {
    const { vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();

    return (
        <Fieldset
            error={
                redigerbartVilkår.verdi.avslagBegrunnelser.valideringsstatus ===
                    Valideringsstatus.FEIL && visFeilmeldinger
                    ? redigerbartVilkår.verdi.avslagBegrunnelser.feilmelding
                    : undefined
            }
            legend="Er vurderingen et avslag?"
            hideLegend
        >
            <VStack gap="4">
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
            </VStack>
        </Fieldset>
    );
};

export default AvslagSkjema;
