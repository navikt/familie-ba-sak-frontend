import React from 'react';

import styled from 'styled-components';

import { Button, Fieldset, Select, TextField } from '@navikt/ds-react';
import { ASpacing6 } from '@navikt/ds-tokens/dist/tokens';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import type { BrevmottakerUseSkjema, IRestBrevmottaker } from './useBrevmottakerSkjema';
import { Mottaker, mottakerVisningsnavn, useBrevmottakerSkjema } from './useBrevmottakerSkjema';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import { ModalKnapperad } from '../../../../Felleskomponenter/Modal/ModalKnapperad';
import { FamilieLandvelger } from '../../../Behandlingsresultat/EøsPeriode/FamilieLandvelger';

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

const MottakerSelect = styled(Select)`
    max-width: 19rem;
`;

interface IProps {
    lukkModal: () => void;
    brevmottakere: IRestBrevmottaker[];
    lagreMottaker: (useSkjema: BrevmottakerUseSkjema) => void;
}

const BrevmottakerSkjema: React.FC<IProps> = ({ lukkModal, brevmottakere, lagreMottaker }) => {
    const { verdierFraBrevmottakerUseSkjema, navnErPreutfylt } = useBrevmottakerSkjema({
        eksisterendeMottakere: brevmottakere,
    });

    const { skjema, valideringErOk } = verdierFraBrevmottakerUseSkjema;

    const { vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();
    return (
        <>
            <StyledFieldset
                legend="Skjema for å legge til eller fjerne brevmottaker"
                hideLegend
                error={skjema.visFeilmeldinger && hentFrontendFeilmelding(skjema.submitRessurs)}
            >
                <MottakerSelect
                    {...skjema.felter.mottaker.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                    readOnly={erLesevisning}
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
                <TextField
                    {...skjema.felter.navn.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                    readOnly={erLesevisning || navnErPreutfylt}
                    label={'Navn'}
                    onChange={(event): void => {
                        skjema.felter.navn.validerOgSettFelt(event.target.value);
                    }}
                />
                <TextField
                    {...skjema.felter.adresselinje1.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                    readOnly={erLesevisning}
                    label={'Adresselinje 1'}
                    onChange={(event): void => {
                        skjema.felter.adresselinje1.validerOgSettFelt(event.target.value);
                    }}
                />
                <TextField
                    {...skjema.felter.adresselinje2.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                    readOnly={erLesevisning}
                    label={'Adresselinje 2 (valgfri)'}
                    onChange={(event): void => {
                        skjema.felter.adresselinje2.validerOgSettFelt(event.target.value);
                    }}
                />
                <PostnummerOgStedContainer>
                    <TextField
                        {...skjema.felter.postnummer.hentNavBaseSkjemaProps(
                            skjema.visFeilmeldinger
                        )}
                        readOnly={erLesevisning}
                        label={'Postnummer'}
                        onChange={(event): void => {
                            skjema.felter.postnummer.validerOgSettFelt(event.target.value);
                        }}
                    />
                    <TextField
                        {...skjema.felter.poststed.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                        readOnly={erLesevisning}
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
                    eksluderLand={
                        skjema.felter.mottaker.verdi === Mottaker.BRUKER_MED_UTENLANDSK_ADRESSE
                            ? ['NO']
                            : undefined
                    }
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
                            onClick={() => lagreMottaker(verdierFraBrevmottakerUseSkjema)}
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
