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
    margin-bottom: 1rem !important;
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
            feilmeldingId={'test'} // TODO: Fiks
            feil={
                redigerbartVilkår.verdi.avslagBegrunnelser.valideringsstatus ===
                    Valideringsstatus.FEIL && visFeilmeldinger
                    ? redigerbartVilkår.verdi.avslagBegrunnelser.feilmelding
                    : ''
            }
        >
            {console.log(redigerbartVilkår.verdi.avslagBegrunnelser.valideringsstatus)}
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
