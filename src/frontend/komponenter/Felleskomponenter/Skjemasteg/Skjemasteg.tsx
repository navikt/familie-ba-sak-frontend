import { Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';

interface IProps {
    forrigeOnClick?: () => void;
    nesteKnappTittel?: string;
    nesteOnClick?: () => void;
    senderInn: boolean;
    tittel: string;
}

const Skjemasteg: React.StatelessComponent<IProps> = ({
    children,
    forrigeOnClick,
    nesteKnappTittel,
    nesteOnClick,
    senderInn,
    tittel,
}) => {
    return (
        <div className={'skjemasteg'}>
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
