import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Knapp } from 'nav-frontend-knapper';

import { FamilieInput } from '@navikt/familie-form-elements';
import { useFelt, Valideringsstatus } from '@navikt/familie-skjema';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
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

const StyledDiv = styled.div`
    display: flex;
`;

const StyledKnapp = styled(Knapp)`
    margin-left: 1rem;
    margin-top: 1.8rem;
    height: 1rem;
`;

export const BrukerPanel: React.FC = () => {
    const { dataForManuellJournalføring, endreBruker, harFeil } = useManuellJournalfør();
    const [feilMelding, settFeilMelding] = useState<string | undefined>('');
    const [spinner, settSpinner] = useState(false);
    const [valgt, settValgt] = useState(false);
    const nyIdent = useFelt({
        verdi: '',
        valideringsfunksjon: identValidator,
    });

    useEffect(() => {
        settFeilMelding('');
    }, [nyIdent.verdi]);

    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            const bruker = dataForManuellJournalføring.data.person;
            const navn = bruker?.navn || 'Ukjent';
            const ident = bruker?.personIdent || 'Ukjent';
            const Panel = harFeil(bruker) ? PanelFeil : PanelGyldig;
            return (
                <BrukerPanelDiv>
                    <Panel
                        onClick={() => {
                            settValgt(!valgt);
                        }}
                        tittel={
                            <DeltagerInfo
                                ikon={<KontoSirkel filled={valgt} width={48} height={48} />}
                                navn={navn}
                                undertittel={'Søker/Bruker'}
                                ident={ident}
                            />
                        }
                    >
                        <StyledDiv>
                            <FamilieInput
                                {...nyIdent.hentNavInputProps(!!feilMelding)}
                                feil={nyIdent.hentNavInputProps(!!feilMelding).feil || feilMelding}
                                erLesevisning={false}
                                id={'hent-person'}
                                label={'Skriv inn fødselsnummer/D-nummer'}
                                bredde={'XL'}
                                placeholder={'fnr/dnr'}
                            />
                            <StyledKnapp
                                onClick={() => {
                                    if (nyIdent.valideringsstatus === Valideringsstatus.OK) {
                                        settSpinner(true);
                                        endreBruker(nyIdent.verdi)
                                            .then((ressur: Ressurs<unknown>) => {
                                                settFeilMelding(
                                                    ressur.status === RessursStatus.SUKSESS
                                                        ? ''
                                                        : 'Ukjent feil ved hent person'
                                                );
                                            })
                                            .finally(() => {
                                                settSpinner(false);
                                            });
                                    } else {
                                        settFeilMelding('Person ident er ugyldig');
                                    }
                                }}
                                children={'Endre bruker'}
                                spinner={spinner}
                            />
                        </StyledDiv>
                    </Panel>
                </BrukerPanelDiv>
            );
        default:
            return <></>;
    }
};
