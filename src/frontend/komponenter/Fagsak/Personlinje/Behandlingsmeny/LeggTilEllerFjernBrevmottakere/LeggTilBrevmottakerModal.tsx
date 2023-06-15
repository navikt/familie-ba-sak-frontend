import React, { useState } from 'react';

import styled from 'styled-components';

import { AddCircle } from '@navikt/ds-icons';
import { Alert, Button, Heading, Modal } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../../typer/behandling';
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
    const erLesevisning = vurderErLesevisning();

    const heading = utledHeading(åpenBehandling.brevmottakere.length, erLesevisning);

    const [visSkjemaNårDetErÉnBrevmottaker, settVisSkjemaNårDetErÉnBrevmottaker] = useState(false);

    const mountedRef = React.useRef(true);
    const [fortroligePersonIdenter, settFortroligePersonIdenter] = React.useState<string[]>([]);
    const [fortroligePersonIdenterFeilmelding, settFortroligePersonIdenterFeilmelding] =
        React.useState<string>('');
    const deaktiverSkjema =
        fortroligePersonIdenterFeilmelding !== '' || fortroligePersonIdenter.length > 0;

    const erSkjemaSynlig =
        (åpenBehandling.brevmottakere.length === 0 && !erLesevisning) ||
        (åpenBehandling.brevmottakere.length === 1 && visSkjemaNårDetErÉnBrevmottaker);

    const lukkModalOgSkjema = () => {
        lukkModal();
        settVisSkjemaNårDetErÉnBrevmottaker(false);
    };

    const { request } = useHttp();

    React.useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    React.useEffect(() => {
        const personIdentArray = åpenBehandling.personer.map(p => p.personIdent);
        hentPersonerMedAdresseBeskyttelse(personIdentArray);
    }, [åpenBehandling.personer]);

    const hentPersonerMedAdresseBeskyttelse = async (personIdentArray: string[]) => {
        if (personIdentArray.length) {
            settFortroligePersonIdenterFeilmelding('');
            await request<string[], string[]>({
                method: 'POST',
                url: '/familie-ba-sak/api/person/personidenterMedStrengtFortroligGradering',
                data: personIdentArray,
            })
                .then((response: Ressurs<string[]>) => {
                    if (!mountedRef.current) return null;
                    if (response.status === RessursStatus.SUKSESS) {
                        settFortroligePersonIdenter(response.data);
                    } else if (
                        response.status === RessursStatus.FEILET ||
                        response.status === RessursStatus.FUNKSJONELL_FEIL ||
                        response.status === RessursStatus.IKKE_TILGANG
                    ) {
                        settFortroligePersonIdenterFeilmelding(
                            'Feil ved validering for personer med strengt fortrolig adresse med manuelle brevmottakere satt: ' +
                                response.frontendFeilmelding
                        );
                    } else {
                        settFortroligePersonIdenterFeilmelding(
                            'Ugyldig status returnert ved validering for personer med strengt fortrolig adresse med manuelle brevmottakere satt: ' +
                                response.status
                        );
                    }
                })
                .catch(err => {
                    if (!mountedRef.current) return null;
                    settFortroligePersonIdenterFeilmelding(
                        'En feil oppstod ved validering for personer med strengt fortrolig adresse med manuelle brevmottakere satt: ' +
                            err.message
                    );
                });
        } else {
            settFortroligePersonIdenter([]);
        }
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
                            fortroligePersonIdenter={fortroligePersonIdenter}
                            fortroligePersonIdenterFeilmelding={fortroligePersonIdenterFeilmelding}
                            deaktiverSkjema={deaktiverSkjema}
                        />
                    </>
                ) : (
                    <>
                        {åpenBehandling.brevmottakere.length === 1 && !erLesevisning && (
                            <>
                                <LeggTilKnapp
                                    disabled={deaktiverSkjema}
                                    variant="tertiary"
                                    size="small"
                                    icon={<AddCircle />}
                                    onClick={() => settVisSkjemaNårDetErÉnBrevmottaker(true)}
                                >
                                    Legg til ny mottaker
                                </LeggTilKnapp>
                            </>
                        )}

                        <BrevmottakerValideringAlert
                            åpenBehandling={åpenBehandling}
                            fortroligePersonIdenter={fortroligePersonIdenter}
                            fortroligePersonIdenterFeilmelding={fortroligePersonIdenterFeilmelding}
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
