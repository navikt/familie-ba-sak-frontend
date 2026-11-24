import { useErNyttOppsett } from '@hooks/useKonsept';
import { InformationSquareFillIcon, XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { BodyShort, ErrorMessage, HStack, Loader, Process, VStack } from '@navikt/ds-react';
import type { Historikkinnslag } from '../../../../../hooks/useHentHistorikkinnslag';
import { BehandlerRolle, behandlerRoller } from '../../../../../typer/behandling';
import Styles from './Historikk.module.css';

interface Props {
    historikkinnslag?: Historikkinnslag[];
    laster: boolean;
    feil?: Error | null;
}

function lagRolle(rolle: Historikkinnslag['rolle']) {
    return rolle.toString() !== BehandlerRolle[BehandlerRolle.SYSTEM] && behandlerRoller[rolle]
        ? `(${behandlerRoller[rolle].navn})`
        : '';
}

export function Historikk({ historikkinnslag, laster, feil }: Props) {
    const erNyttOppsett = useErNyttOppsett();

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

    if (erNyttOppsett) {
        return (
            <Process className={Styles.prosess}>
                {historikkinnslag.map(innslag => (
                    <Process.Event key={innslag.id} title={innslag.tittel} timestamp={innslag.dato}>
                        {innslag.beskrivelse && <div>{innslag.beskrivelse}</div>}
                        <div>{`${innslag.utførtAv} ${lagRolle(innslag.rolle)}`}</div>
                    </Process.Event>
                ))}
            </Process>
        );
    }

    return (
        <ul className={Styles.liste}>
            {historikkinnslag.map(innslag => {
                const rolle = lagRolle(innslag.rolle);
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
