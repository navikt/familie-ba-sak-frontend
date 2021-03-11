import React, { CSSProperties } from 'react';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import navFarger from 'nav-frontend-core';

import { ActionMeta, FamilieReactSelect, ISelectOption } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/BehandlingContext';
import {
    IVedtakBegrunnelseSubmit,
    useVedtakBegrunnelser,
} from '../../../../context/VedtakBegrunnelseContext';
import { IPeriode } from '../../../../typer/periode';
import {
    hentBakgrunnsfarge,
    hentBorderfarge,
    IRestVedtakBegrunnelse,
    IRestVedtakBegrunnelseTilknyttetVilkår,
    VedtakBegrunnelse,
    VedtakBegrunnelseType,
} from '../../../../typer/vedtak';
import { VilkårType } from '../../../../typer/vilkår';

interface IProps {
    personident: string;
    vilkårType: VilkårType;
    periode: IPeriode;
}

interface IOptionType {
    value: string;
    label: string;
}

const AvslagBegrunnelseMultiselect: React.FC<IProps> = ({ personident, vilkårType, periode }) => {
    const { erLesevisning } = useBehandling();
    const {
        vedtakBegrunnelseSubmit,
        vedtakBegrunnelser,
        vilkårBegrunnelser,
        lagKomponentId,
        oppdaterAvslagBegrunnelser,
    } = useVedtakBegrunnelser();

    const komponendId = lagKomponentId(periode, personident, vilkårType);

    const submitForPeriode: IVedtakBegrunnelseSubmit | undefined =
        komponendId === vedtakBegrunnelseSubmit.komponentId ? vedtakBegrunnelseSubmit : undefined;

    const avslagBegrunnelseTeksterForGjeldendeVilkår =
        vilkårBegrunnelser.status === RessursStatus.SUKSESS
            ? vilkårBegrunnelser.data.AVSLAG.filter(
                  (begrunnelse: IRestVedtakBegrunnelseTilknyttetVilkår) =>
                      begrunnelse.vilkår === vilkårType
              )
            : [];

    const tilhørerVilkår = (fastsattBegrunnelse: IRestVedtakBegrunnelse): boolean => {
        return (
            !!fastsattBegrunnelse.begrunnelse &&
            avslagBegrunnelseTeksterForGjeldendeVilkår
                .map((begrunnelse: IRestVedtakBegrunnelseTilknyttetVilkår) => begrunnelse.id)
                .includes(fastsattBegrunnelse.begrunnelse)
        );
    };

    const fastsatteBegrunnelserForGjeldende = vedtakBegrunnelser.filter(
        (fastsattBegrunnelse: IRestVedtakBegrunnelse) => {
            return (
                tilhørerVilkår(fastsattBegrunnelse) &&
                fastsattBegrunnelse.begrunnelseType === VedtakBegrunnelseType.AVSLAG &&
                fastsattBegrunnelse.fom === periode.fom &&
                fastsattBegrunnelse.tom === periode.tom
            );
        }
    );

    const oppdaterAvslagBegrunnelserForGjeldende = () => {
        oppdaterAvslagBegrunnelser({
            personIdent: personident,
            vilkår: vilkårType,
            fom: periode.tom,
            tom: periode.tom,
            begrunnelser: valgteOptionsForPeriode.map(
                (option: ISelectOption): VedtakBegrunnelse => {
                    return option.value as VedtakBegrunnelse;
                }
            ),
        });
    };

    const onChangeBegrunnelse = (action: ActionMeta<ISelectOption>) => {
        switch (action.action) {
            case 'select-option':
                oppdaterAvslagBegrunnelserForGjeldende();
                break;
            case 'pop-value':
            case 'remove-value':
                const vedtakBegrunnelse:
                    | IRestVedtakBegrunnelse
                    | undefined = fastsatteBegrunnelserForGjeldende.find(
                    (vedtakBegrunnelse: IRestVedtakBegrunnelse) =>
                        vedtakBegrunnelse.begrunnelse === action.removedValue?.value
                );

                if (vedtakBegrunnelse) {
                    oppdaterAvslagBegrunnelserForGjeldende();
                } else {
                    throw new Error('Finner ikke avslagsbegrunnelse id i listen over begrunnelser');
                }
                break;
            case 'clear':
                const førsteVedtakBegrunnelse: IRestVedtakBegrunnelse | undefined =
                    fastsatteBegrunnelserForGjeldende[0];
                if (førsteVedtakBegrunnelse) {
                    oppdaterAvslagBegrunnelserForGjeldende();
                } else {
                    throw new Error(
                        'Prøver å fjerne alle begrunnelser for en periode, men det er ikke satt noen begrunnelser'
                    );
                }
                break;
            default:
                throw new Error('Ukjent action ved onChange på vedtakbegrunnelser');
        }
    };

    const options: IOptionType[] = avslagBegrunnelseTeksterForGjeldendeVilkår.map(
        (begrunnelse: IRestVedtakBegrunnelseTilknyttetVilkår) => ({
            value: begrunnelse.id,
            label: begrunnelse.navn,
        })
    );
    const valgteOptionsForPeriode: ISelectOption[] = fastsatteBegrunnelserForGjeldende.map(
        (valgtBegrunnelse: IRestVedtakBegrunnelse) => ({
            value: valgtBegrunnelse.begrunnelse?.toString() ?? '',
            label:
                avslagBegrunnelseTeksterForGjeldendeVilkår.find(
                    (
                        restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår
                    ) => restVedtakBegrunnelseTilknyttetVilkår.id === valgtBegrunnelse.begrunnelse
                )?.navn ?? '',
        })
    );

    if (vilkårBegrunnelser.status === RessursStatus.FEILET) {
        return <AlertStripeFeil>Klarte ikke å hente inn begrunnelser for vilkår.</AlertStripeFeil>;
    }
    return (
        <FamilieReactSelect
            id={komponendId}
            value={valgteOptionsForPeriode}
            label={'Begrunnelse(r) til vedtaksbrev'}
            creatable={true}
            placeholder={'Velg begrunnelse(r)'}
            isLoading={vedtakBegrunnelseSubmit.status === RessursStatus.HENTER}
            isDisabled={erLesevisning() || vedtakBegrunnelseSubmit.status === RessursStatus.HENTER}
            feil={submitForPeriode?.feilmelding}
            erLesevisning={erLesevisning()}
            isMulti={true}
            onChange={(_, action: ActionMeta<ISelectOption>) => {
                onChangeBegrunnelse(action);
            }}
            options={options}
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
