import { useTømPersonopplysningerCacheITestmiljø } from '@hooks/useTømPersonopplysningerCacheITestmiljø';
import { Button } from '@navikt/ds-react';
import { erProd } from '@utils/miljø';

export function TømPersonopplysningerCacheITestmiljøKnapp() {
    const { mutate: tømCache, isPending } = useTømPersonopplysningerCacheITestmiljø({
        onError: () => alert('Klarte ikke å tømme personopplysninger-cache'),
    });

    function onTømCacheClicked() {
        if (erProd()) {
            return;
        }
        tømCache();
    }

    return (
        <Button size={'small'} loading={isPending} onClick={onTømCacheClicked}>
            Tøm personopplysninger-cache
        </Button>
    );
}
