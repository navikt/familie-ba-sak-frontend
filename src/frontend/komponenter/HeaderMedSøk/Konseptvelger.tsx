import { Konsept, konseptVisningsnavn, settKonsept, useKonsept } from '@hooks/useKonsept';
import { Theme, ToggleGroup } from '@navikt/ds-react';
import { erProd } from '@utils/miljø';

import Styles from './DeployetBranch.module.css';

/** Bryter for å sammenligne UI-konseptene. Vises ikke i prod. */
export function Konseptvelger() {
    const konsept = useKonsept();

    if (erProd()) {
        return null;
    }

    return (
        <Theme theme="dark" className={Styles.konseptvelger}>
            <ToggleGroup
                size="small"
                data-color="neutral"
                value={konsept}
                onChange={verdi => settKonsept(verdi as Konsept)}
                aria-label="Velg UI-konsept"
            >
                {Object.values(Konsept).map(k => (
                    <ToggleGroup.Item key={k} value={k} label={konseptVisningsnavn[k]} />
                ))}
            </ToggleGroup>
        </Theme>
    );
}
