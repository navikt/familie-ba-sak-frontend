import React from 'react';

import navFarger from 'nav-frontend-core';

import { Alert } from '@navikt/ds-react';
import { AZIndexFocus } from '@navikt/ds-tokens/dist/tokens';
import type { ActionMeta, ISelectOption } from '@navikt/familie-form-elements';
import { FamilieReactSelect } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import {
    useVilkårsvurdering,
    VilkårSubmit,
} from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import type {
    IRestVedtakBegrunnelseTilknyttetVilkår,
    VedtakBegrunnelse,
} from '../../../../typer/vedtak';
import { VedtakBegrunnelseType } from '../../../../typer/vedtak';
import type { Regelverk, VilkårType } from '../../../../typer/vilkår';
import type { IPeriode } from '../../../../utils/kalender';
import { hentBakgrunnsfarge, hentBorderfarge } from '../../../../utils/vedtakUtils';
import { useVedtaksbegrunnelseTekster } from '../../Vedtak/VedtakBegrunnelserTabell/Context/VedtaksbegrunnelseTeksterContext';
import useAvslagBegrunnelseMultiselect from './useAvslagBegrunnelseMultiselect';

interface IProps {
    vilkårType: VilkårType;
    regelverk: Regelverk | null;
    periode: IPeriode;
    begrunnelser: VedtakBegrunnelse[];
    onChange: (oppdaterteAvslagbegrunnelser: VedtakBegrunnelse[]) => void;
}

interface IOptionType {
    value: string;
    label: string;
}

const AvslagBegrunnelseMultiselect: React.FC<IProps> = ({
    vilkårType,
    begrunnelser,
    onChange,
    regelverk,
}) => {
    const { vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();
    const { vedtaksbegrunnelseTekster } = useVedtaksbegrunnelseTekster();
    const { vilkårSubmit } = useVilkårsvurdering();

    const { avslagBegrunnelseTeksterForGjeldendeVilkår } = useAvslagBegrunnelseMultiselect(
        vilkårType,
        regelverk
    );

    const valgteBegrunnelser = begrunnelser
        ? begrunnelser.map((valgtBegrunnelse: VedtakBegrunnelse) => ({
              value: valgtBegrunnelse?.toString() ?? '',
              label:
                  avslagBegrunnelseTeksterForGjeldendeVilkår.find(
                      (
                          restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår
                      ) => restVedtakBegrunnelseTilknyttetVilkår.id === valgtBegrunnelse
                  )?.navn ?? '',
          }))
        : [];

    const onChangeBegrunnelse = (action: ActionMeta<ISelectOption>) => {
        switch (action.action) {
            case 'select-option':
                if (action.option) {
                    valgteBegrunnelser.push(action.option);
                    onChange(valgteBegrunnelser.map(option => option.value as VedtakBegrunnelse));
                } else {
                    throw new Error('Klarer ikke legge til begrunnelse');
                }
                break;
            case 'pop-value':
            case 'remove-value':
                onChange(
                    valgteBegrunnelser
                        .filter(option => option.value !== action.removedValue?.value)
                        .map(option => option.value as VedtakBegrunnelse)
                );
                break;
            case 'clear':
                onChange([]);
                break;
            default:
                throw new Error('Ukjent action ved onChange på vedtakbegrunnelser');
        }
    };

    const muligeOptions: IOptionType[] = avslagBegrunnelseTeksterForGjeldendeVilkår.map(
        (begrunnelse: IRestVedtakBegrunnelseTilknyttetVilkår) => ({
            value: begrunnelse.id,
            label: begrunnelse.navn,
        })
    );

    if (vedtaksbegrunnelseTekster.status === RessursStatus.FEILET) {
        return <Alert variant="error">Klarte ikke å hente inn begrunnelser for vilkår.</Alert>;
    }

    return (
        <FamilieReactSelect
            value={valgteBegrunnelser}
            label={'Velg standardtekst i brev'}
            creatable={false}
            placeholder={'Velg begrunnelse(r)'}
            isLoading={vilkårSubmit !== VilkårSubmit.NONE}
            isDisabled={erLesevisning || vilkårSubmit !== VilkårSubmit.NONE}
            erLesevisning={erLesevisning}
            isMulti={true}
            onChange={(_, action: ActionMeta<ISelectOption>) => {
                onChangeBegrunnelse(action);
            }}
            options={muligeOptions}
            propSelectStyles={{
                container: provided => ({
                    ...provided,
                    maxWidth: '25rem',
                    zIndex: AZIndexFocus.valueOf(),
                }),
                groupHeading: provided => ({
                    ...provided,
                    textTransform: 'none',
                }),
                multiValue: provided => {
                    return {
                        ...provided,
                        backgroundColor: hentBakgrunnsfarge(VedtakBegrunnelseType.AVSLAG),
                        border: `1px solid ${hentBorderfarge(VedtakBegrunnelseType.AVSLAG)}`,
                        borderRadius: '0.5rem',
                    };
                },
                multiValueLabel: provided => ({
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
        />
    );
};

export default AvslagBegrunnelseMultiselect;
