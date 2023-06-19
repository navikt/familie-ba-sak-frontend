import React from 'react';

import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';

import type { IBehandling } from '../../../../../typer/behandling';

const StyledAlert = styled(Alert)`
    margin: 1rem 0 0;
`;
interface IProps {
    åpenBehandling: IBehandling;
    erBrukerStrengtFortrolig: boolean;
    finnesStrengtFortroligBarnIBehandling: boolean;
    søknadsskjemaHarValgtStrengtFortroligBarn: boolean;
}

const BrevmottakerValideringAlert: React.FC<IProps> = ({
    åpenBehandling,
    erBrukerStrengtFortrolig,
    finnesStrengtFortroligBarnIBehandling,
    søknadsskjemaHarValgtStrengtFortroligBarn,
}) => {
    const deaktiverSkjema =
        erBrukerStrengtFortrolig ||
        finnesStrengtFortroligBarnIBehandling ||
        søknadsskjemaHarValgtStrengtFortroligBarn;
    return (
        <>
            {deaktiverSkjema && (
                <StyledAlert variant={åpenBehandling.brevmottakere.length ? 'error' : 'warning'}>
                    {erBrukerStrengtFortrolig ? (
                        <>Brukeren i behandlingen </>
                    ) : (
                        <>
                            {finnesStrengtFortroligBarnIBehandling
                                ? 'Barn lagt til i behandlingen '
                                : 'Barn valgt i behandlingen '}
                        </>
                    )}
                    har diskresjonskode som innebærer at det ikke er tillatt med manuelle
                    brevmottakere.
                    {åpenBehandling.brevmottakere.length > 0 && (
                        <span>
                            <br />
                            <b>
                                Brevmottaker(e) er manuelt registrert og må fjernes før du kan velge
                                bruker eller barn med diskresjonskode.
                            </b>
                        </span>
                    )}
                </StyledAlert>
            )}
        </>
    );
};
export default BrevmottakerValideringAlert;
