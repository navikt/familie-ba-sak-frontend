import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { Knapp, Flatknapp } from 'nav-frontend-knapper';
import { SkjemaGruppe, Radio } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import {
    FamilieRadioGruppe,
    FamilieTextarea,
    FamilieReactSelect,
    OptionType,
} from '@navikt/familie-form-elements';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import { Ressurs } from '@navikt/familie-typer';
import { byggTomRessurs } from '@navikt/familie-typer/dist/ressurs';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { PersonType } from '../../../typer/person';
import {
    ÅrsakOption,
    årsakOptions,
    IRestEndretUtbetalingAndel,
} from '../../../typer/utbetalingAndel';
import MånedÅrVelger from '../../../utils/input/MånedÅrVelger';
import { FamilieIsoDate, YearMonth } from '../../../utils/kalender';
import SkjultLegend from '../../Felleskomponenter/SkjultLegend';

const Knapperad = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem 0;
`;

const StyledSkjemaGruppe = styled(SkjemaGruppe)`
    margin-top: 5rem;
    padding-left: 3.75rem;
    margin-right: 2rem;
    border-left: 0.0625rem solid black;
`;

const StyledPersonvelger = styled(FamilieReactSelect)`
    max-width: 20rem;
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
    const { erLesevisning } = useBehandling();

    const { skjema, kanSendeSkjema, onSubmit } = useSkjema<
        {
            id?: string;
            person: OptionType | undefined;
            fom: FamilieIsoDate | undefined;
            tom: FamilieIsoDate | undefined;
            periodeSkalUtbetalesTilSøker: boolean;
            årsak: ÅrsakOption | undefined;
            begrunnelse: string;
        },
        IFagsak
    >({
        felter: {
            id: useFelt<string | undefined>({
                verdi: undefined,
            }),
            person: useFelt<OptionType | undefined>({
                verdi: undefined,
                valideringsfunksjon: felt =>
                    felt.verdi ? ok(felt) : feil(felt, 'Du må velge en person'),
            }),
            fom: useFelt<FamilieIsoDate | undefined>({
                verdi: undefined,
                valideringsfunksjon: felt =>
                    felt.verdi ? ok(felt) : feil(felt, 'Du må velge f.o.m-dato'),
            }),
            tom: useFelt<FamilieIsoDate | undefined>({
                verdi: undefined,
                valideringsfunksjon: felt =>
                    felt.verdi ? ok(felt) : feil(felt, 'Du må velge t.o.m-dato'),
            }),
            periodeSkalUtbetalesTilSøker: useFelt<boolean>({
                verdi: false,
            }),
            årsak: useFelt<ÅrsakOption | undefined>({
                verdi: undefined,
                valideringsfunksjon: felt =>
                    felt.verdi ? ok(felt) : feil(felt, 'Du må velge en årsak'),
            }),
            begrunnelse: useFelt<string>({
                verdi: '',
            }),
        },
        skjemanavn: 'Endre utbetalingsperiode',
    });

    const [settFagsakressurs] = useState<Ressurs<IFagsak>>(byggTomRessurs());

    const oppdaterEndretUtbetaling = () => {
        const { person, periodeSkalUtbetalesTilSøker, fom, tom, årsak, begrunnelse } =
            skjema.felter;
        if (kanSendeSkjema() && person.verdi && årsak.verdi && fom.verdi && tom.verdi) {
            onSubmit<IRestEndretUtbetalingAndel>(
                {
                    method: 'PUT',
                    url: `/familie-ba-sak/api/endretutbetalingandel/${åpenBehandling.behandlingId}/${endretUtbetalingAndel.id}`,
                    påvirkerSystemLaster: true,
                    data: {
                        id: endretUtbetalingAndel.id,
                        personIdent: person.verdi.value,
                        prosent: periodeSkalUtbetalesTilSøker ? 100 : 0,
                        fom: fom.verdi,
                        tom: tom.verdi,
                        årsak: årsak.verdi.årsak,
                        begrunnelse: begrunnelse.verdi,
                    },
                },
                (fagsak: Ressurs<IFagsak>) => {
                    settFagsakressurs(fagsak);
                }
            );
        }
    };

    /*const slettEndretUtbetaling = () => {
        const { id } = skjema.felter;
        if (kanSendeSkjema() && id !== undefined && id.verdi) {
            onSubmit<IRestEndretUtbetalingAndel>(
                {
                    method: 'DELETE',
                    url: `/familie-ba-sak/api/endretutbetalingandel/${åpenBehandling.behandlingId}/${id.verdi}`,
                    påvirkerSystemLaster: true,
                },
                (fagsak: Ressurs<IFagsak>) => {
                    settFagsakressurs(fagsak);
                }
            );
        }
    };*/

    return (
        <StyledSkjemaGruppe>
            <Feltmargin>
                <StyledPersonvelger
                    {...skjema.felter.person.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                    label={<Element>Velg hvem det gjelder</Element>}
                    placeholder={'Velg person'}
                    isMulti={false}
                    onChange={(valg): void => {
                        skjema.felter.person.validerOgSettFelt(valg as OptionType);
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
                    antallÅrFrem={0}
                    antallÅrTilbake={3}
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
                    antallÅrFrem={0}
                    antallÅrTilbake={3}
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
                    label={<Element>Årsak</Element>}
                    placeholder={'Velg årsak'}
                    isMulti={false}
                    onChange={(valg): void => {
                        skjema.felter.årsak.validerOgSettFelt(valg as ÅrsakOption);
                    }}
                    options={årsakOptions}
                />
            </Feltmargin>

            <Feltmargin>
                <StyledFamilieTextarea
                    erLesevisning={erLesevisning()}
                    placeholder={'Begrunn hvorfor det er gjort endringer på vilkåret.'}
                    label={'Begrunnelse'}
                    value={skjema.felter.begrunnelse.verdi}
                    maxLength={4000}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                        skjema.felter.begrunnelse.validerOgSettFelt(event.target.value);
                    }}
                />
            </Feltmargin>
            <Knapperad>
                <StyledFerdigKnapp mini onClick={oppdaterEndretUtbetaling}>
                    Ferdig
                </StyledFerdigKnapp>
                <Flatknapp mini onClick={avbrytEndringAvUtbetalingsperiode}>
                    Avbryt
                </Flatknapp>
            </Knapperad>
        </StyledSkjemaGruppe>
    );
};

export default EndretUtbetalingAndelSkjema;
