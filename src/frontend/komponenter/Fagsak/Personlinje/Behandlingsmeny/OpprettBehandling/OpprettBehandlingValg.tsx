import React from 'react';

import styled from 'styled-components';

import { BodyShort } from '@navikt/ds-react';
import type { FormatOptionLabelMeta, ISelectOption } from '@navikt/familie-form-elements';
import { FamilieReactSelect, FamilieSelect } from '@navikt/familie-form-elements';
import type { ISkjema } from '@navikt/familie-skjema';

import { useApp } from '../../../../../context/AppContext';
import type { ManuellJournalføringSkjemaFelter } from '../../../../../context/ManuellJournalførContext';
import {
    BehandlingResultat,
    BehandlingStatus,
    Behandlingstype,
    behandlingÅrsak,
    BehandlingÅrsak,
    erBehandlingHenlagt,
    type IBehandling,
} from '../../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../../typer/fagsak';
import { FagsakStatus } from '../../../../../typer/fagsak';
import { Klagebehandlingstype } from '../../../../../typer/klage';
import type { IPersonInfo } from '../../../../../typer/person';
import { ForelderBarnRelasjonRolle } from '../../../../../typer/person';
import { Tilbakekrevingsbehandlingstype } from '../../../../../typer/tilbakekrevingsbehandling';
import { ToggleNavn } from '../../../../../typer/toggles';
import {
    hentAktivBehandlingPåMinimalFagsak,
    hentSisteIkkeHenlagteBehandling,
} from '../../../../../utils/fagsak';
import { hentAlder } from '../../../../../utils/formatter';
import { BehandlingstemaSelect } from '../../../../Felleskomponenter/BehandlingstemaSelect';
import type { VisningBehandling } from '../../../Saksoversikt/visningBehandling';
import type { IOpprettBehandlingSkjemaFelter } from './useOpprettBehandling';

const StyledFamilieSelect = styled(FamilieSelect)`
    label {
        margin-top: 2rem;
    }
    margin-bottom: 1rem;
`;

const StyledBehandlingstemaSelect = styled(BehandlingstemaSelect)`
    label {
        margin-top: 2rem;
    }
`;

const StyledFamilieReactSelect = styled(FamilieReactSelect)`
    label {
        margin-top: 2rem;
    }
    margin-bottom: -1rem;
`;

const erOpprettBehandlingSkjema = (
    skjema:
        | ISkjema<IOpprettBehandlingSkjemaFelter, IBehandling>
        | ISkjema<ManuellJournalføringSkjemaFelter, string>
): skjema is ISkjema<IOpprettBehandlingSkjemaFelter, IBehandling> =>
    Object.hasOwn(skjema, 'valgteBarn');

const forrigeBehandlingVarTekniskEndringMedOpphør = (minimalFagsak?: IMinimalFagsak) => {
    const behandling = hentSisteIkkeHenlagteBehandling(minimalFagsak);
    return (
        behandling?.årsak === BehandlingÅrsak.TEKNISK_ENDRING &&
        (behandling.resultat === BehandlingResultat.OPPHØRT ||
            behandling.resultat === BehandlingResultat.ENDRET_OG_OPPHØRT)
    );
};

const hentTilgjengeligeBehandlingsårsaker = (
    erMigreringFraInfotrygd: boolean,
    kanOpprettMigreringsbehandlingMedHelmanuellMigrering: boolean,
    kanOppretteMigreringsbehandlingMedEndreMigreringsdato: boolean,
    kanManueltKorrigereMedVedtaksbrev: boolean
): BehandlingÅrsak[] =>
    erMigreringFraInfotrygd
        ? Object.values(BehandlingÅrsak).filter(
              årsak =>
                  (kanOpprettMigreringsbehandlingMedHelmanuellMigrering &&
                      årsak === BehandlingÅrsak.HELMANUELL_MIGRERING) ||
                  (kanOppretteMigreringsbehandlingMedEndreMigreringsdato &&
                      årsak === BehandlingÅrsak.ENDRE_MIGRERINGSDATO)
          )
        : Object.values(BehandlingÅrsak).filter(
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
                      kanManueltKorrigereMedVedtaksbrev) &&
                  årsak !== BehandlingÅrsak.ENDRE_MIGRERINGSDATO &&
                  årsak !== BehandlingÅrsak.HELMANUELL_MIGRERING
          );

interface IProps {
    skjema:
        | ISkjema<IOpprettBehandlingSkjemaFelter, IBehandling>
        | ISkjema<ManuellJournalføringSkjemaFelter, string>;
    minimalFagsak?: IMinimalFagsak;
    erLesevisning?: boolean;
    manuellJournalfør?: boolean;
    bruker?: IPersonInfo | undefined;
}

interface BehandlingstypeSelect extends HTMLSelectElement {
    value: Behandlingstype | '';
}

interface BehandlingÅrsakSelect extends HTMLSelectElement {
    value: BehandlingÅrsak | '';
}

