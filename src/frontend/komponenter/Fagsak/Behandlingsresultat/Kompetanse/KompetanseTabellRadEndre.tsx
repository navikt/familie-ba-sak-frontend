import React from 'react';

import styled from 'styled-components';

import { Delete } from '@navikt/ds-icons';
import { Fieldset } from '@navikt/ds-react';
import { Alert, Button } from '@navikt/ds-react';
import type { OptionType } from '@navikt/familie-form-elements';
import { FamilieKnapp, FamilieReactSelect, FamilieSelect } from '@navikt/familie-form-elements';
import type { ISkjema } from '@navikt/familie-skjema';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';
import type { Country } from '@navikt/land-verktoy';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../typer/behandling';
import type { IKompetanse, KompetanseAktivitet } from '../../../../typer/eøsPerioder';
import {
    AnnenForelderAktivitet,
    EøsPeriodeStatus,
    kompetanseAktiviteter,
    KompetanseResultat,
    kompetanseResultater,
    SøkersAktivitet,
} from '../../../../typer/eøsPerioder';
import EøsPeriodeSkjema from '../EøsPeriode/EøsPeriodeSkjema';
import { FamilieLandvelger } from '../EøsPeriode/FamilieLandvelger';
import { EøsPeriodeSkjemaContainer, Knapperad } from '../EøsPeriode/fellesKomponenter';

const kompetansePeriodeFeilmeldingId = (kompetanse: ISkjema<IKompetanse, IBehandling>): string =>
    `kompetanse-periode_${kompetanse.felter.barnIdenter.verdi.map(barn => `${barn}-`)}_${
        kompetanse.felter.periode.verdi.fom
    }`;
interface IProps {
    skjema: ISkjema<IKompetanse, IBehandling>;
    tilgjengeligeBarn: OptionType[];
    status: EøsPeriodeStatus;
    valideringErOk: () => boolean;
    sendInnSkjema: () => void;
    toggleForm: (visAlert: boolean) => void;
    slettKompetanse: () => void;
    annenForelderOmfattetAvNorskLovgivning?: boolean;
}

const StyledAlert = styled(Alert)`
    margin-bottom: 1.5rem;
`;

const StyledFamilieLandvelger = styled(FamilieLandvelger)`
    margin-top: 1.5rem;
`;

const StyledFamilieSelect = styled(FamilieSelect)`
    margin-top: 1.5rem;
`;

const StyledFamilieReactSelect = styled(FamilieReactSelect)`
    margin-bottom: 1.5rem;
`;

