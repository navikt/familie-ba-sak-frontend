import React from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { FamilieCheckbox } from '@navikt/familie-form-elements';
import { FeltState, Valideringsstatus } from '@navikt/familie-skjema';

import { useBehandling } from '../../../../context/BehandlingContext';
import { IVilkårResultat } from '../../../../typer/vilkår';
import AvslagBegrunnelseMultiselect from './AvslagBegrunnelseMultiselect';
import { VedtakBegrunnelse } from '../../../../typer/vedtak';

interface IProps {
    redigerbartVilkår: FeltState<IVilkårResultat>;
    settRedigerbartVilkår: (redigerbartVilkår: FeltState<IVilkårResultat>) => void;
    visFeilmeldinger: boolean;
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
            z-index: 100;
        }
    }
`;

const AvslagSkjema: React.FC<IProps> = ({
    redigerbartVilkår,
    settRedigerbartVilkår,
    visFeilmeldinger,
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
                            erEksplisittAvslagPåSøknad: !redigerbartVilkår.verdi
                                .erEksplisittAvslagPåSøknad,
                            avslagBegrunnelser: {
                                ...redigerbartVilkår.verdi.avslagBegrunnelser,
                                verdi: [],
                            },
                        },
                    });
                }}
            />
            {redigerbartVilkår.verdi.erEksplisittAvslagPåSøknad && (
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
            )}
        </MarginSkjemaGruppe>
    );
};

export default AvslagSkjema;
