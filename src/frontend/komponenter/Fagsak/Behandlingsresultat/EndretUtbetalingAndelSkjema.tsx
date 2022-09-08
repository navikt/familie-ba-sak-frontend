import * as React from 'react';
import { useEffect } from 'react';

import styled from 'styled-components';

import variables from 'nav-frontend-core';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { Delete } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import type { ISODateString } from '@navikt/familie-form-elements';
import { FamilieRadioGruppe, FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useEndretUtbetalingAndel } from '../../../context/EndretUtbetalingAndelContext';
import type { IBehandling } from '../../../typer/behandling';
import { ToggleNavn } from '../../../typer/toggles';
import type { IRestEndretUtbetalingAndel } from '../../../typer/utbetalingAndel';
import {
    IEndretUtbetalingAndelFullSats,
    IEndretUtbetalingAndelÅrsak,
    optionTilsats,
    satser,
    satsTilOption,
    årsaker,
    årsakTekst,
} from '../../../typer/utbetalingAndel';
import { datoformatNorsk, lagPersonLabel } from '../../../utils/formatter';
import type { YearMonth } from '../../../utils/kalender';
import { hentFrontendFeilmelding } from '../../../utils/ressursUtils';
import IkonKnapp, { IkonPosisjon } from '../../Felleskomponenter/IkonKnapp/IkonKnapp';
import Knapperekke from '../../Felleskomponenter/Knapperekke';
import MånedÅrVelger from '../../Felleskomponenter/MånedÅrInput/MånedÅrVelger';
import {
    StyledFamilieDatovelger,
    StyledFeilmelding,
} from '../Dokumentutsending/DeltBosted/DeltBostedAvtaler';

const KnapperekkeVenstre = styled.div`
    display: flex;
    flex-direction: row;
`;

const StyledSkjemaGruppe = styled(SkjemaGruppe)`
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    padding-left: 2rem;
    margin-right: 2rem;
    border-left: 0.0625rem solid ${variables.navBla};
    max-width: 30rem;
`;

const StyledPersonvelger = styled(FamilieSelect)`
    max-width: 20rem;
    z-index: 1000;
`;

const StyledSatsvelger = styled(FamilieSelect)`
    max-width: 10rem;
`;

const Feltmargin = styled.div`
    margin-bottom: 1rem;
`;

const StyledFerdigKnapp = styled(Button)`
    margin-right: 0.5rem;
`;

const StyledFamilieTextarea = styled(FamilieTextarea)`
    min-height: 8rem;
`;

interface IEndretUtbetalingAndelSkjemaProps {
    åpenBehandling: IBehandling;
    avbrytEndringAvUtbetalingsperiode: () => void;
}

