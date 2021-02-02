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
    IRestVedtakBegrunnelse,
    IRestVedtakBegrunnelseTilknyttetVilkår,
    VedtakBegrunnelse,
    VedtakBegrunnelseType,
    vedtakBegrunnelseTyper,
} from '../../../../typer/vedtak';
import { IRestPersonResultat, VilkårType } from '../../../../typer/vilkår';
import SkjultLabel from '../../../Felleskomponenter/SkjultLabel';
import useVedtakBegrunnelse from './useVedtakBegrunnelse';

interface IVedtakBegrunnelseMultiselect {
    vedtakBegrunnelserForPeriode: IRestVedtakBegrunnelse[];
    erLesevisning: boolean;
    periode: IPeriode;
    personResultater: IRestPersonResultat[];
}

const GroupLabel = styled.div`
    color: black;
`;

const VedtakBegrunnelserMultiselect: React.FC<IVedtakBegrunnelseMultiselect> = ({
    erLesevisning,
    vedtakBegrunnelserForPeriode,
    periode,
    personResultater,
}) => {
    const { vedtakBegrunnelseSubmit, vilkårBegrunnelser } = useVedtakBegrunnelser();
    const { hentUtgjørendeVilkår, onChangeBegrunnelse } = useVedtakBegrunnelse(
        personResultater,
        periode
    );

    const submitForPeriode: IVedtakBegrunnelseSubmit | undefined =
        lagPeriodeId(periode) === vedtakBegrunnelseSubmit.periodeId
            ? vedtakBegrunnelseSubmit
            : undefined;

    if (vilkårBegrunnelser.status === RessursStatus.FEILET) {
        return <AlertStripeFeil>Klarte ikke å hente inn begrunnelser for vilkår.</AlertStripeFeil>;
    }

    const gruppertBegrunnelser: GroupType<ISelectOption>[] =
        vilkårBegrunnelser.status === RessursStatus.SUKSESS
            ? Object.keys(vilkårBegrunnelser.data).reduce(
                  (acc: GroupType<ISelectOption>[], resultat: string) => {
                      const utgjørendeVilkårForPeriodeOgResultat: VilkårType[] = hentUtgjørendeVilkår(
                          resultat as VedtakBegrunnelseType
                      );

                      return [
                          ...acc,
                          {
                              label: vedtakBegrunnelseTyper[resultat as VedtakBegrunnelseType],
                              options: vilkårBegrunnelser.data[resultat as VedtakBegrunnelseType]
                                  .filter(
                                      (
                                          restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår
                                      ) => {
                                          return restVedtakBegrunnelseTilknyttetVilkår.vilkår
                                              ? utgjørendeVilkårForPeriodeOgResultat.includes(
                                                    restVedtakBegrunnelseTilknyttetVilkår.vilkår
                                                )
                                              : true;
                                      }
                                  )
                                  .map(
                                      (
                                          restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår
                                      ) => ({
                                          label: restVedtakBegrunnelseTilknyttetVilkår.navn,
                                          value: restVedtakBegrunnelseTilknyttetVilkår.id,
                                      })
                                  ),
                          },
                      ];
                  },
                  []
              )
            : [];

    const valgteBegrunnelser: ISelectOption[] = vedtakBegrunnelserForPeriode.map(
        (utbetalingsbegrunnelse: IRestVedtakBegrunnelse) => ({
            value: utbetalingsbegrunnelse.begrunnelse?.toString() ?? '',
            label:
                vilkårBegrunnelser.status === RessursStatus.SUKSESS
                    ? vilkårBegrunnelser.data[
                          utbetalingsbegrunnelse.begrunnelseType as VedtakBegrunnelseType
                      ].find(
                          (
                              restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår
                          ) =>
                              restVedtakBegrunnelseTilknyttetVilkår.id ===
                              utbetalingsbegrunnelse.begrunnelse
                      )?.navn ?? ''
                    : '',
        })
    );

    const finnVedtakBegrunnelseType = (
        vedtakBegrunnelse: VedtakBegrunnelse
    ): VedtakBegrunnelseType | undefined => {
        return vilkårBegrunnelser.status === RessursStatus.SUKSESS
            ? (Object.keys(vilkårBegrunnelser.data).find(vedtakBegrunnelseType => {
                  return (
                      vilkårBegrunnelser.data[vedtakBegrunnelseType as VedtakBegrunnelseType].find(
                          (
                              vedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår
                          ) => vedtakBegrunnelseTilknyttetVilkår.id === vedtakBegrunnelse
                      ) !== undefined
                  );
              }) as VedtakBegrunnelseType)
            : undefined;
    };

    const hentBakgrunnsfarge = (vedtakBegrunnelseType?: VedtakBegrunnelseType) => {
        switch (vedtakBegrunnelseType) {
            case VedtakBegrunnelseType.INNVILGELSE:
                return navFarger.navGronnLighten80;
            case VedtakBegrunnelseType.REDUKSJON:
                return navFarger.navOransjeLighten80;
            case VedtakBegrunnelseType.OPPHØR:
                return navFarger.navLysGra;
            default:
                return navFarger.navBlaLighten80;
        }
    };

    const hentBorderfarge = (vedtakBegrunnelseType?: VedtakBegrunnelseType) => {
        switch (vedtakBegrunnelseType) {
            case VedtakBegrunnelseType.INNVILGELSE:
                return navFarger.navGronn;
            case VedtakBegrunnelseType.REDUKSJON:
                return navFarger.navOransjeDarken20;
            case VedtakBegrunnelseType.OPPHØR:
                return navFarger.navGra60;
            default:
                return navFarger.navBlaLighten80;
        }
    };

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
            isLoading={submitForPeriode?.status === RessursStatus.HENTER}
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
