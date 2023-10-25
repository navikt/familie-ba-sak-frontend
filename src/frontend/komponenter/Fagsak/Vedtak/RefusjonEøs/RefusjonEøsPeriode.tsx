import React, { useState } from 'react';

import styled from 'styled-components';

import { TrashIcon } from '@navikt/aksel-icons';
import { Table, Button, Tooltip, Alert } from '@navikt/ds-react';

import RefusjonEøsSkjema from './RefusjonEøsSkjema';
import { useRefusjonEøs } from './useRefusjonEøs';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IRestRefusjonEøs } from '../../../../typer/refusjon-eøs';
import { periodeToString } from '../../../../utils/kalender';

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
        fjernPeriode,
        valideringErOk,
        validerAlleSynligeFelter,
        tilbakestillSkjemafelterTilDefault,
    } = useRefusjonEøs({
        behandlingId,
        refusjonEøs,
        settFeilmelding: settFeilmelding,
    });

    const tilbakestillOgLukkSkjema = () => {
        settErRadEkspandert(false);
        tilbakestillSkjemafelterTilDefault();
    };

    const håndterLukkingOgÅpningAvPanel = () => {
        if (erRadEkspandert) {
            tilbakestillOgLukkSkjema();
        } else {
            validerAlleSynligeFelter();
            settErRadEkspandert(true);
        }
    };

    const lagrePeriodeOgLukkPanel = () => {
        oppdaterEksisterendePeriode().then(() => settErRadEkspandert(false));
    };

    return (
        <Table.ExpandableRow
            open={erRadEkspandert}
            onOpenChange={håndterLukkingOgÅpningAvPanel}
            content={
                <FlexColumnDiv>
                    {erRadEkspandert && <RefusjonEøsSkjema skjema={skjema} />}
                    {!erLesevisning && (
                        <FlexRowDiv>
                            <Button
                                size="small"
                                onClick={lagrePeriodeOgLukkPanel}
                                variant={valideringErOk() ? 'primary' : 'secondary'}
                            >
                                Lagre periode
                            </Button>
                            <Button
                                size="small"
                                variant="tertiary"
                                onClick={tilbakestillOgLukkSkjema}
                            >
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
                            icon={<TrashIcon />}
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
