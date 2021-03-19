import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Knapp } from 'nav-frontend-knapper';

import { FamilieInput } from '@navikt/familie-form-elements';
import { useFelt, Valideringsstatus } from '@navikt/familie-skjema';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import { KontoSirkel } from '../../ikoner/KontoSirkel';
import { formaterPersonIdent, formaterTilKunFørstBokstavStor } from '../../utils/formatter';
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
    margin-top: auto;
    height: 1rem;
`;

export const BrukerPanel: React.FC = () => {
    const { skjema, endreBruker, harFeil } = useManuellJournalfør();
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

    const navn =
        formaterTilKunFørstBokstavStor(skjema.felter.bruker.verdi?.navn) || 'Bruke ikke satt';
    const ident = skjema.felter.bruker.verdi?.personIdent
        ? formaterPersonIdent(skjema.felter.bruker.verdi.personIdent)
        : '';
    const Panel = harFeil(skjema.felter.bruker.verdi) ? PanelFeil : PanelGyldig;
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
                                    .then((feilmelding: string) => {
                                        settFeilMelding(feilmelding);
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
                        mini={true}
                    />
                </StyledDiv>
            </Panel>
        </BrukerPanelDiv>
    );
};
