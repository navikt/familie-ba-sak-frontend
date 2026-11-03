import { CheckmarkCircleIcon, CircleIcon, XMarkOctagonIcon } from '@navikt/aksel-icons';

import { Vilkårstatus, vilkårstatusVisningsnavn } from '../Sider/Vilkårsvurdering/vilkårstatus';
import Styles from './Personmeny.module.css';

interface Props {
    status: Vilkårstatus;
    variant: 'person' | 'vilkår';
}

const fargeklasse: Record<Vilkårstatus, string> = {
    IKKE_VURDERT: Styles.ikonIkkeVurdert,
    OPPFYLT: Styles.ikonVurdert,
    DELVIS_OPPFYLT: Styles.ikonDelvisOppfylt,
    IKKE_OPPFYLT: Styles.ikonIkkeOppfylt,
};

/** Personens status vises som en tykk ring, eller fylt sirkel når alle vilkårene er oppfylt. */
function Personsirkel({ status, tittel }: { status: Vilkårstatus; tittel: string }) {
    const erFylt = status === Vilkårstatus.OPPFYLT;
    return (
        <svg width="1rem" height="1rem" viewBox="0 0 16 16" role="img" className={fargeklasse[status]}>
            <title>{tittel}</title>
            {erFylt ? (
                <circle cx="8" cy="8" r="7" fill="currentColor" />
            ) : (
                <circle cx="8" cy="8" r="5.75" fill="none" stroke="currentColor" strokeWidth="2.5" />
            )}
        </svg>
    );
}

export function Statusikon({ status, variant }: Props) {
    const tittel = vilkårstatusVisningsnavn[status];

    if (variant === 'person') {
        return <Personsirkel status={status} tittel={tittel} />;
    }

    switch (status) {
        case Vilkårstatus.OPPFYLT:
            return <CheckmarkCircleIcon title={tittel} className={fargeklasse[status]} fontSize="1.25rem" />;
        case Vilkårstatus.IKKE_OPPFYLT:
            return <XMarkOctagonIcon title={tittel} className={fargeklasse[status]} fontSize="1.25rem" />;
        case Vilkårstatus.DELVIS_OPPFYLT:
        case Vilkårstatus.IKKE_VURDERT:
            return <CircleIcon title={tittel} className={fargeklasse[status]} fontSize="1.25rem" />;
    }
}
