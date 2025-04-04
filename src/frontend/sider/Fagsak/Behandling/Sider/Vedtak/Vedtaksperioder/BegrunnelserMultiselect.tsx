import React, { useEffect, useRef, useState } from 'react';

import type { GroupBase } from 'react-select';
import styled from 'styled-components';

import { BodyShort, Label } from '@navikt/ds-react';
import { AZIndexPopover } from '@navikt/ds-tokens/dist/tokens';
import type { ActionMeta, FormatOptionLabelMeta } from '@navikt/familie-form-elements';
import { FamilieReactSelect } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { mapBegrunnelserTilSelectOptions } from './utils';
import type { OptionType } from '../../../../../../typer/common';
import type { VedtakBegrunnelse, VedtakBegrunnelseType } from '../../../../../../typer/vedtak';
import { Standardbegrunnelse, vedtakBegrunnelseTyper } from '../../../../../../typer/vedtak';
import { Vedtaksperiodetype } from '../../../../../../typer/vedtaksperiode';
import {
    finnVedtakBegrunnelseType,
    hentBakgrunnsfarge,
    hentBorderfarge,
} from '../../../../../../utils/vedtakUtils';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import { useVedtakContext } from '../VedtakContext';
import { useVedtaksperiodeContext } from './VedtaksperiodeContext';

interface IProps {
    vedtaksperiodetype: Vedtaksperiodetype;
}

const GroupLabel = styled.div`
    color: black;
`;

const BegrunnelserMultiselect: React.FC<IProps> = ({ vedtaksperiodetype }) => {
    const { vurderErLesevisning } = useBehandlingContext();
    const skalIkkeEditeres =
        vurderErLesevisning() || vedtaksperiodetype === Vedtaksperiodetype.AVSLAG;

    const {
        id,
        onChangeBegrunnelse,
        grupperteBegrunnelser,
        standardBegrunnelserPut,
        vedtaksperiodeMedBegrunnelser,
        genererteBrevbegrunnelser,
    } = useVedtaksperiodeContext();
    const { vedtaksbegrunnelseTekster } = useVedtakContext();

    const [standardbegrunnelser, settStandardbegrunnelser] = useState<OptionType[]>([]);

    const skalAutomatiskUtfylle = useRef(!skalIkkeEditeres);
    const enkeltverdierSomKanSettesAutomatisk = [
        'Standardbegrunnelse$INNVILGET_SATSENDRING',
        Standardbegrunnelse.REDUKSJON_SATSENDRING,
        Standardbegrunnelse.REDUKSJON_UNDER_6_ÅR,
        Standardbegrunnelse.REDUKSJON_UNDER_18_ÅR,
    ];

    useEffect(() => {
        if (vedtaksbegrunnelseTekster.status === RessursStatus.SUKSESS) {
            settStandardbegrunnelser(
                mapBegrunnelserTilSelectOptions(
                    vedtaksperiodeMedBegrunnelser,
                    vedtaksbegrunnelseTekster
                )
            );
        }
    }, [vedtaksperiodeMedBegrunnelser, vedtaksbegrunnelseTekster]);

    useEffect(() => {
        if (!skalAutomatiskUtfylle.current) {
            return;
        }
        if (
            vedtaksbegrunnelseTekster.status === RessursStatus.SUKSESS &&
            genererteBrevbegrunnelser.status === RessursStatus.SUKSESS
        ) {
            const valgmuligheter = grupperteBegrunnelser.flatMap(gruppe => gruppe.options);
            if (
                genererteBrevbegrunnelser.data.length === 0 &&
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
    }, [genererteBrevbegrunnelser, grupperteBegrunnelser, vedtaksbegrunnelseTekster]);

    return (
        <FamilieReactSelect
            id={`${id}`}
            value={standardbegrunnelser}
            propSelectStyles={{
                container: (provided, props) => ({
                    ...provided,
                    maxWidth: '50rem',
                    zIndex: props.isFocused ? AZIndexPopover : 1,
                }),
                groupHeading: provided => ({
                    ...provided,
                    textTransform: 'none',
                }),
                multiValue: (provided, props) => {
                    const currentOption = props.data as OptionType;
                    const vedtakBegrunnelseType: VedtakBegrunnelseType | undefined =
                        finnVedtakBegrunnelseType(
                            vedtaksbegrunnelseTekster,
                            currentOption.value as VedtakBegrunnelse
                        );

                    return {
                        ...provided,
                        backgroundColor: hentBakgrunnsfarge(vedtakBegrunnelseType),
                        border: `1px solid ${hentBorderfarge(vedtakBegrunnelseType)}`,
                        borderRadius: '0.5rem',
                    };
                },
                multiValueLabel: provided => ({
                    ...provided,
                    whiteSpace: 'pre-wrap',
                    textOverflow: 'hidden',
                    overflow: 'hidden',
                }),
            }}
            placeholder={'Velg begrunnelse(r)'}
            isDisabled={skalIkkeEditeres || standardBegrunnelserPut.status === RessursStatus.HENTER}
            feil={
                standardBegrunnelserPut.status === RessursStatus.FUNKSJONELL_FEIL ||
                standardBegrunnelserPut.status === RessursStatus.FEILET
                    ? standardBegrunnelserPut.frontendFeilmelding
                    : undefined
            }
            label="Velg standardtekst i brev"
            creatable={false}
            erLesevisning={skalIkkeEditeres}
            isMulti={true}
            onChange={(_, action: ActionMeta<OptionType>) => {
                onChangeBegrunnelse(action);
            }}
            formatOptionLabel={(
                option: OptionType,
                formatOptionLabelMeta: FormatOptionLabelMeta<OptionType>
            ) => {
                const vedtakBegrunnelseType = finnVedtakBegrunnelseType(
                    vedtaksbegrunnelseTekster,
                    option.value as VedtakBegrunnelse
                );

                if (formatOptionLabelMeta.context === 'value') {
                    const type =
                        vedtakBegrunnelseTyper[vedtakBegrunnelseType as VedtakBegrunnelseType];
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
