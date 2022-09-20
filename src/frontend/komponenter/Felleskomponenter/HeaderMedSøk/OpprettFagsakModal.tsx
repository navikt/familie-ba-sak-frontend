import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { BodyShort, Button, ErrorMessage, Heading } from '@navikt/ds-react';
import { FamilieCheckbox, FamilieInput, FamilieKnapp } from '@navikt/familie-form-elements';
import type { ISøkeresultat } from '@navikt/familie-header';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import { FagsakType } from '../../../typer/fagsak';
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
}

const StyledDiv = styled.div`
    display: flex;
`;

const StyledKnapp = styled(FamilieKnapp)`
    margin-left: 1rem;
    margin-top: auto;
    height: 1rem;
`;

const StyledHeading = styled(Heading)`
    font-size: 1rem;
    margin-bottom: 1.5rem;
`;

const StyledKnappContainer = styled.div`
    margin-top: 1.2rem;
    margin-bottom: 0.5rem;
`;

const StyledCheckBoxWrapper = styled.div`
    margin-top: 1.2rem;
    margin-bottom: 1rem;
`;

const OpprettFagsakModal: React.FC<IOpprettFagsakModal> = ({
    lukkModal,
    søkeresultat,
    personInfo,
}) => {
    const { opprettFagsak, feilmelding, senderInn, settSenderInn } = useOpprettFagsak();
    const { sjekkTilgang, toggles } = useApp();
    const visModal = !!søkeresultat || !!personInfo;
    const [fagsakType, settFagsakType] = useState<FagsakType>(FagsakType.NORMAL);
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

    return (
        <>
            {!toggles[ToggleNavn.støtterInstitusjon].valueOf() && (
                <UIModalWrapper
                    modal={{
                        actions: [
                            <Button
                                variant={'secondary'}
                                key={'avbryt'}
                                size={'small'}
                                onClick={lukkModal}
                                children={'Avbryt'}
                            />,
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
                            />,
                        ],
                        onClose: lukkModal,
                        lukkKnapp: true,
                        tittel: 'Opprett fagsak',
                        visModal: visModal,
                    }}
                >
                    <StyledHeading size={'small'} level={'3'}>
                        Personen har ingen tilknyttet fagsak. Ønsker du å opprette fagsak for denne
                        personen?
                    </StyledHeading>
                    {søkeresultat && (
                        <BodyShort>{`${søkeresultat.navn} (${formaterIdent(
                            søkeresultat.ident
                        )})`}</BodyShort>
                    )}
                    {!!feilmelding && <ErrorMessage children={feilmelding} />}
                </UIModalWrapper>
            )}
            {toggles[ToggleNavn.støtterInstitusjon].valueOf() && (
                <UIModalWrapper
                    modal={{
                        actions: [
                            <StyledKnappContainer key={'OpprettFagsakModal knapper'}>
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
                            </StyledKnappContainer>,
                        ],
                        onClose: onClose,
                        lukkKnapp: true,
                        tittel: 'Opprett fagsak',
                        visModal: visModal,
                        className: 'uimodal-wider',
                    }}
                >
                    <StyledHeading level={'3'}>
                        {`Personen har ${
                            (personInfo?.fagsakId?.size || 0) > 0 ? 'en eksisternede' : 'ingen'
                        } tilknyttet fagsak. Ønsker du å opprette fagsak for denne
                            personen?`}
                    </StyledHeading>
                    {søkeresultat && (
                        <BodyShort>{`${søkeresultat.navn} (${formaterIdent(
                            søkeresultat.ident
                        )})`}</BodyShort>
                    )}
                    {!søkeresultat && personInfo && (
                        <BodyShort>{`${personInfo.navn} (${formaterIdent(
                            personInfo.personIdent
                        )})`}</BodyShort>
                    )}
                    <StyledCheckBoxWrapper>
                        <FamilieCheckbox
                            id={'gjelder-enslig-mindreårig'}
                            erLesevisning={false}
                            label={'Gjelder enslig mindreårig'}
                            checked={fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG}
                            disabled={fagsakType === FagsakType.INSTITUSJON}
                            onChange={() => {
                                if (fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG) {
                                    settFagsakType(FagsakType.NORMAL);
                                } else {
                                    settFagsakType(FagsakType.BARN_ENSLIG_MINDREÅRIG);
                                }
                                settVisFeilmelding(false);
                            }}
                        />
                        <br />
                        <FamilieCheckbox
                            id={'gjelder-institusjon'}
                            erLesevisning={false}
                            label={'Gjelder institusjon'}
                            checked={fagsakType === FagsakType.INSTITUSJON}
                            disabled={fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG}
                            onChange={() => {
                                if (fagsakType === FagsakType.INSTITUSJON) {
                                    settFagsakType(FagsakType.NORMAL);
                                } else {
                                    settFagsakType(FagsakType.INSTITUSJON);
                                }
                                settVisFeilmelding(false);
                            }}
                        />
                        <br />
                        {fagsakType === FagsakType.INSTITUSJON && (
                            <StyledDiv>
                                <FamilieInput
                                    {...samhandlerSkjema.felter.orgnr.hentNavInputProps(
                                        samhandlerSkjema.visFeilmeldinger
                                    )}
                                    erLesevisning={false}
                                    id={'hent-samhandler'}
                                    label={'Institusjonens organisasjonsnummer'}
                                    size={'medium'}
                                    placeholder={'organisasjonsnummer'}
                                />

                                <StyledKnapp
                                    onClick={() => {
                                        onSubmitWrapper();
                                    }}
                                    children={'Hent institusjon'}
                                    erLesevisning={false}
                                />
                            </StyledDiv>
                        )}
                        <br />

                        {fagsakType === FagsakType.INSTITUSJON && valgtSamhandler !== undefined && (
                            <SamhandlerTabell samhandler={valgtSamhandler}></SamhandlerTabell>
                        )}
                    </StyledCheckBoxWrapper>
                    {!!feilmelding && visFeilmelding && <ErrorMessage children={feilmelding} />}
                </UIModalWrapper>
            )}
        </>
    );
};

export default OpprettFagsakModal;
