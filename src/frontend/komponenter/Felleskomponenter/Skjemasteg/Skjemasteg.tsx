import classNames from 'classnames';
import { Knapp } from 'nav-frontend-knapper';
import { Innholdstittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { useBehandling } from '../../../context/BehandlingContext';
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
}

const Container = styled.div`
    padding: 2rem;

    .typo-innholdstittel {
        padding-bottom: 1rem;
    }
`;

const Navigering = styled.div`
    padding: 1rem 0;
    display: flex;
    flex-direction: row-reverse;

    &--flex {
        flex: 1;
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
        <Container
            id={'skjemasteg'}
            className={classNames('skjemasteg', className)}
            style={{ maxWidth: maxWidthStyle }}
        >
            <Innholdstittel children={tittel} />

            {children}

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

                <div style={{ flex: 1 }} />

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
            </Navigering>
        </Container>
    );
};

export default Skjemasteg;
