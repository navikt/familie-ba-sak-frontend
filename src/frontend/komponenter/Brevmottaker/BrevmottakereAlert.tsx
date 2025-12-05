import * as React from 'react';
import { useState } from 'react';

import { useLocation } from 'react-router';

import { MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Alert, Button, VStack } from '@navikt/ds-react';

import BrevmottakerListe from './BrevmottakerListe';
import { sider } from '../../sider/Fagsak/Behandling/Sider/sider';
import type { IBehandling } from '../../typer/behandling';
import type { IPersonInfo } from '../../typer/person';
import { hentSideHref } from '../../utils/miljø';
import { LeggTilBrevmottakerModalBehandling } from '../Saklinje/Meny/LeggTilEllerFjernBrevmottakere/LeggTilBrevmottakerModalBehandling';
import { LeggTilBrevmottakerModalFagsak } from '../Saklinje/Meny/LeggTilEllerFjernBrevmottakere/LeggTilBrevmottakerModalFagsak';
import type {
    IRestBrevmottaker,
    SkjemaBrevmottaker,
} from '../Saklinje/Meny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';

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
                <VStack marginBlock={'space-40 space-24'}>
                    <Alert variant="info" className={className}>
                        {`Brevmottaker(e) er endret, og ${hentBrevtypetekst(location.pathname)} sendes til:`}
                        <BrevmottakerListe brevmottakere={brevmottakere} bruker={bruker} />
                        <Button
                            variant={'tertiary'}
                            onClick={() => settVisManuelleMottakereModal(true)}
                            icon={<MagnifyingGlassIcon />}
                            size={'xsmall'}
                        >
                            Se detaljer
                        </Button>
                    </Alert>
                </VStack>
            )}
            {visManuelleMottakereModal &&
                (props.erPåBehandling ? (
                    <LeggTilBrevmottakerModalBehandling lukkModal={() => settVisManuelleMottakereModal(false)} />
                ) : (
                    <LeggTilBrevmottakerModalFagsak lukkModal={() => settVisManuelleMottakereModal(false)} />
                ))}
        </>
    );
};
