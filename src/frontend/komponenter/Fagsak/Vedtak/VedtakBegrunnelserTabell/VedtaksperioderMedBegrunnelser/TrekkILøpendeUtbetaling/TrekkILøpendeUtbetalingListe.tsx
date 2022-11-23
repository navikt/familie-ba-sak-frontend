import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AddCircle } from '@navikt/ds-icons';
import { Button, Heading } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import { RessursStatus } from '@navikt/familie-typer';

import type { IBehandling } from '../../../../../../typer/behandling';
import type { ITrekkILøpendeUtbetaling } from './ITrekkILøpendeUtbetaling';
import TrekkILøpendeUtbetalingPanel from './TrekkILøpendeUtbetalingPanel';
import { TrekkILøpendeUtbetalingProvider } from './TrekkILøpendeUtbetalingProvider';

const StyledHeading = styled(Heading)`
    display: flex;
    margin-top: 1rem;
`;

export const TrekkILøpendeUtbetalingListe: React.FC<{
    åpenBehandling: IBehandling;
}> = ({ åpenBehandling }) => {
    const { request } = useHttp();
    const [trekkILøpendeUtbetalinger, settTrekkILøpendeUtbetalinger] = useState<
        ITrekkILøpendeUtbetaling[]
    >([]);

    const hentTrekkILøpendeUtbetalinger = async () => {
        const trekk = await request<void, ITrekkILøpendeUtbetaling[]>({
            method: 'GET',
            url: '/familie-ba-sak/api/trekk-i-loepende-utbetaling',
            headers: {},
        });
        if (trekk.status !== RessursStatus.SUKSESS) {
            settTrekkILøpendeUtbetalinger([]);
        }
        if (trekk.status === RessursStatus.SUKSESS) {
            const data = trekk.data;
            settTrekkILøpendeUtbetalinger(data);
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
            },
        ]);
    };

    useEffect(() => {
        hentTrekkILøpendeUtbetalinger();
    }, [åpenBehandling]);

    if (trekkILøpendeUtbetalinger.length === 0) {
        return <></>;
    }

    return (
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
