import { useSlettVilkårResultat } from '@hooks/useSlettVilkårResultat';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { useEkspanderbarVilkårResultatRad } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/EkspanderbareVilkårResultatRaderContext';
import type { IBehandling } from '@typer/behandling';
import { Resultat } from '@typer/vilkår';

import { TrashIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';

function erVilkårResultatKunTilbakestilt(behandling: IBehandling, vilkårResultatId: number) {
    return behandling.personResultater
        .flatMap(it => it.vilkårResultater)
        .filter(it => it.resultat === Resultat.IKKE_VURDERT)
        .some(it => it.id === vilkårResultatId);
}

interface Props {
    personIdent: string;
    vilkårResultatId: number;
}

export function SlettVilkårResultat({ personIdent, vilkårResultatId }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const { kollapsRad } = useEkspanderbarVilkårResultatRad(vilkårResultatId);

    const { mutate: slettVilkårResultat, isPending: slettVilkårResultatIsPending } = useSlettVilkårResultat({
        onSuccess: behandling => {
            settÅpenBehandling(byggSuksessRessurs(behandling));
            if (!erVilkårResultatKunTilbakestilt(behandling, vilkårResultatId)) {
                kollapsRad();
            }
        },
    });

    function onSlettClicked() {
        slettVilkårResultat({
            behandlingId: behandling.behandlingId,
            vilkårResultatId: vilkårResultatId,
            personIdent: personIdent,
        });
    }

    return (
        <Button
            variant={'tertiary'}
            onClick={() => onSlettClicked()}
            loading={slettVilkårResultatIsPending}
            size={'medium'}
            icon={<TrashIcon />}
        >
            Fjern
        </Button>
    );
}
