import React, { useState } from 'react';

import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Feilmelding, Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { FamilieCheckbox, FamilieSelect } from '@navikt/familie-form-elements';
import type { ISøkeresultat } from '@navikt/familie-header';

import { useApp } from '../../../context/AppContext';
import { FagsakType } from '../../../typer/fagsak';
import type { IInstitusjon } from '../../../typer/mottaker';
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

const institusjoner: IInstitusjon[] = [
    // TODO Erstattes med liste fra søketjeneste
    { orgNummer: '', navn: '' },
    { orgNummer: '123', navn: 'Eksempel 1' },
    { orgNummer: '456', navn: 'Eksempel 2' },
];

const OpprettFagsakModal: React.FC<IOpprettFagsakModal> = ({ lukkModal, søkeresultat }) => {
    const { opprettFagsak, feilmelding, senderInn, settSenderInn } = useOpprettFagsak();
    const { sjekkTilgang, toggles } = useApp();
    const visModal = !!søkeresultat;
    const [fagsakType, settFagsakType] = useState<FagsakType>(FagsakType.NORMAL);
    const [visFeilmelding, settVisFeilmelding] = useState(false);
    const [valgtInstitusjon, settValgtInstitusjon] = useState<IInstitusjon | undefined>(undefined);

    const validerInput = () => {
        if (fagsakType === FagsakType.INSTITUSJON) {
            return !!valgtInstitusjon?.navn;
        }
        return true;
    };
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
                                    onClick={onClose}
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
                                            validerInput() &&
                                            (await sjekkTilgang(søkeresultat.ident))
                                        ) {
                                            opprettFagsak(
                                                {
                                                    personIdent: søkeresultat.ident,
                                                    aktørId: null,
                                                    fagsakType: fagsakType,
                                                },
                                                onClose
                                            );
                                        } else {
                                            settSenderInn(null);
                                            settVisFeilmelding(true);
                                        }
                                    }}
                                    children={'Opprett fagsak'}
                                    disabled={senderInn !== null}
                                    spinner={senderInn !== null}
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
                            id={'gjelder-enslig-mindreårig'}
                            erLesevisning={false}
                            label={'Gjelder enslig mindreårig'}
                            checked={fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRLIG}
                            disabled={fagsakType === FagsakType.INSTITUSJON}
                            onChange={() => {
                                if (fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRLIG) {
                                    settFagsakType(FagsakType.NORMAL);
                                } else {
                                    settFagsakType(FagsakType.BARN_ENSLIG_MINDREÅRLIG);
                                }
                            }}
                        />
                        <br />
                        <FamilieCheckbox
                            id={'gjelder-institusjon'}
                            erLesevisning={false}
                            label={'Gjelder institusjon'}
                            checked={fagsakType === FagsakType.INSTITUSJON}
                            disabled={fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRLIG}
                            onChange={() => {
                                if (fagsakType === FagsakType.INSTITUSJON) {
                                    settFagsakType(FagsakType.NORMAL);
                                } else {
                                    settFagsakType(FagsakType.INSTITUSJON);
                                }
                            }}
                        />
                        <br />
                        {fagsakType === FagsakType.INSTITUSJON && (
                            <FamilieSelect
                                erLesevisning={false}
                                name="institusjon"
                                value={valgtInstitusjon?.navn}
                                feil={
                                    !valgtInstitusjon?.navn &&
                                    visFeilmelding &&
                                    'Institusjon er påkrevd'
                                }
                                label={'Velg institusjon'}
                                onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                                    settValgtInstitusjon(
                                        institusjoner.at(event.target.selectedIndex)
                                    );
                                }}
                            >
                                {institusjoner.map((institusjon: IInstitusjon) => {
                                    return (
                                        <option
                                            aria-selected={institusjon === valgtInstitusjon}
                                            key={institusjon.orgNummer}
                                            value={institusjon.navn}
                                        >
                                            {`${institusjon.navn}`}
                                        </option>
                                    );
                                })}
                            </FamilieSelect>
                        )}
                    </StyledCheckBoxWrapper>
                    {!!feilmelding && visFeilmelding && <Feilmelding children={feilmelding} />}
                </UIModalWrapper>
            )}
        </>
    );
};

export default OpprettFagsakModal;