const EndretUtbetalingAndelSkjema: React.FunctionComponent<IEndretUtbetalingAndelSkjemaProps> = ({
    åpenBehandling,
    avbrytEndringAvUtbetalingsperiode,
}) => {
    const { request } = useHttp();
    const { erLesevisning, settÅpenBehandling } = useBehandling();
    const { toggles } = useApp();

    const {
        endretUtbetalingAndel,
        skjema,
        kanSendeSkjema,
        onSubmit,
        nullstillSkjema,
        hentSkjemaData,
    } = useEndretUtbetalingAndel();

    useEffect(() => {
        nullstillSkjema();
        skjema.felter.avtaletidspunktDeltBosted.validerOgSettFelt(
            endretUtbetalingAndel.avtaletidspunktDeltBosted
        );
    }, [endretUtbetalingAndel]);

    const oppdaterEndretUtbetaling = (avbrytEndringAvUtbetalingsperiode: () => void) => {
        if (kanSendeSkjema()) {
            onSubmit<IRestEndretUtbetalingAndel>(
                {
                    method: 'PUT',
                    url: `/familie-ba-sak/api/endretutbetalingandel/${åpenBehandling.behandlingId}/${endretUtbetalingAndel.id}`,
                    påvirkerSystemLaster: true,
                    data: hentSkjemaData(),
                },
                (behandling: Ressurs<IBehandling>) => {
                    if (behandling.status === RessursStatus.SUKSESS) {
                        avbrytEndringAvUtbetalingsperiode();
                        settÅpenBehandling(behandling);
                    }
                }
            );
        }
    };

    const slettEndretUtbetaling = () => {
        request<undefined, IBehandling>({
            method: 'DELETE',
            url: `/familie-ba-sak/api/endretutbetalingandel/${åpenBehandling.behandlingId}/${endretUtbetalingAndel.id}`,
            påvirkerSystemLaster: true,
        }).then((behandling: Ressurs<IBehandling>) => settÅpenBehandling(behandling));
    };

    const finnÅrTilbakeTilStønadFra = (): number => {
        return (
            new Date().getFullYear() -
            new Date(
                Math.min(
                    ...åpenBehandling.personerMedAndelerTilkjentYtelse.map(person =>
                        new Date(person.stønadFom).getTime()
                    )
                )
            ).getFullYear()
        );
    };

    const finnÅrFremTilStønadTom = (): number => {
        return (
            new Date(
                Math.max(
                    ...åpenBehandling.personerMedAndelerTilkjentYtelse.map(person =>
                        new Date(person.stønadTom).getTime()
                    )
                )
            ).getFullYear() - new Date().getFullYear()
        );
    };

    const endringsårsakSkalVises = (årsak: IEndretUtbetalingAndelÅrsak): boolean => {
        if (
            årsak === IEndretUtbetalingAndelÅrsak.ALLEREDE_UTBETALT ||
            årsak === IEndretUtbetalingAndelÅrsak.ENDRE_MOTTAKER
        ) {
            return toggles[ToggleNavn.endreMottakerEndringsårsaker];
        } else {
            return true;
        }
    };

    useEffect(() => {
        if (hentFrontendFeilmelding(skjema.submitRessurs)?.includes('til og med dato')) {
            skjema.felter.tom.nullstill();
        }
    }, [skjema.submitRessurs]);

    return (
        <>
            <StyledSkjemaGruppe feil={hentFrontendFeilmelding(skjema.submitRessurs)}>
                <Feltmargin>
                    <StyledPersonvelger
                        {...skjema.felter.person.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                        label={<Element>Velg hvem det gjelder</Element>}
                        value={skjema.felter.person.verdi}
                        placeholder={'Velg person'}
                        onChange={(event): void => {
                            skjema.felter.person.validerOgSettFelt(event.target.value);
                        }}
                        erLesevisning={erLesevisning()}
                    >
                        <option value={undefined}>Velg person</option>
                        {åpenBehandling.personer
                            .filter(person =>
                                åpenBehandling.personerMedAndelerTilkjentYtelse
                                    .map(personMedAndeler => personMedAndeler.personIdent)
                                    .includes(person.personIdent)
                            )
                            .map((person, index) => (
                                <option
                                    value={person.personIdent}
                                    key={`${index}_${person.fødselsdato}`}
                                >
                                    {lagPersonLabel(person.personIdent, åpenBehandling.personer)}
                                </option>
                            ))}
                    </StyledPersonvelger>
                </Feltmargin>

                <Feltmargin>
                    <Element>Fastsett periode</Element>
                    <Feltmargin>
                        <MånedÅrVelger
                            {...skjema.felter.fom.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                            label={<Normaltekst>F.o.m</Normaltekst>}
                            value={skjema.felter.fom.verdi}
                            antallÅrFrem={finnÅrFremTilStønadTom()}
                            antallÅrTilbake={finnÅrTilbakeTilStønadFra()}
                            onEndret={(dato: YearMonth | undefined) => {
                                if (dato === undefined) {
                                    skjema.felter.fom.nullstill();
                                } else {
                                    skjema.felter.fom.validerOgSettFelt(dato);
                                }
                            }}
                            lesevisning={erLesevisning()}
                        />
                    </Feltmargin>
                    <MånedÅrVelger
                        {...skjema.felter.tom.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                        label={<Normaltekst>T.o.m (valgfri)</Normaltekst>}
                        value={skjema.felter.tom.verdi}
                        antallÅrFrem={finnÅrFremTilStønadTom()}
                        antallÅrTilbake={finnÅrTilbakeTilStønadFra()}
                        onEndret={(dato: YearMonth | undefined) => {
                            if (dato === undefined) {
                                skjema.felter.tom.nullstill();
                            } else {
                                skjema.felter.tom.validerOgSettFelt(dato);
                            }
                        }}
                        lesevisning={erLesevisning()}
                    />
                </Feltmargin>

                <Feltmargin>
                    <FamilieSelect
                        {...skjema.felter.årsak.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                        value={skjema.felter.årsak.verdi}
                        label={<Element>Årsak</Element>}
                        placeholder={'Velg årsak'}
                        onChange={(event): void => {
                            skjema.felter.årsak.validerOgSettFelt(
                                event.target.value as IEndretUtbetalingAndelÅrsak
                            );
                        }}
                        erLesevisning={erLesevisning()}
                        lesevisningVerdi={
                            skjema.felter.årsak.verdi ? årsakTekst[skjema.felter.årsak.verdi] : ''
                        }
                    >
                        <option value={undefined}>Velg årsak</option>
                        {årsaker.filter(endringsårsakSkalVises).map(årsak => (
                            <option value={årsak.valueOf()} key={årsak.valueOf()}>
                                {årsakTekst[årsak]}
                            </option>
                        ))}
                    </FamilieSelect>
                </Feltmargin>

                <Feltmargin>
                    <FamilieRadioGruppe
                        legend={<Element>Utbetaling</Element>}
                        erLesevisning={erLesevisning()}
                        verdi={skjema.felter.periodeSkalUtbetalesTilSøker.verdi ? 'Ja' : 'Nei'}
                    >
                        <Radio
                            label={'Perioden skal utbetales'}
                            name={'utbetaling'}
                            checked={skjema.felter.periodeSkalUtbetalesTilSøker.verdi}
                            onChange={() =>
                                skjema.felter.periodeSkalUtbetalesTilSøker.validerOgSettFelt(true)
                            }
                            id={'ja-perioden-utbetales-til-søker'}
                        />
                        <Radio
                            label={'Perioden skal ikke utbetales'}
                            name={'utbetaling'}
                            checked={!skjema.felter.periodeSkalUtbetalesTilSøker.verdi}
                            onChange={() =>
                                skjema.felter.periodeSkalUtbetalesTilSøker.validerOgSettFelt(false)
                            }
                            id={'nei-perioden-skal-ikke-utbetales-til-søker'}
                        />
                    </FamilieRadioGruppe>
                </Feltmargin>

                <Feltmargin>
                    <StyledFamilieDatovelger
                        {...skjema.felter.søknadstidspunkt.hentNavBaseSkjemaProps(
                            skjema.visFeilmeldinger
                        )}
                        feil={
                            !!skjema.felter.søknadstidspunkt.feilmelding && skjema.visFeilmeldinger
                        }
                        valgtDato={
                            skjema.felter.søknadstidspunkt.verdi !== null
                                ? skjema.felter.søknadstidspunkt.verdi
                                : undefined
                        }
                        label={<Element>Søknadstidspunkt</Element>}
                        placeholder={datoformatNorsk.DATO}
                        onChange={(dato?: ISODateString) =>
                            skjema.felter.søknadstidspunkt.validerOgSettFelt(dato)
                        }
                        erLesesvisning={erLesevisning()}
                    />
                    {skjema.felter.søknadstidspunkt.feilmelding && skjema.visFeilmeldinger && (
                        <StyledFeilmelding>
                            {skjema.felter.søknadstidspunkt.feilmelding}
                        </StyledFeilmelding>
                    )}
                </Feltmargin>

                {skjema.felter.avtaletidspunktDeltBosted.erSynlig && (
                    <Feltmargin>
                        <StyledFamilieDatovelger
                            {...skjema.felter.avtaletidspunktDeltBosted.hentNavBaseSkjemaProps(
                                skjema.visFeilmeldinger
                            )}
                            feil={
                                !!skjema.felter.avtaletidspunktDeltBosted.feilmelding &&
                                skjema.visFeilmeldinger
                            }
                            valgtDato={
                                skjema.felter.avtaletidspunktDeltBosted.verdi !== null
                                    ? skjema.felter.avtaletidspunktDeltBosted.verdi
                                    : undefined
                            }
                            label={<Element>Avtale om delt bosted</Element>}
                            placeholder={datoformatNorsk.DATO}
                            onChange={(dato?: ISODateString) =>
                                skjema.felter.avtaletidspunktDeltBosted.validerOgSettFelt(dato)
                            }
                            erLesesvisning={erLesevisning()}
                        />
                        {skjema.felter.avtaletidspunktDeltBosted.feilmelding &&
                            skjema.visFeilmeldinger && (
                                <StyledFeilmelding>
                                    {skjema.felter.avtaletidspunktDeltBosted.feilmelding}
                                </StyledFeilmelding>
                            )}
                    </Feltmargin>
                )}
                {skjema.felter.fullSats.erSynlig && (
                    <Feltmargin>
                        <StyledSatsvelger
                            {...skjema.felter.fullSats.hentNavBaseSkjemaProps(
                                skjema.visFeilmeldinger
                            )}
                            label={<Element>Sats</Element>}
                            value={
                                skjema.felter.fullSats.verdi !== undefined &&
                                skjema.felter.fullSats.verdi !== null
                                    ? skjema.felter.fullSats.verdi
                                        ? IEndretUtbetalingAndelFullSats.FULL_SATS.valueOf()
                                        : undefined
                                    : undefined
                            }
                            placeholder={'Velg sats'}
                            onChange={(event): void => {
                                skjema.felter.fullSats.validerOgSettFelt(
                                    optionTilsats(event.target.value)
                                );
                            }}
                        >
                            <option value={undefined}>Velg sats</option>
                            {satser.map(sats => (
                                <option value={sats.valueOf()} key={sats.valueOf()}>
                                    {
                                        satsTilOption(
                                            sats === IEndretUtbetalingAndelFullSats.FULL_SATS
                                        ).label
                                    }
                                </option>
                            ))}
                        </StyledSatsvelger>
                    </Feltmargin>
                )}

                <Feltmargin>
                    <StyledFamilieTextarea
                        {...skjema.felter.begrunnelse.hentNavInputProps(skjema.visFeilmeldinger)}
                        erLesevisning={erLesevisning()}
                        label={'Begrunnelse'}
                        resize
                        value={
                            skjema.felter.begrunnelse.verdi !== null &&
                            skjema.felter.begrunnelse.verdi !== undefined
                                ? skjema.felter.begrunnelse.verdi
                                : ''
                        }
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                            skjema.felter.begrunnelse.validerOgSettFelt(event.target.value);
                        }}
                    />
                </Feltmargin>
                {!erLesevisning() && (
                    <Knapperekke>
                        <KnapperekkeVenstre>
                            <StyledFerdigKnapp
                                size="small"
                                variant="secondary"
                                onClick={() =>
                                    oppdaterEndretUtbetaling(avbrytEndringAvUtbetalingsperiode)
                                }
                            >
                                Bekreft
                            </StyledFerdigKnapp>
                            <Button
                                variant="tertiary"
                                size="small"
                                onClick={avbrytEndringAvUtbetalingsperiode}
                            >
                                Avbryt
                            </Button>
                        </KnapperekkeVenstre>

                        <IkonKnapp
                            id={`sletteknapp-endret-utbetaling-andel-${endretUtbetalingAndel.id}`}
                            erLesevisning={erLesevisning()}
                            label="Fjern Periode"
                            mini
                            ikonPosisjon={IkonPosisjon.VENSTRE}
                            onClick={slettEndretUtbetaling}
                            ikon={<Delete />}
                        />
                    </Knapperekke>
                )}
            </StyledSkjemaGruppe>
        </>
    );
};

export default EndretUtbetalingAndelSkjema;
