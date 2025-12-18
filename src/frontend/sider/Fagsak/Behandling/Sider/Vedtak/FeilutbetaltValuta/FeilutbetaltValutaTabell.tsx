import React from 'react';

import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button, CopyButton, Heading, Stack, Table } from '@navikt/ds-react';

import { FeilutbetaltValutaRad } from './FeilutbetaltValutaRad';
import { useFeilutbetaltValutaTabellContext } from './FeilutbetaltValutaTabellContext';
import { FeilutbetaltValutaForm } from './form/FeilutbetaltValutaForm';
import type { IBehandling } from '../../../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../../../typer/fagsak';
import { isoDatoPeriodeTilFormatertString } from '../../../../../../utils/dato';
import { useFagsakContext } from '../../../../FagsakContext';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import { summerBeløpForPerioder } from '../utils';
import { Type } from './form/useFeilutbetaltValutaForm';
import { SlettFeilutbetaltValutaError } from './SlettFeilutbetaltValutaError';

function lagTekstTilNøs(fagsak: IMinimalFagsak, behandling: IBehandling) {
    const url = `https://barnetrygd.intern.nav.no/fagsak/${fagsak.id}/${behandling.behandlingId}/vedtak`;

    const totaltFeilutbetaltValutaBeløp = summerBeløpForPerioder(
        behandling.feilutbetaltValuta.map(it => ({
            fom: it.fom,
            tom: it.tom,
            beløp: it.feilutbetaltBeløp,
        }))
    );

    const formatertFeilutbetaltValuta = behandling.feilutbetaltValuta
        .map(
            feilutbetaltValuta =>
                `${isoDatoPeriodeTilFormatertString({
                    fom: feilutbetaltValuta.fom,
                    tom: feilutbetaltValuta.tom,
                })} kr ${feilutbetaltValuta.feilutbetaltBeløp}`
        )
        .join('\n');

    return `Viser til følgende vedtak \n${url}
    \nBer om at feilutbetalingsbeløpet på grunn av valuta- og satsendringer trekkes i fremtidige utbetalinger.
    \nTotalt kr ${totaltFeilutbetaltValutaBeløp}
    \n${formatertFeilutbetaltValuta}`;
}

export function FeilutbetaltValutaTabell() {
    const { fagsak } = useFagsakContext();
    const { behandling, vurderErLesevisning } = useBehandlingContext();

    const {
        erLeggTilFeilutbetaltValutaFormÅpen,
        visLeggTilFeilutbetaltValutaForm,
        skjulLeggTilFeilutbetaltValutaForm,
    } = useFeilutbetaltValutaTabellContext();

    const erLesevisning = vurderErLesevisning();

    return (
        <Stack direction={'column'} gap={'space-20'} marginBlock={'space-48 space-48'}>
            <Heading level={'2'} size={'small'} spacing={false}>
                Feilutbetalt valuta og sats
            </Heading>
            {behandling.feilutbetaltValuta.map(fv => (
                <SlettFeilutbetaltValutaError key={fv.id} feilutbetaltValuta={fv} />
            ))}
            <Table size={'small'}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell scope={'col'}>Periode</Table.HeaderCell>
                        <Table.HeaderCell align={'right'} scope={'col'}>
                            Feilutbetalt beløp
                        </Table.HeaderCell>
                        <Table.HeaderCell scope={'col'} />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {behandling.feilutbetaltValuta.map(fv => (
                        <FeilutbetaltValutaRad key={fv.id} feilutbetaltValuta={fv} />
                    ))}
                    {erLeggTilFeilutbetaltValutaFormÅpen && (
                        <Table.ExpandableRow
                            open={true}
                            content={
                                <FeilutbetaltValutaForm
                                    type={Type.OPPRETT}
                                    skjulForm={skjulLeggTilFeilutbetaltValutaForm}
                                    readOnly={erLesevisning}
                                />
                            }
                        />
                    )}
                </Table.Body>
            </Table>
            <Stack width={'100%'} justify={'space-between'}>
                {!erLeggTilFeilutbetaltValutaFormÅpen && !erLesevisning && (
                    <Button
                        variant={'tertiary'}
                        size={'small'}
                        icon={<PlusCircleIcon />}
                        onClick={visLeggTilFeilutbetaltValutaForm}
                    >
                        Legg til ny periode
                    </Button>
                )}
                <CopyButton
                    copyText={lagTekstTilNøs(fagsak, behandling)}
                    text={'Kopier tekst til NØS'}
                    activeText={'Kopiert!'}
                    variant={'action'}
                    size={'small'}
                />
            </Stack>
        </Stack>
    );
}
