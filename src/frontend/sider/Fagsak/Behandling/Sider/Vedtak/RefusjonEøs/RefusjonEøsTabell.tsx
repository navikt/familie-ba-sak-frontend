import { useBehandlingId } from '@hooks/useBehandlingId';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsakId } from '@hooks/useFagsakId';
import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button, CopyButton, Heading, Stack, Table } from '@navikt/ds-react';
import type { FagsakId } from '@typer/fagsak';
import type { IRestRefusjonEøs } from '@typer/refusjon-eøs';
import { isoDatoPeriodeTilFormatertString } from '@utils/dato';
import { summerTotalBeløpForPerioder } from '../utils';
import { RefusjonEøsForm } from './form/RefusjonEøsForm';
import { Type } from './form/useRefusjonEøsForm';
import { RefusjonEøsRad } from './RefusjonEøsRad';
import { useRefusjonEøsTabellContext } from './RefusjonEøsTabellContext';
import { SlettRefusjonEøsError } from './SlettRefusjonEøsError';

function lagKopieringstekstTilNØS(fagsakId: FagsakId, behandlingId: number, refusjonEøsPerioder: IRestRefusjonEøs[]) {
    const url = `https://barnetrygd.intern.nav.no/fagsak/${fagsakId}/${behandlingId}/vedtak`;

    const totaltRefusjonsbeløp = summerTotalBeløpForPerioder(
        refusjonEøsPerioder.map(it => ({ fom: it.fom, tom: it.tom, beløp: it.refusjonsbeløp }))
    );

    const formatertRefusjon = refusjonEøsPerioder
        .map(
            refusjonEøs =>
                `${isoDatoPeriodeTilFormatertString({
                    fom: refusjonEøs.fom,
                    tom: refusjonEøs.tom,
                })} kr/mnd ${refusjonEøs.refusjonsbeløp}`
        )
        .join('\n');

    return `Viser til følgende vedtak \n${url}
    \nAnnet EØS-land har bedt om refusjon i etterbetaling. Vi ber derfor om at følgende beløp holdes tilbake:
    \nTotalt ${totaltRefusjonsbeløp} kroner
    \n${formatertRefusjon}`;
}

export function RefusjonEøsTabell() {
    const {
        refusjonEøsPerioder,
        erLeggTilRefusjonEøsFormÅpen,
        visLeggTilRefusjonEøsForm,
        skjulLeggTilRefusjonEøsForm,
    } = useRefusjonEøsTabellContext();

    const fagsakId = useFagsakId();
    const behandlingId = useBehandlingId();
    const erLesevisning = useErLesevisning();

    return (
        <Stack direction={'column'} gap={'space-20'}>
            <Heading level={'2'} size={'small'} spacing={false}>
                Refusjon EØS
            </Heading>
            {refusjonEøsPerioder.map(refusjonEøs => (
                <SlettRefusjonEøsError key={refusjonEøs.id} refusjonEøs={refusjonEøs} />
            ))}
            <Table size={'small'}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell scope={'col'}>Periode</Table.HeaderCell>
                        <Table.HeaderCell align={'right'} scope={'col'}>
                            Refusjonsbeløp
                        </Table.HeaderCell>
                        <Table.HeaderCell scope={'col'} />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {refusjonEøsPerioder.map(refusjonEøs => (
                        <RefusjonEøsRad key={refusjonEøs.id} refusjonEøs={refusjonEøs} />
                    ))}
                    {erLeggTilRefusjonEøsFormÅpen && (
                        <Table.ExpandableRow
                            open={true}
                            content={
                                <RefusjonEøsForm
                                    type={Type.OPPRETT}
                                    skjulForm={skjulLeggTilRefusjonEøsForm}
                                    readOnly={erLesevisning}
                                />
                            }
                        />
                    )}
                </Table.Body>
            </Table>
            <Stack width={'100%'} justify={'space-between'}>
                {!erLeggTilRefusjonEøsFormÅpen && !erLesevisning && (
                    <Button
                        variant={'tertiary'}
                        size={'small'}
                        icon={<PlusCircleIcon />}
                        onClick={visLeggTilRefusjonEøsForm}
                    >
                        Legg til ny periode
                    </Button>
                )}
                <CopyButton
                    text={'Kopier tekst til NØS'}
                    copyText={lagKopieringstekstTilNØS(fagsakId, behandlingId, refusjonEøsPerioder)}
                    activeText={'Kopiert!'}
                    variant={'action'}
                    size={'small'}
                />
            </Stack>
        </Stack>
    );
}
