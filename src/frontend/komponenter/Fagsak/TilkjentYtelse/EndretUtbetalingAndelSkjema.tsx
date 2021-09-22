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
import { Ressurs } from '@navikt/familie-typer';
import { byggTomRessurs } from '@navikt/familie-typer/dist/ressurs';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useEndretUtbetalingAndel } from '../../../context/EndretUtbetalingAndelContext';
import { IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import {
    ÅrsakOption,
    årsakOptions,
    IRestEndretUtbetalingAndel,
} from '../../../typer/utbetalingAndel';
import MånedÅrVelger from '../../../utils/input/MånedÅrVelger';
import { YearMonth } from '../../../utils/kalender';
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
    avbrytEndringAvUtbetalingsperiode: () => void;
}

const EndretUtbetalingAndelSkjema: React.FunctionComponent<IEndretUtbetalingAndelSkjemaProps> = ({
    åpenBehandling,
    avbrytEndringAvUtbetalingsperiode,
}) => {
    const { erLesevisning } = useBehandling();
    const { skjema, onSubmit, kanSendeSkjema } = useEndretUtbetalingAndel();
    const [fagsakRessurs, settFagsakressurs] = useState<Ressurs<IFagsak>>(byggTomRessurs());

    const submitEndretUtbetaling = () => {
        const { person, periodeSkalUtbetalesTilSøker, fom, tom, årsak, begrunnelse } =
            skjema.felter;
        if (kanSendeSkjema() && person.verdi && årsak.verdi && fom.verdi && tom.verdi) {
            onSubmit<IRestEndretUtbetalingAndel>(
                {
                    method: 'POST',
                    url: `/familie-ba-sak/api/endretutbetalingandel/${åpenBehandling.behandlingId}`,
                    påvirkerSystemLaster: true,
                    data: {
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

    const oppdaterEndretUtbetaling = () => {
        const { id, person, periodeSkalUtbetalesTilSøker, fom, tom, årsak, begrunnelse } =
            skjema.felter;
        if (
            kanSendeSkjema() &&
            person.verdi &&
            årsak.verdi &&
            fom.verdi &&
            tom.verdi &&
            id?.verdi
        ) {
            onSubmit<IRestEndretUtbetalingAndel>(
                {
                    method: 'PUT',
                    url: `/familie-ba-sak/api/endretutbetalingandel/${åpenBehandling.behandlingId}/${id?.verdi}`,
                    påvirkerSystemLaster: true,
                    data: {
                        id: id?.verdi,
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

    const slettEndretUtbetaling = () => {
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
    };

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
                <StyledFerdigKnapp mini onClick={submitEndretUtbetaling}>
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
