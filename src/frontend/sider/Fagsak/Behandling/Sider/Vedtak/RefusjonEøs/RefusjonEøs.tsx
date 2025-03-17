import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button, CopyButton, Heading, Table } from '@navikt/ds-react';
import { ATextAction } from '@navikt/ds-tokens/dist/tokens';

import NyRefusjonEøsPeriode from './NyRefusjonEøsPeriode';
import RefusjonEøsPeriode from './RefusjonEøsPeriode';
import { useBehandling } from '../../../../../../context/behandlingContext/BehandlingContext';
import type { IRestRefusjonEøs } from '../../../../../../typer/refusjon-eøs';
import { isoDatoPeriodeTilFormatertString } from '../../../../../../utils/dato';
import { summerBeløpForPerioder } from '../utils';

interface IRefusjonEøs {
    behandlingId: number;
    fagsakId: string | undefined;
    refusjonEøsListe: IRestRefusjonEøs[];
    settErUlagretNyRefusjonEøsPeriode: (erUlagretNyRefusjonEøs: boolean) => void;
    skjulRefusjonEøs: () => void;
}

const FlexColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 3.5rem;
    margin-top: 2rem;
`;

const FlexRowDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;

const KopierTilNøsKnapp = styled(CopyButton)`
    :not(:hover):not(:active) {
        color: ${ATextAction};
    }
`;

const RefusjonEøs: React.FC<IRefusjonEøs> = ({
    refusjonEøsListe,
    settErUlagretNyRefusjonEøsPeriode,
    skjulRefusjonEøs,
    behandlingId,
    fagsakId,
}) => {
    const { vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();

    const [ønskerÅLeggeTilNyPeriode, settØnskerÅLeggeTilNyPeriode] = useState(
        refusjonEøsListe.length === 0
    );

    useEffect(() => {
        settErUlagretNyRefusjonEøsPeriode(ønskerÅLeggeTilNyPeriode);
    }, [ønskerÅLeggeTilNyPeriode]);

    if (refusjonEøsListe.length === 0 && !ønskerÅLeggeTilNyPeriode) {
        skjulRefusjonEøs();
    }

    const totaltRefusjonsbeløp = summerBeløpForPerioder(
        refusjonEøsListe.map(it => ({ fom: it.fom, tom: it.tom, beløp: it.refusjonsbeløp }))
    );

    const tekstTilNØS = `Viser til følgende vedtak \nhttps://barnetrygd.intern.nav.no/fagsak/${fagsakId}/${behandlingId}/vedtak
    \nAnnet EØS-land har bedt om refusjon i etterbetaling. Vi ber derfor om at følgende beløp holdes tilbake:
    \nTotalt ${totaltRefusjonsbeløp} kroner
    \n${refusjonEøsListe
        .map(
            refusjonEøs =>
                `${isoDatoPeriodeTilFormatertString({
                    fom: refusjonEøs.fom,
                    tom: refusjonEøs.tom,
                })} kroner ${refusjonEøs.refusjonsbeløp}`
        )
        .join('\n')}`;

    return (
        <FlexColumnDiv>
            <Heading level="2" size="small" spacing>
                Refusjon EØS
            </Heading>
            <Table size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
                        <Table.HeaderCell align="right" scope="col">
                            Refusjonsbeløp
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col" />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {refusjonEøsListe &&
                        refusjonEøsListe.map(refusjonEøs => (
                            <RefusjonEøsPeriode
                                key={refusjonEøs.id}
                                behandlingId={behandlingId}
                                refusjonEøs={refusjonEøs}
                            />
                        ))}
                    {ønskerÅLeggeTilNyPeriode && (
                        <NyRefusjonEøsPeriode
                            lukkNyPeriode={() => settØnskerÅLeggeTilNyPeriode(false)}
                            behandlingId={behandlingId}
                        />
                    )}
                </Table.Body>
            </Table>
            <FlexRowDiv>
                {!ønskerÅLeggeTilNyPeriode && !erLesevisning && (
                    <Button
                        variant="tertiary"
                        size="small"
                        icon={<PlusCircleIcon />}
                        onClick={() => settØnskerÅLeggeTilNyPeriode(true)}
                    >
                        Legg til ny periode
                    </Button>
                )}
                <KopierTilNøsKnapp
                    copyText={tekstTilNØS}
                    text="Kopier tekst til NØS"
                    activeText="Kopiert!"
                    size="small"
                />
            </FlexRowDiv>
        </FlexColumnDiv>
    );
};

export default RefusjonEøs;
