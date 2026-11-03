import { CheckmarkCircleIcon, CircleFillIcon, CircleIcon } from '@navikt/aksel-icons';

import { Vilkårstatus, vilkårstatusVisningsnavn } from '../Sider/Vilkårsvurdering/vilkårstatus';
import Styles from './Personmeny.module.css';

interface Props {
    status: Vilkårstatus;
    variant: 'person' | 'vilkår';
}

export function Statusikon({ status, variant }: Props) {
    const tittel = vilkårstatusVisningsnavn[status];

    switch (status) {
        case Vilkårstatus.VURDERT:
            return variant === 'person' ? (
                <CircleFillIcon title={tittel} className={Styles.ikonVurdert} fontSize="1rem" />
            ) : (
                <CheckmarkCircleIcon title={tittel} className={Styles.ikonVurdert} fontSize="1rem" />
            );
        case Vilkårstatus.TRENGER_OPPMERKSOMHET:
            return <CircleIcon title={tittel} className={Styles.ikonOppmerksomhet} fontSize="1rem" />;
        case Vilkårstatus.IKKE_VURDERT:
            return <CircleIcon title={tittel} className={Styles.ikonIkkeVurdert} fontSize="1rem" />;
    }
}
