import * as React from 'react';
import { useEffect } from 'react';

import styled from 'styled-components';

import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Feilmelding, Normaltekst } from 'nav-frontend-typografi';

import { Delete } from '@navikt/ds-icons';
import {
    FamilieRadioGruppe,
    FamilieReactSelect,
    FamilieTextarea,
    ISODateString,
    OptionType,
} from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useEndretUtbetalingAndel } from '../../../context/EndretUtbetalingAndelContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import {
    IEndretUtbetalingAndelFullSats,
    IRestEndretUtbetalingAndel,
    satser,
    SatsOption,
    satsTilOption,
    årsaker,
    ÅrsakOption,
    årsakTilOption,
} from '../../../typer/utbetalingAndel';
import { datoformatNorsk } from '../../../utils/formatter';
import { YearMonth } from '../../../utils/kalender';
import Knapperekke from '../../Felleskomponenter/Knapperekke';
import MånedÅrVelger from '../../Felleskomponenter/MånedÅrInput/MånedÅrVelger';
import SkjultLegend from '../../Felleskomponenter/SkjultLegend';
import {
    StyledFamilieDatovelger,
    StyledFeilmelding,
} from '../Dokumentutsending/DeltBosted/DeltBostedAvtaler';

const Knapperad = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem 0;
`;

const StyledSkjemaGruppe = styled(SkjemaGruppe)`
    margin-top: 3rem;
    padding-left: 3.75rem;
    margin-right: 2rem;
    border-left: 0.0625rem solid black;
`;

const StyledPersonvelger = styled(FamilieReactSelect)`
    max-width: 20rem;
    z-index: 1000;
`;

const StyledSatsvelger = styled(FamilieReactSelect)`
    max-width: 10rem;
`;

const Feltmargin = styled.div`
    margin-bottom: 2.5rem;
`;

const StyledFerdigKnapp = styled(Knapp)`
    margin-right: 0.5rem;
`;

const StyledFamilieTextarea = styled(FamilieTextarea)`
    min-height: 8rem;
`;

const StyledDeleteIkon = styled(Delete)`
    margin-right: 0.5rem;
