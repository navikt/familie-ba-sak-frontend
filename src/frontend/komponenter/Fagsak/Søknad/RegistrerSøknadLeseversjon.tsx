import * as React from 'react';
import { ISøknadDTO } from '../../../typer/søknad';
import PanelBase from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import classNames from 'classnames';
import Lesefelt from '../../Felleskomponenter/Lesefelt/Lesefelt';

interface IProps {
    søknad: ISøknadDTO;
}

const RegistrerSøknadLeseversjon: React.FunctionComponent<IProps> = ({ søknad }) => {
    return (
        <div>
            <PanelBase className={classNames('søknad__panel', 'panel--gra')}>
                <Undertittel children={'1 Hva har bruker søkt om?'} />
                <Lesefelt label={'Kategori'} verdi={søknad.kategori} />
                <Lesefelt label={'Underkategori'} verdi={søknad.underkategori} />
                <Lesefelt label={'Type søker'} verdi={søknad.typeSøker} />
            </PanelBase>
            <PanelBase className={'søknad__panel'}>
                <Undertittel children={'2.3 Hva har bruker søkt om?'} />
                <Lesefelt label={''} verdi={''} />
                //TODO: Radio buttons -> vise den som ikke er kryssa også, men V og X feks?
            </PanelBase>
        </div>
    );
};

export default RegistrerSøknadLeseversjon;
