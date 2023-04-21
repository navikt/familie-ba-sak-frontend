import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AddCircle } from '@navikt/ds-icons';
import { Button, Heading, Table } from '@navikt/ds-react';
import { CopyToClipboard } from '@navikt/ds-react-internal';
import { ATextAction } from '@navikt/ds-tokens/dist/tokens';

import type { IRestRefusjonEøsPeriode } from '../../../../typer/refusjon-eøs';
import { periodeToString } from '../../../../utils/kalender';
import NyRefusjonEøsPeriode from './NyRefusjonEøsPeriode';
import RefusjonEøsPeriode from './RefusjonEøsPeriode';

interface IRefusjonEøs {
    behandlingId: number;
    fagsakId: string | undefined;
    refusjonEøsListe: IRestRefusjonEøsPeriode[];
    settErUlagretNyRefusjonEøsPeriode: (erUlagretNyRefusjonEøs: boolean) => void;
    erLesevisning: boolean;
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

const KopierTilNøsKnapp = styled(CopyToClipboard)`
    :not(:hover):not(:active) {
        color: ${ATextAction};
    }
`;

const RefusjonEøs: React.FC<IRefusjonEøs> = ({
    refusjonEøsListe,
    settErUlagretNyRefusjonEøsPeriode,
    erLesevisning,
    skjulRefusjonEøs,
    behandlingId,
    fagsakId,
}) => {
    const [ønskerÅLeggeTilNyPeriode, settØnskerÅLeggeTilNyPeriode] = useState(
        refusjonEøsListe.length === 0
    );

    useEffect(() => {
        settErUlagretNyRefusjonEøsPeriode(ønskerÅLeggeTilNyPeriode);
    }, [ønskerÅLeggeTilNyPeriode]);

    if (refusjonEøsListe.length === 0 && !ønskerÅLeggeTilNyPeriode) {
        skjulRefusjonEøs();
    }

    const totaltFeilutbetaltBeløp = refusjonEøsListe.reduce(
        (acc, val) => acc + val.refusjonsbeløp,
        0
    );

    //todo: endre denne teksten
    const tekstTilNØS = `Viser til følgende vedtak \nhttps://barnetrygd.intern.nav.no/fagsak/${fagsakId}/${behandlingId}/vedtak
    \nBer om at feilutbetalingsbeløpet på grunn av valuta- og satsendringer trekkes i fremtidige utbetalinger.
    \nTotalt kr ${totaltFeilutbetaltBeløp}
    \n${refusjonEøsListe
        .map(
            refusjonEøs =>
                `${periodeToString({
                    fom: refusjonEøs.fom,
                    tom: refusjonEøs.tom,
                })} kr ${refusjonEøs.refusjonsbeløp}`
        )
        .join('\n')}`;

    return (
        <FlexColumnDiv>
            <Heading level="2" size="small" spacing>
                Refusjon Eøs
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
                                erLesevisning={erLesevisning}
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
                        icon={<AddCircle />}
                        onClick={() => settØnskerÅLeggeTilNyPeriode(true)}
                    >
                        Legg til ny periode
                    </Button>
                )}
                <KopierTilNøsKnapp copyText={tekstTilNØS} popoverText="Kopiert!" size="small">
                    Kopier tekst til NØS
                </KopierTilNøsKnapp>
            </FlexRowDiv>
        </FlexColumnDiv>
    );
};

export default RefusjonEøs;
