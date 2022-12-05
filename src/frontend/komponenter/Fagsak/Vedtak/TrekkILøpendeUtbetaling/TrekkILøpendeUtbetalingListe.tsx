import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AddCircle } from '@navikt/ds-icons';
import { Button, Heading } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import { RessursStatus } from '@navikt/familie-typer';

import type { IBehandling } from '../../../../typer/behandling';
import type {
    IRestTrekkILøpendeUtbetaling,
    ITrekkILøpendeUtbetaling,
} from '../../../../typer/eøs-trekk-i-løpende-ytelse';
import { Knapperad } from '../../Behandlingsresultat/EøsPeriode/fellesKomponenter';
import TrekkILøpendeUtbetalingPanel from './TrekkILøpendeUtbetalingPanel';
import { TrekkILøpendeUtbetalingProvider } from './TrekkILøpendeUtbetalingProvider';

const StyledHeading = styled(Heading)`
    display: flex;
    margin-top: 1rem;
`;

export const TrekkILøpendeUtbetalingListe: React.FC<{
    visTrekkILøpendeUtbetalinger: boolean;
    åpenBehandling: IBehandling;
}> = ({ visTrekkILøpendeUtbetalinger, åpenBehandling }) => {
    const { request } = useHttp();
    const [trekkILøpendeUtbetalinger, settTrekkILøpendeUtbetalinger] = useState<
        ITrekkILøpendeUtbetaling[]
    >([]);

    const hentTrekkILøpendeUtbetalinger = async () => {
        const trekk = await request<void, IRestTrekkILøpendeUtbetaling[]>({
            method: 'GET',
            url: '/familie-ba-sak/api/trekk-i-loepende-utbetaling',
        });
        if (trekk.status !== RessursStatus.SUKSESS) {
            settTrekkILøpendeUtbetalinger([]);
        }
        if (trekk.status === RessursStatus.SUKSESS) {
            settTrekkILøpendeUtbetalinger(
                trekk.data.map(d => konverterFraRestobjektTilDomeneobjekt(d))
            );
            return trekk;
        }
    };

    const leggTilNyPeriode = () => {
        settTrekkILøpendeUtbetalinger([
            ...trekkILøpendeUtbetalinger,
            {
                id: 0,
                behandlingId: åpenBehandling.behandlingId,
                feilutbetaltBeløp: 0,
                periode: {},
            },
        ]);
    };

    function konverterFraRestobjektTilDomeneobjekt(
        trekkILøpendeUtbetaling: IRestTrekkILøpendeUtbetaling
    ): ITrekkILøpendeUtbetaling {
        return {
            ...trekkILøpendeUtbetaling,
            id: trekkILøpendeUtbetaling.identifikator.id,
            behandlingId: trekkILøpendeUtbetaling.identifikator.behandlingId,
            periode: {
                fom: trekkILøpendeUtbetaling.periode.fom + '-01', // TODO: 01 her er ein workaround i påvente av månadsveljar, vi bryr oss jo eigentleg ikkje om datoen her
                tom: trekkILøpendeUtbetaling.periode.tom
                    ? trekkILøpendeUtbetaling.periode.tom + '-01'
                    : undefined,
            },
        };
    }

    const fjernPeriode = async (id: number) => {
        settTrekkILøpendeUtbetalinger(trekkILøpendeUtbetalinger.filter(t => t.id !== id));
    };

    useEffect(() => {
        hentTrekkILøpendeUtbetalinger();
    }, [åpenBehandling]);

    return !visTrekkILøpendeUtbetalinger && trekkILøpendeUtbetalinger.length === 0 ? (
        <></>
    ) : (
        <>
            <StyledHeading level="2" size="small" spacing>
                Trekk i løpende utbetaling
            </StyledHeading>
            {trekkILøpendeUtbetalinger.map((trekkILøpendeUtbetaling: ITrekkILøpendeUtbetaling) => (
                <TrekkILøpendeUtbetalingProvider
                    key={trekkILøpendeUtbetaling.id}
                    åpenBehandling={åpenBehandling}
                    trekkILøpendeUtbetaling={trekkILøpendeUtbetaling}
                    fjernFraLista={() => fjernPeriode(trekkILøpendeUtbetaling.id)}
                    hentTrekkILøpendeUtbetalinger={hentTrekkILøpendeUtbetalinger}
                >
                    <TrekkILøpendeUtbetalingPanel key={trekkILøpendeUtbetaling.id} />
                </TrekkILøpendeUtbetalingProvider>
            ))}
            <Knapperad>
                <Button
                    id={'legg-til-ny-trekk-i-loepende-utbetaling-periode'}
                    variant={'tertiary'}
                    size={'small'}
                    style={{ paddingLeft: '0' }}
                    onClick={leggTilNyPeriode}
                    icon={<AddCircle aria-hidden />}
                >
                    Legg til ny periode
                </Button>
            </Knapperad>
        </>
    );
};
