import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Feilmelding, Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { BodyShort, ReadMore } from '@navikt/ds-react';
import { FamilieInput, FamilieKnapp, FamilieReactSelect } from '@navikt/familie-form-elements';
import type { ISøkeresultat } from '@navikt/familie-header';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import { FagsakType, type IBaseFagsak } from '../../../typer/fagsak';
import type { IPersonInfo } from '../../../typer/person';
import type { ISamhandlerInfo } from '../../../typer/samhandler';
import { ToggleNavn } from '../../../typer/toggles';
import { formaterIdent, formaterNavnAlderOgIdent } from '../../../utils/formatter';
import { SamhandlerTabell } from '../../Fagsak/InstitusjonOgVerge/SamhandlerTabell';
import { useSamhandlerSkjema } from '../../Fagsak/InstitusjonOgVerge/useSamhandler';
import UIModalWrapper from '../Modal/UIModalWrapper';
import useOpprettFagsak from './useOpprettFagsak';

export interface IOpprettFagsakModal {
    lukkModal: () => void;
    søkeresultat?: ISøkeresultat | undefined;
    personInfo?: IPersonInfo;
    fagsakerPåBruker?: IBaseFagsak[];
}

const StyledDiv = styled.div`
    padding-top: 1rem;
    display: flex;
`;

const StyledKnapp = styled(FamilieKnapp)`
    margin-left: 1rem;
    margin-top: auto;
    height: 1rem;
`;

const StyledUndertittel = styled(Undertittel)`
    font-size: 1rem;
    margin-bottom: 1.5rem;
`;

const StyledKnappContainer = styled.div`
    margin-top: 2rem;
    margin-bottom: 0.5rem;
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
    const { opprettFagsak, feilmelding, senderInn, settSenderInn } = useOpprettFagsak();
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
    const { onSubmitWrapper, samhandlerSkjema } = useSamhandlerSkjema();

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
    }, []);

    useEffect(() => {
        if (samhandlerSkjema.submitRessurs.status === RessursStatus.SUKSESS) {
            settValgtSamhandler(samhandlerSkjema.submitRessurs.data);
            settVisFeilmelding(false);
        }
    }, [samhandlerSkjema.submitRessurs.status]);

    const valgAvFagsakType = () => (
        <>
            <StyledFagsakOptionsDiv>
                <FamilieReactSelect
                    label={'Fagsaktype'}
                    options={fagsakTypeOptions}
                    onChange={(valgtType): void => {
                        if (valgtType && 'value' in valgtType) {
                            settFagsakType(
                                Object.values(FagsakType).find(type => type === valgtType.value) ||
                                    FagsakType.NORMAL
                            );
                        }
                    }}
                    value={fagsakTypeOptions.find(option => option.value === fagsakType)}
                    isClearable={false}
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
                            bredde={'XL'}
                            mini={true}
                        />

                        <StyledKnapp
                            onClick={() => {
                                onSubmitWrapper();
                            }}
                            children={'Hent institusjon'}
                            erLesevisning={false}
                            mini={true}
                            kompakt={true}
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
                <UIModalWrapper
                    modal={{
                        actions: [
                            <Knapp
                                key={'avbryt'}
                                mini={true}
                                onClick={lukkModal}
                                children={'Avbryt'}
                            />,
                            <Knapp
                                key={'bekreft'}
                                type={'hoved'}
                                mini={true}
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
                                spinner={senderInn}
                            />,
                        ],
                        onClose: lukkModal,
                        lukkKnapp: true,
                        tittel: 'Opprett fagsak',
                        visModal: visModal,
                    }}
                >
                    <StyledUndertittel tag={'h3'}>
                        Personen har ingen tilknyttet fagsak. Ønsker du å opprette fagsak for denne
                        personen?
                    </StyledUndertittel>
                    {søkeresultat && (
                        <Normaltekst>{`${søkeresultat.navn} (${formaterIdent(
                            søkeresultat.ident
                        )})`}</Normaltekst>
                    )}
                    {!!feilmelding && <Feilmelding children={feilmelding} />}
                </UIModalWrapper>
            )}
            {toggles[ToggleNavn.støtterInstitusjon].valueOf() && (
                <UIModalWrapper
                    modal={{
                        actions: [
                            <StyledKnappContainer key={'OpprettFagsakModal knapper'}>
                                <Knapp
                                    key={'avbryt'}
                                    type={'flat'}
                                    mini={true}
                                    onClick={onClose}
                                    children={'Avbryt'}
                                    kompakt={true}
                                />
                                <Knapp
                                    key={'Bekreft'}
                                    type={'hoved'}
                                    mini={true}
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
                                    spinner={senderInn}
                                    kompakt={true}
                                />
                            </StyledKnappContainer>,
                        ],
                        onClose: onClose,
                        lukkKnapp: true,
                        tittel: harNormalFagsak
                            ? 'Opprett fagsak for institusjon eller enslig mindreårig'
                            : 'Opprett fagsak',
                        visModal: visModal,
                        className: 'uimodal-wider',
                    }}
                >
                    <StyledBodyShort>
                        {`${harFagsak ? 'Personen har allerede en tilknyttet fagsak. ' : ''}
                        Ønsker du å opprette ${harFagsak ? 'ny' : ''} fagsak for denne personen?`}
                    </StyledBodyShort>
                    {bruker && (
                        <BodyShort>
                            &ensp;&bull;&ensp;{formaterNavnAlderOgIdent({ ...bruker })}
                        </BodyShort>
                    )}
                    {!bruker && (
                        <BodyShort>
                            &ensp;&bull;&ensp;
                            {`${søkeresultat?.navn || ''} (${formaterIdent(
                                søkeresultat?.ident || ''
                            )})`}
                        </BodyShort>
                    )}
                    {harNormalFagsak && valgAvFagsakType()}
                    {!harNormalFagsak && (
                        <StyledReadMore
                            header={'Søker er en institusjon eller enslig mindreårig'}
                            defaultOpen={false}
                            onClick={() => settFagsakType(FagsakType.NORMAL)}
                        >
                            {valgAvFagsakType()}
                        </StyledReadMore>
                    )}

                    {!!feilmelding && visFeilmelding && <Feilmelding children={feilmelding} />}
                </UIModalWrapper>
            )}
        </>
    );
};

export default OpprettFagsakModal;
