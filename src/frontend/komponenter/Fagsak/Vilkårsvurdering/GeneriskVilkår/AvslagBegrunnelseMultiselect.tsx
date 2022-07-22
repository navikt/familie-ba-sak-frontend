import type { CSSProperties } from 'react';
import React from 'react';

import navFarger from 'nav-frontend-core';

import { Alert } from '@navikt/ds-react';
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
import type { VilkårType } from '../../../../typer/vilkår';
import type { IPeriode } from '../../../../utils/kalender';
import { hentBakgrunnsfarge, hentBorderfarge } from '../../../../utils/vedtakUtils';
import { useVedtaksbegrunnelseTekster } from '../../Vedtak/VedtakBegrunnelserTabell/Context/VedtaksbegrunnelseTeksterContext';
import useAvslagBegrunnelseMultiselect from './useAvslagBegrunnelseMultiselect';

interface IProps {
    vilkårType: VilkårType;
    periode: IPeriode;
    begrunnelser: VedtakBegrunnelse[];
    onChange: (oppdaterteAvslagbegrunnelser: VedtakBegrunnelse[]) => void;
}

interface IOptionType {
    value: string;
    label: string;
}

const AvslagBegrunnelseMultiselect: React.FC<IProps> = ({ vilkårType, begrunnelser, onChange }) => {
    const { erLesevisning } = useBehandling();
    const { vedtaksbegrunnelseTekster } = useVedtaksbegrunnelseTekster();
    const { vilkårSubmit } = useVilkårsvurdering();

    const { avslagBegrunnelseTeksterForGjeldendeVilkår } =
        useAvslagBegrunnelseMultiselect(vilkårType);

    const valgteBegrunnlser = begrunnelser
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
                    valgteBegrunnlser.push(action.option);
                    onChange(valgteBegrunnlser.map(option => option.value as VedtakBegrunnelse));
                } else {
                    throw new Error('Klarer ikke legge til begrunnelse');
                }
                break;
            case 'pop-value':
            case 'remove-value':
                onChange(
                    valgteBegrunnlser
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
            value={valgteBegrunnlser}
            label={'Velg standardtekst i brev'}
            creatable={false}
            placeholder={'Velg begrunnelse(r)'}
            isLoading={vilkårSubmit !== VilkårSubmit.NONE}
            isDisabled={erLesevisning() || vilkårSubmit !== VilkårSubmit.NONE}
            erLesevisning={erLesevisning()}
            isMulti={true}
            onChange={(_, action: ActionMeta<ISelectOption>) => {
                onChangeBegrunnelse(action);
            }}
            options={muligeOptions}
            propSelectStyles={{
                container: (provided: CSSProperties) => ({
                    ...provided,
                    maxWidth: '25rem',
                }),
                groupHeading: (provided: CSSProperties) => ({
                    ...provided,
                    textTransform: 'none',
                }),
                multiValue: (provided: CSSProperties) => {
                    return {
                        ...provided,
                        backgroundColor: hentBakgrunnsfarge(VedtakBegrunnelseType.AVSLAG),
                        border: `1px solid ${hentBorderfarge(VedtakBegrunnelseType.AVSLAG)}`,
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
        />
    );
};

export default AvslagBegrunnelseMultiselect;
