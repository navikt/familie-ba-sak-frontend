import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Delete } from '@navikt/ds-icons';
import { Table, Button, Tooltip, Alert } from '@navikt/ds-react';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IRestRefusjonEøs } from '../../../../typer/refusjon-eøs';
import { periodeToString } from '../../../../utils/kalender';
import RefusjonEøsSkjema from './RefusjonEøsSkjema';
import { useRefusjonEøs } from './useRefusjonEøs';

interface IRefusjonEøsPeriode {
    refusjonEøs: IRestRefusjonEøs;
    behandlingId: number;
}

const FlexColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;
`;

const FlexRowDiv = styled.div`
    display: flex;
    gap: 1rem;
`;

const RefusjonEøsPeriode: React.FC<IRefusjonEøsPeriode> = ({ refusjonEøs, behandlingId }) => {
    const { vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();

    const [erRadEkspandert, settErRadEkspandert] = useState<boolean>(false);
    const [feilmelding, settFeilmelding] = useState<string>();

    const {
        skjema,
        oppdaterEksisterendePeriode,
        nullstillSkjema,
        fjernPeriode,
        valideringErOk,
        validerAlleSynligeFelter,
    } = useRefusjonEøs({
        behandlingId,
        refusjonEøs,
        settFeilmelding: settFeilmelding,
    });

    useEffect(() => {
        nullstillOgLukkSkjema();
    }, [refusjonEøs]);

    const nullstillOgLukkSkjema = () => {
        nullstillSkjema();
        settErRadEkspandert(false);
    };

    const håndterLukkingOgÅpningAvPanel = () => {
        if (erRadEkspandert) {
            nullstillOgLukkSkjema();
        } else {
            validerAlleSynligeFelter();
            settErRadEkspandert(true);
        }
    };

    return (
        <Table.ExpandableRow
            open={erRadEkspandert}
            onOpenChange={håndterLukkingOgÅpningAvPanel}
            content={
                <FlexColumnDiv>
                    <RefusjonEøsSkjema skjema={skjema} />
                    {!erLesevisning && (
                        <FlexRowDiv>
                            <Button
                                size="small"
                                onClick={oppdaterEksisterendePeriode}
                                variant={valideringErOk() ? 'primary' : 'secondary'}
                            >
                                Lagre periode
                            </Button>
                            <Button size="small" variant="tertiary" onClick={nullstillOgLukkSkjema}>
                                Avbryt
                            </Button>
                        </FlexRowDiv>
                    )}
                    {feilmelding && <Alert variant="error">{feilmelding}</Alert>}
                </FlexColumnDiv>
            }
        >
            <Table.DataCell scope="row">
                {periodeToString({
                    fom: refusjonEøs.fom,
                    tom: refusjonEøs.tom,
                })}
            </Table.DataCell>
            <Table.DataCell align="right">{refusjonEøs.refusjonsbeløp} kr/mnd</Table.DataCell>
            <Table.DataCell align="center">
                {!erLesevisning && (
                    <Tooltip content="Fjern periode">
                        <Button
                            icon={<Delete />}
                            variant="tertiary"
                            size="small"
                            onClick={fjernPeriode}
                            disabled={erLesevisning}
                        />
                    </Tooltip>
                )}
            </Table.DataCell>
        </Table.ExpandableRow>
    );
};

export default RefusjonEøsPeriode;
