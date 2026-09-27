import { useFyllUtVilkårsvurderingITestmiljø } from '@hooks/useFyllUtVilkårsvurderingITestmiljø';
import { Button } from '@navikt/ds-react';
import { erProd } from '@utils/miljø';

interface Props {
    behandlingId: number;
}

export function FyllUtVilkårsvurderingITestmiljøKnapp({ behandlingId }: Props) {
    const { mutate: fyllUtVilkårsvurdering, isPending } = useFyllUtVilkårsvurderingITestmiljø({
        onSuccess: () => window.location.reload(),
    });

    function onFyllUtVilkårsvurderingClicked() {
        if (erProd()) {
            return;
        }
        fyllUtVilkårsvurdering({ behandlingId });
    }

    return (
        <Button size={'small'} loading={isPending} onClick={onFyllUtVilkårsvurderingClicked}>
            Fyll ut vilkårsvurdering
        </Button>
    );
}