const OpprettBehandlingValg: React.FC<IProps> = ({
    skjema,
    minimalFagsak,
    erLesevisning = false,
    manuellJournalfør = false,
    bruker = undefined,
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
        !manuellJournalfør &&
        skjema.felter.behandlingstype.verdi === Behandlingstype.MIGRERING_FRA_INFOTRYGD;
    const erHelmanuellMigrering =
        erMigreringFraInfotrygd &&
        skjema.felter.behandlingsårsak.verdi === BehandlingÅrsak.HELMANUELL_MIGRERING;
    const kanOpprettMigreringsbehandlingMedHelmanuellMigrering =
        kanOppretteMigreringFraInfotrygd &&
        (forrigeBehandlingVarTekniskEndringMedOpphør(minimalFagsak) ||
            minimalFagsak?.status !== FagsakStatus.LØPENDE);

    const kanOppretteMigreringsbehandlingMedEndreMigreringsdato =
        kanOppretteMigreringFraInfotrygd && kanOppretteRevurdering;

    const barn = bruker?.forelderBarnRelasjon
        .filter(relasjon => relasjon.relasjonRolle === ForelderBarnRelasjonRolle.BARN)
        .map<ISelectOption>(relasjon => ({
            value: relasjon.personIdent,
            label: `${relasjon.navn} (${hentAlder(relasjon.fødselsdato)} år)`,
        }));

    const { behandlingsårsak, behandlingstype, behandlingstema } = skjema.felter;

    return (
        <>
            <FamilieSelect
                {...behandlingstype.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
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
                {kanOppretteFørstegangsbehandling && (
                    <option
                        aria-selected={
                            behandlingstype.verdi === Behandlingstype.FØRSTEGANGSBEHANDLING
                        }
                        value={Behandlingstype.FØRSTEGANGSBEHANDLING}
                    >
                        Førstegangsbehandling
                    </option>
                )}
                {kanOppretteRevurdering && (
                    <option
                        aria-selected={behandlingstype.verdi === Behandlingstype.REVURDERING}
                        value={Behandlingstype.REVURDERING}
                    >
                        Revurdering
                    </option>
                )}

                {kanOppretteRevurdering && kanOppretteTekniskEndring && (
                    <option
                        aria-selected={behandlingstype.verdi === Behandlingstype.TEKNISK_ENDRING}
                        value={Behandlingstype.TEKNISK_ENDRING}
                    >
                        Teknisk endring
                    </option>
                )}

                {kanOppretteTilbakekreving && (
                    <option
                        aria-selected={
                            behandlingstype.verdi === Tilbakekrevingsbehandlingstype.TILBAKEKREVING
                        }
                        value={Tilbakekrevingsbehandlingstype.TILBAKEKREVING}
                    >
                        Tilbakekreving
                    </option>
                )}

                {toggles[ToggleNavn.kanBehandleKlage] && (
                    <option
                        aria-selected={behandlingstype.verdi === Klagebehandlingstype.KLAGE}
                        value={Klagebehandlingstype.KLAGE}
                    >
                        Klage
                    </option>
                )}

                {kanOppretteMigreringFraInfotrygd && (
                    <option
                        aria-selected={
                            behandlingstype.verdi === Behandlingstype.MIGRERING_FRA_INFOTRYGD
                        }
                        value={Behandlingstype.MIGRERING_FRA_INFOTRYGD}
                    >
                        Migrering fra infotrygd
                    </option>
                )}
            </FamilieSelect>

            {behandlingsårsak.erSynlig && (
                <StyledFamilieSelect
                    {...behandlingsårsak.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
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
                    {hentTilgjengeligeBehandlingsårsaker(
                        erMigreringFraInfotrygd,
                        kanOpprettMigreringsbehandlingMedHelmanuellMigrering,
                        kanOppretteMigreringsbehandlingMedEndreMigreringsdato,
                        toggles[ToggleNavn.kanManueltKorrigereMedVedtaksbrev]
                    ).map(årsak => {
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
                </StyledFamilieSelect>
            )}

            {erHelmanuellMigrering &&
                erOpprettBehandlingSkjema(skjema) &&
                skjema.felter.valgteBarn?.erSynlig && (
                    <StyledFamilieReactSelect
                        {...skjema.felter.valgteBarn.hentNavInputProps(skjema.visFeilmeldinger)}
                        label={'Legg til juridiske barn for migrering'}
                        placeholder={'Velg barn'}
                        options={barn}
                        creatable={false}
                        isMulti={true}
                        formatOptionLabel={(
                            option: ISelectOption,
                            formatOptionLabelMeta: FormatOptionLabelMeta<ISelectOption>
                        ) => {
                            if (formatOptionLabelMeta.context === 'menu') {
                                return (
                                    <BodyShort>
                                        <b>{option.label}</b> | {option.value}
                                    </BodyShort>
                                );
                            } else {
                                return <BodyShort>{option.value}</BodyShort>;
                            }
                        }}
                        onChange={valgteOptions => {
                            skjema.felter.valgteBarn.onChange(
                                valgteOptions === null ? [] : (valgteOptions as ISelectOption[])
                            );
                        }}
                    />
                )}

            {behandlingstema.erSynlig && (
                <StyledBehandlingstemaSelect
                    behandlingstema={behandlingstema}
                    fagsakType={minimalFagsak?.fagsakType}
                    erLesevisning={erLesevisning}
                    visFeilmeldinger={skjema.visFeilmeldinger}
                    name="Behandlingstema"
                    label="Velg behandlingstema"
                />
            )}
        </>
    );
};

export default OpprettBehandlingValg;
