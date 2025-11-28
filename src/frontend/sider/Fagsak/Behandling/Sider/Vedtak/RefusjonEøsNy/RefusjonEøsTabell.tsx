import { useState } from 'react';

import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button, CopyButton, Heading, Stack, Table } from '@navikt/ds-react';

import { LeggTilRefusjonEøs } from './LeggTilRefusjonEøs';
import { RefusjonEøsRad } from './RefusjonEøsRad';
import type { IBehandling } from '../../../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../../../typer/fagsak';
import { isoDatoPeriodeTilFormatertString } from '../../../../../../utils/dato';
import { useFagsakContext } from '../../../../FagsakContext';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import { summerBeløpForPerioder } from '../utils';
import { SlettRefusjonEøsError } from './SlettRefusjonEøsError';

function lagKopieringstekstTilNØS(fagsak: IMinimalFagsak, behandling: IBehandling) {
    const url = `https://kontantstotte.intern.nav.no/fagsak/${fagsak.id}/${behandling.behandlingId}/vedtak`;

    const totaltRefusjonsbeløp = summerBeløpForPerioder(
        behandling.refusjonEøs.map(it => ({ fom: it.fom, tom: it.tom, beløp: it.refusjonsbeløp }))
    );

    const formatertRefusjon = behandling.refusjonEøs
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

interface Props {
    skjulRefusjonEøs: () => void;
    settErUlagretNyRefusjonEøsPeriode: (erUlagretNyRefusjonEøs: boolean) => void;
}

export function RefusjonEøsTabell({ skjulRefusjonEøs, settErUlagretNyRefusjonEøsPeriode }: Props) {
    const { fagsak } = useFagsakContext();
    const { behandling, vurderErLesevisning } = useBehandlingContext();

    const [visLeggTilRefusjonEøs, settVisLeggTilRefusjonEøs] = useState(behandling.refusjonEøs.length === 0);

    const erLesevisning = vurderErLesevisning();

    function visLeggTilRefusjonEøsForm() {
        settVisLeggTilRefusjonEøs(true);
        settErUlagretNyRefusjonEøsPeriode(true);
    }

    function skjulLeggTilRefusjonEøsForm() {
        settVisLeggTilRefusjonEøs(false);
        settErUlagretNyRefusjonEøsPeriode(false);
        if (behandling.refusjonEøs.length === 0) {
            skjulRefusjonEøs();
        }
    }

    return (
        <Stack direction={'column'} gap={'space-20'} marginBlock={'space-48 space-48'}>
            <Heading level={'2'} size={'small'} spacing={false}>
                Refusjon EØS
            </Heading>
            {behandling.refusjonEøs.map(refusjonEøs => (
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
                    {behandling.refusjonEøs.map(refusjonEøs => (
                        <RefusjonEøsRad key={refusjonEøs.id} refusjonEøs={refusjonEøs} />
                    ))}
                    {visLeggTilRefusjonEøs && <LeggTilRefusjonEøs skjulForm={skjulLeggTilRefusjonEøsForm} />}
                </Table.Body>
            </Table>
            <Stack width={'100%'} justify={'space-between'}>
                {!visLeggTilRefusjonEøs && !erLesevisning && (
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
                    copyText={lagKopieringstekstTilNØS(fagsak, behandling)}
                    activeText={'Kopiert!'}
                    variant={'action'}
                    size={'small'}
                />
            </Stack>
        </Stack>
    );
}
