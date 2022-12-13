import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Delete } from '@navikt/ds-icons';
import { Table, Label, Button, Tooltip, Alert } from '@navikt/ds-react';
import type { ISODateString } from '@navikt/familie-form-elements';
import { FamilieDatovelger, FamilieInput } from '@navikt/familie-form-elements';

import type { IRestTrekkILøpendeUtbetaling } from '../../../../typer/eøs-trekk-i-løpende-ytelse';
import {
    periodeToString,
    serializeIso8601String,
    sisteDagIInneværendeMåned,
} from '../../../../utils/kalender';
import { useTrekkILøpendeUtbetaling } from './useTrekkILøpendeUtbetaling';

interface ITrekkILøpendeUtbetaling {
    trekkILøpendeUtbetaling: IRestTrekkILøpendeUtbetaling;
    erNyPeriode?: boolean;
    settErNyPeriode: (erNyPeriode: boolean) => void;
}

const FlexColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;
`;

const FlexDatoInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const FlexRowDiv = styled.div`
    display: flex;
`;

const StyledFamilieInput = styled(FamilieInput)`
    width: 7.5rem;
    .navds-label {
        width: 18rem;
    }
    .navds-text-field__input {
        width: 11rem;
    }
`;

const TrekkILøpendeUtbetalingListeElement: React.FC<ITrekkILøpendeUtbetaling> = ({
    trekkILøpendeUtbetaling,
    erNyPeriode,
    settErNyPeriode,
}) => {
    const [erRadEkspandert, settErRadEkspandert] = useState<boolean>(erNyPeriode ? true : false);
    const [feilmelding, settFeilmelding] = useState<string>();

    const {
        skjema,
        lagreNyPeriode,
        oppdaterEksisterendePeriode,
        nullstillSkjema,
        fjernPeriode,
        valideringErOk,
    } = useTrekkILøpendeUtbetaling({
        trekkILøpendeUtbetaling: trekkILøpendeUtbetaling,
        settErNyPeriode: settErNyPeriode,
        settFeilmelding: settFeilmelding,
    });

    useEffect(() => {
        nullstillSkjema();
    }, [trekkILøpendeUtbetaling]);

    const avbrytOppdaterEksisterende = () => {
        nullstillSkjema();
        settErRadEkspandert(false);
    };

    const avbrytLeggTilNy = () => {
        nullstillSkjema();
        settErRadEkspandert(false);
        settErNyPeriode(false);
    };

    return (
        <Table.ExpandableRow
            open={erNyPeriode ? erNyPeriode : erRadEkspandert}
            onOpenChange={settErRadEkspandert}
            content={
                <FlexColumnDiv>
                    <FlexDatoInputWrapper>
                        <Label size="small">Angi periode med feilutbetalt valuta</Label>
                        <FlexRowDiv style={{ gap: '2rem' }}>
                            <FamilieDatovelger
                                {...skjema.felter.fom?.hentNavBaseSkjemaProps(
                                    skjema.visFeilmeldinger
                                )}
                                id="id1"
                                label="F.o.m"
                                valgtDato={skjema.felter.fom?.verdi}
                                onChange={(dato?: ISODateString) =>
                                    skjema.felter.fom?.validerOgSettFelt(dato)
                                }
                                limitations={{
                                    maxDate: serializeIso8601String(sisteDagIInneværendeMåned()),
                                }}
                            />
                            <FamilieDatovelger
                                {...skjema.felter.tom?.hentNavBaseSkjemaProps(
                                    skjema.visFeilmeldinger
                                )}
                                id="id1"
                                label="T.o.m"
                                valgtDato={skjema.felter.tom?.verdi}
                                onChange={(dato?: ISODateString) =>
                                    skjema.felter.tom?.validerOgSettFelt(dato)
                                }
                                limitations={{
                                    maxDate: serializeIso8601String(sisteDagIInneværendeMåned()),
                                }}
                            />
                        </FlexRowDiv>
                    </FlexDatoInputWrapper>
                    <StyledFamilieInput
                        {...skjema.felter.feilutbetaltBeløp.hentNavBaseSkjemaProps(
                            skjema.visFeilmeldinger
                        )}
                        size="small"
                        label="Feilutbetalt beløp"
                        value={skjema.felter.feilutbetaltBeløp.verdi}
                        type="number"
                        onChange={changeEvent =>
                            skjema.felter.feilutbetaltBeløp.validerOgSettFelt(
                                Number(changeEvent.target.value)
                            )
                        }
                    />
                    <FlexRowDiv style={{ gap: '1rem' }}>
                        <Button
                            size="small"
                            onClick={erNyPeriode ? lagreNyPeriode : oppdaterEksisterendePeriode}
                            variant={valideringErOk() ? 'primary' : 'secondary'}
                        >
                            Lagre periode
                        </Button>
                        <Button
                            size="small"
                            variant="tertiary"
                            onClick={erNyPeriode ? avbrytLeggTilNy : avbrytOppdaterEksisterende}
                        >
                            Avbryt
                        </Button>
                    </FlexRowDiv>
                    {feilmelding && <Alert variant="error">{feilmelding}</Alert>}
                </FlexColumnDiv>
            }
        >
            {!erNyPeriode && (
                <>
                    <Table.DataCell scope="row">
                        {!erNyPeriode && periodeToString(trekkILøpendeUtbetaling.periode)}
                    </Table.DataCell>
                    <Table.DataCell align="right">
                        {!erNyPeriode && trekkILøpendeUtbetaling.feilutbetaltBeløp + ' kr'}
                    </Table.DataCell>
                    <Table.DataCell align="center">
                        <Tooltip content="Fjern periode">
                            <Button
                                icon={<Delete />}
                                variant="tertiary"
                                size="small"
                                onClick={fjernPeriode}
                            />
                        </Tooltip>
                    </Table.DataCell>
                </>
            )}
        </Table.ExpandableRow>
    );
};

export default TrekkILøpendeUtbetalingListeElement;
