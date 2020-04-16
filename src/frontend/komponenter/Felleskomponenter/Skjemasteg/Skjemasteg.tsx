import { Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import classNames from 'classnames';

interface IProps {
    className?: string;
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
                            nesteOnClick();
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
                        children={'Forrige'}
                    />
                ) : (
                    <div />
                )}
            </div>
        </div>
    );
};

export default Skjemasteg;
