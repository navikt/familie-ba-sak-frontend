import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Office1Filled } from '@navikt/ds-icons';
import { Button, ReadMore, Select, TextField } from '@navikt/ds-react';
import { NavdsSemanticColorInteractionPrimary } from '@navikt/ds-tokens/dist/tokens';
import { FamilieInput } from '@navikt/familie-form-elements';
import { useFelt, Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../context/AppContext';
import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import { KontoSirkel } from '../../ikoner/KontoSirkel';
import { ToggleNavn } from '../../typer/toggles';
import { formaterIdent } from '../../utils/formatter';
import { identValidator } from '../../utils/validators';
import { SamhandlerTabell } from '../Fagsak/InstitusjonOgVerge/SamhandlerTabell';
import { useSamhandlerSkjema } from '../Fagsak/InstitusjonOgVerge/useSamhandler';
import { DeltagerInfo } from './DeltagerInfo';
import { StyledEkspanderbartpanelBase } from './StyledEkspanderbartpanelBase';

const FlexDiv = styled.div`
    display: flex;
    margin-bottom: 1.5rem;
`;

const StyledButton = styled(Button)`
    margin-left: 1rem;
    margin-top: auto; // todo trengs denne?
`;

const StyledEkspanderbartpanelBaseMedMargin = styled(StyledEkspanderbartpanelBase)`
    & .ekspanderbartPanel__innhold {
        margin-left: 4rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
    }
`;

export const BrukerPanel: React.FC = () => {
    const { skjema, endreBruker, erLesevisning } = useManuellJournalfør();
    const { toggles } = useApp();
    const [åpen, settÅpen] = useState(false);
    const [feilMelding, settFeilMelding] = useState<string | undefined>('');
    const [spinner, settSpinner] = useState(false);
    const nyIdent = useFelt({
        verdi: '',
        valideringsfunksjon: identValidator,
    });
    const { onSubmitWrapper, samhandlerSkjema } = useSamhandlerSkjema();
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

    useEffect(() => {
        if (samhandlerSkjema.submitRessurs.status === RessursStatus.SUKSESS) {
            skjema.felter.samhandler.validerOgSettFelt(samhandlerSkjema.submitRessurs.data);
        }
    }, [samhandlerSkjema.submitRessurs.status]);

    const erBrukerPåInstitusjon = !!skjema.felter.erPåInstitusjon.verdi;

    const velgFagsaktype = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const erEnsligMindreårig = event.target.value === 'enslig-mindreårig';
        const erInstitusjon = event.target.value === 'institusjon';
        skjema.felter.erPåInstitusjon.validerOgSettFelt(erInstitusjon);
        skjema.felter.erEnsligMindreårig.validerOgSettFelt(erEnsligMindreårig);
        if (skjema.felter.bruker.verdi) {
            endreBruker(skjema.felter.bruker.verdi?.personIdent, erEnsligMindreårig, erInstitusjon);
        }
    };

    return (
        <StyledEkspanderbartpanelBaseMedMargin
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
                    ikon={
                        erBrukerPåInstitusjon ? (
                            <Office1Filled
                                color={NavdsSemanticColorInteractionPrimary}
                                width={48}
                                height={48}
                            />
                        ) : (
                            <KontoSirkel filled={åpen} width={48} height={48} />
                        )
                    }
                    navn={skjema.felter.bruker.verdi?.navn || 'Ukjent bruker'}
                    undertittel={
                        erBrukerPåInstitusjon ? 'Søker/Bruker er på institusjon' : 'Søker/Bruker'
                    }
                    ident={formaterIdent(skjema.felter.bruker.verdi?.personIdent ?? '')}
                />
            }
        >
            {erLesevisning() ? (
                <>Lesevisning</>
            ) : (
                <>
                    <FlexDiv>
                        <TextField
                            {...nyIdent.hentNavInputProps(!!feilMelding)}
                            error={nyIdent.hentNavInputProps(!!feilMelding).feil || feilMelding}
                            label={'Endre bruker'}
                            description={'Skriv inn brukers/søkers fødselsnummer eller D-nummer'}
                            size="small"
                        />
                        <StyledButton
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
                            loading={spinner}
                            size="small"
                            variant="secondary"
                        />
                    </FlexDiv>
                    {toggles[ToggleNavn.støtterInstitusjon] && (
                        <ReadMore
                            size="medium"
                            header="Søker er en institusjon eller enslig mindreårig"
                        >
                            <Select label="Fagsaktype" size="small" onChange={velgFagsaktype}>
                                <option value="">Velg</option>
                                <option value="institusjon">Institusjon</option>
                                <option value="enslig-mindreårig">Enslig mindreårig</option>
                            </Select>
                        </ReadMore>
                    )}
                </>
            )}

            {skjema.felter.erPåInstitusjon.verdi && (
                <FlexDiv>
                    <FamilieInput
                        {...samhandlerSkjema.felter.orgnr.hentNavInputProps(
                            samhandlerSkjema.visFeilmeldinger
                        )}
                        erLesevisning={erLesevisning()}
                        id={'hent-samhandler'}
                        label={'Institusjonens organisasjonsnummer'}
                        bredde={'XL'}
                        placeholder={'organisasjonsnummer'}
                    />
                    <StyledButton
                        onClick={() => {
                            settSpinner(true);
                            onSubmitWrapper();
                            settSpinner(false);
                        }}
                        children={'Hent institusjon'}
                        loading={spinner}
                        size="small"
                    />
                </FlexDiv>
            )}

            {skjema.felter.samhandler.verdi !== null && (
                <SamhandlerTabell samhandler={skjema.felter.samhandler.verdi}></SamhandlerTabell>
            )}
        </StyledEkspanderbartpanelBaseMedMargin>
    );
};
