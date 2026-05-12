import { useState } from 'react';

import { useLocation } from 'react-router';

import { InformationSquareIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Button, InfoCard, VStack } from '@navikt/ds-react';

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

export const BrevmottakereAlert = (props: BrevmottakereAlertBehandlingProps | BrevmottakereAlertFagsakProps) => {
    const { brevmottakere, className, bruker } = props;

    const location = useLocation();
    const [visManuelleMottakereModal, settVisManuelleMottakereModal] = useState(false);

    function hentBrevtypetekst(pathname: string) {
        if (hentSideHref(pathname) === sider.SIMULERING.href) {
            return 'Varsel';
        } else if (pathname.includes('dokumentutsending')) {
            return 'Informasjonsbrev';
        } else {
            return 'Vedtak';
        }
    }

    return (
        <>
            {brevmottakere && brevmottakere.length !== 0 && (
                <VStack marginBlock={'space-40 space-24'}>
                    <InfoCard data-color="info" className={className}>
                        <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
                            <InfoCard.Title>Brevmottaker(e) er endret</InfoCard.Title>
                        </InfoCard.Header>
                        <InfoCard.Content>
                            {hentBrevtypetekst(location.pathname)} sendes til:
                            <BrevmottakerListe brevmottakere={brevmottakere} bruker={bruker} />
                            <Button
                                variant={'tertiary'}
                                onClick={() => settVisManuelleMottakereModal(true)}
                                icon={<MagnifyingGlassIcon />}
                                size={'xsmall'}
                            >
                                Se detaljer
                            </Button>
                        </InfoCard.Content>
                    </InfoCard>
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
