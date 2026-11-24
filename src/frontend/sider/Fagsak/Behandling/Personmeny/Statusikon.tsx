import {
    CheckmarkCircleFillIcon,
    CheckmarkCircleIcon,
    CircleIcon,
    CircleSlashFillIcon,
    CircleSlashIcon,
} from '@navikt/aksel-icons';

import { Vilkårstatus, vilkårstatusVisningsnavn } from '../Sider/Vilkårsvurdering/vilkårstatus';
import Styles from './Personmeny.module.css';

interface Props {
    status: Vilkårstatus;
    variant: 'person' | 'vilkår';
}

const fargeklasse: Record<Vilkårstatus, string> = {
    IKKE_VURDERT: Styles.ikonIkkeVurdert,
    OPPFYLT: Styles.ikonVurdert,
    DELVIS_OPPFYLT: Styles.ikonIkkeEllerDelvisOppfylt,
    IKKE_OPPFYLT: Styles.ikonIkkeEllerDelvisOppfylt,
};

/** Oppfylt og ikke oppfylt vises med omriss for vilkår og fylt ikon for personens samlede status. */
export function Statusikon({ status, variant }: Props) {
    const erPerson = variant === 'person';
    const ikonProps = { title: vilkårstatusVisningsnavn[status], className: fargeklasse[status], fontSize: '1rem' };

    switch (status) {
        case Vilkårstatus.OPPFYLT:
            return erPerson ? <CheckmarkCircleFillIcon {...ikonProps} /> : <CheckmarkCircleIcon {...ikonProps} />;
        case Vilkårstatus.IKKE_OPPFYLT:
            return erPerson ? <CircleSlashFillIcon {...ikonProps} /> : <CircleSlashIcon {...ikonProps} />;
        case Vilkårstatus.DELVIS_OPPFYLT:
        case Vilkårstatus.IKKE_VURDERT:
            return <CircleIcon {...ikonProps} />;
    }
}
