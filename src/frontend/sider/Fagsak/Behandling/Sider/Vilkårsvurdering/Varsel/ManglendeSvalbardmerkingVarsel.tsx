import React from 'react';

import { Alert, Heading } from '@navikt/ds-react';

import { isoDatoPeriodeTilFormatertString } from '../../../../../../utils/dato';
import { slåSammenListeTilStreng } from '../../../../../../utils/formatter';
import { useBehandlingContext } from '../../../context/BehandlingContext';

export const ManglendeSvalbardmerkingVarsel: React.FC = () => {
    const { behandling } = useBehandlingContext();

    const skalViseVarsel = behandling.manglendeSvalbardmerking.length > 0;

    if (!skalViseVarsel) {
        return null;
    } else {
        return (
            <Alert variant={'warning'}>
                <Heading spacing size="small" level="3">
                    Bosatt på Svalbard
                </Heading>
                <p>
                    Personer i behandlingen har oppholdsadresse på Svalbard i en periode hvor
                    «bosatt på Svalbard» ikke er lagt til i bosatt i riket vilkåret. Dette gjelder
                    (person/periode):
                </p>
                <ul>
                    {behandling.manglendeSvalbardmerking.map(manglendeSvalbardmerking => {
                        const perioder = slåSammenListeTilStreng(
                            manglendeSvalbardmerking.manglendeSvalbardmerkingPerioder.map(
                                manglendeSvalbardmerkingPeriode =>
                                    isoDatoPeriodeTilFormatertString({
                                        fom: manglendeSvalbardmerkingPeriode.fom,
                                        tom: manglendeSvalbardmerkingPeriode.tom,
                                    })
                            )
                        );
                        return <li>{`${manglendeSvalbardmerking.ident}: ${perioder}`}</li>;
                    })}
                </ul>
            </Alert>
        );
    }
};
