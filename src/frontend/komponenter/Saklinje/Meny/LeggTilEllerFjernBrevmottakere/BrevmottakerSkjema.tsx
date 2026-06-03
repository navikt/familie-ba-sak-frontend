import type { ChangeEvent } from 'react';

import { hentFrontendFeilmelding } from '@utils/ressursUtils';
import { useLocation } from 'react-router';

import { Box, Button, Fieldset, HGrid, HStack, InlineMessage, Select, TextField, VStack } from '@navikt/ds-react';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import styles from './BrevmottakerSkjema.module.css';
import type { BrevmottakerUseSkjema, IRestBrevmottaker, SkjemaBrevmottaker } from './useBrevmottakerSkjema';
import { Mottaker, mottakerVisningsnavn, useBrevmottakerSkjema } from './useBrevmottakerSkjema';
import { ALLE_LAND_REGIONKODER, RegionCombobox, type Regionkode } from '../../../FlaggCombobox';

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

    const { skjema } = verdierFraBrevmottakerUseSkjema;

    const gyldigeMottakerTyper = erPåDokumentutsending
        ? Object.values(Mottaker).filter(mottakerType => mottakerType !== Mottaker.DØDSBO)
        : Object.values(Mottaker);

    return (
        <>
            <Fieldset
                legend="Skjema for å legge til eller fjerne brevmottaker"
                hideLegend
                error={skjema.visFeilmeldinger && hentFrontendFeilmelding(skjema.submitRessurs)}
            >
                <VStack gap={'space-24'}>
                    <Box maxWidth={'19rem'}>
                        <Select
                            {...skjema.felter.mottaker.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                            readOnly={erLesevisning}
                            label="Mottaker"
                            onChange={(event: ChangeEvent<HTMLSelectElement>): void => {
                                skjema.felter.mottaker.validerOgSettFelt(event.target.value as Mottaker);
                            }}
                        >
                            <option value="">Velg</option>
                            {gyldigeMottakerTyper.map(mottaker => (
                                <option value={mottaker} key={mottaker}>
                                    {mottakerVisningsnavn[mottaker]}
                                </option>
                            ))}
                        </Select>
                    </Box>
                    <TextField
                        {...skjema.felter.navn.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                        readOnly={erLesevisning || navnErPreutfylt}
                        label={'Navn'}
                        onChange={(event): void => {
                            skjema.felter.navn.validerOgSettFelt(event.target.value);
                        }}
                    />
                    <RegionCombobox
                        label={'Land'}
                        value={(skjema.felter.land.verdi !== '' ? skjema.felter.land.verdi : undefined) as Regionkode}
                        options={ALLE_LAND_REGIONKODER.filter(regionkode => {
                            if (skjema.felter.mottaker.verdi === Mottaker.BRUKER_MED_UTENLANDSK_ADRESSE) {
                                return regionkode !== 'NO' && regionkode !== 'XU';
                            }
                            return regionkode !== 'XU';
                        })}
                        onChange={value => {
                            if (value) {
                                skjema.felter.land.validerOgSettFelt(value);
                            } else {
                                skjema.felter.land.nullstill();
                            }
                        }}
                        readOnly={erLesevisning}
                        error={
                            skjema.visFeilmeldinger && skjema.felter.land.valideringsstatus === Valideringsstatus.FEIL
                                ? skjema.felter.land.feilmelding?.toString()
                                : ''
                        }
                        dropdownPlacement={skjema.felter.land.verdi ? 'bottom' : 'top'}
                    />
                    {skjema.felter.land.verdi && (
                        <>
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
                            {skjema.felter.land.verdi !== 'NO' && (
                                <InlineMessage status="info">
                                    Ved utenlandsk adresse skal postnummer og poststed legges i adresselinjene.
                                </InlineMessage>
                            )}

                            <HGrid gap={'space-16'} columns={'10rem 1fr'}>
                                <TextField
                                    className={styles.postInput}
                                    {...skjema.felter.postnummer.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                                    readOnly={erLesevisning}
                                    disabled={skjema.felter.land.verdi !== 'NO'}
                                    label={'Postnummer'}
                                    onChange={(event): void => {
                                        skjema.felter.postnummer.validerOgSettFelt(event.target.value);
                                    }}
                                />
                                <TextField
                                    className={styles.postInput}
                                    {...skjema.felter.poststed.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                                    readOnly={erLesevisning}
                                    disabled={skjema.felter.land.verdi !== 'NO'}
                                    label={'Poststed'}
                                    onChange={(event): void => {
                                        skjema.felter.poststed.validerOgSettFelt(event.target.value);
                                    }}
                                />
                            </HGrid>
                        </>
                    )}
                </VStack>
            </Fieldset>
            <HStack marginBlock={'space-40 space-0'} justify={'start'} gap={'space-16'}>
                {!erLesevisning && (
                    <>
                        <Button
                            variant={'primary'}
                            loading={skjema.submitRessurs.status === RessursStatus.HENTER}
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
            </HStack>
        </>
    );
};

export default BrevmottakerSkjema;
