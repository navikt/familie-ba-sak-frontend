import { useSlettVilkårResultat } from '@hooks/useSlettVilkårResultat';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { useEkspanderbarVilkårResultatRad } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/EkspanderbareVilkårResultatRaderContext';
import { mapTilFeltStateVilkårResultat } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/utils';
import { validerVilkår } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/validering';
import { type IVilkårResultat } from '@typer/vilkår';

import { TrashIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';
import { byggSuksessRessurs } from '@navikt/familie-typer';

interface Props {
    personIdent: string;
    vilkårResultatId: number;
    settRedigerbartVilkår: (redigerbartVilkår: FeltState<IVilkårResultat>) => void;
}

export function SlettVilkårResultat({ personIdent, vilkårResultatId, settRedigerbartVilkår }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const { kollapsRad } = useEkspanderbarVilkårResultatRad(vilkårResultatId);

    const { mutate: slettVilkårResultat, isPending: slettVilkårResultatIsPending } = useSlettVilkårResultat({
        onSuccess: behandling => {
            settÅpenBehandling(byggSuksessRessurs(behandling));

            const personResultat = behandling.personResultater.find(pr =>
                pr.vilkårResultater.some(vr => vr.id === vilkårResultatId)
            );

            const nullstiltVilkårResultat = personResultat?.vilkårResultater.find(vr => vr.id === vilkårResultatId);
            const person = behandling.personer.find(p => p.personIdent === personResultat?.personIdent);

            if (nullstiltVilkårResultat) {
                const feltStateVilkårResultat = mapTilFeltStateVilkårResultat(nullstiltVilkårResultat);
                const validertFeltStateVilkårResultat = validerVilkår(feltStateVilkårResultat, { person });
                settRedigerbartVilkår(validertFeltStateVilkårResultat);
            } else {
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
