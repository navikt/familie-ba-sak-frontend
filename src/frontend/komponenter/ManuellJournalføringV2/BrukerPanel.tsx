import React, { useState } from 'react';

import styled from 'styled-components';

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Knapp } from 'nav-frontend-knapper';

import { FamilieInput } from '@navikt/familie-form-elements';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import { useFelt } from '../../familie-skjema/felt';
import { Valideringsstatus } from '../../familie-skjema/typer';
import { KontoSirkel } from '../../ikoner/KontoSirkel';
import { identValidator } from '../../utils/validators';
import { DeltagerInfo } from './DeltagerInfo';
import { feilDekoratør } from './FeilDekoratør';

const BrukerPanelDiv = styled.div`
    width: 560px;
    margin-top: 20px;
`;

const PanelGyldig = Ekspanderbartpanel;
const PanelFeil = feilDekoratør(PanelGyldig);

export const BrukerPanel: React.FC = () => {
    const { dataForManuellJournalføring, endreBruker, harFeil } = useManuellJournalføringV2();
    const [feilMelding, settFeilMelding] = useState<string | undefined>('');
    const [spinner, settSpinner] = useState(false);

    const nyIdent = useFelt({
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
                                {...nyIdent.hentNavInputProps(!!feilMelding)}
                                erLesevisning={false}
                                id={'hent-person'}
                                label={'Skriv inn fødselsnummer/D-nummer'}
                                bredde={'XL'}
                                placeholder={'fnr/dnr'}
                            />
                            <Knapp
                                onClick={() => {
                                    if (nyIdent.valideringsstatus === Valideringsstatus.OK) {
                                        settSpinner(true);
                                        endreBruker(nyIdent.verdi)
                                            .then((ressur: Ressurs<unknown>) => {
                                                settFeilMelding(
                                                    ressur.status === RessursStatus.SUKSESS
                                                        ? ''
                                                        : 'Ukjent feil ved hent person.'
                                                );
                                            })
                                            .finally(() => {
                                                settSpinner(false);
                                            });
                                    } else {
                                        settFeilMelding('Ugyldig person ident');
                                    }
                                }}
                                children={'Endre bruker'}
                                spinner={spinner}
                            />
                        </div>
                    </Panel>
                </BrukerPanelDiv>
            );
        default:
            return <></>;
    }
};
