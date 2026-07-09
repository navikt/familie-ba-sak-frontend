import { useEffect } from 'react';

import { hentFrontendFeilmelding } from '@utils/ressursUtils';
import { useLocation } from 'react-router';

import { Box, Button, Fieldset, Heading, HStack, TextField } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { Infotrygdtabeller } from './Infotrygdtabeller';
import { useInfotrygdSkjema } from './useInfotrygd';

export const Infotrygd = () => {
    const { ident, onSubmitWrapper, skjema } = useInfotrygdSkjema();

    const location = useLocation();
    useEffect(() => {
        if (location.state) {
            const state = location.state as { bruker: string };
            skjema.felter.ident.verdi = state.bruker;
            onSubmitWrapper();
        }
    }, []);

    const skjemaErLåst = skjema.submitRessurs.status === RessursStatus.HENTER;

    return (
        <Box padding={'space-16'} overflow={'auto'} height={'calc(100vh - 50px)'}>
            <Heading size={'large'} level={'1'}>
                Visningsside for Infotrygd
            </Heading>
            <HStack marginBlock={'space-32'}>
                <Fieldset
                    error={hentFrontendFeilmelding(skjema.submitRessurs)}
                    legend="søk infotrygd på fødselsnummer eller d-nummer"
                    hideLegend
                >
                    <TextField
                        {...skjema.felter.ident.hentNavInputProps(skjema.visFeilmeldinger)}
                        id={'hent-person'}
                        label={'Skriv inn fødselsnummer/D-nummer'}
                        placeholder={'Fnr/dnr'}
                    />
                </Fieldset>
                <Box marginInline={'space-16 space-0'} marginBlock={'auto space-0'}>
                    <Button
                        variant={'secondary'}
                        size={'medium'}
                        loading={skjemaErLåst}
                        disabled={skjemaErLåst}
                        onClick={onSubmitWrapper}
                    >
                        Hent saker
                    </Button>
                </Box>
            </HStack>
            {skjema.submitRessurs.status === RessursStatus.SUKSESS ? (
                <Infotrygdtabeller ident={ident} saker={skjema.submitRessurs.data.saker} />
            ) : undefined}
        </Box>
    );
};
