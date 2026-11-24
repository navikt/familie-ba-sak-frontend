import { StarsEuIcon } from '@navikt/aksel-icons';
import { ActionMenu } from '@navikt/ds-react';
import { useRefusjonEøsTabellContext } from '@sider/Fagsak/Behandling/Sider/Vedtak/RefusjonEøs/RefusjonEøsTabellContext';

export function RefusjonEøs() {
    const { visLeggTilRefusjonEøsForm } = useRefusjonEøsTabellContext();

    return (
        <ActionMenu.Item onSelect={visLeggTilRefusjonEøsForm}>
            <StarsEuIcon fontSize={'1.4rem'} />
            Legg til refusjon EØS
        </ActionMenu.Item>
    );
}
