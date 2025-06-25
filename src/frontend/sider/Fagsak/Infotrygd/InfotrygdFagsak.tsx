import React, { useEffect } from 'react';

import { Alert, Box, Heading } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import type { IMinimalFagsak } from '../../../typer/fagsak';
import { Infotrygdtabeller } from '../../Infotrygd/Infotrygdtabeller';
import { useInfotrygdRequest } from '../../Infotrygd/useInfotrygd';

interface InfotrygdFagsakProps {
    minimalFagsak: IMinimalFagsak;
}

const InfotrygdFagsak: React.FunctionComponent<InfotrygdFagsakProps> = ({ minimalFagsak }) => {
    const { hentInfotrygdsaker, infotrygdsakerRessurs } = useInfotrygdRequest();

    useEffect(() => {
        hentInfotrygdsaker(minimalFagsak.søkerFødselsnummer);
    }, [minimalFagsak]);

    switch (infotrygdsakerRessurs.status) {
        case RessursStatus.SUKSESS:
            return (
                <Box maxWidth={'70rem'} marginBlock={'10'} marginInline={'16'}>
                    <Heading size={'large'} level={'1'} children={'Infotrygd'} />
                    <Infotrygdtabeller
                        ident={minimalFagsak.søkerFødselsnummer}
                        saker={infotrygdsakerRessurs.data.saker}
                        minimalFagsak={minimalFagsak}
                    />
                </Box>
            );
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
        case RessursStatus.IKKE_TILGANG:
            return <Alert children={infotrygdsakerRessurs.frontendFeilmelding} variant="error" />;
        default:
            return <div />;
    }
};

export default InfotrygdFagsak;
