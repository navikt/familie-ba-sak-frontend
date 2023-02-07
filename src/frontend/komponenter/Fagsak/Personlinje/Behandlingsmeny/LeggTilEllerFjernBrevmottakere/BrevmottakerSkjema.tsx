import React from 'react';

import styled from 'styled-components';

import { Button, Fieldset } from '@navikt/ds-react';
import { ASpacing6 } from '@navikt/ds-tokens/dist/tokens';
import { FamilieInput, FamilieSelect } from '@navikt/familie-form-elements';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { ModalKnapperad } from '../../../../Felleskomponenter/Modal/ModalKnapperad';
import { FamilieLandvelger } from '../../../Behandlingsresultat/EøsPeriode/FamilieLandvelger';
import useLeggTilFjernBrevmottaker, {
    Mottaker,
    mottakerVisningsnavn,
} from './useLeggTilFjernBrevmottaker';

const PostnummerOgStedContainer = styled.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 8rem 24rem;

    &:has(.navds-text-field--error) {
        .navds-form-field .navds-form-field__error {
            height: 3rem;
            display: initial;
        }
    }
`;

const StyledFieldset = styled(Fieldset)`
    &.navds-fieldset > div:not(:first-of-type):not(:empty) {
        margin-top: ${ASpacing6};
    }
`;

const MottakerSelect = styled(FamilieSelect)`
    max-width: 19rem;
`;

interface IProps {
    lukkModal: () => void;
}

const BrevmottakerSkjema: React.FC<IProps> = ({ lukkModal }) => {
    const { skjema, lagreMottaker, valideringErOk } = useLeggTilFjernBrevmottaker();
    const { vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();
    return (
        <>
            <StyledFieldset legend="Skjema for å legge til eller fjerne brevmottaker" hideLegend>
                <MottakerSelect
                    {...skjema.felter.mottaker.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                    erLesevisning={erLesevisning}
                    label="Mottaker"
                    onChange={(event): void => {
                        skjema.felter.mottaker.validerOgSettFelt(event.target.value as Mottaker);
                    }}
                >
                    <option value="">Velg</option>
                    {Object.values(Mottaker).map(mottaker => (
                        <option value={mottaker} key={mottaker}>
                            {mottakerVisningsnavn[mottaker]}
                        </option>
                    ))}
                </MottakerSelect>
                <FamilieInput
                    {...skjema.felter.navn.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                    erLesevisning={erLesevisning}
                    label={'Navn'}
                    onChange={(event): void => {
                        skjema.felter.navn.validerOgSettFelt(event.target.value);
                    }}
                />
                <FamilieInput
                    {...skjema.felter.adresselinje1.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                    erLesevisning={erLesevisning}
                    label={'Adresselinje 1'}
                    onChange={(event): void => {
                        skjema.felter.adresselinje1.validerOgSettFelt(event.target.value);
                    }}
                />
                <FamilieInput
                    {...skjema.felter.adresselinje2.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                    erLesevisning={erLesevisning}
                    label={'Adresselinje 2 (valgfri)'}
                    onChange={(event): void => {
                        skjema.felter.adresselinje2.validerOgSettFelt(event.target.value);
                    }}
                />
                <PostnummerOgStedContainer>
                    <FamilieInput
                        {...skjema.felter.postnummer.hentNavBaseSkjemaProps(
                            skjema.visFeilmeldinger
                        )}
                        erLesevisning={erLesevisning}
                        label={'Postnummer'}
                        onChange={(event): void => {
                            skjema.felter.postnummer.validerOgSettFelt(event.target.value);
                        }}
                    />
                    <FamilieInput
                        {...skjema.felter.poststed.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                        erLesevisning={erLesevisning}
                        label={'Poststed'}
                        onChange={(event): void => {
                            skjema.felter.poststed.validerOgSettFelt(event.target.value);
                        }}
                    />
                </PostnummerOgStedContainer>

                <FamilieLandvelger
                    id={'land'}
                    value={skjema.felter.land.verdi !== '' ? skjema.felter.land.verdi : undefined}
                    label={'Land'}
                    medFlag
                    utenMargin
                    feil={
                        skjema.visFeilmeldinger &&
                        skjema.felter.land.valideringsstatus === Valideringsstatus.FEIL
                            ? skjema.felter.land.feilmelding?.toString()
                            : ''
                    }
                    erLesevisning={erLesevisning}
                    onChange={land => {
                        skjema.felter.land.validerOgSettFelt(land.value);
                    }}
                />
            </StyledFieldset>
            <ModalKnapperad>
                {!erLesevisning && (
                    <>
                        <Button
                            variant={valideringErOk() ? 'primary' : 'secondary'}
                            loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                            disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                            onClick={lagreMottaker}
                        >
                            Legg til mottaker
                        </Button>
                        <Button variant="tertiary" onClick={lukkModal}>
                            Avbryt
                        </Button>
                    </>
                )}

                {erLesevisning && <Button onClick={lukkModal}>Lukk</Button>}
            </ModalKnapperad>
        </>
    );
};

export default BrevmottakerSkjema;
