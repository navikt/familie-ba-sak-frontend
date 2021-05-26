import React from 'react';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { FamilieKnapp } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/BehandlingContext';
import { IVedtaksperiodeMedBegrunnelser } from '../../../../../typer/vedtaksperiode';
import Knapperekke from '../../../../Felleskomponenter/Knapperekke';
import { useVedtaksperiodeMedBegrunnelser } from '../Context/VedtaksperiodeMedBegrunnelserContext';
import Utbetalingsresultat from '../Felles/Utbetalingsresultat';
import BegrunnelserMultiselect from './BegrunnelserMultiselect';
import EkspanderbartBegrunnelsePanel from './EkspanderbartBegrunnelsePanel';
import FritekstVedtakbegrunnelser from './FritekstVedtakbegrunnelser';
import Personvelger from './Personvelger';

interface IProps {
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
}

const VedtaksperiodeMedBegrunnelserPanel: React.FC<IProps> = ({
    vedtaksperiodeMedBegrunnelser,
}) => {
    const { erLesevisning } = useBehandling();
    const {
        skjema,
        erPanelEkspandert,
        onPanelClose,
        utbetalingsperiode,
        putVedtaksperiodeMedBegrunnelser,
    } = useVedtaksperiodeMedBegrunnelser();

    return (
        <EkspanderbartBegrunnelsePanel
            vedtaksperiodeMedBegrunnelser={vedtaksperiodeMedBegrunnelser}
            åpen={erPanelEkspandert}
            onClick={() => onPanelClose(true)}
        >
            {utbetalingsperiode && (
                <Utbetalingsresultat
                    utbetalingsperiodeDetaljer={utbetalingsperiode.utbetalingsperiodeDetaljer}
                />
            )}

            <SkjemaGruppe>
                <BegrunnelserMultiselect />

                {skjema.felter.begrunnelser.verdi.map(begrunnelse => (
                    <Personvelger key={begrunnelse.value} begrunnelse={begrunnelse} />
                ))}

                <FritekstVedtakbegrunnelser />

                <Knapperekke>
                    <FamilieKnapp
                        erLesevisning={erLesevisning()}
                        onClick={() => {
                            putVedtaksperiodeMedBegrunnelser();
                        }}
                        mini={true}
                        type={'standard'}
                        spinner={skjema.submitRessurs.status === RessursStatus.HENTER}
                        disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                    >
                        Lagre
                    </FamilieKnapp>
                    <FamilieKnapp
                        erLesevisning={erLesevisning()}
                        onClick={() => {
                            onPanelClose(false);
                        }}
                        mini={true}
                        type={'flat'}
                    >
                        Avbryt
                    </FamilieKnapp>
                </Knapperekke>
            </SkjemaGruppe>

            {/* <UtbetalingsperiodepanelBody>
                     TODO - resultater, multiselect, fritekster
               </UtbetalingsperiodepanelBody>*/}
        </EkspanderbartBegrunnelsePanel>
    );
};

export default VedtaksperiodeMedBegrunnelserPanel;
