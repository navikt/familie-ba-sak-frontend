import React from 'react';

import { useLocation } from 'react-router';
import styled from 'styled-components';

import { Alert, Button, Fieldset, Select, TextField } from '@navikt/ds-react';
import { ASpacing6 } from '@navikt/ds-tokens/dist/tokens';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import type {
    BrevmottakerUseSkjema,
    IRestBrevmottaker,
    SkjemaBrevmottaker,
} from './useBrevmottakerSkjema';
import { Mottaker, mottakerVisningsnavn, useBrevmottakerSkjema } from './useBrevmottakerSkjema';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import { FamilieLandvelger } from '../../../Behandling/Sider/Behandlingsresultat/Eøs/EøsKomponenter/FamilieLandvelger';

const PostnummerOgStedContainer = styled.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 8rem 1fr;

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

const ModalKnapperad = styled.div`
    margin-top: 2.5rem;
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
`;

interface Props<T extends SkjemaBrevmottaker | IRestBrevmottaker> {
    lukkModal: () => void;
    brevmottakere: T[];
    lagreMottaker: (useSkjema: BrevmottakerUseSkjema) => void;
    erLesevisning: boolean;
}

const BrevmottakerSkjema = <T extends SkjemaBrevmottaker | IRestBrevmottaker>({
    lukkModal,
    brevmottakere,
    lagreMottaker,
    erLesevisning,
}: Props<T>) => {
    const { verdierFraBrevmottakerUseSkjema, navnErPreutfylt } = useBrevmottakerSkjema({
        eksisterendeMottakere: brevmottakere,
    });
    const erPåDokumentutsending = useLocation().pathname.includes('dokumentutsending');

    const { skjema, valideringErOk } = verdierFraBrevmottakerUseSkjema;

    const gyldigeMottakerTyper = erPåDokumentutsending
        ? Object.values(Mottaker).filter(mottakerType => mottakerType !== Mottaker.DØDSBO)
        : Object.values(Mottaker);

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
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                        skjema.felter.mottaker.validerOgSettFelt(event.target.value as Mottaker);
                    }}
                >
                    <option value="">Velg</option>
                    {gyldigeMottakerTyper.map(mottaker => (
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

                <FamilieLandvelger
                    id={'land'}
                    value={skjema.felter.land.verdi !== '' ? skjema.felter.land.verdi : undefined}
                    label={'Land'}
                    medFlag
                    utenMargin
                    eksluderLand={
                        skjema.felter.mottaker.verdi === Mottaker.BRUKER_MED_UTENLANDSK_ADRESSE
                            ? ['NO', 'XU']
                            : ['XU']
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

                {skjema.felter.land.verdi && (
                    <>
                        <TextField
                            {...skjema.felter.adresselinje1.hentNavBaseSkjemaProps(
                                skjema.visFeilmeldinger
                            )}
                            readOnly={erLesevisning}
                            label={'Adresselinje 1'}
                            onChange={(event): void => {
                                skjema.felter.adresselinje1.validerOgSettFelt(event.target.value);
                            }}
                        />
                        <TextField
                            {...skjema.felter.adresselinje2.hentNavBaseSkjemaProps(
                                skjema.visFeilmeldinger
                            )}
                            readOnly={erLesevisning}
                            label={'Adresselinje 2 (valgfri)'}
                            onChange={(event): void => {
                                skjema.felter.adresselinje2.validerOgSettFelt(event.target.value);
                            }}
                        />
                        {skjema.felter.land.verdi !== 'NO' && (
                            <Alert variant="info">
                                Ved utenlandsk adresse skal postnummer og poststed legges i
                                adresselinjene.
                            </Alert>
                        )}

                        <PostnummerOgStedContainer>
                            <TextField
                                {...skjema.felter.postnummer.hentNavBaseSkjemaProps(
                                    skjema.visFeilmeldinger
                                )}
                                readOnly={erLesevisning}
                                disabled={skjema.felter.land.verdi !== 'NO'}
                                label={'Postnummer'}
                                onChange={(event): void => {
                                    skjema.felter.postnummer.validerOgSettFelt(event.target.value);
                                }}
                            />
                            <TextField
                                {...skjema.felter.poststed.hentNavBaseSkjemaProps(
                                    skjema.visFeilmeldinger
                                )}
                                readOnly={erLesevisning}
                                disabled={skjema.felter.land.verdi !== 'NO'}
                                label={'Poststed'}
                                onChange={(event): void => {
                                    skjema.felter.poststed.validerOgSettFelt(event.target.value);
                                }}
                            />
                        </PostnummerOgStedContainer>
                    </>
                )}
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
