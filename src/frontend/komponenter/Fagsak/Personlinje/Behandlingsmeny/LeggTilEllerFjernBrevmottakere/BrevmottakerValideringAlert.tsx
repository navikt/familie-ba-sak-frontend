import React from 'react';

import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';

import type { IBehandling } from '../../../../../typer/behandling';

const StyledAlert = styled(Alert)`
    margin: 1rem 0 0;
`;
interface IProps {
    åpenBehandling: IBehandling;
    fortroligePersonIdenter: string[];
    fortroligePersonIdenterFeilmelding: string;
}

const BrevmottakerValideringAlert: React.FC<IProps> = ({
    åpenBehandling,
    fortroligePersonIdenter,
    fortroligePersonIdenterFeilmelding,
}) => {
    return (
        <>
            {fortroligePersonIdenterFeilmelding ? (
                <StyledAlert variant="error">{fortroligePersonIdenterFeilmelding}</StyledAlert>
            ) : (
                fortroligePersonIdenter.length > 0 && (
                    <StyledAlert
                        variant={åpenBehandling.brevmottakere.length ? 'error' : 'warning'}
                    >
                        Enkelte personer har diskresjonskode som innebærer at det ikke er tillatt
                        med manuelle brevmottakere. Følgende personer har diskresjonskode: &nbsp;
                        {`${fortroligePersonIdenter.join(', ')}`}.
                        {åpenBehandling.brevmottakere.length > 0 && (
                            <span>
                                <br />
                                <b>
                                    Brevmottaker(e) er manuelt registrert og må fjernes før du kan
                                    velge bruker eller barn med diskresjonskode.
                                </b>
                            </span>
                        )}
                    </StyledAlert>
                )
            )}
        </>
    );
};
export default BrevmottakerValideringAlert;
