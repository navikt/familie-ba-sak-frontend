import { useErLesevisning } from '@hooks/useErLesevisning';
import { useOppdaterRegisteropplysninger } from '@hooks/useOppdaterRegisteropplysninger';
import { Datoformat, isoStringTilFormatertString } from '@utils/dato';

import { ArrowsSquarepathIcon } from '@navikt/aksel-icons';
import { Button, Detail, ErrorMessage, HStack, VStack } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';

import { useVilkårsvurderingContext } from './VilkårsvurderingContext';
import { useBehandlingContext } from '../../context/BehandlingContext';

const FALLBACK_MESSAGE =
    'Kunne ikke oppdatere registeropplysninger. Prøv igjen eller kontakt brukerstøtte hvis problemet vedvarer.';

function formaterTidspunkt(registeropplysningerHentetTidpsunkt: string | undefined) {
    if (!registeropplysningerHentetTidpsunkt) {
        return 'Kunne ikke hente innhentingstidspunkt for registeropplysninger.';
    }
    const formatertTidspunkt = isoStringTilFormatertString({
        isoString: registeropplysningerHentetTidpsunkt,
        tilFormat: Datoformat.DATO_TID_SEKUNDER,
    });
    return `Registeropplysninger hentet ${formatertTidspunkt} fra Folkeregisteret.`;
}

export function OppdaterRegisteropplysninger() {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { vilkårsvurdering } = useVilkårsvurderingContext();

    const erLesevisning = useErLesevisning();

    const { mutate, isPending, error } = useOppdaterRegisteropplysninger({
        onSuccess: behandling => settÅpenBehandling(byggSuksessRessurs(behandling)),
    });

    const registeropplysningerHentetTidpsunkt = vilkårsvurdering[0]?.person?.registerhistorikk?.hentetTidspunkt;

    return (
        <VStack gap={'space-8'}>
            <HStack align={'center'} gap={'space-8'} wrap={false}>
                <Detail textColor={'subtle'}>{formaterTidspunkt(registeropplysningerHentetTidpsunkt)}</Detail>
                {!erLesevisning && (
                    <Button
                        aria-label={'Oppdater registeropplysninger'}
                        onClick={() => mutate({ behandlingId: behandling.behandlingId })}
                        loading={isPending}
                        variant={'tertiary'}
                        size={'small'}
                        icon={<ArrowsSquarepathIcon fontSize={'1.5rem'} focusable={'false'} />}
                    />
                )}
            </HStack>
            {error && <ErrorMessage>{error.message ?? FALLBACK_MESSAGE}</ErrorMessage>}
        </VStack>
    );
}
