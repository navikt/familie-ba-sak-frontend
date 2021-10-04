import * as React from 'react';
import { useEffect } from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Feilmelding, Innholdstittel } from 'nav-frontend-typografi';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { ISide, sider } from '../Venstremeny/sider';

interface IProps {
    className?: string;
    forrigeKnappTittel?: string;
    forrigeOnClick?: () => void;
    nesteKnappTittel?: string;
    nesteOnClick?: () => void;
    senderInn: boolean;
    tittel: string;
    maxWidthStyle?: string;
    skalViseNesteKnapp?: boolean;
    skalViseForrigeKnapp?: boolean;
    feilmelding?: string;
}

const Container = styled.div<{ maxWidthStyle: string }>`
    padding: 2rem;
    max-width: ${({ maxWidthStyle }) => maxWidthStyle};
`;

const StyledInnholdstittel = styled(Innholdstittel)`
    padding-bottom: 1rem;
`;

const StyledFeilmelding = styled(Feilmelding)`
    margin-top: 1rem;
`;

const Navigering = styled.div`
    margin: 4rem 0 1rem;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    button:not(:first-child) {
        margin-right: 1rem;
    }
`;

const Skjemasteg: React.FunctionComponent<IProps> = ({
    children,
    className,
    forrigeKnappTittel,
    forrigeOnClick,
    nesteKnappTittel,
    nesteOnClick,
    senderInn,
    tittel,
    maxWidthStyle = '40rem',
    skalViseNesteKnapp = true,
    skalViseForrigeKnapp = true,
    feilmelding = '',
}) => {
    const history = useHistory();
    const { forrigeÅpneSide } = useBehandling();

    useEffect(() => {
        const element = document.getElementById('skjemasteg');

        const index: number = Object.values(sider).findIndex((side: ISide) =>
            history.location.pathname.includes(side.href)
        );
        const forrigeSide: ISide | undefined = Object.values(sider)[index - 1];

        if (element && forrigeSide && forrigeÅpneSide?.href.includes(forrigeSide.href)) {
            element.scrollIntoView({ block: 'start' });
        }
    }, [forrigeÅpneSide]);

    return (
        <Container id={'skjemasteg'} className={className} maxWidthStyle={maxWidthStyle}>
            <StyledInnholdstittel children={tittel} />

            {children}

            {feilmelding !== '' && <StyledFeilmelding>{feilmelding}</StyledFeilmelding>}

            <Navigering>
                {nesteOnClick && skalViseNesteKnapp && (
                    <Knapp
                        type={'hoved'}
                        spinner={senderInn}
                        disabled={senderInn}
                        onClick={() => {
                            if (!senderInn) {
                                nesteOnClick();
                            }
                        }}
                        mini={true}
                        children={nesteKnappTittel ?? 'Neste'}
                    />
                )}
                {forrigeOnClick && skalViseForrigeKnapp && (
                    <Knapp
                        onClick={() => {
                            forrigeOnClick();
                        }}
                        mini={true}
                        children={forrigeKnappTittel ?? 'Forrige'}
                    />
                )}
            </Navigering>
        </Container>
    );
};

export default Skjemasteg;
