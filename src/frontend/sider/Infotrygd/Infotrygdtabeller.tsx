import type { IMinimalFagsak } from '@typer/fagsak';
import type { IInfotrygdSak } from '@typer/infotrygd';
import { Datoformat, isoStringTilFormatertString } from '@utils/dato';

import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Box, Heading, InfoCard } from '@navikt/ds-react';

import { Sakstabell } from './Sakstabell';
import { Vedtakstabell } from './Vedtakstabell';

interface InfotrygdtabellerProps {
    ident?: string;
    saker: IInfotrygdSak[];
    minimalFagsak?: IMinimalFagsak;
}

const sorterSakerEtterSaksnr = (saker: IInfotrygdSak[]): IInfotrygdSak[] =>
    saker.sort((sakA, sakB) => {
        const saksnrA = sakA.saksnr ? parseInt(sakA.saksnr) : 1000;
        const saksnrB = sakB.saksnr ? parseInt(sakB.saksnr) : 1000;
        return saksnrA - saksnrB;
    });

export const Infotrygdtabeller = ({ ident, saker, minimalFagsak }: InfotrygdtabellerProps) => {
    return (
        <>
            {minimalFagsak?.migreringsdato !== null && (
                <InfoCard data-color="info">
                    <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                        Saken ble migrert fra Infotrygd $
                        {isoStringTilFormatertString({
                            isoString: minimalFagsak?.migreringsdato,
                            tilFormat: Datoformat.DATO_FORKORTTET,
                        })}
                    </InfoCard.Message>
                </InfoCard>
            )}
            <Box marginBlock={'space-64 space-16'}>
                <Heading size={'small'} level={'2'}>
                    {ident ? `Saker for ${ident}` : 'Saker'}
                </Heading>
            </Box>
            <Sakstabell saker={sorterSakerEtterSaksnr(saker)} />
            <Box marginBlock={'space-64 space-16'}>
                <Heading size={'small'} level={'2'}>
                    Vedtak
                </Heading>
            </Box>
            <Vedtakstabell saker={saker} />
        </>
    );
};
