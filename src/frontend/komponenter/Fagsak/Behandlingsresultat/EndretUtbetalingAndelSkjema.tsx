import * as React from 'react';
import { useEffect } from 'react';

import styled from 'styled-components';

import { TrashIcon } from '@navikt/aksel-icons';
import { Button, Fieldset, Label, Radio, RadioGroup, Select, Textarea } from '@navikt/ds-react';
import { ABorderAction } from '@navikt/ds-tokens/dist/tokens';
import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { erUtbetalingTillattForÅrsak, Utbetaling, utbetalingTilLabel } from './Utbetaling';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useEndretUtbetalingAndel } from '../../../context/EndretUtbetalingAndelContext';
import type { IBehandling } from '../../../typer/behandling';
import type {
    IRestEndretUtbetalingAndel,
    IEndretUtbetalingAndelÅrsak,
} from '../../../typer/utbetalingAndel';
import { årsaker, årsakTekst } from '../../../typer/utbetalingAndel';
import type { IsoMånedString } from '../../../utils/dato';
import { lagPersonLabel } from '../../../utils/formatter';
import { hentFrontendFeilmelding } from '../../../utils/ressursUtils';
import Datovelger from '../../Felleskomponenter/Datovelger/Datovelger';
import Knapperekke from '../../Felleskomponenter/Knapperekke';
import MånedÅrVelger from '../../Felleskomponenter/MånedÅrInput/MånedÅrVelger';

const KnapperekkeVenstre = styled.div`
    display: flex;
    flex-direction: row;
`;

const StyledFieldset = styled(Fieldset)`
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    padding-left: 2rem;
    margin-right: 2rem;
    border-left: 0.0625rem solid ${ABorderAction};
    max-width: 30rem;
`;

const StyledSelectPersonvelger = styled(Select)`
    min-width: 20rem;
    z-index: 1000;
`;

const Feltmargin = styled.div`
    margin-bottom: 1rem;
`;

const StyledFerdigKnapp = styled(Button)`
    margin-right: 0.5rem;
`;

const StyledTextarea = styled(Textarea)`
    min-height: 8rem;
`;

interface IEndretUtbetalingAndelSkjemaProps {
    åpenBehandling: IBehandling;
    lukkSkjema: () => void;
}

