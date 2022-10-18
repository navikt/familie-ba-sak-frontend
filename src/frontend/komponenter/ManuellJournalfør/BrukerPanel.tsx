import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Cancel, Office1Filled } from '@navikt/ds-icons';
import { Alert, Button, Heading, ReadMore, Select, TextField } from '@navikt/ds-react';
import { NavdsSemanticColorInteractionPrimary } from '@navikt/ds-tokens/dist/tokens';
import { useFelt, Valideringsstatus } from '@navikt/familie-skjema';
import { type Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../context/AppContext';
import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import { KontoSirkel } from '../../ikoner/KontoSirkel';
import { FagsakType, fagsakStatus } from '../../typer/fagsak';
import type { ISamhandlerInfo } from '../../typer/samhandler';
import { ToggleNavn } from '../../typer/toggles';
import { formaterIdent } from '../../utils/formatter';
import { identValidator } from '../../utils/validators';
import { SamhandlerTabell } from '../Fagsak/InstitusjonOgVerge/SamhandlerTabell';
import { useSamhandlerRequest } from '../Fagsak/InstitusjonOgVerge/useSamhandler';
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
    const {
        skjema,
        endreBrukerOgSettNormalFagsak,
        erLesevisning,
        institusjonsfagsaker,
        settMinimalFagsakTilInstitusjonsfagsak,
        settMinimalFagsakTilNormalFagsakForPerson,
    } = useManuellJournalfør();
    const { toggles } = useApp();
    const [åpen, settÅpen] = useState(false);
    const [feilMelding, settFeilMelding] = useState<string | undefined>('');
    const [spinner, settSpinner] = useState(false);
    const nyIdent = useFelt({
        verdi: '',
        valideringsfunksjon: identValidator,
    });
    const { hentSamhandler } = useSamhandlerRequest();
    const [valgtInstitusjon, settValgtInstitusjon] = useState<string>('');
    const [samhandlerFeilmelding, settSamhandlerFeilmelding] = useState<string>('');
    const [erFagsaktypePanelÅpnet, settErFagsaktypePanelÅpnet] = useState<boolean>(false);

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
        settSamhandlerFeilmelding('');
        if (valgtInstitusjon !== '' && valgtInstitusjon !== 'ny-institusjon') {
            settMinimalFagsakTilInstitusjonsfagsak(valgtInstitusjon);
            hentSamhandler(valgtInstitusjon).then((ressurs: Ressurs<ISamhandlerInfo>) => {
                if (ressurs.status === RessursStatus.SUKSESS) {
                    skjema.felter.samhandler.validerOgSettFelt(ressurs.data);
                } else {
                    skjema.felter.samhandler.nullstill();
                    settSamhandlerFeilmelding('Kan ikke hente opplysninger om institusjon');
                }
            });
        } else {
            settMinimalFagsakTilNormalFagsakForPerson(skjema.felter.bruker.verdi?.personIdent);
            skjema.felter.samhandler.nullstill();
        }
    }, [valgtInstitusjon]);

    const erBrukerPåInstitusjon = skjema.felter.fagsakType.verdi === FagsakType.INSTITUSJON;

    const oppdaterFagsaktype = (nyFagsakType: FagsakType) => {
        skjema.felter.fagsakType.validerOgSettFelt(nyFagsakType);
        if (nyFagsakType !== FagsakType.INSTITUSJON) {
            settValgtInstitusjon('');
        }
    };

    const nullstillFagsaktype = () => {
        oppdaterFagsaktype(FagsakType.NORMAL);
        settErFagsaktypePanelÅpnet(false);
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
            {!erLesevisning() && (
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
                                    nullstillFagsaktype();
                                    endreBrukerOgSettNormalFagsak(nyIdent.verdi).finally(() => {
                                        settSpinner(false);
                                    });
                                } else {
                                    settFeilMelding('Personident er ugyldig');
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
                            open={erFagsaktypePanelÅpnet}
                            onClick={() => settErFagsaktypePanelÅpnet(!erFagsaktypePanelÅpnet)}
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
                                <Select
                                    label="Institusjon"
                                    size="small"
                                    onChange={event => settValgtInstitusjon(event.target.value)}
                                >
                                    <option value="">Velg</option>
                                    {institusjonsfagsaker.status === RessursStatus.SUKSESS &&
                                        institusjonsfagsaker.data.map(({ institusjon, status }) => {
                                            return (
                                                institusjon && (
                                                    <option
                                                        value={institusjon.orgNummer}
                                                        key={institusjon.orgNummer}
                                                    >
                                                        {institusjon.orgNummer} |{' '}
                                                        {fagsakStatus[status].navn}
                                                    </option>
                                                )
                                            );
                                        })}
                                    <option value="ny-institusjon">Ny institusjon</option>
                                </Select>
                            )}
                            {skjema.felter.fagsakType.verdi !== FagsakType.NORMAL && (
                                <Button
                                    variant="tertiary"
                                    size="xsmall"
                                    onClick={nullstillFagsaktype}
                                >
                                    <Cancel />
                                    Tilbakestill
                                </Button>
                            )}
                        </ReadMore>
                    )}
                    {valgtInstitusjon === 'ny-institusjon' && (
                        <Alert variant="warning" inline>
                            <Heading size="xsmall" level="3">
                                Institusjonssak på bruker må opprettes
                            </Heading>
                            For å journalføre dokumentet, må ny fagsak av typen institusjon
                            opprettes via saksbehandlerløsningen. Når fagsaken er tilknyttet
                            godkjent institusjon, kan dokumentet journalføres.
                        </Alert>
                    )}
                </>
            )}
            {samhandlerFeilmelding && (
                <Alert variant="warning" inline>
                    {samhandlerFeilmelding}
                </Alert>
            )}
            {skjema.felter.samhandler.verdi !== undefined && (
                <SamhandlerTabell samhandler={skjema.felter.samhandler.verdi}></SamhandlerTabell>
            )}
        </StyledEkspanderbartpanelBaseMedMargin>
    );
};
