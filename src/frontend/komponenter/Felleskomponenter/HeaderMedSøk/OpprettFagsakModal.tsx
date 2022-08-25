import React, { useState } from 'react';

import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Feilmelding, Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { FamilieCheckbox, FamilieInput } from '@navikt/familie-form-elements';
import type { ISøkeresultat } from '@navikt/familie-header';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import { FagsakType } from '../../../typer/fagsak';
import type { IInstitusjon } from '../../../typer/institusjon-og-verge';
import type { IPersonInfo } from '../../../typer/person';
import { ToggleNavn } from '../../../typer/toggles';
import { formaterIdent } from '../../../utils/formatter';
import { useSamhandlerSkjema } from '../../Fagsak/InstitusjonOgVerge/useSamhandler';
import UIModalWrapper from '../Modal/UIModalWrapper';
import useOpprettFagsak from './useOpprettFagsak';

export interface IOpprettFagsakModal {
    lukkModal: () => void;
    søkeresultat?: ISøkeresultat | undefined;
    personInfo?: IPersonInfo;
}

const StyledUndertittel = styled(Undertittel)`
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
    const [valgtInstitusjon, settValgtInstitusjon] = useState<IInstitusjon | undefined>(undefined);
    const { onSubmitWrapper, samhandlerSkjema } = useSamhandlerSkjema();
    const onClose = () => {
        settFagsakType(FagsakType.NORMAL);
        settVisFeilmelding(false);
        lukkModal();
    };
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
                                                tssEksternId: null,
                                                orgNummer: null,
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
                                                    tssEksternId:
                                                        valgtInstitusjon?.tssEksternId || null,
                                                    orgNummer: valgtInstitusjon?.orgNummer || null,
                                                },
                                                onClose
                                            );
                                        } else {
                                            settSenderInn(false);
                                            settVisFeilmelding(true);
                                        }
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
                        tittel: 'Opprett fagsak',
                        visModal: visModal,
                        className: 'uimodal-wider',
                    }}
                >
                    <StyledUndertittel tag={'h3'}>
                        {`Personen har ${
                            (personInfo?.fagsakId?.size || 0) > 0 ? 'en eksisternede' : 'ingen'
                        } tilknyttet fagsak. Ønsker du å opprette fagsak for denne
                            personen?`}
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
                            }}
                        />
                        <br />
                        <FamilieInput
                            {...samhandlerSkjema.felter.orgnr.hentNavInputProps(
                                samhandlerSkjema.visFeilmeldinger
                            )}
                            erLesevisning={false}
                            id={'hent-samhandler'}
                            label={'Orgnummer på Institusjon'}
                            onKeyDown={(event): void => {
                                if (event.key === 'Enter') {
                                    onSubmitWrapper();
                                    const tssEksternId =
                                        samhandlerSkjema.submitRessurs.status ===
                                        RessursStatus.SUKSESS
                                            ? samhandlerSkjema.submitRessurs.data.tssEksternId
                                            : undefined;
                                    const institusjon: IInstitusjon = {
                                        orgNummer: samhandlerSkjema.felter.orgnr.verdi,
                                        tssEksternId: tssEksternId,
                                    };
                                    settValgtInstitusjon(institusjon);
                                }
                            }}
                        />

                        <br />

                        {fagsakType === FagsakType.INSTITUSJON &&
                            samhandlerSkjema.submitRessurs.status === RessursStatus.SUKSESS && (
                                <StyledUndertittel tag={'h3'}>
                                    {`tssEksternId=${samhandlerSkjema.submitRessurs.data.tssEksternId} ${samhandlerSkjema.submitRessurs.data.navn} ${samhandlerSkjema.submitRessurs.data.adresser[0].postSted} `}
                                </StyledUndertittel>
                            )}
                    </StyledCheckBoxWrapper>
                    {!!feilmelding && visFeilmelding && <Feilmelding children={feilmelding} />}
                </UIModalWrapper>
            )}
        </>
    );
};

export default OpprettFagsakModal;
