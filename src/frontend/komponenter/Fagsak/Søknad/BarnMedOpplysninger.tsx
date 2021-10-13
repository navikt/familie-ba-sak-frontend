import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';

import { FamilieCheckbox } from '@navikt/familie-form-elements';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useSøknad } from '../../../context/SøknadContext';
import Slett from '../../../ikoner/Slett';
import { IBarnMedOpplysninger } from '../../../typer/søknad';
import { formaterIdent, hentAlderSomString } from '../../../utils/formatter';
import IkonKnapp from '../../Felleskomponenter/IkonKnapp/IkonKnapp';
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
                    knappPosisjon={'venstre'}
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
                    lukkKnapp: false,
                    visModal: visHarLøpendeModal,
                    actions: [
                        <Knapp
                            key={'fjern-barn'}
                            mini={true}
                            onClick={() => {
                                settVisHarLøpendeModal(false);
                            }}
                            children={'Fjern barn'}
                        />,
                        <Knapp
                            key={'behold-barn'}
                            mini={true}
                            onClick={() => {
                                settVisHarLøpendeModal(false);
                                oppdaterBarnMerket(true);
                            }}
                            children={'Behold barn'}
                        />,
                    ],
                }}
            >
                <Normaltekst>
                    Hvis det ikke er søkt for nye perioder skal du ikke krysse av for dette barnet (
                    {formaterIdent(barn.ident)}).
                </Normaltekst>
            </UIModalWrapper>
        </CheckboxOgSlettknapp>
    );
};
export default BarnMedOpplysninger;
