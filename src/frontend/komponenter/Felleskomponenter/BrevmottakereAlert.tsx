import * as React from 'react';
import { useState } from 'react';

import { Search } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';

import type { IBehandling } from '../../typer/behandling';
import type { FagsakType } from '../../typer/fagsak';
import type { IInstitusjon } from '../../typer/institusjon-og-verge';
import type { IGrunnlagPerson } from '../../typer/person';
import { LeggTilBrevmottakerModal } from '../Fagsak/Personlinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/LeggTilBrevmottakerModal';
import type { IRestBrevmottaker } from '../Fagsak/Personlinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/useLeggTilFjernBrevmottaker';
import { BehandlingKorrigertAlert } from '../Fagsak/Vedtak/OppsummeringVedtak';
import BrevmottakerListe from './Hendelsesoversikt/BrevModul/BrevmottakerListe';

interface Props {
    brevmottakere: IRestBrevmottaker[];
    institusjon?: IInstitusjon;
    personer: IGrunnlagPerson[];
    åpenBehandling: IBehandling;
    fagsakType?: FagsakType;
    className?: string;
}

export const BrevmottakereAlert: React.FC<Props> = ({
    brevmottakere,
    institusjon,
    personer,
    åpenBehandling,
    fagsakType,
    className,
}) => {
    const [visManuelleMottakereModal, settVisManuelleMottakereModal] = useState(false);

    return (
        <>
            {brevmottakere && brevmottakere.length !== 0 && (
                <BehandlingKorrigertAlert variant="info" className={className}>
                    Brevmottaker(e) er endret, og vedtak sendes til:
                    <BrevmottakerListe
                        brevmottakere={brevmottakere}
                        institusjon={institusjon}
                        personer={personer}
                        fagsakType={fagsakType}
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
