import React from 'react';

import { Ingress } from 'nav-frontend-typografi';

import HjerteIkon from '../../../ikoner/HjerteIkon';
import HusIkon from '../../../ikoner/HusIkon';
import KlodeIkon from '../../../ikoner/KlodeIkon';
import PassIkon from '../../../ikoner/PassIkon';
import { IRestRegisterhistorikk } from '../../../typer/person';
import RegisteropplysningerTabell from './RegisteropplysningerTabell';

interface IRegisteropplysningerProps {
    opplysninger: IRestRegisterhistorikk;
}

const Registeropplysninger: React.FC<IRegisteropplysningerProps> = ({ opplysninger }) => {
    return (
        <>
            <Ingress children={'Registeropplysninger'} />
            <RegisteropplysningerTabell
                opplysningstype={'Sivilstand'}
                ikon={<HjerteIkon />}
                historikk={opplysninger.sivilstand}
            />
            <RegisteropplysningerTabell
                opplysningstype={'Oppholdstillatelse'}
                ikon={<PassIkon />}
                historikk={opplysninger.oppholdstillatelse}
            />
            <RegisteropplysningerTabell
                opplysningstype={'Statsborgerskap'}
                ikon={<KlodeIkon />}
                historikk={opplysninger.statsborgerskap}
            />
            <RegisteropplysningerTabell
                opplysningstype={'Adresse'}
                ikon={<HusIkon />}
                historikk={opplysninger.bostedsadresse}
            />
        </>
    );
};

export default Registeropplysninger;
