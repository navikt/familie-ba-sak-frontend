import { useErLesevisning } from '@hooks/useErLesevisning';
import { useHentAlleBegrunnelser } from '@hooks/useHentAlleBegrunnelser';
import { useSlettVilkårResultatIsPending } from '@hooks/useSlettVilkårResultatIsPending';
import { ErrorMessage, LocalAlert, Stack, UNSAFE_Combobox } from '@navikt/ds-react';
import type { VilkårType } from '@typer/vilkår';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import { validerAvslagBegrunnelser } from '../validering';
import { useAvslagsbegrunnelserForVilkår } from './useAvslagsbegrunnelserForVilkår';
import { VilkårResultatFelt, type VilkårResultatFormValues } from './useVilkårResultatSkjema';

interface Props {
    vilkårResultatId: number;
    vilkårType: VilkårType;
}

export function AvslagBegrunnelserFelt({ vilkårResultatId, vilkårType }: Props) {
    const erLesevisning = useErLesevisning();
    const slettVilkårResultatIsPending = useSlettVilkårResultatIsPending(vilkårResultatId);

    const {
        data: alleBegrunnelser,
        isPending: hentAlleBegrunnelserIsPending,
        error: hentAlleBegrunnelserError,
    } = useHentAlleBegrunnelser();

    const { control } = useFormContext<VilkårResultatFormValues>();

    const vurderesEtter = useWatch({ control, name: VilkårResultatFelt.VURDERES_ETTER });

    const avslagsbegrunnelserForVilkår = useAvslagsbegrunnelserForVilkår(vilkårType, vurderesEtter, alleBegrunnelser);

    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: VilkårResultatFelt.AVSLAG_BEGRUNNELSER,
        control,
        rules: {
            validate: (avslagBegrunnelser, formValues) =>
                validerAvslagBegrunnelser(avslagBegrunnelser, {
                    erEksplisittAvslagPåSøknad: formValues.erEksplisittAvslagPåSøknad,
                }),
        },
    });

    const muligeOptions = avslagsbegrunnelserForVilkår.map(begrunnelse => ({
        value: begrunnelse.id,
        label: begrunnelse.navn,
    }));

    const valgteOptions = value.map(valgtBegrunnelse => ({
        value: valgtBegrunnelse,
        label:
            avslagsbegrunnelserForVilkår.find(begrunnelse => begrunnelse.id === valgtBegrunnelse)?.navn ??
            valgtBegrunnelse,
    }));

    const onToggleSelected = (optionValue: string, isSelected: boolean) => {
        if (isSelected) {
            onChange([...value, optionValue]);
        } else {
            onChange(value.filter(valgtBegrunnelse => valgtBegrunnelse !== optionValue));
        }
    };

    if (hentAlleBegrunnelserError) {
        return (
            <LocalAlert status={'error'}>
                <LocalAlert.Header>
                    <LocalAlert.Title>En teknisk feil oppstod.</LocalAlert.Title>
                </LocalAlert.Header>
                <LocalAlert.Content>
                    <Stack direction={'column'} gap={'space-16'}>
                        Klarte ikke å hente inn avslag begrunnelser for vilkår.
                        <ErrorMessage>{hentAlleBegrunnelserError.message}</ErrorMessage>
                    </Stack>
                </LocalAlert.Content>
            </LocalAlert>
        );
    }

    return (
        <UNSAFE_Combobox
            isMultiSelect
            label={'Velg standardtekst i brev'}
            placeholder={'Velg begrunnelse(r)'}
            options={muligeOptions}
            selectedOptions={valgteOptions}
            onToggleSelected={onToggleSelected}
            onBlur={onBlur}
            ref={ref}
            readOnly={erLesevisning || isSubmitting || slettVilkårResultatIsPending}
            isLoading={isSubmitting || hentAlleBegrunnelserIsPending || slettVilkårResultatIsPending}
            error={error?.message}
        />
    );
}
