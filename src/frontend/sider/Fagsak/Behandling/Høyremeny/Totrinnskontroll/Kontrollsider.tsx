import ØyeGrå from '@ikoner/ØyeGrå';
import ØyeGrønn from '@ikoner/ØyeGrønn';
import ØyeRød from '@ikoner/ØyeRød';
import { BodyShort, Box, HStack, Label } from '@navikt/ds-react';
import type { TotrinnskontrollFormValues } from '@sider/Fagsak/Behandling/Høyremeny/Totrinnskontroll/useTotrinnskontrollForm';
import { useKontrollsiderContext } from '@sider/Fagsak/Behandling/KontrollsiderContext';
import { KontrollertStatus } from '@sider/Fagsak/Behandling/Sider/sider';
import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

export function Kontrollsider() {
    const { kontrollsider } = useKontrollsiderContext();

    const { clearErrors } = useFormContext<TotrinnskontrollFormValues>();

    const forrigeKontrollsider = useRef(kontrollsider);

    useEffect(() => {
        const harMinstEnSideBlittKontrollertSidenForrige = kontrollsider.some(side => {
            const forrige = forrigeKontrollsider.current.find(f => f.id === side.id);
            return (
                forrige !== undefined &&
                forrige.kontrollertStatus !== KontrollertStatus.KONTROLLERT &&
                side.kontrollertStatus === KontrollertStatus.KONTROLLERT
            );
        });
        forrigeKontrollsider.current = kontrollsider;
        if (harMinstEnSideBlittKontrollertSidenForrige) {
            clearErrors('root');
        }
    }, [kontrollsider, clearErrors]);

    return (
        <Box marginBlock={'space-12'}>
            <Label spacing={true}>Kontrollerte trinn</Label>
            {kontrollsider.map((side, index) => {
                const navn = `${index + 1}. ${side.navn}`;
                const status = side.kontrollertStatus;
                return (
                    <HStack key={side.id} gap={'space-16'}>
                        {status === KontrollertStatus.IKKE_KONTROLLERT && <ØyeGrå height={24} width={24} />}
                        {status === KontrollertStatus.KONTROLLERT && <ØyeGrønn height={24} width={24} />}
                        {status === KontrollertStatus.MANGLER_KONTROLL && <ØyeRød height={24} width={24} />}
                        <BodyShort>{navn}</BodyShort>
                    </HStack>
                );
            })}
        </Box>
    );
}
