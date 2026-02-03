import React from 'react';

import { ErrorMessage, LocalAlert, Stack, UNSAFE_Combobox } from '@navikt/ds-react';

import useAvslagBegrunnelseMultiselect from './useAvslagBegrunnelseMultiselect';
import { useHentAlleBegrunnelser } from '../../../../../../hooks/useHentAlleBegrunnelser';
import { type IRestVedtakBegrunnelseTilknyttetVilkår, type VedtakBegrunnelse } from '../../../../../../typer/vedtak';
import type { Regelverk, VilkårType } from '../../../../../../typer/vilkår';
import type { IIsoDatoPeriode } from '../../../../../../utils/dato';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import { useVilkårsvurderingContext, VilkårSubmit } from '../VilkårsvurderingContext';

interface IProps {
    vilkårType: VilkårType;
    regelverk: Regelverk | null;
    periode: IIsoDatoPeriode;
    begrunnelser: VedtakBegrunnelse[];
    onChange: (oppdaterteAvslagbegrunnelser: VedtakBegrunnelse[]) => void;
}

interface IOptionType {
    value: string;
    label: string;
}

const AvslagBegrunnelseMultiselect: React.FC<IProps> = ({ vilkårType, begrunnelser, onChange, regelverk }) => {
    const { vurderErLesevisning } = useBehandlingContext();
    const erLesevisning = vurderErLesevisning();
    const { vilkårSubmit } = useVilkårsvurderingContext();

    const {
        data: alleBegrunnelser,
        isPending: hentAlleBegrunnelserIsPending,
        error: hentAlleBegrunnelserError,
    } = useHentAlleBegrunnelser();

    const { avslagsbegrunnelserForGjeldendeVilkår } = useAvslagBegrunnelseMultiselect(
        vilkårType,
        regelverk,
        alleBegrunnelser
    );

    const valgteBegrunnelser = begrunnelser
        ? begrunnelser.map((valgtBegrunnelse: VedtakBegrunnelse) => ({
              value: valgtBegrunnelse?.toString() ?? '',
              label:
                  avslagsbegrunnelserForGjeldendeVilkår.find(
                      (restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår) =>
                          restVedtakBegrunnelseTilknyttetVilkår.id === valgtBegrunnelse
                  )?.navn ?? '',
          }))
        : [];

    const onChangeBegrunnelse = (selectedOption: string, isSelected: boolean) => {
        if (isSelected) {
            valgteBegrunnelser.push(muligeOptions.find(option => option.value === selectedOption)!);
            onChange(valgteBegrunnelser.map(option => option.value as VedtakBegrunnelse));
        } else {
            onChange(
                valgteBegrunnelser
                    .filter(option => option.value !== selectedOption)
                    .map(option => option.value as VedtakBegrunnelse)
            );
        }
    };

    const muligeOptions: IOptionType[] = avslagsbegrunnelserForGjeldendeVilkår.map(
        (begrunnelse: IRestVedtakBegrunnelseTilknyttetVilkår) => ({
            value: begrunnelse.id,
            label: begrunnelse.navn,
        })
    );

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
            selectedOptions={valgteBegrunnelser}
            label={'Velg standardtekst i brev'}
            placeholder={'Velg begrunnelse(r)'}
            readOnly={erLesevisning}
            isMultiSelect
            onToggleSelected={(option, isSelected) => onChangeBegrunnelse(option, isSelected)}
            isLoading={vilkårSubmit !== VilkårSubmit.NONE || hentAlleBegrunnelserIsPending}
            options={muligeOptions}
        />
    );
};

export default AvslagBegrunnelseMultiselect;
