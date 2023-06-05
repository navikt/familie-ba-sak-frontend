import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import {
    BodyShort,
    Button,
    ErrorMessage,
    Heading,
    Modal,
    ReadMore,
    Select,
} from '@navikt/ds-react';
import { FamilieInput } from '@navikt/familie-form-elements';
import type { ISøkeresultat } from '@navikt/familie-header';
import { Valideringsstatus } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import { useHentFagsakerForPerson } from '../../../context/fagsak/useHentFagsakerForPerson';
import type { IBaseFagsak, IMinimalFagsak } from '../../../typer/fagsak';
import { FagsakType, mapMinimalFagsakTilBaseFagsak } from '../../../typer/fagsak';
import type { IPersonInfo } from '../../../typer/person';
import type { ISamhandlerInfo } from '../../../typer/samhandler';
import { ToggleNavn } from '../../../typer/toggles';
import { formaterIdent, formaterNavnAlderOgIdent } from '../../../utils/formatter';
import { SamhandlerTabell } from '../../Fagsak/InstitusjonOgVerge/SamhandlerTabell';
import { useSamhandlerSkjema } from '../../Fagsak/InstitusjonOgVerge/useSamhandler';
import useOpprettFagsak from './useOpprettFagsak';

export interface IOpprettFagsakModal {
    lukkModal: () => void;
    søkeresultat?: ISøkeresultat | undefined;
    personInfo?: IPersonInfo;
}

const StyledDiv = styled.div`
    margin-top: 2rem;
    display: flex;
`;

const StyledButton = styled(Button)`
    align-self: end;
    margin-left: 1rem;
`;

const StyledHeading = styled(Heading)`
    margin-bottom: 1.5rem;
`;

const StyledFagsakOptionsDiv = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: fit-content;
    min-width: 20rem;
`;

const StyledModalContent = styled(Modal.Content)`
    padding: 2.5rem;
    width: 40rem;
`;

const StyledReadMore = styled(ReadMore)`
    margin-top: 2rem;
`;

const StyledBodyShort = styled(BodyShort)`
    margin-bottom: 2rem;
`;

const fagsakTypeOptions = [
    {
        value: FagsakType.NORMAL,
        label: 'Velg',
    },
    {
        value: FagsakType.INSTITUSJON,
        label: 'Institusjon',
    },
    {
        value: FagsakType.BARN_ENSLIG_MINDREÅRIG,
        label: 'Enslig mindreårig',
    },
];

const KnappHøyre = styled(Button)`
    float: right;
    margin-left: 1rem;
`;

const Knapperad = styled.div`
    width: 100%;
    position: relative;
    display: inline-block;
    margin-top: 2.5rem;
