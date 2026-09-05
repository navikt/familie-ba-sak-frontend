import { useSlettVilkårResultat } from '@hooks/useSlettVilkårResultat';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { useEkspanderbarVilkårResultatRad } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/EkspanderbareVilkårResultatRaderContext';

interface Props {
    personIdent: string;
    vilkårResultatId: number;
}

export function SlettVilkårResultat({ personIdent, vilkårResultatId }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const { kollapsRad } = useEkspanderbarVilkårResultatRad(vilkårResultatId);

    const { mutate: slettVilkårResultat, isPending: slettVilkårResultatIsPending } = useSlettVilkårResultat({
        onSuccess: oppdatertBehandling => {
            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));

            const finnesFortsatt = oppdatertBehandling.personResultater
                .flatMap(personResultat => personResultat.vilkårResultater)
                .some(vilkårResultat => vilkårResultat.id === vilkårResultatId);

            if (!finnesFortsatt) {
                kollapsRad();
            }
        },
    });

    return (
        <Button
            type={'button'}
            variant={'tertiary'}
            onClick={() =>
                slettVilkårResultat({
                    behandlingId: behandling.behandlingId,
                    vilkårResultatId,
                    personIdent,
                })
            }
            loading={slettVilkårResultatIsPending}
            size={'medium'}
            icon={<TrashIcon />}
        >
            Fjern
        </Button>
    );
}
