import React from 'react';

import { ErrorMessage, LocalAlert, Stack } from '@navikt/ds-react';
import { ASurfaceActionHover, AZIndexPopover } from '@navikt/ds-tokens/dist/tokens';
import { type ActionMeta, FamilieReactSelect } from '@navikt/familie-form-elements';

import useAvslagBegrunnelseMultiselect from './useAvslagBegrunnelseMultiselect';
import { useHentAlleBegrunnelser } from '../../../../../../hooks/useHentAlleBegrunnelser';
import type { OptionType } from '../../../../../../typer/common';
import {
    type IRestVedtakBegrunnelseTilknyttetVilkår,
    type VedtakBegrunnelse,
    VedtakBegrunnelseType,
} from '../../../../../../typer/vedtak';
import type { Regelverk, VilkårType } from '../../../../../../typer/vilkår';
import type { IIsoDatoPeriode } from '../../../../../../utils/dato';
import { hentBakgrunnsfarge, hentBorderfarge } from '../../../../../../utils/vedtakUtils';
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

    const onChangeBegrunnelse = (action: ActionMeta<OptionType>) => {
        switch (action.action) {
            case 'select-option':
                if (action.option) {
                    valgteBegrunnelser.push(action.option);
                    onChange(valgteBegrunnelser.map(option => option.value as VedtakBegrunnelse));
                } else {
                    throw new Error('Klarer ikke legge til begrunnelse');
                }
                break;
            case 'pop-value':
            case 'remove-value':
                onChange(
                    valgteBegrunnelser
                        .filter(option => option.value !== action.removedValue?.value)
                        .map(option => option.value as VedtakBegrunnelse)
                );
                break;
            case 'clear':
                onChange([]);
                break;
            default:
                throw new Error('Ukjent action ved onChange på vedtakbegrunnelser');
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
        <FamilieReactSelect
            value={valgteBegrunnelser}
            label={'Velg standardtekst i brev'}
            creatable={false}
            placeholder={'Velg begrunnelse(r)'}
            isLoading={vilkårSubmit !== VilkårSubmit.NONE || hentAlleBegrunnelserIsPending}
            isDisabled={erLesevisning || vilkårSubmit !== VilkårSubmit.NONE || hentAlleBegrunnelserIsPending}
            erLesevisning={erLesevisning}
            isMulti={true}
            onChange={(_, action: ActionMeta<OptionType>) => {
                onChangeBegrunnelse(action);
            }}
            options={muligeOptions}
            propSelectStyles={{
                container: (provided, props) => ({
                    ...provided,
                    maxWidth: '25rem',
                    zIndex: props.isFocused ? AZIndexPopover : 1,
                }),
                groupHeading: provided => ({
                    ...provided,
                    textTransform: 'none',
                }),
                multiValue: provided => {
                    return {
                        ...provided,
                        backgroundColor: hentBakgrunnsfarge(VedtakBegrunnelseType.AVSLAG),
                        border: `1px solid ${hentBorderfarge(VedtakBegrunnelseType.AVSLAG)}`,
                        borderRadius: '0.5rem',
                    };
                },
                multiValueLabel: provided => ({
                    ...provided,
                    whiteSpace: 'pre-wrap',
                    textOverflow: 'hidden',
                    overflow: 'hidden',
                }),
                multiValueRemove: provided => ({
                    ...provided,
                    ':hover': {
                        backgroundColor: ASurfaceActionHover,
                        color: 'white',
                        borderRadius: '0 .4rem .4rem 0',
                    },
                }),
            }}
        />
    );
};

export default AvslagBegrunnelseMultiselect;
