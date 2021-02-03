import React from 'react';

import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import navFarger from 'nav-frontend-core';
import { Normaltekst } from 'nav-frontend-typografi';

import {
    ActionMeta,
    FamilieReactSelect,
    FormatOptionLabelMeta,
    GroupType,
    ISelectOption,
} from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import {
    IVedtakBegrunnelseSubmit,
    useVedtakBegrunnelser,
} from '../../../../context/VedtakBegrunnelseContext';
import { IPeriode, lagPeriodeId } from '../../../../typer/periode';
import {
    finnVedtakBegrunnelseType,
    hentBakgrunnsfarge,
    hentBorderfarge,
    VedtakBegrunnelse,
    VedtakBegrunnelseType,
    vedtakBegrunnelseTyper,
} from '../../../../typer/vedtak';
import { IRestPersonResultat } from '../../../../typer/vilkår';
import SkjultLabel from '../../../Felleskomponenter/SkjultLabel';
import useVedtakBegrunnelse from './useVedtakBegrunnelse';

interface IVedtakBegrunnelseMultiselect {
    erLesevisning: boolean;
    periode: IPeriode;
    personResultater: IRestPersonResultat[];
}

const GroupLabel = styled.div`
    color: black;
`;

const VedtakBegrunnelserMultiselect: React.FC<IVedtakBegrunnelseMultiselect> = ({
    erLesevisning,
    periode,
    personResultater,
}) => {
    const { vedtakBegrunnelseSubmit, vilkårBegrunnelser } = useVedtakBegrunnelser();
    const {
        gruppertBegrunnelser,
        onChangeBegrunnelse,
        valgteBegrunnelser,
        vedtakBegrunnelserForPeriode,
    } = useVedtakBegrunnelse(personResultater, periode);

    const submitForPeriode: IVedtakBegrunnelseSubmit | undefined =
        lagPeriodeId(periode) === vedtakBegrunnelseSubmit.periodeId
            ? vedtakBegrunnelseSubmit
            : undefined;

    if (vilkårBegrunnelser.status === RessursStatus.FEILET) {
        return <AlertStripeFeil>Klarte ikke å hente inn begrunnelser for vilkår.</AlertStripeFeil>;
    }

    return (
        <FamilieReactSelect
            value={valgteBegrunnelser}
            propSelectStyles={{
                container: (provided, _) => ({
                    ...provided,
                    width: '25rem',
                }),
                groupHeading: (provided, _) => ({
                    ...provided,
                    textTransform: 'none',
                }),
                multiValue: (provided, props) => {
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
                multiValueLabel: (provided, _) => ({
                    ...provided,
                    whiteSpace: 'pre-wrap',
                    textOverflow: 'hidden',
                    overflow: 'hidden',
                }),
                multiValueRemove: provided => ({
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
            isDisabled={vedtakBegrunnelseSubmit.status === RessursStatus.HENTER}
            feil={submitForPeriode?.feilmelding}
            label={<SkjultLabel>Begrunnelse(r)</SkjultLabel>}
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

                return formatOptionLabelMeta.context === 'value'
                    ? `${vedtakBegrunnelseTyper[vedtakBegrunnelseType as VedtakBegrunnelseType]}: ${
                          option.label
                      }`
                    : option.label;
            }}
            formatGroupLabel={(group: GroupType<ISelectOption>) => {
                return (
                    <GroupLabel>
                        <Normaltekst>{group.label}</Normaltekst>
                        <hr />
                    </GroupLabel>
                );
            }}
            options={gruppertBegrunnelser}
        />
    );
};

export default VedtakBegrunnelserMultiselect;
