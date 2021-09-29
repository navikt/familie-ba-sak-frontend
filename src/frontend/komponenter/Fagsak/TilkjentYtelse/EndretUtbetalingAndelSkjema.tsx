import * as React from 'react';
import { useEffect } from 'react';

import styled from 'styled-components';

import { Knapp, Flatknapp } from 'nav-frontend-knapper';
import { SkjemaGruppe, Radio } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { Delete } from '@navikt/ds-icons';
import {
    FamilieRadioGruppe,
    FamilieTextarea,
    FamilieReactSelect,
    OptionType,
} from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import { Ressurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { PersonType } from '../../../typer/person';
import {
    ÅrsakOption,
    IRestEndretUtbetalingAndel,
    årsakTilOption,
    årsaker,
    IEndretUtbetalingAndelÅrsak,
    satsTilOption,
    SatsOption,
    satser,
    IEndretUtbetalingAndelFullSats,
} from '../../../typer/utbetalingAndel';
import { FamilieIsoDate, YearMonth, erIsoStringGyldig } from '../../../utils/kalender';
import Knapperekke from '../../Felleskomponenter/Knapperekke';
import MånedÅrVelger from '../../Felleskomponenter/MånedÅrInput/MånedÅrVelger';
import SkjultLegend from '../../Felleskomponenter/SkjultLegend';

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
    endretUtbetalingAndel: IRestEndretUtbetalingAndel;
    avbrytEndringAvUtbetalingsperiode: () => void;
}

const EndretUtbetalingAndelSkjema: React.FunctionComponent<IEndretUtbetalingAndelSkjemaProps> = ({
    åpenBehandling,
    endretUtbetalingAndel,
    avbrytEndringAvUtbetalingsperiode,
}) => {
    const { request } = useHttp();
    const { erLesevisning } = useBehandling();
    const { settFagsak } = useFagsakRessurser();

    const tilOptionType = (value?: string): OptionType | undefined =>
        value ? { value: value, label: value } : undefined;

    useEffect(() => {
        nullstillSkjema();
    }, [endretUtbetalingAndel]);

    const { skjema, kanSendeSkjema, onSubmit, nullstillSkjema } = useSkjema<
        {
            person: string | undefined;
            fom: FamilieIsoDate | undefined;
            tom: FamilieIsoDate | undefined;
            periodeSkalUtbetalesTilSøker: boolean;
            fullSats: boolean | undefined;
            årsak: IEndretUtbetalingAndelÅrsak | undefined;
            begrunnelse: string;
        },
        IFagsak
    >({
        felter: {
            person: useFelt<string | undefined>({
                verdi: endretUtbetalingAndel
                    ? endretUtbetalingAndel.personIdent
                        ? endretUtbetalingAndel.personIdent
                        : undefined
                    : undefined,
                valideringsfunksjon: felt =>
                    felt.verdi ? ok(felt) : feil(felt, 'Du må velge en person'),
            }),
            fom: useFelt<FamilieIsoDate | undefined>({
                verdi: endretUtbetalingAndel.fom,
                valideringsfunksjon: felt =>
                    erIsoStringGyldig(felt.verdi) ? ok(felt) : feil(felt, 'Du må velge f.o.m-dato'),
            }),
            tom: useFelt<FamilieIsoDate | undefined>({
                verdi: endretUtbetalingAndel.tom,
                valideringsfunksjon: felt =>
                    erIsoStringGyldig(felt.verdi) ? ok(felt) : feil(felt, 'Du må velge t.o.m-dato'),
            }),
            periodeSkalUtbetalesTilSøker: useFelt<boolean>({
                verdi:
                    endretUtbetalingAndel.prosent !== undefined &&
                    endretUtbetalingAndel.prosent > 0,
            }),
            fullSats: useFelt<boolean | undefined>({
                verdi:
                    endretUtbetalingAndel.prosent !== undefined
                        ? endretUtbetalingAndel.prosent === 100
                        : undefined,
            }),
            årsak: useFelt<IEndretUtbetalingAndelÅrsak | undefined>({
                verdi: endretUtbetalingAndel.årsak ? endretUtbetalingAndel.årsak : undefined,
                valideringsfunksjon: felt =>
                    felt.verdi ? ok(felt) : feil(felt, 'Du må velge en årsak'),
            }),
            begrunnelse: useFelt<string>({
                verdi: endretUtbetalingAndel.begrunnelse ? endretUtbetalingAndel.begrunnelse : '',
            }),
        },
        skjemanavn: 'Endre utbetalingsperiode',
    });

    const oppdaterEndretUtbetaling = (avbrytEndringAvUtbetalingsperiode: () => void) => {
        const { person, periodeSkalUtbetalesTilSøker, fom, tom, årsak, begrunnelse, fullSats } =
            skjema.felter;
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
                    },
                },
                (fagsak: Ressurs<IFagsak>) => {
                    settFagsak(fagsak);
                    avbrytEndringAvUtbetalingsperiode();
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
                    options={åpenBehandling.personer
                        .filter(person => person.type === PersonType.BARN)
                        .map(person => ({
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

            {skjema.felter.årsak.verdi === IEndretUtbetalingAndelÅrsak.DELT_BOSTED &&
                skjema.felter.periodeSkalUtbetalesTilSøker.verdi && (
                    <Feltmargin>
                        <StyledSatsvelger
                            {...skjema.felter.fullSats.hentNavBaseSkjemaProps(
                                skjema.visFeilmeldinger
                            )}
                            label={<Element>Sats</Element>}
                            value={
                                skjema.felter.fullSats.verdi !== undefined
                                    ? satsTilOption(skjema.felter.fullSats.verdi)
                                    : undefined
                            }
                            placeholder={'Velg sats'}
                            isMulti={false}
                            onChange={(valg): void => {
                                skjema.felter.fullSats.validerOgSettFelt(
                                    (valg as SatsOption).fullSats
                                );
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
                    value={skjema.felter.begrunnelse.verdi}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                        skjema.felter.begrunnelse.validerOgSettFelt(event.target.value);
                    }}
                />
            </Feltmargin>
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
