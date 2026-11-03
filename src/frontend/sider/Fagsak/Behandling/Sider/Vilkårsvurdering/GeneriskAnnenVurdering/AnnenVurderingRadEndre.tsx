import { useErLesevisning } from '@hooks/useErLesevisning';
import { Button, Fieldset, HStack } from '@navikt/ds-react';
import type { IGrunnlagPerson } from '@typer/person';
import type { IAnnenVurderingConfig } from '@typer/vilkår';
import { useFormContext } from 'react-hook-form';

import { SkjemaRamme } from '../SkjemaRamme';
import { AnnenVurderingBegrunnelseFelt } from './AnnenVurderingBegrunnelseFelt';
import { AnnenVurderingResultatFelt } from './AnnenVurderingResultatFelt';
import type { AnnenVurderingFormValues } from './useAnnenVurderingSkjema';

interface Props {
    person: IGrunnlagPerson;
    annenVurderingConfig: IAnnenVurderingConfig;
    onAvbryt: () => void;
}

export function AnnenVurderingRadEndre({ person, annenVurderingConfig, onAvbryt }: Props) {
    const erLesevisning = useErLesevisning();

    const {
        formState: { isSubmitting, errors },
    } = useFormContext<AnnenVurderingFormValues>();

    return (
        <Fieldset
            error={errors.root?.message}
            errorPropagation={false}
            legend={'Skjema for å gjøre vurderingen'}
            hideLegend
        >
            <SkjemaRamme>
                <AnnenVurderingResultatFelt
                    legend={
                        annenVurderingConfig.spørsmål
                            ? annenVurderingConfig.spørsmål(person.type.toLowerCase())
                            : annenVurderingConfig.beskrivelse
                    }
                />
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
