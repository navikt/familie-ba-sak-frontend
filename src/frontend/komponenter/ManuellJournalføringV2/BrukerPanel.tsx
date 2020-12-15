import React, { useState } from 'react';

import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Knapp } from 'nav-frontend-knapper';

import { FamilieInput } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import { useFelt } from '../../familie-skjema/felt';
import { Valideringsstatus } from '../../familie-skjema/typer';
import { KontoSirkel } from '../../ikoner/KontoSirkel';
import { identValidator } from '../../utils/validators';
import { DeltagerInfo } from './DeltagerInfo';
import { feilPanel } from './FeilPanel';

const VIS_FELT_MELDING = '';
const IKKE_VIS_MELDING = undefined;

const StyledAlert = styled(AlertStripeFeil)`
    margin: 10px 0 0 0;
`;

const BrukerPanelDiv = styled.div`
    width: 560px;
    margin-top: 20px;
`;

const PanelGyldig = Ekspanderbartpanel;
const PanelFeil = feilPanel(PanelGyldig);

export const BrukerPanel: React.FC = () => {
    const { dataForManuellJournalføring, endreBruker, harFeil } = useManuellJournalføringV2();
    const [feilMelding, settFeilMelding] = useState<string | undefined>(IKKE_VIS_MELDING);
    const [spinner, settSpinner] = useState(false);

    const nyttIdent = useFelt({
        verdi: '',
        valideringsfunksjon: identValidator,
    });

    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            const bruker = dataForManuellJournalføring.data.person;
            const navn = bruker?.navn || 'Ukjent';
            const ident = bruker?.personIdent || 'Ukjent';
            const Panel = harFeil(bruker) ? PanelFeil : PanelGyldig;
            return (
                <BrukerPanelDiv>
                    <Panel
                        tittel={
                            <DeltagerInfo
                                ikon={<KontoSirkel />}
                                navn={navn}
                                undertittel={'Søker/Bruker'}
                                ident={ident}
                            />
                        }
                    >
                        <div className={'hentperson__inputogknapp'}>
                            <FamilieInput
                                {...nyttIdent.hentNavInputProps(feilMelding === VIS_FELT_MELDING)}
                                erLesevisning={false}
                                id={'hent-person'}
                                label={'Skriv inn fødselsnummer/D-nummer'}
                                bredde={'XL'}
                                placeholder={'fnr/dnr'}
                            />
                            <Knapp
                                onClick={() => {
                                    if (nyttIdent.valideringsstatus === Valideringsstatus.OK) {
                                        settSpinner(true);
                                        endreBruker(nyttIdent.verdi, (status: RessursStatus) => {
                                            settSpinner(false);
                                            settFeilMelding(
                                                status === RessursStatus.SUKSESS
                                                    ? IKKE_VIS_MELDING
                                                    : 'Ukjent feil ved hent person.'
                                            );
                                        });
                                    } else {
                                        settFeilMelding(VIS_FELT_MELDING);
                                    }
                                }}
                                children={'Endre bruker'}
                                spinner={spinner}
                            />
                        </div>
                        {feilMelding && <StyledAlert>{feilMelding}</StyledAlert>}{' '}
                    </Panel>
                </BrukerPanelDiv>
            );
        default:
            return <></>;
    }
};
