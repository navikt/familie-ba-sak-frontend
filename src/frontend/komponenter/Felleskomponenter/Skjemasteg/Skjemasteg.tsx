import { Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import classNames from 'classnames';

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
    return (
        <div className={classNames('skjemasteg', className)} style={{ maxWidth: maxWidthStyle }}>
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
                        type={'hoved'}
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
