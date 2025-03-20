import * as React from 'react';
import { useState } from 'react';

import { useLocation } from 'react-router';
import styled from 'styled-components';

import { MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Alert, Button } from '@navikt/ds-react';

import BrevmottakerListe from './BrevmottakerListe';
import { sider } from '../../sider/fagsak/Behandling/Sider/sider';
import { LeggTilBrevmottakerModalBehandling } from '../../sider/fagsak/Personlinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/LeggTilBrevmottakerModalBehandling';
import { LeggTilBrevmottakerModalFagsak } from '../../sider/fagsak/Personlinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/LeggTilBrevmottakerModalFagsak';
import type {
    IRestBrevmottaker,
    SkjemaBrevmottaker,
} from '../../sider/fagsak/Personlinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import type { IBehandling } from '../../typer/behandling';
import type { IPersonInfo } from '../../typer/person';
import { hentSideHref } from '../../utils/miljø';

interface Props {
    bruker: IPersonInfo;
    className?: string;
}

export interface BrevmottakereAlertBehandlingProps extends Props {
    erPåBehandling: true;
    brevmottakere: IRestBrevmottaker[];
    erLesevisning: boolean;
    åpenBehandling: IBehandling;
}

interface BrevmottakereAlertFagsakProps extends Props {
    erPåBehandling: false;
    brevmottakere: SkjemaBrevmottaker[];
}

const StyledAlert = styled(Alert)`
    margin-bottom: 1.5rem;
`;

export const BrevmottakereAlert: React.FC<
    BrevmottakereAlertBehandlingProps | BrevmottakereAlertFagsakProps
> = props => {
    const { brevmottakere, className, bruker } = props;

    const location = useLocation();
    const [visManuelleMottakereModal, settVisManuelleMottakereModal] = useState(false);

    function hentBrevtypetekst(pathname: string) {
        if (hentSideHref(pathname) === sider.SIMULERING.href) {
            return 'varsel';
        } else if (pathname.includes('dokumentutsending')) {
            return 'informasjonsbrev';
        } else {
            return 'vedtak';
        }
    }

    return (
        <>
            {brevmottakere && brevmottakere.length !== 0 && (
                <StyledAlert variant="info" className={className}>
                    {`Brevmottaker(e) er endret, og ${hentBrevtypetekst(
                        location.pathname
                    )} sendes til:`}
                    <BrevmottakerListe brevmottakere={brevmottakere} bruker={bruker} />
                    <Button
                        variant={'tertiary'}
                        onClick={() => settVisManuelleMottakereModal(true)}
                        icon={<MagnifyingGlassIcon />}
                        size={'xsmall'}
                    >
                        Se detaljer
                    </Button>
                </StyledAlert>
            )}

            {visManuelleMottakereModal &&
                (props.erPåBehandling ? (
                    <LeggTilBrevmottakerModalBehandling
                        lukkModal={() => settVisManuelleMottakereModal(false)}
                        behandling={props.åpenBehandling}
                        erLesevisning={props.erLesevisning}
                    />
                ) : (
                    <LeggTilBrevmottakerModalFagsak
                        lukkModal={() => settVisManuelleMottakereModal(false)}
                    />
                ))}
        </>
    );
};
