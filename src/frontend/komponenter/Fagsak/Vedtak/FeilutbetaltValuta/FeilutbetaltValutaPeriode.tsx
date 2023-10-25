import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { TrashIcon } from '@navikt/aksel-icons';
import { Table, Button, Tooltip, Alert } from '@navikt/ds-react';

import FeilutbetaltValutaSkjema from './FeilutbetaltValutaSkjema';
import { useFeilutbetaltValuta } from './useFeilutbetaltValuta';
import { useApp } from '../../../../context/AppContext';
import type { IRestFeilutbetaltValuta } from '../../../../typer/eøs-feilutbetalt-valuta';
import { ToggleNavn } from '../../../../typer/toggles';
import { periodeToString } from '../../../../utils/kalender';

interface IFeilutbetaltValutaPeriode {
    feilutbetaltValuta: IRestFeilutbetaltValuta;
    erLesevisning: boolean;
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

const FeilutbetaltValutaPeriode: React.FC<IFeilutbetaltValutaPeriode> = ({
    feilutbetaltValuta,
    erLesevisning,
    behandlingId,
}) => {
    const { toggles } = useApp();
    const [erRadEkspandert, settErRadEkspandert] = useState<boolean>(false);
    const [feilmelding, settFeilmelding] = useState<string>();

    const {
        skjema,
        oppdaterEksisterendePeriode,
        fjernPeriode,
        valideringErOk,
        tilbakestillSkjemafelterTilDefault,
    } = useFeilutbetaltValuta({
        behandlingId: behandlingId,
        feilutbetaltValuta,
        settFeilmelding: settFeilmelding,
    });

    useEffect(() => {
        tilbakestillOgLukkSkjema();
    }, [feilutbetaltValuta]);

    const tilbakestillOgLukkSkjema = () => {
        settErRadEkspandert(false);
        tilbakestillSkjemafelterTilDefault();
    };

    const håndterLukkingOgÅpningAvPanel = () => {
        if (erLesevisning) return;

        if (erRadEkspandert) {
            tilbakestillOgLukkSkjema();
        } else {
            settErRadEkspandert(true);
        }
    };

    return (
        <Table.ExpandableRow
            open={erLesevisning ? false : erRadEkspandert}
            onOpenChange={håndterLukkingOgÅpningAvPanel}
            content={
                <FlexColumnDiv>
                    {erRadEkspandert && <FeilutbetaltValutaSkjema skjema={skjema} />}
                    <FlexRowDiv>
                        <Button
                            size="small"
                            onClick={oppdaterEksisterendePeriode}
                            variant={valideringErOk() ? 'primary' : 'secondary'}
                        >
                            Lagre periode
                        </Button>
                        <Button size="small" variant="tertiary" onClick={tilbakestillOgLukkSkjema}>
                            Avbryt
                        </Button>
                    </FlexRowDiv>
                    {feilmelding && <Alert variant="error">{feilmelding}</Alert>}
                </FlexColumnDiv>
            }
        >
            <Table.DataCell scope="row">
                {periodeToString({
                    fom: feilutbetaltValuta.fom,
                    tom: feilutbetaltValuta.tom,
                })}
            </Table.DataCell>
            <Table.DataCell align="right">
                {feilutbetaltValuta.feilutbetaltBeløp}{' '}
                {toggles[ToggleNavn.feilutbetaltValutaPerMåned] ? 'kr/mnd' : 'kr'}
            </Table.DataCell>
            <Table.DataCell align="center">
                <Tooltip content="Fjern periode">
                    <Button
                        icon={<TrashIcon />}
                        variant="tertiary"
                        size="small"
                        onClick={fjernPeriode}
                        disabled={erLesevisning}
                    />
                </Tooltip>
            </Table.DataCell>
        </Table.ExpandableRow>
    );
};

export default FeilutbetaltValutaPeriode;
