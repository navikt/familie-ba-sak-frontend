import { useSlettVilkårResultat } from '@hooks/useSlettVilkårResultat';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { useEkspanderbareVilkårResultatRader } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/EkspanderbareVilkårResultatRaderContext';

interface Props {
    personIdent: string;
    vilkårResultatId: number;
    onNullstilt: () => void;
}

export function SlettVilkårResultat({ personIdent, vilkårResultatId, onNullstilt }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const { ekspanderRad, kollapsRad } = useEkspanderbareVilkårResultatRader();

    const { mutate: slettVilkårResultat, isPending: slettVilkårResultatIsPending } = useSlettVilkårResultat({
        onSuccess: nyBehandling => {
            const iderFraNyBehandling = nyBehandling.personResultater
                .flatMap(personResultat => personResultat.vilkårResultater)
                .map(vilkårResultat => vilkårResultat.id);

            const iderFraGammelBehandling = behandling.personResultater
                .flatMap(personResultat => personResultat.vilkårResultater)
                .map(vilkårResultat => vilkårResultat.id);

            // Backend nullstiller siste periode av en vilkårtype med samme id i stedet for å slette den, og da skal raden
            // forbli åpen. Skjemaet nullstilles eksplisitt fordi responsen kan være identisk med det som allerede er lagret.
            if (iderFraNyBehandling.includes(vilkårResultatId)) {
                onNullstilt();
            } else {
                kollapsRad(vilkårResultatId);
            }

            const nylagedeIder = iderFraNyBehandling.filter(id => !iderFraGammelBehandling.includes(id));
            for (const id of nylagedeIder) {
                ekspanderRad(id);
            }

            settÅpenBehandling(byggSuksessRessurs(nyBehandling));
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
