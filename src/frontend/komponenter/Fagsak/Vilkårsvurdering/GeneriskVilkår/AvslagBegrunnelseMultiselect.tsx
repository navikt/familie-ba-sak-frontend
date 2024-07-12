import React from 'react';

import { Alert, UNSAFE_Combobox } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import useAvslagBegrunnelseMultiselect from './useAvslagBegrunnelseMultiselect';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import {
    useVilkårsvurdering,
    VilkårSubmit,
} from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import type {
    IRestVedtakBegrunnelseTilknyttetVilkår,
    VedtakBegrunnelse,
} from '../../../../typer/vedtak';
import type { Regelverk, VilkårType } from '../../../../typer/vilkår';
import type { IIsoDatoPeriode } from '../../../../utils/dato';
import { useVedtaksbegrunnelseTekster } from '../../Vedtak/VedtakBegrunnelserTabell/Context/VedtaksbegrunnelseTeksterContext';

interface IProps {
    vilkårType: VilkårType;
    regelverk: Regelverk | null;
    periode: IIsoDatoPeriode;
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
    const { vurderErLesevisning, gjelderInstitusjon } = useBehandling();
    const erLesevisning = vurderErLesevisning();
    const { vedtaksbegrunnelseTekster } = useVedtaksbegrunnelseTekster();
    const { vilkårSubmit } = useVilkårsvurdering();

    const { avslagBegrunnelseTeksterForGjeldendeVilkår } = useAvslagBegrunnelseMultiselect(
        vilkårType,
        regelverk,
        gjelderInstitusjon
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

    const onBegrunnelseSelected = (optionValue: string, isSelected: boolean) => {
        if (isSelected) {
            const nyttValg = muligeOptions.find(valg => valg.value == optionValue);
            if (nyttValg) {
                valgteBegrunnelser.push(nyttValg);
                onChange(valgteBegrunnelser.map(option => option.value as VedtakBegrunnelse));
            } else {
                throw new Error('Klarer ikke legge til begrunnelse');
            }
        } else {
            onChange(
                valgteBegrunnelser
                    .filter(option => option.value !== optionValue)
                    .map(option => option.value as VedtakBegrunnelse)
            );
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
        <UNSAFE_Combobox
            selectedOptions={valgteBegrunnelser}
            label={'Velg standardtekst i brev'}
            isLoading={vilkårSubmit !== VilkårSubmit.NONE}
            readOnly={erLesevisning}
            isMultiSelect
            onToggleSelected={onBegrunnelseSelected}
            options={muligeOptions}
        />
    );
};

export default AvslagBegrunnelseMultiselect;
