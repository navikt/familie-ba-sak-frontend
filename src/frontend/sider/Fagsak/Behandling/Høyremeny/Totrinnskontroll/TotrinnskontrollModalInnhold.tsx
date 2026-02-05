import * as React from 'react';

import styled from 'styled-components';

import { BodyShort } from '@navikt/ds-react';

import { TotrinnskontrollBeslutning } from '../../../../../typer/totrinnskontroll';

interface IProps {
    beslutning: TotrinnskontrollBeslutning;
}

const ModalInnholdContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1rem;
`;

const TotrinnskontrollModalInnhold: React.FunctionComponent<IProps> = ({ beslutning }) => {
    if (beslutning === TotrinnskontrollBeslutning.IKKE_VURDERT) {
        return (
            <ModalInnholdContainer>
                <BodyShort>Beslutning er IKKE_VURDERT. Ta kontakt med barnetrygdteamet.</BodyShort>
            </ModalInnholdContainer>
        );
    } else {
        return (
            <ModalInnholdContainer>
                <BodyShort>
                    {beslutning === TotrinnskontrollBeslutning.GODKJENT
                        ? 'Behandlingen er godkjent, og vedtaket er iverksatt'
                        : 'Behandlingen er ikke godkjent og er sendt tilbake til saksbehandler'}
                </BodyShort>
            </ModalInnholdContainer>
        );
    }
};

export default TotrinnskontrollModalInnhold;
