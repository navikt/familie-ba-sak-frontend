import { useBehandlingId } from '@hooks/useBehandlingId';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsakId } from '@hooks/useFagsakId';
import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button, CopyButton, Heading, Stack, Table } from '@navikt/ds-react';
import type { IRestFeilutbetaltValuta } from '@typer/eøs-feilutbetalt-valuta';
import { isoDatoPeriodeTilFormatertString } from '@utils/dato';
import { summerBeløpForPerioder } from '../utils';
import { FeilutbetaltValutaRad } from './FeilutbetaltValutaRad';
import { useFeilutbetaltValutaTabellContext } from './FeilutbetaltValutaTabellContext';
import { FeilutbetaltValutaForm } from './form/FeilutbetaltValutaForm';
import { Type } from './form/useFeilutbetaltValutaForm';
import { SlettFeilutbetaltValutaError } from './SlettFeilutbetaltValutaError';

function lagTekstTilNøs(fagsakId: number, behandlingId: number, feilutbetaltValutaPerioder: IRestFeilutbetaltValuta[]) {
    const url = `https://barnetrygd.intern.nav.no/fagsak/${fagsakId}/${behandlingId}/vedtak`;

    const totaltFeilutbetaltValutaBeløp = summerBeløpForPerioder(
        feilutbetaltValutaPerioder.map(it => ({
            fom: it.fom,
            tom: it.tom,
            beløp: it.feilutbetaltBeløp,
        }))
    );

    const formatertFeilutbetaltValuta = feilutbetaltValutaPerioder
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
    const {
        feilutbetaltValutaPerioder,
        erLeggTilFeilutbetaltValutaFormÅpen,
        visLeggTilFeilutbetaltValutaForm,
        skjulLeggTilFeilutbetaltValutaForm,
    } = useFeilutbetaltValutaTabellContext();

    const fagsakId = useFagsakId();
    const behandlingId = useBehandlingId();
    const erLesevisning = useErLesevisning();

    return (
        <Stack direction={'column'} gap={'space-20'}>
            <Heading level={'2'} size={'small'} spacing={false}>
                Feilutbetalt valuta og sats
            </Heading>
            {feilutbetaltValutaPerioder.map(fv => (
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
                    {feilutbetaltValutaPerioder.map(fv => (
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
                    copyText={lagTekstTilNøs(fagsakId, behandlingId, feilutbetaltValutaPerioder)}
                    text={'Kopier tekst til NØS'}
                    activeText={'Kopiert!'}
                    variant={'action'}
                    size={'small'}
                />
            </Stack>
        </Stack>
    );
}
