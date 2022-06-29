import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Systemtittel } from 'nav-frontend-typografi';

import { FamilieInput, FamilieKnapp } from '@navikt/familie-form-elements';
import { Valideringsstatus } from '@navikt/familie-skjema';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useMottakerType } from '../../../context/MottakerTypeContext';

const VergeWrapper = styled.div`
    margin: 1rem 0;
`;

const StyledKnapp = styled(FamilieKnapp)`
    margin-top: 0.3rem;
    height: 1rem;
`;

const StyledFamilieInpunt = styled(FamilieInput)`
    margin-top: 1.8rem;
`;

const Verge: React.FunctionComponent = () => {
    const { erLesevisning } = useBehandling();
    const { hentPerson, skjema } = useMottakerType();
    const [feilMelding, settFeilMelding] = useState<string | undefined>('');
    const [spinner, settSpinner] = useState(false);

    useEffect(() => {
        settFeilMelding('');
    }, [skjema.felter.fødselsnummer.verdi]);

    return (
        <VergeWrapper className={'mottaker__verge'}>
            <Systemtittel children={'Opplysninger om verge'} />
            <br />
            <FamilieInput
                {...skjema.felter.fødselsnummer.hentNavInputProps(!!feilMelding)}
                feil={
                    skjema.felter.fødselsnummer.hentNavInputProps(!!feilMelding).feil || feilMelding
                }
                erLesevisning={erLesevisning()}
                id={'hent-verge-person'}
                label={'Fødselsnummer (valgfritt)'}
            />
            <StyledKnapp
                onClick={() => {
                    if (skjema.felter.fødselsnummer.valideringsstatus === Valideringsstatus.OK) {
                        settSpinner(true);
                        hentPerson(skjema.felter.fødselsnummer.verdi)
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
                children={'Hent informasjon fra folkeregisteret'}
                spinner={spinner}
                mini={true}
                kompakt={true}
                erLesevisning={erLesevisning()}
            />
            <StyledFamilieInpunt
                {...skjema.felter.mottaker.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={erLesevisning()}
                id={'verge-navn'}
                label={'Vergens navn'}
            />
            <StyledFamilieInpunt
                {...skjema.felter.adresse.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={erLesevisning()}
                id={'verge-adresse'}
                label={'Addresse'}
            />
            <StyledFamilieInpunt
                {...skjema.felter.postnummer.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={erLesevisning()}
                id={'verge-postnummer'}
                label={'Postnummer'}
                bredde={'S'}
            />
            <StyledFamilieInpunt
                {...skjema.felter.sted.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={erLesevisning()}
                id={'verge-sted'}
                label={'Sted'}
            />
        </VergeWrapper>
    );
};

export default Verge;
