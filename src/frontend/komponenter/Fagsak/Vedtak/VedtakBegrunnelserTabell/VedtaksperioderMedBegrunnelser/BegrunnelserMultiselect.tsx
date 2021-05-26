import React, { CSSProperties } from 'react';

import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';
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

import {
    VedtakBegrunnelse,
    VedtakBegrunnelseType,
    vedtakBegrunnelseTyper,
} from '../../../../../typer/vedtak';
import { Vedtaksperiode } from '../../../../../typer/vedtaksperiode';
import { IRestPersonResultat } from '../../../../../typer/vilkår';
import {
    finnVedtakBegrunnelseType,
    hentBakgrunnsfarge,
    hentBorderfarge,
} from '../../../../../utils/vedtakUtils';
import { useVedtaksperiodeMedBegrunnelser } from '../Context/VedtaksperiodeMedBegrunnelserContext';

interface IProps {
    erLesevisning: boolean;
    vedtaksperiode: Vedtaksperiode;
    personResultater: IRestPersonResultat[];
}

const GroupLabel = styled.div`
    color: black;
`;

const BegrunnelserMultiselect: React.FC<IProps> = ({ erLesevisning }) => {
    const {
        id,
        skjema,
        vilkårBegrunnelser,
        onChangeBegrunnelse,
        grupperteBegrunnelser,
    } = useVedtaksperiodeMedBegrunnelser();
    const { begrunnelser } = skjema.felter;

    if (vilkårBegrunnelser.status === RessursStatus.FEILET) {
        return <AlertStripeFeil>Klarte ikke å hente inn begrunnelser for vilkår.</AlertStripeFeil>;
    }

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
                        vilkårBegrunnelser,
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
            isDisabled={erLesevisning || skjema.submitRessurs.status === RessursStatus.HENTER}
            feil={skjema.visFeilmeldinger ? begrunnelser.feilmelding : undefined}
            label="Begrunnelse(r) i brev"
            creatable={false}
            erLesevisning={erLesevisning}
            isMulti={true}
            onChange={(_, action: ActionMeta<ISelectOption>) => {
                onChangeBegrunnelse(action);
            }}
            formatOptionLabel={(
                option: ISelectOption,
                formatOptionLabelMeta: FormatOptionLabelMeta<ISelectOption, true>
            ) => {
                const vedtakBegrunnelseType = finnVedtakBegrunnelseType(
                    vilkårBegrunnelser,
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