`;

interface IEndretUtbetalingAndelSkjemaProps {
    åpenBehandling: IBehandling;
    avbrytEndringAvUtbetalingsperiode: () => void;
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void;
    settFeilmelding: (feilmelding: string) => void;
    visFeilmeldinger: boolean;
    opprettelseFeilmelding?: string;
}

const EndretUtbetalingAndelSkjema: React.FunctionComponent<IEndretUtbetalingAndelSkjemaProps> = ({
    åpenBehandling,
    avbrytEndringAvUtbetalingsperiode,
    settVisFeilmeldinger,
    settFeilmelding,
    visFeilmeldinger,
    opprettelseFeilmelding = '',
}) => {
    const { request } = useHttp();
    const { erLesevisning } = useBehandling();
    const { settFagsak } = useFagsakRessurser();

    const tilOptionType = (value?: string): OptionType | undefined =>
        value ? { value: value, label: value } : undefined;

    const { endretUtbetalingAndel, skjema, kanSendeSkjema, onSubmit, nullstillSkjema } =
        useEndretUtbetalingAndel();

    useEffect(() => {
        nullstillSkjema();
        skjema.felter.avtaletidspunktDeltBosted.validerOgSettFelt(
            endretUtbetalingAndel.avtaletidspunktDeltBosted
        );
    }, [endretUtbetalingAndel]);

    const oppdaterEndretUtbetaling = (avbrytEndringAvUtbetalingsperiode: () => void) => {
        const {
            person,
            periodeSkalUtbetalesTilSøker,
            fom,
            tom,
            årsak,
            begrunnelse,
            fullSats,
            søknadstidspunkt,
            avtaletidspunktDeltBosted,
        } = skjema.felter;
        if (kanSendeSkjema()) {
            onSubmit<IRestEndretUtbetalingAndel>(
                {
                    method: 'PUT',
                    url: `/familie-ba-sak/api/endretutbetalingandel/${åpenBehandling.behandlingId}/${endretUtbetalingAndel.id}`,
                    påvirkerSystemLaster: true,
                    data: {
                        id: endretUtbetalingAndel.id,
                        personIdent: person && person.verdi,
                        prosent:
                            (periodeSkalUtbetalesTilSøker.verdi ? 100 : 0) /
                            (fullSats.verdi ? 1 : 2),
                        fom: fom && fom.verdi,
                        tom: tom && tom.verdi,
                        årsak: årsak && årsak.verdi,
                        begrunnelse: begrunnelse.verdi,
                        søknadstidspunkt: søknadstidspunkt.verdi,
                        avtaletidspunktDeltBosted: avtaletidspunktDeltBosted.verdi,
                    },
                },
                (fagsak: Ressurs<IFagsak>) => {
                    if (fagsak.status === RessursStatus.SUKSESS) {
                        settVisFeilmeldinger(false);
                        avbrytEndringAvUtbetalingsperiode();
                        settFagsak(fagsak);
                    }
                },
                (fagsak: Ressurs<IFagsak>) => {
                    if (
                        fagsak.status === RessursStatus.FUNKSJONELL_FEIL ||
                        fagsak.status === RessursStatus.FEILET
                    ) {
                        settVisFeilmeldinger(true);
                        settFeilmelding(fagsak.frontendFeilmelding);
                    }
                }
            );
        }
    };

    const slettEndretUtbetaling = () => {
        request<undefined, IFagsak>({
            method: 'DELETE',
            url: `/familie-ba-sak/api/endretutbetalingandel/${åpenBehandling.behandlingId}/${endretUtbetalingAndel.id}`,
            påvirkerSystemLaster: true,
        }).then((fagsak: Ressurs<IFagsak>) => settFagsak(fagsak));
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

    return (
        <StyledSkjemaGruppe>
            <Feltmargin>
                <StyledPersonvelger
                    {...skjema.felter.person.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                    label={<Element>Velg hvem det gjelder</Element>}
                    value={tilOptionType(skjema.felter.person.verdi)}
                    placeholder={'Velg person'}
                    isMulti={false}
                    onChange={(valg): void => {
                        skjema.felter.person.validerOgSettFelt((valg as OptionType).value);
                    }}
                    options={åpenBehandling.personer.map(person => ({
                        value: person.personIdent,
                        label: person.personIdent,
                    }))}
                />
            </Feltmargin>

            <Feltmargin>
                <Element>Fastsett andelsperiode</Element>
                <MånedÅrVelger
                    {...skjema.felter.fom.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                    label={
                        <>
                            <SkjultLegend>Fastsett andelsperiode </SkjultLegend>
                            <Normaltekst>F.o.m</Normaltekst>
                        </>
                    }
                    antallÅrFrem={finnÅrFremTilStønadTom()}
                    antallÅrTilbake={finnÅrTilbakeTilStønadFra()}
                    onEndret={(dato: YearMonth | undefined) =>
                        skjema.felter.fom.validerOgSettFelt(dato)
                    }
                    lesevisning={erLesevisning()}
                />
                <MånedÅrVelger
                    {...skjema.felter.tom.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                    label={
                        <>
                            <SkjultLegend>Fastsett andelsperiode </SkjultLegend>
                            <Normaltekst>T.o.m</Normaltekst>
                        </>
                    }
                    antallÅrFrem={finnÅrFremTilStønadTom()}
                    antallÅrTilbake={finnÅrTilbakeTilStønadFra()}
                    onEndret={(dato: YearMonth | undefined) => {
                        skjema.felter.tom.validerOgSettFelt(dato);
                    }}
                    lesevisning={erLesevisning()}
                />
            </Feltmargin>

            <Feltmargin>
                <FamilieRadioGruppe
                    legend={<Element>Skal perioden utbetales til søker?</Element>}
                    erLesevisning={erLesevisning()}
                >
                    <Radio
                        label={'Ja'}
                        name={'skal perioden utbetales til søker?'}
                        checked={skjema.felter.periodeSkalUtbetalesTilSøker.verdi}
                        onChange={() =>
                            skjema.felter.periodeSkalUtbetalesTilSøker.validerOgSettFelt(true)
                        }
                        id={'ja-perioden-utbetales-til-søker'}
                    />
                    <Radio
                        label={'Nei'}
                        name={'skal perioden utbetales til søker?'}
                        checked={!skjema.felter.periodeSkalUtbetalesTilSøker.verdi}
                        onChange={() =>
                            skjema.felter.periodeSkalUtbetalesTilSøker.validerOgSettFelt(false)
                        }
                        id={'nei-perioden-skal-ikke-utbetales-til-søker'}
                    />
                </FamilieRadioGruppe>
            </Feltmargin>

            <Feltmargin>
                <FamilieReactSelect
                    {...skjema.felter.årsak.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                    value={
                        skjema.felter.årsak.verdi
                            ? årsakTilOption(skjema.felter.årsak.verdi)
                            : undefined
                    }
                    label={<Element>Årsak</Element>}
                    placeholder={'Velg årsak'}
                    isMulti={false}
                    onChange={(valg): void => {
                        skjema.felter.årsak.validerOgSettFelt((valg as ÅrsakOption).årsak);
                    }}
                    options={årsaker.map(årsak => årsakTilOption(årsak))}
                />
            </Feltmargin>

            <Feltmargin>
                <StyledFamilieDatovelger
                    {...skjema.felter.søknadstidspunkt.hentNavBaseSkjemaProps(
                        skjema.visFeilmeldinger
                    )}
                    feil={!!skjema.felter.søknadstidspunkt.feilmelding && skjema.visFeilmeldinger}
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
                        {...skjema.felter.fullSats.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                        label={<Element>Sats</Element>}
                        value={
                            skjema.felter.fullSats.verdi !== undefined
                                ? satsTilOption(skjema.felter.fullSats.verdi)
                                : undefined
                        }
                        placeholder={'Velg sats'}
                        isMulti={false}
                        onChange={(valg): void => {
                            skjema.felter.fullSats.validerOgSettFelt((valg as SatsOption).fullSats);
                        }}
                        options={satser.map(sats =>
                            satsTilOption(sats === IEndretUtbetalingAndelFullSats.FULL_SATS)
                        )}
                    />
                </Feltmargin>
            )}

            <Feltmargin>
                <StyledFamilieTextarea
                    erLesevisning={erLesevisning()}
                    placeholder={'Begrunn hvorfor det er gjort endringer på vilkåret.'}
                    label={'Begrunnelse'}
                    value={
                        skjema.felter.begrunnelse.verdi !== null &&
                        skjema.felter.begrunnelse.verdi !== undefined
                            ? skjema.felter.begrunnelse.verdi
                            : ''
                    }
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                        skjema.felter.begrunnelse.validerOgSettFelt(event.target.value);
                    }}
                    feil={skjema.visFeilmeldinger && skjema.felter.begrunnelse.feilmelding}
                />
            </Feltmargin>
            {visFeilmeldinger && opprettelseFeilmelding !== '' && (
                <Feilmelding>{opprettelseFeilmelding}</Feilmelding>
            )}
            <Knapperekke>
                <Knapperad>
                    <StyledFerdigKnapp
                        mini
                        onClick={() => oppdaterEndretUtbetaling(avbrytEndringAvUtbetalingsperiode)}
                    >
                        Ferdig
                    </StyledFerdigKnapp>
                    <Flatknapp mini onClick={avbrytEndringAvUtbetalingsperiode}>
                        Avbryt
                    </Flatknapp>
                </Knapperad>

                <Flatknapp mini={true} onClick={slettEndretUtbetaling}>
                    <>
                        <StyledDeleteIkon />
                        Fjern Periode
                    </>
                </Flatknapp>
            </Knapperekke>
        </StyledSkjemaGruppe>
    );
};

export default EndretUtbetalingAndelSkjema;
