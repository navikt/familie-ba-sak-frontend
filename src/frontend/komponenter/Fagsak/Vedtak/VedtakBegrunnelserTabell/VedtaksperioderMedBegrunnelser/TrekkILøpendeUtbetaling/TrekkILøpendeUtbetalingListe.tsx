import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AddCircle } from '@navikt/ds-icons';
import { Button, Heading, HelpText } from '@navikt/ds-react';
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

const StyledHelpText = styled(HelpText)`
    margin-top: 0.1rem;
    margin-left: 0.6rem;

    & + .navds-popover {
        max-width: 20rem;
    }
`;

export const TrekkILøpendeUtbetalingListe: React.FC<{
    overskrift: string;
    hjelpetekst: string;
    åpenBehandling: IBehandling;
}> = ({ overskrift, hjelpetekst, åpenBehandling }) => {
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
        trekkILøpendeUtbetalinger.push({
            id: Math.max(...ider) + 1,
            behandlingId: åpenBehandling.behandlingId,
            sum: 0,
        });
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
                {overskrift}
                <StyledHelpText placement="right">{hjelpetekst}</StyledHelpText>
            </StyledHeading>
            {trekkILøpendeUtbetalinger.map((trekkILøpendeUtbetaling: ITrekkILøpendeUtbetaling) => (
                <TrekkILøpendeUtbetalingProvider
                    åpenBehandling={åpenBehandling}
                    trekkILøpendeUtbetaling={trekkILøpendeUtbetaling}
                >
                    <TrekkILøpendeUtbetalingPanel
                        trekkILøpendeUtbetalinger={trekkILøpendeUtbetaling}
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
