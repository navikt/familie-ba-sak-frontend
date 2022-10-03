import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Feilmelding, Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { ReadMore } from '@navikt/ds-react';
import {
    FamilieInput,
    FamilieKnapp,
    FamilieReactSelect,
    type OptionType,
} from '@navikt/familie-form-elements';
import type { ISøkeresultat } from '@navikt/familie-header';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import { FagsakType, type IBaseFagsak } from '../../../typer/fagsak';
import type { IPersonInfo } from '../../../typer/person';
import type { ISamhandlerInfo } from '../../../typer/samhandler';
import { ToggleNavn } from '../../../typer/toggles';
import { formaterIdent } from '../../../utils/formatter';
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
    margin-top: 1.2rem;
    margin-bottom: 0.5rem;
`;

const StyledFagsaktypeWrapper = styled.div`
    margin-top: 1.2rem;
    margin-bottom: 1rem;
`;

const StyledReadMore = styled(ReadMore)`
    margin-top: 1.5rem;
`;

const fagsakTypeOptions = Object.values(FagsakType)
    .filter(type => type !== FagsakType.NORMAL)
    .map<OptionType>(fagsakType => {
        return {
            value: fagsakType,
            label: fagsakType === FagsakType.INSTITUSJON ? 'Institusjon' : 'Enslig mindreårig',
        };
    });

const OpprettFagsakModal: React.FC<IOpprettFagsakModal> = ({
    lukkModal,
    søkeresultat,
    personInfo,
    fagsakerPåBruker,
}) => {
    const { opprettFagsak, feilmelding, senderInn, settSenderInn } = useOpprettFagsak();
    const { sjekkTilgang, toggles } = useApp();
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
        if (samhandlerSkjema.submitRessurs.status === RessursStatus.SUKSESS) {
            settValgtSamhandler(samhandlerSkjema.submitRessurs.data);
            settVisFeilmelding(false);
        }
    }, [samhandlerSkjema.submitRessurs.status]);

    const fagsaktypeVelger = () => (
        <StyledFagsaktypeWrapper>
            <FamilieReactSelect
                label={'Fagsaktype'}
                onChange={(fagsaktype): void => {
                    switch (fagsaktype && 'value' in fagsaktype && fagsaktype.value) {
                        case FagsakType.BARN_ENSLIG_MINDREÅRIG:
                            settFagsakType(FagsakType.BARN_ENSLIG_MINDREÅRIG);
                            console.log(fagsaktype);
                            break;
                        case FagsakType.INSTITUSJON:
                            settFagsakType(FagsakType.INSTITUSJON);
                            console.log(fagsaktype);
                            break;
                        default:
                            settFagsakType(FagsakType.NORMAL);
                            console.log(fagsaktype);
                            break;
                    }
                }}
                options={fagsakTypeOptions}
                value={fagsakTypeOptions.find(option => option.value === fagsakType)}
                isClearable={false}
            >
                <option aria-selected={fagsakType === FagsakType.NORMAL} value={''}>
                    Velg
                </option>
                <option
                    aria-selected={fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG}
                    value={FagsakType.BARN_ENSLIG_MINDREÅRIG}
                >
                    Enslig mindreårig
                </option>
                <option
                    aria-selected={fagsakType === FagsakType.INSTITUSJON}
                    value={FagsakType.INSTITUSJON}
                >
                    Institusjon
                </option>
            </FamilieReactSelect>
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
            <br />
            {fagsakType === FagsakType.INSTITUSJON && valgtSamhandler !== undefined && (
                <SamhandlerTabell samhandler={valgtSamhandler} />
            )}
        </StyledFagsaktypeWrapper>
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
                    <StyledUndertittel tag={'h3'}>
                        {`${harFagsak ? 'Personen har allerede en tilknyttet fagsak. ' : ''}
                        Ønsker du å opprette ${harFagsak ? 'ny' : ''} fagsak for denne personen?`}
                    </StyledUndertittel>
                    {søkeresultat && (
                        <Normaltekst>{`${søkeresultat.navn} (${formaterIdent(
                            søkeresultat.ident
                        )})`}</Normaltekst>
                    )}
                    {!søkeresultat && personInfo && (
                        <Normaltekst>{`${personInfo.navn} (${formaterIdent(
                            personInfo.personIdent
                        )})`}</Normaltekst>
                    )}

                    {harNormalFagsak && fagsaktypeVelger()}
                    {!harNormalFagsak && (
                        <StyledReadMore
                            header={'Søker er en institusjon eller enslig mindreårig'}
                            defaultOpen={false}
                            onClick={() => settFagsakType(FagsakType.NORMAL)}
                        >
                            {fagsaktypeVelger()}
                        </StyledReadMore>
                    )}

                    {!!feilmelding && visFeilmelding && <Feilmelding children={feilmelding} />}
                </UIModalWrapper>
            )}
        </>
    );
};

export default OpprettFagsakModal;
