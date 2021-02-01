import * as React from 'react';
import { useEffect } from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { Innholdstittel } from 'nav-frontend-typografi';

import { useBehandling } from '../../../context/BehandlingContext';
import { ISide, sider } from '../Venstremeny/sider';

interface IProps {
    className?: string;
    forrigeKnappTittel?: string;
    forrigeOnClick?: () => void;
    nesteKnappTittel?: string;
    nesteOnClick?: () => void;
    tilbakestillOnClick?: () => void;
    tilbakestillKnappTittel?: string;
    senderInn: boolean;
    tittel: string;
    maxWidthStyle?: string;
    skalViseNesteKnapp?: boolean;
    skalViseTilbakestillKnapp?: boolean;
}

const Container = styled.div<{ maxWidthStyle: string }>`
    padding: 2rem;
    max-width: ${({ maxWidthStyle }) => maxWidthStyle};
`;

const StyledInnholdstittel = styled(Innholdstittel)`
    padding-bottom: 1rem;
`;

const Navigering = styled.div`
    padding: 1rem 0;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
`;

const TilbakestillKnapp = styled(Flatknapp)`
    margin-left: 20px;
`;

const Skjemasteg: React.FunctionComponent<IProps> = ({
    children,
    className,
    forrigeKnappTittel,
    forrigeOnClick,
    nesteKnappTittel,
    nesteOnClick,
    tilbakestillOnClick,
    tilbakestillKnappTittel,
    senderInn,
    tittel,
    maxWidthStyle = '40rem',
    skalViseNesteKnapp = true,
    skalViseTilbakestillKnapp,
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

            <Navigering>
                {nesteOnClick && skalViseNesteKnapp ? (
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
                ) : (
                    <div />
                )}
                <div>
                    {forrigeOnClick ? (
                        <Knapp
                            onClick={() => {
                                forrigeOnClick();
                            }}
                            mini={true}
                            children={forrigeKnappTittel ?? 'Forrige'}
                        />
                    ) : (
                        <div />
                    )}
                    {tilbakestillOnClick && skalViseTilbakestillKnapp ? (
                        <TilbakestillKnapp
                            onClick={() => {
                                tilbakestillOnClick();
                            }}
                            mini={true}
                            children={tilbakestillKnappTittel ?? 'Tilbakestill'}
                        />
                    ) : (
                        <div />
                    )}
                </div>
            </Navigering>
        </Container>
    );
};

export default Skjemasteg;
