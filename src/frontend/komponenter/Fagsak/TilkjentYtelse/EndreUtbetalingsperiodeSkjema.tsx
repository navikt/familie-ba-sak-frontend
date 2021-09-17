import * as React from 'react';

import styled from 'styled-components';

import { SkjemaGruppe, Radio } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import {
    FamilieRadioGruppe,
    FamilieDatovelger,
    ISODateString,
    FamilieTextarea,
    FamilieReactSelect,
} from '@navikt/familie-form-elements';

import { useTidslinje } from '../../../context/TidslinjeContext';
import { IBehandling } from '../../../typer/behandling';
import SkjultLegend from '../../Felleskomponenter/SkjultLegend';

const TilFraDatoRad = styled.div`
    display: flex;
    flex-direction: row;
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

const StyledFamilieDatovelger = styled(FamilieDatovelger)`
    margin-right: 2rem;
`;

interface IEndreUtbetaingsperiodeSkjemaProps {
    åpenBehandling: IBehandling;
}

const EndreUtbetaingsperiodeSkjema: React.FunctionComponent<IEndreUtbetaingsperiodeSkjemaProps> = ({
    åpenBehandling,
}) => {
    const { skjema } = useTidslinje();

    return (
        <StyledSkjemaGruppe legend={<SkjultLegend>Endre periode</SkjultLegend>}>
            <Feltmargin>
                <StyledPersonvelger
                    {...skjema.felter.person.hentNavBaseSkjemaProps(false)}
                    label={<Element>Velg hvem det gjelder</Element>}
                    placeholder={'Velg person'}
                    isMulti={false}
                    onChange={(valg): void => {
                        valg &&
                            skjema.felter.person.validerOgSettFelt(
                                valg as {
                                    value: string;
                                    label: string;
                                }
                            );
                    }}
                    options={åpenBehandling.personer.map(person => ({
                        value: person.personIdent,
                        label: person.personIdent,
                    }))}
                />
            </Feltmargin>

            <Feltmargin>
                <Element>Fastsett periode</Element>
                <TilFraDatoRad>
                    <StyledFamilieDatovelger
                        id={'fom'}
                        placeholder={'Velg f.o.m-dato'}
                        label={
                            <>
                                <SkjultLegend>Fastsett periode </SkjultLegend>
                                <Normaltekst>F.o.m</Normaltekst>
                            </>
                        }
                        onChange={(dato?: ISODateString) => {
                            dato && skjema.felter.fom.validerOgSettFelt(dato);
                        }}
                        valgtDato={skjema.felter.fom.verdi}
                        erLesesvisning={false}
                    />
                    <FamilieDatovelger
                        id={'tom'}
                        placeholder={'Velg t.o.m-dato'}
                        label={
                            <>
                                <SkjultLegend>Fastsett periode </SkjultLegend>
                                <Normaltekst>T.o.m</Normaltekst>
                            </>
                        }
                        onChange={(dato?: ISODateString) => {
                            dato && skjema.felter.tom.validerOgSettFelt(dato);
                        }}
                        valgtDato={skjema.felter.tom.verdi}
                        erLesesvisning={false}
                    />
                </TilFraDatoRad>
            </Feltmargin>

            <Feltmargin>
                <FamilieRadioGruppe
                    legend={<Element>Skal perioden utbetales til søker?</Element>}
                    erLesevisning={false}
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
                {' '}
                <FamilieReactSelect
                    {...skjema.felter.årsak.hentNavBaseSkjemaProps(false)}
                    label={<Element>Årsak</Element>}
                    placeholder={'Velg årsak'}
                    isMulti={false}
                    onChange={(valg): void => {
                        valg &&
                            skjema.felter.årsak.validerOgSettFelt(
                                valg as {
                                    value: string;
                                    label: string;
                                }
                            );
                    }}
                    options={['Årsak 1', 'Årsak 2'].map(årsak => ({
                        value: årsak,
                        label: årsak,
                    }))}
                />
            </Feltmargin>

            <Feltmargin>
                <FamilieTextarea
                    erLesevisning={false}
                    placeholder={'Begrunn hvorfor det er gjort endringer på vilkåret.'}
                    label={'Begrunnelse'}
                    value={skjema.felter.begrunnelse.verdi}
                    maxLength={4000}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                        skjema.felter.begrunnelse.validerOgSettFelt(event.target.value);
                    }}
                />
            </Feltmargin>
        </StyledSkjemaGruppe>
    );
};

export default EndreUtbetaingsperiodeSkjema;
