import * as classNames from 'classnames';
import Knapp from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { ISaksbehandler } from '../../../typer/saksbehandler';

interface IProps {
    innloggetSaksbehandler?: ISaksbehandler;
    onClick: () => void;
    tittel: string;
}

const Dekoratør: React.FunctionComponent<IProps> = ({
    innloggetSaksbehandler,
    onClick,
    tittel,
}) => {
    return (
        <header role="banner" className={'dekoratør'}>
            <div className={'dekoratør__tittel'}>
                <Systemtittel className={'dekoratør__tittel--tekst'} tag={'h1'} children={tittel} />
                <div className={'dekoratør__skille'} />
            </div>
            <div className={'dekoratør__innloggetsaksbehandler'}>
                {innloggetSaksbehandler && innloggetSaksbehandler.displayName}

                <div className={'dekoratør__skille'} />
                <button
                    className={classNames('dekoratør__innloggetsaksbehandler--lenke')}
                    onClick={onClick}
                    children={'Logg ut'}
                />
            </div>
        </header>
    );
};

export default Dekoratør;
