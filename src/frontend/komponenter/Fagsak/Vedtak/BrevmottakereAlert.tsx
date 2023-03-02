import * as React from 'react';
import { useState } from 'react';

import { Search } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';

import type { IBehandling } from '../../../typer/behandling';
import type { IInstitusjon } from '../../../typer/institusjon-og-verge';
import type { IGrunnlagPerson } from '../../../typer/person';
import BrevmottakerListe from '../../Felleskomponenter/Hendelsesoversikt/BrevModul/BrevmottakerListe';
import { LeggTilBrevmottakerModal } from '../Personlinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/LeggTilBrevmottakerModal';
import type { IRestBrevmottaker } from '../Personlinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/useLeggTilFjernBrevmottaker';
import { BehandlingKorrigertAlert } from './OppsummeringVedtak';

interface Props {
    brevmottakere: IRestBrevmottaker[];
    institusjon: IInstitusjon | undefined;
    personer: IGrunnlagPerson[];
    åpenBehandling: IBehandling;
}

export const BrevmottakereAlert: React.FC<Props> = ({
    brevmottakere,
    institusjon,
    personer,
    åpenBehandling,
}) => {
    const [visManuelleMottakereModal, settVisManuelleMottakereModal] = useState(false);

    return (
        <>
            {brevmottakere && brevmottakere.length !== 0 && (
                <BehandlingKorrigertAlert variant="info">
                    Brevmottaker(e) er endret, og vedtak sendes til:
                    <BrevmottakerListe
                        brevmottakere={brevmottakere}
                        institusjon={institusjon}
                        personer={personer}
                    />
                    <Button
                        variant={'tertiary'}
                        onClick={() => settVisManuelleMottakereModal(true)}
                        icon={<Search />}
                        size={'xsmall'}
                    >
                        Se detaljer
                    </Button>
                </BehandlingKorrigertAlert>
            )}

            <LeggTilBrevmottakerModal
                åpenBehandling={åpenBehandling}
                visModal={visManuelleMottakereModal}
                lukkModal={() => settVisManuelleMottakereModal(false)}
            />
        </>
    );
};
