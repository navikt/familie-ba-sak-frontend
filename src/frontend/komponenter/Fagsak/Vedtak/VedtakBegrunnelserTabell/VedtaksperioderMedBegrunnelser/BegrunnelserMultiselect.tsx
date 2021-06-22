import React, { CSSProperties, useEffect, useState } from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import {
    ActionMeta,
    FamilieReactSelect,
    FormatOptionLabelMeta,
    GroupType,
    ISelectOption,
    MultiValueProps,
} from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/BehandlingContext';
import {
    VedtakBegrunnelse,
    VedtakBegrunnelseType,
    vedtakBegrunnelseTyper,
} from '../../../../../typer/vedtak';
import { Vedtaksperiodetype } from '../../../../../typer/vedtaksperiode';
import {
    finnVedtakBegrunnelseType,
    hentBakgrunnsfarge,
    hentBorderfarge,
} from '../../../../../utils/vedtakUtils';
import { useVedtaksbegrunnelseTekster } from '../Context/VedtaksbegrunnelseTeksterContext';
import { useVedtaksperiodeMedBegrunnelser } from '../Context/VedtaksperiodeMedBegrunnelserContext';

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
        skjema,
        onChangeBegrunnelse,
        grupperteBegrunnelser,
    } = useVedtaksperiodeMedBegrunnelser();
    const { vedtaksbegrunnelseTekster } = useVedtaksbegrunnelseTekster();

    // React-hack for å rerende komponent som ligger i et ekspanderbart panel
    const [begrunnelser, settBegrunnelser] = useState(skjema.felter.begrunnelser);
    useEffect(() => {
        settBegrunnelser(skjema.felter.begrunnelser);
    }, [skjema.felter.begrunnelser]);

    return (
        <FamilieReactSelect
            id={`${id}`}
            value={begrunnelser.verdi}
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
                    const vedtakBegrunnelseType:
                        | VedtakBegrunnelseType
                        | undefined = finnVedtakBegrunnelseType(
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
                multiValueRemove: (provided: CSSProperties) => ({
                    ...provided,
                    ':hover': {
                        backgroundColor: navFarger.navBla,
                        color: 'white',
                        borderRadius: '0 .4rem .4rem 0',
                    },
                }),
            }}
            placeholder={'Velg begrunnelse(r)'}
            isDisabled={skalIkkeEditeres || skjema.submitRessurs.status === RessursStatus.HENTER}
            feil={skjema.visFeilmeldinger ? begrunnelser.feilmelding : undefined}
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
