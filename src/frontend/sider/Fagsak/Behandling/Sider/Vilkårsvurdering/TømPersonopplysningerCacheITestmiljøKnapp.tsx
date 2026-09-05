import { useTømPersonopplysningerCacheITestmiljø } from '@hooks/useTømPersonopplysningerCacheITestmiljø';
import { Button } from '@navikt/ds-react';

export function TømPersonopplysningerCacheITestmiljøKnapp() {
    const { mutate: tømCache, isPending } = useTømPersonopplysningerCacheITestmiljø({
        onError: () => alert('Klarte ikke å tømme personopplysninger-cache'),
    });

    return (
        <Button size={'small'} loading={isPending} onClick={() => tømCache()}>
            Tøm personopplysninger-cache
        </Button>
    );
}
