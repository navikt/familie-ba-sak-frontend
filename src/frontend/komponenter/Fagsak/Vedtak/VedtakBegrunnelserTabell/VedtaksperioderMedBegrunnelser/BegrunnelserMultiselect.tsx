import React, { useEffect, useState } from 'react';

import type { GroupBase } from 'react-select';
import styled from 'styled-components';

import { BodyShort, Label } from '@navikt/ds-react';
import type {
    ActionMeta,
    FormatOptionLabelMeta,
    ISelectOption,
} from '@navikt/familie-form-elements';
import { FamilieReactSelect } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import type { VedtakBegrunnelse, VedtakBegrunnelseType } from '../../../../../typer/vedtak';
import { vedtakBegrunnelseTyper } from '../../../../../typer/vedtak';
import { Vedtaksperiodetype } from '../../../../../typer/vedtaksperiode';
import {
    finnVedtakBegrunnelseType,
    hentBakgrunnsfarge,
    hentBorderfarge,
} from '../../../../../utils/vedtakUtils';
import { useVedtaksbegrunnelseTekster } from '../Context/VedtaksbegrunnelseTeksterContext';
import { useVedtaksperiodeMedBegrunnelser } from '../Context/VedtaksperiodeMedBegrunnelserContext';
import { mapBegrunnelserTilSelectOptions } from '../Hooks/useVedtaksbegrunnelser';

interface IProps {
    vedtaksperiodetype: Vedtaksperiodetype;
}

const GroupLabel = styled.div`
    color: black;
`;

const BegrunnelserMultiselect: React.FC<IProps> = ({ vedtaksperiodetype }) => {
    const { vurderErLesevisning } = useBehandling();
    const skalIkkeEditeres =
        vurderErLesevisning() || vedtaksperiodetype === Vedtaksperiodetype.AVSLAG;

    const {
        id,
        onChangeBegrunnelse,
        grupperteBegrunnelser,
        standardBegrunnelserPut,
        vedtaksperiodeMedBegrunnelser,
    } = useVedtaksperiodeMedBegrunnelser();
    const { vedtaksbegrunnelseTekster } = useVedtaksbegrunnelseTekster();

    const [standardbegrunnelser, settStandardbegrunnelser] = useState<ISelectOption[]>([]);

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

    return (
        <FamilieReactSelect
            id={`${id}`}
            value={standardbegrunnelser}
            propSelectStyles={{
                container: provided => ({
                    ...provided,
                    maxWidth: '50rem',
                }),
                groupHeading: provided => ({
                    ...provided,
                    textTransform: 'none',
                }),
                multiValue: (provided, props) => {
                    const currentOption = props.data as ISelectOption;
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
            onChange={(_, action: ActionMeta<ISelectOption>) => {
                onChangeBegrunnelse(action);
            }}
            formatOptionLabel={(
                option: ISelectOption,
                formatOptionLabelMeta: FormatOptionLabelMeta<ISelectOption>
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
            formatGroupLabel={(group: GroupBase<ISelectOption>) => {
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
