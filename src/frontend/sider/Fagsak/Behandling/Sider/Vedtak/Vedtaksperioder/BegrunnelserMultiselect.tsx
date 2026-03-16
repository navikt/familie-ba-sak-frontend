import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import { BodyShort, Label } from '@navikt/ds-react';
import { AZIndexPopover } from '@navikt/ds-tokens/dist/tokens';
import type { ActionMeta, FormatOptionLabelMeta, GroupBase, StylesConfig } from '@navikt/familie-form-elements';
import { FamilieReactSelect } from '@navikt/familie-form-elements';

import { mapBegrunnelserTilSelectOptions } from './utils';
import { useVedtaksperiodeContext } from './VedtaksperiodeContext';
import { useHentGenererteBrevbegrunnelser } from '../../../../../../hooks/useHentGenererteBrevbegrunnelser';
import { useOppdaterStandardbegrunnelserMutationState } from '../../../../../../hooks/useOppdaterStandardbegrunnelserMutationState';
import { useOppdaterVedtaksperioderMedFriteksterMutationState } from '../../../../../../hooks/useOppdaterVedtaksperioderMedFriteksterMutationState';
import type { OptionType } from '../../../../../../typer/common';
import type { VedtakBegrunnelse, VedtakBegrunnelseType } from '../../../../../../typer/vedtak';
import { Standardbegrunnelse, vedtakBegrunnelseTyper } from '../../../../../../typer/vedtak';
import { Vedtaksperiodetype } from '../../../../../../typer/vedtaksperiode';
import { finnVedtakBegrunnelseType, hentBakgrunnsfarge, hentBorderfarge } from '../../../../../../utils/vedtakUtils';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import { useAlleBegrunnelserContext } from '../AlleBegrunnelserContext';

interface IProps {
    vedtaksperiodetype: Vedtaksperiodetype;
}

const GroupLabel = styled.div`
    color: black;
`;

const BegrunnelserMultiselect: React.FC<IProps> = ({ vedtaksperiodetype }) => {
    const { vurderErLesevisning } = useBehandlingContext();
    const skalIkkeEditeres = vurderErLesevisning() || vedtaksperiodetype === Vedtaksperiodetype.AVSLAG;

    const { alleBegrunnelser } = useAlleBegrunnelserContext();
    const { id, onChangeBegrunnelse, grupperteBegrunnelser, vedtaksperiodeMedBegrunnelser } =
        useVedtaksperiodeContext();
    const { data: genererteBrevbegrunnelser } = useHentGenererteBrevbegrunnelser({
        vedtaksperiodeId: vedtaksperiodeMedBegrunnelser.id,
    });
    const [standardbegrunnelser, settStandardbegrunnelser] = useState<OptionType[]>([]);
    const oppdaterStandardbegrunnelserMutation = useOppdaterStandardbegrunnelserMutationState(
        vedtaksperiodeMedBegrunnelser.id
    );
    const oppdaterVedtaksperioderMedFriteksterMutation = useOppdaterVedtaksperioderMedFriteksterMutationState(
        vedtaksperiodeMedBegrunnelser.id
    );

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
                onChangeBegrunnelse({
                    action: 'select-option',
                    option: valgmuligheter[0],
                });
            }
        } else {
            return;
        }
        skalAutomatiskUtfylle.current = false;
    }, [genererteBrevbegrunnelser, grupperteBegrunnelser]);

    const propSelectStyles: StylesConfig<OptionType, boolean, GroupBase<OptionType>> = {
        container: (provided, props) =>
            Object.assign({}, provided, {
                maxWidth: '50rem',
                zIndex: props.isFocused ? Number(AZIndexPopover) : 1,
            }),
        groupHeading: provided =>
            Object.assign({}, provided, {
                textTransform: 'none',
            }),
        multiValue: (provided, props) => {
            const currentOption = props.data;
            const vedtakBegrunnelseType: VedtakBegrunnelseType | undefined = finnVedtakBegrunnelseType(
                alleBegrunnelser,
                currentOption.value as VedtakBegrunnelse
            );

            return Object.assign({}, provided, {
                backgroundColor: hentBakgrunnsfarge(vedtakBegrunnelseType),
                border: `1px solid ${hentBorderfarge(vedtakBegrunnelseType)}`,
                borderRadius: '0.5rem',
            });
        },
        multiValueLabel: provided =>
            Object.assign({}, provided, {
                whiteSpace: 'pre-wrap',
                textOverflow: 'hidden',
                overflow: 'hidden',
            }),
    };

    return (
        <FamilieReactSelect
            id={`${id}`}
            value={standardbegrunnelser}
            propSelectStyles={propSelectStyles}
            placeholder={'Velg begrunnelse(r)'}
            isDisabled={
                skalIkkeEditeres ||
                oppdaterVedtaksperioderMedFriteksterMutation?.status === 'pending' ||
                oppdaterStandardbegrunnelserMutation?.status === 'pending'
            }
            feil={
                oppdaterVedtaksperioderMedFriteksterMutation?.error?.message ??
                oppdaterStandardbegrunnelserMutation?.error?.message
            }
            label="Velg standardtekst i brev"
            creatable={false}
            erLesevisning={skalIkkeEditeres}
            isMulti={true}
            onChange={(_, action: ActionMeta<OptionType>) => {
                onChangeBegrunnelse(action);
            }}
            formatOptionLabel={(option: OptionType, formatOptionLabelMeta: FormatOptionLabelMeta<OptionType>) => {
                const vedtakBegrunnelseType = finnVedtakBegrunnelseType(
                    alleBegrunnelser,
                    option.value as VedtakBegrunnelse
                );

                if (formatOptionLabelMeta.context === 'value') {
                    const type = vedtakBegrunnelseTyper[vedtakBegrunnelseType as VedtakBegrunnelseType];
                    return (
                        <BodyShort>
                            <b>{type}</b>: {option.label}
                        </BodyShort>
                    );
                } else {
                    return <BodyShort>{option.label}</BodyShort>;
                }
            }}
            formatGroupLabel={(group: GroupBase<OptionType>) => {
                return (
                    <GroupLabel>
                        <Label>{group.label}</Label>
                        <hr />
                    </GroupLabel>
                );
            }}
            options={grupperteBegrunnelser}
        />
    );
};

export default BegrunnelserMultiselect;
