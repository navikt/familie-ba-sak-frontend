import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

import { FamilieInput } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføring } from '../../context/ManuellJournalføringContext';
import { EmailIkon } from '../../ikoner/EmailIkon';
import { DeltagerInfo } from './DeltagerInfo';
import { feilDekoratør } from './FeilDekoratør';

const AvsenderPanelDiv = styled.div`
    width: 560px;
    margin-top: 20px;
`;

const PanelGyldig = Ekspanderbartpanel;

const PanelFeil = feilDekoratør(PanelGyldig);

export const AvsenderPanel: React.FC = () => {
    const { dataForManuellJournalføring, settAvsender, harFeil } = useManuellJournalføring();
    const [avsenderFelt, settAvsenderFelt] = useState('');

    useEffect(() => {
        if (dataForManuellJournalføring.status === RessursStatus.SUKSESS) {
            settAvsenderFelt(
                dataForManuellJournalføring.data.journalpost.avsenderMottaker?.navn ?? ''
            );
        }
    }, [dataForManuellJournalføring]);

    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            const avsender = dataForManuellJournalføring.data.journalpost.avsenderMottaker;
            const navn = avsender?.navn || 'Ukjent';
            const ident = avsender?.id || 'Ukjent';
            const Panel = harFeil(avsender) ? PanelFeil : PanelGyldig;
            return (
                <AvsenderPanelDiv>
                    <Panel
                        tittel={
                            <DeltagerInfo
                                ikon={<EmailIkon width={48} height={48} />}
                                navn={navn}
                                ident={ident}
                                undertittel="Avsender"
                            />
                        }
                    >
                        <FamilieInput
                            erLesevisning={false}
                            id={'avsender'}
                            label={'Skriv inn avsender'}
                            bredde={'XL'}
                            placeholder={'avsender'}
                            value={avsenderFelt}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                settAvsenderFelt(event.target.value);
                            }}
                            onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
                                settAvsender(event.target.value);
                            }}
                        />
                    </Panel>
                </AvsenderPanelDiv>
            );
        default:
            return <></>;
    }
};
