import React from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { Delete } from '@navikt/ds-icons';
import { Alert } from '@navikt/ds-react';
import {
    FamilieKnapp,
    FamilieReactSelect,
    FamilieSelect,
    type OptionType,
} from '@navikt/familie-form-elements';
import { type ISkjema, Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';
import type { Country } from '@navikt/land-verktoy';

import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../typer/behandling';
import {
    AnnenForelderAktivitet,
    annenForelderAktiviteter,
    EøsPeriodeStatus,
    type IKompetanse,
    KompetanseResultat,
    kompetanseResultater,
    SøkersAktivitet,
    søkersAktiviteter,
} from '../../../../typer/eøsPerioder';
import { ToggleNavn } from '../../../../typer/toggles';
import IkonKnapp, { IkonPosisjon } from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
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
}

const StyledAlert = styled(Alert)`
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
}) => {
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning(true);
    const { toggles } = useApp();

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
        <SkjemaGruppe feil={skjema.visFeilmeldinger && visSubmitFeilmelding()}>
            <EøsPeriodeSkjemaContainer lesevisning={lesevisning} status={status}>
                <div className={'skjemaelement'}>
                    <FamilieReactSelect
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
                </div>
                <EøsPeriodeSkjema
                    periode={skjema.felter.periode}
                    periodeFeilmeldingId={kompetansePeriodeFeilmeldingId(skjema)}
                    initielFom={skjema.felter.initielFom}
                    visFeilmeldinger={skjema.visFeilmeldinger}
                    lesevisning={lesevisning}
                />
                <FamilieSelect
                    {...skjema.felter.søkersAktivitet.hentNavInputProps(skjema.visFeilmeldinger)}
                    erLesevisning={lesevisning}
                    label={'Søkers aktivitet'}
                    value={skjema.felter.søkersAktivitet.verdi || undefined}
                    lesevisningVerdi={
                        skjema.felter.søkersAktivitet.verdi
                            ? søkersAktiviteter[skjema.felter.søkersAktivitet.verdi]
                            : 'Ikke utfylt'
                    }
                    onChange={event =>
                        skjema.felter.søkersAktivitet.validerOgSettFelt(
                            event.target.value as SøkersAktivitet
                        )
                    }
                >
                    <option value={''}>Velg</option>
                    {Object.values(SøkersAktivitet).map(aktivitet => {
                        return (
                            <option key={aktivitet} value={aktivitet}>
                                {søkersAktiviteter[aktivitet]}
                            </option>
                        );
                    })}
                </FamilieSelect>
                <FamilieSelect
                    className="unset-margin-bottom"
                    {...skjema.felter.annenForeldersAktivitet.hentNavInputProps(
                        skjema.visFeilmeldinger
                    )}
                    erLesevisning={lesevisning}
                    label={'Annen forelders aktivitet'}
                    value={skjema.felter.annenForeldersAktivitet.verdi || undefined}
                    lesevisningVerdi={
                        skjema.felter.annenForeldersAktivitet?.verdi
                            ? annenForelderAktiviteter[skjema.felter.annenForeldersAktivitet?.verdi]
                            : 'Ikke utfylt'
                    }
                    onChange={event => {
                        skjema.felter.annenForeldersAktivitet.validerOgSettFelt(
                            event.target.value as AnnenForelderAktivitet
                        );
                    }}
                >
                    <option value={''}>Velg</option>
                    {Object.values(AnnenForelderAktivitet).map(aktivitet => {
                        return (
                            <option key={aktivitet} value={aktivitet}>
                                {annenForelderAktiviteter[aktivitet]}
                            </option>
                        );
                    })}
                </FamilieSelect>
                {skjema.felter.annenForeldersAktivitet.verdi ===
                    AnnenForelderAktivitet.IKKE_AKTUELT && (
                    <StyledAlert variant="info" size="small" inline>
                        Søker har enten aleneomsorg for egne barn eller forsørger andre barn
                    </StyledAlert>
                )}
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
                    value={skjema.felter.resultat.verdi || undefined}
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
                    {toggles[ToggleNavn.kanBehandleEøsSekunderland] && (
                        <option
                            key={KompetanseResultat.NORGE_ER_SEKUNDÆRLAND}
                            value={KompetanseResultat.NORGE_ER_SEKUNDÆRLAND}
                        >
                            {kompetanseResultater[KompetanseResultat.NORGE_ER_SEKUNDÆRLAND]}
                        </option>
                    )}
                    {toggles[ToggleNavn.kanBehandleEøsToPrimerland] && (
                        <option
                            key={KompetanseResultat.TO_PRIMÆRLAND}
                            value={KompetanseResultat.TO_PRIMÆRLAND}
                        >
                            {kompetanseResultater[KompetanseResultat.TO_PRIMÆRLAND]}
                        </option>
                    )}
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
                            mini={true}
                            type={valideringErOk() ? 'hoved' : 'standard'}
                            spinner={skjema.submitRessurs.status === RessursStatus.HENTER}
                            disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                        >
                            Ferdig
                        </FamilieKnapp>
                        <FamilieKnapp
                            style={{ marginLeft: '1rem' }}
                            erLesevisning={lesevisning}
                            onClick={() => toggleForm(false)}
                            mini={true}
                            type={'flat'}
                        >
                            Avbryt
                        </FamilieKnapp>
                    </div>

                    {skjema.felter.status.verdi !== EøsPeriodeStatus.IKKE_UTFYLT && (
                        <IkonKnapp
                            erLesevisning={lesevisning}
                            onClick={() => slettKompetanse()}
                            id={`slett_kompetanse_${skjema.felter.barnIdenter.verdi.map(
                                barn => `${barn}-`
                            )}_${skjema.felter.initielFom.verdi}`}
                            spinner={skjema.submitRessurs.status === RessursStatus.HENTER}
                            disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                            mini={true}
                            label={'Fjern'}
                            ikonPosisjon={IkonPosisjon.VENSTRE}
                            ikon={<Delete />}
                        />
                    )}
                </Knapperad>
            </EøsPeriodeSkjemaContainer>
        </SkjemaGruppe>
    );
};

export default KompetanseTabellRadEndre;