const KompetanseTabellRadEndre: React.FC<IProps> = ({
    skjema,
    tilgjengeligeBarn,
    status,
    valideringErOk,
    sendInnSkjema,
    toggleForm,
    slettKompetanse,
    annenForelderOmfattetAvNorskLovgivning,
}) => {
    const { vurderErLesevisning } = useBehandling();
    const lesevisning = vurderErLesevisning(true);

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

    return (
        <Fieldset
            error={skjema.visFeilmeldinger && visSubmitFeilmelding()}
            legend="Kompetanseskjema"
            hideLegend
        >
            <EøsPeriodeSkjemaContainer lesevisning={lesevisning} status={status}>
                <StyledFamilieReactSelect
                    {...skjema.felter.barnIdenter.hentNavInputProps(skjema.visFeilmeldinger)}
                    erLesevisning={lesevisning}
                    label={'Barn'}
                    isMulti
                    options={tilgjengeligeBarn}
                    value={skjema.felter.barnIdenter.verdi}
                    onChange={options =>
                        skjema.felter.barnIdenter.validerOgSettFelt(options as OptionType[])
                    }
                />

                <EøsPeriodeSkjema
                    periode={skjema.felter.periode}
                    periodeFeilmeldingId={kompetansePeriodeFeilmeldingId(skjema)}
                    initielFom={skjema.felter.initielFom}
                    visFeilmeldinger={skjema.visFeilmeldinger}
                    lesevisning={lesevisning}
                />
                <StyledFamilieSelect
                    {...skjema.felter.søkersAktivitet.hentNavInputProps(skjema.visFeilmeldinger)}
                    erLesevisning={lesevisning}
                    label={'Søkers aktivitet'}
                    value={skjema.felter.søkersAktivitet.verdi || ''}
                    lesevisningVerdi={
                        skjema.felter.søkersAktivitet.verdi
                            ? kompetanseAktiviteter[skjema.felter.søkersAktivitet.verdi]
                            : 'Ikke utfylt'
                    }
                    onChange={event =>
                        skjema.felter.søkersAktivitet.validerOgSettFelt(
                            event.target.value as KompetanseAktivitet
                        )
                    }
                >
                    <option value={''}>Velg</option>
                    {Object.values(
                        annenForelderOmfattetAvNorskLovgivning
                            ? AnnenForelderAktivitet
                            : SøkersAktivitet
                    ).map((aktivitet: KompetanseAktivitet) => {
                        return (
                            <option key={aktivitet} value={aktivitet}>
                                {kompetanseAktiviteter[aktivitet]}
                            </option>
                        );
                    })}
                </StyledFamilieSelect>
                <StyledFamilieSelect
                    className="unset-margin-bottom"
                    {...skjema.felter.annenForeldersAktivitet.hentNavInputProps(
                        skjema.visFeilmeldinger
                    )}
                    erLesevisning={lesevisning}
                    label={'Annen forelders aktivitet'}
                    value={skjema.felter.annenForeldersAktivitet.verdi || ''}
                    lesevisningVerdi={
                        skjema.felter.annenForeldersAktivitet?.verdi
                            ? kompetanseAktiviteter[skjema.felter.annenForeldersAktivitet?.verdi]
                            : 'Ikke utfylt'
                    }
                    onChange={event => {
                        skjema.felter.annenForeldersAktivitet.validerOgSettFelt(
                            event.target.value as KompetanseAktivitet
                        );
                    }}
                >
                    <option value={''}>Velg</option>
                    {Object.values(
                        annenForelderOmfattetAvNorskLovgivning
                            ? SøkersAktivitet
                            : AnnenForelderAktivitet
                    ).map((aktivitet: KompetanseAktivitet) => {
                        return (
                            <option key={aktivitet} value={aktivitet}>
                                {kompetanseAktiviteter[aktivitet]}
                            </option>
                        );
                    })}
                </StyledFamilieSelect>
                {skjema.felter.annenForeldersAktivitet.verdi ===
                    AnnenForelderAktivitet.IKKE_AKTUELT && (
                    <StyledAlert variant="info" size="small" inline>
                        Søker har enten aleneomsorg for egne barn eller forsørger andre barn
                    </StyledAlert>
                )}
                <StyledFamilieLandvelger
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
                        skjema.felter.søkersAktivitetsland.valideringsstatus ===
                            Valideringsstatus.FEIL
                            ? skjema.felter.søkersAktivitetsland.feilmelding?.toString()
                            : ''
                    }
                />
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
                        skjema.felter.annenForeldersAktivitetsland.valideringsstatus ===
                            Valideringsstatus.FEIL
                            ? skjema.felter.annenForeldersAktivitetsland.feilmelding?.toString()
                            : ''
                    }
                />
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
                        skjema.felter.barnetsBostedsland.valideringsstatus ===
                            Valideringsstatus.FEIL
                            ? skjema.felter.barnetsBostedsland?.feilmelding?.toString()
                            : ''
                    }
                />
                <FamilieSelect
                    {...skjema.felter.resultat.hentNavInputProps(skjema.visFeilmeldinger)}
                    erLesevisning={lesevisning}
                    label={'Kompetanse'}
                    value={skjema.felter.resultat.verdi || ''}
                    lesevisningVerdi={
                        skjema.felter.resultat.verdi
                            ? kompetanseResultater[skjema.felter.resultat.verdi]
                            : 'Ikke utfylt'
                    }
                    onChange={event => {
                        skjema.felter.resultat.validerOgSettFelt(
                            event.target.value as KompetanseResultat
                        );
                    }}
                >
                    <option value={''}>Velg</option>
                    <option
                        key={KompetanseResultat.NORGE_ER_PRIMÆRLAND}
                        value={KompetanseResultat.NORGE_ER_PRIMÆRLAND}
                    >
                        {kompetanseResultater[KompetanseResultat.NORGE_ER_PRIMÆRLAND]}
                    </option>
                    <option
                        key={KompetanseResultat.NORGE_ER_SEKUNDÆRLAND}
                        value={KompetanseResultat.NORGE_ER_SEKUNDÆRLAND}
                    >
                        {kompetanseResultater[KompetanseResultat.NORGE_ER_SEKUNDÆRLAND]}
                    </option>
                    <option
                        key={KompetanseResultat.TO_PRIMÆRLAND}
                        value={KompetanseResultat.TO_PRIMÆRLAND}
                    >
                        {kompetanseResultater[KompetanseResultat.TO_PRIMÆRLAND]}
                    </option>
                </FamilieSelect>
                {toPrimærland && (
                    <Alert
                        variant={'warning'}
                        inline
                        size={'small'}
                        children={
                            'Norge og annen forelders aktivitetsland er primærland. Saksbehandler må manuelt vurdere om Norge skal utbetale barnetrygden.'
                        }
                    />
                )}
                <Knapperad>
                    <div>
                        <FamilieKnapp
                            erLesevisning={lesevisning}
                            onClick={() => sendInnSkjema()}
                            size="small"
                            variant={valideringErOk() ? 'primary' : 'secondary'}
                            loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                            disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                        >
                            Ferdig
                        </FamilieKnapp>
                        <FamilieKnapp
                            style={{ marginLeft: '1rem' }}
                            erLesevisning={lesevisning}
                            onClick={() => toggleForm(false)}
                            size="small"
                            variant="tertiary"
                        >
                            Avbryt
                        </FamilieKnapp>
                    </div>

                    {skjema.felter.status.verdi !== EøsPeriodeStatus.IKKE_UTFYLT &&
                        !lesevisning && (
                            <Button
                                variant={'tertiary'}
                                onClick={() => slettKompetanse()}
                                id={`slett_kompetanse_${skjema.felter.barnIdenter.verdi.map(
                                    barn => `${barn}-`
                                )}_${skjema.felter.initielFom.verdi}`}
                                loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                                disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                                size={'small'}
                                icon={<Delete />}
                            >
                                {'Fjern'}
                            </Button>
                        )}
                </Knapperad>
            </EøsPeriodeSkjemaContainer>
        </Fieldset>
    );
};

export default KompetanseTabellRadEndre;
