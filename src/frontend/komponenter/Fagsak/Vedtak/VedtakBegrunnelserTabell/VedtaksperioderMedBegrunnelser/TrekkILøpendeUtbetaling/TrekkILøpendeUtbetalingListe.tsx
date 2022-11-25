import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AddCircle } from '@navikt/ds-icons';
import { Button, Heading } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import { RessursStatus } from '@navikt/familie-typer';

import type { IBehandling } from '../../../../../../typer/behandling';
import type {
    IRestTrekkILøpendeUtbetaling,
    IRestTrekkILøpendeUtbetalingIdentifikator,
} from './IRestTrekkILøpendeUtbetaling';
import type { ITrekkILøpendeUtbetaling } from './ITrekkILøpendeUtbetaling';
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
            headers: {},
        });
        if (trekk.status !== RessursStatus.SUKSESS) {
            settTrekkILøpendeUtbetalinger([]);
        }
        if (trekk.status === RessursStatus.SUKSESS) {
            const data = trekk.data;
            const transformert = data.map(d => fraRest(d));
            settTrekkILøpendeUtbetalinger(transformert);
            return trekk;
        }
    };

    const leggTilNyPeriode = () => {
        const ider = trekkILøpendeUtbetalinger.map(trekk => trekk.id);
        settTrekkILøpendeUtbetalinger([
            ...trekkILøpendeUtbetalinger,
            {
                id: Math.max(0, Math.max(...ider) + 1),
                behandlingId: åpenBehandling.behandlingId,
                feilutbetaltBeløp: 0,
                periode: {},
            },
        ]);
    };

    function fraRest(
        trekkILøpendeUtbetaling: IRestTrekkILøpendeUtbetaling
    ): ITrekkILøpendeUtbetaling {
        return {
            ...trekkILøpendeUtbetaling,
            id: trekkILøpendeUtbetaling.identifikator.id,
            behandlingId: trekkILøpendeUtbetaling.identifikator.behandlingId,
            periode: {
                fom: trekkILøpendeUtbetaling.periode.fom + '-01',
                tom: trekkILøpendeUtbetaling.periode.tom + '-01',
            },
        };
    }

    function tilRestIdentifikator(id: number): IRestTrekkILøpendeUtbetalingIdentifikator {
        return {
            id: id,
            behandlingId: åpenBehandling.behandlingId,
        };
    }

    const fjern = async (id: number) => {
        settTrekkILøpendeUtbetalinger(trekkILøpendeUtbetalinger.filter(t => t.id !== id));
        if (id === 0) {
            return;
        }
        await request<IRestTrekkILøpendeUtbetalingIdentifikator, void>({
            method: 'DELETE',
            url: `/familie-ba-sak/api/trekk-i-loepende-utbetaling`,
            data: tilRestIdentifikator(id),
        });
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
                >
                    <TrekkILøpendeUtbetalingPanel
                        key={trekkILøpendeUtbetaling.id}
                        trekkILøpendeUtbetaling={trekkILøpendeUtbetaling}
                        fjern={() => fjern(trekkILøpendeUtbetaling.id)}
                    />
                </TrekkILøpendeUtbetalingProvider>
            ))}
            <Button
                id={'legg-til-ny-trekk-i-loepende-utbetaling-periode'}
                variant={'tertiary'}
                size={'small'}
                style={{ float: 'right' }}
                onClick={leggTilNyPeriode}
                icon={<AddCircle aria-hidden />}
            >
                Legg til ny periode
            </Button>
        </>
    );
};
