import React from 'react';

import {
    CalendarIcon,
    FlowerPetalFallingIcon,
    GlobeIcon,
    HeartIcon,
    HouseIcon,
    PassportIcon,
    PersonIcon,
} from '@navikt/aksel-icons';
import { Box, Detail, Heading } from '@navikt/ds-react';

import styles from './Registeropplysninger.module.css';
import RegisteropplysningerTabell from './RegisteropplysningerTabell';
import type { IRestRegisterhistorikk } from '../../../../../../typer/person';
import { Registeropplysning } from '../../../../../../typer/registeropplysning';
import { Datoformat, isoStringTilFormatertString } from '../../../../../../utils/dato';
import { formaterIdent } from '../../../../../../utils/formatter';

interface IRegisteropplysningerProps {
    registerHistorikk: IRestRegisterhistorikk;
    fødselsdato: string;
}

const Registeropplysninger: React.FC<IRegisteropplysningerProps> = ({ registerHistorikk, fødselsdato }) => {
    const personErDød = registerHistorikk.dødsboadresse.length > 0;

    return (
        <>
            <Heading className={styles.regularHeading} level={'3'} size="medium">
                Registeropplysninger
            </Heading>
            <Box width={'32rem'}>
                <Detail
                    className={styles.detail}
                    children={
                        'Sist hentet fra Folkeregisteret ' +
                        isoStringTilFormatertString({
                            isoString: registerHistorikk.hentetTidspunkt,
                            tilFormat: Datoformat.DATO_TID_SEKUNDER,
                        })
                    }
                />
                <RegisteropplysningerTabell
                    opplysningstype={Registeropplysning.FØDSELSDATO}
                    ikon={<CalendarIcon fontSize={'1.5rem'} title="Kalender-ikon" focusable="false" />}
                    historikk={[
                        {
                            verdi: isoStringTilFormatertString({
                                isoString: fødselsdato,
                                tilFormat: Datoformat.DATO,
                            }),
                        },
                    ]}
                />
                {registerHistorikk.historiskeIdenter && registerHistorikk.historiskeIdenter.length > 0 && (
                    <RegisteropplysningerTabell
                        opplysningstype={Registeropplysning.HISTORISKE_IDENTER}
                        ikon={<PersonIcon fontSize={'1.5rem'} title="Person-ikon" focusable="false" />}
                        historikk={registerHistorikk.historiskeIdenter.map(ident => ({
                            ...ident,
                            verdi: formaterIdent(ident.verdi),
                        }))}
                    />
                )}
                {personErDød && (
                    <RegisteropplysningerTabell
                        opplysningstype={Registeropplysning.DØDSBOADRESSE}
                        ikon={<FlowerPetalFallingIcon fontSize={'1.5rem'} title="Blomst-ikon" focusable="false" />}
                        historikk={registerHistorikk.dødsboadresse}
                    />
                )}
                {registerHistorikk.sivilstand.length > 0 && (
                    <RegisteropplysningerTabell
                        opplysningstype={Registeropplysning.SIVILSTAND}
                        ikon={<HeartIcon fontSize={'1.5rem'} title="Hjerte-ikon" focusable="false" />}
                        historikk={registerHistorikk.sivilstand}
                    />
                )}
                {registerHistorikk.oppholdstillatelse.length > 0 && (
                    <RegisteropplysningerTabell
                        opplysningstype={Registeropplysning.OPPHOLD}
                        ikon={<PassportIcon fontSize={'1.5rem'} title="Pass-ikon" focusable="false" />}
                        historikk={registerHistorikk.oppholdstillatelse}
                    />
                )}
                <RegisteropplysningerTabell
                    opplysningstype={Registeropplysning.STATSBORGERSKAP}
                    ikon={<GlobeIcon fontSize={'1.5rem'} title="Globe-ikon" focusable="false" />}
                    historikk={registerHistorikk.statsborgerskap}
                />
                <RegisteropplysningerTabell
                    opplysningstype={Registeropplysning.BOSTEDSADRESSE}
                    ikon={<HouseIcon fontSize={'1.5rem'} title="Hjem-ikon" focusable="false" />}
                    historikk={registerHistorikk.bostedsadresse}
                />
                {registerHistorikk.oppholdsadresse.length > 0 && (
                    <RegisteropplysningerTabell
                        opplysningstype={Registeropplysning.OPPHOLDSADRESSE}
                        ikon={<HouseIcon fontSize={'1.5rem'} title="Hjem-ikon" focusable="false" />}
                        historikk={registerHistorikk.oppholdsadresse}
                    />
                )}
                {registerHistorikk.deltBosted.length > 0 && (
                    <RegisteropplysningerTabell
                        opplysningstype={Registeropplysning.DELTBOSTED}
                        ikon={<HouseIcon fontSize={'1.5rem'} title="Hjem-ikon" focusable="false" />}
                        historikk={registerHistorikk.deltBosted}
                    />
                )}
            </Box>
        </>
    );
};

export default Registeropplysninger;
