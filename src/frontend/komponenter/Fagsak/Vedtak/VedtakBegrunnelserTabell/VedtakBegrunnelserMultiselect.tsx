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
} from '../../../../typer/vedtak';
import { Vedtaksperiode } from '../../../../typer/vedtaksperiode';
import { IRestPersonResultat } from '../../../../typer/vilkår';
import { lagPeriodeId } from '../../../../utils/kalender';
import {
    finnVedtakBegrunnelseType,
    hentBakgrunnsfarge,
    hentBorderfarge,
} from '../../../../utils/vedtakUtils';
import {
    IVedtakBegrunnelseSubmit,
    useVedtakBegrunnelser,
} from './Context/VedtakBegrunnelserContext';
import useVedtakBegrunnelseMultiselect from './Hooks/useVedtakBegrunnelseMultiselect';

interface IVedtakBegrunnelseMultiselect {
    erLesevisning: boolean;
    vedtaksperiode: Vedtaksperiode;
    personResultater: IRestPersonResultat[];
}

const GroupLabel = styled.div`
    color: black;
`;

const VedtakBegrunnelserMultiselect: React.FC<IVedtakBegrunnelseMultiselect> = ({
    erLesevisning,
    vedtaksperiode,
    personResultater,
}) => {
    const periode = {
        fom: vedtaksperiode.periodeFom,
        tom: vedtaksperiode.periodeTom,
    };
    const { vedtakBegrunnelseSubmit, vilkårBegrunnelser } = useVedtakBegrunnelser();
    const {
        grupperteBegrunnelser,
        onChangeBegrunnelse,
        valgteBegrunnelser,
        vedtakBegrunnelserForPeriode,
    } = useVedtakBegrunnelseMultiselect(personResultater, vedtaksperiode);

    const submitForPeriode: IVedtakBegrunnelseSubmit | undefined =
        lagPeriodeId(periode) === vedtakBegrunnelseSubmit.periodeId
            ? vedtakBegrunnelseSubmit
            : undefined;

    const vedtakBegrunnelseId = `vedtakbegrunnelser_${lagPeriodeId(periode)}`;

    if (vilkårBegrunnelser.status === RessursStatus.FEILET) {
        return <AlertStripeFeil>Klarte ikke å hente inn begrunnelser for vilkår.</AlertStripeFeil>;
    }

    return (
        <FamilieReactSelect
            id={vedtakBegrunnelseId}
            value={valgteBegrunnelser}
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
            isLoading={vedtakBegrunnelseSubmit.status === RessursStatus.HENTER}
            isDisabled={erLesevisning || vedtakBegrunnelseSubmit.status === RessursStatus.HENTER}
            feil={submitForPeriode?.feilmelding}
            label="Begrunnelse(r) i brev"
            creatable={false}
            erLesevisning={erLesevisning}
            isMulti={true}
            onChange={(_, action: ActionMeta<ISelectOption>) => {
                onChangeBegrunnelse(action, vedtakBegrunnelserForPeriode);
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

export default VedtakBegrunnelserMultiselect;
