import { useErLesevisning } from '@hooks/useErLesevisning';
import { Button, Fieldset, HStack } from '@navikt/ds-react';
import type { IGrunnlagPerson } from '@typer/person';
import type { IAnnenVurderingConfig } from '@typer/vilkår';
import { useFormContext, useWatch } from 'react-hook-form';

import { SkjemaRamme } from '../SkjemaRamme';
import { AnnenVurderingBegrunnelseFelt } from './AnnenVurderingBegrunnelseFelt';
import { AnnenVurderingResultatFelt } from './AnnenVurderingResultatFelt';
import { AnnenVurderingFelt, type AnnenVurderingFormValues } from './useAnnenVurderingSkjema';

interface Props {
    person: IGrunnlagPerson;
    annenVurderingConfig: IAnnenVurderingConfig;
    onAvbryt: () => void;
}

export function AnnenVurderingRadEndre({ person, annenVurderingConfig, onAvbryt }: Props) {
    const erLesevisning = useErLesevisning();

    const {
        control,
        formState: { isSubmitting, errors },
    } = useFormContext<AnnenVurderingFormValues>();

    const resultat = useWatch({ control, name: AnnenVurderingFelt.RESULTAT });

    return (
        <Fieldset
            error={errors.root?.message}
            errorPropagation={false}
            legend={'Skjema for å gjøre vurderingen'}
            hideLegend
        >
            <SkjemaRamme lesevisning={erLesevisning} resultat={resultat}>
                <AnnenVurderingResultatFelt person={person} annenVurderingConfig={annenVurderingConfig} />
                <AnnenVurderingBegrunnelseFelt />
                {!erLesevisning && (
                    <HStack gap={'space-16'} marginBlock={'space-16'}>
                        <Button type={'submit'} size={'medium'} variant={'secondary'} loading={isSubmitting}>
                            Ferdig
                        </Button>
                        <Button type={'button'} onClick={onAvbryt} size={'medium'} variant={'tertiary'}>
                            Avbryt
                        </Button>
                    </HStack>
                )}
            </SkjemaRamme>
        </Fieldset>
    );
}
