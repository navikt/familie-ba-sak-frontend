import React from 'react';

import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';

import { FamilieReactSelect, GroupType, ISelectOption } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useUtbetalingBegrunnelser } from '../../../../context/UtbetalingBegrunnelseContext';
import { IPeriode } from '../../../../typer/periode';
import {
    IRestUtbetalingBegrunnelse,
    IRestVedtakBegrunnelse,
    VedtakBegrunnelse,
    VedtakBegrunnelseType,
    vedtakBegrunnelseTyper,
} from '../../../../typer/vedtak';
import { IRestPersonResultat, VilkårType } from '../../../../typer/vilkår';
import useUtbetalingBegrunnelse from './useUtbetalingBegrunnelse';

interface IUtbetalingsBegrunnelseMultiselect {
    utbetalingBegrunnelseForPeriode: IRestUtbetalingBegrunnelse[];
    erLesevisning: boolean;
    periode: IPeriode;
    personResultater: IRestPersonResultat[];
}

const GroupLabel = styled.div`
    color: black;
`;

const UtbetalingBegrunnelseMultiselect: React.FC<IUtbetalingsBegrunnelseMultiselect> = ({
    erLesevisning,
    utbetalingBegrunnelseForPeriode,
    periode,
    personResultater,
}) => {
    console.log(utbetalingBegrunnelseForPeriode);
    const { vilkårBegrunnelser } = useUtbetalingBegrunnelser();
    const { hentUtgjørendeVilkår, onChangeBegrunnelse } = useUtbetalingBegrunnelse(
        personResultater,
        periode
    );

    if (vilkårBegrunnelser.status === RessursStatus.FEILET) {
        return <AlertStripeFeil>Klarte ikke å hente inn begrunnelser for vilkår.</AlertStripeFeil>;
    }

    const gruppertBegrunnelser: GroupType<ISelectOption>[] =
        vilkårBegrunnelser.status === RessursStatus.SUKSESS
            ? Object.keys(vilkårBegrunnelser.data)
                  .filter(
                      (resultat: string) =>
                          (resultat as VedtakBegrunnelseType) !== VedtakBegrunnelseType.OPPHØR
                  )
                  .reduce((acc: GroupType<ISelectOption>[], resultat: string) => {
                      const utgjørendeVilkårForPeriodeOgResultat: VilkårType[] = hentUtgjørendeVilkår(
                          resultat as VedtakBegrunnelseType
                      );

                      return [
                          ...acc,
                          {
                              label: vedtakBegrunnelseTyper[resultat as VedtakBegrunnelseType],
                              options: vilkårBegrunnelser.data[resultat as VedtakBegrunnelseType]
                                  .filter((vedtakBegrunnelse: IRestVedtakBegrunnelse) => {
                                      return vedtakBegrunnelse.vilkår
                                          ? utgjørendeVilkårForPeriodeOgResultat.includes(
                                                vedtakBegrunnelse.vilkår
                                            )
                                          : true;
                                  })
                                  .map((vedtakBegrunnelse: IRestVedtakBegrunnelse) => ({
                                      label: vedtakBegrunnelse.navn,
                                      value: vedtakBegrunnelse.id,
                                  })),
                          },
                      ];
                  }, [])
            : [];

    const valgteBegrunnelser: ISelectOption[] = utbetalingBegrunnelseForPeriode.map(
        (utbetalingsbegrunnelse: IRestUtbetalingBegrunnelse) => ({
            value: utbetalingsbegrunnelse.vedtakBegrunnelse?.toString() ?? '',
            label:
                vilkårBegrunnelser.status === RessursStatus.SUKSESS
                    ? vilkårBegrunnelser.data[
                          utbetalingsbegrunnelse.begrunnelseType as VedtakBegrunnelseType
                      ].find(
                          (vedtakBegrunnelse: IRestVedtakBegrunnelse) =>
                              vedtakBegrunnelse.id === utbetalingsbegrunnelse.vedtakBegrunnelse
                      )?.navn ?? ''
                    : '',
        })
    );

    return (
        <FamilieReactSelect
            value={valgteBegrunnelser}
            propSelectStyles={{
                container: (base, _) => ({
                    ...base,
                    width: '20rem',
                }),
                groupHeading: (base, _) => ({
                    ...base,
                    textTransform: 'none',
                }),
            }}
            label={'Begrunnelser'}
            creatable={false}
            erLesevisning={erLesevisning}
            isMulti={true}
            onChange={(_, action) => {
                onChangeBegrunnelse((action.option?.value ?? '') as VedtakBegrunnelse);
            }}
            formatGroupLabel={(group: GroupType<ISelectOption>) => {
                console.log('label', group.label);
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

export default UtbetalingBegrunnelseMultiselect;
