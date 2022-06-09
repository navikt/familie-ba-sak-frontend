import React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { Normaltekst } from 'nav-frontend-typografi';

import type { FormatOptionLabelMeta, ISelectOption } from '@navikt/familie-form-elements';
import {
    FamilieDatovelger,
    FamilieReactSelect,
    FamilieSelect,
} from '@navikt/familie-form-elements';
import type { Felt } from '@navikt/familie-skjema';

import { useApp } from '../../../../../context/AppContext';
import {
    BehandlingStatus,
    Behandlingstype,
    BehandlingÅrsak,
    behandlingÅrsak,
    erBehandlingHenlagt,
} from '../../../../../typer/behandling';
import type { IBehandlingstema } from '../../../../../typer/behandlingstema';
import type { IMinimalFagsak } from '../../../../../typer/fagsak';
import { FagsakStatus } from '../../../../../typer/fagsak';
import type { IPersonInfo } from '../../../../../typer/person';
import { ForelderBarnRelasjonRolle } from '../../../../../typer/person';
import { Tilbakekrevingsbehandlingstype } from '../../../../../typer/tilbakekrevingsbehandling';
import { ToggleNavn } from '../../../../../typer/toggles';
import { hentAktivBehandlingPåMinimalFagsak } from '../../../../../utils/fagsak';
import { hentAlder } from '../../../../../utils/formatter';
import type { FamilieIsoDate } from '../../../../../utils/kalender';
import { BehandlingstemaSelect } from '../../../../Felleskomponenter/BehandlingstemaSelect';
import type { VisningBehandling } from '../../../Saksoversikt/visningBehandling';

const FixedDatoVelger = styled(FamilieDatovelger)`
    .nav-datovelger__kalenderPortal__content {
        position: fixed;
    }
    .nav-datovelger__kalenderknapp {
        z-index: 0;
    }
`;

const FeltFeilmelding = styled(Normaltekst)`
    margin-top: 0.5rem;
    font-weight: 600;
    color: ${navFarger.redError};
`;

interface IProps {
    behandlingstype: Felt<Behandlingstype | Tilbakekrevingsbehandlingstype | ''>;
    behandlingsårsak: Felt<BehandlingÅrsak | ''>;
    behandlingstema: Felt<IBehandlingstema | undefined>;
    migreringsdato?: Felt<FamilieIsoDate | undefined>;
    søknadMottattDato?: Felt<FamilieIsoDate | undefined>;
    minimalFagsak?: IMinimalFagsak;
    visFeilmeldinger: boolean;
    erLesevisning?: boolean;
    manuellJournalfør?: boolean;
    bruker?: IPersonInfo | undefined;
    valgteBarn?: Felt<ISelectOption[]> | undefined;
}

interface BehandlingstypeSelect extends HTMLSelectElement {
    value: Behandlingstype | '';
}

interface BehandlingÅrsakSelect extends HTMLSelectElement {
    value: BehandlingÅrsak | '';
}

