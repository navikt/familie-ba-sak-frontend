import type { CSSProperties } from 'react';
import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Element, Normaltekst } from 'nav-frontend-typografi';

import type {
    ActionMeta,
    FormatOptionLabelMeta,
    GroupType,
    ISelectOption,
    MultiValueProps,
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
    const { erLesevisning } = useBehandling();
    const skalIkkeEditeres = erLesevisning() || vedtaksperiodetype === Vedtaksperiodetype.AVSLAG;

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
                container: (provided: CSSProperties) => ({
                    ...provided,
                    maxWidth: '50rem',
                }),
                groupHeading: (provided: CSSProperties) => ({
                    ...provided,
                    textTransform: 'none',
                }),
                multiValue: (provided: CSSProperties, props: MultiValueProps<ISelectOption>) => {
                    const vedtakBegrunnelseType: VedtakBegrunnelseType | undefined =
                        finnVedtakBegrunnelseType(
                            vedtaksbegrunnelseTekster,
                            props.data.value as VedtakBegrunnelse
                        );

                    return {
                        ...provided,
                        backgroundColor: hentBakgrunnsfarge(vedtakBegrunnelseType),
                        border: `1px solid ${hentBorderfarge(vedtakBegrunnelseType)}`,
                        borderRadius: '0.5rem',
                    };
                },
                multiValueLabel: (provided: CSSProperties) => ({
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
                formatOptionLabelMeta: FormatOptionLabelMeta<ISelectOption, true>
            ) => {
                const vedtakBegrunnelseType = finnVedtakBegrunnelseType(
                    vedtaksbegrunnelseTekster,
                    option.value as VedtakBegrunnelse
                );

                if (formatOptionLabelMeta.context === 'value') {
                    const type =
                        vedtakBegrunnelseTyper[vedtakBegrunnelseType as VedtakBegrunnelseType];
                    return (
                        <Normaltekst>
                            <b>{type}</b>: {option.label}
                        </Normaltekst>
                    );
                } else {
                    return <Normaltekst>{option.label}</Normaltekst>;
                }
            }}
            formatGroupLabel={(group: GroupType<ISelectOption>) => {
                return (
                    <GroupLabel>
                        <Element>{group.label}</Element>
                        <hr />
                    </GroupLabel>
                );
            }}
            options={grupperteBegrunnelser}
        />
    );
};

export default BegrunnelserMultiselect;
