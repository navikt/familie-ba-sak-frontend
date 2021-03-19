import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { FamilieInput, FamilieKnapp } from '@navikt/familie-form-elements';
import { useFelt, Valideringsstatus } from '@navikt/familie-skjema';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import { KontoSirkel } from '../../ikoner/KontoSirkel';
import { formaterPersonIdent } from '../../utils/formatter';
import { identValidator } from '../../utils/validators';
import { DeltagerInfo } from './DeltagerInfo';
import { StyledEkspanderbartpanelBase } from './StyledEkspanderbartpanelBase';

const StyledDiv = styled.div`
    display: flex;
`;

const StyledKnapp = styled(FamilieKnapp)`
    margin-left: 1rem;
    margin-top: auto;
    height: 1rem;
`;

export const BrukerPanel: React.FC = () => {
    const { skjema, endreBruker, erLesevisning } = useManuellJournalfør();
    const [åpen, settÅpen] = useState(false);
    const [feilMelding, settFeilMelding] = useState<string | undefined>('');
    const [spinner, settSpinner] = useState(false);
    const nyIdent = useFelt({
        verdi: '',
        valideringsfunksjon: identValidator,
    });

    useEffect(() => {
        settFeilMelding('');
    }, [nyIdent.verdi]);

    useEffect(() => {
        if (
            skjema.visFeilmeldinger &&
            skjema.felter.bruker.valideringsstatus === Valideringsstatus.FEIL
        ) {
            settÅpen(true);
        }
    }, [skjema.visFeilmeldinger, skjema.felter.bruker.valideringsstatus]);

    return (
        <StyledEkspanderbartpanelBase
            visFeilmeldinger={
                skjema.visFeilmeldinger &&
                skjema.felter.bruker.valideringsstatus === Valideringsstatus.FEIL
            }
            apen={åpen}
            onClick={() => {
                settÅpen(!åpen);
            }}
            tittel={
                <DeltagerInfo
                    ikon={<KontoSirkel filled={åpen} width={48} height={48} />}
                    navn={skjema.felter.bruker.verdi?.navn || 'Bruke ikke satt'}
                    undertittel={'Søker/Bruker'}
                    ident={formaterPersonIdent(skjema.felter.bruker.verdi?.personIdent ?? '')}
                />
            }
        >
            <StyledDiv>
                <FamilieInput
                    {...nyIdent.hentNavInputProps(!!feilMelding)}
                    feil={nyIdent.hentNavInputProps(!!feilMelding).feil || feilMelding}
                    erLesevisning={erLesevisning()}
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
                    erLesevisning={erLesevisning()}
                />
            </StyledDiv>
        </StyledEkspanderbartpanelBase>
    );
};