const OpprettBehandlingValg: React.FC<IProps> = ({
    behandlingstype,
    behandlingsårsak,
    behandlingstema,
    migreringsdato = undefined,
    søknadMottattDato = undefined,
    minimalFagsak,
    visFeilmeldinger,
    erLesevisning = false,
    manuellJournalfør = false,
    bruker = undefined,
    valgteBarn = undefined,
}) => {
    const { toggles } = useApp();
    const aktivBehandling: VisningBehandling | undefined = minimalFagsak
        ? hentAktivBehandlingPåMinimalFagsak(minimalFagsak)
        : undefined;

    const kanOppretteBehandling =
        !aktivBehandling || aktivBehandling?.status === BehandlingStatus.AVSLUTTET;
    const kanOppretteFørstegangsbehandling = !minimalFagsak
        ? true
        : minimalFagsak.status !== FagsakStatus.LØPENDE && kanOppretteBehandling;
    const kanOppretteRevurdering = !minimalFagsak
        ? false
        : minimalFagsak.behandlinger.filter(behandling => !erBehandlingHenlagt(behandling.resultat))
              .length > 0 && kanOppretteBehandling;
    const kanOppretteTekniskEndring =
        kanOppretteRevurdering && toggles[ToggleNavn.kanBehandleTekniskEndring];
    const kanOppretteTilbakekreving = !manuellJournalfør;
    const kanOppretteMigreringFraInfotrygd = !manuellJournalfør && kanOppretteBehandling;
    const erMigreringFraInfotrygd =
        !manuellJournalfør && behandlingstype.verdi === Behandlingstype.MIGRERING_FRA_INFOTRYGD;
    const erHelmanuellMigrering =
        erMigreringFraInfotrygd && behandlingsårsak.verdi === BehandlingÅrsak.HELMANUELL_MIGRERING;
    const kanOppretteMigreringsbehandlingMedEndreMigreringsdato =
        kanOppretteMigreringFraInfotrygd && kanOppretteRevurdering;
    const kanOpprettMigreringsbehandlingMedHelmanuellMigrering =
        kanOppretteMigreringFraInfotrygd && !kanOppretteMigreringsbehandlingMedEndreMigreringsdato;

    const barn = bruker?.forelderBarnRelasjon
        .filter(relasjon => relasjon.relasjonRolle === ForelderBarnRelasjonRolle.BARN)
        .map<ISelectOption>(relasjon => ({
            value: relasjon.personIdent,
            label: `${relasjon.navn} (${hentAlder(relasjon.fødselsdato)} år)`,
        }));

    return (
        <>
            <FamilieSelect
                {...behandlingstype.hentNavBaseSkjemaProps(visFeilmeldinger)}
                erLesevisning={erLesevisning}
                name={'Behandling'}
                label={'Velg type behandling'}
                onChange={(event: React.ChangeEvent<BehandlingstypeSelect>): void => {
                    behandlingstype.onChange(event.target.value);
                }}
            >
                <option disabled={true} value={''}>
                    Velg
                </option>
                <option
                    aria-selected={behandlingstype.verdi === Behandlingstype.FØRSTEGANGSBEHANDLING}
                    disabled={!kanOppretteFørstegangsbehandling}
                    value={Behandlingstype.FØRSTEGANGSBEHANDLING}
                >
                    Førstegangsbehandling
                </option>
                <option
                    aria-selected={behandlingstype.verdi === Behandlingstype.REVURDERING}
                    disabled={!kanOppretteRevurdering}
                    value={Behandlingstype.REVURDERING}
                >
                    Revurdering
                </option>

                {kanOppretteTekniskEndring && (
                    <option
                        aria-selected={behandlingstype.verdi === Behandlingstype.TEKNISK_ENDRING}
                        disabled={!kanOppretteRevurdering}
                        value={Behandlingstype.TEKNISK_ENDRING}
                    >
                        Teknisk endring
                    </option>
                )}

                <option
                    aria-selected={
                        behandlingstype.verdi === Tilbakekrevingsbehandlingstype.TILBAKEKREVING
                    }
                    disabled={!kanOppretteTilbakekreving}
                    value={Tilbakekrevingsbehandlingstype.TILBAKEKREVING}
                >
                    Tilbakekreving
                </option>

                {kanOppretteMigreringFraInfotrygd && (
                    <option
                        aria-selected={
                            behandlingstype.verdi === Behandlingstype.MIGRERING_FRA_INFOTRYGD
                        }
                        disabled={!kanOppretteMigreringFraInfotrygd}
                        value={Behandlingstype.MIGRERING_FRA_INFOTRYGD}
                    >
                        Migrering fra infotrygd
                    </option>
                )}
            </FamilieSelect>

            {behandlingsårsak.erSynlig && (
                <FamilieSelect
                    {...behandlingsårsak.hentNavBaseSkjemaProps(visFeilmeldinger)}
                    erLesevisning={erLesevisning}
                    name={'Behandlingsårsak'}
                    label={'Velg årsak'}
                    onChange={(event: React.ChangeEvent<BehandlingÅrsakSelect>): void => {
                        behandlingsårsak.onChange(event.target.value);
                    }}
                >
                    <option disabled={true} value={''}>
                        Velg
                    </option>
                    {erMigreringFraInfotrygd
                        ? Object.values(BehandlingÅrsak)
                              .filter(
                                  årsak =>
                                      (kanOpprettMigreringsbehandlingMedHelmanuellMigrering &&
                                          årsak === BehandlingÅrsak.HELMANUELL_MIGRERING) ||
                                      (kanOppretteMigreringsbehandlingMedEndreMigreringsdato &&
                                          årsak === BehandlingÅrsak.ENDRE_MIGRERINGSDATO)
                              )
                              .map(årsak => {
                                  return (
                                      <option
                                          key={årsak}
                                          aria-selected={behandlingsårsak.verdi === årsak}
                                          value={årsak}
                                      >
                                          {behandlingÅrsak[årsak]}
                                      </option>
                                  );
                              })
                        : Object.values(BehandlingÅrsak)
                              .filter(
                                  årsak =>
                                      årsak !== BehandlingÅrsak.TEKNISK_OPPHØR &&
                                      årsak !== BehandlingÅrsak.TEKNISK_ENDRING &&
                                      årsak !== BehandlingÅrsak.FØDSELSHENDELSE &&
                                      årsak !== BehandlingÅrsak.SATSENDRING &&
                                      årsak !== BehandlingÅrsak.MIGRERING &&
                                      årsak !== BehandlingÅrsak.OMREGNING_6ÅR &&
                                      årsak !== BehandlingÅrsak.OMREGNING_18ÅR &&
                                      årsak !== BehandlingÅrsak.OMREGNING_SMÅBARNSTILLEGG &&
                                      (årsak !== BehandlingÅrsak.KORREKSJON_VEDTAKSBREV ||
                                          toggles[ToggleNavn.kanManueltKorrigereMedVedtaksbrev]) &&
                                      årsak !== BehandlingÅrsak.ENDRE_MIGRERINGSDATO &&
                                      årsak !== BehandlingÅrsak.HELMANUELL_MIGRERING
                              )
                              .map(årsak => {
                                  return (
                                      <option
                                          key={årsak}
                                          aria-selected={behandlingsårsak.verdi === årsak}
                                          value={årsak}
                                      >
                                          {behandlingÅrsak[årsak]}
                                      </option>
                                  );
                              })}
                </FamilieSelect>
            )}

            {behandlingstema.erSynlig && (
                <BehandlingstemaSelect
                    behandlingstema={behandlingstema}
                    erLesevisning={erLesevisning}
                    visFeilmeldinger={visFeilmeldinger}
                    name="Behandlingstema"
                    label="Velg behandlingstema"
                />
            )}

            {erHelmanuellMigrering && valgteBarn?.erSynlig && (
                <FamilieReactSelect
                    {...valgteBarn.hentNavInputProps(visFeilmeldinger)}
                    label={'Legg til juridiske barn for migrering'}
                    placeholder={'Velg barn'}
                    options={barn}
                    creatable={false}
                    isMulti={true}
                    formatOptionLabel={(
                        option: ISelectOption,
                        formatOptionLabelMeta: FormatOptionLabelMeta<ISelectOption, true>
                    ) => {
                        if (formatOptionLabelMeta.context === 'menu') {
                            return (
                                <Normaltekst>
                                    <b>{option.label}</b> | {option.value}
                                </Normaltekst>
                            );
                        } else {
                            return <Normaltekst>{option.value}</Normaltekst>;
                        }
                    }}
                    onChange={valgteOptions => {
                        valgteBarn.onChange(
                            valgteOptions === null ? [] : (valgteOptions as ISelectOption[])
                        );
                    }}
                />
            )}

            {erMigreringFraInfotrygd && migreringsdato?.erSynlig && (
                <>
                    <FixedDatoVelger
                        {...migreringsdato.hentNavInputProps(visFeilmeldinger)}
                        valgtDato={migreringsdato.verdi}
                        label={'Ny migreringsdato'}
                        placeholder={'DD.MM.ÅÅÅÅ'}
                    />
                    {migreringsdato.feilmelding && visFeilmeldinger && (
                        <FeltFeilmelding>{migreringsdato.feilmelding}</FeltFeilmelding>
                    )}
                </>
            )}
            {søknadMottattDato?.erSynlig && (
                <>
                    <FixedDatoVelger
                        {...søknadMottattDato.hentNavInputProps(visFeilmeldinger)}
                        valgtDato={søknadMottattDato.verdi}
                        label={'Mottatt dato'}
                        placeholder={'DD.MM.ÅÅÅÅ'}
                    />
                    {søknadMottattDato.feilmelding && visFeilmeldinger && (
                        <FeltFeilmelding>{søknadMottattDato.feilmelding}</FeltFeilmelding>
                    )}
                </>
            )}
        </>
    );
};

export default OpprettBehandlingValg;
