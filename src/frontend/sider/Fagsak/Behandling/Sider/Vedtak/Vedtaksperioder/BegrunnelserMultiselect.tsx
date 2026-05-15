import { useEffect, useRef, useState } from 'react';

import { useErLesevisning } from '@hooks/useErLesevisning';
import { useHentGenererteBrevbegrunnelser } from '@hooks/useHentGenererteBrevbegrunnelser';
import { useOppdaterVedtaksperiodeMedBegrunnelserMutationState } from '@hooks/useOppdaterVedtaksperiodeMedBegrunnelserMutationState';
import { useOppdaterVedtaksperiodeMedFriteksterMutationState } from '@hooks/useOppdaterVedtaksperiodeMedFriteksterMutationState';
import type { OptionType } from '@typer/common';
import type { VedtakBegrunnelse, VedtakBegrunnelseType } from '@typer/vedtak';
import { Standardbegrunnelse, vedtakBegrunnelseTyper } from '@typer/vedtak';
import { Vedtaksperiodetype } from '@typer/vedtaksperiode';
import { finnVedtakBegrunnelseType, hentBakgrunnsfarge, hentBorderfarge } from '@utils/vedtakUtils';
import styled from 'styled-components';

import { BodyShort, Label } from '@navikt/ds-react';
import { FamilieReactSelect } from '@navikt/familie-form-elements';
import type { ActionMeta, FormatOptionLabelMeta, GroupBase, StylesConfig } from '@navikt/familie-form-elements';

import { mapBegrunnelserTilSelectOptions } from './utils';
import { useVedtaksperiodeContext } from './VedtaksperiodeContext';
import { useAlleBegrunnelserContext } from '../AlleBegrunnelserContext';

const GroupLabel = styled.div`
    color: black;
`;

const enkeltverdierSomKanSettesAutomatisk = [
    'Standardbegrunnelse$INNVILGET_SATSENDRING',
    Standardbegrunnelse.REDUKSJON_SATSENDRING,
    Standardbegrunnelse.REDUKSJON_UNDER_6_ÅR,
    Standardbegrunnelse.REDUKSJON_UNDER_18_ÅR,
];

export function BegrunnelserMultiselect() {
    const { vedtaksperiodeMedBegrunnelser, onChangeBegrunnelse, grupperteBegrunnelser } = useVedtaksperiodeContext();
    const { alleBegrunnelser } = useAlleBegrunnelserContext();

    const {
        data: genererteBrevbegrunnelser,
        isPending: genererteBrevbegrunnelserIsPending,
        error: genererteBrevbegrunnelserError,
    } = useHentGenererteBrevbegrunnelser(vedtaksperiodeMedBegrunnelser.id);

    const [standardbegrunnelser, settStandardbegrunnelser] = useState<OptionType[]>([]);

    const oppdaterVedtaksperiodeMedBegrunnelserMutationState = useOppdaterVedtaksperiodeMedBegrunnelserMutationState(
        vedtaksperiodeMedBegrunnelser.id
    );
    const oppdaterVedtaksperiodeMedFriteksterMutation = useOppdaterVedtaksperiodeMedFriteksterMutationState(
        vedtaksperiodeMedBegrunnelser.id
    );

    const erLesevisning = useErLesevisning();

    const skalIkkeEditeres = erLesevisning || vedtaksperiodeMedBegrunnelser.type === Vedtaksperiodetype.AVSLAG;

    const skalAutomatiskUtfylle = useRef(!skalIkkeEditeres);

    useEffect(() => {
        settStandardbegrunnelser(mapBegrunnelserTilSelectOptions(vedtaksperiodeMedBegrunnelser, alleBegrunnelser));
    }, [vedtaksperiodeMedBegrunnelser, alleBegrunnelser]);

    useEffect(() => {
        if (!skalAutomatiskUtfylle.current || genererteBrevbegrunnelser === undefined) {
            return;
        }
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
        skalAutomatiskUtfylle.current = false;
    }, [genererteBrevbegrunnelser, grupperteBegrunnelser]);

    const propSelectStyles: StylesConfig<OptionType, boolean, GroupBase<OptionType>> = {
        container: (provided, props) =>
            Object.assign({}, provided, {
                maxWidth: '50rem',
                zIndex: props.isFocused ? 1000 : 1,
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
            }),
    };

    return (
        <FamilieReactSelect
            id={`${vedtaksperiodeMedBegrunnelser.id}`}
            value={standardbegrunnelser}
            propSelectStyles={propSelectStyles}
            placeholder={'Velg begrunnelse(r)'}
            isLoading={
                oppdaterVedtaksperiodeMedFriteksterMutation?.status === 'pending' ||
                oppdaterVedtaksperiodeMedBegrunnelserMutationState?.status === 'pending' ||
                genererteBrevbegrunnelserIsPending
            }
            isDisabled={
                skalIkkeEditeres ||
                oppdaterVedtaksperiodeMedFriteksterMutation?.status === 'pending' ||
                oppdaterVedtaksperiodeMedBegrunnelserMutationState?.status === 'pending' ||
                genererteBrevbegrunnelserIsPending
            }
            feil={
                oppdaterVedtaksperiodeMedFriteksterMutation?.error?.message ??
                oppdaterVedtaksperiodeMedBegrunnelserMutationState?.error?.message ??
                genererteBrevbegrunnelserError?.message
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
}