const EndretUtbetalingAndelSkjema: React.FunctionComponent<IEndretUtbetalingAndelSkjemaProps> = ({
    åpenBehandling,
    lukkSkjema,
}) => {
    const { request } = useHttp();
    const { vurderErLesevisning, settÅpenBehandling } = useBehandling();
    const erLesevisning = vurderErLesevisning();

    const {
        endretUtbetalingAndel,
        skjema,
        kanSendeSkjema,
        onSubmit,
        hentSkjemaData,
        tilbakestillFelterTilDefault,
    } = useEndretUtbetalingAndel();

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

    useEffect(() => {
        if (hentFrontendFeilmelding(skjema.submitRessurs)?.includes('til og med dato')) {
            skjema.felter.tom.nullstill();
        }
    }, [skjema.submitRessurs]);

    return (
        <>
            <StyledFieldset
                error={hentFrontendFeilmelding(skjema.submitRessurs)}
                legend="Skjema for å endre utbetalingsandel"
                hideLegend
            >
                <Feltmargin>
                    <StyledSelectPersonvelger
                        {...skjema.felter.person.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                        label={<Label>Velg hvem det gjelder</Label>}
                        value={skjema.felter.person.verdi ?? ''}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                            skjema.felter.person.validerOgSettFelt(event.target.value);
                        }}
                        readOnly={erLesevisning}
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
                    </StyledSelectPersonvelger>
                </Feltmargin>

                <Feltmargin>
                    <Label>Fastsett periode</Label>
                    <Feltmargin>
                        <MånedÅrVelger
                            {...skjema.felter.fom.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                            label={'F.o.m'}
                            value={skjema.felter.fom.verdi}
                            antallÅrFrem={finnÅrFremTilStønadTom()}
                            antallÅrTilbake={finnÅrTilbakeTilStønadFra()}
                            onEndret={(dato: IsoMånedString | undefined) => {
                                if (dato === undefined) {
                                    skjema.felter.fom.nullstill();
                                } else {
                                    skjema.felter.fom.validerOgSettFelt(dato);
                                }
                            }}
                            lesevisning={erLesevisning}
                        />
                    </Feltmargin>
                    <MånedÅrVelger
                        {...skjema.felter.tom.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                        label={'T.o.m (valgfri)'}
                        value={skjema.felter.tom.verdi}
                        antallÅrFrem={finnÅrFremTilStønadTom()}
                        antallÅrTilbake={finnÅrTilbakeTilStønadFra()}
                        onEndret={(dato: IsoMånedString | undefined) => {
                            if (dato === undefined) {
                                skjema.felter.tom.nullstill();
                            } else {
                                skjema.felter.tom.validerOgSettFelt(dato);
                            }
                        }}
                        lesevisning={erLesevisning}
                    />
                </Feltmargin>

                <Feltmargin>
                    <Select
                        {...skjema.felter.årsak.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                        value={skjema.felter.årsak.verdi ?? ''}
                        label={'Årsak'}
                        onChange={(event): void => {
                            skjema.felter.årsak.validerOgSettFelt(
                                event.target.value as IEndretUtbetalingAndelÅrsak
                            );
                        }}
                        readOnly={erLesevisning}
                    >
                        <option value={undefined}>Velg årsak</option>
                        {årsaker.map(årsak => (
                            <option value={årsak.valueOf()} key={årsak.valueOf()}>
                                {årsakTekst[årsak]}
                            </option>
                        ))}
                    </Select>
                </Feltmargin>

                <Feltmargin>
                    <RadioGroup
                        legend={<Label>Utbetaling</Label>}
                        value={skjema.felter.utbetaling.verdi}
                        onChange={skjema.felter.utbetaling.validerOgSettFelt}
                        readOnly={erLesevisning}
                    >
                        {Object.values(Utbetaling)
                            .filter(utbetaling =>
                                erUtbetalingTillattForÅrsak({
                                    årsak: skjema.felter.årsak.verdi,
                                    utbetaling,
                                })
                            )
                            .map(utbetaling => {
                                return (
                                    <Radio name={'utbetaling'} value={utbetaling} id={utbetaling}>
                                        {utbetalingTilLabel(utbetaling)}
                                    </Radio>
                                );
                            })}
                    </RadioGroup>
                </Feltmargin>

                <Feltmargin>
                    <Datovelger
                        felt={skjema.felter.søknadstidspunkt}
                        label={'Søknadstidspunkt'}
                        visFeilmeldinger={skjema.visFeilmeldinger}
                        readOnly={erLesevisning}
                        kanKunVelgeFortid
                    />
                </Feltmargin>

                {skjema.felter.avtaletidspunktDeltBosted.erSynlig && (
                    <Feltmargin>
                        <Datovelger
                            felt={skjema.felter.avtaletidspunktDeltBosted}
                            label={'Avtale om delt bosted'}
                            visFeilmeldinger={skjema.visFeilmeldinger}
                            readOnly={erLesevisning}
                        />
                    </Feltmargin>
                )}

                <Feltmargin>
                    <StyledTextarea
                        {...skjema.felter.begrunnelse.hentNavInputProps(skjema.visFeilmeldinger)}
                        readOnly={erLesevisning}
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
                {!erLesevisning && (
                    <Knapperekke>
                        <KnapperekkeVenstre>
                            <StyledFerdigKnapp
                                size="small"
                                variant="secondary"
                                onClick={() => oppdaterEndretUtbetaling(lukkSkjema)}
                            >
                                Bekreft
                            </StyledFerdigKnapp>
                            <Button
                                variant="tertiary"
                                size="small"
                                onClick={() => {
                                    tilbakestillFelterTilDefault();
                                    lukkSkjema();
                                }}
                            >
                                Avbryt
                            </Button>
                        </KnapperekkeVenstre>
                        {!erLesevisning ? (
                            <Button
                                variant={'tertiary'}
                                id={`sletteknapp-endret-utbetaling-andel-${endretUtbetalingAndel.id}`}
                                size={'small'}
                                onClick={slettEndretUtbetaling}
                                icon={<TrashIcon />}
                            >
                                {'Fjern periode'}
                            </Button>
                        ) : null}
                    </Knapperekke>
                )}
            </StyledFieldset>
        </>
    );
};

export default EndretUtbetalingAndelSkjema;
