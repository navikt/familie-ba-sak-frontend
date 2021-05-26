import React from 'react';

import styled from 'styled-components';

import Alertstripe from 'nav-frontend-alertstriper';
import navFarger from 'nav-frontend-core';
import { Ingress, Undertekst } from 'nav-frontend-typografi';

import HjerteIkon from '../../../ikoner/HjerteIkon';
import HusIkon from '../../../ikoner/HusIkon';
import KlodeIkon from '../../../ikoner/KlodeIkon';
import PassIkon from '../../../ikoner/PassIkon';
import { IRestRegisterhistorikk, IRestRegisteropplysning } from '../../../typer/person';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';
import RegisteropplysningerTabell from './RegisteropplysningerTabell';

const HentetTidspunkt = styled(Undertekst)`
    margin-bottom: 1rem;
    color: ${navFarger.navGra40};
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
            <Ingress children={'Registeropplysninger'} />
            <HentetTidspunkt
                children={
                    'sist lastet ' +
                    formaterIsoDato(opplysninger.hentetTidspunkt, datoformat.DATO_TID)
                }
            />
            {finnesTomPeriodePåPerson && (
                <Alertstripe type="info">
                    Behandlingen ble gjort før registerhistorikk var støttet av systemet, og
                    opplysningene presentert er opplysningene som var gjeldende på
                    behandlingstidspunkt.
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
