import React, { useState } from 'react';

import styled from 'styled-components';

import { AddCircle } from '@navikt/ds-icons';
import { Alert, Button, Heading, Modal } from '@navikt/ds-react';
import { Adressebeskyttelsegradering, hentDataFraRessurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { useFagsakContext } from '../../../../../context/fagsak/FagsakContext';
import type { IBehandling } from '../../../../../typer/behandling';
import type { IGrunnlagPerson } from '../../../../../typer/person';
import BrevmottakerSkjema from './BrevmottakerSkjema';
import BrevmottakerTabell from './BrevmottakerTabell';
import BrevmottakerValideringAlert from './BrevmottakerValideringAlert';

const StyledModal = styled(Modal)`
    width: 35rem;
`;
const StyledAlert = styled(Alert)`
    margin: 1rem 0 2.5rem;
`;
const StyledHeading = styled(Heading)`
    margin: 1rem 0 0.75rem;
`;
const LeggTilKnapp = styled(Button)`
    margin-top: 1rem;
`;
const LukkKnapp = styled(Button)`
    margin-top: 2.5rem;
`;

interface Props {
    visModal: boolean;
    lukkModal: () => void;
    åpenBehandling: IBehandling;
}

const utledHeading = (antallMottakere: number, erLesevisning: boolean) => {
    if (erLesevisning) {
        return antallMottakere === 1 ? 'Brevmottaker' : 'Brevmottakere';
    } else {
        return antallMottakere === 0
            ? 'Legg til brevmottaker'
            : antallMottakere === 1
            ? 'Legg til eller fjern brevmottaker'
            : 'Brevmottakere';
    }
};

export const LeggTilBrevmottakerModal: React.FC<Props> = ({
    visModal,
    lukkModal,
    åpenBehandling,
}: Props) => {
    const { vurderErLesevisning } = useBehandling();
    const { bruker, søknadsskjemaHarValgtStrengtFortroligBarn } = useFagsakContext();
    const erLesevisning = vurderErLesevisning();

    const heading = utledHeading(åpenBehandling.brevmottakere.length, erLesevisning);

    const brukerData = hentDataFraRessurs(bruker);
    const erBrukerStrengtFortrolig =
        brukerData?.adressebeskyttelseGradering === Adressebeskyttelsegradering.STRENGT_FORTROLIG ||
        brukerData?.adressebeskyttelseGradering ===
            Adressebeskyttelsegradering.STRENGT_FORTROLIG_UTLAND;
    const sjekkAtBarnIkkeErStrengtFortrolig = (person: IGrunnlagPerson) => {
        return !brukerData?.forelderBarnRelasjon.some(
            barn =>
                barn.personIdent === person.personIdent &&
                (Adressebeskyttelsegradering.STRENGT_FORTROLIG ===
                    barn.adressebeskyttelseGradering ||
                    Adressebeskyttelsegradering.STRENGT_FORTROLIG_UTLAND ===
                        barn.adressebeskyttelseGradering)
        );
    };

    const finnesStrengtFortroligBarnIBehandling = !åpenBehandling.personer.every(person =>
        sjekkAtBarnIkkeErStrengtFortrolig(person)
    );
    const deaktiverSkjema =
        erBrukerStrengtFortrolig ||
        finnesStrengtFortroligBarnIBehandling ||
        søknadsskjemaHarValgtStrengtFortroligBarn;

    const [visSkjemaNårDetErÉnBrevmottaker, settVisSkjemaNårDetErÉnBrevmottaker] = useState(false);

    const erSkjemaSynlig =
        (åpenBehandling.brevmottakere.length === 0 && !erLesevisning) ||
        (åpenBehandling.brevmottakere.length === 1 && visSkjemaNårDetErÉnBrevmottaker);

    const lukkModalOgSkjema = () => {
        lukkModal();
        settVisSkjemaNårDetErÉnBrevmottaker(false);
    };

    return (
        <StyledModal
            open={visModal}
            aria-label={heading}
            onClose={lukkModalOgSkjema}
            shouldCloseOnOverlayClick={false}
        >
            <Modal.Content>
                <Heading spacing level="2" size="medium" id="modal-heading">
                    {heading}
                </Heading>
                <StyledAlert variant="info">
                    Brev sendes til brukers folkeregistrerte adresse eller annen foretrukken kanal.
                    Legg til mottaker dersom brev skal sendes til utenlandsk adresse, fullmektig,
                    verge eller dødsbo.
                </StyledAlert>
                {åpenBehandling.brevmottakere.map(mottaker => (
                    <BrevmottakerTabell mottaker={mottaker} key={`mottaker-${mottaker.id}`} />
                ))}
                {erSkjemaSynlig ? (
                    <>
                        {åpenBehandling.brevmottakere.length === 1 && (
                            <StyledHeading size="medium">Ny mottaker</StyledHeading>
                        )}
                        <BrevmottakerSkjema
                            lukkModal={lukkModalOgSkjema}
                            åpenBehandling={åpenBehandling}
                            erBrukerStrengtFortrolig={erBrukerStrengtFortrolig}
                            finnesStrengtFortroligBarnIBehandling={
                                finnesStrengtFortroligBarnIBehandling
                            }
                            søknadsskjemaHarValgtStrengtFortroligBarn={
                                søknadsskjemaHarValgtStrengtFortroligBarn
                            }
                        />
                    </>
                ) : (
                    <>
                        {åpenBehandling.brevmottakere.length === 1 && !erLesevisning && (
                            <LeggTilKnapp
                                disabled={deaktiverSkjema}
                                variant="tertiary"
                                size="small"
                                icon={<AddCircle />}
                                onClick={() => settVisSkjemaNårDetErÉnBrevmottaker(true)}
                            >
                                Legg til ny mottaker
                            </LeggTilKnapp>
                        )}

                        <BrevmottakerValideringAlert
                            åpenBehandling={åpenBehandling}
                            erBrukerStrengtFortrolig={erBrukerStrengtFortrolig}
                            finnesStrengtFortroligBarnIBehandling={
                                finnesStrengtFortroligBarnIBehandling
                            }
                            søknadsskjemaHarValgtStrengtFortroligBarn={
                                søknadsskjemaHarValgtStrengtFortroligBarn
                            }
                        />

                        <div>
                            <LukkKnapp onClick={lukkModal}>Lukk vindu</LukkKnapp>
                        </div>
                    </>
                )}
            </Modal.Content>
        </StyledModal>
    );
};
