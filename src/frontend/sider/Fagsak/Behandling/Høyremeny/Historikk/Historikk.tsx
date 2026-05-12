import { InformationSquareFillIcon, XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { BodyShort, ErrorMessage, HStack, Loader, VStack } from '@navikt/ds-react';

import Styles from './Historikk.module.css';
import { type Historikkinnslag } from '../../../../../hooks/useHentHistorikkinnslag';
import { BehandlerRolle, behandlerRoller } from '../../../../../typer/behandling';

interface Props {
    historikkinnslag?: Historikkinnslag[];
    laster: boolean;
    feil?: Error | null;
}

export function Historikk({ historikkinnslag, laster, feil }: Props) {
    if (laster) {
        return (
            <HStack justify={'center'} align={'center'} paddingBlock={'space-32'} gap={'space-8'}>
                <Loader size={'small'} />
                <BodyShort>Laster historikk...</BodyShort>
            </HStack>
        );
    }

    if (feil) {
        return (
            <HStack justify={'center'} align={'center'} paddingBlock={'space-32'} gap={'space-8'}>
                <XMarkOctagonFillIcon className={Styles.errorIcon} fontSize={'1.25rem'} />
                <ErrorMessage>{feil.message || 'En ukjent feil oppstod.'}</ErrorMessage>
            </HStack>
        );
    }

    if (!historikkinnslag || historikkinnslag.length === 0) {
        return (
            <VStack justify={'center'} align={'center'} paddingBlock={'space-32'} gap={'space-12'}>
                <InformationSquareFillIcon title={'Ingen historikk'} fontSize={'2rem'} />
                <BodyShort>Behandlingen har ingen historikk.</BodyShort>
            </VStack>
        );
    }

    return (
        <ul className={Styles.liste}>
            {historikkinnslag.map(innslag => {
                const rolle =
                    innslag.rolle.toString() !== BehandlerRolle[BehandlerRolle.SYSTEM] && behandlerRoller[innslag.rolle]
                        ? `(${behandlerRoller[innslag.rolle].navn})`
                        : '';
                return (
                    <li key={innslag.id} className={Styles.listElement}>
                        <BodyShort weight={'semibold'}>{innslag.tittel}</BodyShort>
                        {innslag.beskrivelse && <BodyShort>{innslag.beskrivelse}</BodyShort>}
                        <BodyShort textColor={'subtle'}>{`${innslag.dato}`}</BodyShort>
                        <BodyShort textColor={'subtle'}>{`${innslag.utførtAv} ${rolle}`}</BodyShort>
                    </li>
                );
            })}
        </ul>
    );
}
