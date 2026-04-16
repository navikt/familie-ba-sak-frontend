import React from 'react';

import { TrashIcon } from '@navikt/aksel-icons';
import { Alert, Box, Button, Fieldset, HStack, Select, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import type { ISkjema } from '@navikt/familie-skjema';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';
import type { Country } from '@navikt/land-verktoy';

import { useFeatureToggles } from '../../../../../../../hooks/useFeatureToggles';
import { EØS_LAND_REGIONKODER, RegionCombobox, type Regionkode } from '../../../../../../../komponenter/FlaggCombobox';
import type { IBehandling } from '../../../../../../../typer/behandling';
import type { ComboboxOption } from '../../../../../../../typer/common';
import type { IKompetanse, KompetanseAktivitet } from '../../../../../../../typer/eøsPerioder';
import {
    AnnenForelderAktivitet,
    EøsPeriodeStatus,
    kompetanseAktiviteter,
    KompetanseResultat,
    kompetanseResultater,
    SøkersAktivitet,
} from '../../../../../../../typer/eøsPerioder';
import { FeatureToggle } from '../../../../../../../typer/featureToggles';
import { onOptionSelected } from '../../../../../../../utils/skjema';
import { useBehandlingContext } from '../../../../context/BehandlingContext';
import EøsPeriodeSkjema from '../EøsKomponenter/EøsPeriodeSkjema';
import { FamilieLandvelger } from '../EøsKomponenter/FamilieLandvelger';

const kompetansePeriodeFeilmeldingId = (kompetanse: ISkjema<IKompetanse, IBehandling>): string =>
    `kompetanse-periode_${kompetanse.felter.barnIdenter.verdi.map(barn => `${barn}-`)}_${
        kompetanse.felter.periode.verdi.fom
    }`;

interface Props {
    skjema: ISkjema<IKompetanse, IBehandling>;
    tilgjengeligeBarn: ComboboxOption[];
    sendInnSkjema: () => void;
    toggleForm: (visAlert: boolean) => void;
    slettKompetanse: () => void;
    erAnnenForelderOmfattetAvNorskLovgivning?: boolean;
    inneholderSkjermetBarn?: boolean;
}

export function KompetanseTabellRadEndre({
    skjema,
    tilgjengeligeBarn,
    sendInnSkjema,
    toggleForm,
    slettKompetanse,
    erAnnenForelderOmfattetAvNorskLovgivning,
    inneholderSkjermetBarn,
}: Props) {
    const { vurderErLesevisning } = useBehandlingContext();
    const toggles = useFeatureToggles();
    const lesevisning = vurderErLesevisning(true) || !!inneholderSkjermetBarn;

    const visSubmitFeilmelding = () => {
        if (
            skjema.submitRessurs.status === RessursStatus.FEILET ||
            skjema.submitRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
            skjema.submitRessurs.status === RessursStatus.IKKE_TILGANG
        ) {
            return skjema.submitRessurs.frontendFeilmelding;
        } else {
            return null;
        }
    };

    const toPrimærland = skjema.felter.resultat?.verdi === KompetanseResultat.TO_PRIMÆRLAND;

    const nasjonalRettDifferanseberegningMedUlikeAktivitetsland =
        skjema.felter.resultat?.verdi === KompetanseResultat.NASJONAL_RETT_DIFFERANSEBEREGNING &&
        skjema.felter.barnetsBostedsland.verdi === 'NO' &&
        skjema.felter.søkersAktivitetsland.verdi != null &&
        skjema.felter.søkersAktivitetsland.verdi != 'NO' &&
        skjema.felter.annenForeldersAktivitetsland.verdi != null &&
        skjema.felter.annenForeldersAktivitetsland.verdi != 'NO' &&
        skjema.felter.søkersAktivitetsland.verdi !== skjema.felter.annenForeldersAktivitetsland.verdi;

    const onBarnSelected = (optionValue: string, isSelected: boolean) => {
        onOptionSelected(optionValue, isSelected, skjema.felter.barnIdenter, tilgjengeligeBarn);
    };

    return (
        <Fieldset error={skjema.visFeilmeldinger && visSubmitFeilmelding()} legend="Kompetanseskjema" hideLegend>
            <VStack gap={'space-16'} maxWidth={'40rem'} paddingInline={'space-4 space-4'}>
                <UNSAFE_Combobox
                    isMultiSelect
                    label={'Barn'}
                    options={tilgjengeligeBarn}
                    selectedOptions={skjema.felter.barnIdenter.verdi}
                    onToggleSelected={onBarnSelected}
                    readOnly={lesevisning}
                    error={skjema.felter.barnIdenter.hentNavInputProps(skjema.visFeilmeldinger).error}
                />
                <EøsPeriodeSkjema
                    periode={skjema.felter.periode}
                    periodeFeilmeldingId={kompetansePeriodeFeilmeldingId(skjema)}
                    initielFom={skjema.felter.initielFom}
                    visFeilmeldinger={skjema.visFeilmeldinger}
                    lesevisning={lesevisning}
                />
                {erAnnenForelderOmfattetAvNorskLovgivning && (
                    <Alert variant="info" inline>
                        Annen forelder er omfattet av norsk lovgivning og søker har selvstendig rett i perioden
                    </Alert>
                )}
                <Select
                    {...skjema.felter.søkersAktivitet.hentNavInputProps(skjema.visFeilmeldinger)}
                    readOnly={lesevisning}
                    label={'Søkers aktivitet'}
                    value={skjema.felter.søkersAktivitet.verdi || ''}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                        skjema.felter.søkersAktivitet.validerOgSettFelt(event.target.value as KompetanseAktivitet)
                    }
                >
                    <option value={''}>Velg</option>
                    {Object.values(erAnnenForelderOmfattetAvNorskLovgivning ? AnnenForelderAktivitet : SøkersAktivitet)
                        .filter((aktivitet: KompetanseAktivitet) => aktivitet !== AnnenForelderAktivitet.IKKE_AKTUELT)
                        .map((aktivitet: KompetanseAktivitet) => {
                            return (
                                <option key={aktivitet} value={aktivitet}>
                                    {kompetanseAktiviteter[aktivitet]}
                                </option>
                            );
                        })}
                </Select>
                <Select
                    className="unset-margin-bottom"
                    {...skjema.felter.annenForeldersAktivitet.hentNavInputProps(skjema.visFeilmeldinger)}
                    readOnly={lesevisning}
                    label={'Annen forelders aktivitet'}
                    value={skjema.felter.annenForeldersAktivitet.verdi || ''}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                        skjema.felter.annenForeldersAktivitet.validerOgSettFelt(
                            event.target.value as KompetanseAktivitet
                        );
                    }}
                >
                    <option value={''}>Velg</option>
                    {Object.values(
                        erAnnenForelderOmfattetAvNorskLovgivning ? SøkersAktivitet : AnnenForelderAktivitet
                    ).map((aktivitet: KompetanseAktivitet) => {
                        return (
                            <option key={aktivitet} value={aktivitet}>
                                {kompetanseAktiviteter[aktivitet]}
                            </option>
                        );
                    })}
                </Select>
                {skjema.felter.annenForeldersAktivitet.verdi === AnnenForelderAktivitet.IKKE_AKTUELT && (
                    <Alert variant="info" size="small" inline>
                        Søker har enten aleneomsorg for egne barn eller forsørger andre barn
                    </Alert>
                )}
                {toggles[FeatureToggle.brukNyFlagCombobox] ? (
                    <RegionCombobox
                        label={'Søkers aktivitetsland'}
                        value={skjema.felter.søkersAktivitetsland.verdi as Regionkode}
                        options={EØS_LAND_REGIONKODER}
                        onChange={value => {
                            if (value) {
                                skjema.felter.søkersAktivitetsland.validerOgSettFelt(value);
                            } else {
                                skjema.felter.søkersAktivitetsland.nullstill();
                            }
                        }}
                        readOnly={lesevisning}
                        error={
                            skjema.visFeilmeldinger &&
                            skjema.felter.søkersAktivitetsland.valideringsstatus === Valideringsstatus.FEIL
                                ? skjema.felter.søkersAktivitetsland.feilmelding?.toString()
                                : ''
                        }
                    />
                ) : (
                    <FamilieLandvelger
                        erLesevisning={lesevisning}
                        id={'søkersAktivitetsland'}
                        label={'Søkers aktivitetsland'}
                        kunEøs
                        medFlag
                        size="medium"
                        kanNullstilles
                        value={skjema.felter.søkersAktivitetsland.verdi}
                        onChange={(value: Country) => {
                            const nyVerdi = value ? value.value : undefined;
                            skjema.felter.søkersAktivitetsland.validerOgSettFelt(nyVerdi);
                        }}
                        feil={
                            skjema.visFeilmeldinger &&
                            skjema.felter.søkersAktivitetsland.valideringsstatus === Valideringsstatus.FEIL
                                ? skjema.felter.søkersAktivitetsland.feilmelding?.toString()
                                : ''
                        }
                        utenMargin
                    />
                )}
                {toggles[FeatureToggle.brukNyFlagCombobox] ? (
                    <RegionCombobox
                        label={'Annen forelders aktivitetsland'}
                        value={skjema.felter.annenForeldersAktivitetsland.verdi as Regionkode}
                        options={EØS_LAND_REGIONKODER}
                        onChange={value => {
                            if (value) {
                                skjema.felter.annenForeldersAktivitetsland.validerOgSettFelt(value);
                            } else {
                                skjema.felter.annenForeldersAktivitetsland.nullstill();
                            }
                        }}
                        readOnly={lesevisning}
                        error={
                            skjema.visFeilmeldinger &&
                            skjema.felter.annenForeldersAktivitetsland.valideringsstatus === Valideringsstatus.FEIL
                                ? skjema.felter.annenForeldersAktivitetsland.feilmelding?.toString()
                                : ''
                        }
                    />
                ) : (
                    <FamilieLandvelger
                        erLesevisning={lesevisning}
                        id={'annenForeldersAktivitetsland'}
                        label={'Annen forelders aktivitetsland'}
                        kunEøs
                        medFlag
                        size="medium"
                        kanNullstilles
                        value={skjema.felter.annenForeldersAktivitetsland.verdi}
                        onChange={(value: Country) => {
                            const nyVerdi = value ? value.value : undefined;
                            skjema.felter.annenForeldersAktivitetsland.validerOgSettFelt(nyVerdi);
                        }}
                        feil={
                            skjema.visFeilmeldinger &&
                            skjema.felter.annenForeldersAktivitetsland.valideringsstatus === Valideringsstatus.FEIL
                                ? skjema.felter.annenForeldersAktivitetsland.feilmelding?.toString()
                                : ''
                        }
                        utenMargin
                    />
                )}
                {toggles[FeatureToggle.brukNyFlagCombobox] ? (
                    <RegionCombobox
                        label={'Barnets bostedsland'}
                        value={skjema.felter.barnetsBostedsland.verdi as Regionkode}
                        options={EØS_LAND_REGIONKODER}
                        onChange={value => {
                            if (value) {
                                skjema.felter.barnetsBostedsland.validerOgSettFelt(value);
                            } else {
                                skjema.felter.barnetsBostedsland.nullstill();
                            }
                        }}
                        readOnly={lesevisning}
                        error={
                            skjema.visFeilmeldinger &&
                            skjema.felter.barnetsBostedsland.valideringsstatus === Valideringsstatus.FEIL
                                ? skjema.felter.barnetsBostedsland.feilmelding?.toString()
                                : ''
                        }
                    />
                ) : (
                    <FamilieLandvelger
                        erLesevisning={lesevisning}
                        id={'bostedadresse'}
                        label={'Barnets bostedsland'}
                        kunEøs
                        medFlag
                        size="medium"
                        kanNullstilles
                        value={skjema.felter.barnetsBostedsland?.verdi}
                        onChange={(value: Country) => {
                            const nyVerdi = value ? value.value : undefined;
                            skjema.felter.barnetsBostedsland.validerOgSettFelt(nyVerdi);
                        }}
                        feil={
                            skjema.visFeilmeldinger &&
                            skjema.felter.barnetsBostedsland.valideringsstatus === Valideringsstatus.FEIL
                                ? skjema.felter.barnetsBostedsland?.feilmelding?.toString()
                                : ''
                        }
                        utenMargin
                    />
                )}
                <Select
                    {...skjema.felter.resultat.hentNavInputProps(skjema.visFeilmeldinger)}
                    readOnly={lesevisning}
                    label={'Kompetanse'}
                    value={skjema.felter.resultat.verdi || ''}
                    onChange={event => {
                        skjema.felter.resultat.validerOgSettFelt(event.target.value as KompetanseResultat);
                    }}
                >
                    <option value={''}>Velg</option>
                    <option key={KompetanseResultat.NORGE_ER_PRIMÆRLAND} value={KompetanseResultat.NORGE_ER_PRIMÆRLAND}>
                        {kompetanseResultater[KompetanseResultat.NORGE_ER_PRIMÆRLAND]}
                    </option>
                    <option
                        key={KompetanseResultat.NORGE_ER_SEKUNDÆRLAND}
                        value={KompetanseResultat.NORGE_ER_SEKUNDÆRLAND}
                    >
                        {kompetanseResultater[KompetanseResultat.NORGE_ER_SEKUNDÆRLAND]}
                    </option>
                    <option
                        key={KompetanseResultat.NASJONAL_RETT_DIFFERANSEBEREGNING}
                        value={KompetanseResultat.NASJONAL_RETT_DIFFERANSEBEREGNING}
                    >
                        {kompetanseResultater[KompetanseResultat.NASJONAL_RETT_DIFFERANSEBEREGNING]}
                    </option>
                    <option key={KompetanseResultat.TO_PRIMÆRLAND} value={KompetanseResultat.TO_PRIMÆRLAND}>
                        {kompetanseResultater[KompetanseResultat.TO_PRIMÆRLAND]}
                    </option>
                </Select>
                {toPrimærland && (
                    <Box marginBlock={'space-2 space-2'}>
                        <Alert variant={'warning'} size={'small'} inline={true}>
                            Norge og annen forelders aktivitetsland er primærland. Saksbehandler må manuelt vurdere om
                            Norge skal utbetale barnetrygden.
                        </Alert>
                    </Box>
                )}
                {nasjonalRettDifferanseberegningMedUlikeAktivitetsland && (
                    <Box marginBlock={'space-2 space-2'}>
                        <Alert variant={'warning'} size={'small'} inline={true}>
                            To andre EØS-land er primærland. Saksbehandler må manuelt beregne hvilket av EØS-landene som
                            utbetaler den høyeste barnetrygden og som Norge skal differanseberegne mot.
                        </Alert>
                    </Box>
                )}
                {!lesevisning && (
                    <HStack justify={'space-between'} marginBlock={'space-12 space-0'}>
                        <div>
                            <Button
                                onClick={() => sendInnSkjema()}
                                size="small"
                                variant={'primary'}
                                loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                            >
                                Ferdig
                            </Button>
                            <Button
                                style={{ marginLeft: '1rem' }}
                                onClick={() => toggleForm(false)}
                                size="small"
                                variant="tertiary"
                            >
                                Avbryt
                            </Button>
                        </div>
                        {skjema.felter.status.verdi !== EøsPeriodeStatus.IKKE_UTFYLT && (
                            <Button
                                variant={'tertiary'}
                                onClick={() => slettKompetanse()}
                                id={`slett_kompetanse_${skjema.felter.barnIdenter.verdi.map(
                                    barn => `${barn}-`
                                )}_${skjema.felter.initielFom.verdi}`}
                                loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                                size={'small'}
                                icon={<TrashIcon />}
                            >
                                Fjern
                            </Button>
                        )}
                    </HStack>
                )}
            </VStack>
        </Fieldset>
    );
}
