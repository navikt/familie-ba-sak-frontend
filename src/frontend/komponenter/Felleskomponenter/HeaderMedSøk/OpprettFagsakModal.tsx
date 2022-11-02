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
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import type { IBaseFagsak } from '../../../typer/fagsak';
import { FagsakType } from '../../../typer/fagsak';
import type { IPersonInfo } from '../../../typer/person';
import type { ISamhandlerInfo } from '../../../typer/samhandler';
import { ToggleNavn } from '../../../typer/toggles';
import { formaterIdent, formaterNavnAlderOgIdent } from '../../../utils/formatter';
import { Knapperad } from '../../Fagsak/Behandlingsresultat/EøsPeriode/fellesKomponenter';
import { SamhandlerTabell } from '../../Fagsak/InstitusjonOgVerge/SamhandlerTabell';
import { useSamhandlerSkjema } from '../../Fagsak/InstitusjonOgVerge/useSamhandler';
import useOpprettFagsak from './useOpprettFagsak';

export interface IOpprettFagsakModal {
    lukkModal: () => void;
    søkeresultat?: ISøkeresultat | undefined;
    personInfo?: IPersonInfo;
    fagsakerPåBruker?: IBaseFagsak[];
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
    font-size: 1rem;
    margin-bottom: 1.5rem;
`;

const StyledFagsakOptionsDiv = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: fit-content;
    min-width: 20rem;
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

const OpprettFagsakModal: React.FC<IOpprettFagsakModal> = ({
    lukkModal,
    søkeresultat,
    personInfo,
    fagsakerPåBruker,
}) => {
    const [bruker, settBruker] = useState(personInfo);
    const { opprettFagsak, feilmelding, settFeilmelding, senderInn, settSenderInn } =
        useOpprettFagsak();
    const { hentPerson, sjekkTilgang, toggles } = useApp();
    const visModal = !!søkeresultat || !!personInfo;
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
        <>
            {!toggles[ToggleNavn.støtterInstitusjon].valueOf() && (
                <Modal open={visModal} onClose={lukkModal} shouldCloseOnOverlayClick={false}>
                    <Modal.Content>
                        <StyledHeading size={'small'} level={'3'}>
                            Opprett fagsak
                        </StyledHeading>
                        <StyledBodyShort>
                            Personen har ingen tilknyttet fagsak. Ønsker du å opprette fagsak for
                            denne personen?
                            {søkeresultat && (
                                <BodyShort>{`${søkeresultat.navn} (${formaterIdent(
                                    søkeresultat.ident
                                )})`}</BodyShort>
                            )}
                            {!!feilmelding && <ErrorMessage children={feilmelding} />}
                        </StyledBodyShort>
                        <Knapperad>
                            <Button
                                variant={'secondary'}
                                key={'avbryt'}
                                size={'small'}
                                onClick={lukkModal}
                                children={'Avbryt'}
                            />
                            ,
                            <Button
                                key={'bekreft'}
                                variant={'primary'}
                                size={'small'}
                                onClick={async () => {
                                    settSenderInn(true);
                                    if (søkeresultat && (await sjekkTilgang(søkeresultat.ident))) {
                                        opprettFagsak(
                                            {
                                                personIdent: søkeresultat.ident,
                                                aktørId: null,
                                                fagsakType: FagsakType.NORMAL,
                                                institusjon: null,
                                            },
                                            lukkModal
                                        );
                                    } else {
                                        settSenderInn(false);
                                    }
                                }}
                                children={'Ja, opprett fagsak'}
                                disabled={senderInn}
                                loading={senderInn}
                            />
                            ,
                        </Knapperad>
                    </Modal.Content>
                </Modal>
            )}
            {toggles[ToggleNavn.støtterInstitusjon].valueOf() && (
                <Modal
                    open={visModal}
                    onClose={onClose}
                    shouldCloseOnOverlayClick={false}
                    className={'uimodal-wider'}
                >
                    <Modal.Content>
                        <StyledHeading>
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
                            <Button
                                key={'avbryt'}
                                variant={'tertiary'}
                                size={'small'}
                                onClick={onClose}
                                children={'Avbryt'}
                            />
                            <Button
                                key={'Bekreft'}
                                variant={'primary'}
                                size={'small'}
                                onClick={async () => {
                                    settSenderInn(true);
                                    const personIdent =
                                        søkeresultat?.ident || personInfo?.personIdent;

                                    if (personIdent && (await sjekkTilgang(personIdent))) {
                                        opprettFagsak(
                                            {
                                                personIdent: personIdent,
                                                aktørId: null,
                                                fagsakType: fagsakType,
                                                institusjon: valgtSamhandler
                                                    ? {
                                                          orgNummer: valgtSamhandler.orgNummer,
                                                          tssEksternId:
                                                              valgtSamhandler.tssEksternId,
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
                                children={'Opprett fagsak'}
                                disabled={senderInn}
                                loading={senderInn}
                            />
                        </Knapperad>
                    </Modal.Content>
                </Modal>
            )}
        </>
    );
};

export default OpprettFagsakModal;
