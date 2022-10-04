import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Office1Filled } from '@navikt/ds-icons';
import { Button, ReadMore, Select, TextField } from '@navikt/ds-react';
import { NavdsSemanticColorInteractionPrimary } from '@navikt/ds-tokens/dist/tokens';
import { useFelt, Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../context/AppContext';
import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import { KontoSirkel } from '../../ikoner/KontoSirkel';
import { FagsakType } from '../../typer/fagsak';
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
    margin-top: auto;
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
    const { samhandlerSkjema } = useSamhandlerSkjema();

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

    const erBrukerPåInstitusjon = skjema.felter.fagsakType.verdi === FagsakType.INSTITUSJON;

    const oppdaterFagsaktype = (nyFagsakType: FagsakType) => {
        skjema.felter.fagsakType.validerOgSettFelt(nyFagsakType);
        if (skjema.felter.bruker.verdi) {
            endreBruker(skjema.felter.bruker.verdi?.personIdent, nyFagsakType);
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
                            <Select
                                label="Fagsaktype"
                                size="small"
                                onChange={event =>
                                    oppdaterFagsaktype(event.target.value as FagsakType)
                                }
                                value={skjema.felter.fagsakType.verdi}
                            >
                                <option value={FagsakType.NORMAL}>Velg</option>
                                <option value={FagsakType.INSTITUSJON}>Institusjon</option>
                                <option value={FagsakType.BARN_ENSLIG_MINDREÅRIG}>
                                    Enslig mindreårig
                                </option>
                            </Select>
                            {erBrukerPåInstitusjon && (
                                <Select label="Institusjon" size="small">
                                    <option value="">Velg</option>
                                    <option value="ny-institusjon">Ny institusjon</option>
                                </Select>
                            )}
                        </ReadMore>
                    )}
                </>
            )}

            {skjema.felter.samhandler.verdi !== null && (
                <SamhandlerTabell samhandler={skjema.felter.samhandler.verdi}></SamhandlerTabell>
            )}
        </StyledEkspanderbartpanelBaseMedMargin>
    );
};
