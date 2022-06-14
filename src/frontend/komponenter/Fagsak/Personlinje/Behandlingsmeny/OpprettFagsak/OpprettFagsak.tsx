import React, { useEffect } from 'react';

import styled from 'styled-components';

import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import KnappBase from 'nav-frontend-knapper';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';

import { useApp } from '../../../../../context/AppContext';
import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import type { IMinimalFagsak } from '../../../../../typer/fagsak';
import { FagsakEier } from '../../../../../typer/fagsak';
import useOpprettFagsak from '../../../../Felleskomponenter/HeaderMedSøk/useOpprettFagsak';

interface IProps {
    onListElementClick: () => void;
    minimalFagsak: IMinimalFagsak;
}

const StyledDiv = styled.div`
    margin-bottom: 2rem;
`;

const bekreftNyFagsakModal = ({
    nyFagsakEier,
    feilmelding,
    onClick,
    onClose,
}: {
    nyFagsakEier: FagsakEier;
    feilmelding: string;
    onClick: () => void;
    onClose: () => void;
}) => {
    return {
        tittel:
            nyFagsakEier === FagsakEier.BARN
                ? 'Opprett fagsak på institusjon eller enslig mindreårig'
                : 'Opprett ordinær fagsak',
        lukkKnapp: true,
        visModal: true,
        onClose: onClose,
        innhold: () => {
            return (
                <StyledDiv>
                    <Normaltekst>Ønsker du å opprette ny fagsak av denne typen?</Normaltekst>
                    {!!feilmelding && <Feilmelding children={feilmelding} />}
                </StyledDiv>
            );
        },
        actions: [
            <Flatknapp key={'avbryt'} onClick={onClose} mini={true}>
                Avbryt
            </Flatknapp>,
            <Knapp
                key={'bekreft'}
                type={'hoved'}
                mini={true}
                onClick={onClick}
                children={'Bekreft'}
            />,
        ],
    };
};

const OpprettFagsak: React.FC<IProps> = ({ onListElementClick, minimalFagsak }) => {
    const { opprettFagsak, feilmelding } = useOpprettFagsak();
    const { modal, settModal, lukkModal } = useApp();
    const [visFeilmelding, settVisFeilmelding] = React.useState(false);
    const { hentBruker } = useFagsakRessurser();
    const nyFagsakEier =
        minimalFagsak.fagsakEier === FagsakEier.BARN ? FagsakEier.OMSORGSPERSON : FagsakEier.BARN;

    const opprettNyFagsak = () => {
        opprettFagsak(
            {
                personIdent: minimalFagsak.søkerFødselsnummer,
                aktørId: null,
                fagsakEier: nyFagsakEier,
            },
            () => {
                hentBruker(minimalFagsak.søkerFødselsnummer);
                lukkModal();
            }
        );
        settVisFeilmelding(true);
    };

    const onClose = () => {
        lukkModal();
        settVisFeilmelding(false);
    };

    useEffect(() => {
        if (modal.visModal) {
            settModal(
                bekreftNyFagsakModal({
                    nyFagsakEier,
                    feilmelding,
                    onClick: opprettNyFagsak,
                    onClose: onClose,
                })
            );
        }
    }, [feilmelding, visFeilmelding]);

    return (
        <>
            <KnappBase
                mini={true}
                onClick={() => {
                    onListElementClick();
                    settModal(
                        bekreftNyFagsakModal({
                            nyFagsakEier,
                            feilmelding: '',
                            onClick: opprettNyFagsak,
                            onClose: onClose,
                        })
                    );
                }}
            >
                Opprett ny fagsak
            </KnappBase>
        </>
    );
};

export default OpprettFagsak;
