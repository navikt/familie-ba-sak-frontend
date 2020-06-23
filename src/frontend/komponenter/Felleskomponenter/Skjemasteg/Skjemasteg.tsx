import { Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import { useHistory } from 'react-router';
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
            <Systemtittel children={tittel} />

            {children}

            <div className={'skjemasteg__navigering'}>
                {nesteOnClick && (
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
