import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';

import { FamilieCheckbox } from '@navikt/familie-form-elements';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useSøknad } from '../../../context/SøknadContext';
import Slett from '../../../ikoner/Slett';
import type { IBarnMedOpplysninger } from '../../../typer/søknad';
import { formaterIdent, hentAlderSomString } from '../../../utils/formatter';
import IkonKnapp, { IkonPosisjon } from '../../Felleskomponenter/IkonKnapp/IkonKnapp';
import UIModalWrapper from '../../Felleskomponenter/Modal/UIModalWrapper';

interface IProps {
    barn: IBarnMedOpplysninger;
}

const CheckboxOgSlettknapp = styled.div`
    display: flex;
    text-align: center;
`;

const StyledFamilieCheckbox = styled(FamilieCheckbox)`
    margin-left: 1rem;
    > label {
        width: 100%;
    }
`;

const LabelContent = styled.div`
    display: flex;
    white-space: nowrap;
`;

const LabelTekst = styled.p`
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const FjernBarnKnapp = styled(IkonKnapp)`
    margin-left: 1rem;
`;

const BarnMedOpplysninger: React.FunctionComponent<IProps> = ({ barn }) => {
    const { skjema, barnMedLøpendeUtbetaling } = useSøknad();
    const { erLesevisning } = useBehandling();
    const [visHarLøpendeModal, settVisHarLøpendeModal] = useState(false);

    const barnetHarLøpendeUtbetaling = barnMedLøpendeUtbetaling.has(barn.ident);

    const navnOgIdentTekst = `${barn.navn ?? 'Navn ukjent'} (${hentAlderSomString(
        barn.fødselsdato
    )}) | ${formaterIdent(barn.ident)} ${barnetHarLøpendeUtbetaling ? '(løpende)' : ''}`;

    const oppdaterBarnMerket = (nyMerketStatus: boolean) => {
        skjema.felter.barnaMedOpplysninger.validerOgSettFelt(
            skjema.felter.barnaMedOpplysninger.verdi.map(
                (barnMedOpplysninger: IBarnMedOpplysninger) =>
                    barnMedOpplysninger.ident === barn.ident
                        ? {
                              ...barnMedOpplysninger,
                              merket: nyMerketStatus,
                          }
                        : barnMedOpplysninger
            )
        );
    };

    return (
        <CheckboxOgSlettknapp>
            <StyledFamilieCheckbox
                erLesevisning={erLesevisning()}
                label={
                    <LabelContent>
                        <LabelTekst title={navnOgIdentTekst}>{navnOgIdentTekst}</LabelTekst>
                    </LabelContent>
                }
                checked={barn.merket}
                onChange={() => {
                    const nyMerketStatus = !barn.merket;

                    if (barnetHarLøpendeUtbetaling && nyMerketStatus) {
                        settVisHarLøpendeModal(true);
                    } else {
                        oppdaterBarnMerket(nyMerketStatus);
                    }
                }}
            />
            {barn.manueltRegistrert && (
                <FjernBarnKnapp
                    erLesevisning={erLesevisning()}
                    id={`fjern__${barn.ident}`}
                    mini={true}
                    ikon={<Slett />}
                    ikonPosisjon={IkonPosisjon.VENSTRE}
                    onClick={() => {
                        skjema.felter.barnaMedOpplysninger.validerOgSettFelt([
                            ...skjema.felter.barnaMedOpplysninger.verdi.filter(
                                barnMedOpplysninger =>
                                    barnMedOpplysninger.ident !== barn.ident ||
                                    barnMedOpplysninger.navn !== barn.navn ||
                                    barnMedOpplysninger.fødselsdato !== barn.fødselsdato
                            ),
                        ]);
                    }}
                    label={'Fjern barn'}
                />
            )}
            <UIModalWrapper
                modal={{
                    tittel: 'Søker mottar allerede barnetrygd for dette barnet',
                    lukkKnapp: true,
                    visModal: visHarLøpendeModal,
                    actions: [
                        <Knapp
                            key={'avbryt'}
                            mini={true}
                            onClick={() => {
                                settVisHarLøpendeModal(false);
                            }}
                            children={'Avbryt'}
                        />,
                        <Knapp
                            key={'velg-barnet'}
                            mini={true}
                            onClick={() => {
                                settVisHarLøpendeModal(false);
                                oppdaterBarnMerket(true);
                            }}
                            children={'Velg barnet'}
                        />,
                    ],
                }}
            >
                <Normaltekst>
                    Barnet ({formaterIdent(barn.ident)}) har løpende barnetrygd. Du skal kun velge
                    barn som det ikke utbetales barnetrygd for.
                </Normaltekst>
            </UIModalWrapper>
        </CheckboxOgSlettknapp>
    );
};
export default BarnMedOpplysninger;
