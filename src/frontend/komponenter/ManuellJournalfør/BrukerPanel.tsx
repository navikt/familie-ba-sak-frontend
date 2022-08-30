import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { FamilieCheckbox, FamilieInput, FamilieKnapp } from '@navikt/familie-form-elements';
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

const StyledDiv = styled.div`
    display: flex;
`;

const StyledCheckBoxWrapper = styled.div`
    margin-bottom: 1rem;
`;

const StyledKnapp = styled(FamilieKnapp)`
    margin-left: 1rem;
    margin-top: auto;
    height: 1rem;
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
                    ikon={<KontoSirkel filled={åpen} width={48} height={48} />}
                    navn={skjema.felter.bruker.verdi?.navn || 'Ukjent bruker'}
                    undertittel={'Søker/Bruker'}
                    ident={formaterIdent(skjema.felter.bruker.verdi?.personIdent ?? '')}
                />
            }
        >
            {toggles[ToggleNavn.støtterInstitusjon] && (
                <div>
                    <StyledCheckBoxWrapper>
                        <FamilieCheckbox
                            id={'enslig-mindreårig'}
                            erLesevisning={false}
                            label={'Bruker er enslig mindreårig'}
                            checked={skjema.felter.erEnsligMindreårig.verdi}
                            disabled={skjema.felter.erPåInstitusjon.verdi}
                            onChange={() => {
                                if (erLesevisning()) {
                                    return;
                                }
                                const oppdatertVerdi = !skjema.felter.erEnsligMindreårig.verdi;
                                skjema.felter.erEnsligMindreårig.validerOgSettFelt(oppdatertVerdi);
                                if (skjema.felter.bruker.verdi) {
                                    endreBruker(
                                        skjema.felter.bruker.verdi?.personIdent,
                                        oppdatertVerdi,
                                        skjema.felter.erPåInstitusjon.verdi
                                    );
                                }
                            }}
                        />
                    </StyledCheckBoxWrapper>
                    <StyledCheckBoxWrapper>
                        <FamilieCheckbox
                            id={'på-institusjon'}
                            erLesevisning={false}
                            label={'Bruker er på institusjon'}
                            checked={skjema.felter.erPåInstitusjon.verdi}
                            disabled={skjema.felter.erEnsligMindreårig.verdi}
                            onChange={() => {
                                if (erLesevisning()) {
                                    return;
                                }
                                const oppdatertVerdi = !skjema.felter.erPåInstitusjon.verdi;
                                skjema.felter.erPåInstitusjon.validerOgSettFelt(oppdatertVerdi);
                                if (skjema.felter.bruker.verdi) {
                                    endreBruker(
                                        skjema.felter.bruker.verdi?.personIdent,
                                        skjema.felter.erEnsligMindreårig.verdi,
                                        oppdatertVerdi
                                    );
                                }
                            }}
                        />
                    </StyledCheckBoxWrapper>
                </div>
            )}
            {skjema.felter.erPåInstitusjon.verdi && (
                <StyledDiv>
                    {!erLesevisning() && (
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
                    )}
                    <StyledKnapp
                        onClick={() => {
                            settSpinner(true);
                            onSubmitWrapper();
                            settSpinner(false);
                        }}
                        children={'Hent institusjon'}
                        spinner={spinner}
                        mini={true}
                        erLesevisning={erLesevisning()}
                    />
                </StyledDiv>
            )}

            {skjema.felter.samhandler.verdi !== null && (
                <SamhandlerTabell samhandler={skjema.felter.samhandler.verdi}></SamhandlerTabell>
            )}
            <br />
            <StyledDiv>
                {!erLesevisning() && (
                    <FamilieInput
                        {...nyIdent.hentNavInputProps(!!feilMelding)}
                        feil={nyIdent.hentNavInputProps(!!feilMelding).feil || feilMelding}
                        erLesevisning={erLesevisning()}
                        id={'hent-person'}
                        label={'Skriv inn fødselsnummer/D-nummer'}
                        bredde={'XL'}
                        placeholder={'fnr/dnr'}
                    />
                )}
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
        </StyledEkspanderbartpanelBaseMedMargin>
    );
};