`;

const OpprettFagsakModal: React.FC<IOpprettFagsakModal> = ({
    lukkModal,
    søkeresultat,
    personInfo,
}) => {
    const [bruker, settBruker] = useState(personInfo);
    const [fagsakerPåBruker, settFagsakerPåBruker] = useState<IBaseFagsak[]>();
    const [harHentetFagsaker, settHarHentetFagsaker] = useState<boolean>(false);
    const { opprettFagsak, feilmelding, settFeilmelding, senderInn, settSenderInn } =
        useOpprettFagsak();
    const { hentPerson, sjekkTilgang } = useApp();
    const { toggles } = useApp();
    const { hentFagsakerForPerson } = useHentFagsakerForPerson();
    const visModal = (!!personInfo && harHentetFagsaker) || !!søkeresultat;
    const harFagsak = (fagsakerPåBruker?.length || 0) > 0;
    const harNormalFagsak = fagsakerPåBruker?.some(
        fagsak => fagsak.fagsakType === FagsakType.NORMAL
    );
    const [fagsakType, settFagsakType] = useState<FagsakType>(
        harNormalFagsak ? FagsakType.INSTITUSJON : FagsakType.NORMAL
    );
    const [visFeilmelding, settVisFeilmelding] = useState(false);
    const [valgtSamhandler, settValgtSamhandler] = useState<ISamhandlerInfo | undefined>(undefined);
    const [spinner, settSpinner] = useState(false);
    const { onSubmitWrapper, samhandlerSkjema } = useSamhandlerSkjema(
        () => {
            settSpinner(false);
            settFeilmelding('');
            settVisFeilmelding(false);
        },
        error => {
            settFeilmelding(error);
            settVisFeilmelding(true);
            settSpinner(false);
        }
    );

    const onClose = () => {
        settFagsakType(FagsakType.NORMAL);
        settVisFeilmelding(false);
        settValgtSamhandler(undefined);
        lukkModal();
    };

    useEffect(() => {
        if (bruker === undefined && søkeresultat) {
            hentPerson(søkeresultat.ident).then(personRessurs => {
                if (personRessurs.status === RessursStatus.SUKSESS) {
                    settBruker(personRessurs.data);
                }
            });
        }
    }, [søkeresultat]);

    useEffect(() => {
        // Henter kun fagsaker fra saksoversikten
        if (personInfo && personInfo.harTilgang) {
            hentFagsakerForPerson(personInfo.personIdent).then(
                (fagsaker: Ressurs<IMinimalFagsak[]>) => {
                    if (fagsaker.status === RessursStatus.SUKSESS) {
                        settFagsakerPåBruker(fagsaker.data.map(mapMinimalFagsakTilBaseFagsak));
                    }
                    settHarHentetFagsaker(true);
                }
            );
        }
    }, [personInfo]);

    useEffect(() => {
        if (samhandlerSkjema.submitRessurs.status === RessursStatus.SUKSESS) {
            settValgtSamhandler(samhandlerSkjema.submitRessurs.data);
            settVisFeilmelding(false);
        }
    }, [samhandlerSkjema.submitRessurs.status]);

    const valgAvFagsakType = () => (
        <>
            <StyledFagsakOptionsDiv>
                <Select
                    label={'Fagsaktype'}
                    onChange={(event): void => {
                        settFagsakType(
                            Object.values(FagsakType).find(type => type === event.target.value) ||
                                FagsakType.NORMAL
                        );
                    }}
                    children={fagsakTypeOptions
                        .filter(valg => (harNormalFagsak ? valg.value !== FagsakType.NORMAL : true))
                        .filter(
                            valg =>
                                (valg.value === FagsakType.BARN_ENSLIG_MINDREÅRIG &&
                                    toggles[ToggleNavn.støtterEnsligMindreårig]) ||
                                valg.value !== FagsakType.BARN_ENSLIG_MINDREÅRIG
                        )
                        .map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    value={fagsakTypeOptions.find(option => option.value === fagsakType)?.value}
                    size={'small'}
                />
                {fagsakType === FagsakType.INSTITUSJON && (
                    <StyledDiv>
                        <FamilieInput
                            {...samhandlerSkjema.felter.orgnr.hentNavInputProps(
                                samhandlerSkjema.visFeilmeldinger
                            )}
                            erLesevisning={false}
                            id={'hent-samhandler'}
                            label={'Organisasjonsnummer'}
                            onChange={event =>
                                samhandlerSkjema.felter.orgnr.validerOgSettFelt(
                                    event.target.value.replaceAll(' ', '')
                                )
                            }
                            onKeyDown={event => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    onSubmitWrapper();
                                }
                            }}
                            size={'small'}
                        />

                        <StyledButton
                            onClick={() => {
                                if (
                                    samhandlerSkjema.felter.orgnr.valideringsstatus !==
                                    Valideringsstatus.FEIL
                                ) {
                                    settSpinner(true);
                                }
                                onSubmitWrapper();
                            }}
                            children={'Hent institusjon'}
                            size={'small'}
                            variant={'secondary'}
                            loading={spinner}
                        />
                    </StyledDiv>
                )}
            </StyledFagsakOptionsDiv>
            {fagsakType === FagsakType.INSTITUSJON && valgtSamhandler !== undefined && (
                <SamhandlerTabell samhandler={valgtSamhandler} />
            )}
        </>
    );
    return (
        <Modal open={visModal} onClose={onClose} shouldCloseOnOverlayClick={false}>
            <StyledModalContent>
                <StyledHeading size={'medium'} level={'2'}>
                    {harNormalFagsak
                        ? 'Opprett fagsak for institusjon eller enslig mindreårig'
                        : 'Opprett fagsak'}
                </StyledHeading>
                <StyledBodyShort>
                    {`${harFagsak ? 'Personen har allerede en tilknyttet fagsak. ' : ''}
                        Ønsker du å opprette ${harFagsak ? 'ny' : ''} fagsak for denne personen?`}
                </StyledBodyShort>
                {bruker ? (
                    <BodyShort>
                        &ensp;&bull;&ensp;{formaterNavnAlderOgIdent({ ...bruker })}
                    </BodyShort>
                ) : (
                    <BodyShort>
                        &ensp;&bull;&ensp;
                        {`${søkeresultat?.navn || ''} (${formaterIdent(
                            søkeresultat?.ident || ''
                        )})`}
                    </BodyShort>
                )}
                {harNormalFagsak ? (
                    valgAvFagsakType()
                ) : (
                    <StyledReadMore
                        header={'Søker er en institusjon eller enslig mindreårig'}
                        defaultOpen={false}
                        onClick={() => {
                            if (fagsakType !== FagsakType.NORMAL) {
                                settFagsakType(FagsakType.NORMAL);
                            }
                        }}
                    >
                        {valgAvFagsakType()}
                    </StyledReadMore>
                )}

                {!!feilmelding && visFeilmelding && <ErrorMessage children={feilmelding} />}
                <Knapperad>
                    <KnappHøyre
                        key={'Bekreft'}
                        variant={'primary'}
                        onClick={async () => {
                            settSenderInn(true);
                            const personIdent = søkeresultat?.ident || personInfo?.personIdent;

                            if (personIdent && (await sjekkTilgang(personIdent))) {
                                opprettFagsak(
                                    {
                                        personIdent: personIdent,
                                        aktørId: null,
                                        fagsakType: fagsakType,
                                        institusjon: valgtSamhandler
                                            ? {
                                                  orgNummer: valgtSamhandler.orgNummer,
                                                  tssEksternId: valgtSamhandler.tssEksternId,
                                              }
                                            : null,
                                    },
                                    onClose
                                );
                            } else {
                                settSenderInn(false);
                            }
                            settVisFeilmelding(true);
                        }}
                        disabled={senderInn}
                        loading={senderInn}
                    >
                        Opprett fagsak
                    </KnappHøyre>
                    <KnappHøyre key={'avbryt'} variant={'tertiary'} onClick={onClose}>
                        Avbryt
                    </KnappHøyre>
                </Knapperad>
            </StyledModalContent>
        </Modal>
    );
};

export default OpprettFagsakModal;
