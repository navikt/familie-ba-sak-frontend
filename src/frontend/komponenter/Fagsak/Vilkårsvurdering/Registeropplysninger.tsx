import React from 'react';

import styled from 'styled-components';

import Alertstripe from 'nav-frontend-alertstriper';
import { Ingress } from 'nav-frontend-typografi';

import HjerteIkon from '../../../ikoner/HjerteIkon';
import HusIkon from '../../../ikoner/HusIkon';
import KlodeIkon from '../../../ikoner/KlodeIkon';
import PassIkon from '../../../ikoner/PassIkon';
import { IRestRegisterhistorikk, IRestRegisteropplysning } from '../../../typer/person';
import RegisteropplysningerTabell from './RegisteropplysningerTabell';

const MarginedIngress = styled(Ingress)`
    margin-bottom: 1rem;
`;

interface IRegisteropplysningerProps {
    opplysninger: IRestRegisterhistorikk;
}

const Registeropplysninger: React.FC<IRegisteropplysningerProps> = ({ opplysninger }) => {
    const finnesTomPeriode = (opplysninger: IRestRegisteropplysning[]): boolean =>
        !!opplysninger.find(opplysning => !opplysning.fom && !opplysning.tom);
    const finnesTomPeriodePåPerson =
        finnesTomPeriode(opplysninger.sivilstand) ||
        finnesTomPeriode(opplysninger.oppholdstillatelse) ||
        finnesTomPeriode(opplysninger.statsborgerskap) ||
        finnesTomPeriode(opplysninger.bostedsadresse);
    return (
        <>
            <MarginedIngress children={'Registeropplysninger'} />
            {finnesTomPeriodePåPerson && (
                <Alertstripe type="info">
                    Opplysningene presentert er opplysningene som var gjeldende på tidspunktet da
                    behandlingen ble utført.
                </Alertstripe>
            )}
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
