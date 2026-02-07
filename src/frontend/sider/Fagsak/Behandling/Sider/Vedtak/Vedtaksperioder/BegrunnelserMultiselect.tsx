import React, { useEffect, useRef, useState } from 'react';

import { useMutationState } from '@tanstack/react-query';

import { Box, UNSAFE_Combobox } from '@navikt/ds-react';

import { mapBegrunnelserTilSelectOptions } from './utils';
import { useVedtaksperiodeContext } from './VedtaksperiodeContext';
import { useHentGenererteBrevbegrunnelser } from '../../../../../../hooks/useHentGenererteBrevbegrunnelser';
import { OppdaterStandardbegrunnelserMutationKeyFactory } from '../../../../../../hooks/useOppdaterStandardbegrunnelser';
import { OppdaterVedtaksperioderMedFriteksterMutationKeyFactory } from '../../../../../../hooks/useOppdaterVedtaksperiodeMedFritekster';
import type { OptionType } from '../../../../../../typer/common';
import { Standardbegrunnelse } from '../../../../../../typer/vedtak';
import { Vedtaksperiodetype } from '../../../../../../typer/vedtaksperiode';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import { useAlleBegrunnelserContext } from '../AlleBegrunnelserContext';

interface IProps {
    vedtaksperiodetype: Vedtaksperiodetype;
}

const BegrunnelserMultiselect: React.FC<IProps> = ({ vedtaksperiodetype }) => {
    const { vurderErLesevisning } = useBehandlingContext();
    const skalIkkeEditeres = vurderErLesevisning() || vedtaksperiodetype === Vedtaksperiodetype.AVSLAG;

    const { alleBegrunnelser } = useAlleBegrunnelserContext();
    const { onChangeBegrunnelse, grupperteBegrunnelser, vedtaksperiodeMedBegrunnelser } = useVedtaksperiodeContext();
    const { data: genererteBrevbegrunnelser } = useHentGenererteBrevbegrunnelser({
        vedtaksperiodeId: vedtaksperiodeMedBegrunnelser.id,
    });
    const [standardbegrunnelser, settStandardbegrunnelser] = useState<OptionType[]>([]);
    const oppdaterStandardbegrunnelserMutation = useMutationState({
        filters: {
            mutationKey: OppdaterStandardbegrunnelserMutationKeyFactory.vedtaksperiodeMedBegrunnelser(
                vedtaksperiodeMedBegrunnelser.id
            ),
        },
        select: mutation => mutation.state,
    }).at(-1);
    const oppdaterVedtaksperioderMedFriteksterMutation = useMutationState({
        filters: {
            mutationKey: OppdaterVedtaksperioderMedFriteksterMutationKeyFactory.vedtaksperiodeMedBegrunnelser(
                vedtaksperiodeMedBegrunnelser.id
            ),
        },
        select: mutation => mutation.state,
    }).at(-1);

    const skalAutomatiskUtfylle = useRef(!skalIkkeEditeres);
    const enkeltverdierSomKanSettesAutomatisk = [
        'Standardbegrunnelse$INNVILGET_SATSENDRING',
        Standardbegrunnelse.REDUKSJON_SATSENDRING,
        Standardbegrunnelse.REDUKSJON_UNDER_6_ÅR,
        Standardbegrunnelse.REDUKSJON_UNDER_18_ÅR,
    ];

    useEffect(() => {
        settStandardbegrunnelser(mapBegrunnelserTilSelectOptions(vedtaksperiodeMedBegrunnelser, alleBegrunnelser));
    }, [vedtaksperiodeMedBegrunnelser, alleBegrunnelser]);

    useEffect(() => {
        if (!skalAutomatiskUtfylle.current) {
            return;
        }
        if (genererteBrevbegrunnelser !== undefined) {
            const valgmuligheter = grupperteBegrunnelser.flatMap(gruppe => gruppe.options);
            if (
                genererteBrevbegrunnelser.length === 0 &&
                valgmuligheter.length === 1 &&
                enkeltverdierSomKanSettesAutomatisk.includes(valgmuligheter[0].value)
            ) {
                onChangeBegrunnelse(valgmuligheter[0].value, true);
            }
        } else {
            return;
        }
        skalAutomatiskUtfylle.current = false;
    }, [genererteBrevbegrunnelser, grupperteBegrunnelser]);

    return (
        <Box marginBlock={'space-0 space-16'}>
            <UNSAFE_Combobox
                selectedOptions={standardbegrunnelser}
                placeholder={'Velg begrunnelse(r)'}
                label="Velg standardtekst i brev"
                isLoading={
                    skalIkkeEditeres ||
                    oppdaterVedtaksperioderMedFriteksterMutation?.status === 'pending' ||
                    oppdaterStandardbegrunnelserMutation?.status === 'pending'
                }
                error={
                    oppdaterVedtaksperioderMedFriteksterMutation?.error?.message ??
                    oppdaterStandardbegrunnelserMutation?.error?.message
                }
                readOnly={skalIkkeEditeres}
                isMultiSelect
                options={grupperteBegrunnelser.flatMap(group => group.options)}
                onToggleSelected={(option, isSelected) => {
                    onChangeBegrunnelse(option, isSelected);
                }}
            />
        </Box>
    );
};

export default BegrunnelserMultiselect;
