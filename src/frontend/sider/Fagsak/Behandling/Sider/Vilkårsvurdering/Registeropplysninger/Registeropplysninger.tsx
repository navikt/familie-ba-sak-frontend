import React from 'react';

import styled from 'styled-components';

import {
    CalendarIcon,
    FlowerPetalFallingIcon,
    GlobeIcon,
    HeartIcon,
    HouseIcon,
    PassportIcon,
} from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';
import { AFontWeightRegular, ASpacing4 } from '@navikt/ds-tokens/dist/tokens';

import { HentetLabel } from './HentetLabel';
import RegisteropplysningerTabell from './RegisteropplysningerTabell';
import { useAppContext } from '../../../../../../context/AppContext';
import type { IRestRegisterhistorikk } from '../../../../../../typer/person';
import { Registeropplysning } from '../../../../../../typer/registeropplysning';
import { ToggleNavn } from '../../../../../../typer/toggles';
import { Datoformat, isoStringTilFormatertString } from '../../../../../../utils/dato';

const Container = styled.div`
    width: 32rem;
`;

const SemiBoldHeading = styled(Heading)`
    font-weight: ${AFontWeightRegular};
`;

interface IRegisteropplysningerProps {
    registerHistorikk: IRestRegisterhistorikk;
    fødselsdato: string;
}

const Registeropplysninger: React.FC<IRegisteropplysningerProps> = ({ registerHistorikk, fødselsdato }) => {
    const { toggles } = useAppContext();

    const personErDød = registerHistorikk.dødsboadresse.length > 0;

    return (
        <>
            <SemiBoldHeading level={'3'} size="medium">
                Registeropplysninger
            </SemiBoldHeading>
            <Container>
                <HentetLabel
                    size={'small'}
                    style={{ marginBottom: ASpacing4 }}
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
                {personErDød && (
                    <RegisteropplysningerTabell
                        opplysningstype={Registeropplysning.DØDSBOADRESSE}
                        ikon={<FlowerPetalFallingIcon fontSize={'1.5rem'} title="Blomst-ikon" focusable="false" />}
                        historikk={registerHistorikk.dødsboadresse}
                    />
                )}
                <RegisteropplysningerTabell
                    opplysningstype={Registeropplysning.SIVILSTAND}
                    ikon={<HeartIcon fontSize={'1.5rem'} title="Hjerte-ikon" focusable="false" />}
                    historikk={registerHistorikk.sivilstand}
                />
                <RegisteropplysningerTabell
                    opplysningstype={Registeropplysning.OPPHOLD}
                    ikon={<PassportIcon fontSize={'1.5rem'} title="Pass-ikon" focusable="false" />}
                    historikk={registerHistorikk.oppholdstillatelse}
                />
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
                {toggles[ToggleNavn.skalViseOppholdsadresse] && registerHistorikk.oppholdsadresse.length > 0 && (
                    <RegisteropplysningerTabell
                        opplysningstype={Registeropplysning.OPPHOLDSADRESSE}
                        ikon={<HouseIcon fontSize={'1.5rem'} title="Hjem-ikon" focusable="false" />}
                        historikk={registerHistorikk.oppholdsadresse}
                    />
                )}
                {toggles[ToggleNavn.skalViseDeltBosted] && registerHistorikk.deltBosted.length > 0 && (
                    <RegisteropplysningerTabell
                        opplysningstype={Registeropplysning.DELTBOSTED}
                        ikon={<HouseIcon fontSize={'1.5rem'} title="Hjem-ikon" focusable="false" />}
                        historikk={registerHistorikk.deltBosted}
                    />
                )}
            </Container>
        </>
    );
};

export default Registeropplysninger;
