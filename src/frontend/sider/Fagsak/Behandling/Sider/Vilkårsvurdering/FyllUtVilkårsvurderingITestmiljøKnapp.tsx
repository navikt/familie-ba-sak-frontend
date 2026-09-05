import { useFyllUtVilkårsvurderingITestmiljø } from '@hooks/useFyllUtVilkårsvurderingITestmiljø';
import { Button } from '@navikt/ds-react';

interface Props {
    behandlingId: number;
}

export function FyllUtVilkårsvurderingITestmiljøKnapp({ behandlingId }: Props) {
    const { mutate: fyllUtVilkårsvurdering, isPending } = useFyllUtVilkårsvurderingITestmiljø({
        onSuccess: () => window.location.reload(),
    });

    return (
        <Button size={'small'} loading={isPending} onClick={() => fyllUtVilkårsvurdering({ behandlingId })}>
            Fyll ut vilkårsvurdering
        </Button>
    );
}
