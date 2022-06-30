import React, { useState } from 'react';

import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Feilmelding, Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { FamilieCheckbox } from '@navikt/familie-form-elements';
import type { ISøkeresultat } from '@navikt/familie-header';

import { useApp } from '../../../context/AppContext';
import { FagsakType } from '../../../typer/fagsak';
import { ToggleNavn } from '../../../typer/toggles';
import { formaterIdent } from '../../../utils/formatter';
import UIModalWrapper from '../Modal/UIModalWrapper';
import useOpprettFagsak from './useOpprettFagsak';

export interface IOpprettFagsakModal {
    lukkModal: () => void;
    søkeresultat: ISøkeresultat | undefined;
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

const OpprettFagsakModal: React.FC<IOpprettFagsakModal> = ({ lukkModal, søkeresultat }) => {
    const { opprettFagsak, feilmelding, senderInn, settSenderInn } = useOpprettFagsak();
    const { sjekkTilgang, toggles } = useApp();
    const visModal = !!søkeresultat;
    const [fagsakType, settFagsakType] = useState<FagsakType>(FagsakType.NORMAL);

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
                                    settSenderInn(FagsakType.NORMAL);
                                    if (søkeresultat && (await sjekkTilgang(søkeresultat.ident))) {
                                        opprettFagsak(
                                            {
                                                personIdent: søkeresultat.ident,
                                                aktørId: null,
                                                fagsakType: FagsakType.NORMAL,
                                            },
                                            lukkModal
                                        );
                                    } else {
                                        settSenderInn(null);
                                    }
                                }}
                                children={'Ja, opprett fagsak'}
                                disabled={senderInn !== null}
                                spinner={senderInn === FagsakType.NORMAL}
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
                                    onClick={() => {
                                        settFagsakType(FagsakType.NORMAL);
                                        lukkModal();
                                    }}
                                    children={'Avbryt'}
                                    kompakt={true}
                                />
                                <Knapp
                                    key={'Bekreft'}
                                    type={'hoved'}
                                    mini={true}
                                    onClick={async () => {
                                        settSenderInn(fagsakType);
                                        if (
                                            søkeresultat &&
                                            (await sjekkTilgang(søkeresultat.ident))
                                        ) {
                                            opprettFagsak(
                                                {
                                                    personIdent: søkeresultat.ident,
                                                    aktørId: null,
                                                    fagsakType: fagsakType,
                                                },
                                                lukkModal
                                            );
                                        } else {
                                            settSenderInn(null);
                                        }
                                        settFagsakType(FagsakType.NORMAL);
                                    }}
                                    children={'Opprett fagsak'}
                                    disabled={senderInn !== null}
                                    spinner={senderInn !== null}
                                    kompakt={true}
                                />
                            </StyledKnappContainer>,
                        ],
                        onClose: lukkModal,
                        lukkKnapp: true,
                        tittel: 'Opprett fagsak',
                        visModal: visModal,
                        className: 'uimodal-wider',
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
                    <StyledCheckBoxWrapper>
                        <FamilieCheckbox
                            id={'gjelder-institusjon'}
                            erLesevisning={false}
                            label={'Gjelder institusjon eller enslig mindreårig'}
                            checked={fagsakType !== FagsakType.NORMAL}
                            onChange={() => {
                                if (fagsakType !== FagsakType.NORMAL) {
                                    settFagsakType(FagsakType.NORMAL);
                                } else {
                                    settFagsakType(FagsakType.BARN_ENSLIG_MINDREÅRLIG);
                                }
                            }}
                        />
                    </StyledCheckBoxWrapper>
                    {!!feilmelding && <Feilmelding children={feilmelding} />}
                </UIModalWrapper>
            )}
        </>
    );
};

export default OpprettFagsakModal;
