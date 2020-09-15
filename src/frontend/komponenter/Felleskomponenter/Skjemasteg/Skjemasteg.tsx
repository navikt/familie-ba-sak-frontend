import classNames from 'classnames';
import { Knapp } from 'nav-frontend-knapper';
import { Innholdstittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
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
        <div
            id={'skjemasteg'}
            className={classNames('skjemasteg', className)}
            style={{ maxWidth: maxWidthStyle }}
        >
            <Innholdstittel children={tittel} />

            {children}

            <div className={'skjemasteg__navigering'}>
                {nesteOnClick && skalViseNesteKnapp && (
                    <Knapp
                        type={'hoved'}
                        spinner={senderInn}
                        onClick={async () => {
                            if (!senderInn) {
                                nesteOnClick();
                            }
                        }}
                        children={nesteKnappTittel ?? 'Neste'}
                    />
                )}

                <div className={'skjemasteg__navigering--flex'} />

                {forrigeOnClick ? (
                    <Knapp
                        onClick={() => {
                            forrigeOnClick();
                        }}
                        children={forrigeKnappTittel ?? 'Forrige'}
                    />
                ) : (
                    <div />
                )}
            </div>
        </div>
    );
};

export default Skjemasteg;
