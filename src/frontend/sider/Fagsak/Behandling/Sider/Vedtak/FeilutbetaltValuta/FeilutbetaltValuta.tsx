import { CalculatorIcon } from '@navikt/aksel-icons';
import { ActionMenu } from '@navikt/ds-react';
import { useFeilutbetaltValutaTabellContext } from '@sider/Fagsak/Behandling/Sider/Vedtak/FeilutbetaltValuta/FeilutbetaltValutaTabellContext';

export function FeilutbetaltValuta() {
    const { visFeilutbetaltValutaTabell } = useFeilutbetaltValutaTabellContext();

    return (
        <ActionMenu.Item onSelect={visFeilutbetaltValutaTabell}>
            <CalculatorIcon fontSize={'1.4rem'} />
            Legg til feilutbetalt valuta og sats
        </ActionMenu.Item>
    );
}
